const krakenApi = (url) => 
    axios.request({
        url: url, 
        method: "get",
        headers: {"Accept": "application/vnd.twitchtv.v3+json",
            "Client-ID": config.twitch_client_ID}
    });