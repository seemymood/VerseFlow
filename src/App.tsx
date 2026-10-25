import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import {
  Search,
  Sparkles,
  Zap,
  CheckCircle2,
  BookOpen,
  X,
  Loader2,
  CornerDownLeft,
  FileText,
  FileCode2,
  Clock,
  Trash2,
  Bookmark,
} from 'lucide-react';
import {
  SupportedTranslation,
  CopyFormatMode,
  SUPPORTED_TRANSLATIONS,
  TRANSLATION_METADATA,
  BIBLE_BOOKS,
  parseDirectReference,
  expandVerseRange,
  formatReferenceCitation,
  getTranslationDisplayLabel,
  isChineseTranslation,
  formatHumanizedSearchNotice,
  ParsedReference,
  SearchHistoryItem,
  SEARCH_HISTORY_STORAGE_KEY,
  upsertSearchHistoryItem,
  SermonQueueItem,
  SermonQueueSession,
  loadSermonQueueSession,
  saveSermonQueueSession,
  getDefaultSessionTitle,
  getDefaultSessionDate,
} from './utils/scripture';
import {
  ResolvedPassage,
  resolveReferenceToPassage,
  fetchChapterVerses,
  slicePassageFromChapter,
  getCachedChapterSync,
  runSemanticSearch,
} from './services/bibleClient';
import {
  LANDSCAPE_PRESETS,
  LandscapePreset,
  BackgroundCanvas,
  AtmosphereSwitcher,
} from './components/AtmosphereControls';
import { VerseCard } from './components/VerseCard';
import { SermonQueueDock } from './components/SermonQueueDock';
import { triggerSearchSuccessHaptic } from './utils/haptics';

interface ToastNotification {
  id: number;
  title: string;
  preview: string;
}

