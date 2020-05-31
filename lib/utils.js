'use strict';

/**
 * Outputs <tt>args</tt> to the console, adding '> Nova Server:' as prefix.
 * @param args The arguments to log.
 */
const log = (...args) => console.log('> Nova Server:', ...args);

/**
 * Deep clones <tt>obj</tt> and returns the clone.
 * @param obj The object to clone
 */
const cloneObject = obj =>
  (typeof obj === 'object' && JSON.parse(JSON.stringify(obj))) || null;

module.exports = {
  log,
  cloneObject
};
