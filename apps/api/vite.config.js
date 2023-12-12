import { defineConfig } from 'vitest/config'
import tsConfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
	plugins: [tsConfigPaths()],
	test: {
		dir: 'src',
		coverage: {
			enabled: true,
			reporter: ['html'],
			include: ['src/**/*.ts']
		},
		testTimeout: 10000
	}
})