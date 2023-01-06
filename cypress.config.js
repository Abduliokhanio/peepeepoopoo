const { defineConfig } = require('cypress');

module.exports = defineConfig({
  projectId: 'd711g3',
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
