module.exports = {
	name: 'resume',
	description: 'Riparti',
	cooldown: 2,
	execute(message) {
		const serverQueue = message.client.queue.get(message.guild.id);
		if (serverQueue && !serverQueue.playing) {
			serverQueue.playing = true;
			serverQueue.connection.dispatcher.resume();
			return message.channel.send('▶ Ho ripartito la musica');
		}
		return message.channel.send('Bruh non stai riproducendo niente');
	}
};
