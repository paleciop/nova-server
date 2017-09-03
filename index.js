const express = require('express');
const app = express();
const nova = require('/Users/palecio/Documents/nova/nova-core');

const router = express.Router();

const NOVA_PORT = 9001;

const paths = ['/docs/testname', '/docs/:var'];

const executeContextProcessors = async function executeContextProcessors (executionContext, contentModel) {
  const cpe = await nova.fetchContextProcessorEngine({paths: ['examples/contextprocessors']});
  return cpe.execute(executionContext, contentModel);
};

paths.forEach(thePath => {
  router.use(thePath, function (request, response) {
    executeContextProcessors({path: request.baseUrl, request}, {}).then(contentModel => {
      response.send(contentModel);
    }).catch(e => console.error(e));
  });
});

app.use('/api', router);

app.listen(NOVA_PORT, function () {
  console.log(`Nova Server started on port ${NOVA_PORT}`)
});