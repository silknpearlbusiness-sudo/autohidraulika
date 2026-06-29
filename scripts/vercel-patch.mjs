import { existsSync, writeFileSync, readdirSync } from "fs";

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
