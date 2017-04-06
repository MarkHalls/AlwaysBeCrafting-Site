import axios from 'axios';
import tmi from 'tmi.js';
import config from '../../config.json';
import commands from './commands';
import oauth from '../../oauth.json';

const logs = {
  chatLog: [],
  voteLog: [],
};

const initLogger = () => {
  window.setInterval(() => {
    console.log('interval fired');
    if (typeof logs.chatLog !== 'undefined' && logs.chatLog.length > 0) {
      axios.post('http://localhost:3000/api/chat', {
        data: logs.chatLog,
      })
      .then((res) => {
        logs.chatLog = [];
        console.log(res.data);
      })
      .catch(console.error);
    }
    if (typeof logs.voteLog !== 'undefined' && logs.voteLog.length > 0) {
      axios.post('http://localhost:3000/api/vote', {
        data: logs.voteLog,
      })
      .then((res) => {
        logs.voteLog = [];
        console.log(res.data);
      })
      .catch(console.error);
    }
  },
  30000);
};

const initClient = new tmi.client({
  options: {
    debug: true,
  },
  connection: {
    reconnect: true,
  },
  identity: oauth,
  channels: [config.channel],
});

const initListeners = (client) => {
  client.on('connecting', console.log);

  client.on('disconnected', console.error);

  client.on('message', (channel, user, message, self) => {
    if (user.username === oauth.username) { return; }
    if (message[0] !== '!') {
      logs.chatLog = commands.logChat(logs.chatLog, user['tmi-sent-ts'], user.username, message);
    } else {
      const splitMessage = message.trim().split(/\s+/);
      const commandName = splitMessage.shift().replace('!', '');
      const command = commands[commandName];
      command(splitMessage, channel, client);
    }
  });
};

export default {
  initClient,
  initLogger,
  initListeners,
};
