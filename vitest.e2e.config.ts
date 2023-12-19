import { defineConfig } from "vitest/config";
import tsConfigPaths from "vite-tsconfig-paths";

export default defineConfig({
	plugins: [tsConfigPaths()],
	test: {
		globals: true,
		include: ["**/*.e2e.{spec,test}.ts"],
		setupFiles: ["src/test/e2e/vitest.e2e.setup.ts"],
	},
});
