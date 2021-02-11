const { Command } = require('../../discord.js-commando/src');

module.exports = class RandomNumberCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'morshu',
      aliases: ['morshu'],
      memberName: 'morshu',
      group: 'other',
      description: 'Invia morhsu beatbox'
    });
  }

  run(message) {
    message.channel.send({
        files: [{
            attachment: "https://www.dropbox.com/s/j7nbdx5pzn1u75c/Morshu-Beatbox.gif?dl=1",
            name: 'morshu.gif'
        }]
    })
  }
};
