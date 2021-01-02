const { Command } = require('../../discord.js-commando/src');
const fetch = require('node-fetch');
const tenorAPI = process.env.tenorAPI;

module.exports = class RandomNumberCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'calabria',
      aliases: ['calabria', 'monkey'],
      memberName: 'calabria',
      group: 'other',
      description: 'Invia un immagine di un calabrese'
    });
  }

  run(message) {
    fetch(`https://api.tenor.com/v1/random?key=${tenorAPI}&q=monkey&limit=1`)
      .then(res => res.json())
      .then(json => message.say(json.results[0].url))
      .catch(err => {
        message.say('Non ho trovato una gif <:tasbien:712705754678951987>');
        console.error(err);
        return;
      });
  }
};
