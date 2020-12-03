const fetch = require('node-fetch');
const { tenorAPI } = require('../../config.json');
const { Command } = require('../../discord.js-commando/src');

module.exports = class CatCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'shrek',
      aliases: ['shrekk', 'shrekkk'],
      group: 'other',
      memberName: 'shrek',
      description: 'shrek',
      throttling: {
        usages: 2,
        duration: 10
      }
    });
  }

  run(message) {
    fetch(`https://api.tenor.com/v1/random?key=${tenorAPI}&q=cat&limit=1`)
      .then(res => res.json())
      .then(json => message.say(json.results[0].url))
      .catch(err => {
        message.say('Bruh non ho trovato un gatto');
        return console.error(err);
      });
  }
};