const { defineConfig } = require('cypress');

module.exports = defineConfig({
  projectId: 'd711g3',
  env: {
    PERCY_TOKEN: Cypress.env('percy_token'),
    CYPRESS_RECORD_KEY: Cypress.env('cypress_record_key')
  },
  e2e: {
    baseUrl: 'http://localhost:3000'
  },
  component: {
    devServer: {
      framework: 'create-react-app',
      bundler: 'webpack',
    },
  },
});
