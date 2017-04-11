import axios from 'axios';
import config from 'config.json';

const getAllPlaylists = () => {
	axios.get(`http://${config.api.server}:${config.api.port}/playlists`)
		.then(console.log);
};

const getPlaylist = (playlistID) => {
	axios.get(`http://${config.api.server}:${config.api.port}/playlists/${playlistID}`)
		.then(console.log);
};

const getRandomTrack = () => {
	axios.get(`http://${config.api.server}:${config.api.port}/songs/random`)
		.then(console.log);
};

const getSongByID = (songID) => {
	axios.get(`http://${config.api.server}:${config.api.port}/songs/${songID}`)
		.then(console.log);
};

const getXKCD = (searchString) => {
	console.log('xkcd');
	axios.get(`http://${config.api.server}:${config.api.port}/xkcd-proxy/${searchString}`);
};

export default {
	getAllPlaylists,
	getPlaylist,
	getRandomTrack,
	getSongByID,
	getXKCD,
};
