import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://dfir.89deg.com',
  markdown: {
    shikiConfig: {
      theme: 'github-dark',
      wrap: true
    }
  }
});
