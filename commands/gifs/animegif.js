const fetch = require('node-fetch');
const { tenorAPI } = require('../../config.json');
const { Command } = require('../../discord.js-commando/src');

module.exports = class AnimegifCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'animegif',
      group: 'gifs',
      aliases: ['anime-gif', 'anime-gifs'],
      memberName: 'animegif',
      description:
        'io ti do una gif fine sos',
      throttling: {
        usages: 10,
        duration: 4
      }
    });
  }

  run(message) {
    fetch(`https://api.tenor.com/v1/random?key=${tenorAPI}&q=anime&limit=1`)
      .then(res => res.json())
      .then(json => message.say(json.results[0].url))
      .catch(err => {
        message.say('Non ho trovato una gif <:tasbien:712705754678951987>');
        console.error(err);
        return;
      });
  }
};
