const pathAwareContextProcessor = require('../..').contextProcessors.PathAwareContextProcessor;

module.exports = pathAwareContextProcessor.extend({
  priority: 0,
  patterns: ['*'],
  process(executionContext, contentModel) {
    delete contentModel.config;
  }
});
