import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    // This ensures Vitest's watcher will re-run tests when these files change
    include: [
      'src/index.spec.ts',
      'src/days/**/*.ts',
    ],
  },
});
