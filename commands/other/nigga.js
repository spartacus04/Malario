const { Command } = require('../../discord.js-commando/src');

module.exports = class RandomNumberCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'nigga',
      aliases: ['nigga'],
      memberName: 'nigga',
      group: 'other',
      description: 'Invia un N-Word Pass'
    });
  }

  run(message) {
    message.channel.send({
        files: [{
            attachment: "https://i.redd.it/adswy1g5mh631.jpg",
            name: 'mword.png'
        }]
    })
  }
};
