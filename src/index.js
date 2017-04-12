import setStreamStatus from 'twitch/stream-status';
import config from 'config.json';

setStreamStatus(config.twitch.channel);
