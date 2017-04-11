import axios from 'axios';
import config from 'config.json';

const postChatLog = (chatLog) => {
	axios.post(`http://${config.api.server}:${config.api.port}/api/chat`, {
		data: chatLog,
	})
	.then(res => console.log(res.data))
	.catch(console.error);
};

export default {
	postChatLog,
};
