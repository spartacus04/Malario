module.exports = {
	name: 'np',
	description: 'Controlla cosa stai riproducendo',
	cooldown: 2,
	execute(message) {
		const serverQueue = message.client.queue.get(message.guild.id);
		if (!serverQueue) return message.channel.send('Bruh non stai riproducendo niente');
		return message.channel.send(`🎶 In riproduzione: **${serverQueue.songs[0].title}**`);
	}
};
