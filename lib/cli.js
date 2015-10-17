import {options, command, cliCommands} from './cli/cli';
import {parseContentOtherwiseReadFile} from './utils/content-parser';
import ConfluencePublisher from './publishers/confluence-publisher';
import GetSatPublisher from './publishers/getsat-publisher';

const {confluenceBlogpost, getSatAnnouncement} = cliCommands;

async function publishConfluence() {
  const {
    confUrl,
    username,
    password,
    confSpaceKey,
    title
  } = options;

  let {
    content,
    file
  } = options;

  try {
    content = await parseContentOtherwiseReadFile(content, file);

    let confluencePublisher = new ConfluencePublisher({
      url: confUrl,
      username,
      password
    });

    await confluencePublisher.publish(confSpaceKey, title, content);

    console.log(`Successfully published "${title}" to Confluence space "${confSpaceKey}".`);
  } catch (err) {
    console.error(`Unable to publish "${title}" to Confluence space "${confSpaceKey}".`, err);
    process.exit(-1);
  }
}

async function publishGetSat() {
  const {
    getSatDomain,
    username,
    password,
    title,
    getSatProduct
  } = options;

  let {
    content,
    file
  } = options;

  try {
    content = await parseContentOtherwiseReadFile(content, file);

    let getSatPublisher = new GetSatPublisher({
      domain: getSatDomain,
      username,
      password
    });

    await getSatPublisher.publish(getSatProduct, title, content);

    console.log(`Successfully published "${title}" to GetSat product "${getSatProduct}".`);
  } catch (err) {
    console.log(`Unable to publish "${title}" to GetSat product "${getSatProduct}".`, err);
    process.exit(-1);
  }
}

if (command === confluenceBlogpost) {
  publishConfluence();
} else if (command == getSatAnnouncement) {
  publishGetSat();
}
