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
client.on("join", () => client.say("firesetter", "yo dawg, connected bro").catch(console.error));

client.on("disconnected", console.error);

client.on('message', (channel, user, message, self) => {
    if (message[0] !== "!") {
        console.log("logged chat");
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
                    client.say("firesetter", `${res.data.safe_title}, ${res.data.site}`)
                        .catch(console.error);
                })
                .catch(console.error);

            // axios.get(`http://www.google.com/search?q=xkcd%20${args}&btnI`)
            // .then(res => {
            //     console.log(res)
            //     })
            // .catch(err => console.log("Error: " + err));
            // client.say("channel", "Your message");
            break;
        default:
            break;
    }
});

// Connect the client to the server..
client.connect();