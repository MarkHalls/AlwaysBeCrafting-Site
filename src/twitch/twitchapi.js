import axios from 'axios';
import config from 'config.json';

const BASE_URL = 'https://api.twitch.tv/kraken';
const API_VERSION = '5';
const headers = {
	Accept: 'application/vnd.twitchtv.v5+json',
	'Client-ID': 'vf9xv00vgz9ev65qvsk8suupgot5fr',
};

const json = url => (
  axios
  .request(
	{
		url: BASE_URL + url,
		method: 'get',
		headers,
	})
    .then(r => r.data)
);

const usernameToID = name => (
	axios.request(
		{
			url: `${BASE_URL}/users?login=${name}`,
			headers,
		})
		.then(r => r.data.users[0]._id)
);

const endpoints = {
	getStreamsChannel(channel) {
		return usernameToID(channel).then(id => json(`/streams/${id}`));
	},
};

export default endpoints;

			// Accept: `application/vnd.twitchtv.v${API_VERSION}+json`,
