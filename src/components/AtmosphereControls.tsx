import React, { useState } from 'react';
import {
  Sun,
  Mountain,
  Trees,
  Waves,
  SunDim,
  SlidersHorizontal,
  Check,
} from 'lucide-react';
import sunlitSanctuaryImg from '../assets/images/sunlit_sanctuary_day_1792322784088.jpg';
import mistyLakeImg from '../assets/images/misty_alpine_lake_1792311606130.jpg';
import goldenForestImg from '../assets/images/golden_forest_canopy_1792311607317.jpg';
import stillWatersImg from '../assets/images/still_zen_waters_1792311608258.jpg';

export interface PresetThemePalette {
  mode: 'day' | 'night';
  glassSurface: string;
  glassSurfaceHover: string;
  glassElevated: string;
  glassBorder: string;
  controlSurface: string;
  controlSurfaceHover: string;
  headerSurface: string;
  textPrimary: string;
  textSecondary: string;
  accentPrimary: string;
  accentPrimaryHover: string;
  accentText: string;
  accentSecondary: string;
}

export interface LandscapePreset {
  id: 'sunlit-sanctuary' | 'misty-lake' | 'golden-forest' | 'zen-waters';
  name: string;
  shortLabel: string;
  imageUrl: string;
  fallbackGradient: string;
  caption: string;
  defaultDimmer: number;
  theme: PresetThemePalette;
}

export const LANDSCAPE_PRESETS: readonly LandscapePreset[] = [
  {
    id: 'zen-waters',
    name: 'Still Waters',
    shortLabel: 'Still Waters',
    imageUrl: stillWatersImg,
    fallbackGradient:
      'radial-gradient(circle at 40% 30%, #324354 0%, #1e293b 55%, #020617 100%)',
    caption: 'Twilight calm along quiet coastal stones',
    defaultDimmer: 20,
    theme: {
      mode: 'night',
      glassSurface: 'rgba(30, 41, 59, 0.52)',
      glassSurfaceHover: 'rgba(30, 41, 59, 0.72)',
      glassElevated: 'rgba(15, 23, 42, 0.92)',
      glassBorder: 'rgba(186, 210, 235, 0.22)',
      controlSurface: 'rgba(2, 6, 23, 0.45)',
      controlSurfaceHover: 'rgba(2, 6, 23, 0.65)',
      headerSurface: 'rgba(2, 6, 23, 0.30)',
      textPrimary: '#F1F5F9',
      textSecondary: '#B8CBE0',
      accentPrimary: '#4F7CAC',
      accentPrimaryHover: '#3f658e',
      accentText: '#F1F5F9',
      accentSecondary: '#E2C07D',
    },
  },
  {
    id: 'sunlit-sanctuary',
    name: 'Sunlit Sanctuary',
    shortLabel: 'Sunlit Day',
    imageUrl: sunlitSanctuaryImg,
    fallbackGradient:
      'radial-gradient(circle at 35% 20%, #EFECE4 0%, #DFD8C8 55%, #C8BFA8 100%)',
    caption: 'Warm travertine stone & botanical morning light',
    defaultDimmer: 10,
    theme: {
      mode: 'day',
      glassSurface: 'rgba(247, 244, 236, 0.72)',
      glassSurfaceHover: 'rgba(247, 244, 236, 0.86)',
      glassElevated: 'rgba(244, 240, 230, 0.94)',
      glassBorder: 'rgba(104, 99, 88, 0.22)',
      controlSurface: 'rgba(227, 220, 206, 0.65)',
      controlSurfaceHover: 'rgba(215, 207, 190, 0.85)',
      headerSurface: 'rgba(242, 238, 228, 0.65)',
      textPrimary: '#24221E',
      textSecondary: '#655F53',
      accentPrimary: '#6D7661',
      accentPrimaryHover: '#59614E',
      accentText: '#FAF8F5',
      accentSecondary: '#8A724C',
    },
  },
  {
    id: 'misty-lake',
    name: 'Misty Alpine Lake',
    shortLabel: 'Alpine Lake',
    imageUrl: mistyLakeImg,
    fallbackGradient:
      'radial-gradient(circle at 50% 25%, #2F3E46 0%, #1b262c 55%, #090d16 100%)',
    caption: 'Dawn reflection over still mountain waters',
    defaultDimmer: 30,
    theme: {
      mode: 'night',
      glassSurface: 'rgba(47, 62, 70, 0.48)',
      glassSurfaceHover: 'rgba(47, 62, 70, 0.68)',
      glassElevated: 'rgba(33, 45, 52, 0.92)',
      glassBorder: 'rgba(167, 199, 231, 0.22)',
      controlSurface: 'rgba(2, 6, 23, 0.45)',
      controlSurfaceHover: 'rgba(2, 6, 23, 0.65)',
      headerSurface: 'rgba(2, 6, 23, 0.30)',
      textPrimary: '#F1F5F4',
      textSecondary: '#A7C7E7',
      accentPrimary: '#5E8B7E',
      accentPrimaryHover: '#4d766a',
      accentText: '#F1F5F4',
      accentSecondary: '#D4AF37',
    },
  },
  {
    id: 'golden-forest',
    name: 'Golden Forest Canopy',
    shortLabel: 'Forest Canopy',
    imageUrl: goldenForestImg,
    fallbackGradient:
      'radial-gradient(circle at 60% 20%, #3a4f41 0%, #24332c 55%, #0b1311 100%)',
    caption: 'Warm sanctuary light through ancient cedars',
    defaultDimmer: 30,
    theme: {
      mode: 'night',
      glassSurface: 'rgba(42, 57, 43, 0.50)',
      glassSurfaceHover: 'rgba(42, 57, 43, 0.70)',
      glassElevated: 'rgba(28, 39, 29, 0.92)',
      glassBorder: 'rgba(214, 222, 194, 0.22)',
      controlSurface: 'rgba(2, 6, 23, 0.45)',
      controlSurfaceHover: 'rgba(2, 6, 23, 0.65)',
      headerSurface: 'rgba(2, 6, 23, 0.30)',
      textPrimary: '#F7F5EB',
      textSecondary: '#D6DEC2',
      accentPrimary: '#6B9071',
      accentPrimaryHover: '#58795d',
      accentText: '#F7F5EB',
      accentSecondary: '#E5B84B',
    },
  },
] as const;

