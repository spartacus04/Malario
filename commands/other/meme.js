const { Command } = require('../../discord.js-commando/src');
const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');

module.exports = class RandomNumberCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'meme',
      aliases: ['meme'],
      memberName: 'meme',
      group: 'other',
      description: 'Invia un Meme'
    });
  }

  async run(message) {
    let reddit = [
        "ShitPostCrusaders",
        "memes",
        "dankmemes"
    ]

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
};
