import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:5173',
    supportFile: 'cypress/support/commands.ts',
    // setupNodeEvents(on, config) {
    //   // implement node event listeners here
    // },
  },
})
