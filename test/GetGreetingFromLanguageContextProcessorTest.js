const describe = require('riteway').describe;
const contextProcessor = require('../examples/context-processors/GetGreetingFromLanguageContextProcessor');

describe('GetGreetingFromLanguageContextProcessor', async assert => {
  const contentModel = {
    user: {
      language: 'en'
    }
  };
  await contextProcessor.process({}, contentModel);

  assert({
    given: 'the language is "en"',
    should: `return the english greeting.`,
    actual: contentModel.greeting,
    expected: 'Hello, {{name}}! Welcome.'
  })

});