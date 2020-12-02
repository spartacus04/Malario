const { Command } = require('../../discord.js-commando/src');

module.exports = class SkipToCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'skipto',
      memberName: 'skipto',
      group: 'music',
      description:
        'Salta fino a una canzone nella queue',
      guildOnly: true,
      args: [
        {
          key: 'songNumber',
          prompt:
            "Qual'è il numero della canzone",
          type: 'integer'
        }
      ]
    });
  }

  run(message, { songNumber }) {
    if (songNumber < 1 && songNumber >= message.guild.musicData.queue.length) {
      return message.reply('Inserisci un numero valido');
    }
    var voiceChannel = message.member.voice.channel;
    if (!voiceChannel) return message.reply('Devi essere in un canale plebeo');

    if (
      typeof message.guild.musicData.songDispatcher == 'undefined' ||
      message.guild.musicData.songDispatcher == null
    ) {
      return message.reply('Bruh non stai riproducendo niente');
    } else if (voiceChannel.id !== message.guild.me.voice.channel.id) {
      message.reply(
        `Devi essere nel mio stesso canale plebeo`
      );
      return;
    }

    if (message.guild.musicData.queue < 1)
      return message.say('Bruh non stai riproducendo niente');

    message.guild.musicData.queue.splice(0, songNumber - 1);
    message.guild.musicData.songDispatcher.end();
    return;
  }
};
