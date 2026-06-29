import { Q as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { Q as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
import { c as createRouter, a as createRootRouteWithContext, u as useRouter, L as Link, O as Outlet, H as HeadContent, S as Scripts, b as createFileRoute, l as lazyRouteComponent } from "../_libs/tanstack__react-router.mjs";
import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
const appCss = "/assets/styles-D3LaEvLM.css";
function reportLovableError(error, context = {}) {
  if (typeof window === "undefined") return;
  window.__lovableEvents?.captureException?.(
    error,
    {
      source: "react_error_boundary",
      route: window.location.pathname,
      ...context
    },
    {
      mechanism: "react_error_boundary",
      handled: false,
      severity: "error"
    }
  );
}
function NotFoundComponent() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-7xl font-bold text-foreground", children: "404" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-4 text-xl font-semibold text-foreground", children: "Page not found" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "The page you're looking for doesn't exist or has been moved." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      Link,
      {
        to: "/",
        className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
        children: "Go home"
      }
    ) })
  ] }) });
}
function ErrorComponent({ error, reset }) {
  console.error(error);
  const router = useRouter();
  reactExports.useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-semibold tracking-tight text-foreground", children: "This page didn't load" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "Something went wrong on our end. You can try refreshing or head back home." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex flex-wrap justify-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: () => {
            router.invalidate();
            reset();
          },
          className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
          children: "Try again"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "a",
        {
          href: "/",
          className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
          children: "Go home"
        }
      )
    ] })
  ] }) });
}
const Route$8 = createRootRouteWithContext()({
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
      { name: "twitter:image", content: "https://www.hidraulikajavitas.com/images/workshop-1.jpg" }
    ],
    links: [
      { rel: "preload", href: "/sounds/click.mp3", as: "audio" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&family=Poppins:wght@700;900&display=optional" },
      {
        rel: "stylesheet",
        href: appCss
      }
    ]
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent
});
function RootShell({ children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("html", { lang: "hu", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("head", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(HeadContent, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("body", { children: [
      children,
      /* @__PURE__ */ jsxRuntimeExports.jsx(Scripts, {})
    ] })
  ] });
}
function CookieBanner() {
  const [visible, setVisible] = reactExports.useState(false);
  const [hiding, setHiding] = reactExports.useState(false);
  reactExports.useEffect(() => {
    if (!localStorage.getItem("cookie_consent")) {
      const t = setTimeout(() => setVisible(true), 800);
      return () => clearTimeout(t);
    }
  }, []);
  const dismiss = (value) => {
    setHiding(true);
    setTimeout(() => {
      localStorage.setItem("cookie_consent", value);
      setVisible(false);
      setHiding(false);
    }, 380);
  };
  if (!visible) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("style", { children: `
        @keyframes cookie-in  { from { opacity:0; transform:translateY(24px) } to { opacity:1; transform:translateY(0) } }
        @keyframes cookie-out { from { opacity:1; transform:translateY(0) } to { opacity:0; transform:translateY(24px) } }
      ` }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
      position: "fixed",
      bottom: 0,
      left: 0,
      right: 0,
      zIndex: 9999,
      padding: "1rem",
      display: "flex",
      justifyContent: "center",
      animation: `${hiding ? "cookie-out" : "cookie-in"} 0.38s cubic-bezier(0.22,1,0.36,1) forwards`
    }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
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
      backdropFilter: "blur(12px)"
    }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { flex: 1, minWidth: 200 }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { margin: "0 0 0.25rem", fontSize: "0.875rem", fontWeight: 600, color: "hsl(40 20% 95%)" }, children: "Süti beállítások 🍪" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { style: { margin: 0, fontSize: "0.8rem", color: "hsl(158 16% 55%)", lineHeight: 1.6 }, children: [
          "Weboldalunk sütiket használ a jobb élmény érdekében.",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "/suti-szabalyzat", style: { color: "hsl(43 98% 62%)", textDecoration: "underline" }, children: "Süti szabályzat" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", gap: "0.625rem", flexShrink: 0 }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: () => dismiss("declined"),
            style: {
              height: "2.5rem",
              padding: "0 1.25rem",
              borderRadius: "2rem",
              border: "1px solid rgba(255,255,255,0.1)",
              background: "rgba(255,255,255,0.04)",
              color: "hsl(158 16% 55%)",
              fontSize: "0.8rem",
              fontWeight: 600,
              cursor: "pointer",
              transition: "border-color 0.2s, color 0.2s"
            },
            onMouseEnter: (e) => {
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.22)";
              e.currentTarget.style.color = "hsl(40 20% 90%)";
            },
            onMouseLeave: (e) => {
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
              e.currentTarget.style.color = "hsl(158 16% 55%)";
            },
            children: "Csak szükséges"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: () => dismiss("accepted"),
            style: {
              height: "2.5rem",
              padding: "0 1.25rem",
              borderRadius: "2rem",
              border: "none",
              background: "hsl(43 98% 54%)",
              color: "#04140d",
              fontSize: "0.8rem",
              fontWeight: 700,
              cursor: "pointer",
              transition: "filter 0.2s"
            },
            onMouseEnter: (e) => {
              e.currentTarget.style.filter = "brightness(1.12)";
            },
            onMouseLeave: (e) => {
              e.currentTarget.style.filter = "brightness(1)";
            },
            children: "Elfogadom"
          }
        )
      ] })
    ] }) })
  ] });
}
function RootComponent() {
  const { queryClient } = Route$8.useRouteContext();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(QueryClientProvider, { client: queryClient, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(CookieBanner, {})
  ] });
}
const $$splitComponentImporter$7 = () => import("./suti-szabalyzat-D9UOpLtK.mjs");
const Route$7 = createFileRoute("/suti-szabalyzat")({
  head: () => ({
    meta: [{
      title: "Süti kezelési szabályzat | Hidraulika Service TEAM Kft."
    }, {
      name: "description",
      content: "A hidraulikajavitas.com weboldalon alkalmazott sütik (cookie-k) kezelésére vonatkozó tájékoztató."
    }, {
      name: "robots",
      content: "index, follow"
    }],
    links: [{
      rel: "canonical",
      href: "https://www.hidraulikajavitas.com/suti-szabalyzat"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
const $$splitComponentImporter$6 = () => import("./koszonjuk-B31FyFix.mjs");
const Route$6 = createFileRoute("/koszonjuk")({
  head: () => ({
    meta: [{
      title: "Köszönjük megkeresését | Hidraulika Service TEAM Kft."
    }, {
      name: "robots",
      content: "noindex, nofollow"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
const $$splitComponentImporter$5 = () => import("./impresszum-B1K4Uw8r.mjs");
const Route$5 = createFileRoute("/impresszum")({
  head: () => ({
    meta: [{
      title: "Impresszum | Hidraulika Service TEAM Kft."
    }, {
      name: "description",
      content: "A hidraulikajavitas.com weboldal üzemeltetőjének és tárhelyszolgáltatójának adatai."
    }, {
      name: "robots",
      content: "index, follow"
    }],
    links: [{
      rel: "canonical",
      href: "https://www.hidraulikajavitas.com/impresszum"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
const $$splitComponentImporter$4 = () => import("./hidraulika-szivattyu-hidromotor-munkahenger-CGA2vzd4.mjs");
const Route$4 = createFileRoute("/hidraulika-szivattyu-hidromotor-munkahenger")({
  head: () => ({
    meta: [{
      title: "Hidraulika Szivattyú, Hidromotor, Hidraulikus Munkahenger | hidraulikajavitas.com"
    }, {
      name: "description",
      content: "Minden, amit a hidraulika szivattyúkról, hidromotorokról és hidraulikus munkahengerekről tudni érdemes. Típusok, alkalmazások, karbantartás és szakszerű javítás."
    }, {
      name: "robots",
      content: "index, follow"
    }],
    links: [{
      rel: "canonical",
      href: "https://www.hidraulikajavitas.com/hidraulika-szivattyu-hidromotor-munkahenger"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
const $$splitComponentImporter$3 = () => import("./hidraulika-hiba-BVM5DHzQ.mjs");
const Route$3 = createFileRoute("/hidraulika-hiba")({
  head: () => ({
    meta: [{
      title: "Hidraulika Szivattyú Hiba, Hidromotor Hiba, Munkahenger Hiba | Hidraulika Service TEAM Kft."
    }, {
      name: "description",
      content: "Felismerte a hidraulika hibáit? Hidraulika szivattyú hiba, hidromotor hiba vagy hidraulikus munkahenger hiba esetén hívja szakértő csapatunkat! ☎ +36 30 911 1474"
    }, {
      name: "robots",
      content: "index, follow"
    }],
    links: [{
      rel: "canonical",
      href: "https://www.hidraulikajavitas.com/hidraulika-hiba"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
const $$splitComponentImporter$2 = () => import("./aszf-DxkjEuCl.mjs");
const Route$2 = createFileRoute("/aszf")({
  head: () => ({
    meta: [{
      title: "Általános Szerződési Feltételek | Hidraulika Service TEAM Kft."
    }, {
      name: "description",
      content: "A Hidraulika Service TEAM Kft. általános szerződési feltételei — hidraulika javítási és futárszolgáltatáshoz kapcsolódó feltételek."
    }, {
      name: "robots",
      content: "index, follow"
    }],
    links: [{
      rel: "canonical",
      href: "https://www.hidraulikajavitas.com/aszf"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
const $$splitComponentImporter$1 = () => import("./adatkezeles-Ci7OPv0Y.mjs");
const Route$1 = createFileRoute("/adatkezeles")({
  head: () => ({
    meta: [{
      title: "Adatkezelési tájékoztató | Hidraulika Service TEAM Kft."
    }, {
      name: "description",
      content: "A Hidraulika Service TEAM Kft. adatkezelési tájékoztatója — GDPR megfelelő adatvédelmi szabályzat."
    }, {
      name: "robots",
      content: "index, follow"
    }],
    links: [{
      rel: "canonical",
      href: "https://www.hidraulikajavitas.com/adatkezeles"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
const $$splitComponentImporter = () => import("./index-Bd9pJILA.mjs");
const Route = createFileRoute("/")({
  head: () => ({
    meta: [{
      title: "Hidraulika Javítás Budapest | Szivattyú, Motor, Henger Felújítás — 6 Hónap Garancia"
    }, {
      name: "description",
      content: "Hidraulika javítás Budapesten és országosan: hidraulikus szivattyúk, motorok, hengerek, orbit motorok és vezérlőblokkok szakszerű felújítása. Márkafüggetlen szerviz, 24–48 órás átfutás, 6 hónap garancia, ingyenes országos futárszolgálat. Hívjon: +36 30 911 1474"
    }, {
      name: "keywords",
      content: "hidraulika javítás, hidraulika javítás Budapest, hidraulikus szivattyú javítás, hidraulikus motor javítás, hidraulikus henger javítás, hidraulika henger felújítás, orbit motor javítás, vezérlőblokk javítás, hidraulika szerviz, hidraulika felújítás, munkagép hidraulika javítás, kotrógép hidraulika, dugattyús szivattyú javítás, fogaskerék szivattyú, axiális motor, márkafüggetlen hidraulika szerviz, Bosch Rexroth javítás, Komatsu hidraulika, Caterpillar hidraulika, Parker szivattyú"
    }, {
      name: "robots",
      content: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
    }, {
      name: "author",
      content: "Hidraulika Service TEAM Kft."
    }, {
      name: "language",
      content: "Hungarian"
    }, {
      name: "geo.region",
      content: "HU-BU"
    }, {
      name: "geo.placename",
      content: "Budapest"
    }, {
      name: "geo.position",
      content: "47.4669;19.0744"
    }, {
      name: "ICBM",
      content: "47.4669, 19.0744"
    }, {
      property: "og:title",
      content: "Hidraulika Javítás Budapest | Hidraulika Service TEAM Kft."
    }, {
      property: "og:description",
      content: "Hidraulikus szivattyúk, motorok, hengerek, orbit motorok és vezérlőblokkok márkafüggetlen javítása. 24–48 órás átfutás, 6 hónap garancia, ingyenes országos futárszolgálat."
    }, {
      property: "og:type",
      content: "website"
    }, {
      property: "og:url",
      content: "https://www.hidraulikajavitas.com/"
    }, {
      property: "og:site_name",
      content: "Hidraulika Service TEAM Kft."
    }, {
      property: "og:locale",
      content: "hu_HU"
    }, {
      name: "twitter:card",
      content: "summary_large_image"
    }, {
      name: "twitter:title",
      content: "Hidraulika Javítás Budapest | Hidraulika Service TEAM Kft."
    }, {
      name: "twitter:description",
      content: "Márkafüggetlen hidraulika szerviz — szivattyú, motor, henger, vezérlőblokk. 6 hónap garancia, országos futár."
    }],
    links: [{
      rel: "canonical",
      href: "https://www.hidraulikajavitas.com/"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter, "component")
});
const SutiSzabalyzatRoute = Route$7.update({
  id: "/suti-szabalyzat",
  path: "/suti-szabalyzat",
  getParentRoute: () => Route$8
});
const KoszonjukRoute = Route$6.update({
  id: "/koszonjuk",
  path: "/koszonjuk",
  getParentRoute: () => Route$8
});
const ImpresszumRoute = Route$5.update({
  id: "/impresszum",
  path: "/impresszum",
  getParentRoute: () => Route$8
});
const HidraulikaSzivattyuHidromotorMunkahengerRoute = Route$4.update({
  id: "/hidraulika-szivattyu-hidromotor-munkahenger",
  path: "/hidraulika-szivattyu-hidromotor-munkahenger",
  getParentRoute: () => Route$8
});
const HidraulikaHibaRoute = Route$3.update({
  id: "/hidraulika-hiba",
  path: "/hidraulika-hiba",
  getParentRoute: () => Route$8
});
const AszfRoute = Route$2.update({
  id: "/aszf",
  path: "/aszf",
  getParentRoute: () => Route$8
});
const AdatkezelesRoute = Route$1.update({
  id: "/adatkezeles",
  path: "/adatkezeles",
  getParentRoute: () => Route$8
});
const IndexRoute = Route.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$8
});
const rootRouteChildren = {
  IndexRoute,
  AdatkezelesRoute,
  AszfRoute,
  HidraulikaHibaRoute,
  HidraulikaSzivattyuHidromotorMunkahengerRoute,
  ImpresszumRoute,
  KoszonjukRoute,
  SutiSzabalyzatRoute
};
const routeTree = Route$8._addFileChildren(rootRouteChildren)._addFileTypes();
const getRouter = () => {
  const queryClient = new QueryClient();
  const router = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0
  });
  return router;
};
export {
  getRouter
};
