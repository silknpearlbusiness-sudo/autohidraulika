import { useCallback, useEffect, useRef } from "react";

const SRC = "/sounds/click.mp3";

/**
 * Plays a short click SFX on user interaction.
 * - Preloads the file once so the first click isn't delayed.
 * - Clones the audio node per play so rapid clicks overlap instead of cutting off.
 * - Stays silent for users with prefers-reduced-motion.
 */
export function useClickSound(volume = 0.35) {
  const baseRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const a = new Audio(SRC);
    a.preload = "auto";
    a.volume = volume;
    baseRef.current = a;
  }, [volume]);

  return useCallback(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const base = baseRef.current;
    if (!base) return;

    const a = base.cloneNode() as HTMLAudioElement;
    a.volume = volume;
    a.currentTime = 0;
    a.play().catch(() => {
      /* ignore autoplay/interaction rejections */
    });
  }, [volume]);
}
