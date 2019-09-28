"use strict";

const contextProcessor = require("nova-core").pathAwareContextProcessor;

module.exports = contextProcessor.extend({
  patterns: ["/places/*"],
  priority: 10,
  process(executionContext, contentModel) {
    const dirtyInput = contentModel.place;
    if (dirtyInput) {
      contentModel.place = dirtyInput.replace(/[|&;$%@"<>()+,]/g, "");
    }
  }
});
