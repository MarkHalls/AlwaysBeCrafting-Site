const messageVoteHandler = () => {
	const voteLog = [];
	return (trackID, upvote, downvote, clearLog) => {
		if (clearLog === true) {
			voteLog.length = 0;
			return;
		}
		if (trackID < 1) { return; }
		voteLog.push({ track_id: trackID, upvote, downvote });
	};
};

export default messageVoteHandler;
