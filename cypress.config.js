const { fetchProfile, getCurrentSession } = require("./cypress/plugins/tasks");
const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: "d711g3",

  e2e: {
    setupNodeEvents(on, config) {
      on("task", {
        fetchProfile,
        getCurrentSession,
      });

      return config;
    },
  },

  component: {
    devServer: {
      framework: "create-react-app",
      bundler: "webpack",
    },
  },
});
