const fetch = require('node-fetch');
const tenorAPI = process.env.tenorAPI;
const { Command } = require('../../discord.js-commando/src');

module.exports = class CatCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'cat',
      aliases: ['cat-pic', 'cats'],
      group: 'other',
      memberName: 'cat',
      description: 'Risponde con un immagine di un gatto',
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
