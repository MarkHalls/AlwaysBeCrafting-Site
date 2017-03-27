const oauth = () => JSON.parse(token);
const identity = oauth();

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
    identity,
    channels: ["firesetter"],
});

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
        default:
            break;
    }
});

// Connect the client to the server..
client.connect();