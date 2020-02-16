"use strict";

const pathAwareContextProcessor = require("../../lib/context-processors/pathAwareContextProcessor");
const fs = require('fs').promises;

module.exports = pathAwareContextProcessor.extend({
  priority: 0,
  patterns: ["*"],
  process(executionContext, contentModel) {
   delete contentModel.config;
  }
});
