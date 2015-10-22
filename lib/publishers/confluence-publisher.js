'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _superagentBluebirdPromise = require('superagent-bluebird-promise');

var _superagentBluebirdPromise2 = _interopRequireDefault(_superagentBluebirdPromise);

var _lodashFunctionBindAll = require('lodash/function/bindAll');

var _lodashFunctionBindAll2 = _interopRequireDefault(_lodashFunctionBindAll);

var ConfluencePublisher = (function () {
  function ConfluencePublisher(_ref) {
    var url = _ref.url;
    var username = _ref.username;
    var password = _ref.password;

    _classCallCheck(this, ConfluencePublisher);

    this.url = url;
    this.auth = { username: username, password: password };
    (0, _lodashFunctionBindAll2['default'])(this);
  }

  /**
   * Publish a new content to Confluence
   *
   * @param space {string} Space key
   * @param title {string} Content title
   * @param content {string} Content in Confluence XML storage format
   * @param type {string} Either 'blogpost' or 'page'. Defaulted to 'blogpost'
   * @returns {Request}
   */

  _createClass(ConfluencePublisher, [{
    key: 'publish',
    value: function publish(space, title, content) {
      var type = arguments.length <= 3 || arguments[3] === undefined ? 'blogpost' : arguments[3];

      var data = {
        type: type,
        title: title,
        space: {
          key: space
        },
        body: {
          storage: {
            value: content,
            representation: 'storage'
          }
        }
      };

      var _auth = this.auth;
      var username = _auth.username;
      var password = _auth.password;

      return _superagentBluebirdPromise2['default'].post(this.url + '/rest/api/content').send(data).auth(username, password);
    }
  }, {
    key: 'history',
    value: function history(contentId) {
      var expand = arguments.length <= 1 || arguments[1] === undefined ? 'lastUpdated' : arguments[1];
      var _auth2 = this.auth;
      var username = _auth2.username;
      var password = _auth2.password;

      return _superagentBluebirdPromise2['default'].get(this.url + '/rest/api/content/' + contentId + '/history').query({ expand: expand }).auth(username, password).then(function (_ref2) {
        var body = _ref2.body;
        return body;
      });
    }
  }, {
    key: 'getContentInfo',
    value: function getContentInfo(contentId) {
      var _auth3 = this.auth;
      var username = _auth3.username;
      var password = _auth3.password;

      return _superagentBluebirdPromise2['default'].get(this.url + '/rest/api/content/' + contentId).auth(username, password).then(function (_ref3) {
        var body = _ref3.body;
        return body;
      });
    }
  }, {
    key: 'update',
    value: function update(contentId, title, content) {
      var _auth4, username, password, _ref4, lastUpdated, _ref5, type, latestVersion, data;

      return regeneratorRuntime.async(function update$(context$2$0) {
        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            _auth4 = this.auth;
            username = _auth4.username;
            password = _auth4.password;
            context$2$0.next = 5;
            return regeneratorRuntime.awrap(this.history(contentId));

          case 5:
            _ref4 = context$2$0.sent;
            lastUpdated = _ref4.lastUpdated;
            context$2$0.next = 9;
            return regeneratorRuntime.awrap(this.getContentInfo(contentId));

          case 9:
            _ref5 = context$2$0.sent;
            type = _ref5.type;
            latestVersion = lastUpdated.number + 1;
            data = {
              title: title,
              type: type,
              body: {
                storage: {
                  value: content,
                  representation: 'storage'
                }
              },
              status: 'current',
              version: {
                number: latestVersion
              }
            };
            return context$2$0.abrupt('return', _superagentBluebirdPromise2['default'].put(this.url + '/rest/api/content/' + contentId).auth(username, password).send(data));

          case 14:
          case 'end':
            return context$2$0.stop();
        }
      }, null, this);
    }
  }]);

  return ConfluencePublisher;
})();

exports['default'] = ConfluencePublisher;
module.exports = exports['default'];