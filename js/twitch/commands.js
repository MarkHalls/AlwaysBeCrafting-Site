import axios from 'axios';
import kraken from './twitchapi';
// import player from '../player/player';

const commands = {
  // veto: (voteLog, trackid) => {
  //   console.log('Veto SUCCESS!!');
  //   player.next();
  //   return [...voteLog, { trackid, downvote: 'downvote' }];
  // },
  // request: (voteLog, trackid) => {
  //   console.log('Request SUCCESS!!');
  //   return [...voteLog, { trackid, downvote: 'downvote' }];
  // },
  xkcd: (channel, user, args) => {
    const searchString = args.join('%20');
    axios.get(`http://localhost:3000/api/xkcd-proxy/${searchString}`)
      .then((res) => {
        console.log(res);
        return ` 🤖 ${res.data.safe_title}, ${res.data.site}`;
      })
      .catch(console.error);
  },
  uptime: (channel, user, args) => {
    kraken.getStreamsChannel(channel.replace('#', ''))
      .then((res) => {
        if (!res.data.stream) { return; }
        console.log(res.data.stream);
        const uptime = Date.now() - new Date(res.data.stream.created_at);
        const hours = Math.floor(uptime / 1000 / 60 / 60);
        const min = Math.floor((uptime / 1000 / 60) % 60);
        const sec = Math.floor((uptime / 1000) % 60);
        return ` 🤖Uptime: ${hours}:${(`0${min}`).slice(-2)}:${(`0${sec}`).slice(-2)}`;
      })
      .catch(console.error);
  },
};

export default commands;
