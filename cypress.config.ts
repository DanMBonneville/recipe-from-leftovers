import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    testIsolation: false,
    baseUrl: 'http://142.93.182.169:8000/',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
