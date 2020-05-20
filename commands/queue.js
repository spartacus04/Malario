module.exports = {
	name: 'queue',
	description: 'Controlla la coda',
	cooldown: 2,
	execute(message) {
		const serverQueue = message.client.queue.get(message.guild.id);
		if (!serverQueue) return message.channel.send('Bruh non stai riproducendo niente');
		return message.channel.send(`
__**Coda:**__

${serverQueue.songs.map(song => `**-** ${song.title}`).join('\n')}

**Ora in riproduzione:** ${serverQueue.songs[0].title}
		`);
	}
};
