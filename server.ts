import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import dotenv from 'dotenv';
import { GoogleGenAI, Type, ThinkingLevel } from '@google/genai';
import {
  BIBLE_BOOKS,
  toBollsTranslationSlug,
  sanitizeVerseText,
  matchLocalSemanticPhrases,
  resolveBookByName,
} from './src/utils/scripture.ts';
import { getOfflineFallbackChapter, BollsVerseItem } from './src/utils/fallbackChapters.ts';

dotenv.config();

const PORT = 3000;

function getAiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === 'MY_GEMINI_API_KEY') {
    return null;
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// Server-side in-memory chapter cache: `${apiSlug}:${bookId}:${chapter}` -> sanitized verse array
const serverChapterCache = new Map<string, BollsVerseItem[]>();

async function fetchChapterFromBollsOrFallback(
  translation: string,
  bookId: number,
  chapter: number,
  verseStart?: number,
  verseEnd?: number
): Promise<{ verses: BollsVerseItem[]; source: 'bolls' | 'gemini-fallback' | 'offline-cache' | 'github-mirror' }> {
  const apiSlug = toBollsTranslationSlug(translation);
  const cacheKey = `${apiSlug}:${bookId}:${chapter}`;

  const cached = serverChapterCache.get(cacheKey);
  if (cached && cached.length > 0) {
    const coversStart = !verseStart || cached.some((v) => v.verse <= verseStart);
    const coversEnd = !verseEnd || cached.some((v) => v.verse >= verseEnd);
    if (coversStart && coversEnd) {
      return { verses: cached, source: 'bolls' };
    }
  }

  // Primary Deterministic Path: Bolls Life REST API (1400ms fast timeout)
  const candidateSlugs =
    apiSlug === 'CUV'
      ? ['CUV', 'CUNPS', 'CUVS']
      : apiSlug === 'CNVS'
        ? ['CNVS', 'CNV']
        : [apiSlug];

  for (const slug of candidateSlugs) {
    const bollsUrl = `https://bolls.life/get-text/${encodeURIComponent(slug)}/${bookId}/${chapter}/`;
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 1400);
      const response = await fetch(bollsUrl, {
        headers: {
          Accept: 'application/json',
          'User-Agent': 'VerseFlow-Sermon-Assistant/1.0',
        },
        signal: controller.signal,
      });
      clearTimeout(timeout);

      if (response.ok) {
        const rawData = await response.json();
        if (Array.isArray(rawData) && rawData.length > 0) {
          const sanitized: BollsVerseItem[] = rawData.map((item: any) => ({
            pk: item.pk,
            verse: Number(item.verse),
            text: sanitizeVerseText(String(item.text || '')),
          }));
          serverChapterCache.set(cacheKey, sanitized);
          return { verses: sanitized, source: 'bolls' };
        }
      }
    } catch (_err) {
      // Try next candidate slug or proceed to fallback
    }
  }

  // Automatic Fallback 1: Multi-translation local store (contains authentic NKJV, KJV, YLT, NLT, ESV, AMPC, CUV, CNV, CCB)
  const offline = getOfflineFallbackChapter(bookId, chapter, translation);
  if (offline && offline.length > 0) {
    const coversStart = !verseStart || offline.some((v) => v.verse <= verseStart);
    const coversEnd = !verseEnd || offline.some((v) => v.verse >= verseEnd);
    if (coversStart && coversEnd) {
      serverChapterCache.set(cacheKey, offline);
      return { verses: offline, source: 'offline-cache' };
    }
  }

  // Automatic Fallback 2: GitHub Raw Scrollmapper Mirrors (reliable open Bible data for BSB / KJV / ChiUn)
  const book = BIBLE_BOOKS[bookId - 1];
  if (book) {
    try {
      const isChinese = translation === 'CUV' || apiSlug === 'CUV';
      const isKjv = translation === 'KJV' || apiSlug === 'KJV';
      const file = isChinese ? 'ChiUn.json' : isKjv ? 'KJV.json' : 'BSB.json';
      const mirrorUrl = `https://raw.githubusercontent.com/scrollmapper/bible_databases/master/formats/json/${file}`;
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 2000);
      const response = await fetch(mirrorUrl, { signal: controller.signal });
      clearTimeout(timeout);
      if (response.ok) {
        const bibleData = await response.json();
        const matchedBook = bibleData.books?.find(
          (b: any) =>
            b.name?.toLowerCase() === book.name.toLowerCase() ||
            b.name?.toLowerCase().includes(book.name.toLowerCase().replace(/^\d+\s*/, ''))
        );
        const ch = matchedBook?.chapters?.find((c: any) => (c.chapter || c.nr) === chapter);
        if (ch && Array.isArray(ch.verses) && ch.verses.length > 0) {
          const sanitized: BollsVerseItem[] = ch.verses.map((v: any) => ({
            verse: Number(v.verse),
            text: sanitizeVerseText(
              isChinese ? String(v.text || '').replace(/\s+/g, '') : String(v.text || '')
            ),
          }));
          serverChapterCache.set(cacheKey, sanitized);
          return { verses: sanitized, source: 'github-mirror' };
        }
      }
    } catch (_mirrorErr) {
      // Proceed to Gemini fallback
    }
  }

  // Automatic Fallback 3: Gemini 3.8 Flash low-latency verbatim retrieval for any other chapter
  const ai = getAiClient();
  if (ai && book) {
    const transHint =
      translation === 'CUV' || apiSlug === 'CUV'
        ? 'Simplified Chinese Union Version (和合本 CUV)'
        : translation === 'CNV' || apiSlug === 'CNVS'
          ? 'Simplified Chinese New Version (新译本 CNV)'
          : translation === 'CCB' || apiSlug === 'CCB'
            ? 'Simplified Chinese Contemporary Bible (当代译本 CCB)'
            : `${translation} (${apiSlug})`;
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: `Provide the verbatim Scripture verses for ${book.name} (${book.zhName}) chapter ${chapter} in the ${transHint} translation. Return a JSON array of objects with "verse" (integer) and "text" (clean verse string without HTML tags).`,
        config: {
          thinkingConfig: { thinkingLevel: ThinkingLevel.LOW },
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                verse: { type: Type.INTEGER },
                text: { type: Type.STRING },
              },
              required: ['verse', 'text'],
            },
          },
        },
      });

      const rawText = response.text?.trim();
      if (rawText) {
        const parsed = JSON.parse(rawText);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const sanitized: BollsVerseItem[] = parsed.map((v: any) => ({
            verse: Number(v.verse),
            text: sanitizeVerseText(String(v.text || '')),
          }));
          serverChapterCache.set(cacheKey, sanitized);
          return { verses: sanitized, source: 'gemini-fallback' };
        }
      }
    } catch (_geminiErr) {
      // Proceed
    }
  }

  if (offline && offline.length > 0) {
    return { verses: offline, source: 'offline-cache' };
  }

  return { verses: [], source: 'offline-cache' };
}

