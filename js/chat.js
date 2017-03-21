const oauth = () => JSON.parse(token);
const identity = oauth();
const client = new tmi.client({
    options: {
        debug: true
    },
    connection: {
        reconnect: true
    },
    identity,
    channels: ["firesetter"],
    // channels: ["alwaysbecrafting, firesetter"],
    // logger: {
    //     // unnecessary logger
    //     info:  log => console.log("info: " + log),
    //     warn:  log => console.log("warn: " + log),
    //     error: log => console.log("error: " + log),
    // }
});

client.on('message', (channel, user, message, self) => {
    const parsedMessage = message.trim().split(/\s+/);
    switch (parsedMessage[0]) {
        case '!veto':
            console.log("Veto SUCCESS!!");
            break;
        case '!request':
            console.log("Request SUCCESS!!");
            break;
        default:
            break;
    }
});

// Connect the client to the server..
client.connect();