const audio = document.querySelectorAll(".audio")[0];
const play = document.querySelectorAll(".play")[0];

audio.addEventListener("playing", (...args) => { 
    play.classList.add("active");
    console.log(args); });

audio.addEventListener("ended", () => {
    randomTrack();
    audio.play();
});

audio.addEventListener("pause", () => {
    play.classList.remove("active");
});

play.addEventListener("click", () => {
    if (audio.paused && audio.canplay) { audio.play(); }
    else if (audio.paused) { audio.addEventListener("canplay", audio.play()) 
    };
});

document.querySelectorAll(".pause")[0].addEventListener("click", () => audio.pause());

document.querySelectorAll(".next")[0].addEventListener("click", () => {
    if (!audio.paused) {
        randomTrack().then(() => audio.play());
    }else {
        randomTrack();
    }
});

const randomTrack = () => window.fetch("http://localhost:3000/api/songs/random")
        .then(res => res.json())
        .then(json => {
            document.querySelectorAll(".audio-json")[0].textContent=JSON.stringify(json)
            audio.src=`http://localhost:3000/api/songs/${json.id}`;
        });

const next = () => {
    if (!audio.paused) {
        randomTrack().then(() => audio.play());
    }else {
        randomTrack();
    }
};

window.fetch("http://localhost:3000/api/songs/random")
    .then(res => res.json())
    .then(json => {
        document.querySelectorAll(".audio-json")[0].textContent=JSON.stringify(json)
        audio.src=`http://localhost:3000/api/songs/${json.id}`;
    });
