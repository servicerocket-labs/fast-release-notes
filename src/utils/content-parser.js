import Promise from 'bluebird';
import fs from 'fs';
import {allowedMarkupTypes} from '../cli/cli';
import {markdown} from 'markdown';
import textile from 'textile-js';
import xss from 'xss';

export function parseContentOtherwiseReadFile(content, file) {
  return new Promise((resolve, reject) => {
    if (content) resolve(content);
    if (!file) reject(new Error(`File path is not specified correctly. (${file})`));
    fs.readFile(file, {encoding: 'UTF-8', flag: 'r'}, (err, data) => {
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
export function convert(content, type) {
  return new Promise((resolve, reject) => {
    if (type === allowedMarkupTypes.markdown) {
      resolve(markdown.toHTML(content));
    } else if (type === allowedMarkupTypes.textile) {
      resolve(textile(content));
    } else if (type === allowedMarkupTypes.html) {
      resolve(xss(content));
    }
    reject(new Error(`Invalid type parameter: ${type}`));
  });
}