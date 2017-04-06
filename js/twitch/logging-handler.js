const messageLoggingHandler = () => {
  let chatLog = [];
  return (channel, user, message) => {
    if (message[0] === '!') { return; }
    chatLog = [...chatLog, { timestamp: user['sent-ts'], username: user.username, message }];
  };
};

export default messageLoggingHandler;
