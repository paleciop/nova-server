'use strict';

const contextProcessor = require('/Users/palecio/Documents/nova/nova-core')
  .pathAwareContextProcessor;

module.exports = contextProcessor.extend({
  patterns: ['/config']
});
