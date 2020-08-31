module.exports = {
	name: 'bruh',
	description: 'bruh',
	cooldown: 2,
	execute(message) {
		return message.channel.send('Bruh');
	}
};
