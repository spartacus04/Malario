const { CategoryChannel } = require('discord.js');
const { Command } = require('../../discord.js-commando/src');

module.exports = class RandomNumberCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'shrek',
      aliases: ['shrek', 'shrekkk'],
      memberName: 'shrek',
      group: 'other',
      description: 'è ovvio dai'
    });
  }

  run(message) {
    
    try{
      const play = require("../music/play");
      const playcommand = new play(message.client);
      playcommand.run(message, { query : "https://youtu.be/_pOUJKK8o4Q"} );
    }
    catch(e){
      console.error(e);
    }
     
  }
};
