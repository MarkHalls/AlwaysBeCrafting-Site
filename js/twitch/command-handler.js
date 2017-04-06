import commands from './commands';

const commandHandler = () => (
  (channel, user, message) => {
    if (message[0] === '!') { return undefined; }
    const splitMessage = message.trim().split(/\s+/);
    const commandName = splitMessage.shift().replace('!', '');
    const command = commands[commandName];
    return command(channel, user, splitMessage);
  }
);

export default commandHandler;
