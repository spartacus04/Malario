const { Command } = require('../../discord.js-commando/src');

module.exports = class VolumeCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'volume',
      aliases: ['change-volume'],
      group: 'music',
      memberName: 'volume',
      guildOnly: true,
      description: 'Volume',
      throttling: {
        usages: 1,
        duration: 5
      },
      args: [
        {
          key: 'wantedVolume',
          prompt: 'A che volume?',
          type: 'float'
        }
      ]
    });
  }

  run(message, { wantedVolume }) {
    const voiceChannel = message.member.voice.channel;
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
    const volume = wantedVolume / 2;
    message.guild.musicData.volume = volume;
    message.guild.musicData.songDispatcher.setVolume(volume);
    message.say(`Ho messo il volume a: ${wantedVolume}`);
  }
};
