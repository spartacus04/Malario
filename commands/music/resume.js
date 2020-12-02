const { Command } = require('../../discord.js-commando/src');

module.exports = class ResumeCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'resume',
      aliases: ['resume-song', 'continue'],
      memberName: 'resume',
      group: 'music',
      description: 'riprendi la canzone in pausa',
      guildOnly: true
    });
  }

  run(message) {
    var voiceChannel = message.member.voice.channel;
    if (!voiceChannel) return message.reply('Devi essere in un canale plebeo');

    if (
      typeof message.guild.musicData.songDispatcher == 'undefined' ||
      message.guild.musicData.songDispatcher === null
    ) {
      return message.reply('Bruh non stai riproducendo niente');
    } else if (voiceChannel.id !== message.guild.me.voice.channel.id) {
      message.reply(
        `Devi essere nel mio stesso canale plebeo`
      );
      return;
    }

    message.say('Canzone ripresa :play_pause:');

    message.guild.musicData.songDispatcher.resume();
  }
};
