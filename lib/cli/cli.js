'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _cli = require('cli');

var _cli2 = _interopRequireDefault(_cli);

var _joi = require('joi');

var _joi2 = _interopRequireDefault(_joi);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var cliCommands = {
  confluenceBlogpost: 'confluence-blogpost',
  getSatAnnouncement: 'getsat-announcement'
};

exports.cliCommands = cliCommands;
var allowedMarkupTypes = {
  html: 'html',
  markdown: 'markdown',
  textile: 'textile'
};

exports.allowedMarkupTypes = allowedMarkupTypes;
var optionsValidation = _joi2['default'].object().keys({
  username: _joi2['default'].string(),
  password: _joi2['default'].string(),
  title: _joi2['default'].string(),
  markup: _joi2['default'].any(_lodash2['default'].values(allowedMarkupTypes)),
  confUrl: _joi2['default'].string().allow(null),
  confSpaceKey: _joi2['default'].string().allow(null),
  getSatDomain: _joi2['default'].string().allow(null),
  getSatProduct: _joi2['default'].string().allow(null),
  content: _joi2['default'].string().allow(null),
  file: _joi2['default'].string().allow(null)
});

var commandValidation = _joi2['default'].any(_lodash2['default'].values(cliCommands));

var options = _joi2['default'].attempt(_cli2['default'].parse({
  markup: ['m', 'Markup type: html | markdown | textile', 'string', 'markdown'],
  confUrl: [false, 'Confluence URL', 'string', 'https://intranet.servicerocket.com'],
  confSpaceKey: ['sp', 'Confluence Space Key', 'string', 'Tools'],
  getSatDomain: [false, 'GetSat Domain', 'string', 'servicerocket'],
  getSatProduct: [false, 'GetSat Product', 'string'],

  username: ['u', 'Username', 'string'],
  password: ['p', 'Password', 'string'],

  title: ['t', 'Title of the post', 'string'],
  content: ['c', 'Content for publishing', 'string'],
  file: ['f', 'Read content from file for publishing', 'file']

}, _lodash2['default'].values(cliCommands)), optionsValidation);

exports.options = options;
var command = _joi2['default'].attempt(_cli2['default'].command, commandValidation);
exports.command = command;