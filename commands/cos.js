module.exports = {
	name: 'cos',
	description: 'coseno',
	usage: '[numero]',
	args: true,
	cooldown: 2,
	execute(message, args) {
		return message.channel.send('Il risultato è ' + Math.cos(args));
	}
};
