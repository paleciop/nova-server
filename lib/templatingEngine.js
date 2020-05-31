/**
 * @fileOverview Contains the logic for the Templating Engine.
 * @author <a href="mailto:paleciop@gmail.com">Pablo Alecio</a>
 */
'use strict';

const handlebars = require('handlebars');

/**
 * Compiles the <tt>markup</tt> using the <tt>contentModel</tt>
 * @param {string} markup
 * @param {Object} contentModel
 * @returns {string} the compiled markup
 */
const compileTemplate = (markup, contentModel) => {
  const template = handlebars.compile(markup);
  return template(contentModel);
};

/**
 * @module lib/templatingEngine
 * @type { compileTemplate }
 */
module.exports = { compileTemplate };
