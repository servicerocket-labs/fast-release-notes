'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.parseContentOtherwiseReadFile = parseContentOtherwiseReadFile;
exports.convert = convert;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _cliCli = require('../cli/cli');

var _markdown = require('markdown');

var _textileJs = require('textile-js');

var _textileJs2 = _interopRequireDefault(_textileJs);

var _xss = require('xss');

var _xss2 = _interopRequireDefault(_xss);

function parseContentOtherwiseReadFile(content, file) {
  return new _bluebird2['default'](function (resolve, reject) {
    if (content) resolve(content);
    if (!file) reject(new Error('File path is not specified correctly. (' + file + ')'));
    _fs2['default'].readFile(file, { encoding: 'UTF-8', flag: 'r' }, function (err, data) {
      if (err) reject(err);
      resolve(data);
    });
  });
}

/**
 *
 * @param content {string}
 * @param type {string} One of ['html', 'markdown', 'textile']
 */

function convert(content, type) {
  return new _bluebird2['default'](function (resolve, reject) {
    if (type === _cliCli.allowedMarkupTypes.markdown) {
      resolve(_markdown.markdown.toHTML(content));
    } else if (type === _cliCli.allowedMarkupTypes.textile) {
      resolve((0, _textileJs2['default'])(content));
    } else if (type === _cliCli.allowedMarkupTypes.html) {
      resolve((0, _xss2['default'])(content));
    }
    reject(new Error('Invalid type parameter: ' + type));
  });
}