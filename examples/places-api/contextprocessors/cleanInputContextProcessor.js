'use strict';

const contextProcessor = require('/Users/palecio/Documents/nova/nova-core')
  .pathAwareContextProcessor;

module.exports = contextProcessor.extend({
  patterns: ['/places/*'],
  priority: 90,
  process(executionContext, contentModel) {
    const dirtyInput = contentModel.place;
    if (dirtyInput) {
      contentModel.place = dirtyInput.replace(/[|&;$%@"<>()+,]/g, '');
    }
  }
});
