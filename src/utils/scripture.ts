export type SupportedTranslation =
  | 'NKJV'
  | 'KJV'
  | 'YLT'
  | 'NLT'
  | 'ESV'
  | 'AMPC'
  | 'CUV';

export type CopyFormatMode = 'plain' | 'notion';

export const SUPPORTED_TRANSLATIONS: readonly SupportedTranslation[] = [
  'NKJV',
  'KJV',
  'YLT',
  'NLT',
  'ESV',
  'AMPC',
  'CUV',
] as const;

export const TRANSLATION_METADATA: Record<
  SupportedTranslation,
  {
    label: string;
    apiSlug: string;
    fullName: string;
    isChinese?: boolean;
  }
> = {
  NKJV: { label: 'NKJV', apiSlug: 'NKJV', fullName: 'New King James Version' },
  KJV: { label: 'KJV', apiSlug: 'KJV', fullName: 'King James Version' },
  YLT: { label: 'YLT', apiSlug: 'YLT', fullName: "Young's Literal Translation" },
  NLT: { label: 'NLT', apiSlug: 'NLT', fullName: 'New Living Translation' },
  ESV: { label: 'ESV', apiSlug: 'ESV', fullName: 'English Standard Version' },
  AMPC: { label: 'AMPC', apiSlug: 'AMP', fullName: 'Amplified Bible Classic' },
  CUV: {
    label: '和合本',
    apiSlug: 'CUV',
    fullName: 'Chinese Union Version (和合本)',
    isChinese: true,
  },
};

export function isChineseTranslation(translation: SupportedTranslation | string): boolean {
  const clean = translation.trim().toUpperCase();
  if (
    clean === 'CUV' ||
    clean === 'CUVS' ||
    clean === 'CUNPS' ||
    clean === '和合本'
  ) {
    return true;
  }
  return false;
}

export function getTranslationDisplayLabel(translation: SupportedTranslation | string): string {
  const upper = translation.trim().toUpperCase() as SupportedTranslation;
  if (upper in TRANSLATION_METADATA) {
    return TRANSLATION_METADATA[upper].label;
  }
  if (translation.trim() === '和合本') {
    return '和合本';
  }
  return translation.trim().toUpperCase();
}

/**
 * Humanized search notice for display above results.
 */
export function formatHumanizedSearchNotice(params: {
  query: string;
  routeType: 'regex' | 'semantic';
  passageCount: number;
  primaryCitation?: string;
  isChinese?: boolean;
}): string {
  const { query, routeType, passageCount, primaryCitation, isChinese } = params;

  if (isChinese) {
    if (routeType === 'regex' && primaryCitation) {
      return `显示 ${primaryCitation}`;
    }
    if (passageCount === 1) {
      return primaryCitation
        ? `找到 1 处相关经文：${primaryCitation}`
        : `找到 1 处相关经文（“${query}”）`;
    }
    return `找到 ${passageCount} 处相关经文（“${query}”）`;
  }

  // English phrasing
  if (routeType === 'regex' && primaryCitation) {
    return `Showing ${primaryCitation}`;
  }
  if (passageCount === 1) {
    return `Found 1 matching passage for “${query}”`;
  }
  return `Found ${passageCount} matching passages for “${query}”`;
}

/**
 * Humanized match badge label for verse cards.
 */
export function getHumanizedMatchBadge(
  source: 'regex' | 'semantic',
  isChinese?: boolean
): string {
  if (isChinese) {
    return source === 'regex' ? '精确引用' : '主题匹配';
  }
  return source === 'regex' ? 'Exact Citation' : 'Topic Match';
}

/**
 * Humanized gentle hint for phrase / topic matches.
 */
export function formatHumanizedPhraseHint(
  reason: string,
  _userQuery?: string,
  isChinese?: boolean
): string {
  if (!reason) return '';
  const cleaned = reason
    .replace(/^Exact match for /i, '')
    .replace(/^Match for /i, '')
    .replace(/^Relevant passage: /i, '')
    .trim();

  if (isChinese) {
    return `匹配相关词句：“${cleaned}”`;
  }
  return `Matched phrase: “${cleaned}”`;
}

/**
 * Maps UI translation selection to the upstream Bolls Life REST API slug.
 * Specifically maps AMPC -> AMP, CUV -> CUV, CNV -> CNVS, CCB -> CCB.
 */
export function toBollsTranslationSlug(translation: SupportedTranslation | string): string {
  const trimmed = translation.trim();
  if (trimmed === '和合本') return 'CUV';
  if (trimmed === '新译本') return 'CNVS';
  if (trimmed === '当代译本') return 'CCB';

  const upper = trimmed.toUpperCase();
  if (upper === 'AMPC' || upper === 'AMP') {
    return 'AMP';
  }
  if (upper === 'CUV' || upper === 'CUVS') {
    return 'CUV';
  }
  if (upper === 'CNV' || upper === 'CNVS') {
    return 'CNVS';
  }
  if (upper === 'CCB') {
    return 'CCB';
  }
  if (upper in TRANSLATION_METADATA) {
    return TRANSLATION_METADATA[upper as SupportedTranslation].apiSlug;
  }
  return 'NKJV';
}

