import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    testIsolation: false,
    baseUrl: 'https://danmbonneville.com/',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
