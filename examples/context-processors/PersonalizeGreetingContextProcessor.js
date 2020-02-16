"use strict";

const pathAwareContextProcessor = require("../../lib/context-processors/pathAwareContextProcessor");
const fs = require('fs').promises;

module.exports = pathAwareContextProcessor.extend({
  priority: 70,
  patterns: ["*greeting"],
  process(executionContext, contentModel) {
    if (contentModel.user) {
      const fullName = contentModel.user.fullName || '';
      const greeting = contentModel.greeting || '';
      contentModel.personalizedGreeting = greeting.replace('{{name}}', fullName);
    }
  }
});
