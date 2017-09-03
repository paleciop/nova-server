const express = require('express');
const bodyParser = require('body-parser');
const nova = require('/Users/palecio/Documents/nova/nova-core');
const C = require('./lib/constants');

const app = express();
const router = express.Router();
const templatingEngine = nova.templatingEngine;

const DEFAULT_NOVA_PORT = 9001;

const executeContextProcessors = async function executeContextProcessors(
  executionContext,
  contentModel,
  contextProcessorPaths
) {
  const cpPaths = Array.isArray(contextProcessorPaths)
    ? contextProcessorPaths
    : [contextProcessorPaths];
  const cpe = await nova.fetchContextProcessorEngine({
    paths: cpPaths
  });
  return cpe.execute(executionContext, contentModel);
};

const start = function start(configuration = {}) {
  const {
    port = DEFAULT_NOVA_PORT,
    baseURLPath = '/api',
    contextProcessorPaths = [],
    baseContentModel = {}
  } = configuration;

  const handleRequest = function handleRequest(request, response) {
    const requestContentModel =
      (request.body && request.body.contentModel) || {};
    executeContextProcessors(
      { path: request.path, request },
      Object.assign({}, baseContentModel, requestContentModel),
      contextProcessorPaths
    )
      .then(contentModel => {
        const html = request.body && request.body.html;
        response.send(
          html
            ? templatingEngine.compileTemplate(html, contentModel)
            : contentModel
        );
      })
      .catch(e => console.error(e));
  };

  router.use(bodyParser.json());
  router.all(C.ASTERISK, handleRequest);
  app.use(baseURLPath, router);
  app.listen(port, function() {
    console.log(`Nova Server started on port ${port}`);
  });
};

module.exports = {
  start
};
