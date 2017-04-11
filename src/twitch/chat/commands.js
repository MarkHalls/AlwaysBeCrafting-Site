import kraken from 'twitch/twitchapi';
import apiGet from 'api/api-get';
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
		console.log('command xkcd');
		const searchString = args.join('%20');
		return apiGet.getXKCD(searchString)
      .then(res => ` 🤖 ${res.data.safe_title}, ${res.data.site}`)
      .catch(console.error);
	},
	uptime: async channel => (
		kraken.getStreamsChannel(channel.replace('#', ''))
			.then((res) => {
				if (!res.stream) { return; }
				console.log(res.stream);
				const uptime = Date.now() - new Date(res.stream.created_at);
				const hours = Math.floor(uptime / 1000 / 60 / 60);
				const min = Math.floor((uptime / 1000 / 60) % 60);
				const sec = Math.floor((uptime / 1000) % 60);
				return `🤖 Uptime: ${hours}:${(`0${min}`).slice(-2)}:${(`0${sec}`).slice(-2)}`;
			})
			.catch(console.error)
	),
};
export default commands;