interface BackgroundCanvasProps {
  activePreset: LandscapePreset;
  dimmerOpacity: number; // 10 to 85, default 10 for Sunlit Sanctuary
}

export const BackgroundCanvas: React.FC<BackgroundCanvasProps> = ({
  activePreset,
  dimmerOpacity,
}) => {
  const [imageError, setImageError] = useState<Record<string, boolean>>({});
  const isDay = activePreset.theme.mode === 'day';

  return (
    <div
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      style={{ background: activePreset.fallbackGradient }}
      aria-hidden="true"
    >
      {!imageError[activePreset.id] && (
        <img
          key={activePreset.id}
          src={activePreset.imageUrl}
          alt={activePreset.name}
          onError={() =>
            setImageError((prev) => ({ ...prev, [activePreset.id]: true }))
          }
          className="w-full h-full object-cover object-center scale-[1.02] transition-opacity duration-500"
        />
      )}
      {/* Auditorium scrim overlay (10% to 85%, default 10% on Sunlit Sanctuary) */}
      <div
        className={`absolute inset-0 transition-opacity duration-200 ${
          isDay ? 'bg-[#1e1b16]' : 'bg-slate-950'
        }`}
        style={{ opacity: dimmerOpacity / 100 }}
      />
      {/* Subtle bottom vignette adapted to day/night mode */}
      <div
        className={`absolute inset-0 ${
          isDay
            ? 'bg-gradient-to-t from-[#d6cfc0]/45 via-transparent to-white/15'
            : 'bg-gradient-to-t from-slate-950/75 via-slate-950/10 to-slate-950/30'
        }`}
      />
    </div>
  );
};

interface AtmosphereSwitcherProps {
  activePreset: LandscapePreset;
  onSelectPreset: (preset: LandscapePreset) => void;
  onCyclePreset: () => void;
  dimmerOpacity: number;
  onChangeDimmer: (value: number) => void;
}

