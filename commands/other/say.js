const { Command } = require('../../discord.js-commando/src');

module.exports = class SayCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'say',
      aliases: ['make-me-say', 'print'],
      memberName: 'say',
      group: 'other',
      description: 'Ripeto cio che dici',
      args: [
        {
          key: 'text',
          prompt: 'Cosa vuoi farmi ripetere?',
          type: 'string'
        }
      ]
    });
  }

  run(message, { text }) {
    if(text.toLowerCase() == "malario gay"){
      return message.say("eboluigi lesbico")
    }
    return message.say(text);
  }
};
