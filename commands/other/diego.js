const { Command } = require('../../discord.js-commando/src');

module.exports = class RandomNumberCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'diego',
      aliases: ['diego'],
      memberName: 'diego',
      group: 'other',
      description: 'Invia un diego'
    });
  }

  run(message) {
    message.channel.send({
        files: [{
            attachment: "https://www.dropbox.com/s/kj2felicizvebkg/WhatsApp%20Image%202020-09-03%20at%2010.58.01.jpeg?dl=1",
            name: 'diego.png'
        }]
    })
  }
};