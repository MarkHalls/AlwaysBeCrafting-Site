import axios from 'axios';
import { client as TmiClient } from 'tmi.js';
import config from '../../config.json';
import commands from './commands';
import oauth from '../../oauth.json';

const handlers = [
  loggingHandler(),
  commandHandler()
];

const chat = (client) => {
  client.on('connecting', console.log);

  client.on('disconnected', console.error);

  client.on('message', (channel, user, message) => {
    if (user.username === oauth.username) { return; }
    handlers.forEach((handler) => {
      const response = handler(channel, user, message);
      if (response) {
        client.say(channel, response);
      }
    });
  });
};

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

const client = new TmiClient({
  options: {
    debug: true,
  },
  connection: {
    reconnect: true,
  },
  identity: oauth,
  channels: [config.channel],
});


export default {
  chat,
  initClient,
};
