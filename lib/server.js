/**
 * @fileOverview Nova Server.
 * @author <a href="mailto:paleciop@gmail.com">Pablo Alecio</a>
 */
'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const nova = require('/Users/palecio/Documents/personal/nova/nova-core');
const templatingEngine = require('./templatingEngine');

const { ASTERISK, HTML, JSON_TYPE, TEXT_TYPE } = require('./constants');
const utils = require('./utils');

const app = express();
const router = express.Router();
const { log, cloneObject } = utils;
const DEFAULT_NOVA_PORT = 9001;
const DEFAULT_BASE_URL_PATH = '/api';

/**
 * @async
 * @param configuration {Object} the server configuration object
 */
const start = async function start(configuration = {}) {
  const {
    port = DEFAULT_NOVA_PORT, // The port where the express server will start
    baseURLPath = DEFAULT_BASE_URL_PATH, // The route URL prefix. Default is '/api'
    allowedHostnames = ['localhost'], // The host names that are allowed to make requests to this server
    contextProcessors = {}, // An array of literal Context Processors or a single literal Context Processor
    contextProcessorPaths = [], // An array of paths or a single path where the Context Processors are located in the file system
    baseContentModel = {} // The starting Content Model
  } = configuration;

  const paths = Array.isArray(contextProcessorPaths)
    ? contextProcessorPaths
    : [contextProcessorPaths];

  /**
   * The Context Processor engine
   * @async
   * @type {Function}
   */
  const cpe = await nova.fetchContextProcessorEngine({
    contextProcessors,
    paths
  });

  /**
   * A function that executes the Context Processors based on the data in the execution context
   * @async
   * @param executionContext the Execution Context
   * @param contentModel the Content Model
   * @returns {Promise<Object>} returns a promise which in turn returns the final Content Model
   */
  const executeContextProcessors = async function executeContextProcessors(
    executionContext,
    contentModel
  ) {
    return cpe.execute(executionContext, contentModel);
  };

  /**
   * CORS support
   * @param req the request
   * @param res the response
   * @param next the next function
   */
  const allowCrossDomain = function(req, res, next) {
    const origin = req.headers.origin;
    if (
      origin &&
      allowedHostnames.some(hostname => origin.includes(hostname))
    ) {
      res.header('Access-Control-Allow-Origin', req.headers.origin);
      res.header('Access-Control-Allow-Headers', '*');
      res.header('Access-Control-Allow-Credentials', 'true');
    }
    next();
  };

  /**
   * The function that handles all the requests made to the server
   * @param request the request object
   * @param response the response object
   */
  const handleRequest = function handleRequest(request, response) {
    executeContextProcessors(
      { path: request.path, request },
      cloneObject(baseContentModel)
    )
      .then(contentModel => {
        if (contentModel) {
          const body = request.body;
          const contentType = request.headers['content-type'];
          const headers = contentModel.httpHeaders;
          let responseBody = '';

          if (contentModel.debug && request.query.debug) {
            response.type(HTML);
            return response.send(contentModel.debug.visualRepresentation);
          }

          if (headers && typeof headers === 'object') {
            response.set(headers);
            delete contentModel.httpHeaders;
          }

          if (body && contentType === 'text/html') {
            response.type(HTML);
            responseBody = templatingEngine.compileTemplate(body, contentModel);
          } else {
            response.type(JSON_TYPE);
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
          .type(JSON_TYPE)
          .send({ code: status, message: error.message });
      });
  };

  app.use(allowCrossDomain); // CORS support
  router.use(bodyParser.json()); // to parse the request body as json
  router.use(bodyParser.text({ type: TEXT_TYPE })); // to parse the request as text
  router.all(ASTERISK, handleRequest); // handle ALL requests to the server
  app.use(baseURLPath, router); // use 'router' to handle all requests made to the baseURLPath
  app.listen(port, function() {
    log(`Started on port ${port}`);
  });
};

/**
 * @type {{start: Function}} server
 */
module.exports = {
  start
};
