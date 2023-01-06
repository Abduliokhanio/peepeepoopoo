const { defineConfig } = require('cypress');

module.exports = defineConfig({
  projectId: 'd711g3',
  env: {
    PERCY_TOKEN: 'c5336ebef23a5d9ac53f7a6f30255eb10c445cd785144546eca58cc82fea8587',
    CYPRESS_RECORD_KEY: '018a4f80-d08f-450d-bfaf-7a327aedf281'
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
