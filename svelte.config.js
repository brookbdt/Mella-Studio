import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {

	preprocess: vitePreprocess(),

	kit: {

		adapter: adapter(),
		// vite: {
		// 	optimizeDeps: {
		// 		include: ['lodash.get', 'lodash.isequal', 'lodash.clonedeep']

		// 		// plugins: []
		// 	}
		// }
	}
};

export default config;
