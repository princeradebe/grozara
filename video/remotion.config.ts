import path from "node:path";

import { Config } from "@remotion/cli/config";
import { enableTailwind } from "@remotion/tailwind-v4";

const here = (p: string) => path.resolve(process.cwd(), p);

Config.setVideoImageFormat("jpeg");
Config.setJpegQuality(92);

// The video renders the site's own components, so `@/` points into the site, Next-only imports get
// shims, and React is pinned to this project's copy (two Reacts would break hooks).
Config.overrideWebpackConfig((current) => {
  const config = enableTailwind(current);
  return {
    ...config,
    resolve: {
      ...config.resolve,
      alias: {
        ...(config.resolve?.alias as Record<string, string>),
        "@": here("../src"),
        "next/image": here("src/shims/next-image.tsx"),
        "next/link": here("src/shims/next-link.tsx"),
        react: here("node_modules/react"),
        "react-dom": here("node_modules/react-dom"),
      },
    },
  };
});