async function startServer() {
  const app = express();
  app.use(express.json());

  // Deterministic Scripture Chapter Retrieval Endpoint
  app.get('/api/bolls/:translation/:bookId/:chapter', async (req, res) => {
    try {
      const { translation, bookId, chapter } = req.params;
      const numericBookId = parseInt(bookId, 10);
      const numericChapter = parseInt(chapter, 10);
      const verseStart = req.query.verseStart ? parseInt(String(req.query.verseStart), 10) : undefined;
      const verseEnd = req.query.verseEnd ? parseInt(String(req.query.verseEnd), 10) : undefined;

      if (
        isNaN(numericBookId) ||
        numericBookId < 1 ||
        numericBookId > 66 ||
        isNaN(numericChapter) ||
        numericChapter < 1
      ) {
        res.status(400).json({ error: 'Invalid bookId (1-66) or chapter number.' });
        return;
      }

      const result = await fetchChapterFromBollsOrFallback(
        translation,
        numericBookId,
        numericChapter,
        verseStart,
        verseEnd
      );
      res.json(result);
    } catch (error: any) {
      res.status(500).json({
        error: error?.message || 'Failed to retrieve Scripture chapter.',
      });
    }
  });

  // Path B: Gemini 3.8 Flash Semantic Router Endpoint
  app.post('/api/semantic-search', async (req, res) => {
    try {
      const query = String(req.body?.query || '').trim();
      if (!query) {
        res.status(400).json({ error: 'Search query is required.' });
        return;
      }

      const localMatches = matchLocalSemanticPhrases(query);
      const ai = getAiClient();

      if (ai) {
        try {
          const response = await ai.models.generateContent({
            model: 'gemini-3.8-flash',
            contents: `User sermon search query: "${query}"`,
            config: {
              systemInstruction:
                'You are an expert biblical concordance router for a live church sermon note-taking app. ' +
                'Given a phrase, partial quote, paraphrase, or thematic description, resolve the top 1 to 4 most accurate Protestant Bible candidate references. ' +
                'Use canonical Protestant bookId numbers (1 = Genesis, 19 = Psalms, 23 = Isaiah, 40 = Matthew, 43 = John, 45 = Romans, 46 = 1 Corinthians, 47 = 2 Corinthians, 49 = Ephesians, 50 = Philippians, 58 = Hebrews, 66 = Revelation). ' +
                'Automatically detect whether the user query points to a single verse (verseStart === verseEnd) or a multi-verse passage (verseEnd > verseStart, max 6 verses). ' +
                'Keep confidenceReason concise (under 14 words).',
              responseMimeType: 'application/json',
              responseSchema: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    bookId: {
                      type: Type.INTEGER,
                      description: 'Canonical Protestant book number from 1 (Genesis) to 66 (Revelation).',
                    },
                    bookName: {
                      type: Type.STRING,
                      description: 'Standard Protestant book name, e.g. Romans, 2 Corinthians, John.',
                    },
                    chapter: {
                      type: Type.INTEGER,
                      description: 'Chapter number (1-indexed).',
                    },
                    verseStart: {
                      type: Type.INTEGER,
                      description: 'Starting verse number (1-indexed).',
                    },
                    verseEnd: {
                      type: Type.INTEGER,
                      description: 'Ending verse number (>= verseStart).',
                    },
                    confidenceReason: {
                      type: Type.STRING,
                      description: 'Brief explanation of why this passage matches the query.',
                    },
                  },
                  required: [
                    'bookId',
                    'bookName',
                    'chapter',
                    'verseStart',
                    'verseEnd',
                    'confidenceReason',
                  ],
                },
              },
            },
          });

          const rawJson = response.text?.trim();
          if (rawJson) {
            const parsed = JSON.parse(rawJson);
            if (Array.isArray(parsed) && parsed.length > 0) {
              const normalized = parsed
                .slice(0, 4)
                .map((item: any) => {
                  const resolvedBook =
                    BIBLE_BOOKS[Number(item.bookId) - 1] ||
                    resolveBookByName(String(item.bookName || ''));
                  if (!resolvedBook) return null;
                  const chapter = Math.max(1, Math.min(resolvedBook.chapters, Number(item.chapter) || 1));
                  const verseStart = Math.max(1, Number(item.verseStart) || 1);
                  const verseEnd = Math.max(verseStart, Number(item.verseEnd) || verseStart);
                  return {
                    bookId: resolvedBook.id,
                    bookName: resolvedBook.name,
                    chapter,
                    verseStart,
                    verseEnd,
                    confidenceReason: String(item.confidenceReason || 'Semantic Scripture match'),
                    source: 'semantic' as const,
                  };
                })
                .filter(Boolean);

              if (normalized.length > 0) {
                res.json({ candidates: normalized, router: 'gemini-3.8-flash' });
                return;
              }
            }
          }
        } catch (_aiErr) {
          // Fall through to local concordance if Gemini call fails
        }
      }

      if (localMatches.length > 0) {
        res.json({
          candidates: localMatches.map((c) => ({ ...c, source: 'semantic' })),
          router: 'local-concordance',
        });
        return;
      }

      // Default graceful thematic suggestions if both AI and exact keyword fail
      res.json({
        candidates: [
          {
            bookId: 45,
            bookName: 'Romans',
            chapter: 8,
            verseStart: 28,
            verseEnd: 28,
            confidenceReason: 'God working all things together for good',
            source: 'semantic',
          },
          {
            bookId: 50,
            bookName: 'Philippians',
            chapter: 4,
            verseStart: 6,
            verseEnd: 7,
            confidenceReason: 'The peace of God guarding hearts and minds',
            source: 'semantic',
          },
        ],
        router: 'fallback-suggestions',
      });
    } catch (error: any) {
      res.status(500).json({
        error: error?.message || 'Semantic router failed.',
      });
    }
  });

  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        hmr: false,
        watch: null,
      },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    const srcAssetsPath = path.join(process.cwd(), 'src', 'assets');
    app.use('/src/assets', express.static(srcAssetsPath));
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`VerseFlow server running on http://localhost:${PORT}`);
  });
}

startServer();
