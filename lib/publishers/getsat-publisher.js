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

var TOPICS_URL = "https://api.getsatisfaction.com/topics.json";

exports.TOPICS_URL = TOPICS_URL;

var GetSatPublisher = (function () {
  function GetSatPublisher(_ref) {
    var domain = _ref.domain;
    var username = _ref.username;
    var password = _ref.password;

    _classCallCheck(this, GetSatPublisher);

    this.domain = domain;
    this.auth = { username: username, password: password };
    (0, _lodashFunctionBindAll2['default'])(this);
  }

  _createClass(GetSatPublisher, [{
    key: 'publish',
    value: function publish(product, subject, content) {
      var data = {
        topic: {
          company_domain: this.domain,
          style: "update",
          products: [product],
          subject: subject,
          content: content
        }
      };

      var _auth = this.auth;
      var username = _auth.username;
      var password = _auth.password;

      return _superagentBluebirdPromise2['default'].post(TOPICS_URL).send(data).auth(username, password);
    }
  }]);

  return GetSatPublisher;
})();

exports['default'] = GetSatPublisher;