import React, { useState } from 'react';
import {
  Copy,
  Check,
  Trash2,
  ArrowUp,
  ArrowDown,
  ChevronUp,
  ChevronDown,
  Bookmark,
  X,
  MessageSquare,
  Calendar,
  RotateCcw,
  Sparkles,
} from 'lucide-react';
import {
  CopyFormatMode,
  formatReferenceCitation,
  formatSermonSessionExport,
  formatPassageForClipboard,
  getTranslationDisplayLabel,
  SermonQueueItem,
} from '../utils/scripture';

export interface SermonQueueDockProps {
  queue: SermonQueueItem[];
  sessionTitle: string;
  sessionDate: string;
  copyFormat: CopyFormatMode;
  onUpdateSessionTitle: (title: string) => void;
  onUpdateSessionDate: (date: string) => void;
  onUpdateItemNote: (id: string, note: string) => void;
  onMoveItem: (index: number, direction: 'up' | 'down') => void;
  onRemoveItem: (id: string) => void;
  onClearQueue: () => void;
  onResetSession?: () => void;
  onCopyAllSuccess: (payload: string, count: number, mode: CopyFormatMode) => void;
}

export const SermonQueueDock: React.FC<SermonQueueDockProps> = ({
  queue,
  sessionTitle,
  sessionDate,
  copyFormat,
  onUpdateSessionTitle,
  onUpdateSessionDate,
  onUpdateItemNote,
  onMoveItem,
  onRemoveItem,
  onClearQueue,
  onResetSession,
  onCopyAllSuccess,
}) => {
  // Collapsible footer panel: defaults to open so queued verses are readily visible
  const [isExpanded, setIsExpanded] = useState(true);
  const [copiedAll, setCopiedAll] = useState(false);
  const [copiedItemId, setCopiedItemId] = useState<string | null>(null);

  const bulkPayload = formatSermonSessionExport(
    sessionTitle,
    sessionDate,
    queue,
    copyFormat
  );

  const handleCopyAll = async () => {
    if (queue.length === 0) return;
    try {
      await navigator.clipboard.writeText(bulkPayload);
    } catch (_err) {
      const textarea = document.createElement('textarea');
      textarea.value = bulkPayload;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
    }
    setCopiedAll(true);
    onCopyAllSuccess(bulkPayload, queue.length, copyFormat);
    setTimeout(() => setCopiedAll(false), 2000);
  };

  const handleCopySingleItem = async (item: SermonQueueItem) => {
    const singlePayload = formatPassageForClipboard(
      {
        bookName: item.bookName,
        chapter: item.chapter,
        verseStart: item.verseStart,
        verseEnd: item.verseEnd,
        translation: item.translation,
        text: item.combinedText,
        note: item.note,
      },
      copyFormat
    );
    try {
      await navigator.clipboard.writeText(singlePayload);
    } catch (_err) {
      const textarea = document.createElement('textarea');
      textarea.value = singlePayload;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
    }
    setCopiedItemId(item.id);
    setTimeout(() => setCopiedItemId(null), 1800);
  };

  const bulkCopyLabel =
    copyFormat === 'notion'
      ? `Copy All (${queue.length}) Notion Block`
      : `Copy All (${queue.length}) Plain Text`;

  return (
    <section
      id="sermon-queue-footer"
      aria-label="Sermon Clipboard Queue"
      className="w-full max-w-full overflow-hidden backdrop-blur-xl bg-[var(--glass-surface)] border border-[var(--glass-border)] shadow-[0_8px_32px_0_rgba(0,0,0,0.18),inset_0_1px_0_0_rgba(255,255,255,0.4)] rounded-2xl p-4 sm:p-6 transition-colors duration-300"
    >
      {/* Header Bar with Title, Session Title & Date, Passage Counter, Actions & Expand/Collapse Toggle */}
      <div className="flex flex-col gap-3.5 pb-3.5 border-b border-[var(--glass-border)]">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-9 h-9 rounded-xl bg-[var(--accent-primary)]/15 border border-[var(--accent-primary)]/30 flex items-center justify-center text-[var(--accent-secondary)] shrink-0">
              <Bookmark className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-base font-bold text-[var(--text-primary)]">
                  Sermon Queue
                </h2>
                <span className="px-2 py-0.5 rounded-full text-xs font-mono font-medium bg-[var(--control-surface)] text-[var(--accent-secondary)] border border-[var(--glass-border)]">
                  {queue.length} {queue.length === 1 ? 'passage' : 'passages'}
                </span>
                <span
                  title="Persisted automatically to local browser storage"
                  className="hidden sm:inline-flex items-center gap-1 text-[11px] font-medium text-emerald-500/90 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full"
                >
                  <Check className="w-3 h-3 shrink-0" />
                  <span>Saved locally</span>
                </span>
              </div>
              <p className="text-xs text-[var(--text-secondary)] mt-0.5">
                Speaker sequence & points · Mode: {copyFormat === 'notion' ? 'Notion Block' : 'Plain Text'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {onResetSession && (
              <button
                type="button"
                onClick={onResetSession}
                title="Start a fresh sermon session"
                aria-label="Start fresh sermon session"
                className="min-h-[40px] px-2.5 sm:px-3 text-xs font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-black/10 transition-colors flex items-center gap-1.5 rounded-xl cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5 shrink-0" />
                <span className="hidden sm:inline">New Session</span>
              </button>
            )}

            {queue.length > 0 && (
              <>
                <button
                  type="button"
                  onClick={onClearQueue}
                  aria-label="Clear all queued verses"
                  className="min-h-[40px] px-2.5 sm:px-3 text-xs font-medium text-[var(--text-secondary)] hover:text-rose-400 hover:bg-rose-500/10 transition-colors flex items-center gap-1.5 rounded-xl cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5 shrink-0" />
                  <span className="hidden sm:inline">Clear Queue</span>
                  <span className="sm:hidden">Clear</span>
                </button>

                <button
                  type="button"
                  onClick={handleCopyAll}
                  aria-label={bulkCopyLabel}
                  className={`min-h-[40px] px-3.5 sm:px-4 py-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-[inset_0_1px_0_0_rgba(255,255,255,0.3)] ${
                    copiedAll
                      ? 'bg-emerald-600 text-white'
                      : 'bg-[var(--accent-primary)] hover:bg-[var(--accent-primary-hover)] text-[var(--accent-text)]'
                  }`}
                >
                  {copiedAll ? (
                    <>
                      <Check className="w-4 h-4 shrink-0" />
                      <span>Copied ({queue.length})</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 shrink-0" />
                      <span>Copy All ({queue.length})</span>
                    </>
                  )}
                </button>
              </>
            )}

            <button
              type="button"
              onClick={() => setIsExpanded((prev) => !prev)}
              aria-expanded={isExpanded}
              aria-label={isExpanded ? 'Collapse Sermon Queue' : 'Expand Sermon Queue'}
              className="min-h-[40px] min-w-[40px] px-2.5 rounded-xl bg-[var(--control-surface)] hover:bg-[var(--control-surface-hover)] border border-[var(--glass-border)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] flex items-center justify-center transition-colors cursor-pointer"
            >
              {isExpanded ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>

        {/* Editable Session Title & Session Date Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 pt-1">
          <div className="flex-1 min-w-0 flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[var(--control-surface)] border border-[var(--glass-border)] focus-within:border-[var(--accent-primary)] transition-colors">
            <Sparkles className="w-3.5 h-3.5 text-[var(--accent-secondary)] shrink-0" />
            <label htmlFor="sermon-session-title" className="sr-only">
              Sermon Session Title
            </label>
            <input
              id="sermon-session-title"
              type="text"
              value={sessionTitle}
              onChange={(e) => onUpdateSessionTitle(e.target.value)}
              placeholder="Session Title (e.g. Sunday Morning Sermon, Romans 8 Series)"
              className="w-full text-xs font-semibold text-[var(--text-primary)] placeholder-[var(--text-secondary)]/60 bg-transparent border-none focus:outline-none"
            />
          </div>

          <div className="sm:w-64 flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[var(--control-surface)] border border-[var(--glass-border)] focus-within:border-[var(--accent-primary)] transition-colors">
            <Calendar className="w-3.5 h-3.5 text-[var(--accent-secondary)] shrink-0" />
            <label htmlFor="sermon-session-date" className="sr-only">
              Sermon Session Date
            </label>
            <input
              id="sermon-session-date"
              type="text"
              value={sessionDate}
              onChange={(e) => onUpdateSessionDate(e.target.value)}
              placeholder="Date (e.g. Sunday, Oct 18, 2026)"
              className="w-full text-xs font-medium text-[var(--text-primary)] placeholder-[var(--text-secondary)]/60 bg-transparent border-none focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Collapsible Panel Content */}
      {isExpanded && (
        <div className="pt-4 transition-all duration-300">
          {queue.length === 0 ? (
            <div className="py-8 text-center px-4 max-w-md mx-auto">
              <div className="w-10 h-10 mx-auto mb-2.5 rounded-xl bg-[var(--control-surface)] border border-[var(--glass-border)] flex items-center justify-center text-[var(--accent-secondary)]/80">
                <Bookmark className="w-4 h-4" />
              </div>
              <p className="text-sm font-semibold text-[var(--text-primary)] mb-1">
                Your Sermon Queue is empty
              </p>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                Tap <span className="text-[var(--accent-secondary)] font-semibold">Queue</span> on any verse card above during preaching or study to batch passages in chronological order, add speaker points, and persist to localStorage.
              </p>
            </div>
          ) : (
            <>
              {/* Responsive 1 to 3 Column Card Grid for Queued Verses */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 my-2">
                {queue.map((item, idx) => {
                  const citation = formatReferenceCitation(
                    item.bookName,
                    item.chapter,
                    item.verseStart,
                    item.verseEnd,
                    item.translation
                  );
                  const transLabel = getTranslationDisplayLabel(item.translation);
                  const isCopied = copiedItemId === item.id;

                  return (
                    <div
                      key={item.id}
                      className="p-3.5 rounded-xl bg-[var(--control-surface)] border border-[var(--glass-border)] flex flex-col justify-between gap-2.5 min-w-0"
                    >
                      <div className="min-w-0">
                        <div className="flex items-center justify-between gap-1.5 text-xs font-semibold text-[var(--text-primary)] pb-1 border-b border-[var(--glass-border)]/50">
                          <div className="flex items-center gap-1.5 min-w-0">
                            <span className="font-mono tabular-nums text-[var(--accent-secondary)] shrink-0">
                              {String(idx + 1).padStart(2, '0')}.
                            </span>
                            <span className="truncate">{citation}</span>
                          </div>
                          <span className="text-[11px] font-mono font-medium px-1.5 py-0.5 rounded bg-black/20 text-[var(--text-secondary)] shrink-0">
                            {transLabel}
                          </span>
                        </div>
                        <p className="text-xs text-[var(--text-primary)]/85 font-verse line-clamp-3 mt-2 leading-relaxed break-words">
                          {item.combinedText}
                        </p>

                        {/* Lightweight "Add note / speaker point..." Input Beneath Each Item */}
                        <div className="mt-2.5 pt-2 border-t border-[var(--glass-border)]/50">
                          <label htmlFor={`queue-note-${item.id}`} className="sr-only">
                            Add note or speaker point for {citation}
                          </label>
                          <div className="relative flex items-center">
                            <MessageSquare className="w-3.5 h-3.5 text-[var(--accent-secondary)]/70 absolute left-2.5 pointer-events-none shrink-0" />
                            <input
                              id={`queue-note-${item.id}`}
                              type="text"
                              value={item.note || ''}
                              onChange={(e) => onUpdateItemNote(item.id, e.target.value)}
                              placeholder="Add note / speaker point..."
                              className="w-full text-xs pl-8 pr-7 py-1.5 rounded-lg bg-black/10 border border-[var(--glass-border)]/60 focus:border-[var(--accent-primary)] focus:bg-black/20 focus:outline-none text-[var(--text-primary)] placeholder-[var(--text-secondary)]/50 transition-colors"
                            />
                            {item.note && (
                              <button
                                type="button"
                                onClick={() => onUpdateItemNote(item.id, '')}
                                aria-label={`Clear speaker note for ${citation}`}
                                title="Clear note"
                                className="absolute right-1.5 p-1 rounded hover:bg-black/15 text-[var(--text-secondary)] hover:text-rose-400 cursor-pointer transition-colors"
                              >
                                <X className="w-3 h-3" />
                              </button>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-1 border-t border-[var(--glass-border)]/40 mt-1">
                        <span className="text-[11px] text-[var(--text-secondary)]/60 font-mono">
                          #{idx + 1} of {queue.length}
                        </span>

                        <div className="flex items-center gap-1 shrink-0">
                          <button
                            type="button"
                            onClick={() => handleCopySingleItem(item)}
                            title={`Copy ${citation} with speaker note`}
                            aria-label={`Copy ${citation}`}
                            className={`min-h-[36px] px-2 rounded-lg text-xs font-medium flex items-center gap-1 transition-colors cursor-pointer ${
                              isCopied
                                ? 'bg-emerald-600/20 text-emerald-400'
                                : 'hover:bg-black/10 text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                            }`}
                          >
                            {isCopied ? (
                              <Check className="w-3.5 h-3.5" />
                            ) : (
                              <Copy className="w-3.5 h-3.5" />
                            )}
                            <span className="hidden xl:inline text-[11px]">
                              {isCopied ? 'Copied' : 'Copy'}
                            </span>
                          </button>

                          <button
                            type="button"
                            disabled={idx === 0}
                            onClick={() => onMoveItem(idx, 'up')}
                            aria-label={`Move ${citation} earlier in queue`}
                            className="min-h-[36px] min-w-[32px] px-1 rounded-lg hover:bg-black/10 flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--text-primary)] disabled:opacity-25 cursor-pointer disabled:cursor-not-allowed"
                          >
                            <ArrowUp className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            disabled={idx === queue.length - 1}
                            onClick={() => onMoveItem(idx, 'down')}
                            aria-label={`Move ${citation} later in queue`}
                            className="min-h-[36px] min-w-[32px] px-1 rounded-lg hover:bg-black/10 flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--text-primary)] disabled:opacity-25 cursor-pointer disabled:cursor-not-allowed"
                          >
                            <ArrowDown className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => onRemoveItem(item.id)}
                            aria-label={`Remove ${citation} from queue`}
                            className="min-h-[36px] min-w-[32px] px-1 rounded-lg hover:bg-rose-500/20 flex items-center justify-center text-[var(--text-secondary)] hover:text-rose-400 cursor-pointer"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Bottom Quick-Action Bar */}
              <div className="mt-4 pt-3 border-t border-[var(--glass-border)] flex flex-wrap items-center justify-between gap-3">
                <p className="text-xs text-[var(--text-secondary)]">
                  Session: <span className="font-semibold text-[var(--text-primary)]">{sessionTitle || 'Untitled'}</span> · <span className="text-[var(--text-secondary)]/80">{sessionDate}</span> · <span className="font-semibold text-[var(--text-primary)]">{queue.length}</span> passages queued
                </p>

                <button
                  type="button"
                  onClick={handleCopyAll}
                  aria-label={bulkCopyLabel}
                  className={`min-h-[44px] px-5 py-2.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-[inset_0_1px_0_0_rgba(255,255,255,0.3)] ${
                    copiedAll
                      ? 'bg-emerald-600 text-white'
                      : 'bg-[var(--accent-primary)] hover:bg-[var(--accent-primary-hover)] text-[var(--accent-text)]'
                  }`}
                >
                  {copiedAll ? (
                    <>
                      <Check className="w-4 h-4 shrink-0" />
                      <span>Copied All ({queue.length})!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 shrink-0" />
                      <span>{bulkCopyLabel}</span>
                    </>
                  )}
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </section>
  );
};
