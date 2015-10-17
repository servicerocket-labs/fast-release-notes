import Promise from 'bluebird';
import request from 'superagent-bluebird-promise';
import bindAll from 'lodash/function/bindAll';

export const TOPICS_URL = "https://api.getsatisfaction.com/topics.json";

class GetSatPublisher {
  constructor({domain, username, password}) {
    this.domain = domain;
    this.auth = {username, password};
    bindAll(this);
  }

  publish(product, subject, content) {
    const data = {
      topic: {
        company_domain: this.domain,
        style: "update",
        products: [product],
        subject,
        content
      }
    };

    const {username, password} = this.auth;
    return request
      .post(TOPICS_URL)
      .send(data)
      .auth(username, password);
  }
}

export default GetSatPublisher;