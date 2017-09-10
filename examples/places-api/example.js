'use strict';

const server = require('../../index');

const config = {
  contextProcessorPaths: 'examples/places-api/contextprocessors',
  baseContentModel: {
    config: {
      googleMapsAPIKey: 'AIzaSyACKHVshPfR3YUWE6VEbGmz1JQm9yBiL04',
      googleMapsBaseUrl:
        'https://maps.googleapis.com/maps/api/place/nearbysearch/json',
      wolframAlphaBaseUrl: 'http://api.wolframalpha.com/v1/query',
      wolframAlphaAPPId: '6ATVWP-U3U53X6EW5'
    }
  }
};

server.start(config);
