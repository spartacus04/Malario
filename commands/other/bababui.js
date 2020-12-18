const { Command } = require('../../discord.js-commando/src');

module.exports = class RandomNumberCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'bababui',
      aliases: ['bababui'],
      memberName: 'bababui',
      group: 'other',
      description: 'Invia un bababui'
    });
  }

  run(message) {
    message.channel.send({
        files: [{
            attachment: "https://www.dropbox.com/s/5nxatxw1zl0w6cv/bababui.jpg?dl=1",
            name: 'diego.png'
        }]
    })
  }
};
