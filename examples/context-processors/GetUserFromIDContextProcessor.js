"use strict";

const pathAwareContextProcessor = require("../../lib/context-processors/pathAwareContextProcessor");
const fs = require('fs').promises;
const FatalError = require('@palecio/nova-core').errors.FatalError;

module.exports = pathAwareContextProcessor.extend({
  priority: 90,
  patterns: ["*greeting"],
  async process(executionContext, contentModel) {
    const userId = contentModel.userId || '';
    const users = JSON.parse((await fs.readFile('./examples/db/users.json')).toString());
    const user = users.find(user => userId === user.id);
    if (user) {
      contentModel.user = user;
    } else {
      throw new FatalError('User does not exist.')
    }

  }
});
