'use strict';

const contextProcessor = require('nova-core')
  .pathAwareContextProcessor;

module.exports = contextProcessor.extend({
  patterns: ['/places/*/:place'],
  priority: 100,
  process(executionContext, contentModel) {
    const placeParam =  executionContext.match && executionContext.match.pathParams && executionContext.match.pathParams.place;
    console.log(placeParam)
    if (!contentModel.place && placeParam) {
      contentModel.place = placeParam;
    }
  }
});
