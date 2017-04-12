import axios from 'axios';
import config from 'config.json';

const getAllPlaylists = () => {
	return axios.get(`http://${config.api.server}:${config.api.port}/api/playlists`);
};

const getPlaylist = (playlistID) => {
	return axios.get(`http://${config.api.server}:${config.api.port}/api/playlists/${playlistID}`);
};

const getRandomTrack = () => {
	return axios.get(`http://${config.api.server}:${config.api.port}/api/songs/random`);
};

const getSongByID = (songID) => {
	return axios.get(`http://${config.api.server}:${config.api.port}/api/songs/${songID}`);
};

const getXKCD = (searchString) => {
	console.log('xkcd');
	return axios.get(`http://${config.api.server}:${config.api.port}/api/xkcd-proxy/${searchString}`);
};

export default {
	getAllPlaylists,
	getPlaylist,
	getRandomTrack,
	getSongByID,
	getXKCD,
};
