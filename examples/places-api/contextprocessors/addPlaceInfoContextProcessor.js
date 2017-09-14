'use strict';

const http = require('axios');
const contextProcessor = require('/Users/palecio/Documents/nova/nova-core')
  .pathAwareContextProcessor;

const cache = {};

module.exports = contextProcessor.extend({
  patterns: ['/places/info/*', '/places/info', '/places/everything', '/places/everything/*'],
  process(executionContext, contentModel) {
    const config = contentModel.config;
    const appId = config.wolframAlphaAPPId;
    const baseUrl = config.wolframAlphaBaseUrl;
    const place = contentModel.place;
    if (appId && baseUrl && place) {
      const url = `${baseUrl}?appid=${appId}&input=${place}&output=json`;
      if (cache[url]) {
        return cache[url];
      } else {
        return http.get(url).then(response => {
          cache[url] = response.data;
          contentModel.info = response.data;
        }).catch(e=>console.error(e));
      }

    }
  }
});