export interface BibleBook {
  id: number;
  name: string;
  zhName: string;
  testament: 'OT' | 'NT';
  chapters: number;
  aliases: string[];
}

/**
 * Canonical Protestant 66-book numerical order (1 = Genesis ... 40 = Matthew ... 45 = Romans ... 66 = Revelation)
 * Includes canonical Mandarin book names (zhName) and Mandarin abbreviations.
 */
export const BIBLE_BOOKS: readonly BibleBook[] = [
  { id: 1, name: 'Genesis', zhName: '创世记', testament: 'OT', chapters: 50, aliases: ['gen', 'ge', 'gn', '创', '創世記'] },
  { id: 2, name: 'Exodus', zhName: '出埃及记', testament: 'OT', chapters: 40, aliases: ['exod', 'exo', 'ex', '出', '出埃及記'] },
  { id: 3, name: 'Leviticus', zhName: '利未记', testament: 'OT', chapters: 27, aliases: ['lev', 'le', 'lv', '利', '利未記'] },
  { id: 4, name: 'Numbers', zhName: '民数记', testament: 'OT', chapters: 36, aliases: ['num', 'nu', 'nm', 'nb', '民', '民數記'] },
  { id: 5, name: 'Deuteronomy', zhName: '申命记', testament: 'OT', chapters: 34, aliases: ['deut', 'deu', 'dt', '申', '申命記'] },
  { id: 6, name: 'Joshua', zhName: '约书亚记', testament: 'OT', chapters: 24, aliases: ['josh', 'jos', 'jsh', '书', '約書亞記'] },
  { id: 7, name: 'Judges', zhName: '士师记', testament: 'OT', chapters: 21, aliases: ['judg', 'jdg', 'jg', 'jdgs', '士', '士師記'] },
  { id: 8, name: 'Ruth', zhName: '路得记', testament: 'OT', chapters: 4, aliases: ['rth', 'ru', '得', '路得記'] },
  { id: 9, name: '1 Samuel', zhName: '撒母耳记上', testament: 'OT', chapters: 31, aliases: ['1 sam', '1sam', '1 sa', '1sa', '1 sm', '1s', 'i sam', 'i samuel', 'first samuel', '撒上', '撒母耳記上'] },
  { id: 10, name: '2 Samuel', zhName: '撒母耳记下', testament: 'OT', chapters: 24, aliases: ['2 sam', '2sam', '2 sa', '2sa', '2 sm', '2s', 'ii sam', 'ii samuel', 'second samuel', '撒下', '撒母耳記下'] },
  { id: 11, name: '1 Kings', zhName: '列王纪上', testament: 'OT', chapters: 22, aliases: ['1 kgs', '1kgs', '1 ki', '1ki', '1k', 'i kgs', 'i kings', 'first kings', '王上', '列王紀上'] },
  { id: 12, name: '2 Kings', zhName: '列王纪下', testament: 'OT', chapters: 25, aliases: ['2 kgs', '2kgs', '2 ki', '2ki', '2k', 'ii kgs', 'ii kings', 'second kings', '王下', '列王紀下'] },
  { id: 13, name: '1 Chronicles', zhName: '历代志上', testament: 'OT', chapters: 29, aliases: ['1 chr', '1chr', '1 ch', '1ch', 'i chr', 'i chronicles', 'first chronicles', '代上', '歷代志上'] },
  { id: 14, name: '2 Chronicles', zhName: '历代志下', testament: 'OT', chapters: 36, aliases: ['2 chr', '2chr', '2 ch', '2ch', 'ii chr', 'ii chronicles', 'second chronicles', '代下', '歷代志下'] },
  { id: 15, name: 'Ezra', zhName: '以斯拉记', testament: 'OT', chapters: 10, aliases: ['ezr', 'ez', '拉', '以斯拉記'] },
  { id: 16, name: 'Nehemiah', zhName: '尼希米记', testament: 'OT', chapters: 13, aliases: ['neh', 'ne', '尼', '尼希米記'] },
  { id: 17, name: 'Esther', zhName: '以斯帖记', testament: 'OT', chapters: 10, aliases: ['esth', 'est', 'es', '斯', '以斯帖記'] },
  { id: 18, name: 'Job', zhName: '约伯记', testament: 'OT', chapters: 42, aliases: ['jb', '伯', '約伯記'] },
  { id: 19, name: 'Psalms', zhName: '诗篇', testament: 'OT', chapters: 150, aliases: ['psalm', 'ps', 'psa', 'psm', 'pss', '诗', '詩篇', '詩'] },
  { id: 20, name: 'Proverbs', zhName: '箴言', testament: 'OT', chapters: 31, aliases: ['prov', 'pro', 'prv', 'pr', '箴'] },
  { id: 21, name: 'Ecclesiastes', zhName: '传道书', testament: 'OT', chapters: 12, aliases: ['eccl', 'ecc', 'ec', 'qoh', '传', '傳道書'] },
  { id: 22, name: 'Song of Solomon', zhName: '雅歌', testament: 'OT', chapters: 8, aliases: ['song', 'song of songs', 'sos', 'so', 'cant', 'canticles', '歌'] },
  { id: 23, name: 'Isaiah', zhName: '以赛亚书', testament: 'OT', chapters: 66, aliases: ['isa', 'is', '赛', '以賽亞書'] },
  { id: 24, name: 'Jeremiah', zhName: '耶利米书', testament: 'OT', chapters: 52, aliases: ['jer', 'je', 'jr', '耶', '耶利米書'] },
  { id: 25, name: 'Lamentations', zhName: '耶利米哀歌', testament: 'OT', chapters: 5, aliases: ['lam', 'la', '哀', '耶利米哀歌'] },
  { id: 26, name: 'Ezekiel', zhName: '以西结书', testament: 'OT', chapters: 48, aliases: ['ezek', 'eze', 'ezk', '结', '以西結書'] },
  { id: 27, name: 'Daniel', zhName: '但以理书', testament: 'OT', chapters: 12, aliases: ['dan', 'da', 'dn', '但', '但以理書'] },
  { id: 28, name: 'Hosea', zhName: '何西阿书', testament: 'OT', chapters: 14, aliases: ['hos', 'ho', '何', '何西阿書'] },
  { id: 29, name: 'Joel', zhName: '约珥书', testament: 'OT', chapters: 3, aliases: ['joe', 'jl', '珥', '約珥書'] },
  { id: 30, name: 'Amos', zhName: '阿摩司书', testament: 'OT', chapters: 9, aliases: ['amo', 'am', '摩', '阿摩司書'] },
  { id: 31, name: 'Obadiah', zhName: '俄巴底亚书', testament: 'OT', chapters: 1, aliases: ['obad', 'ob', '俄', '俄巴底亞書'] },
  { id: 32, name: 'Jonah', zhName: '约拿书', testament: 'OT', chapters: 4, aliases: ['jon', 'jnh', '拿', '約拿書'] },
  { id: 33, name: 'Micah', zhName: '弥迦书', testament: 'OT', chapters: 7, aliases: ['mic', 'mc', '弥', '彌迦書'] },
  { id: 34, name: 'Nahum', zhName: '那鸿书', testament: 'OT', chapters: 3, aliases: ['nah', 'na', '鸿', '那鴻書'] },
  { id: 35, name: 'Habakkuk', zhName: '哈巴谷书', testament: 'OT', chapters: 3, aliases: ['hab', 'hb', '哈', '哈巴谷書'] },
  { id: 36, name: 'Zephaniah', zhName: '西番雅书', testament: 'OT', chapters: 3, aliases: ['zeph', 'zep', 'zp', '番', '西番雅書'] },
  { id: 37, name: 'Haggai', zhName: '哈该书', testament: 'OT', chapters: 2, aliases: ['hag', 'hg', '该', '哈該書'] },
  { id: 38, name: 'Zechariah', zhName: '撒迦利亚书', testament: 'OT', chapters: 14, aliases: ['zech', 'zec', 'zc', '亚', '撒迦利亞書'] },
  { id: 39, name: 'Malachi', zhName: '玛拉基书', testament: 'OT', chapters: 4, aliases: ['mal', 'ml', '玛', '瑪拉基書'] },
  { id: 40, name: 'Matthew', zhName: '马太福音', testament: 'NT', chapters: 28, aliases: ['matt', 'mat', 'mt', '太', '馬太福音'] },
  { id: 41, name: 'Mark', zhName: '马可福音', testament: 'NT', chapters: 16, aliases: ['mrk', 'mar', 'mk', 'mr', '可', '馬可福音'] },
  { id: 42, name: 'Luke', zhName: '路加福音', testament: 'NT', chapters: 24, aliases: ['luk', 'lk', '路', '路加福音'] },
  { id: 43, name: 'John', zhName: '约翰福音', testament: 'NT', chapters: 21, aliases: ['jhn', 'jn', 'joh', '约', '約翰福音', '約'] },
  { id: 44, name: 'Acts', zhName: '使徒行传', testament: 'NT', chapters: 28, aliases: ['act', 'ac', '徒', '使徒行傳'] },
  { id: 45, name: 'Romans', zhName: '罗马书', testament: 'NT', chapters: 16, aliases: ['rom', 'ro', 'rm', '罗', '羅馬書', '羅'] },
  { id: 46, name: '1 Corinthians', zhName: '哥林多前书', testament: 'NT', chapters: 16, aliases: ['1 cor', '1cor', '1 co', '1co', 'i cor', 'i corinthians', 'first corinthians', '林前', '哥林多前書'] },
  { id: 47, name: '2 Corinthians', zhName: '哥林多后书', testament: 'NT', chapters: 13, aliases: ['2 cor', '2cor', '2 co', '2co', 'ii cor', 'ii corinthians', 'second corinthians', '林后', '哥林多後書'] },
  { id: 48, name: 'Galatians', zhName: '加拉太书', testament: 'NT', chapters: 6, aliases: ['gal', 'ga', '加', '加拉太書'] },
  { id: 49, name: 'Ephesians', zhName: '以弗所书', testament: 'NT', chapters: 6, aliases: ['eph', 'ephes', '弗', '以弗所書'] },
  { id: 50, name: 'Philippians', zhName: '腓立比书', testament: 'NT', chapters: 4, aliases: ['phil', 'php', 'pp', '腓', '腓立比書'] },
  { id: 51, name: 'Colossians', zhName: '歌罗西书', testament: 'NT', chapters: 4, aliases: ['col', 'co', '西', '歌羅西書'] },
  { id: 52, name: '1 Thessalonians', zhName: '帖撒罗尼迦前书', testament: 'NT', chapters: 5, aliases: ['1 thess', '1thess', '1 th', '1th', 'i thess', 'i thessalonians', 'first thessalonians', '帖前', '帖撒羅尼迦前書'] },
  { id: 53, name: '2 Thessalonians', zhName: '帖撒罗尼迦后书', testament: 'NT', chapters: 3, aliases: ['2 thess', '2thess', '2 th', '2th', 'ii thess', 'ii thessalonians', 'second thessalonians', '帖后', '帖撒羅尼迦後書'] },
  { id: 54, name: '1 Timothy', zhName: '提摩太前书', testament: 'NT', chapters: 6, aliases: ['1 tim', '1tim', '1 ti', '1ti', 'i tim', 'i timothy', 'first timothy', '提前', '提摩太前書'] },
  { id: 55, name: '2 Timothy', zhName: '提摩太后书', testament: 'NT', chapters: 4, aliases: ['2 tim', '2tim', '2 ti', '2ti', 'ii tim', 'ii timothy', 'second timothy', '提后', '提摩太後書'] },
  { id: 56, name: 'Titus', zhName: '提多书', testament: 'NT', chapters: 3, aliases: ['tit', 'ti', '多', '提多書'] },
  { id: 57, name: 'Philemon', zhName: '腓利门书', testament: 'NT', chapters: 1, aliases: ['phlm', 'phm', 'pm', '门', '腓利門書'] },
  { id: 58, name: 'Hebrews', zhName: '希伯来书', testament: 'NT', chapters: 13, aliases: ['heb', 'he', '来', '希伯來書'] },
  { id: 59, name: 'James', zhName: '雅各书', testament: 'NT', chapters: 5, aliases: ['jas', 'jam', 'jm', '雅', '雅各書'] },
  { id: 60, name: '1 Peter', zhName: '彼得前书', testament: 'NT', chapters: 5, aliases: ['1 pet', '1pet', '1 pe', '1pe', '1 pt', '1pt', '1p', 'i pet', 'i peter', 'first peter', '彼前', '彼得前書'] },
  { id: 61, name: '2 Peter', zhName: '彼得后书', testament: 'NT', chapters: 3, aliases: ['2 pet', '2pet', '2 pe', '2pe', '2 pt', '2pt', '2p', 'ii pet', 'ii peter', 'second peter', '彼后', '彼得後書'] },
  { id: 62, name: '1 John', zhName: '约翰一书', testament: 'NT', chapters: 5, aliases: ['1 john', '1john', '1 jhn', '1jhn', '1 jn', '1jn', '1j', 'i john', 'i jn', 'first john', '约一', '約翰一書'] },
  { id: 63, name: '2 John', zhName: '约翰二书', testament: 'NT', chapters: 1, aliases: ['2 john', '2john', '2 jhn', '2jhn', '2 jn', '2jn', '2j', 'ii john', 'ii jn', 'second john', '约二', '約翰二書'] },
  { id: 64, name: '3 John', zhName: '约翰三书', testament: 'NT', chapters: 1, aliases: ['3 john', '3john', '3 jhn', '3jhn', '3 jn', '3jn', '3j', 'iii john', 'iii jn', 'third john', '约三', '約翰三書'] },
  { id: 65, name: 'Jude', zhName: '犹大书', testament: 'NT', chapters: 1, aliases: ['jud', 'jd', '犹', '猶大書'] },
  { id: 66, name: 'Revelation', zhName: '启示录', testament: 'NT', chapters: 22, aliases: ['rev', 're', 'revelations', 'apoc', 'apocalypse', '启', '啟示錄'] },
] as const;

