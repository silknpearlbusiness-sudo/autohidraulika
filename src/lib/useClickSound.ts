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
    a.preload = "none";
    a.volume = volume;
    baseRef.current = a;

    // Preload on first user touch/click so the file is cached before the first button click
    const warm = () => {
      a.preload = "auto";
      a.load();
      document.removeEventListener("touchstart", warm, { capture: true });
      document.removeEventListener("mousedown", warm, { capture: true });
    };
    document.addEventListener("touchstart", warm, { capture: true, once: true, passive: true });
    document.addEventListener("mousedown", warm, { capture: true, once: true });
    return () => {
      document.removeEventListener("touchstart", warm, { capture: true });
      document.removeEventListener("mousedown", warm, { capture: true });
    };
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
