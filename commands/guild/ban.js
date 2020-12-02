const { Command } = require('../../discord.js-commando/src');
const { MessageEmbed } = require('discord.js');

module.exports = class BanCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'ban',
      aliases: ['ban-member', 'ban-hammer'],
      memberName: 'ban',
      group: 'guild',
      description: 'Banno Esteban',
      guildOnly: true,
      userPermissions: ['MANAGE_MESSAGES', 'KICK_MEMBERS', 'BAN_MEMBERS'],
      clientPermissions: ['MANAGE_MESSAGES', 'KICK_MEMBERS', 'BAN_MEMBERS'],
      args: [
        {
          key: 'userToBan',
          prompt:
            "Menziona l\'utente oppure dammi l'ID",
          type: 'string'
        },
        {
          key: 'reason',
          prompt: 'Motivo',
          type: 'string'
        }
      ]
    });
  }

  async run(message, { userToBan, reason }) {
    const extractNumber = /\d+/g;
    const userToBanID = userToBan.match(extractNumber)[0];
    const user =
      message.mentions.members.first() ||
      (await message.guild.members.fetch(userToBanID));
    if (user == undefined)
      return message.channel.send('Dammi una persona che esiste sasso');
    user
      .ban(reason)
      .then(() => {
        const banEmbed = new MessageEmbed()
          .addField('Bannato:', userToBan)
          .addField('Motivo', reason)
          .setColor('#420626');
        message.channel.send(banEmbed);
      })
      .catch(err => {
        message.say(
          'Qualcosa non va sas, probabile che non ho i permessi'
        );
        return console.error(err);
      });
  }
};
