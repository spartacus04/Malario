module.exports = {
	name: 'help',
	description: 'Aiuto',
	cooldown: 2,
	execute(message) {
		
		return message.channel.send('Bruh non stai riproducendo niente');
	}
};
