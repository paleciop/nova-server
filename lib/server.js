/**
 * @fileOverview Nova Server.
 * @author <a href="mailto:paleciop@gmail.com">Pablo Alecio</a>
 */
'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const nova = require('@palecio/nova-core');
const { ASTERISK, HTML, JSON } = require('./constants');
const utils = require('./utils');

const app = express();
const router = express.Router();
const templatingEngine = nova.templatingEngine;
const log = utils.log;

const DEFAULT_NOVA_PORT = 9001;
const DEFAULT_BASE_URL_PATH = '/api';

/**
 *
 * @param configuration
 */
const start = async function start(configuration = {}) {
  const {
    port = DEFAULT_NOVA_PORT,
    baseURLPath = DEFAULT_BASE_URL_PATH,
    allowedHostnames = ['localhost'],
    contextProcessorPaths = [],
    baseContentModel = {}
  } = configuration;

  const cpPaths = Array.isArray(contextProcessorPaths)
    ? contextProcessorPaths
    : [contextProcessorPaths];

  const cpe = await nova.fetchContextProcessorEngine({
    paths: cpPaths
  });

  /**
   *
   * @param executionContext
   * @param contentModel
   * @returns {*}
   */
  const executeContextProcessors = async function executeContextProcessors(
    executionContext,
    contentModel
  ) {
    return cpe.execute(executionContext, contentModel);
  };

  /**
   * CORS support
   * @param req
   * @param res
   * @param next
   */
  const allowCrossDomain = function(req, res, next) {
    const origin = req.headers.origin;
    if (
      origin &&
      allowedHostnames.some(hostname => origin.includes(hostname))
    ) {
      res.header('Access-Control-Allow-Origin', req.headers.origin);
      res.header('Access-Control-Allow-Headers', '*');

    }
    next();
  };

  /**
   *
   * @param request
   * @param response
   */
  const handleRequest = function handleRequest(request, response) {
    const requestContentModel =
      (request.body && request.body.contentModel) || {};
    executeContextProcessors(
      { path: request.path, request },
      Object.assign({config:{}, httpHeaders: {}}, baseContentModel, requestContentModel)
    )
      .then(contentModel => {
        if (contentModel) {
          const html = request.body && request.body.html;
          const headers = contentModel.httpHeaders;
          let responseBody = '';

          if (headers && (typeof headers === 'object')) {
            response.set(headers);
            delete contentModel.httpHeaders;
          }

          if (html) {
            response.type(HTML);
            responseBody = templatingEngine.compileTemplate(html, contentModel);
          } else {
            response.type(JSON);
            responseBody = contentModel;
          }
          response.send(responseBody);
        } else {
          response.status(404).send('Not Found');
        }
      })
      .catch(error => {
        console.error(error);
        const status = 500;
        response
          .status(status)
          .type('json')
          .send({ code: status, message: error.message });
      });
  };

  app.use(allowCrossDomain);
  router.use(bodyParser.json());
  router.all(ASTERISK, handleRequest);
  app.use(baseURLPath, router);
  app.listen(port, function() {
    log(`Started on port ${port}`);
  });
};

/**
 *
 * @type {{start: start}}
 */
module.exports = {
  start
};
