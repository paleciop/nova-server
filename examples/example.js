const server = require('../index');

server.start({
  contextProcessorPaths: 'examples/contextprocessors',
  baseContentModel: { initial: 'INIT!' }
});