const BOOK_LOOKUP_MAP: Map<string, BibleBook> = (() => {
  const map = new Map<string, BibleBook>();
  for (const book of BIBLE_BOOKS) {
    const cleanName = book.name.toLowerCase();
    map.set(cleanName, book);
    map.set(cleanName.replace(/\s+/g, ''), book);
    map.set(book.zhName, book);
    for (const alias of book.aliases) {
      const cleanAlias = alias.toLowerCase().trim();
      map.set(cleanAlias, book);
      map.set(cleanAlias.replace(/\s+/g, ''), book);
    }
  }
  return map;
})();

export function getBookById(bookId: number): BibleBook | undefined {
  return BIBLE_BOOKS[bookId - 1];
}

export function resolveBookByName(rawBookName: string): BibleBook | undefined {
  let normalized = rawBookName
    .toLowerCase()
    .replace(/[’‘`]/g, "'")
    .replace(/\./g, '')
    .replace(
      /^(the\s+book\s+of|the\s+epistle\s+of|epistle\s+of|letter\s+of|letter\s+to\s+the|paul's\s+letter\s+to\s+the|paul's\s+epistle\s+to\s+the|the\s+gospel\s+of|gospel\s+of)\s+/i,
      ''
    )
    .replace(/\s+/g, ' ')
    .trim();

  // 1. Direct dictionary match
  let found =
    BOOK_LOOKUP_MAP.get(normalized) ||
    BOOK_LOOKUP_MAP.get(normalized.replace(/\s+/g, ''));
  if (found) return found;

  // 2. Possessive stripping: "roman's" -> "roman", "romans'" -> "romans", "john's" -> "john"
  const strippedPossessive = normalized.replace(/'s$/i, '').replace(/'$/i, '').trim();
  found =
    BOOK_LOOKUP_MAP.get(strippedPossessive) ||
    BOOK_LOOKUP_MAP.get(strippedPossessive.replace(/\s+/g, ''));
  if (found) return found;

  // 3. Pluralize check: e.g. "roman" -> "romans"
  const pluralized = strippedPossessive + 's';
  found =
    BOOK_LOOKUP_MAP.get(pluralized) ||
    BOOK_LOOKUP_MAP.get(pluralized.replace(/\s+/g, ''));
  if (found) return found;

  // 4. Singular check: e.g. "psalms" -> "psalm"
  if (strippedPossessive.endsWith('s')) {
    const singular = strippedPossessive.slice(0, -1);
    found =
      BOOK_LOOKUP_MAP.get(singular) ||
      BOOK_LOOKUP_MAP.get(singular.replace(/\s+/g, ''));
    if (found) return found;
  }

  return undefined;
}

export interface ParsedReference {
  bookId: number;
  bookName: string;
  chapter: number;
  verseStart: number;
  verseEnd: number;
  confidenceReason?: string;
  source: 'regex' | 'semantic';
}

/**
 * Path A (Zero-Latency Regex Parser):
 * Matches direct Bible references in both English and Chinese such as:
 * - "rom 8 28"
 * - "romans 8:7-28"
 * - "roman's 8:7-28" / "roman’s 8:7-28"
 * - "John 3:16-18"
 * - "1 cor 13:4"
 * - "罗马书 8:28"
 * - "约 3:16-18"
 */
export function parseDirectReference(input: string): ParsedReference | null {
  const trimmed = input
    .trim()
    .replace(/[\u2013\u2014]/g, '-') // normalize en-dash / em-dash to hyphen
    .replace(/：/g, ':') // normalize full-width Chinese colon
    .replace(/[’‘`]/g, "'") // normalize smart apostrophes to standard apostrophe
    .replace(/\s+/g, ' ');

  if (!trimmed || trimmed.length < 2) return null;

  const preprocessed = trimmed
    .replace(
      /^(the\s+book\s+of|the\s+epistle\s+of|epistle\s+of|letter\s+of|letter\s+to\s+the|paul's\s+letter\s+to\s+the|paul's\s+letter\s+to|paul's\s+epistle\s+to\s+the|the\s+gospel\s+of|gospel\s+of)\s+/i,
      ''
    );

  const refRegex =
    /^((?:[123]|i{1,3}|first|second|third)?\s*[a-zA-Z\u4e00-\u9fff']+(?:\s+of\s+[a-zA-Z]+)?)\.?\s*(\d{1,3})(?:[:.\s]+(\d{1,3})(?:\s*-\s*(\d{1,3}))?)?$/i;

  const match = preprocessed.match(refRegex);
  if (!match) return null;

  const [, rawBookPart, rawChapter, rawVerseStart, rawVerseEnd] = match;
  const book = resolveBookByName(rawBookPart);
  if (!book) return null;

  const chapter = parseInt(rawChapter, 10);
  if (isNaN(chapter) || chapter < 1 || chapter > book.chapters) {
    return null;
  }

  let verseStart = rawVerseStart ? parseInt(rawVerseStart, 10) : 1;
  let verseEnd = rawVerseEnd
    ? parseInt(rawVerseEnd, 10)
    : rawVerseStart
      ? verseStart
      : 5;

  if (isNaN(verseStart) || verseStart < 1) verseStart = 1;
  if (isNaN(verseEnd) || verseEnd < verseStart) verseEnd = verseStart;

  return {
    bookId: book.id,
    bookName: book.name,
    chapter,
    verseStart,
    verseEnd,
    source: 'regex',
    confidenceReason: 'Direct Reference Match',
  };
}

/**
 * Sanitizes raw verse text returned by Bolls Life REST API:
 * - Strips Strong's concordance tags and numbers (<S>1234</S>)
 * - Strips superscript footnote markers (<sup>...</sup>)
 * - Replaces <br>, <br/> with a space
 * - Strips italic/bold/other HTML tags (<i>, </i>, <b>, etc.)
 * - Decodes HTML entities
 * - Normalizes whitespace so copied text never breaks unintendedly
 */
export function sanitizeVerseText(rawText: string): string {
  if (!rawText) return '';

  return rawText
    .replace(/<S>.*?<\/S>/gi, '')
    .replace(/<sup[^>]*>.*?<\/sup>/gi, '')
    .replace(/<br\s*\/?>/gi, ' ')
    .replace(/<[^>]+>/g, '')
    .replace(/\[[a-zA-Z0-9]{1,2}\]/g, '')
    .replace(/&nbsp;/gi, ' ')
    .replace(/&#8212;|&mdash;/gi, '—')
    .replace(/&#8211;|&ndash;/gi, '–')
    .replace(/&quot;|&#34;/gi, '"')
    .replace(/&apos;|&#39;|&rsquo;/gi, "'")
    .replace(/&lsquo;/gi, "'")
    .replace(/&ldquo;|&rdquo;/gi, '"')
    .replace(/&amp;/gi, '&')
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/\s+/g, ' ')
    .replace(/\s+([,.;:?!])/g, '$1')
    .trim();
}

export function formatDisplayBookName(
  bookName: string,
  translation?: SupportedTranslation | string
): string {
  if (translation && isChineseTranslation(translation)) {
    const resolved = resolveBookByName(bookName);
    if (resolved) {
      return resolved.zhName;
    }
  }
  return bookName === 'Psalms' ? 'Psalm' : bookName;
}

export function formatReferenceCitation(
  bookName: string,
  chapter: number,
  verseStart: number,
  verseEnd: number,
  translation?: SupportedTranslation | string
): string {
  const displayBook = formatDisplayBookName(bookName, translation);
  if (verseStart === verseEnd) {
    return `${displayBook} ${chapter}:${verseStart}`;
  }
  return `${displayBook} ${chapter}:${verseStart}-${verseEnd}`;
}

export interface PassageCopyParams {
  bookName: string;
  chapter: number;
  verseStart: number;
  verseEnd: number;
  translation: SupportedTranslation | string;
  text: string;
  note?: string;
}

/**
 * Formats the verse card in Plain Text Mode (Default):
 * `[Book] [Chapter]:[VerseStart]-[VerseEnd] ([Translation])\n[Clean Scripture Text without HTML tags]`
 * If a note/speaker point is attached, appends `\nSpeaker Point: [note]`.
 */
export function formatPlainTextPassage(params: PassageCopyParams): string {
  const citation = formatReferenceCitation(
    params.bookName,
    params.chapter,
    params.verseStart,
    params.verseEnd,
    params.translation
  );
  const cleanText = sanitizeVerseText(params.text);
  const transLabel = getTranslationDisplayLabel(params.translation);
  const notePart =
    params.note && params.note.trim() ? `\nSpeaker Point: ${params.note.trim()}` : '';
  return `${citation} (${transLabel})\n${cleanText}${notePart}`;
}

/**
 * Formats the verse card in Notion Copy Block Mode:
 * `> [Clean Scripture Text without HTML tags] \n—**[Book] [Chapter]:[VerseStart]-[VerseEnd] ([Translation])**`
 * If a note/speaker point is attached, appends `\n> 💡 *Speaker Point: [note]*`.
 */
export function formatNotionBlockquote(params: PassageCopyParams): string {
  const citation = formatReferenceCitation(
    params.bookName,
    params.chapter,
    params.verseStart,
    params.verseEnd,
    params.translation
  );
  const cleanText = sanitizeVerseText(params.text);
  const transLabel = getTranslationDisplayLabel(params.translation);
  const notePart =
    params.note && params.note.trim()
      ? `\n> 💡 *Speaker Point: ${params.note.trim()}*`
      : '';
  return `> ${cleanText} \n—**${citation} (${transLabel})**${notePart}`;
}

/**
 * Formats a single passage according to the selected global copy format ('plain' | 'notion')
 */
export function formatPassageForClipboard(
  params: PassageCopyParams,
  mode: CopyFormatMode = 'plain'
): string {
  return mode === 'notion'
    ? formatNotionBlockquote(params)
    : formatPlainTextPassage(params);
}

/**
 * Joins multiple queued passages with double newlines (\n\n) for bulk paste
 */
export function formatNotionQueuePayload(
  items: PassageCopyParams[],
  mode: CopyFormatMode = 'plain'
): string {
  return items
    .map((item) => formatPassageForClipboard(item, mode))
    .join('\n\n');
}

/**
 * Calculates expanded verse range for Add prev verse and Add next verse buttons
 */
export function expandVerseRange(
  verseStart: number,
  verseEnd: number,
  direction: 'prev' | 'next',
  maxChapterVerse: number
): { verseStart: number; verseEnd: number; changed: boolean } {
  if (direction === 'prev') {
    const nextStart = Math.max(1, verseStart - 1);
    return {
      verseStart: nextStart,
      verseEnd,
      changed: nextStart !== verseStart,
    };
  } else {
    const safeMax = Math.max(verseEnd, maxChapterVerse);
    const nextEnd = Math.min(safeMax, verseEnd + 1);
    return {
      verseStart,
      verseEnd: nextEnd,
      changed: nextEnd !== verseEnd,
    };
  }
}

export interface SemanticCandidate {
  bookId: number;
  bookName: string;
  chapter: number;
  verseStart: number;
  verseEnd: number;
  confidenceReason: string;
}

const LOCAL_CONCORDANCE: Array<{
  keywords: string[];
  candidate: SemanticCandidate;
}> = [
  {
    keywords: ['treasure', 'jars of clay', 'earthen vessels', 'excellency of the power', '瓦器', '宝贝'],
    candidate: {
      bookId: 47,
      bookName: '2 Corinthians',
      chapter: 4,
      verseStart: 7,
      verseEnd: 9,
      confidenceReason: 'Paul on holding gospel treasure in fragile earthen vessels (jars of clay)',
    },
  },
  {
    keywords: ['jesus wept', 'shortest verse', 'lazarus tomb wept', '耶稣哭了'],
    candidate: {
      bookId: 43,
      bookName: 'John',
      chapter: 11,
      verseStart: 35,
      verseEnd: 35,
      confidenceReason: 'Verbatim phrase at the tomb of Lazarus',
    },
  },
  {
    keywords: ['peace', 'guard', 'guarding your heart', 'anxious for nothing', 'surpasses all understanding', '应当一无挂虑', '出人意外的平安'],
    candidate: {
      bookId: 50,
      bookName: 'Philippians',
      chapter: 4,
      verseStart: 6,
      verseEnd: 7,
      confidenceReason: 'The peace of God guarding hearts and minds in Christ Jesus',
    },
  },
  {
    keywords: ['all things work together', 'work together for good', 'called according to his purpose', '万事都互相效力', '叫爱神的人得益处'],
    candidate: {
      bookId: 45,
      bookName: 'Romans',
      chapter: 8,
      verseStart: 28,
      verseEnd: 28,
      confidenceReason: 'God working all things together for good to those who love Him',
    },
  },
  {
    keywords: ['love is patient', 'love is kind', 'suffereth long', 'never fails', '爱是恒久忍耐', '爱是永不止息'],
    candidate: {
      bookId: 46,
      bookName: '1 Corinthians',
      chapter: 13,
      verseStart: 4,
      verseEnd: 7,
      confidenceReason: 'Classic hymn defining the enduring character of love',
    },
  },
  {
    keywords: ['valley of the shadow', 'lord is my shepherd', 'still waters', 'green pastures', '耶和华是我的牧者', '可安歇的水边'],
    candidate: {
      bookId: 19,
      bookName: 'Psalms',
      chapter: 23,
      verseStart: 1,
      verseEnd: 4,
      confidenceReason: 'David’s Psalm of the Good Shepherd leading beside still waters',
    },
  },
  {
    keywords: ['renewing of your mind', 'living sacrifice', 'conformed to this world', 'transformed', '活祭', '心意更新而变化'],
    candidate: {
      bookId: 45,
      bookName: 'Romans',
      chapter: 12,
      verseStart: 1,
      verseEnd: 2,
      confidenceReason: 'Presenting bodies as a living sacrifice and being transformed by mind renewal',
    },
  },
  {
    keywords: ['wings like eagles', 'wait on the lord', 'renew their strength', 'run and not be weary', '如鹰展翅上腾', '等候耶和华'],
    candidate: {
      bookId: 23,
      bookName: 'Isaiah',
      chapter: 40,
      verseStart: 31,
      verseEnd: 31,
      confidenceReason: 'Those who wait on the Lord renewing their strength like eagles',
    },
  },
  {
    keywords: ['armor of god', 'principalities', 'shield of faith', 'sword of the spirit', '全副军装'],
    candidate: {
      bookId: 49,
      bookName: 'Ephesians',
      chapter: 6,
      verseStart: 11,
      verseEnd: 17,
      confidenceReason: 'Putting on the whole armor of God to stand firm',
    },
  },
  {
    keywords: ['substance of things hoped for', 'evidence of things not seen', 'what is faith', '信就是所望之事的实底'],
    candidate: {
      bookId: 58,
      bookName: 'Hebrews',
      chapter: 11,
      verseStart: 1,
      verseEnd: 3,
      confidenceReason: 'Definition of faith as the substance of things hoped for',
    },
  },
  {
    keywords: ['spirit of fear', 'power and of love and of a sound mind', 'timidity', '胆怯的心', '刚强、仁爱、谨守'],
    candidate: {
      bookId: 55,
      bookName: '2 Timothy',
      chapter: 1,
      verseStart: 7,
      verseEnd: 7,
      confidenceReason: 'God has not given us a spirit of fear, but of power, love, and a sound mind',
    },
  },
  {
    keywords: ['god so loved the world', 'only begotten son', 'everlasting life', '神爱世人', '独生子'],
    candidate: {
      bookId: 43,
      bookName: 'John',
      chapter: 3,
      verseStart: 16,
      verseEnd: 17,
      confidenceReason: 'God’s redemptive love for the world through His Son',
    },
  },
];

export function matchLocalSemanticPhrases(query: string): SemanticCandidate[] {
  const q = query.toLowerCase().trim();
  if (!q) return [];

  const scored: Array<{ score: number; candidate: SemanticCandidate }> = [];
  for (const entry of LOCAL_CONCORDANCE) {
    let score = 0;
    for (const kw of entry.keywords) {
      if (q.includes(kw)) {
        score += 3;
      } else {
        const words = kw.split(' ').filter((w) => w.length > 3);
        for (const w of words) {
          if (q.includes(w)) score += 1;
        }
      }
    }
    if (score > 0) {
      scored.push({ score, candidate: entry.candidate });
    }
  }

  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, 3).map((s) => s.candidate);
}

export interface SearchHistoryItem {
  query: string;
  label: string;
  routeType: 'regex' | 'semantic';
  timestamp: number;
}

export const SEARCH_HISTORY_STORAGE_KEY = 'verseflow_search_history_v1';
export const MAX_SEARCH_HISTORY_ITEMS = 10;

/**
 * Pure helper to insert or promote a search entry to the top of the recent history list,
 * deduplicating case-insensitively by query and capping at MAX_SEARCH_HISTORY_ITEMS.
 */
export function upsertSearchHistoryItem(
  existing: SearchHistoryItem[],
  newItem: Omit<SearchHistoryItem, 'timestamp'> & { timestamp?: number }
): SearchHistoryItem[] {
  const cleanQuery = newItem.query.trim();
  if (!cleanQuery) return existing;

  const entry: SearchHistoryItem = {
    query: cleanQuery,
    label: newItem.label.trim() || cleanQuery,
    routeType: newItem.routeType,
    timestamp: newItem.timestamp ?? Date.now(),
  };

  const filtered = existing.filter(
    (item) =>
      item.query.toLowerCase() !== cleanQuery.toLowerCase() &&
      item.label.toLowerCase() !== entry.label.toLowerCase()
  );

  return [entry, ...filtered].slice(0, MAX_SEARCH_HISTORY_ITEMS);
}

export interface SermonQueueItem {
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
  note?: string;
  queuedAt?: number;
}

export interface SermonQueueSession {
  sessionTitle: string;
  sessionDate: string;
  items: SermonQueueItem[];
  updatedAt: number;
}

export const SERMON_QUEUE_STORAGE_KEY = 'verseflow_sermon_queue_session_v1';

export function getDefaultSessionTitle(): string {
  return 'Sunday Sermon Notes';
}

export function getDefaultSessionDate(): string {
  try {
    return new Intl.DateTimeFormat('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(new Date());
  } catch {
    return new Date().toLocaleDateString();
  }
}

/**
 * Loads sermon queue session from localStorage with robust fallback defaults.
 */
export function loadSermonQueueSession(): SermonQueueSession {
  if (typeof window === 'undefined') {
    return {
      sessionTitle: getDefaultSessionTitle(),
      sessionDate: getDefaultSessionDate(),
      items: [],
      updatedAt: Date.now(),
    };
  }
  try {
    const raw = localStorage.getItem(SERMON_QUEUE_STORAGE_KEY);
    if (!raw) {
      return {
        sessionTitle: getDefaultSessionTitle(),
        sessionDate: getDefaultSessionDate(),
        items: [],
        updatedAt: Date.now(),
      };
    }
    const parsed = JSON.parse(raw);
    return {
      sessionTitle:
        typeof parsed.sessionTitle === 'string' && parsed.sessionTitle.trim()
          ? parsed.sessionTitle.trim()
          : getDefaultSessionTitle(),
      sessionDate:
        typeof parsed.sessionDate === 'string' && parsed.sessionDate.trim()
          ? parsed.sessionDate.trim()
          : getDefaultSessionDate(),
      items: Array.isArray(parsed.items)
        ? parsed.items.map((item: any) => ({
            ...item,
            note: typeof item.note === 'string' ? item.note : '',
          }))
        : [],
      updatedAt:
        typeof parsed.updatedAt === 'number' ? parsed.updatedAt : Date.now(),
    };
  } catch (_e) {
    return {
      sessionTitle: getDefaultSessionTitle(),
      sessionDate: getDefaultSessionDate(),
      items: [],
      updatedAt: Date.now(),
    };
  }
}

/**
 * Persists sermon queue session to localStorage.
 */
export function saveSermonQueueSession(session: SermonQueueSession): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(SERMON_QUEUE_STORAGE_KEY, JSON.stringify(session));
  } catch (_e) {
    // Gracefully handle quota exceeded in private browsing
  }
}

/**
 * Formats full sermon session payload including session title, date, and all passages with speaker notes
 */
export function formatSermonSessionExport(
  sessionTitle: string,
  sessionDate: string,
  items: SermonQueueItem[],
  mode: CopyFormatMode = 'plain'
): string {
  const cleanTitle = sessionTitle.trim() || getDefaultSessionTitle();
  const cleanDate = sessionDate.trim() || getDefaultSessionDate();

  const header =
    mode === 'notion'
      ? `## 📖 ${cleanTitle}\n**Date:** ${cleanDate}\n\n`
      : `${cleanTitle}\nDate: ${cleanDate}\n${'='.repeat(Math.max(cleanTitle.length, 24))}\n\n`;

  const body = items
    .map((item) =>
      formatPassageForClipboard(
        {
          bookName: item.bookName,
          chapter: item.chapter,
          verseStart: item.verseStart,
          verseEnd: item.verseEnd,
          translation: item.translation,
          text: item.combinedText,
          note: item.note,
        },
        mode
      )
    )
    .join('\n\n');

  return items.length > 0 ? `${header}${body}` : `${header}*(No passages queued)*`;
}
