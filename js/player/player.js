import axios from 'axios';

const audioElem = document.querySelector('.js-audio');
const playButton = document.querySelector('.js-play');

const setRandomTrack = () => axios.get('http://localhost:3000/api/songs/random')
    .then(res => res.json())
    .then((json) => {
      document.querySelector('.player-json').textContent = JSON.stringify(json);
      audioElem.src = `http://localhost:3000/api/songs/${json.id}`;
    });

const setNextTrack = () => {
  if (!audioElem.paused) {
    setRandomTrack().then(() => audioElem.play());
  } else {
    setRandomTrack();
  }
};

const listenerInit = () => {
  audioElem.addEventListener('playing', (...args) => {
    playButton.classList.add('is-active');
    console.log(args);
  });

  audioElem.addEventListener('ended', () => {
    setRandomTrack();
    audioElem.play();
  });

  audioElem.addEventListener('pause', () => {
    playButton.classList.remove('is-active');
  });

  playButton.addEventListener('click', () => {
    if (audioElem.paused && audioElem.canplay) { audioElem.play(); } else if (audioElem.paused) {
      audioElem.addEventListener('canplay', audioElem.play());
    }
  });

  document.querySelector('.js-pause').addEventListener('click', () => audioElem.pause());

  document.querySelector('.js-next').addEventListener('click', () => {
    if (!audioElem.paused) {
      setRandomTrack().then(() => audioElem.play());
    } else {
      setRandomTrack();
    }
  });
};


export default {
  audioElem,
  playButton,
  listenerInit,
  setRandomTrack,
  setNextTrack,


};
