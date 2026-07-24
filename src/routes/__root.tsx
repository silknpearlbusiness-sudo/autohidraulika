import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  useRouterState,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { getConsent, setConsent, type ConsentChoice } from "../lib/consent";
import { GTM_CONTAINER_ID, CONSENT_STORAGE_KEY, updateConsent } from "../lib/gtm";

// Runs before gtm.js loads (see the `scripts` head entries below) so Consent
// Mode's default state is in place the instant GTM initializes. Reads
// localStorage directly (can't import consent.ts — this executes before any
// app module does) so a returning visitor who already made per-category
// choices doesn't get briefly defaulted to denied.
const CONSENT_DEFAULT_SCRIPT = `(function(){
  window.dataLayer = window.dataLayer || [];
  function gtag(){ window.dataLayer.push(arguments); }
  window.gtag = gtag;
  var analyticsState = 'denied';
  var marketingState = 'denied';
  try {
    var raw = localStorage.getItem('${CONSENT_STORAGE_KEY}');
    if (raw) {
      var parsed = JSON.parse(raw);
      if (parsed && typeof parsed === 'object') {
        analyticsState = parsed.analytics ? 'granted' : 'denied';
        marketingState = parsed.marketing ? 'granted' : 'denied';
      }
    }
  } catch (e) {}
  gtag('consent', 'default', {
    ad_storage: marketingState,
    analytics_storage: analyticsState,
    ad_user_data: marketingState,
    ad_personalization: marketingState,
    wait_for_update: 500
  });
})();`;

