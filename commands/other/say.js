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
    let bababui = message;
    if(text.toLowerCase() == "malario gay"){
      bababui = "eboluigi lesbico";
    }
    else if(text.toLowerCase() == "esteban gay"){
      bababui = "non posso dire altro se non concordare";
    }
    if(text.toLowerCase().startsWith("/tts ")){
      bababui = text.replace("/tts ", "");
      return message.channel.send(bababui.replace("\n", " "), { tts: true });
    }
    else{
      return message.say(bababui);
    }
  }
};
