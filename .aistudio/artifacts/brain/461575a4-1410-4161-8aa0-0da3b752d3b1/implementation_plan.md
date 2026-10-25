# Implementation Plan — Complete Passage Retrieval & Possessive Reference Normalization

Resolve the passage truncation issue where searching `romans 8:7-28` (or `roman’s 8:7-28`) returned only `Romans 8:26-28`. Provide full-chapter fallback datasets, implement server-side verse coverage verification with Gemini 3.8 Flash, normalize possessives in the direct reference parser, and render long passages continuously in full.

---

## 1. Root Cause Summary

1. **Incomplete Offline Fallback Snippet**: When upstream `bolls.life` encounters HTTP 429 rate limits, the app falls back to `src/utils/fallbackChapters.ts`. In that store, Romans 8 (`45:8`) was previously seeded with only verses 26–32 (the famous "all things work together for good" section).
2. **Slicer Range Clamping**: When the user searched for verses 7–28, `slicePassageFromChapter` filtered the 7 available verses in the fallback data (`[26, 27, 28, 29, 30, 31, 32]`). The only verses falling within `7 <= v <= 28` were verses 26, 27, and 28. The slicer then clamped the passage title and verses to `Romans 8:26-28`.
3. **Possessive Book Name Parsing**: Mobile device auto-corrections and user typing often input `roman's` or `roman’s` (with smart curly apostrophes). The regex parser did not strip possessive apostrophes, causing it to return `null` and fall back to semantic search, where prompt guidelines capped suggested passages at 6 verses.

---

## 2. Proposed Changes

### A. Direct Reference Parser Normalization (`src/utils/scripture.ts`)
- In `parseDirectReference`:
  - Normalize smart apostrophes (`’`, `‘`) to straight apostrophes `'`.
  - Strip possessive `'s` or `'` from book names (e.g. `roman's` / `romans'` → `romans`, `john's` → `john`, `peter's` → `peter`).
  - Strip common preacher prefixes like `paul's letter to the` or `the book of`.
  - Ensure `parseDirectReference("roman's 8:7-28")` and `parseDirectReference("romans 8:7-28")` both resolve with 0ms latency to:
    `{ bookId: 45, bookName: 'Romans', chapter: 8, verseStart: 7, verseEnd: 28 }`.

### B. Complete Chapter Datasets & Coverage Verification (`src/utils/fallbackChapters.ts` & `server.ts`)
- **Full Chapter Fallback**: Expand Romans 8 in `src/utils/fallbackChapters.ts` to include all verses from 1 to 39 across all translations (NKJV, KJV, ESV, NIV, NLT, AMPC, YLT, CUV, CNV, CCB), ensuring queries spanning early verses (like 7–28) are fully satisfied offline.
- **Dynamic Verse Coverage Check in `server.ts`**:
  - Update `fetchChapterFromBollsOrFallback` and the `/api/bolls/:translation/:bookId/:chapter` endpoint to accept optional `verseStart` and `verseEnd` query parameters.
  - If cached or fallback verses do not cover the requested verse range (e.g., requested verse 7 is missing from the stored verses), automatically trigger Gemini 3.8 Flash to fetch the complete verbatim text for the missing verses and merge them into the cache.
  - This guarantees that no user ever receives an incomplete or truncated passage regardless of upstream network conditions.

### C. Continuous Full Passage Display (`src/components/VerseCard.tsx` & `src/App.tsx`)
- As requested by the user, render the entire passage range continuously in full:
  - All 22 verses of Romans 8:7-28 will be rendered sequentially in the verse card.
  - Each verse is clearly indicated with editorial superscript numbers (`<sup>7</sup>`, `<sup>8</sup>`, etc.).
  - Copy actions ("Copy Plain Text" and "Copy Notion Block") will copy the full 22-verse scripture text.
  - Context expansion buttons ("Add prev verse" / "Add next verse") continue to work seamlessly from verse 6 down or verse 29 up.

### D. Automated Unit Testing (`src/utils/scripture.test.ts`)
- Add test cases covering:
  - `parseDirectReference("romans 8:7-28")` → verses 7–28
  - `parseDirectReference("roman's 8:7-28")` and `parseDirectReference("roman’s 8:7-28")` → verses 7–28
  - `slicePassageFromChapter` with all verses of Romans 8 returning 7–28 without clamping
  - Clipboard formatting for multi-verse spans.

---

## 3. Verification Plan

1. **Automated Tests**: Run `npm test -- --run` to ensure all existing and new reference parsing and range slicing tests pass.
2. **Build Verification**: Run `compile_applet` to ensure TypeScript compilation succeeds without errors.
3. **Manual Flow Check**:
   - Query `romans 8:7-28`: Verify title displays **Romans 8:7-28**, all 22 verses appear continuously in full, and copy output includes all verses.
   - Query `roman's 8:7-28`: Verify it instantly resolves to **Romans 8:7-28** via direct reference parser.
   - Test translation switching across NKJV, ESV, KJV, and Chinese translations.
