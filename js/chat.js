let chatLog = [];
let voteLog = [];

window.setInterval(() => {
    console.log("interval fired");
    if (typeof chatLog !== "undefined" && chatLog.length > 0) {
        axios.post('http://localhost:3000/api/chat', {
            data: chatLog
        })
        .then(res => {
            chatLog = [];
            console.log("Response: " + res.data)
        })
        .catch(err => console.log("Error: " + err));
    };
    if (typeof voteLog !== "undefined" && voteLog.length > 0) {
        axios.post('http://localhost:3000/api/vote', {
            data: voteLog
        })
        .then(res => {
            voteLog = [];
            console.log("Response: " + res.data)
        })
        .catch(err => console.log("Error: " + err));
    }
},
30000);

const client = new tmi.client({
    options: {
        debug: true
    },
    connection: {
        reconnect: true
    },
    identity: token, 
    channels: ["firesetter"],
});
client.on("connecting", console.log);

client.on("disconnected", console.error);

client.on('message', (channel, user, message, self) => {
    if (message[0] !== "!" && user.username !== token.username) {
        chatLog = [...chatLog, {timestamp: user["tmi-sent-ts"], user: user.username, message}];
    }
    const parsedMessage = message.trim().split(/\s+/);
    switch (parsedMessage[0]) {
        case '!veto':
            console.log("Veto SUCCESS!!");
            voteLog = [...voteLog, {trackid, downvote}];
            next();
            break;
        case '!request':
            console.log("Request SUCCESS!!");
            voteLog = [...voteLog, {trackid, upvote}];
            break;
        case '!xkcd':
            console.log("xkcd");
            parsedMessage.shift();
            const args = parsedMessage.join('%20');
            console.log(args);
            console.log(`http://localhost:3000/api/xkcd-proxy/${args}`);
            axios.get(`http://localhost:3000/api/xkcd-proxy/${args}`)
                .then(res => {
                    console.log(res);
                    client.say(channel, `${res.data.safe_title}, ${res.data.site}`)
                        .catch(console.error);
                })
                .catch(console.error);
            break;
        case '!uptime':
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
            break;
        default:
            break;
    }
});

client.connect();