export const AtmosphereSwitcher: React.FC<AtmosphereSwitcherProps> = ({
  activePreset,
  onSelectPreset,
  onCyclePreset,
  dimmerOpacity,
  onChangeDimmer,
}) => {
  const [open, setOpen] = useState(false);

  const renderPresetIcon = (id: LandscapePreset['id']) => {
    if (id === 'sunlit-sanctuary')
      return <Sun className="w-4 h-4 text-[var(--accent-secondary)] shrink-0" />;
    if (id === 'misty-lake')
      return <Mountain className="w-4 h-4 text-[var(--text-secondary)] shrink-0" />;
    if (id === 'golden-forest')
      return <Trees className="w-4 h-4 text-[var(--accent-primary)] shrink-0" />;
    return <Waves className="w-4 h-4 text-[var(--text-secondary)] shrink-0" />;
  };

  return (
    <div className="relative">
      <div className="flex items-center gap-1.5">
        <button
          type="button"
          onClick={onCyclePreset}
          title={`Cycle background (${activePreset.name})`}
          aria-label={`Cycle peaceful background: currently ${activePreset.name}`}
          className="min-h-[44px] px-3 rounded-xl backdrop-blur-xl bg-[var(--glass-surface)] hover:bg-[var(--glass-surface-hover)] border border-[var(--glass-border)] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.35)] flex items-center gap-2 text-xs font-medium text-[var(--text-primary)] transition-colors cursor-pointer"
        >
          {renderPresetIcon(activePreset.id)}
          <span className="hidden sm:inline">{activePreset.shortLabel}</span>
        </button>

        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          aria-expanded={open}
          aria-label="Auditorium Dimmer & Background Settings"
          title="Auditorium Dimmer & Backdrop Presets"
          className={`min-h-[44px] min-w-[44px] px-2.5 rounded-xl backdrop-blur-xl border transition-colors flex items-center justify-center gap-1.5 text-xs font-medium cursor-pointer ${
            open
              ? 'bg-[var(--accent-primary)] border-white/30 text-[var(--accent-text)] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.35)]'
              : 'bg-[var(--glass-surface)] hover:bg-[var(--glass-surface-hover)] border-[var(--glass-border)] text-[var(--text-secondary)] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.35)]'
          }`}
        >
          <SlidersHorizontal className="w-4 h-4 shrink-0" />
          <span
            className={`tabular-nums text-[11px] ${
              open ? 'text-[var(--accent-text)]' : 'text-[var(--text-primary)]'
            }`}
          >
            {dimmerOpacity}%
          </span>
        </button>
      </div>

      {open && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />
          <div
            role="dialog"
            aria-label="Auditorium Atmosphere Controls"
            className="fixed sm:absolute right-3 sm:right-0 left-3 sm:left-auto mt-2 sm:w-80 z-50 backdrop-blur-2xl bg-[var(--glass-elevated)] border border-[var(--glass-border)] shadow-[0_16px_48px_0_rgba(0,0,0,0.35),inset_0_1px_0_0_rgba(255,255,255,0.4)] rounded-2xl p-4 text-[var(--text-primary)] transition-colors duration-300"
          >
            <div className="flex items-center justify-between gap-2 mb-3">
              <span className="text-xs font-semibold tracking-wide text-[var(--text-secondary)]">
                Sanctuary Backdrop
              </span>
              <span className="text-[11px] text-[var(--text-primary)]/75">
                {activePreset.shortLabel}
              </span>
            </div>

            <div className="grid grid-cols-1 gap-2 mb-4">
              {LANDSCAPE_PRESETS.map((preset) => {
                const isSelected = preset.id === activePreset.id;
                return (
                  <button
                    key={preset.id}
                    type="button"
                    onClick={() => onSelectPreset(preset)}
                    className={`min-h-[44px] w-full px-3 py-2 rounded-xl border text-left flex items-center justify-between gap-2 transition-colors cursor-pointer ${
                      isSelected
                        ? 'bg-[var(--accent-primary)]/20 border-[var(--accent-primary)] text-[var(--text-primary)]'
                        : 'bg-[var(--control-surface)] hover:bg-[var(--control-surface-hover)] border-[var(--glass-border)] text-[var(--text-primary)]/85'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0 flex-1">
                      {renderPresetIcon(preset.id)}
                      <div className="min-w-0 flex-1">
                        <div className="text-xs font-semibold break-words">
                          {preset.name}
                        </div>
                        <div className="text-[11px] text-[var(--text-secondary)]/85 break-words">
                          {preset.caption}
                        </div>
                      </div>
                    </div>
                    {isSelected && (
                      <Check className="w-4 h-4 text-[var(--accent-primary)] shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>

            <div className="pt-3 border-t border-[var(--glass-border)]">
              <div className="flex items-center justify-between gap-2 mb-2">
                <label
                  htmlFor="auditorium-dimmer-slider"
                  className="text-xs font-semibold text-[var(--text-secondary)] flex items-center gap-1.5"
                >
                  <SunDim className="w-4 h-4 text-[var(--accent-secondary)] shrink-0" />
                  <span>Auditorium Dimmer</span>
                </label>
                <span className="text-xs font-mono tabular-nums text-[var(--text-primary)]">
                  {dimmerOpacity}% Scrim
                </span>
              </div>
              <input
                id="auditorium-dimmer-slider"
                type="range"
                min={10}
                max={85}
                step={5}
                value={dimmerOpacity}
                onChange={(e) => onChangeDimmer(Number(e.target.value))}
                className="w-full h-2 bg-[var(--control-surface)] rounded-lg appearance-none cursor-pointer accent-[var(--accent-primary)]"
              />
              <div className="flex justify-between text-[11px] text-[var(--text-secondary)]/75 mt-1 tabular-nums">
                <span>10% Min</span>
                <span>20% Default</span>
                <span>85% Deep Dim</span>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
