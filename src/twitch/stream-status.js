import krakenApi from './twitchapi';

const setStreamStatus = (channel) => {
	krakenApi.getStreamsChannel(channel)
    .then((data) => {
	const stream = document.querySelectorAll('.stream-status')[0];
	if (data.stream) {
		stream.classList.add('live');
		stream.textContent = 'Live';
	} else {
		stream.classList.remove('live');
		stream.textContent = 'Offline';
	}
})
    .catch(console.error);
};
export default setStreamStatus;
