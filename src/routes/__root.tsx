import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1, viewport-fit=cover" },
      { title: "Hidraulika Javítás | Hidraulika Service TEAM Kft." },
      { name: "description", content: "Hidraulikus szivattyúk, motorok, hengerek, orbit motorok és vezérlőblokkok szakszerű javítása. 6 hónap garancia, országos futárszolgálat. Budapest — +36 30 911 1474" },
      { name: "author", content: "Hidraulika Service TEAM Kft." },
      { name: "robots", content: "index, follow" },
      { property: "og:title", content: "Hidraulika Javítás | Hidraulika Service TEAM Kft." },
      { property: "og:description", content: "Hidraulikus szivattyúk, motorok, hengerek és vezérlőblokkok javítása. 6 hónap garancia, országos futárszolgálat." },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "hu_HU" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:title", content: "Hidraulika Javítás | Hidraulika Service TEAM Kft." },
      { name: "twitter:description", content: "Hidraulikus szivattyúk, motorok, hengerek és vezérlőblokkok javítása. 6 hónap garancia, országos futárszolgálat." },
      { property: "og:image", content: "https://www.hidraulikajavitas.com/images/workshop-1.jpg" },
      { name: "twitter:image", content: "https://www.hidraulikajavitas.com/images/workshop-1.jpg" },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Anton&family=IBM+Plex+Mono:wght@500;600;700&family=DM+Sans:wght@400;500;600;700&display=swap" },
      {
        rel: "stylesheet",
        href: appCss,
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="hu">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const [hiding, setHiding] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("cookie_consent")) {
      const t = setTimeout(() => setVisible(true), 800);
      return () => clearTimeout(t);
    }
  }, []);

  const dismiss = (value: string) => {
    setHiding(true);
    setTimeout(() => { localStorage.setItem("cookie_consent", value); setVisible(false); setHiding(false); }, 380);
  };

  if (!visible) return null;

  return (
    <>
      <style>{`
        @keyframes cookie-in  { from { opacity:0; transform:translateY(24px) } to { opacity:1; transform:translateY(0) } }
        @keyframes cookie-out { from { opacity:1; transform:translateY(0) } to { opacity:0; transform:translateY(24px) } }
      `}</style>
      <div style={{
        position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 9999,
        padding: "1rem",
        display: "flex", justifyContent: "center",
        animation: `${hiding ? "cookie-out" : "cookie-in"} 0.38s cubic-bezier(0.22,1,0.36,1) forwards`,
      }}>
        <div style={{
          background: "hsl(158 65% 5%)",
          border: "1px solid rgba(253,185,39,0.25)",
          borderRadius: "1rem",
          boxShadow: "0 -4px 60px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.04)",
          padding: "1.25rem 1.5rem",
          maxWidth: 680,
          width: "100%",
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: "1rem",
          backdropFilter: "blur(12px)",
        }}>
          <div style={{ flex: 1, minWidth: 200 }}>
            <p style={{ margin: "0 0 0.25rem", fontSize: "0.875rem", fontWeight: 600, color: "hsl(40 20% 95%)" }}>
              Süti beállítások 🍪
            </p>
            <p style={{ margin: 0, fontSize: "0.8rem", color: "hsl(158 16% 55%)", lineHeight: 1.6 }}>
              Weboldalunk sütiket használ a jobb élmény érdekében.{" "}
              <a href="/suti-szabalyzat" style={{ color: "hsl(43 98% 62%)", textDecoration: "underline" }}>
                Süti szabályzat
              </a>
            </p>
          </div>
          <div style={{ display: "flex", gap: "0.625rem", flexShrink: 0 }}>
            <button onClick={() => dismiss("declined")} style={{
              height: "2.5rem", padding: "0 1.25rem", borderRadius: "2rem",
              border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.04)",
              color: "hsl(158 16% 55%)", fontSize: "0.8rem", fontWeight: 600, cursor: "pointer",
              transition: "border-color 0.2s, color 0.2s",
            }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.22)"; e.currentTarget.style.color = "hsl(40 20% 90%)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; e.currentTarget.style.color = "hsl(158 16% 55%)"; }}>
              Csak szükséges
            </button>
            <button onClick={() => dismiss("accepted")} style={{
              height: "2.5rem", padding: "0 1.25rem", borderRadius: "2rem",
              border: "none", background: "hsl(43 98% 54%)",
              color: "#04140d", fontSize: "0.8rem", fontWeight: 700, cursor: "pointer",
              transition: "filter 0.2s",
            }}
              onMouseEnter={(e) => { e.currentTarget.style.filter = "brightness(1.12)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.filter = "brightness(1)"; }}>
              Elfogadom
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
      <CookieBanner />
    </QueryClientProvider>
  );
}
