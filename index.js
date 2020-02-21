#!/usr/bin/env node
/**
 * @fileOverview Nova Server.
 * @author <a href="mailto:paleciop@gmail.com">Pablo Alecio</a>
 */
const server = require('./lib/server');
const contextProcessors = require('./lib/context-processors');

//TODO enable to specify the server configuration from the command line
if (require.main === module) {
  // If called through the CLI
  server.start({});
} else {
  // Required as a module
  module.exports = {
    server,
    contextProcessors
  };
}
