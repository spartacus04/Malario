module.exports = {
	name: 'pause',
	description: 'Pausa',
	cooldown: 2,
	execute(message) {
		const serverQueue = message.client.queue.get(message.guild.id);
		if (serverQueue && serverQueue.playing) {
			serverQueue.playing = false;
			serverQueue.connection.dispatcher.pause();
			return message.channel.send('⏸ Ho messo in pausa sasso');
		}
		return message.channel.send('Bruh non stai riproducendo niente');
	}
};
