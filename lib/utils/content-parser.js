import Promise from 'bluebird';
import fs from 'fs';

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