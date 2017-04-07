import axios from 'axios';
import { client as TmiClient } from 'tmi.js';
import config from 'config.json';
import oauth from 'oauth.json';
import loggingHandler from 'twitch/chat/logging-handler';
import commandHandler from 'twitch/chat/command-handler';
import voteHandler from 'twitch/chat/vote-handler';

const handlers = [
	loggingHandler(),
	commandHandler(),
	voteHandler(),
];

const initListeners = (client) => {
	client.on('connecting', console.log);

	client.on('disconnected', console.error);

	client.on('message', (channel, user, message) => {
		if (user.username === oauth.username) { return; }
		handlers.forEach((handler) => {
			const response = handler(channel, user, message);
			response.then((res) => {
				if (res) {
					client.say(channel, res);
				}
			});
		});
	});
};

const newClient = () => new TmiClient({
	options: {
		debug: true,
	},
	connection: {
		reconnect: true,
	},
	identity: oauth,
	channels: [config.channel],
});

const setLoggingPostInterval = () => (
  window.setInterval(() => {
	console.log('interval fired');
	if (typeof handlers.loggingHandler.chatLog !== 'undefined' && handlers.loggingHandler.chatLog.length > 0) {
		const tempChatLog = [...handlers.loggingHandler.chatLog];
		handlers.loggingHandler(null, null, null, true);
		axios.post('http://localhost:3000/api/chat', {
			data: tempChatLog,
		})
    .then(res => console.log(res.data))
    .catch(console.error);
	}
	if (typeof handlers.voteHandler.voteLog !== 'undefined' && handlers.votdHandler.voteLog.length > 0) {
		const tempVoteLog = [...handlers.voteHandler.voteLog];
		handlers.voteHandler(null, null, null, true);
		console.log(tempVoteLog);
		axios.post('http://localhost:3000/api/vote', {
			data: tempVoteLog,
		})
    .then(res => console.log(res.data))
		.catch(console.error);
	}
},
  30000)
);

export default {
	newClient,
	initListeners,
	setLoggingPostInterval,
};
