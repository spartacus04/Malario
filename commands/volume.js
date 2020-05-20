module.exports = {
	name: 'volume',
	description: 'Volume',
	cooldown: 2,
	execute(message, args) {
		const { channel } = message.member.voice;
		if (!channel) return message.channel.send('Devi essere in un canale plebeo');
		const serverQueue = message.client.queue.get(message.guild.id);
		if (!serverQueue) return message.channel.send('Bruh non stai riproducendo niente');
		if (!args[0]) return message.channel.send(`Il volume è: **${serverQueue.volume}**`);
		serverQueue.volume = args[0]; // eslint-disable-line
		serverQueue.connection.dispatcher.setVolumeLogarithmic(args[0] / 5);
		return message.channel.send(`Ho messo il volume a: **${args[0]}**`);
	}
};
