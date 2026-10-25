import {
  type SupportedTranslation,
  toBollsTranslationSlug,
  sanitizeVerseText,
  type ParsedReference,
} from '../utils/scripture.ts';
import { getOfflineFallbackChapter, type BollsVerseItem } from '../utils/fallbackChapters.ts';

export interface ResolvedPassage {
  id: string;
  bookId: number;
  bookName: string;
  chapter: number;
  verseStart: number;
  verseEnd: number;
  translation: SupportedTranslation;
  apiSlug: string;
  verses: Array<{ verse: number; text: string }>;
  combinedText: string;
  maxChapterVerse: number;
  source: 'regex' | 'semantic';
  confidenceReason?: string;
}

// Client-side in-memory chapter cache for 0ms context expansion (-1 Prev / +1 Next)
const chapterCache = new Map<string, BollsVerseItem[]>();
const inFlightChapterFetches = new Map<string, Promise<BollsVerseItem[]>>();

export function getCachedChapterSync(
  translation: SupportedTranslation,
  bookId: number,
  chapter: number
): BollsVerseItem[] | undefined {
  const apiSlug = toBollsTranslationSlug(translation);
  return chapterCache.get(`${apiSlug}:${bookId}:${chapter}`);
}

export async function fetchChapterVerses(
  translation: SupportedTranslation,
  bookId: number,
  chapter: number,
  forceApiCall = false,
  requiredStart?: number,
  requiredEnd?: number
): Promise<BollsVerseItem[]> {
  const apiSlug = toBollsTranslationSlug(translation);
  const cacheKey = `${apiSlug}:${bookId}:${chapter}`;

  if (!forceApiCall) {
    const cached = chapterCache.get(cacheKey);
    if (cached && cached.length > 0) {
      const coversStart = !requiredStart || cached.some((v) => v.verse <= requiredStart);
      const coversEnd = !requiredEnd || cached.some((v) => v.verse >= requiredEnd);
      if (coversStart && coversEnd) {
        return cached;
      }
    }
  }

  const existingPromise = inFlightChapterFetches.get(cacheKey);
  if (existingPromise) {
    return existingPromise;
  }

  const fetchPromise = (async (): Promise<BollsVerseItem[]> => {
    // 1. Call backend API endpoint `/api/bolls/:translation/:bookId/:chapter` which queries Bolls Life REST API and mirrors
    try {
      const qParams = new URLSearchParams();
      if (requiredStart) qParams.set('verseStart', String(requiredStart));
      if (requiredEnd) qParams.set('verseEnd', String(requiredEnd));
      const qs = qParams.toString() ? `?${qParams.toString()}` : '';
      const response = await fetch(
        `/api/bolls/${encodeURIComponent(translation)}/${bookId}/${chapter}${qs}`
      );
      if (response.ok) {
        const data = await response.json();
        if (Array.isArray(data?.verses) && data.verses.length > 0) {
          const cleaned: BollsVerseItem[] = data.verses.map((v: any) => ({
            pk: v.pk,
            verse: Number(v.verse),
            text: sanitizeVerseText(String(v.text || '')),
          }));
          chapterCache.set(cacheKey, cleaned);
          return cleaned;
        }
      }
    } catch (_err) {
      // Fallback to direct Bolls API call if backend route is unreachable
    }

    // 2. Direct client-side Bolls Life REST API call
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 3500);
      const directUrl = `https://bolls.life/get-text/${encodeURIComponent(apiSlug)}/${bookId}/${chapter}/`;
      const directRes = await fetch(directUrl, { signal: controller.signal });
      clearTimeout(timeout);
      if (directRes.ok) {
        const rawArr = await directRes.json();
        if (Array.isArray(rawArr) && rawArr.length > 0) {
          const cleaned: BollsVerseItem[] = rawArr.map((v: any) => ({
            pk: v.pk,
            verse: Number(v.verse),
            text: sanitizeVerseText(String(v.text || '')),
          }));
          chapterCache.set(cacheKey, cleaned);
          return cleaned;
        }
      }
    } catch (_directErr) {
      // Proceed to multi-translation offline fallback
    }

    const fallback = getOfflineFallbackChapter(bookId, chapter, translation) || [];
    if (fallback.length > 0) {
      chapterCache.set(cacheKey, fallback);
    }
    return fallback;
  })();

  inFlightChapterFetches.set(cacheKey, fetchPromise);
  try {
    return await fetchPromise;
  } finally {
    inFlightChapterFetches.delete(cacheKey);
  }
}

