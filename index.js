const express = require('express');
const app = express();
const nova = require('/Users/palecio/Documents/nova/nova-core');

const router = express.Router();

const DEFAULT_NOVA_PORT = 9001;

const executeContextProcessors = async function executeContextProcessors(
  executionContext,
  contentModel,
  contextProcessorPaths
) {
  const cpPaths = Array.isArray(contextProcessorPaths) ? contextProcessorPaths : [contextProcessorPaths];
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

  router.get('*', function(request, response) {
    executeContextProcessors(
      { path: request.path, request },
      baseContentModel,
      contextProcessorPaths
    )
      .then(contentModel => {
        response.send(contentModel);
      })
      .catch(e => console.error(e));
  });

  app.use(baseURLPath, router);

  app.listen(port, function() {
    console.log(`Nova Server started on port ${port}`);
  });
};

module.exports = {
  start
};
