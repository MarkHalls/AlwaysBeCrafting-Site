import setStreamStatus from './twitch/stream-status';
import chat from './twitch/chat';

setStreamStatus();
chat.initLogger();
const client = chat.initClient();
chat.initListeners(client);
client.connect();
