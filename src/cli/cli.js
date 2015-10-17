import cli from 'cli';
import Joi from 'joi';
import _ from 'lodash';

export const cliCommands = {
  confluenceBlogpost: 'confluence-blogpost',
  getSatAnnouncement: 'getsat-announcement'
};

const optionsValidation = Joi.object().keys({
  username: Joi.string(),
  password: Joi.string(),
  title: Joi.string(),
  markup: Joi.any(['html', 'markdown', 'textile']),
  confUrl: Joi.string().allow(null),
  confSpaceKey: Joi.string().allow(null),
  getSatDomain: Joi.string().allow(null),
  getSatProduct: Joi.string().allow(null),
  content: Joi.string().allow(null),
  file: Joi.string().allow(null)
});

const commandValidation = Joi.any(_.values(cliCommands));

export const options = Joi.attempt(cli.parse({
  markup: ['m', 'Markup type: html | markdown | textile', 'string', 'markdown'],
  confUrl: [false, 'Confluence URL', 'string', 'https://intranet.servicerocket.com'],
  confSpaceKey: ['sp', 'Confluence Space Key', 'string', 'Tools'],
  getSatDomain: [false, 'GetSat Domain', 'string', 'servicerocket'],
  getSatProduct: [false, 'GetSat Product', 'string'],

  username:  ['u', 'Username', 'string'],
  password:  ['p', 'Password', 'string'],

  title:  ['t', 'Title of the post', 'string'],
  content:  ['c', 'Content for publishing', 'string'],
  file:  ['f', 'Read content from file for publishing', 'file']

}, _.values(cliCommands)), optionsValidation);

export const command = Joi.attempt(cli.command, commandValidation);
