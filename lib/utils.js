'use strict';

/**
 * Outputs <tt>args</tt> to the console, adding '> Nova Server:' as prefix.
 * @param args The arguments to log.
 */
const log = (...args) => console.log('> Nova Server:', ...args);

module.exports = {
  log
};
