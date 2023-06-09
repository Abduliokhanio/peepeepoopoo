const { defineConfig } = require('cypress');

module.exports = defineConfig({
  projectId: 'd711g3',
  e2e: {
    baseUrl: 'http://localhost:3000',
    setupNodeEvents(on, config) {
      config.env = process.env;
      return config;
    }
  },
  component: {
    devServer: {
      framework: 'create-react-app',
      bundler: 'webpack',
    },
  },
});
