import { defineConfig } from 'vite';
import { configDefaults } from 'vitest/config';

export default defineConfig({
    test: {
        include: ['tests/**/*.test.ts'], // Adjust this to your test file location
        coverage: {
            provider: 'v8',
            reporter: ['text', 'json', 'lcov'],
            reportsDirectory: './coverage',
        },
    },
});