krakenApi(`https://api.twitch.tv/kraken/streams/${config.channel}`)
    .then(res => {
        const stream = document.querySelectorAll(".stream-status")[0];
        if(res.data.stream) {
            stream.classList.add("live");
            stream.textContent = "Live";
        } else {
            stream.classList.remove("live");
            stream.textContent = "Offline";
        }
    })
    .catch(console.error);