const commands = {
    veto: () => {
        console.log("Veto SUCCESS!!");
        voteLog = [...voteLog, {trackid, downvote}];
        next();
    },
    request: () => {
        console.log("Request SUCCESS!!");
        voteLog = [...voteLog, {trackid, upvote}]
    }, 
    xkcd: (args, channel) => {
        const searchString = args.join('%20');
        axios.get(`http://localhost:3000/api/xkcd-proxy/${searchString}`)
            .then(res => {
                console.log(res);
                client.say(channel, `${res.data.safe_title}, ${res.data.site}`)
                    .catch(console.error);
            })
            .catch(console.error);
    },
    uptime: (args, channel) => {
        console.log(channel.replace("#", ""));
        axios.request({
           url: `https://api.twitch.tv/kraken/streams/${channel.replace("#", "")}`, 
           method: "get",
           headers: {"Accept": "application/vnd.twitchtv.v3+json",
                "Client-ID": "vf9xv00vgz9ev65qvsk8suupgot5fr"}
        })
            .then(res => {
                if(res.data.stream) {
                    console.log(res.data.stream);
                    const uptime = Date.now() - new Date(res.data.stream.created_at);
                    const hours = Math.floor(uptime / 1000 / 60 / 60 );
                    const min = Math.floor(uptime / 1000 / 60 % 60);
                    const sec = Math.floor(uptime / 1000 % 60);
                    client.say(channel, `Uptime: ${hours}:${("0" + min).slice(-2)}:${("0" + sec).slice(-2)}`);
                }
            })
            .catch(console.error);
    },
}