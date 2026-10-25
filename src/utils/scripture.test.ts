import test from 'node:test';
import assert from 'node:assert/strict';
import {
  BIBLE_BOOKS,
  SUPPORTED_TRANSLATIONS,
  TRANSLATION_METADATA,
  parseDirectReference,
  sanitizeVerseText,
  toBollsTranslationSlug,
  formatPlainTextPassage,
  formatNotionBlockquote,
  formatPassageForClipboard,
  formatNotionQueuePayload,
  expandVerseRange,
  matchLocalSemanticPhrases,
  upsertSearchHistoryItem,
  formatHumanizedSearchNotice,
  getHumanizedMatchBadge,
  formatHumanizedPhraseHint,
  formatSermonSessionExport,
  loadSermonQueueSession,
  saveSermonQueueSession,
  SERMON_QUEUE_STORAGE_KEY,
} from './scripture.ts';

test('Supported translations include 6 English and 1 Chinese translation (和合本)', () => {
  assert.deepEqual(SUPPORTED_TRANSLATIONS, [
    'NKJV',
    'KJV',
    'YLT',
    'NLT',
    'ESV',
    'AMPC',
    'CUV',
  ]);
  assert.equal(TRANSLATION_METADATA.CUV.label, '和合本');
  assert.equal(toBollsTranslationSlug('CUV'), 'CUV');
  assert.equal((SUPPORTED_TRANSLATIONS as readonly string[]).includes('CNV'), false);
  assert.equal((SUPPORTED_TRANSLATIONS as readonly string[]).includes('CCB'), false);
  assert.equal((SUPPORTED_TRANSLATIONS as readonly string[]).includes('NIV'), false);
});

test('Humanized search notice and badge formatters generate warm, friendly wording', () => {
  // Direct citation notice in English
  const directNoticeEn = formatHumanizedSearchNotice({
    query: 'John 3:16',
    routeType: 'regex',
    passageCount: 1,
    primaryCitation: 'John 3:16',
    isChinese: false,
  });
  assert.equal(directNoticeEn, 'Showing John 3:16');

  // Semantic query notice with multiple passages in English
  const topicNoticeEn = formatHumanizedSearchNotice({
    query: 'treasure in earthen vessels',
    routeType: 'semantic',
    passageCount: 2,
    isChinese: false,
  });
  assert.equal(topicNoticeEn, 'Found 2 matching passages for “treasure in earthen vessels”');

  // Direct citation notice in Chinese
  const directNoticeZh = formatHumanizedSearchNotice({
    query: '罗马书 8:28',
    routeType: 'regex',
    passageCount: 1,
    primaryCitation: '罗马书 8:28',
    isChinese: true,
  });
  assert.equal(directNoticeZh, '显示 罗马书 8:28');

  // Humanized badges
  assert.equal(getHumanizedMatchBadge('regex', false), 'Exact Citation');
  assert.equal(getHumanizedMatchBadge('semantic', false), 'Topic Match');
  assert.equal(getHumanizedMatchBadge('regex', true), '精确引用');
  assert.equal(getHumanizedMatchBadge('semantic', true), '主题匹配');

  // Gentle phrase hint
  assert.equal(
    formatHumanizedPhraseHint('Exact match for treasure in earthen vessels / jars of clay', undefined, false),
    'Matched phrase: “treasure in earthen vessels / jars of clay”'
  );
  assert.equal(
    formatHumanizedPhraseHint('神爱世人，赐下独生子', undefined, true),
    '匹配相关词句：“神爱世人，赐下独生子”'
  );
});

test('Mandarin references and Chinese translation citations format with localized book names and labels', () => {
  const zhDirect = parseDirectReference('罗马书 8:28');
  assert.ok(zhDirect);
  assert.equal(zhDirect.bookId, 45);
  assert.equal(zhDirect.chapter, 8);
  assert.equal(zhDirect.verseStart, 28);

  const zhPlain = formatPlainTextPassage({
    bookName: 'Romans',
    chapter: 8,
    verseStart: 28,
    verseEnd: 28,
    translation: 'CUV',
    text: '我们晓得万事都互相效力，叫爱神的人得益处，就是按他旨意被召的人。',
  });
  assert.equal(
    zhPlain,
    '罗马书 8:28 (和合本)\n我们晓得万事都互相效力，叫爱神的人得益处，就是按他旨意被召的人。'
  );
});

