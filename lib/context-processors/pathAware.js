/**
 * @fileOverview Path Aware Context Processor, meant to be extended with {@link extend}
 * @author <a href="mailto:paleciop@gmail.com">Pablo Alecio</a>
 */
'use strict';

const RoutePattern = require('../routes/route-pattern');
const contextProcessor = require('@palecio/nova-core').contextProcessor;

/**
 * @module lib/context-processors/pathAwareContextProcessor
 * @type {Object}
 */
module.exports = contextProcessor.extend({
  /**
   * The context processor name.
   */
  name: 'Path Aware',
  /**
   * A list of URL patterns which the request path has to match in order for this Context Processor to be executed.
   */
  patterns: [],
  /**
   * Gets the pattern that matches <tt>thePath</tt>.
   * @param thePath the path.
   * @returns {string} The pattern that matched the path.
   */
  getMatchingPattern(thePath) {
    for (let i = 0; i < this.patterns.length; i++) {
      const routePattern = RoutePattern.fromString(this.patterns[i]);
      const match = routePattern.matches(thePath);
      if (match) {
        return this.patterns[i];
      }
    }
    return '';
  },
  /**
   * Gets the path from <tt>executionContext</tt>. First, it looks for a path property, if that fails, it uses the request path.
   * @param {Object} executionContext The Execution Context.
   * @returns {string} the path of the execution context.
   */
  getPath(executionContext) {
    return (
      executionContext.path ||
      (executionContext.request && executionContext.request.baseUrl) ||
      ''
    );
  },
  /**
   * Gets the match object containing the variables which matched the path.
   * @param executionContext The Execution Context.
   * @returns {Object} The match.
   */
  getMatch(executionContext) {
    const thePath = this.getPath(executionContext);
    const pattern = this.getMatchingPattern(thePath);
    const routePattern = RoutePattern.fromString(pattern);
    return routePattern.match(thePath);
  },
  /**
   * Checks if this Context Processor has to be executed based on the path in the execution context.
   * @param {Object} executionContext The execution context.
   * @returns {boolean} True if the path sent as argument matches any of the patterns; false otherwise.
   */
  accepts(executionContext) {
    const thePath = this.getPath(executionContext);
    return !!this.getMatchingPattern(thePath);
  }
});
