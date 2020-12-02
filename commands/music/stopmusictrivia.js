const { Command } = require('../../discord.js-commando/src');

module.exports = class StopMusicTriviaCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'stoptrivia',
      aliases: [
        'stopmusictrivia',
        'skiptrivia',
        'endtrivia',
        'stoptrivia'
      ],
      memberName: 'stop-trivia',
      group: 'music',
      description: 'Finisce la trivia',
      guildOnly: true,
      clientPermissions: ['SPEAK', 'CONNECT']
    });
  }
  run(message) {
    if (!message.guild.triviaData.isTriviaRunning)
      return message.say('Bruh non stai facendo alcun trivia');

    if (message.guild.me.voice.channel !== message.member.voice.channel) {
      return message.say("Devi essere nel mio stesso canale plebeo");
    }

    if (!message.guild.triviaData.triviaScore.has(message.author.username)) {
      return message.say(
        'Devi partecipare nella trivia per finirla'
      );
    }

    message.guild.triviaData.triviaQueue.length = 0;
    message.guild.triviaData.wasTriviaEndCalled = true;
    message.guild.triviaData.triviaScore.clear();
    message.guild.musicData.songDispatcher.end();
    return;
  }
};
