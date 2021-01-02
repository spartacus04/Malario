const { Command } = require('../../discord.js-commando/src');

module.exports = class LeaveCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'leave',
      aliases: ['end', 'stop', 'zittatroiaccia', 'zitta-troiaccia'],
      group: 'music',
      memberName: 'leave',
      guildOnly: true,
      description: 'Lascia un canale vocale e cancella la queue'
    });
  }

  run(message) {
    var voiceChannel = message.member.voice.channel;
    if (!voiceChannel) {
      message.reply('Devi essere in un canale plebeo');
      return;
    } else if (
      typeof message.guild.musicData.songDispatcher == 'undefined' ||
      message.guild.musicData.songDispatcher == null
    ) {
      message.reply('Bruh non stai riproducendo niente');
      return;
    } else if (voiceChannel.id !== message.guild.me.voice.channel.id) {
      message.reply(
        `Devi essere nel mio stesso canale plebeo`
      );
      return;
    } else if (!message.guild.musicData.queue) {
      message.reply('Bruh non stai riproducendo niente');
      return;
    } else if (message.guild.musicData.songDispatcher.paused) {
      message.guild.musicData.songDispatcher.resume();
      message.guild.musicData.queue.length = 0;
      setTimeout(() => {
        message.guild.musicData.songDispatcher.end();
      }, 100);
      return;
    } else {
      message.guild.musicData.queue.length = 0;
      message.guild.musicData.songDispatcher.end();
      return;
    }
  }
};
