import React, { useState } from 'react';
import {
  Check,
  Copy,
  Plus,
  BookmarkCheck,
  ChevronUp,
  ChevronDown,
  RotateCcw,
} from 'lucide-react';
import {
  CopyFormatMode,
  formatReferenceCitation,
  formatPassageForClipboard,
  getTranslationDisplayLabel,
  getHumanizedMatchBadge,
  formatHumanizedPhraseHint,
  isChineseTranslation,
} from '../utils/scripture';
import { ResolvedPassage } from '../services/bibleClient';

interface VerseCardProps {
  passage: ResolvedPassage;
  copyFormat: CopyFormatMode;
  initialRange?: { verseStart: number; verseEnd: number };
  isQueued: boolean;
  onExpandContext: (passageId: string, direction: 'prev' | 'next') => void;
  onResetRange?: (passageId: string) => void;
  onToggleQueue: (passage: ResolvedPassage) => void;
  onCopySuccess: (formattedText: string, citation: string, mode: CopyFormatMode) => void;
}

export const VerseCard: React.FC<VerseCardProps> = ({
  passage,
  copyFormat,
  initialRange,
  isQueued,
  onExpandContext,
  onResetRange,
  onToggleQueue,
  onCopySuccess,
}) => {
  const [justCopied, setJustCopied] = useState(false);

  const citation = formatReferenceCitation(
    passage.bookName,
    passage.chapter,
    passage.verseStart,
    passage.verseEnd,
    passage.translation
  );

  const translationLabel = getTranslationDisplayLabel(passage.translation);

  const clipboardPayload = formatPassageForClipboard(
    {
      bookName: passage.bookName,
      chapter: passage.chapter,
      verseStart: passage.verseStart,
      verseEnd: passage.verseEnd,
      translation: passage.translation,
      text: passage.combinedText,
    },
    copyFormat
  );

  const canExpandPrev = passage.verseStart > 1;
  const canExpandNext = passage.verseEnd < passage.maxChapterVerse;
  const isExpanded =
    initialRange &&
    (passage.verseStart !== initialRange.verseStart ||
      passage.verseEnd !== initialRange.verseEnd);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(clipboardPayload);
    } catch (_err) {
      const textarea = document.createElement('textarea');
      textarea.value = clipboardPayload;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
    }
    setJustCopied(true);
    onCopySuccess(clipboardPayload, `${citation} (${translationLabel})`, copyFormat);
    setTimeout(() => setJustCopied(false), 1800);
  };

  const copyButtonLabel =
    copyFormat === 'notion' ? 'Copy Notion Block' : 'Copy Plain Text';

  return (
    <article
      className="w-full max-w-full overflow-hidden backdrop-blur-xl bg-[var(--glass-surface)] border border-[var(--glass-border)] shadow-[0_8px_32px_0_rgba(0,0,0,0.18),inset_0_1px_0_0_rgba(255,255,255,0.4)] rounded-2xl p-4 sm:p-6 transition-all duration-300"
      aria-label={`${citation} (${translationLabel})`}
    >
      {/* Card Header: Reference Title + Quiet Unboxed Metadata */}
      <div className="flex flex-wrap items-baseline justify-between gap-2 mb-3 min-w-0">
        <div className="flex flex-wrap items-baseline gap-x-2.5 gap-y-1 min-w-0">
          <h2 className="text-lg sm:text-xl font-bold tracking-tight text-[var(--text-primary)] font-ui break-words">
            {citation}
          </h2>
          <div className="flex flex-wrap items-center gap-x-1.5 gap-y-0.5 text-xs text-[var(--text-secondary)] font-medium min-w-0">
            <span>{translationLabel}</span>
            <span aria-hidden="true">·</span>
            <span>
              {getHumanizedMatchBadge(
                passage.source,
                isChineseTranslation(passage.translation)
              )}
            </span>
            {isQueued && (
              <>
                <span aria-hidden="true">·</span>
                <span className="text-[var(--accent-secondary)] font-semibold">
                  In Sermon Queue
                </span>
              </>
            )}
          </div>
        </div>

        {isExpanded && onResetRange && (
          <button
            type="button"
            onClick={() => onResetRange(passage.id)}
            aria-label={`Reset verse range for ${citation}`}
            className="text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] flex items-center gap-1 py-1 px-2 rounded-lg hover:bg-black/5 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5 shrink-0" />
            <span>Reset Range</span>
          </button>
        )}
      </div>

      {/* Gentle Phrase / Topic Match Hint */}
      {passage.confidenceReason && passage.source === 'semantic' && (
        <p className="text-xs text-[var(--text-secondary)]/90 mb-3 leading-relaxed break-words italic">
          {formatHumanizedPhraseHint(
            passage.confidenceReason,
            undefined,
            isChineseTranslation(passage.translation)
          )}
        </p>
      )}

      {/* Clean Verse Text in DM Sans with Adaptive Secondary Tabular Verse Numbers */}
      <div className="font-verse text-[16px] sm:text-[17px] leading-[1.68] text-[var(--text-primary)] tracking-[0.01em] mb-5 select-text break-words">
        {passage.verses.length > 0 ? (
          passage.verses.map((v, idx) => (
            <span key={v.verse} className={idx > 0 ? 'ml-1.5' : ''}>
              <sup className="font-mono tabular-nums text-[11px] font-semibold text-[var(--text-secondary)] mr-1 select-none">
                {v.verse}
              </sup>
              <span>{v.text}</span>
            </span>
          ))
        ) : (
          <span>{passage.combinedText}</span>
        )}
      </div>

      {/* Card Footer: Instant 0ms Context Expansion + Primary Copy CTA + Queue Action */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 pt-3 border-t border-[var(--glass-border)] min-w-0">
        {/* In-Place Context Expansion Controls ("Add prev verse" / "Add next verse") */}
        <div className="grid grid-cols-2 sm:flex items-center gap-2 min-w-0">
          <button
            type="button"
            disabled={!canExpandPrev}
            onClick={() => onExpandContext(passage.id, 'prev')}
            aria-label={`Add previous verse before ${citation}`}
            className={`min-h-[44px] px-2.5 sm:px-3.5 py-2 rounded-xl border text-xs font-medium flex items-center justify-center gap-1.5 text-center transition-colors min-w-0 ${
              canExpandPrev
                ? 'bg-[var(--control-surface)] hover:bg-[var(--control-surface-hover)] border-[var(--glass-border)] text-[var(--text-primary)] active:scale-[0.98] cursor-pointer'
                : 'bg-[var(--control-surface)]/40 border-[var(--glass-border)]/40 text-[var(--text-secondary)]/40 cursor-not-allowed'
            }`}
          >
            <ChevronUp className="w-4 h-4 text-[var(--text-secondary)] shrink-0" />
            <span className="break-words leading-tight">Add prev verse</span>
          </button>

          <button
            type="button"
            disabled={!canExpandNext}
            onClick={() => onExpandContext(passage.id, 'next')}
            aria-label={`Add next verse after ${citation}`}
            className={`min-h-[44px] px-2.5 sm:px-3.5 py-2 rounded-xl border text-xs font-medium flex items-center justify-center gap-1.5 text-center transition-colors min-w-0 ${
              canExpandNext
                ? 'bg-[var(--control-surface)] hover:bg-[var(--control-surface-hover)] border-[var(--glass-border)] text-[var(--text-primary)] active:scale-[0.98] cursor-pointer'
                : 'bg-[var(--control-surface)]/40 border-[var(--glass-border)]/40 text-[var(--text-secondary)]/40 cursor-not-allowed'
            }`}
          >
            <ChevronDown className="w-4 h-4 text-[var(--text-secondary)] shrink-0" />
            <span className="break-words leading-tight">Add next verse</span>
          </button>
        </div>

        {/* Primary Action CTAs: Queue & Copy Button */}
        <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 min-w-0">
          <button
            type="button"
            onClick={() => onToggleQueue(passage)}
            aria-label={
              isQueued
                ? `Remove ${citation} from Sermon Queue`
                : `Add ${citation} to Sermon Queue`
            }
            className={`min-h-[44px] px-3.5 sm:px-4 py-2 rounded-xl border text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer active:scale-[0.98] min-w-0 ${
              isQueued
                ? 'bg-[var(--accent-secondary)]/20 border-[var(--accent-secondary)]/60 text-[var(--accent-secondary)] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.25)]'
                : 'bg-[var(--control-surface)] hover:bg-[var(--control-surface-hover)] border-[var(--glass-border)] text-[var(--text-primary)]'
            }`}
          >
            {isQueued ? (
              <>
                <BookmarkCheck className="w-4 h-4 text-[var(--accent-secondary)] shrink-0" />
                <span className="break-words leading-tight">Queued</span>
              </>
            ) : (
              <>
                <Plus className="w-4 h-4 text-[var(--accent-secondary)] shrink-0" />
                <span className="break-words leading-tight">Queue</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={handleCopy}
            aria-label={`${copyButtonLabel}: ${citation} (${translationLabel})`}
            className={`flex-1 sm:flex-initial min-h-[44px] px-4 sm:px-5 py-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 text-center transition-all cursor-pointer active:scale-[0.98] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.3)] min-w-0 ${
              justCopied
                ? 'bg-emerald-600 text-white border border-emerald-400/50'
                : 'bg-[var(--accent-primary)] hover:bg-[var(--accent-primary-hover)] text-[var(--accent-text)] border border-[var(--glass-border)]'
            }`}
          >
            {justCopied ? (
              <>
                <Check className="w-4 h-4 shrink-0" />
                <span className="break-words leading-tight">Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 shrink-0" />
                <span className="break-words leading-tight">{copyButtonLabel}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </article>
  );
};
