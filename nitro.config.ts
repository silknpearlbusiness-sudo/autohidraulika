import { defineNitroConfig } from "nitro/config";

export default defineNitroConfig({
  preset: "vercel",
  rollupConfig: {
    output: {
      entryFileNames: "index.mjs",
    },
  },
});
