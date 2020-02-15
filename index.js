#!/usr/bin/env node
/**
 * @fileOverview Nova Server.
 * @author <a href="mailto:paleciop@gmail.com">Pablo Alecio</a>
 */
'use strict';

const server = require('./lib/server');

if (require.main === module) {
  // If called through the CLI
  server.start({
    contextProcessorPaths: 'examples/places-api/contextprocessors',
    baseContentModel: { initial: 'INIT!' }
  });
} else {
  // Required as a module
  module.exports = server;
}
