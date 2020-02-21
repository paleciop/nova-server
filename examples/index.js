const server = require('../').server;
const express = require('express');
const path = require('path');
const app = express();
const port = 3000;
app.use('/static', express.static(path.join(__dirname, 'static')));

const serverConfig = {
  contextProcessorPaths: __dirname + '/context-processors',
  baseContentModel: {
    config: {}
  }
};

server.start(serverConfig).then(() => {
  app.listen(3000, () =>
    console.log(
      `Open the static app in the browser: http://localhost:3000/static/test.html`
    )
  );
});
