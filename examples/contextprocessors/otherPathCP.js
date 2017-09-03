'use strict';

const contextProcessor = require('/Users/palecio/Documents/nova/nova-core')
  .pathAwareContextProcessor;

module.exports = contextProcessor.extend({
  patterns: ['/document/*', '/docs/testname'],
  name: 'Other Path Context Processor',
  process(executionContext, contentModel) {
    contentModel.test2 = 'Path CP Property2';
  }
});
