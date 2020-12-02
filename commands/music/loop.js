const { Command } = require('../../discord.js-commando/src');

module.exports = class LoopCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'loop',
      group: 'music',
      memberName: 'loop',
      guildOnly: true,
      description: 'Loopa una canzone',
      args: [
        {
          key: 'numOfTimesToLoop',
          default: 1,
          type: 'integer',
          prompt: "Quante volte dev'essere ripetuta?"
        }
      ]
    });
  }

  run(message, { numOfTimesToLoop }) {
    if (!message.guild.musicData.isPlaying) {
      return message.say('Bruh non stai riproducendo niente');
    } else if (
      message.guild.musicData.isPlaying &&
      message.guild.triviaData.isTriviaRunning
    ) {
      return message.say('Non puoi farlo durante il trivia!');
    } else if (
      message.member.voice.channel.id !== message.guild.me.voice.channel.id
    ) {
      message.reply(
        `Devi essere nel mio stesso canale plebeo`
      );
      return;
    }

    for (let i = 0; i < numOfTimesToLoop; i++) {
      message.guild.musicData.queue.unshift(message.guild.musicData.nowPlaying);
    }

    // prettier-ignore
    message.channel.send(
      `${message.guild.musicData.nowPlaying.title} verrà loopato per ${numOfTimesToLoop} ${
        (numOfTimesToLoop == 1) ? 'volta' : 'volte'
      }`
    );
    return;
  }
};
