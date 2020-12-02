const { Command } = require('../../discord.js-commando/src');

module.exports = class LoopQueueCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'loopqueue',
      memberName: 'loopqueue',
      aliases: ['loop-queue', 'queue-loop'],
      group: 'music',
      description: 'Ripete la queue x volte(1 per default)',
      guildOnly: true,
      args: [
        {
          key: 'numOfTimesToLoop',
          default: 1,
          type: 'integer',
          prompt: 'Quante volte vuoi loopare la queue?'
        }
      ]
    });
  }

  run(message, { numOfTimesToLoop }) {
    if (!message.guild.musicData.isPlaying) {
      message.say('Bruh non stai riproducendo niente');
      return;
    } else if (
      message.guild.musicData.isPlaying &&
      message.guild.triviaData.isTriviaRunning
    ) {
      message.say('Non puoi farlo durante il trivia!');
      return;
    } else if (
      message.member.voice.channel.id !== message.guild.me.voice.channel.id
    ) {
      message.reply(
        `Devi essere nel mio stesso canale plebeo`
      );
      return;
    } else if (message.guild.musicData.queue.length == 0) {
      message.say(`Bruh non stai riproducendo niente`);
      return;
    }
    const queue = message.guild.musicData.queue;
    let newQueue = [];
    for (let i = 0; i < numOfTimesToLoop; i++) {
      newQueue = newQueue.concat(queue);
    }
    message.guild.musicData.queue = newQueue;
    // prettier-ignore
    message.channel.send(
      `Loopata la queue ${numOfTimesToLoop} ${
        (numOfTimesToLoop == 1) ? 'volta' : 'volte'
      }`
    );
    return;
  }
};
