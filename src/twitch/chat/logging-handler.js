const messageLoggingHandler = () => {
	const chatLog = [];
	return (channel, user, message, clearLog) => {
		if (clearLog === true) {
			chatLog.length = 0;
			return;
		}
		if (message[0] === '!') { return; }
		chatLog.push({ timestamp: user['sent-ts'], username: user.username, message });
	};
};

export default messageLoggingHandler;