test('Search history helper deduplicates and promotes recent searches to the top', () => {
  let history = upsertSearchHistoryItem([], {
    query: 'rom 8 28',
    label: 'Romans 8:28',
    routeType: 'regex',
    timestamp: 100,
  });
  history = upsertSearchHistoryItem(history, {
    query: 'John 3:16',
    label: 'John 3:16',
    routeType: 'regex',
    timestamp: 200,
  });
  // Re-running rom 8 28 promotes it to index 0 without duplicating
  history = upsertSearchHistoryItem(history, {
    query: 'ROM 8 28',
    label: 'Romans 8:28',
    routeType: 'regex',
    timestamp: 300,
  });
  assert.equal(history.length, 2);
  assert.equal(history[0].label, 'Romans 8:28');
  assert.equal(history[1].label, 'John 3:16');
});

test('Canonical 66-book lookup map maintains Protestant numerical order', () => {
  assert.equal(BIBLE_BOOKS.length, 66);
  assert.equal(BIBLE_BOOKS[0].id, 1);
  assert.equal(BIBLE_BOOKS[0].name, 'Genesis');
  assert.equal(BIBLE_BOOKS[39].id, 40);
  assert.equal(BIBLE_BOOKS[39].name, 'Matthew');
  assert.equal(BIBLE_BOOKS[44].id, 45);
  assert.equal(BIBLE_BOOKS[44].name, 'Romans');
  assert.equal(BIBLE_BOOKS[65].id, 66);
  assert.equal(BIBLE_BOOKS[65].name, 'Revelation');
});

test('Path A Zero-Latency Regex Parser resolves direct references accurately', () => {
  const rom = parseDirectReference('rom 8 28');
  assert.ok(rom);
  assert.equal(rom.bookId, 45);
  assert.equal(rom.bookName, 'Romans');
  assert.equal(rom.chapter, 8);
  assert.equal(rom.verseStart, 28);
  assert.equal(rom.verseEnd, 28);

  const johnRange = parseDirectReference('John 3:16-18');
  assert.ok(johnRange);
  assert.equal(johnRange.bookId, 43);
  assert.equal(johnRange.bookName, 'John');
  assert.equal(johnRange.chapter, 3);
  assert.equal(johnRange.verseStart, 16);
  assert.equal(johnRange.verseEnd, 18);

  const cor = parseDirectReference('1 cor 13:4');
  assert.ok(cor);
  assert.equal(cor.bookId, 46);
  assert.equal(cor.bookName, '1 Corinthians');
  assert.equal(cor.chapter, 13);
  assert.equal(cor.verseStart, 4);
  assert.equal(cor.verseEnd, 4);

  const semanticPhrase = parseDirectReference('treasure in jars of clay');
  assert.equal(semanticPhrase, null);
});

test('Bolls API sanitizer strips HTML tags, Strongs numbers, and collapses line breaks', () => {
  const dirty =
    'And<S>2532</S> we know<S>1492</S> that<br/>all things work together<br>for <i>good</i><sup>[a]</sup> to those who love God.';
  const clean = sanitizeVerseText(dirty);
  assert.equal(
    clean,
    'And we know that all things work together for good to those who love God.'
  );
  assert.equal(clean.includes('\n'), false);
  assert.equal(clean.includes('<'), false);
});

