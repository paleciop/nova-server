/**
 * @fileOverview Nova Server.
 * @author <a href="mailto:paleciop@gmail.com">Pablo Alecio</a>
 */
"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const nova = require("nova-core");
const { ASTERISK, HTML, JSON } = require("./constants");
const utils = require("./utils");

const app = express();
const router = express.Router();
const templatingEngine = nova.templatingEngine;
const log = utils.log;

const DEFAULT_NOVA_PORT = 9001;
const DEFAULT_BASE_URL_PATH = "/api";

/**
 *
 * @param configuration
 */
const start = async function start(configuration = {}) {
  const {
    port = DEFAULT_NOVA_PORT,
    baseURLPath = DEFAULT_BASE_URL_PATH,
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
   * TEMPORARY hack so we can use CORS
   * TODO implement a better way to do this
   * @param req
   * @param res
   * @param next
   */
  const allowCrossDomain = function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:9002");
    res.header("Access-Control-Allow-Methods", "GET,POST");
    res.header("Access-Control-Allow-Headers", "Content-Type");

    next();
  };

  /**
   *
   * @param request
   * @param response
   */
  const handleRequest = function handleRequest(request, response) {
    console.log('request: ', request.path);
    const requestContentModel =
      (request.body && request.body.contentModel) || {};
    executeContextProcessors(
      { path: request.path, request },
      Object.assign({}, baseContentModel, requestContentModel)
    )
      .then(contentModel => {
        if (contentModel.statistics) {
          const html = request.body && request.body.html;
          let responseBody = '';
          if (html) {
            response.type(HTML);
            responseBody = templatingEngine.compileTemplate(html, contentModel);
          } else {
            response.type(JSON);
            responseBody = contentModel;
          }
          response.send(responseBody);
        } else {
          response.status(404).send("Nothing was found :(");
        }
      })
      .catch(error => {
        console.error(error);
        const status = 500;
        response.status(status).type('json').send({code: status, message: error.message });
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