const { Command } = require('../../discord.js-commando/src');


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
        const voiceChannel = message.member.voice.channel;
        if (!voiceChannel) return message.reply('Devi essere in un canale plebeo');
        
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