test('Plain Text (default) and Notion Copy Block formats match exact multi-line specification', () => {
  assert.equal(toBollsTranslationSlug('AMPC'), 'AMP');
  assert.equal(toBollsTranslationSlug('NKJV'), 'NKJV');
  assert.equal(toBollsTranslationSlug('YLT'), 'YLT');

  const sampleParams = {
    bookName: 'Romans',
    chapter: 8,
    verseStart: 28,
    verseEnd: 28,
    translation: 'NKJV',
    text: 'And we know that <i>all things</i> work together for good.',
  };

  // Default Plain Text mode: Reference + Translation on line 1, clean verse text on line 2
  const plainOut = formatPlainTextPassage(sampleParams);
  assert.equal(
    plainOut,
    'Romans 8:28 (NKJV)\nAnd we know that all things work together for good.'
  );
  assert.equal(formatPassageForClipboard(sampleParams), plainOut);

  // Notion Copy Block mode: `> [Clean Scripture Text without HTML tags] \n—**[Book] [Chapter]:[VerseStart]-[VerseEnd] ([Translation])**`
  const notionRangeOut = formatNotionBlockquote({
    bookName: 'John',
    chapter: 3,
    verseStart: 16,
    verseEnd: 17,
    translation: 'AMPC',
    text: 'For God so loved the world...<br/>For God did not send the Son to condemn.',
  });
  assert.equal(
    notionRangeOut,
    '> For God so loved the world... For God did not send the Son to condemn. \n—**John 3:16-17 (AMPC)**'
  );
});

test('Queue bulk formatter joins items with double newlines in both Plain and Notion modes', () => {
  const items = [
    {
      bookName: 'Romans',
      chapter: 8,
      verseStart: 28,
      verseEnd: 28,
      translation: 'NKJV',
      text: 'Verse one text.',
    },
    {
      bookName: 'John',
      chapter: 11,
      verseStart: 35,
      verseEnd: 35,
      translation: 'ESV',
      text: 'Jesus wept.',
    },
  ];

  const plainQueue = formatNotionQueuePayload(items, 'plain');
  assert.equal(
    plainQueue,
    'Romans 8:28 (NKJV)\nVerse one text.\n\nJohn 11:35 (ESV)\nJesus wept.'
  );

  const notionQueue = formatNotionQueuePayload(items, 'notion');
  assert.equal(
    notionQueue,
    '> Verse one text. \n—**Romans 8:28 (NKJV)**\n\n> Jesus wept. \n—**John 11:35 (ESV)**'
  );
});

test('In-place context expansion respects chapter boundaries', () => {
  const prevAtOne = expandVerseRange(1, 3, 'prev', 31);
  assert.equal(prevAtOne.verseStart, 1);
  assert.equal(prevAtOne.changed, false);

  const prevNormal = expandVerseRange(28, 28, 'prev', 39);
  assert.equal(prevNormal.verseStart, 27);
  assert.equal(prevNormal.verseEnd, 28);
  assert.equal(prevNormal.changed, true);

  const nextNormal = expandVerseRange(27, 28, 'next', 39);
  assert.equal(nextNormal.verseStart, 27);
  assert.equal(nextNormal.verseEnd, 29);
  assert.equal(nextNormal.changed, true);
});

test('Local semantic concordance matches common sermon phrases', () => {
  const jars = matchLocalSemanticPhrases('treasure in jars of clay');
  assert.ok(jars.length > 0);
  assert.equal(jars[0].bookId, 47);
  assert.equal(jars[0].chapter, 4);
  assert.equal(jars[0].verseStart, 7);
});

test('triggerSearchSuccessHaptic handles browser and mock environments safely', async () => {
  const { triggerSearchSuccessHaptic } = await import('./haptics.ts');
  // In Node environment without navigator.vibrate, calling should not throw
  assert.doesNotThrow(() => {
    triggerSearchSuccessHaptic();
  });
});

