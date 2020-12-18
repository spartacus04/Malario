const fetch = require('node-fetch');
const { Command } = require('../../discord.js-commando/src');
const { MessageEmbed } = require('discord.js');

module.exports = class ChuckNorrisCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'chucknorris',
      aliases: ['chuckfact', 'norris', 'chuck-norris'],
      group: 'other',
      memberName: 'chucknorris',
      description: 'Ti dice cose su Chuck Norris',
      throttling: {
        usages: 1,
        duration: 6
      }
    });
  }

  run(message) {
    fetch('https://api.chucknorris.io/jokes/random')
      .then(res => res.json())
      .then(json => {
        const embed = new MessageEmbed()
          .setColor('#E41032')
          .setTitle('Fatto su Chuck Norris')
          .setDescription(json.value)
          .setURL('https://api.chucknorris.io');
        return message.say(embed);
      })
      .catch(err => {
        message.say("C'è stato un errore, chuck sta indagando");
        return console.error(err);
      });
  }
};
