/**
 * Web Haptic Feedback Utility for VerseFlow
 * Uses the standard Web Vibration API with safe feature detection
 */

/**
 * Triggers a short, unique crisp taptic vibration pattern when a search completes.
 * Pattern: [28ms pulse, 45ms pause, 32ms pulse]
 * Produces a subtle, satisfying physical confirmation on mobile devices.
 */
export const triggerSearchSuccessHaptic = (): void => {
  if (typeof window === 'undefined' || typeof navigator === 'undefined') {
    return;
  }

  try {
    if ('vibrate' in navigator && typeof navigator.vibrate === 'function') {
      // 28ms pulse, 45ms pause, 32ms pulse
      navigator.vibrate([28, 45, 32]);
    }
  } catch (_err) {
    // Silently fall back if the device or user agent blocks vibration
  }
};
