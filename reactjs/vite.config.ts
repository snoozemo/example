import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import * as path from "path";
import viteCompression from "vite-plugin-compression";
import { createHtmlPlugin } from "vite-plugin-html";

// https://vitejs.dev/config/
export default defineConfig(({ mode = "development" }) => {
  const env = loadEnv(mode, process.cwd());
  return {
    plugins: [
      react(),
      viteCompression(),
      createHtmlPlugin({
        inject: {
          data: {
            ...env,
            injectScript: `<script type="module" src="./env.config.js"></script>`,
          },
        },
      }),
    ],
    resolve: {
      // 配置路径别名
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});
