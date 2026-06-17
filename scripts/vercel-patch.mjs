import { existsSync, mkdirSync, writeFileSync, cpSync } from "fs";

const out = ".vercel/output";
const funcDir = `${out}/functions/__server.func`;
const staticDir = `${out}/static`;

if (!existsSync("dist/server/server.js")) {
  console.log("vercel-patch: dist/server/server.js not found, skipping");
  process.exit(0);
}

mkdirSync(funcDir, { recursive: true });
mkdirSync(staticDir, { recursive: true });

// Static: client assets + public
if (existsSync("dist/client")) {
  cpSync("dist/client", staticDir, { recursive: true });
  console.log("vercel-patch: copied dist/client -> static");
}
if (existsSync("public")) {
  cpSync("public", staticDir, { recursive: true });
  console.log("vercel-patch: copied public -> static");
}

// Function: entire server bundle
cpSync("dist/server", funcDir, { recursive: true });
console.log("vercel-patch: copied dist/server -> function");

// Entry point - re-export the fetch handler as default
writeFileSync(`${funcDir}/index.mjs`,
  'export { default } from "./server.js";\n'
);

// Function config
writeFileSync(`${funcDir}/.vc-config.json`, JSON.stringify({
  handler: "index.mjs",
  launcherType: "Nodejs",
  shouldAddHelpers: false,
  supportsResponseStreaming: true,
  runtime: "nodejs20.x"
}, null, 2));

// Routing config
writeFileSync(`${out}/config.json`, JSON.stringify({
  version: 3,
  routes: [
    {
      src: "/assets/(.*)",
      headers: { "cache-control": "public, max-age=31536000, immutable" },
      continue: true
    },
    { handle: "filesystem" },
    { src: "/(.*)", dest: "/__server" }
  ]
}, null, 2));

console.log("vercel-patch: Vercel Build Output API structure created");
