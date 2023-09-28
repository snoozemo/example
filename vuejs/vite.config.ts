import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import * as path from "path";
import viteCompression from "vite-plugin-compression";
import { createHtmlPlugin } from "vite-plugin-html";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
	const env = loadEnv(mode, process.cwd());
	return {
		plugins: [
			vue(),
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
