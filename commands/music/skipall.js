const { Command } = require('../../discord.js-commando/src');

module.exports = class SkipAllCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'skipall',
      aliases: ['skip-all'],
      memberName: 'skipall',
      group: 'music',
      description: 'Salta tutte le canzoni',
      guildOnly: true
    });
  }

  run(message) {
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
    if (!message.guild.musicData.queue)
      return message.say('Bruh non stai riproducendo niente');
    message.guild.musicData.queue.length = 0; // clear queue
    message.guild.musicData.songDispatcher.end();
    return;
  }
};
