import axios from 'axios';
import config from '../../config.json';

const BASE_URL = 'https://api.twitch.tv/kraken';
const API_VERSION = '5';

const json = url => (
  axios
    .get(BASE_URL + url, {
      Accept: `application/vnd.twitchtv.v${API_VERSION}+json`,
      'Client-ID': config.twitch.client_id,
    })
    .then(r => r.data)
);

const endpoints = {
  streamStatus() {
    return json(`/streams/${config.channel}`);
  },
};

export default endpoints;

