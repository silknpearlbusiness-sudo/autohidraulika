import { existsSync, writeFileSync, readdirSync, readFileSync } from "fs";

// ── Merge vercel.json headers + redirects into the Build Output config ────────
// With `vercel deploy --prebuilt`, Vercel routes ONLY from
// .vercel/output/config.json — vercel.json headers/redirects are ignored.
// Nitro doesn't emit them, so without this merge the site ships with no
// security headers and no legacy-URL redirects.
const configPath = ".vercel/output/config.json";
if (existsSync(configPath)) {
  const config = JSON.parse(readFileSync(configPath, "utf8"));
  const vercelJson = JSON.parse(readFileSync("vercel.json", "utf8"));
  const escape = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

  const redirectRoutes = (vercelJson.redirects ?? []).map((r) => ({
    src: `^${escape(r.source)}$`,
    headers: { Location: r.destination },
    status: r.permanent ? 308 : 307,
  }));

  const headerRoutes = (vercelJson.headers ?? []).map((h) => ({
    // header sources in vercel.json are already regex-like ("/(.*)")
    src: `^${h.source}$`,
    headers: Object.fromEntries(h.headers.map(({ key, value }) => [key, value])),
    continue: true,
  }));

  config.routes = [...redirectRoutes, ...headerRoutes, ...(config.routes ?? [])];
  writeFileSync(configPath, JSON.stringify(config, null, 2));
  console.log(
    `vercel-patch: merged ${redirectRoutes.length} redirects + ${headerRoutes.length} header rules into config.json`,
  );
}

const dir = ".vercel/output/functions/__server.func";

if (!existsSync(dir)) {
  console.log("vercel-patch: no .vercel/output found, skipping");
  process.exit(0);
}

const files = readdirSync(dir);
console.log("vercel-patch: func dir contains:", files.join(", "));

const entry = `${dir}/vercel.web.mjs`;
const shim = `${dir}/index.mjs`;

if (!existsSync(entry)) {
  console.log("vercel-patch: vercel.web.mjs not found, nothing to do");
  process.exit(0);
}

writeFileSync(shim, 'export { default } from "./vercel.web.mjs";\n');
console.log("vercel-patch: created index.mjs -> vercel.web.mjs");
