import { client as TmiClient } from 'tmi.js';
import config from 'config.json';
import oauth from 'oauth.json';
import loggingHandler from 'twitch/chat/logging-handler';
import commandHandler from 'twitch/chat/command-handler';
import voteHandler from 'twitch/chat/vote-handler';

const handlers = [
	loggingHandler(),
	commandHandler(),
	// voteHandler(),
];


const initListeners = (client) => {
	client.on('connecting', console.log);

	client.on('disconnected', console.error);

	client.on('message', (channel, user, message, self) => {
		if (self)	return;

		Promise.all(
			handlers.map(handler => handler(channel, user, message))
		).then(responses => (
			responses
				.filter(a => a)
				.forEach(response => client.say(channel, response)))
		);
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
	channels: [config.twitch.channel],
});

export default {
	newClient,
	initListeners,
};