// Standard GTM install snippet — loads unconditionally on every page, same
// as Google's own instructions. Consent Mode (above) is what actually keeps
// this GDPR-compliant, not gating the script itself.
const GTM_SNIPPET = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_CONTAINER_ID}');`;

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
      // Fonts are self-hosted via @fontsource imports in styles.css —
      // no request (and no visitor IP) ever goes to Google's font servers.
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      { rel: "icon", type: "image/png", sizes: "32x32", href: "/favicon-32.png" },
      { rel: "icon", type: "image/png", sizes: "48x48", href: "/favicon-48.png" },
      { rel: "apple-touch-icon", sizes: "180x180", href: "/apple-touch-icon.png" },
    ],
    // Order matters: Consent Mode's default must run before gtm.js so GTM
    // picks it up on initialization.
    scripts: [
      { children: CONSENT_DEFAULT_SCRIPT },
      { children: GTM_SNIPPET },
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
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_CONTAINER_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
            title="gtm"
          />
        </noscript>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

const COOKIE_ORANGE = "#FDB927";

function ConsentToggle({
  label, hint, checked, onChange, disabled,
}: { label: string; hint: string; checked: boolean; onChange?: (v: boolean) => void; disabled?: boolean }) {
  return (
    <label style={{
      display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1rem",
      padding: "0.55rem 0", cursor: disabled ? "default" : "pointer",
    }}>
      <span>
        <span style={{ display: "block", fontSize: "0.8rem", fontWeight: 700, color: "hsl(40 20% 92%)" }}>{label}</span>
        <span style={{ display: "block", fontSize: "0.72rem", color: "hsl(158 16% 50%)", marginTop: "0.1rem" }}>{hint}</span>
      </span>
      <input
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={(e) => onChange?.(e.target.checked)}
        style={{ width: 20, height: 20, flexShrink: 0, accentColor: COOKIE_ORANGE, cursor: disabled ? "default" : "pointer", opacity: disabled ? 0.55 : 1 }}
      />
    </label>
  );
}

function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const [hiding, setHiding] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [functional, setFunctional] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  useEffect(() => {
    if (!getConsent()) {
      const t = setTimeout(() => setVisible(true), 800);
      return () => clearTimeout(t);
    }
  }, []);

  const save = (choice: ConsentChoice) => {
    setHiding(true);
    setTimeout(() => {
      setConsent(choice);
      updateConsent(choice);
      setVisible(false);
      setHiding(false);
    }, 380);
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
        padding: "0.75rem",
        paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))",
        display: "flex", justifyContent: "center",
        animation: `${hiding ? "cookie-out" : "cookie-in"} 0.38s cubic-bezier(0.22,1,0.36,1) forwards`,
      }}>
        <div style={{
          background: "hsl(158 65% 5%)",
          border: "1px solid rgba(253,185,39,0.25)",
          borderRadius: "1.1rem",
          boxShadow: "0 -4px 60px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.04)",
          padding: "1.1rem 1.25rem",
          maxWidth: 460,
          width: "100%",
          backdropFilter: "blur(12px)",
        }}>
          <p style={{ margin: "0 0 0.3rem", fontSize: "0.875rem", fontWeight: 700, color: "hsl(40 20% 95%)" }}>
            Süti beállítások 🍪
          </p>
          <p style={{ margin: 0, fontSize: "0.8rem", color: "hsl(158 16% 55%)", lineHeight: 1.55 }}>
            A Google Térkép, a Google Analytics és a Google Ads csak az Ön hozzájárulásával helyeznek el sütiket, kategóriánként választhat.{" "}
            <a href="/suti-szabalyzat" style={{ color: "hsl(43 98% 62%)", textDecoration: "underline" }}>
              Süti szabályzat
            </a>
          </p>

          {expanded && (
            <div style={{ marginTop: "0.75rem", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
              <ConsentToggle label="Szükséges" hint="Munkamenet és a süti-hozzájárulási döntés tárolása. Mindig aktív." checked disabled />
              <ConsentToggle label="Funkcionális" hint="Beágyazott Google Térkép." checked={functional} onChange={setFunctional} />
              <ConsentToggle label="Analitikai" hint="Google Analytics — látogatottságmérés." checked={analytics} onChange={setAnalytics} />
              <ConsentToggle label="Marketing" hint="Google Ads — hirdetéseink hatékonyságának mérése." checked={marketing} onChange={setMarketing} />
            </div>
          )}

          <div className="flex flex-wrap" style={{ gap: "0.625rem", marginTop: "1rem" }}>
            <button onClick={() => save({ functional: false, analytics: false, marketing: false })} className="flex-1" style={{
              height: "2.6rem", padding: "0 1.1rem", borderRadius: "2rem",
              border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.04)",
              color: "hsl(158 16% 55%)", fontSize: "0.8rem", fontWeight: 600, cursor: "pointer",
              whiteSpace: "nowrap",
              transition: "border-color 0.2s, color 0.2s",
            }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.22)"; e.currentTarget.style.color = "hsl(40 20% 90%)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; e.currentTarget.style.color = "hsl(158 16% 55%)"; }}>
              Csak szükséges
            </button>
            {!expanded ? (
              <button onClick={() => setExpanded(true)} className="flex-1" style={{
                height: "2.6rem", padding: "0 1.1rem", borderRadius: "2rem",
                border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.04)",
                color: "hsl(158 16% 55%)", fontSize: "0.8rem", fontWeight: 600, cursor: "pointer",
                whiteSpace: "nowrap",
                transition: "border-color 0.2s, color 0.2s",
              }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.22)"; e.currentTarget.style.color = "hsl(40 20% 90%)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; e.currentTarget.style.color = "hsl(158 16% 55%)"; }}>
                Testreszabás
              </button>
            ) : (
              <button onClick={() => save({ functional, analytics, marketing })} className="flex-1" style={{
                height: "2.6rem", padding: "0 1.1rem", borderRadius: "2rem",
                border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.04)",
                color: "hsl(158 16% 55%)", fontSize: "0.8rem", fontWeight: 600, cursor: "pointer",
                whiteSpace: "nowrap",
                transition: "border-color 0.2s, color 0.2s",
              }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.22)"; e.currentTarget.style.color = "hsl(40 20% 90%)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; e.currentTarget.style.color = "hsl(158 16% 55%)"; }}>
                Kiválasztás mentése
              </button>
            )}
            <button onClick={() => save({ functional: true, analytics: true, marketing: true })} className="flex-1" style={{
              height: "2.6rem", padding: "0 1.25rem", borderRadius: "2rem",
              border: "none", background: "hsl(43 98% 54%)",
              color: "#04140d", fontSize: "0.8rem", fontWeight: 700, cursor: "pointer",
              whiteSpace: "nowrap",
              transition: "filter 0.2s",
            }}
              onMouseEnter={(e) => { e.currentTarget.style.filter = "brightness(1.12)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.filter = "brightness(1)"; }}>
              Összes elfogadása
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const isAdmin = useRouterState({ select: (s) => s.location.pathname.startsWith("/admin") });

  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
      {!isAdmin && <CookieBanner />}
    </QueryClientProvider>
  );
}
