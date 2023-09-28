import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import * as path from "path";
import viteCompression from "vite-plugin-compression";

// https://vitejs.dev/config/
export default defineConfig(({ mode = "development" }) => {
  const { APP_BASE_URL } = loadEnv(mode, process.cwd(), "APP_");

  //  JSON.stringify(env);
  return {
    server: {
      port: 5174,
      proxy: {
        "/server": {
          target: "http://127.0.0.1:3100",
          changeOrigin: true,
          rewrite: (path: string) => path.replace(/^\/server/, ""),
        },
      },
    },
    plugins: [react(), viteCompression()],
    define: { APP_BASE_URL: JSON.stringify(APP_BASE_URL) },
    resolve: {
      // 配置路径别名
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});
