import react from "@vitejs/plugin-react";
import { defineConfig, externalizeDepsPlugin } from "electron-vite";
import { resolve } from "node:path";
import tailwindcss from "tailwindcss";
import tsconfigPathsPlugin from "vite-tsconfig-paths";

const tsconfigPath = tsconfigPathsPlugin({
  projects: [resolve("tsconfig.json")],
});

export default defineConfig({
  main: {
    plugins: [tsconfigPath, externalizeDepsPlugin()],
    publicDir: resolve("resources"),
  },
  preload: {
    plugins: [tsconfigPath, externalizeDepsPlugin()],
  },
  renderer: {
    define: {
      "process.platform": JSON.stringify(process.platform),
    },
    css: {
      postcss: {
        plugins: [
          tailwindcss({
            config: resolve(__dirname, "src", "renderer", "tailwind.config.js"),
          }),
        ],
      },
    },
    resolve: {
      alias: {
        "@renderer": resolve("src/renderer/src"),
      },
    },
    plugins: [tsconfigPath, react()],
  },
});
