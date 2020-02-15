# Nova Core
Lightweight server that exposes an API to interact with Nova.

## Run example
```bash
node examples/example.js
```
Make a request to http://localhost:9002 to open the Example web app or
hit `http://localhost:9001/api/places/everything/guatemala` directly to get the content model

## Create your own Nova server
```
const serverConfig = {
  contextProcessorPaths: '<path-to-your-context-processors>',
  port: <port-number>, //Default is 9001
  baseURLPath: <a-url-prefix>, //Default is '/api'
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

## Nova Core Dependency
Because `nova-core` is not an npm package yet, make sure you
install it right next to `nova-server` so npm can pick it up as a dependency.
## TODO
- Comment
- Tests
- Testing framework
- Error handling
- Example
- Authentication