const { Command } = require('../../discord.js-commando/src');
const randomPuppy = require('random-puppy');

module.exports = class RandomNumberCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'kill-me-pls',
      aliases: ['kill-me-pls', 'killmepls', 'kill-me-please'],
      memberName: 'kill-me-pls',
      group: 'other',
      description: 'Invia un Meme Wholesome'
    });
  }

  run(message) {
    let subreddit = "wholesomememes";

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
