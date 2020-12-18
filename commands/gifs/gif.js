const fetch = require('node-fetch');
const tenorAPI = process.env.tenorAPI;
const { Command } = require('../../discord.js-commando/src');

module.exports = class GifCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'gif',
      group: 'gifs',
      aliases: ['search-gif', 'search-gifs'],
      memberName: 'gif',
      description: 'Dammi un nome e ti do una gif, un anima per un anima',
      throttling: {
        usages: 10,
        duration: 4
      },
      args: [
        {
          key: 'text',
          prompt: 'Quale gif vuoi guardare',
          type: 'string',
          // eslint-disable-next-line @getify/proper-arrows/where
          validate: text => text.length < 50
        }
      ]
    });
  }

  run(message, { text }) {
    fetch(`https://api.tenor.com/v1/random?key=${tenorAPI}&q=${text}&limit=1`)
      .then(res => res.json())
      .then(json => message.say(json.results[0].url))
      .catch(err => {
        message.say('Non ho trovato una gif <:tasbien:712705754678951987>');
        console.error(err);
        return;
      });
  }
};
