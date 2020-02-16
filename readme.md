# Nova Server
Lightweight web server using Expressjs that enables building web APIs with Nova.

## Install

```javascript
npm install @palecio/nova-server
```

## Run example
```bash
npm run example
```
Make a request to http://localhost:3000/static/test.html to open the Example web app or
hit `http://localhost:9001/api/greeting/palecio` directly to get the content model.

## Create your own Nova server
```
const serverConfig = {
  contextProcessorPaths: '<path-to-your-context-processors>',
  port: <port-number>, //Default is 9001
  baseURLPath: <a-url-prefix>, //Default is '/api'
  allowedHostnames: <the-hostnames>, // hostnames allowed to make cross domain requests
  baseContentModel: { // The base content model 
    config: {} //an object with configs that will be accessible to the Context Processors 
  }
};

server.start(serverConfig).then(() => {
  console.log('Nova Server Running!');
});
```

## Example Context Processor
```
const contextProcessor = require("nova-core").pathAwareContextProcessor;

module.exports = contextProcessor.extend({
  patterns: ["/my-path"], //Express-like routes
  priority: 10, //The higher the number, the sooner it runs, no priority means the CP doesn't have any dependencies so it'll run in parallel
  process(executionContext, contentModel) {
    //modify the content model here
  }
});
```

---
**Author: Pablo Alecio (paleciop@gmail.com)**