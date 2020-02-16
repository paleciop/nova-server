const describe = require('riteway').describe;
const nova = require('@palecio/nova-core');

describe('GreetingEndpointTest', async assert => {
  const configuration = { paths: './examples/context-processors' };
  const contextProcessorEngine = await nova.fetchContextProcessorEngine(configuration);
  const initialContentModel = {};
  const executionContext = { request: {path: '/api/greeting/palecio'} };
  const contentModel = await contextProcessorEngine.execute(executionContext, initialContentModel);

  assert({
    given: 'The URL contains a username, that username is valid and there is a greeting',
    should: `return a personalized greeting based on the user's language and user's name.`,
    actual: contentModel.personalizedGreeting,
    expected: '¡Hola, Alecio, Pablo! Bienvenido.'
  });

});