export function slicePassageFromChapter(
  chapterVerses: BollsVerseItem[],
  ref: {
    id?: string;
    bookId: number;
    bookName: string;
    chapter: number;
    verseStart: number;
    verseEnd: number;
    source: 'regex' | 'semantic';
    confidenceReason?: string;
  },
  translation: SupportedTranslation
): ResolvedPassage {
  const apiSlug = toBollsTranslationSlug(translation);
  const maxChapterVerse =
    chapterVerses.length > 0
      ? Math.max(...chapterVerses.map((v) => v.verse))
      : Math.max(ref.verseEnd, 31);

  const clampedStart = Math.max(1, Math.min(ref.verseStart, maxChapterVerse));
  const clampedEnd = Math.max(clampedStart, Math.min(ref.verseEnd, maxChapterVerse));

  let matchingVerses = chapterVerses.filter(
    (v) => v.verse >= clampedStart && v.verse <= clampedEnd
  );

  if (matchingVerses.length === 0 && chapterVerses.length > 0) {
    matchingVerses = chapterVerses.slice(0, Math.min(3, chapterVerses.length));
  }

  const actualStart =
    ref.verseStart && ref.verseStart > 0 && (matchingVerses.length === 0 || matchingVerses[0].verse <= ref.verseStart)
      ? ref.verseStart
      : matchingVerses.length > 0
        ? matchingVerses[0].verse
        : clampedStart;

  const actualEnd =
    ref.verseEnd && ref.verseEnd >= actualStart && (matchingVerses.length === 0 || matchingVerses[matchingVerses.length - 1].verse >= ref.verseEnd)
      ? ref.verseEnd
      : matchingVerses.length > 0
        ? matchingVerses[matchingVerses.length - 1].verse
        : clampedEnd;

  const combinedText = matchingVerses
    .map((v) => sanitizeVerseText(v.text))
    .join(' ')
    .replace(/\s+/g, ' ')
    .trim();

  return {
    id: ref.id || `${ref.bookId}-${ref.chapter}-${actualStart}-${actualEnd}`,
    bookId: ref.bookId,
    bookName: ref.bookName,
    chapter: ref.chapter,
    verseStart: actualStart,
    verseEnd: actualEnd,
    translation,
    apiSlug,
    verses: matchingVerses.map((v) => ({
      verse: v.verse,
      text: sanitizeVerseText(v.text),
    })),
    combinedText:
      combinedText ||
      'Scripture text unavailable for this verse range in the current network state.',
    maxChapterVerse,
    source: ref.source,
    confidenceReason: ref.confidenceReason,
  };
}

export async function resolveReferenceToPassage(
  ref: ParsedReference & { id?: string },
  translation: SupportedTranslation,
  forceApiCall = false
): Promise<ResolvedPassage> {
  const chapterVerses = await fetchChapterVerses(
    translation,
    ref.bookId,
    ref.chapter,
    forceApiCall,
    ref.verseStart,
    ref.verseEnd
  );
  return slicePassageFromChapter(chapterVerses, ref, translation);
}

export async function runSemanticSearch(query: string): Promise<ParsedReference[]> {
  const response = await fetch('/api/semantic-search', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query }),
  });

  if (!response.ok) {
    throw new Error('Semantic search request failed.');
  }

  const data = await response.json();
  return Array.isArray(data?.candidates) ? data.candidates : [];
}
