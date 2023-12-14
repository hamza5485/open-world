import { defineConfig } from 'vite';

export default defineConfig({
  base:
    process.env.NODE_ENV === 'production'
      ? 'https://hamza5485.github.io/open-world/'
      : '/',
});
