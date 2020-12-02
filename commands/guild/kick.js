const { Command } = require('../../discord.js-commando/src');
const { MessageEmbed } = require('discord.js');

module.exports = class KickCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'kick',
      aliases: ['kick-member', 'throw'],
      memberName: 'kick',
      group: 'guild',
      description: 'Espello esteban',
      guildOnly: true,
      userPermissions: ['MANAGE_MESSAGES', 'KICK_MEMBERS', 'BAN_MEMBERS'],
      clientPermissions: ['MANAGE_MESSAGES', 'KICK_MEMBERS', 'BAN_MEMBERS'],
      args: [
        {
          key: 'userToKick',
          prompt:
            "Menziona l'utente oppure dammi l'ID",
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

  async run(message, { userToKick, reason }) {
    const extractNumber = /\d+/g;
    const userToKickID = userToKick.match(extractNumber)[0];
    const user =
      message.mentions.members.first() ||
      (await message.guild.members.fetch(userToKickID));
    if (user == undefined)
      return message.channel.send('Dammi una persona che esiste sasso');
    user
      .kick(reason)
      .then(() => {
        //message.say(`Kicked ${userToKick} reason: ${reason}`)
        const kickEmbed = new MessageEmbed()
          .addField('Espulso:', userToKick)
          .addField('Motivo:', reason)
          .setColor('#420626');
        message.channel.send(kickEmbed);
      })
      .catch(err => {
        message.say(
          'Qualcosa non va sas, probabile che non ho i permessi'
        );
        return console.error(err);
      });
  }
};
