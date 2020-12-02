const { Command } = require('../../discord.js-commando/src');

module.exports = class SkipCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'skip',
      aliases: ['skip-song', 'advance-song'],
      memberName: 'skip',
      group: 'music',
      description: 'Salta la canzone',
      guildOnly: true
    });
  }

  run(message) {
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
    } else if (message.guild.triviaData.isTriviaRunning) {
      return message.reply(`Non puoi farlo durante il trivia!`);
    }
    message.guild.musicData.songDispatcher.end();
  }
};
