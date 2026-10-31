// OpenNext adapter config for Cloudflare Workers (see wrangler.jsonc).
// Not used by "next build" or Vercel.
import { defineCloudflareConfig } from "@opennextjs/cloudflare";
import staticAssetsIncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/static-assets-incremental-cache";

export default defineCloudflareConfig({
  // Every page is prerendered at build time and the site has no ISR, so prerendered
  // pages are served read-only from Workers static assets (no R2 bucket needed).
  // `npm run cf-build` runs `opennextjs-cloudflare populateCache local` to copy the
  // prerender cache into .open-next/assets.
  incrementalCache: staticAssetsIncrementalCache,
  enableCacheInterception: true,
});
