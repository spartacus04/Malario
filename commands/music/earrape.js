const { Command } = require('../../discord.js-commando/src');
const Cron = require("cron");


module.exports = class LeaveCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'earrape',
      aliases: ['earrape'],
      group: 'music',
      memberName: 'earrape',
      guildOnly: true,
      description: 'EARRAPE'
    });
  }

  run(message) {
    try{
        const volume = require("./volume");
        const volumecommand = new volume(message.client);
        volumecommand.run(message, { wantedVolume : 69420} );
        setTimeout(function(){ volumecommand.run(message, { wantedVolume : 1} ); }, 3000);
      }
      catch(e){
        console.error(e);
      }
  }
};
