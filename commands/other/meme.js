const { Command } = require('../../discord.js-commando/src');
const randomPuppy = require('random-puppy');

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

  run(message) {
    let reddit = [
        "ShitPostCrusaders",
        "memes"
    ]

    let subreddit = reddit[Math.floor(Math.random() * reddit.length)];

    message.channel.startTyping();

    randomPuppy(subreddit).then(async url => {
            await message.channel.send({
                files: [{
                    attachment: url,
                    name: 'meme.png'
                }]
            }).then(() => message.channel.stopTyping());
    }).catch(err => console.error(err));
  }
};
