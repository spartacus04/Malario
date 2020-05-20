module.exports = {
	name: 'stop',
	description: 'Stop',
	cooldown: 2,
	execute(message) {
		const { channel } = message.member.voice;
		if (!channel) return message.channel.send('Devi essere in un canale plebeo');
		const serverQueue = message.client.queue.get(message.guild.id);
		if (!serverQueue) return message.channel.send('Bruh non stai riproducendo niente');
		serverQueue.songs = [];
		serverQueue.connection.dispatcher.end('Stop command has been used!');
	}
};
