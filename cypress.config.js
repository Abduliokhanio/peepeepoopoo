const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    projectId: 'd711g3',
    baseUrl: 'http://localhost:3000'
  },
  component: {
    devServer: {
      framework: 'create-react-app',
      bundler: 'webpack',
    },
  },
});
