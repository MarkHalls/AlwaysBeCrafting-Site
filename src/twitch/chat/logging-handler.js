import apiPost from 'api/api-post';

const messageLoggingHandler = () => {
	const chatLog = [];
	window.setInterval(() => {
		console.log('interval fired');
		if (typeof chatLog !== 'undefined' && chatLog.length > 0) {
			apiPost.postChatLog([...chatLog]);
			chatLog.length = 0;
		}
	}, 3000);
	return async (channel, user, message) => {
		if (message[0] === '!') { return; }
		await chatLog.push({ timestamp: user['sent-ts'], username: user.username, message });
	};
};

export default messageLoggingHandler;
