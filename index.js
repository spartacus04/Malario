/* eslint-disable no-empty */
const { CommandoClient } = require('./discord.js-commando/src');
const { Structures, Message } = require('discord.js');
const path = require('path');
const Cron = require("cron");
const randomPuppy = require('random-puppy');

Structures.extend('Guild', function(Guild) {
  class MusicGuild extends Guild {
    constructor(client, data) {
      super(client, data);
      this.musicData = {
        queue: [],
        isPlaying: false,
        nowPlaying: null,
        songDispatcher: null,
        volume: 1
      };
      this.triviaData = {
        isTriviaRunning: false,
        wasTriviaEndCalled: false,
        triviaQueue: [],
        triviaScore: new Map()
      };
    }
  }
  return MusicGuild;
});

const client = new CommandoClient({
  commandPrefix: "m.",
  owner: "465954478852669460" // value comes from config.json
});

client.registry
  .registerDefaultTypes()
  .registerGroups([
    ['music', 'Musica'],
    ['gifs', 'Gif'],
    ['other', 'Altro'],
    ['guild', 'Comandi del server']
  ])
  .registerDefaultGroups()
  .registerDefaultCommands({
    eval: false,
    prefix: false,
    commandState: false
  })
  .registerCommandsIn(path.join(__dirname, 'commands'));

client.once('ready', () => {
  console.log('Ready!');
  client.user.setActivity(`Onlyfans`, {
    type: 'WATCHING',
    url: 'https://youtu.be/pnHg892Xwpk'
  });
});

client.on('message', message => {
	if(message.channel.id == "712644431622438922"){
    if(message.content != "Bruh"){
      message.channel.send("Bruh");
      message.delete();
    }
  }
  else{
    if(message.content.toLowerCase() == "malario gay"){
      message.channel.send("No tu");
    }
  }
});

client.on('voiceStateUpdate', async (___, newState) => {
  if (
    newState.member.user.bot &&
    !newState.channelID &&
    newState.guild.musicData.songDispatcher &&
    newState.member.user.id == client.user.id
  ) {
    newState.guild.musicData.queue.length = 0;
    newState.guild.musicData.songDispatcher.end();
    return;
  }
  if (
    newState.member.user.bot &&
    newState.channelID &&
    newState.member.user.id == client.user.id &&
    !newState.selfDeaf
  ) {
    newState.setSelfDeaf(true);
  }
});

client.on('guildMemberAdd', member => {
  const channel = member.guild.channels.cache.find(ch => ch.name === 'spam-nuovi-arrivati'); // change this to the channel name you want to send the greeting to
  if (!channel) return;
  channel.send(`Welcome ${member}!`);
});

function mementos() {
	let reddit = [
    "memes",
    "dankmemes"
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

client.login(process.env.token);
