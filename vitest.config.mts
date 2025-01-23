// eslint-disable-next-line import/no-extraneous-dependencies
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    env: {
      // Vitest by defaults run with colors off so we need to enable this in order to ensure
      // that our colorization work functions as expected.
      FORCE_COLOR: '1',
    },
    exclude: ['**/node_modules/**', '**/coverage/**', '**/lib/**'],
  },
});
