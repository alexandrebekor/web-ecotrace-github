import { configDefaults, defineConfig } from 'vitest/config'
import tsConfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
	plugins: [tsConfigPaths()],
	test: {
		exclude: [...configDefaults.exclude, '**/build/**']
	}
})