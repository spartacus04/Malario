const { CategoryChannel } = require('discord.js');
const { Command } = require('../../discord.js-commando/src');

module.exports = class RandomNumberCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'dorime',
      aliases: ['dorime'],
      memberName: 'dorime',
      group: 'other',
      description: 'è ovvio dai'
    });
  }

  run(message) {
    
    try{
      const play = require("../music/play");
      const playcommand = new play(message.client);
      playcommand.run(message, { query : "https://youtu.be/6xUnSVTh8fI"} );
    }
    catch(e){
      console.error(e);
    }
     
  }
};
