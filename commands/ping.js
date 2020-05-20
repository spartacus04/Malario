module.exports = {
	name: 'ping',
	description: 'Test',
	cooldown: 2,
	execute(message) {
		return message.channel.send(`Pong`);
	}
};
