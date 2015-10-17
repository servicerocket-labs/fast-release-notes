import Promise from 'bluebird';
import request from 'superagent-bluebird-promise';
import bindAll from 'lodash/function/bindAll';

class ConfluencePublisher {

  constructor({url, username, password}) {
    this.url = url;
    this.auth = {username, password};
    bindAll(this);
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
  publish(space, title, content, type = 'blogpost') {
    const data = {
      type,
      title,
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

    const {username, password} = this.auth;
    return request
      .post(`${this.url}/rest/api/content`)
      .send(data)
      .auth(username, password);
  }

  history(contentId, expand = 'lastUpdated') {
    const {username, password} = this.auth;
    return request
      .get(`${this.url}/rest/api/content/${contentId}/history`)
      .query({expand})
      .auth(username, password)
      .then(({body}) => body);
  }

  getContentInfo(contentId) {
    const {username, password} = this.auth;
    return request
      .get(`${this.url}/rest/api/content/${contentId}`)
      .auth(username, password)
      .then(({body}) => body);
  }

  async update(contentId, title, content) {
    const {username, password} = this.auth;

    const {lastUpdated} = await this.history(contentId);
    const {type} = await this.getContentInfo(contentId);

    const latestVersion = lastUpdated.number + 1;
    const data = {
      title,
      type,
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

    return request
      .put(`${this.url}/rest/api/content/${contentId}`)
      .auth(username, password)
      .send(data);

  }

}

export default ConfluencePublisher;