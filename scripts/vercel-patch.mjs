import { existsSync, writeFileSync, readdirSync } from "fs";

const dir = ".vercel/output/functions/__server.func";

if (!existsSync(dir)) {
  console.log("vercel-patch: no .vercel/output found, skipping");
  process.exit(0);
}

console.log("vercel-patch: files in func dir:", readdirSync(dir).join(", "));

const entry = `${dir}/vercel.web.mjs`;
const shim = `${dir}/index.mjs`;

if (existsSync(shim)) {
  console.log("vercel-patch: index.mjs already exists, done");
  process.exit(0);
}

if (!existsSync(entry)) {
  console.log("vercel-patch: vercel.web.mjs not found, nothing to shim");
  process.exit(0);
}

writeFileSync(shim, 'export { default } from "./vercel.web.mjs";\n');
console.log("vercel-patch: created index.mjs shim -> vercel.web.mjs");
