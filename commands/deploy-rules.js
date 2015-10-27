'use strict';

var Command = require('../lib/command');
var requireAccess = require('../lib/requireAccess');
var requireConfig = require('../lib/requireConfig');
var acquireRefs = require('../lib/acquireRefs');
var deploy = require('../lib/deploy');
var Config = require('../lib/config');
var RSVP = require('rsvp');
var utils = require('../lib/utils');

module.exports = new Command('deploy:rules')
  .description('deploy security rules for the current app')
  .option('-P, --project <project_id>', 'override the project ID specified in firebase.json')
  .option('-m, --message <message>', 'an optional message describing this deploy')
  .before(requireAccess)
  .before(requireConfig)
  .before(acquireRefs)
  .action(function(options) {
    var config = Config.load(options);
    if (!config.has('rules')) {
      utils.logSuccess('Nothing to deploy (no "rules" specified in firebase.json)');
      return RSVP.resolve();
    }
    return deploy(['rules'], options);
  });
