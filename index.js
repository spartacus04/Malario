require('dotenv').config();
const { readdirSync } = require('fs');
const { join } = require('path');
const MusicClient = require('./struct/Client');
const { Collection } = require('discord.js');
const Cron = require("cron");
const randomPuppy = require('random-puppy');
const client = new MusicClient({ token: process.env.DISCORD_TOKEN, prefix: process.env.DISCORD_PREFIX });

//Await for input
const commandFiles = readdirSync(join(__dirname, 'commands')).filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
	const command = require(join(__dirname, 'commands', `${file}`));
	client.commands.set(command.name, command);
}

client.once('ready', () => console.log('READY!'));
client.on('message', message => {
	if(message.channel.id != "712644431622438922"){
		if (!message.content.startsWith(client.config.prefix) || message.author.bot) return;
		const args = message.content.slice(client.config.prefix.length).split(/ +/);
		const commandName = args.shift().toLowerCase();
		const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
		if (!command) return;
		if (command.guildOnly && message.channel.type !== 'text') return message.reply('I can\'t execute that command inside DMs!');
		if (command.args && !args.length) {
			let reply = `Dimmi piu robbe, ${message.author}!`;
			if (command.usage) reply += `\nL'uso corretto sarebbe: \`${client.config.prefix}${command.name} ${command.usage}\``;
			return message.channel.send(reply);
		}
		if (!client.cooldowns.has(command.name)) {
		client.cooldowns.set(command.name, new Collection());
		}
		const now = Date.now();
		const timestamps = client.cooldowns.get(command.name);
		const cooldownAmount = (command.cooldown || 3) * 1000;
		if (timestamps.has(message.author.id)) {
			const expirationTime = timestamps.get(message.author.id) + cooldownAmount;
			if (now < expirationTime) {
				const timeLeft = (expirationTime - now) / 1000;
				return message.reply(`Momento momento momento. Aspetta ${timeLeft.toFixed(1)} secondi prima di eseguire \`${command.name}\``);
			}
		}
		timestamps.set(message.author.id, now);
		setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

		try {
			command.execute(message, args, client);
		}
		catch (error) {
		console.error(error);
		message.reply('there was an error trying to execute that command!');
		}
	}
	else{
		if(message.member.id != "711871380622409730"){
			message.channel.send("Bruh");
			message.delete();
		}
	}
});

//Daily Tasks

function mementos() {
	let reddit = [
		"ShitPostCrusaders",
		"memes"
	]

	let channel = client.channels.cache.get(`711647597411958827`);
	let subreddit = reddit[Math.floor(Math.random() * reddit.length)];

	channel.startTyping();

	randomPuppy(subreddit).then(async url => {
			await channel.send({
				files: [{
					attachment: url,
					name: 'meme.png'
				}]
			}).then(() => channel.stopTyping());
	}).catch(err => console.error(err));
}

let dailymeme = new Cron.CronJob('00 00 10 * * *', mementos);
dailymeme.start();

client.login(client.config.token);
