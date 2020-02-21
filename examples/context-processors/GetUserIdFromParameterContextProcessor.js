const pathAwareContextProcessor = require('../..').contextProcessors.PathAwareContextProcessor;
const FatalError = require('@palecio/nova-core').errors.FatalError;

module.exports = pathAwareContextProcessor.extend({
  priority: 100,
  patterns: ['*greeting'],
  process(executionContext, contentModel) {
    const requestPath = executionContext.request.path;
    const pathArray = requestPath.split('/');
    if (requestPath.split('/').length > 2) {
      contentModel.userId = pathArray.slice(-1).join();
    } else {
      throw new FatalError('No user id specified.');
    }
  }
});
