module.exports = {
	name: 'sin',
	description: 'seno',
	usage: '[numero]',
	args: true,
	cooldown: 2,
	execute(message, args) {
		return message.channel.send('Il risultato è ' + Math.sin(args));
	}
};
