'use strict';

const server = require('../../index');
const express = require('express');
const app = express();

const serverConfig = {
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

server.start(serverConfig).then(() => {
  // This then is not really necessary but it looks better in the logs if the static server starts after Nova.
  app.use(express.static('examples/places-api/static'));
  app.listen(9002, function () {
    console.log('> Places App started on por 9002')
  });
});

