'use strict';

const contextProcessor = require('/Users/palecio/Documents/nova/nova-core').pathAwareContextProcessor;

module.exports = contextProcessor.extend({
  patterns: ["/api/document/*", "/api/docs/testname"],
  name: 'Other Path Context Processor',
  process (executionContext, contentModel) {
    console.log('Execution Context:', executionContext);
    contentModel.test2 = 'Path CP Property2';
  }
});