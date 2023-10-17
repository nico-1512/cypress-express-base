const { defineConfig } = require("cypress");
const { configurePlugin } = require('cypress-mongodb');

module.exports = defineConfig({
  env: {
    mongodb: {
      uri: 'mongodb://admin:admin@localhost:27017',
      database: 'users',
      collection: 'users'
    }
  },

  e2e: {
    baseUrl: 'http://localhost:4000',
    setupNodeEvents(on, config) {
      configurePlugin(on);
      // implement node event listeners here
    },
  },
});
