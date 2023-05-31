const { defineConfig } = require("cypress");

module.exports = defineConfig({
  env: {
    apiUrl: "https://api.mailslurp.com",
    MAILSLURP_API_KEY:
      "8bc606f742427178c2bcc7aad3fc483a2e8f88e4881bc3b3f4ed1502f419ce43",
  },
  e2e: {
    defaultCommandTimeout: 40000,
    responseTimeout: 40000,
    requestTimeout: 40000,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
