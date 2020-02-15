"use strict";

const contextProcessor = require("nova-core").pathAwareContextProcessor;

module.exports = contextProcessor.extend({
  patterns: ["/places/*"],
  priority: 10,
  process(executionContext, contentModel) {
    throw new Error('Everything is fucked!');
  }
});
