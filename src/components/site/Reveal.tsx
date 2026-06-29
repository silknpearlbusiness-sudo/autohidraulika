import { useEffect, useRef, useState, type ReactNode } from "react";

export function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  // Start fully visible (SSR-safe). IO fires after first paint to hide off-screen elements.
  const [phase, setPhase] = useState<"visible" | "hidden" | "animating">("visible");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let initial = true;

    const obs = new IntersectionObserver(
      ([e]) => {
        if (initial) {
          initial = false;
          if (e.isIntersecting) {
            obs.disconnect(); // already visible at mount, nothing to do
          } else {
            setPhase("hidden"); // below fold — hide it and wait
          }
          return;
        }
        // Scrolled into view
        if (e.isIntersecting) {
          obs.disconnect();
          if (delay > 0) {
            setTimeout(() => setPhase("animating"), delay);
          } else {
            setPhase("animating");
          }
        }
      },
      { threshold: 0, rootMargin: "0px 0px -20px 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [delay]);

  // After animation finishes, clean up will-change to free the GPU compositing layer
  useEffect(() => {
    if (phase !== "animating") return;
    const t = setTimeout(() => setPhase("visible"), 700);
    return () => clearTimeout(t);
  }, [phase]);

  let style: React.CSSProperties | undefined;
  if (phase === "hidden") {
    style = { opacity: 0, transform: "translateY(14px)", willChange: "opacity, transform" };
  } else if (phase === "animating") {
    style = {
      opacity: 1,
      transform: "translateY(0)",
      transition: "opacity 0.55s cubic-bezier(0.16,1,0.3,1), transform 0.55s cubic-bezier(0.16,1,0.3,1)",
      willChange: "opacity, transform",
    };
  }
  // "visible": style = undefined — no CSS overhead, element fully rendered

  return (
    <div ref={ref} className={className} style={style}>
      {children}
    </div>
  );
}
