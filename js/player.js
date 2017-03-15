document.getElementById("play").addEventListener("click", () => {
    console.log("play");
    document.getElementsByTagName("audio")[0].play();
    console.log(document.getElementsByTagName("audio")[0].paused);
});
document.getElementById("pause").addEventListener("click", () => document.getElementsByTagName("audio")[0].pause());
