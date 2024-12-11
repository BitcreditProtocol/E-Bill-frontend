import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { configDefaults } from "vitest/config";
import path from "path";

export default defineConfig({
  plugins: [react(), {
    name: 'html-transform',
    transformIndexHtml(html) {
      if (process.env.NODE_ENV !== 'development') return html;

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
