"use strict";

const pathAwareContextProcessor = require("../../lib/context-processors/pathAwareContextProcessor");

module.exports = pathAwareContextProcessor.extend({
  priority: 0,
  patterns: ["*"],
  process(executionContext, contentModel) {
   delete contentModel.statistics;
  }
});
