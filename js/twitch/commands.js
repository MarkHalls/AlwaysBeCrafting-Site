import axios from 'axios';
import kraken from './twitchapi';
import player from '../player/player';

const commands = {
  logChat: (chatLog, timestamp, username, message) =>
    [...chatLog, { timestamp, user: username, message }],

  veto: (voteLog, trackid) => {
    console.log('Veto SUCCESS!!');
    player.next();
    return [...voteLog, { trackid, downvote: 'downvote' }];
  },
  request: (voteLog, trackid) => {
    console.log('Request SUCCESS!!');
    return [...voteLog, { trackid, downvote: 'downvote' }];
  },
  xkcd: (args, channel, client) => {
    const searchString = args.join('%20');
    axios.get(`http://localhost:3000/api/xkcd-proxy/${searchString}`)
      .then((res) => {
        console.log(res);
        client.say(channel, `🤖 ${res.data.safe_title}, ${res.data.site}`)
              .catch(console.error);
      })
      .catch(console.error);
  },
  uptime: (args, channel, client) => {
    console.log(channel.replace('#', ''));
    kraken.getStreamsChannel(channel.replace('#', ''))
      .then((res) => {
        if (res.data.stream) {
          console.log(res.data.stream);
          const uptime = Date.now() - new Date(res.data.stream.created_at);
          const hours = Math.floor(uptime / 1000 / 60 / 60);
          const min = Math.floor((uptime / 1000 / 60) % 60);
          const sec = Math.floor((uptime / 1000) % 60);
          client.say(channel, ` 🤖Uptime: ${hours}:${(`0${min}`).slice(-2)}:${(`0${sec}`).slice(-2)}`);
        }
      })
      .catch(console.error);
  },
};

export default commands;
