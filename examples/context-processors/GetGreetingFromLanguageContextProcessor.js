"use strict";

const pathAwareContextProcessor = require("../../lib/context-processors/pathAwareContextProcessor");
const fs = require('fs').promises;

module.exports = pathAwareContextProcessor.extend({
  priority: 80,
  patterns: ["*greeting"],
  async process(executionContext, contentModel) {
    if (contentModel.user) {
      const locale = contentModel.user.language || '';
      const greetings = JSON.parse((await fs.readFile('./examples/db/greetings.json')).toString());
      contentModel.greeting = greetings[locale];
    }
  }
});
