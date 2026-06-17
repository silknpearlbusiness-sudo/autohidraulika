import { existsSync, writeFileSync } from "fs";

const dir = ".vercel/output/functions/__server.func";
const entry = `${dir}/vercel.web.mjs`;
const shim = `${dir}/index.mjs`;

if (existsSync(entry) && !existsSync(shim)) {
  writeFileSync(shim, 'export { default } from "./vercel.web.mjs";\n');
  console.log("vercel-patch: created index.mjs shim");
}
