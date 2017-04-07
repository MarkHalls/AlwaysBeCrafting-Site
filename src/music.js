import setStreamStatus from 'twitch/stream-status';
import config from 'config.json';
import chat from 'twitch/chat/chat';

setStreamStatus(config.twitch.channel);

const client = chat.newClient();
chat.initListeners(client);
chat.setLoggingPostInterval();
client.connect();
