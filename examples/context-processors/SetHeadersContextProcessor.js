const pathAwareContextProcessor = require('../..').contextProcessors.PathAwareContextProcessor;
const fs = require('fs').promises;
const path = require('path');

module.exports = pathAwareContextProcessor.extend({
  patterns: ['*'],
  process(executionContext, contentModel) {
    contentModel.httpHeaders = {
      testHeader: 'test'
    }
  }
});
