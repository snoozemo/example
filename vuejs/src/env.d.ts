/// <reference types="vite/client" />

declare module "*.vue" {
	import type { DefineComponent } from "vue";
	// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
	// rome-ignore lint/suspicious/noExplicitAny: <explanation>
	const component: DefineComponent<{}, {}, any>;
	export default component;
}
export declare global {
	interface Window {
		_app_base_url?: string;
	}
}
