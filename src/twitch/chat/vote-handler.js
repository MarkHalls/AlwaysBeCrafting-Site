import apiPost from 'api/api-post';

const messageVoteHandler = () => {
	const voteLog = [];
	window.setInterval(() => {
		if (typeof voteLog !== 'undefined' && voteLog.length > 0) {
			apiPost([...voteLog]);
		}
	});
	return (trackID, upvote, downvote) => {
		if (trackID < 1) { return; }
		voteLog.push({ track_id: trackID, upvote, downvote });
	};
};

export default messageVoteHandler;