test('Direct reference parser accurately handles Romans 8:7-28 and possessive book names', () => {
  const standard = parseDirectReference('romans 8:7-28');
  assert.ok(standard);
  assert.equal(standard.bookId, 45);
  assert.equal(standard.bookName, 'Romans');
  assert.equal(standard.chapter, 8);
  assert.equal(standard.verseStart, 7);
  assert.equal(standard.verseEnd, 28);

  const possessiveStraight = parseDirectReference("roman's 8:7-28");
  assert.ok(possessiveStraight);
  assert.equal(possessiveStraight.bookId, 45);
  assert.equal(possessiveStraight.chapter, 8);
  assert.equal(possessiveStraight.verseStart, 7);
  assert.equal(possessiveStraight.verseEnd, 28);

  const possessiveCurly = parseDirectReference('roman’s 8:7-28');
  assert.ok(possessiveCurly);
  assert.equal(possessiveCurly.bookId, 45);
  assert.equal(possessiveCurly.chapter, 8);
  assert.equal(possessiveCurly.verseStart, 7);
  assert.equal(possessiveCurly.verseEnd, 28);

  const prefixPossessive = parseDirectReference("paul's letter to the romans 8:28");
  assert.ok(prefixPossessive);
  assert.equal(prefixPossessive.bookId, 45);
  assert.equal(prefixPossessive.chapter, 8);
  assert.equal(prefixPossessive.verseStart, 28);
  assert.equal(prefixPossessive.verseEnd, 28);
});

test('slicePassageFromChapter returns all 22 verses for Romans 8:7-28 without truncation', async () => {
  const { getOfflineFallbackChapter } = await import('./fallbackChapters.ts');
  const { slicePassageFromChapter } = await import('../services/bibleClient.ts');

  const rom8Verses = getOfflineFallbackChapter(45, 8, 'NKJV');
  assert.ok(rom8Verses);
  assert.equal(rom8Verses.length, 39);

  const passage = slicePassageFromChapter(
    rom8Verses,
    {
      bookId: 45,
      bookName: 'Romans',
      chapter: 8,
      verseStart: 7,
      verseEnd: 28,
      source: 'regex',
    },
    'NKJV'
  );

  assert.equal(passage.verseStart, 7);
  assert.equal(passage.verseEnd, 28);
  assert.equal(passage.verses.length, 22);
  assert.equal(passage.verses[0].verse, 7);
  assert.equal(passage.verses[passage.verses.length - 1].verse, 28);
  assert.ok(passage.verses[0].text.length > 0);
  assert.ok(passage.verses[passage.verses.length - 1].text.includes('purpose'));
});

test('Passage formatting includes speaker points when note is provided', () => {
  const plainWithNote = formatPlainTextPassage({
    bookName: 'Romans',
    chapter: 8,
    verseStart: 28,
    verseEnd: 28,
    translation: 'NKJV',
    text: 'And we know that all things work together for good to those who love God, to those who are the called according to His purpose.',
    note: 'Point 1: God is actively sovereign in our trials',
  });
  assert.ok(plainWithNote.includes('Speaker Point: Point 1: God is actively sovereign in our trials'));
  assert.ok(plainWithNote.includes('Romans 8:28 (NKJV)'));

  const notionWithNote = formatNotionBlockquote({
    bookName: 'Romans',
    chapter: 8,
    verseStart: 28,
    verseEnd: 28,
    translation: 'NKJV',
    text: 'And we know that all things work together for good to those who love God...',
    note: 'Congregation call to trust',
  });
  assert.ok(notionWithNote.includes('> 💡 *Speaker Point: Congregation call to trust*'));
  assert.ok(notionWithNote.includes('—**Romans 8:28 (NKJV)**'));
  assert.ok(notionWithNote.startsWith('> And we know that all things work together'));
});

test('formatSermonSessionExport generates full session header with date and queued speaker points', () => {
  const sessionExport = formatSermonSessionExport(
    'Faith in Suffering',
    'Sunday, Oct 18, 2026',
    [
      {
        id: 'rom-8-28',
        bookId: 45,
        bookName: 'Romans',
        chapter: 8,
        verseStart: 28,
        verseEnd: 28,
        translation: 'NKJV',
        apiSlug: 'NKJV',
        verses: [{ verse: 28, text: 'All things work together for good...' }],
        combinedText: 'All things work together for good...',
        maxChapterVerse: 39,
        source: 'regex',
        note: 'Point 1: Purpose behind the pain',
      },
    ],
    'notion'
  );

  assert.ok(sessionExport.includes('## 📖 Faith in Suffering'));
  assert.ok(sessionExport.includes('**Date:** Sunday, Oct 18, 2026'));
  assert.ok(sessionExport.includes('Speaker Point: Point 1: Purpose behind the pain'));
});


