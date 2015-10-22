'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _cliCli = require('./cli/cli');

var _utilsContentParser = require('./utils/content-parser');

var _publishersConfluencePublisher = require('./publishers/confluence-publisher');

var _publishersConfluencePublisher2 = _interopRequireDefault(_publishersConfluencePublisher);

var _publishersGetsatPublisher = require('./publishers/getsat-publisher');

var _publishersGetsatPublisher2 = _interopRequireDefault(_publishersGetsatPublisher);

var confluenceBlogpost = _cliCli.cliCommands.confluenceBlogpost;
var getSatAnnouncement = _cliCli.cliCommands.getSatAnnouncement;
var content = _cliCli.options.content;
var file = _cliCli.options.file;
var getSatDomain = _cliCli.options.getSatDomain;
var username = _cliCli.options.username;
var password = _cliCli.options.password;
var title = _cliCli.options.title;
var getSatProduct = _cliCli.options.getSatProduct;
var markup = _cliCli.options.markup;
var confUrl = _cliCli.options.confUrl;
var confSpaceKey = _cliCli.options.confSpaceKey;

function publishConfluence() {
  var confluencePublisher;
  return regeneratorRuntime.async(function publishConfluence$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.prev = 0;
        context$1$0.next = 3;
        return regeneratorRuntime.awrap((0, _utilsContentParser.parseContentOtherwiseReadFile)(content, file));

      case 3:
        content = context$1$0.sent;
        context$1$0.next = 6;
        return regeneratorRuntime.awrap((0, _utilsContentParser.convert)(content, markup));

      case 6:
        content = context$1$0.sent;
        confluencePublisher = new _publishersConfluencePublisher2['default']({
          url: confUrl,
          username: username,
          password: password
        });
        context$1$0.next = 10;
        return regeneratorRuntime.awrap(confluencePublisher.publish(confSpaceKey, title, content));

      case 10:

        console.log('Successfully published "' + title + '" to Confluence space "' + confSpaceKey + '".');
        context$1$0.next = 17;
        break;

      case 13:
        context$1$0.prev = 13;
        context$1$0.t0 = context$1$0['catch'](0);

        console.error('Unable to publish "' + title + '" to Confluence space "' + confSpaceKey + '".', context$1$0.t0);
        process.exit(-1);

      case 17:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this, [[0, 13]]);
}

function publishGetSat() {
  var getSatPublisher;
  return regeneratorRuntime.async(function publishGetSat$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.prev = 0;
        context$1$0.next = 3;
        return regeneratorRuntime.awrap((0, _utilsContentParser.parseContentOtherwiseReadFile)(content, file));

      case 3:
        content = context$1$0.sent;
        context$1$0.next = 6;
        return regeneratorRuntime.awrap((0, _utilsContentParser.convert)(content, markup));

      case 6:
        content = context$1$0.sent;
        getSatPublisher = new _publishersGetsatPublisher2['default']({
          domain: getSatDomain,
          username: username,
          password: password
        });
        context$1$0.next = 10;
        return regeneratorRuntime.awrap(getSatPublisher.publish(getSatProduct, title, content));

      case 10:

        console.log('Successfully published "' + title + '" to GetSat product "' + getSatProduct + '".');
        context$1$0.next = 17;
        break;

      case 13:
        context$1$0.prev = 13;
        context$1$0.t0 = context$1$0['catch'](0);

        console.log('Unable to publish "' + title + '" to GetSat product "' + getSatProduct + '".', context$1$0.t0);
        process.exit(-1);

      case 17:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this, [[0, 13]]);
}

if (_cliCli.command === confluenceBlogpost) {
  publishConfluence();
} else if (_cliCli.command == getSatAnnouncement) {
  publishGetSat();
}