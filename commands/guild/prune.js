const { Command } = require('../../discord.js-commando/src');

module.exports = class PruneCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'prune',
      aliases: ['delete-messages', 'bulk-delete'],
      description: 'Cancella gli ultimi 99 messaggi',
      group: 'guild',
      memberName: 'prune',
      guildOnly: true,
      userPermissions: ['MANAGE_CHANNELS', 'MANAGE_MESSAGES'],
      args: [
        {
          key: 'deleteCount',
          prompt: 'Quanti messaggi vuoi eliminare?',
          type: 'integer',
          // eslint-disable-next-line @getify/proper-arrows/where
          validate: deleteCount => deleteCount < 100 && deleteCount > 0
        }
      ]
    });
  }

  run(message, { deleteCount }) {
    message.channel
      .bulkDelete(deleteCount)
      .then(messages => message.say(`Cancellati ${messages.size} messaggi`))
      .catch(err => {
        console.error(err);
        return message.say(
          'Qualcosa è andato storto *Sad face*'
        );
      });
  }
};
