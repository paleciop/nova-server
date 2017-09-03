'use strict';

const contextProcessor = require('/Users/palecio/Documents/nova/nova-core').pathAwareContextProcessor;

module.exports = contextProcessor.extend({
  patterns: ["/document/*", "/docs/:name"],
  name: 'Path Context Processor',
  process (executionContext, contentModel) {
    console.log('Execution Context:', executionContext);
    contentModel.test = 'Path CP Property';
    contentModel.match = executionContext.match;
  }
});