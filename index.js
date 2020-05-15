const Discord = require('discord.js');
const client = new Discord.Client();

client.once('ready', () => {
	console.log('Ready!');
});

client.on('message', message => {
    if (message.content.toLowerCase() === '!hello') {
        message.channel.send(`Hello ${message.member.displayName}!`);
    }
});

client.login(process.env.BOT_TOKEN);