export default function App() {
  // Active translation pill (Default: NKJV)
  const [translation, setTranslation] = useState<SupportedTranslation>('NKJV');

  // Global Copy Format Mode (Default: 'plain' — Plain Text with reference and scripture on separate lines)
  const [copyFormat, setCopyFormat] = useState<CopyFormatMode>('plain');

  // Default background preset: Still Waters with 20% default dimming
  const [activePreset, setActivePreset] = useState<LandscapePreset>(
    LANDSCAPE_PRESETS[0]
  );
  const [dimmerOpacity, setDimmerOpacity] = useState<number>(
    LANDSCAPE_PRESETS[0].defaultDimmer
  );

  // Search bar state (Clean zero-state prior to initial search)
  const [searchInput, setSearchInput] = useState<string>('');
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [isUpdatingTranslation, setIsUpdatingTranslation] = useState<boolean>(false);
  const [hasSearched, setHasSearched] = useState<boolean>(false);
  const [activeQueryLabel, setActiveQueryLabel] = useState<string>('');
  const [lastRouteType, setLastRouteType] = useState<'regex' | 'semantic'>('regex');

  // LocalStorage-backed Search History state & dropdown visibility
  const [searchHistory, setSearchHistory] = useState<SearchHistoryItem[]>(() => {
    try {
      const raw = localStorage.getItem(SEARCH_HISTORY_STORAGE_KEY);
      if (!raw) return [];
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  });
  const [historyDropdownOpen, setHistoryDropdownOpen] = useState<boolean>(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  // Atomic request sequence tracker: prevents race conditions when rapidly clicking translation pills
  const latestTranslationRequestIdRef = useRef<number>(0);

  // Active candidate cards & their initial unexpanded ranges (empty prior to initial search)
  const [passages, setPassages] = useState<ResolvedPassage[]>([]);
  const [initialRanges, setInitialRanges] = useState<
    Record<string, { verseStart: number; verseEnd: number }>
  >({});

  // Sermon Clipboard Queue Session (Persisted to localStorage with Session Title and Date)
  const [sermonSession, setSermonSession] = useState<SermonQueueSession>(() =>
    loadSermonQueueSession()
  );
  const queue = sermonSession.items;

  // 66-Book Quick Index Modal state
  const [bookModalOpen, setBookModalOpen] = useState<boolean>(false);
  const [selectedTestament, setSelectedTestament] = useState<'NT' | 'OT'>('NT');

  // Tactile Emerald Checkmark Toast
  const [toast, setToast] = useState<ToastNotification | null>(null);

  const triggerToast = useCallback((title: string, preview: string) => {
    setToast({
      id: Date.now(),
      title,
      preview,
    });
  }, []);

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(null), 2800);
    return () => clearTimeout(timer);
  }, [toast]);

  // Persist sermonSession to localStorage whenever it changes
  useEffect(() => {
    saveSermonQueueSession(sermonSession);
  }, [sermonSession]);

  // Persist searchHistory to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem(
        SEARCH_HISTORY_STORAGE_KEY,
        JSON.stringify(searchHistory)
      );
    } catch {
      // Ignore storage quota errors in restricted environments
    }
  }, [searchHistory]);

  // Close search history dropdown on outside click or Escape key
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(e.target as Node)
      ) {
        setHistoryDropdownOpen(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setHistoryDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Sync adaptive background theme variables onto document.documentElement so all portals/elements inherit
  useEffect(() => {
    const root = document.documentElement;
    const { theme } = activePreset;
    root.style.setProperty('--glass-surface', theme.glassSurface);
    root.style.setProperty('--glass-surface-hover', theme.glassSurfaceHover);
    root.style.setProperty('--glass-elevated', theme.glassElevated);
    root.style.setProperty('--glass-border', theme.glassBorder);
    root.style.setProperty('--control-surface', theme.controlSurface);
    root.style.setProperty('--control-surface-hover', theme.controlSurfaceHover);
    root.style.setProperty('--header-surface', theme.headerSurface);
    root.style.setProperty('--text-primary', theme.textPrimary);
    root.style.setProperty('--text-secondary', theme.textSecondary);
    root.style.setProperty('--accent-primary', theme.accentPrimary);
    root.style.setProperty('--accent-primary-hover', theme.accentPrimaryHover);
    root.style.setProperty('--accent-text', theme.accentText);
    root.style.setProperty('--accent-secondary', theme.accentSecondary);
  }, [activePreset]);

  // Filtered recent search items based on current input (or full list if input is empty)
  const filteredSearchHistory = useMemo(() => {
    const q = searchInput.trim().toLowerCase();
    if (!q) return searchHistory;
    return searchHistory.filter(
      (item) =>
        item.query.toLowerCase().includes(q) ||
        item.label.toLowerCase().includes(q)
    );
  }, [searchHistory, searchInput]);

  // Record a completed search into localStorage history
  const recordSearchHistory = useCallback(
    (query: string, label: string, routeType: 'regex' | 'semantic') => {
      setSearchHistory((prev) =>
        upsertSearchHistoryItem(prev, { query, label, routeType })
      );
    },
    []
  );

  const handleRemoveHistoryItem = useCallback(
    (e: React.MouseEvent, queryToRemove: string) => {
      e.stopPropagation();
      setSearchHistory((prev) =>
        prev.filter(
          (item) => item.query.toLowerCase() !== queryToRemove.toLowerCase()
        )
      );
    },
    []
  );

  const handleClearSearchHistory = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setSearchHistory([]);
    setHistoryDropdownOpen(false);
  }, []);

  // Resolve a list of references in a given translation
  const loadReferences = useCallback(
    async (
      refs: ParsedReference[],
      targetTranslation: SupportedTranslation,
      preserveIds = false,
      forceApi = false
    ) => {
      const results = await Promise.all(
        refs.map((ref, idx) => {
          const cardId =
            preserveIds && (ref as any).id
              ? (ref as any).id
              : `card-${idx}-${ref.bookId}-${ref.chapter}-${ref.verseStart}`;
          return resolveReferenceToPassage(
            { ...ref, id: cardId },
            targetTranslation,
            forceApi
          );
        })
      );

      setPassages(results);
      if (!preserveIds) {
        const rangeMap: Record<string, { verseStart: number; verseEnd: number }> = {};
        for (const r of results) {
          rangeMap[r.id] = { verseStart: r.verseStart, verseEnd: r.verseEnd };
        }
        setInitialRanges(rangeMap);
      }
    },
    []
  );

  // Instant Translation Pill Bar handler: immediately calls the API to fetch updated scripture in the selected translation
  // Atomic Request Sequence Guard: guarantees that when user taps pills multiple times, the last tapped pill always wins
  const handleSelectTranslation = async (nextTrans: SupportedTranslation) => {
    // Instantly highlight the tapped pill in the UI
    setTranslation(nextTrans);

    if (passages.length === 0 && queue.length === 0) return;

    const requestId = ++latestTranslationRequestIdRef.current;
    setIsUpdatingTranslation(true);
    try {
      const updatedPassagesPromise = Promise.all(
        passages.map(async (p) => {
          const chapterVerses = await fetchChapterVerses(
            nextTrans,
            p.bookId,
            p.chapter,
            true // Force API call for the newly selected translation
          );
          return slicePassageFromChapter(
            chapterVerses,
            {
              id: p.id,
              bookId: p.bookId,
              bookName: p.bookName,
              chapter: p.chapter,
              verseStart: p.verseStart,
              verseEnd: p.verseEnd,
              source: p.source,
              confidenceReason: p.confidenceReason,
            },
            nextTrans
          );
        })
      );

      const updatedQueuePromise = Promise.all(
        queue.map(async (q) => {
          const chapterVerses = await fetchChapterVerses(
            nextTrans,
            q.bookId,
            q.chapter,
            true
          );
          const sliced = slicePassageFromChapter(
            chapterVerses,
            {
              id: q.id,
              bookId: q.bookId,
              bookName: q.bookName,
              chapter: q.chapter,
              verseStart: q.verseStart,
              verseEnd: q.verseEnd,
              source: q.source,
              confidenceReason: q.confidenceReason,
            },
            nextTrans
          );
          return {
            ...sliced,
            note: q.note,
            queuedAt: q.queuedAt,
          };
        })
      );

      const [updatedPassages, updatedQueue] = await Promise.all([
        updatedPassagesPromise,
        updatedQueuePromise,
      ]);

      // Atomic race-condition check: if another pill was tapped while this fetch was in flight, discard this result
      if (requestId !== latestTranslationRequestIdRef.current) {
        return;
      }

      setPassages(updatedPassages);
      setSermonSession((prev) => ({
        ...prev,
        items: updatedQueue,
        updatedAt: Date.now(),
      }));

      // Refresh humanized notice for the newly active translation
      if (updatedPassages.length > 0) {
        const first = updatedPassages[0];
        const newPrimaryCitation = formatReferenceCitation(
          first.bookName,
          first.chapter,
          first.verseStart,
          first.verseEnd,
          nextTrans
        );
        setActiveQueryLabel(
          formatHumanizedSearchNotice({
            query: searchInput,
            routeType: lastRouteType,
            passageCount: updatedPassages.length,
            primaryCitation: newPrimaryCitation,
            isChinese: isChineseTranslation(nextTrans),
          })
        );
      }
    } finally {
      // Only dismiss spinner if this is still the most recent request
      if (requestId === latestTranslationRequestIdRef.current) {
        setIsUpdatingTranslation(false);
      }
    }
  };

  // Hybrid Dual-Path Search Execution
  const executeSearch = async (rawQuery: string) => {
    const query = rawQuery.trim();
    if (!query) return;

    setHistoryDropdownOpen(false);
    setHasSearched(true);
    setIsSearching(true);
    try {
      // Path A: Zero-Latency Regex Parser
      const directMatch = parseDirectReference(query);
      if (directMatch) {
        const formattedRef = formatReferenceCitation(
          directMatch.bookName,
          directMatch.chapter,
          directMatch.verseStart,
          directMatch.verseEnd,
          translation
        );
        setLastRouteType('regex');
        setActiveQueryLabel(
          formatHumanizedSearchNotice({
            query,
            routeType: 'regex',
            passageCount: 1,
            primaryCitation: formattedRef,
            isChinese: isChineseTranslation(translation),
          })
        );
        recordSearchHistory(query, formattedRef, 'regex');
        await loadReferences([directMatch], translation, false, true);
        triggerSearchSuccessHaptic();
        return;
      }

      // Path B: Gemini 3.8 Flash Semantic Router
      setLastRouteType('semantic');
      const candidates = await runSemanticSearch(query);
      if (candidates.length > 0) {
        const primaryCitation = formatReferenceCitation(
          candidates[0].bookName,
          candidates[0].chapter,
          candidates[0].verseStart,
          candidates[0].verseEnd,
          translation
        );
        setActiveQueryLabel(
          formatHumanizedSearchNotice({
            query,
            routeType: 'semantic',
            passageCount: candidates.length,
            primaryCitation,
            isChinese: isChineseTranslation(translation),
          })
        );
        recordSearchHistory(
          query,
          candidates.length > 1
            ? `${primaryCitation} (+${candidates.length - 1} more)`
            : primaryCitation,
          'semantic'
        );
        await loadReferences(candidates, translation, false, true);
        triggerSearchSuccessHaptic();
      } else {
        setActiveQueryLabel(
          formatHumanizedSearchNotice({
            query,
            routeType: 'semantic',
            passageCount: 0,
            isChinese: isChineseTranslation(translation),
          })
        );
        recordSearchHistory(query, query, 'semantic');
      }
    } finally {
      setIsSearching(false);
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    executeSearch(searchInput);
  };

  // In-Place Context Expansion (Add prev verse / Add next verse) with 0ms chapter cache slicing
  const handleExpandContext = useCallback(
    async (passageId: string, direction: 'prev' | 'next') => {
      const target = passages.find((p) => p.id === passageId);
      if (!target) return;

      const nextRange = expandVerseRange(
        target.verseStart,
        target.verseEnd,
        direction,
        target.maxChapterVerse
      );
      if (!nextRange.changed) return;

      let chapterVerses = getCachedChapterSync(
        target.translation,
        target.bookId,
        target.chapter
      );
      if (!chapterVerses) {
        chapterVerses = await fetchChapterVerses(
          target.translation,
          target.bookId,
          target.chapter
        );
      }

      const expandedPassage = slicePassageFromChapter(
        chapterVerses,
        {
          id: target.id,
          bookId: target.bookId,
          bookName: target.bookName,
          chapter: target.chapter,
          verseStart: nextRange.verseStart,
          verseEnd: nextRange.verseEnd,
          source: target.source,
          confidenceReason: target.confidenceReason,
        },
        target.translation
      );

      setPassages((prev) =>
        prev.map((p) => (p.id === passageId ? expandedPassage : p))
      );

      setSermonSession((prev) => ({
        ...prev,
        items: prev.items.map((q) =>
          q.id === passageId ? { ...expandedPassage, note: q.note, queuedAt: q.queuedAt } : q
        ),
        updatedAt: Date.now(),
      }));
    },
    [passages]
  );

  // Reset expanded card back to its original verse range
  const handleResetRange = useCallback(
    async (passageId: string) => {
      const target = passages.find((p) => p.id === passageId);
      const orig = initialRanges[passageId];
      if (!target || !orig) return;

      let chapterVerses = getCachedChapterSync(
        target.translation,
        target.bookId,
        target.chapter
      );
      if (!chapterVerses) {
        chapterVerses = await fetchChapterVerses(
          target.translation,
          target.bookId,
          target.chapter
        );
      }

      const resetPassage = slicePassageFromChapter(
        chapterVerses,
        {
          id: target.id,
          bookId: target.bookId,
          bookName: target.bookName,
          chapter: target.chapter,
          verseStart: orig.verseStart,
          verseEnd: orig.verseEnd,
          source: target.source,
          confidenceReason: target.confidenceReason,
        },
        target.translation
      );

      setPassages((prev) =>
        prev.map((p) => (p.id === passageId ? resetPassage : p))
      );
      setSermonSession((prev) => ({
        ...prev,
        items: prev.items.map((q) =>
          q.id === passageId ? { ...resetPassage, note: q.note, queuedAt: q.queuedAt } : q
        ),
        updatedAt: Date.now(),
      }));
    },
    [passages, initialRanges]
  );

  // Sermon Clipboard Queue handlers: stays on verse and triggers toast confirmation
  const handleToggleQueue = useCallback(
    (passage: ResolvedPassage) => {
      const citation = formatReferenceCitation(
        passage.bookName,
        passage.chapter,
        passage.verseStart,
        passage.verseEnd,
        passage.translation
      );
      setSermonSession((prev) => {
        const exists = prev.items.some((item) => item.id === passage.id);
        if (exists) {
          const nextItems = prev.items.filter((item) => item.id !== passage.id);
          triggerToast(
            `Removed ${citation}`,
            `Sermon Queue now has ${nextItems.length} ${nextItems.length === 1 ? 'passage' : 'passages'} in footer`
          );
          return {
            ...prev,
            items: nextItems,
            updatedAt: Date.now(),
          };
        }
        const newItem: SermonQueueItem = {
          ...passage,
          note: '',
          queuedAt: Date.now(),
        };
        const nextItems = [...prev.items, newItem];
        triggerToast(
          `Added ${citation} to Sermon Queue`,
          `${nextItems.length} ${nextItems.length === 1 ? 'passage' : 'passages'} queued in footer`
        );
        return {
          ...prev,
          items: nextItems,
          updatedAt: Date.now(),
        };
      });
    },
    [triggerToast]
  );

  const handleUpdateItemNote = useCallback((id: string, note: string) => {
    setSermonSession((prev) => ({
      ...prev,
      items: prev.items.map((item) =>
        item.id === id ? { ...item, note } : item
      ),
      updatedAt: Date.now(),
    }));
  }, []);

  const handleUpdateSessionTitle = useCallback((title: string) => {
    setSermonSession((prev) => ({
      ...prev,
      sessionTitle: title,
      updatedAt: Date.now(),
    }));
  }, []);

  const handleUpdateSessionDate = useCallback((date: string) => {
    setSermonSession((prev) => ({
      ...prev,
      sessionDate: date,
      updatedAt: Date.now(),
    }));
  }, []);

  const handleResetSession = useCallback(() => {
    setSermonSession({
      sessionTitle: getDefaultSessionTitle(),
      sessionDate: getDefaultSessionDate(),
      items: [],
      updatedAt: Date.now(),
    });
    triggerToast('New Sermon Session Started', 'Cleared queue and reset session details');
  }, [triggerToast]);

  const handleMoveQueueItem = useCallback(
    (index: number, direction: 'up' | 'down') => {
      setSermonSession((prev) => {
        const nextItems = [...prev.items];
        const targetIndex = direction === 'up' ? index - 1 : index + 1;
        if (targetIndex < 0 || targetIndex >= nextItems.length) return prev;
        const [moved] = nextItems.splice(index, 1);
        nextItems.splice(targetIndex, 0, moved);
        return {
          ...prev,
          items: nextItems,
          updatedAt: Date.now(),
        };
      });
    },
    []
  );

  const handleRemoveQueueItem = useCallback((id: string) => {
    setSermonSession((prev) => ({
      ...prev,
      items: prev.items.filter((item) => item.id !== id),
      updatedAt: Date.now(),
    }));
  }, []);

  const handleClearQueue = useCallback(() => {
    setSermonSession((prev) => ({
      ...prev,
      items: [],
      updatedAt: Date.now(),
    }));
  }, []);

  const handleSelectPreset = useCallback((preset: LandscapePreset) => {
    setActivePreset(preset);
    setDimmerOpacity(preset.defaultDimmer);
  }, []);

  const handleCyclePreset = useCallback(() => {
    setActivePreset((prev) => {
      const currentIndex = LANDSCAPE_PRESETS.findIndex((p) => p.id === prev.id);
      const nextIndex = (currentIndex + 1) % LANDSCAPE_PRESETS.length;
      const nextPreset = LANDSCAPE_PRESETS[nextIndex];
      setDimmerOpacity(nextPreset.defaultDimmer);
      return nextPreset;
    });
  }, []);

  const themeStyle = {
    '--glass-surface': activePreset.theme.glassSurface,
    '--glass-surface-hover': activePreset.theme.glassSurfaceHover,
    '--glass-elevated': activePreset.theme.glassElevated,
    '--glass-border': activePreset.theme.glassBorder,
    '--control-surface': activePreset.theme.controlSurface,
    '--control-surface-hover': activePreset.theme.controlSurfaceHover,
    '--header-surface': activePreset.theme.headerSurface,
    '--text-primary': activePreset.theme.textPrimary,
    '--text-secondary': activePreset.theme.textSecondary,
    '--accent-primary': activePreset.theme.accentPrimary,
    '--accent-primary-hover': activePreset.theme.accentPrimaryHover,
    '--accent-text': activePreset.theme.accentText,
    '--accent-secondary': activePreset.theme.accentSecondary,
  } as React.CSSProperties;

  const activeTranslationLabel = getTranslationDisplayLabel(translation);
  const isChineseActive = isChineseTranslation(translation);

  return (
    <div
      style={themeStyle}
      className="min-h-screen w-full max-w-[100vw] overflow-x-hidden relative flex flex-col text-[var(--text-primary)] pb-28 lg:pb-12 transition-colors duration-500"
    >
      {/* Full-Bleed Peaceful Photography + Auditorium Dimmer Scrim (20% default for Still Waters) */}
      <BackgroundCanvas
        activePreset={activePreset}
        dimmerOpacity={dimmerOpacity}
      />

      {/* Tactile Emerald Checkmark Toast */}
      {toast && (
        <div
          role="status"
          aria-live="polite"
          className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[92vw] max-w-lg backdrop-blur-2xl bg-[var(--glass-elevated)] border border-emerald-500/40 shadow-[0_12px_40px_0_rgba(0,0,0,0.35),inset_0_1px_0_0_rgba(255,255,255,0.4)] rounded-2xl px-4 py-3 flex items-start gap-3 transition-all"
        >
          <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
          <div className="min-w-0 flex-1">
            <div className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 break-words">
              {toast.title}
            </div>
            <div className="text-xs font-mono text-[var(--text-primary)]/90 break-words line-clamp-2 mt-0.5">
              {toast.preview}
            </div>
          </div>
          <button
            type="button"
            onClick={() => setToast(null)}
            aria-label="Dismiss notification"
            className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] p-1 shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Top Bar Contract: Brand Wordmark — Canon Navigation — Atmosphere Control */}
      <header className="relative z-30 w-full max-w-full border-b border-[var(--glass-border)] backdrop-blur-md bg-[var(--header-surface)] transition-colors duration-300">
        <div className="max-w-7xl w-full mx-auto px-3 sm:px-6 py-3 flex items-center justify-between gap-2 sm:gap-8">
          {/* Zone 1: Brand Wordmark */}
          <a
            href="#top"
            onClick={(e) => {
              e.preventDefault();
              setSearchInput('');
              setHasSearched(false);
              setPassages([]);
            }}
            className="text-lg sm:text-xl font-bold tracking-tight text-[var(--text-primary)] shrink-0"
          >
            VerseFlow
          </a>

          {/* Zone 2: Clean Desktop Navigation Links */}
          <nav
            aria-label="Workspace Controls"
            className="hidden md:flex items-center gap-6 text-xs font-medium text-[var(--text-secondary)]"
          >
            <button
              type="button"
              onClick={() => setBookModalOpen(true)}
              className="hover:text-[var(--text-primary)] transition-colors cursor-pointer"
            >
              66-Book Canon Index
            </button>
            <button
              type="button"
              onClick={() =>
                setCopyFormat((prev) => (prev === 'plain' ? 'notion' : 'plain'))
              }
              className="hover:text-[var(--text-primary)] transition-colors cursor-pointer"
            >
              Format: {copyFormat === 'plain' ? 'Plain Text' : 'Notion Block'}
            </button>
            <a
              href="#sermon-queue-footer"
              className="hover:text-[var(--text-primary)] transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <Bookmark className="w-3.5 h-3.5 text-[var(--accent-secondary)]" />
              <span>Queue ({queue.length})</span>
            </a>
          </nav>

          {/* Zone 3: Peaceful Background Switcher & Auditorium Dimmer */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            <a
              href="#sermon-queue-footer"
              aria-label={`Sermon Queue in footer (${queue.length} passages)`}
              className="md:hidden min-h-[44px] px-2.5 rounded-xl backdrop-blur-xl bg-[var(--glass-surface)] hover:bg-[var(--glass-surface-hover)] border border-[var(--glass-border)] text-xs font-medium text-[var(--text-secondary)] flex items-center gap-1 cursor-pointer transition-colors"
            >
              <Bookmark className="w-4 h-4 text-[var(--accent-secondary)] shrink-0" />
              <span>{queue.length}</span>
            </a>
            <button
              type="button"
              onClick={() => setBookModalOpen(true)}
              aria-label="Open 66-Book Canon Index"
              className="md:hidden min-h-[44px] px-2.5 sm:px-3 rounded-xl backdrop-blur-xl bg-[var(--glass-surface)] hover:bg-[var(--glass-surface-hover)] border border-[var(--glass-border)] text-xs font-medium text-[var(--text-secondary)] flex items-center gap-1.5 cursor-pointer transition-colors"
            >
              <BookOpen className="w-4 h-4 shrink-0" />
              <span>Books</span>
            </button>
            <AtmosphereSwitcher
              activePreset={activePreset}
              onSelectPreset={handleSelectPreset}
              onCyclePreset={handleCyclePreset}
              dimmerOpacity={dimmerOpacity}
              onChangeDimmer={setDimmerOpacity}
            />
          </div>
        </div>
      </header>

      {/* Main Content Workspace */}
      <main className="relative z-10 flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 pt-4 sm:pt-7 overflow-x-hidden">
        {/* Search, Recent History Dropdown, Global Copy Format Toggle, & Instant Translation Carousel Section */}
        <section
          aria-label="Scripture Search and Translation Selector"
          className={`mb-6 w-full max-w-full relative ${
            historyDropdownOpen ? 'z-40' : 'z-20'
          }`}
        >
          {/* Subtle click-away backdrop when search history dropdown is open to guarantee clean focus and front stacking */}
          {historyDropdownOpen && (
            <div
              className="fixed inset-0 z-30 bg-black/15 backdrop-blur-[1px]"
              onClick={() => setHistoryDropdownOpen(false)}
              aria-hidden="true"
            />
          )}

          <div
            className={`relative w-full max-w-full backdrop-blur-xl bg-[var(--glass-surface)] border border-[var(--glass-border)] shadow-[0_8px_32px_0_rgba(0,0,0,0.18),inset_0_1px_0_0_rgba(255,255,255,0.4)] rounded-2xl p-3.5 sm:p-5 transition-colors duration-300 ${
              historyDropdownOpen ? 'z-40' : 'z-20'
            }`}
          >
            {/* Hybrid Dual-Path Search Input + LocalStorage Search History Dropdown */}
            <form onSubmit={handleSearchSubmit} className="relative w-full">
              <label htmlFor="scripture-search-input" className="sr-only">
                Search by Bible reference or describe a verse phrase
              </label>

              <div
                ref={searchContainerRef}
                className={`relative w-full ${
                  historyDropdownOpen ? 'z-50' : 'z-10'
                }`}
              >
                <div className="relative flex items-center w-full">
                  <Search className="w-5 h-5 text-[var(--text-secondary)] absolute left-3.5 sm:left-4 pointer-events-none shrink-0" />
                  <input
                    id="scripture-search-input"
                    type="text"
                    value={searchInput}
                    onFocus={() => {
                      if (searchHistory.length > 0) {
                        setHistoryDropdownOpen(true);
                      }
                    }}
                    onClick={() => {
                      if (searchHistory.length > 0) {
                        setHistoryDropdownOpen(true);
                      }
                    }}
                    onChange={(e) => {
                      setSearchInput(e.target.value);
                      if (searchHistory.length > 0) {
                        setHistoryDropdownOpen(true);
                      }
                    }}
                    placeholder="Enter a reference (e.g. Rom 8:28, 罗马书 8:28) or describe a verse..."
                    aria-expanded={
                      historyDropdownOpen && filteredSearchHistory.length > 0
                    }
                    aria-controls="recent-search-history-menu"
                    autoComplete="off"
                    className="w-full min-h-[52px] pl-10 sm:pl-12 pr-36 sm:pr-40 py-3 rounded-xl bg-[var(--control-surface)] border border-[var(--glass-border)] focus:border-[var(--accent-primary)] focus:outline-none text-base text-[var(--text-primary)] placeholder-[var(--text-secondary)]/65 transition-colors"
                  />

                  <div className="absolute right-1.5 flex items-center gap-1">
                    {searchInput && (
                      <button
                        type="button"
                        onClick={() => setSearchInput('')}
                        aria-label="Clear search query"
                        className="min-h-[40px] min-w-[36px] flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--text-primary)] cursor-pointer rounded-lg"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}

                    {searchHistory.length > 0 && (
                      <button
                        type="button"
                        onClick={() => setHistoryDropdownOpen((prev) => !prev)}
                        aria-label="Toggle recent search history"
                        title="Recent Searches"
                        className={`min-h-[40px] min-w-[36px] flex items-center justify-center rounded-lg transition-colors cursor-pointer ${
                          historyDropdownOpen
                            ? 'bg-black/10 text-[var(--text-primary)]'
                            : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-black/5'
                        }`}
                      >
                        <Clock className="w-4 h-4" />
                      </button>
                    )}

                    <button
                      type="submit"
                      disabled={isSearching}
                      aria-label="Find Scripture"
                      className="min-h-[44px] px-3 sm:px-4 rounded-xl bg-[var(--accent-primary)] hover:bg-[var(--accent-primary-hover)] text-xs font-semibold text-[var(--accent-text)] flex items-center gap-1.5 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.3)] transition-colors cursor-pointer shrink-0"
                    >
                      {isSearching ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin shrink-0" />
                          <span>Finding</span>
                        </>
                      ) : (
                        <>
                          <span>Find</span>
                          <CornerDownLeft className="w-3.5 h-3.5 shrink-0" />
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Dropdown Menu Below Search Bar for Recent Searches */}
                {historyDropdownOpen && filteredSearchHistory.length > 0 && (
                  <div
                    id="recent-search-history-menu"
                    role="listbox"
                    aria-label="Recent Scripture Searches"
                    className="absolute left-0 right-0 top-full mt-2 z-50 backdrop-blur-2xl bg-[var(--glass-elevated)] border border-[var(--glass-border)] shadow-[0_24px_64px_0_rgba(0,0,0,0.55),inset_0_1px_0_0_rgba(255,255,255,0.4)] rounded-2xl p-2 max-h-72 overflow-y-auto"
                  >
                    <div className="flex items-center justify-between gap-2 px-2.5 py-1.5 border-b border-[var(--glass-border)] mb-1">
                      <span className="text-[11px] font-semibold tracking-wide text-[var(--text-secondary)] flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-[var(--accent-secondary)] shrink-0" />
                        <span>Recent Searches</span>
                      </span>
                      <button
                        type="button"
                        onClick={handleClearSearchHistory}
                        className="text-[11px] text-[var(--text-secondary)] hover:text-rose-500 flex items-center gap-1 px-2 py-1 rounded-lg hover:bg-black/5 transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-3 h-3 shrink-0" />
                        <span>Clear History</span>
                      </button>
                    </div>

                    <div className="space-y-1">
                      {filteredSearchHistory.map((item) => (
                        <div
                          key={item.query}
                          role="option"
                          aria-selected={
                            searchInput.trim().toLowerCase() ===
                            item.query.toLowerCase()
                          }
                          onClick={() => {
                            setSearchInput(item.query);
                            setHistoryDropdownOpen(false);
                            executeSearch(item.query);
                          }}
                          className="w-full min-h-[44px] px-3 py-2 rounded-xl hover:bg-[var(--control-surface)] flex items-center justify-between gap-2 text-left transition-colors cursor-pointer group"
                        >
                          <div className="flex items-start sm:items-center gap-2.5 min-w-0 flex-1">
                            {item.routeType === 'regex' ? (
                              <Zap className="w-3.5 h-3.5 text-[var(--accent-secondary)] shrink-0 mt-0.5 sm:mt-0" />
                            ) : (
                              <Sparkles className="w-3.5 h-3.5 text-[var(--text-secondary)] shrink-0 mt-0.5 sm:mt-0" />
                            )}
                            <div className="min-w-0 flex-1">
                              <div className="text-xs font-semibold text-[var(--text-primary)] break-words">
                                {item.label}
                              </div>
                              {item.label.toLowerCase() !==
                                item.query.toLowerCase() && (
                                <div className="text-[11px] text-[var(--text-secondary)]/85 break-words">
                                  Query: “{item.query}”
                                </div>
                              )}
                            </div>
                          </div>

                          <button
                            type="button"
                            onClick={(e) =>
                              handleRemoveHistoryItem(e, item.query)
                            }
                            aria-label={`Remove ${item.label} from search history`}
                            className="min-h-[32px] min-w-[32px] rounded-lg text-[var(--text-secondary)]/70 hover:text-rose-500 hover:bg-rose-500/15 flex items-center justify-center shrink-0 cursor-pointer"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Global Copy Format Selector: Plain Text (default) vs Notion Copy Block */}
              <div className="mt-3 pt-3 border-t border-[var(--glass-border)] flex items-center justify-between sm:justify-end gap-3 text-xs text-[var(--text-secondary)] min-w-0">
                <span className="text-xs font-medium text-[var(--text-secondary)] sm:mr-auto">
                  Copy Format
                </span>
                <div
                  role="group"
                  aria-label="Copy Format Mode"
                  className="flex flex-wrap items-center gap-1 p-1 rounded-xl bg-[var(--control-surface)] border border-[var(--glass-border)] shrink-0 max-w-full"
                >
                  <button
                    type="button"
                    aria-pressed={copyFormat === 'plain'}
                    onClick={() => setCopyFormat('plain')}
                    className={`min-h-[36px] px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                      copyFormat === 'plain'
                        ? 'bg-[var(--accent-primary)] text-[var(--accent-text)] shadow-sm'
                        : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                    }`}
                  >
                    <FileText className="w-3.5 h-3.5 shrink-0" />
                    <span>Plain Text</span>
                  </button>
                  <button
                    type="button"
                    aria-pressed={copyFormat === 'notion'}
                    onClick={() => setCopyFormat('notion')}
                    className={`min-h-[36px] px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                      copyFormat === 'notion'
                        ? 'bg-[var(--accent-primary)] text-[var(--accent-text)] shadow-sm'
                        : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                    }`}
                  >
                    <FileCode2 className="w-3.5 h-3.5 shrink-0" />
                    <span>Notion Block</span>
                  </button>
                </div>
              </div>
            </form>
          </div>

          {/* Sticky Horizontal Carousel Translation Pill Bar (NKJV, KJV, YLT, NLT, ESV, AMPC, 和合本) */}
          <div className="sticky top-2 z-20 mt-3 w-full max-w-full backdrop-blur-xl bg-[var(--glass-surface)] border border-[var(--glass-border)] shadow-[0_8px_24px_0_rgba(0,0,0,0.18),inset_0_1px_0_0_rgba(255,255,255,0.4)] rounded-2xl p-1.5 flex items-center justify-between gap-2 transition-colors duration-300 overflow-hidden">
            <div
              role="tablist"
              aria-label="Bible Translation Selector"
              className="flex items-center gap-1.5 w-full overflow-x-auto no-scrollbar snap-x snap-mandatory py-0.5 px-0.5"
            >
              {SUPPORTED_TRANSLATIONS.map((trans) => {
                const isSelected = translation === trans;
                const meta = TRANSLATION_METADATA[trans];
                return (
                  <button
                    key={trans}
                    type="button"
                    role="tab"
                    aria-selected={isSelected}
                    aria-label={`${meta.label} — ${meta.fullName}`}
                    onClick={() => handleSelectTranslation(trans)}
                    className={`snap-start min-h-[42px] px-3.5 sm:px-4 py-2 rounded-xl text-xs font-semibold tracking-wide transition-all cursor-pointer flex items-center justify-center gap-1.5 shrink-0 whitespace-nowrap ${
                      isSelected
                        ? 'bg-[var(--accent-primary)] text-[var(--accent-text)] shadow-[0_4px_12px_rgba(0,0,0,0.2),inset_0_1px_0_0_rgba(255,255,255,0.35)] border border-white/25'
                        : 'bg-transparent hover:bg-black/5 text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                    }`}
                  >
                    <span>{meta.label}</span>
                    {isSelected && isUpdatingTranslation && (
                      <Loader2 className="w-3 h-3 animate-spin shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>

            <div className="hidden lg:flex items-center pr-3 pl-2 text-xs text-[var(--text-secondary)] shrink-0 border-l border-[var(--glass-border)]">
              <span>{TRANSLATION_METADATA[translation]?.fullName || translation}</span>
            </div>
          </div>
        </section>

        {/* Full-Width Scripture Results Workspace */}
        <section aria-label="Scripture Search Results" className="w-full max-w-full min-w-0 space-y-4">
          {!hasSearched && passages.length === 0 ? (
            <div
              aria-label="Ready for Scripture Search"
              className="w-full max-w-full overflow-hidden backdrop-blur-xl bg-[var(--glass-surface)] border border-[var(--glass-border)] shadow-[0_8px_32px_0_rgba(0,0,0,0.18),inset_0_1px_0_0_rgba(255,255,255,0.4)] rounded-2xl p-6 sm:p-12 text-center transition-colors duration-300"
            >
              <div className="w-12 h-12 rounded-2xl bg-[var(--accent-primary)]/20 border border-[var(--glass-border)] flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-6 h-6 text-[var(--accent-primary)]" />
              </div>
              <h1 className="text-lg sm:text-xl font-bold text-[var(--text-primary)] mb-2 break-words">
                Ready for Live Sermon Capture
              </h1>
              <p className="text-sm text-[var(--text-secondary)]/90 max-w-md mx-auto leading-relaxed break-words">
                Type any Bible reference or phrase in the search bar above to retrieve Scripture in{' '}
                <strong className="text-[var(--text-primary)]">
                  {activeTranslationLabel}
                </strong>{' '}
                and copy in{' '}
                <strong className="text-[var(--text-primary)]">
                  {copyFormat === 'plain' ? 'Plain Text' : 'Notion Copy Block'}
                </strong>{' '}
                format.
              </p>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between px-1 min-w-0">
                <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-medium text-[var(--text-secondary)] min-w-0">
                  <span className="break-words font-semibold text-[var(--text-primary)]">
                    {activeQueryLabel}
                  </span>
                  {isUpdatingTranslation && (
                    <>
                      <span aria-hidden="true">·</span>
                      <span className="break-words text-[var(--accent-secondary)] animate-pulse">
                        {isChineseTranslation(translation)
                          ? `正在切换至 ${activeTranslationLabel}...`
                          : `Switching to ${activeTranslationLabel}...`}
                      </span>
                    </>
                  )}
                </div>
              </div>

              {isSearching ? (
                <div className="space-y-4" aria-busy="true">
                  {[1, 2].map((n) => (
                    <div
                      key={n}
                      className="backdrop-blur-xl bg-[var(--glass-surface)] border border-[var(--glass-border)] rounded-2xl p-6 animate-pulse"
                    >
                      <div className="h-5 w-40 bg-black/10 rounded mb-3" />
                      <div className="h-4 w-full bg-black/10 rounded mb-2" />
                      <div className="h-4 w-5/6 bg-black/10 rounded mb-5" />
                      <div className="h-11 w-full bg-black/10 rounded-xl" />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-4 w-full max-w-full min-w-0">
                  {passages.map((passage) => (
                    <VerseCard
                      key={passage.id}
                      passage={passage}
                      copyFormat={copyFormat}
                      initialRange={initialRanges[passage.id]}
                      isQueued={queue.some((q) => q.id === passage.id)}
                      onExpandContext={handleExpandContext}
                      onResetRange={handleResetRange}
                      onToggleQueue={handleToggleQueue}
                      onCopySuccess={(formatted, citation, mode) =>
                        triggerToast(
                          `Copied ${citation} (${mode === 'notion' ? 'Notion Block' : 'Plain Text'})`,
                          formatted.replace(/\n+/g, ' — ')
                        )
                      }
                    />
                  ))}
                </div>
              )}
            </>
          )}
        </section>
      </main>

      {/* Non-Sticky Footer: Sermon Queue Studio & Canon Info */}
      <footer className="relative z-10 w-full max-w-7xl mx-auto px-3 sm:px-6 pt-8 pb-16 mt-10">
        <SermonQueueDock
          queue={queue}
          sessionTitle={sermonSession.sessionTitle}
          sessionDate={sermonSession.sessionDate}
          copyFormat={copyFormat}
          onUpdateSessionTitle={handleUpdateSessionTitle}
          onUpdateSessionDate={handleUpdateSessionDate}
          onUpdateItemNote={handleUpdateItemNote}
          onMoveItem={handleMoveQueueItem}
          onRemoveItem={handleRemoveQueueItem}
          onClearQueue={handleClearQueue}
          onResetSession={handleResetSession}
          onCopyAllSuccess={(payload, count, mode) =>
            triggerToast(
              `Copied All (${count}) in ${mode === 'notion' ? 'Notion Block' : 'Plain Text'}`,
              payload.replace(/\n+/g, ' — ')
            )
          }
        />

        <div className="mt-8 pt-6 border-t border-[var(--glass-border)] text-center text-xs text-[var(--text-secondary)]/75 flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
          <span>VerseFlow · Fast Scripture Reference & Preaching Assistant</span>
          <span>·</span>
          <span>Protestant 66-Book Canon</span>
          <span>·</span>
          <span>Notion Block & Plain Text Ready</span>
        </div>
      </footer>

      {/* 66-Book Canonical Quick Selector Modal */}
      {bookModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="66-Book Canonical Scripture Selector"
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/60 backdrop-blur-sm"
        >
          <div className="w-full max-w-2xl max-h-[82vh] flex flex-col backdrop-blur-2xl bg-[var(--glass-elevated)] border border-[var(--glass-border)] shadow-[0_16px_48px_0_rgba(0,0,0,0.45),inset_0_1px_0_0_rgba(255,255,255,0.4)] rounded-2xl p-4 sm:p-5 text-[var(--text-primary)] overflow-hidden">
            <div className="flex items-start justify-between gap-2 pb-3 border-b border-[var(--glass-border)]">
              <div className="min-w-0 flex-1">
                <h2 className="text-base font-bold break-words">
                  Protestant 66-Book Canon
                </h2>
                <p className="text-xs text-[var(--text-secondary)] break-words">
                  Select any book to load Chapter 1 or refine in the search bar
                </p>
              </div>
              <button
                type="button"
                onClick={() => setBookModalOpen(false)}
                aria-label="Close 66-Book Canon Index"
                className="min-h-[44px] min-w-[44px] rounded-xl bg-[var(--control-surface)] hover:bg-[var(--control-surface-hover)] flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--text-primary)] cursor-pointer shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex items-center gap-2 my-3">
              <button
                type="button"
                onClick={() => setSelectedTestament('NT')}
                className={`min-h-[44px] flex-1 px-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                  selectedTestament === 'NT'
                    ? 'bg-[var(--accent-primary)] text-[var(--accent-text)]'
                    : 'bg-[var(--control-surface)] text-[var(--text-secondary)]'
                }`}
              >
                New Testament (27 Books)
              </button>
              <button
                type="button"
                onClick={() => setSelectedTestament('OT')}
                className={`min-h-[44px] flex-1 px-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                  selectedTestament === 'OT'
                    ? 'bg-[var(--accent-primary)] text-[var(--accent-text)]'
                    : 'bg-[var(--control-surface)] text-[var(--text-secondary)]'
                }`}
              >
                Old Testament (39 Books)
              </button>
            </div>

            <div className="flex-1 overflow-y-auto grid grid-cols-2 sm:grid-cols-3 gap-2 pr-1">
              {BIBLE_BOOKS.filter((b) => b.testament === selectedTestament).map(
                (book) => (
                  <button
                    key={book.id}
                    type="button"
                    onClick={() => {
                      const displayBook = isChineseActive
                        ? book.zhName
                        : book.name;
                      const refStr = `${displayBook} 1:1-5`;
                      setSearchInput(refStr);
                      setBookModalOpen(false);
                      executeSearch(refStr);
                    }}
                    className="min-h-[44px] px-3 py-2 rounded-xl bg-[var(--control-surface)] hover:bg-[var(--accent-primary)]/20 border border-[var(--glass-border)] hover:border-[var(--accent-primary)] text-left flex items-center justify-between gap-1.5 transition-colors cursor-pointer min-w-0"
                  >
                    <span className="text-xs font-medium break-words">
                      {isChineseActive
                        ? `${book.zhName} (${book.name})`
                        : book.name}
                    </span>
                    <span className="text-[11px] font-mono tabular-nums text-[var(--text-secondary)]/75 shrink-0">
                      #{book.id}
                    </span>
                  </button>
                )
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
