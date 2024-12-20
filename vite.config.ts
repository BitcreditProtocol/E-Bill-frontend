import { defineConfig as defineViteConfig, mergeConfig } from "vite";
import { defineConfig as defineVitestConfig, configDefaults } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "path";

const viteConfig = defineViteConfig({
  plugins: [react(), {
    name: 'html-transform',
    transformIndexHtml(html) {
      if (process.env.NODE_ENV !== 'development') return html;
      if (process.env.VITE_BITCR_DEV_INCLUDE_CROWIN_IN_CONTEXT_TOOLING === 'false') return html;

      return html.replace(
        "</body>",
        `
          <script type="text/javascript">
            var _jipt = [];
            _jipt.push(['project', 'bitcredit']);
          </script>
          <script type="text/javascript" src="//cdn.crowdin.com/jipt/jipt.js"></script>
          </body>
        `,
      )
    },
  }],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  assetsInclude: ["**/*.woff2"],
});

const vitestConfig = defineVitestConfig({
  test: {
    environment: "jsdom",
    include: ["**/*.test.{ts,tsx}"],
    setupFiles: ['./vitest-setup.ts'],
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "lcov"],
      reportsDirectory: "./coverage",
    },
    exclude: [...configDefaults.exclude],
  },
});

export default mergeConfig(viteConfig, vitestConfig);
