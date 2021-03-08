/* eslint-disable no-empty */
const { CommandoClient } = require('./discord.js-commando/src');
const { Structures } = require('discord.js');
const path = require('path');
const Cron = require("cron");
const fetch = require('node-fetch');


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
  
  if(message.channel.id == "715296368792567867"){
    if(message.content.startsWith("m.") || message.content.startsWith("l.")){
      let role = message.channel.guild.roles.cache.find(role => role.name == "Minorato mentale");
      message.member.roles.add(role);
      message.channel.send("Fra ma sei un Minorato mentale...\nNon potrai scrivere qui per la prossima ora");
      setTimeout(function() {
        message.member.roles.remove(role);
      }, 360000)
    }
  }

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

client.on('messageUpdate', (oldMessage, newMessage) => {
  if(newMessage.channel.id == "712644431622438922"){
    if(newMessage.content != "Bruh"){
      newMessage.channel.send("Bruh");
      newMessage.delete();
    }
  }
});

async function sendDailyMeme() {
	let reddit = [
    "dankmemes",
    "memes"
	]

	let channel = client.channels.cache.get(`711647597411958827`);
	let subreddit = reddit[Math.floor(Math.random() * reddit.length)];

	let subreddit = reddit[Math.floor(Math.random() * reddit.length)];

  message.channel.startTyping();
  try {
    var url = new URL(`https://www.reddit.com/r/${subreddit}.json?sort=top&t=week`),
      params = {limit: 800}
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))
    fetch(url)
    .then(body => body.json())
    .then((body) => {
      const allowed = message.channel.nsfw ? body.data.children : body.data.children.filter(post => !post.data.over_18);
      if (!allowed.length) return sg.channel.send('I meme golosi sono finiti, torna a casa ora');
      const randomnumber = Math.floor(Math.random() * allowed.length)
      const embed = new MessageEmbed();
      embed
      .setColor(0x00A2E8)
      .setTitle(allowed[randomnumber].data.title)
      .setImage(allowed[randomnumber].data.url)
      .setFooter(`Postato da u/${allowed[randomnumber].data.author} su da r/${subreddit} (${allowed[randomnumber].data.ups} upvotes)`)
      message.channel.send(embed)
    }).catch(function (err){ console.log(err)});
    
  } catch (err) {
    return console.log(err);
  }
  message.channel.stopTyping();
}

let dailymeme = new Cron.CronJob('00 00 10 * * *', sendDailyMeme);
dailymeme.start();

client.login(process.env.token);
