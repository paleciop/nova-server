#!/usr/bin/env node
/**
 * @fileOverview Nova Server.
 * @author <a href="mailto:paleciop@gmail.com">Pablo Alecio</a>
 */
const server = require('./lib/server');
const contextProcessors = require('./lib/context-processors');

/**
 * @type {{server: {start: Function}, contextProcessors: {pathAware: Object}}}
 */
module.exports = {
  server,
  contextProcessors
};
