'use strict';

const http = require('axios');
const contextProcessor = require('/Users/palecio/Documents/nova/nova-core')
  .pathAwareContextProcessor;

const DEFAULT_LATITUDE = '14.6262174';
const DEFAULT_LONGITUDE = '-90.5275799';
const DEFAULT_RADIUS = '500000';

module.exports = contextProcessor.extend({
  patterns: ['/places/location', '/places/location/*', '/places/everything', '/places/everything/*'],
  process(executionContext, contentModel) {
    const config = contentModel.config;
    const apiKey = config.googleMapsAPIKey;
    const baseUrl = config.googleMapsBaseUrl;
    const place = contentModel.place;
    if (apiKey && baseUrl && place) {
      const latitude = config.latitude ||DEFAULT_LATITUDE;
      const longitude = config.longitude || DEFAULT_LONGITUDE;
      const radius = config.radius || DEFAULT_RADIUS;
      const url = `${baseUrl}?location=${latitude},${longitude}&radius=${radius}&name=${place}&key=${apiKey}`;
      return http.get(url).then(response => contentModel.locations = response.data.results);
    }
  }
});
