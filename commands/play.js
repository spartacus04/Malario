const { Util } = require('discord.js');
const ytdl = require('ytdl-core');

module.exports = {
	name: 'play',
	description: 'Riproduci',
	usage: '[command name]',
	args: true,
	cooldown: 2,
	async execute(message, args) {
		const { channel } = message.member.voice;
		const { channelid } = message.member.voice.id;
		if (!channel) if (!(channelid == "711540596292059147")) return message.channel.send('Devi essere nel canale <#711540596292059147> plebeo');
		
		const permissions = channel.permissionsFor(message.client.user);
		if (!permissions.has('CONNECT')) return message.channel.send('Bruh non posso connettermi al sees');
		if (!permissions.has('SPEAK')) return message.channel.send('Bruh non posso parlare nel sees');

		const serverQueue = message.client.queue.get(message.guild.id);
		const songInfo = await ytdl.getInfo(args[0].replace(/<(.+)>/g, '$1'));
		const song = {
			id: songInfo.video_id,
			title: Util.escapeMarkdown(songInfo.title),
			url: songInfo.video_url
		};

		if (serverQueue) {
			serverQueue.songs.push(song);
			console.log(serverQueue.songs);
			return message.channel.send(`✅ **${song.title}** è stata aggiunta alla lista`);
		}

		const queueConstruct = {
			textChannel: message.channel,
			voiceChannel: channel,
			connection: null,
			songs: [],
			volume: 2,
			playing: true
		};
		message.client.queue.set(message.guild.id, queueConstruct);
		queueConstruct.songs.push(song);

		const play = async song => {
			const queue = message.client.queue.get(message.guild.id);
			if (!song) {
				queue.voiceChannel.leave();
				message.client.queue.delete(message.guild.id);
				return;
			}

			const dispatcher = queue.connection.play(ytdl(song.url))
				.on('finish', () => {
					queue.songs.shift();
					play(queue.songs[0]);
				})
				.on('error', error => console.error(error));
			dispatcher.setVolumeLogarithmic(queue.volume / 5);
			queue.textChannel.send(`🎶 Comincio a riprodurre: **${song.title}**`);
		};

		try {
			const connection = await channel.join();
			queueConstruct.connection = connection;
			play(queueConstruct.songs[0]);
		} catch (error) {
			console.error(`Non posso entrare: ${error}`);
			message.client.queue.delete(message.guild.id);
			await channel.leave();
			return message.channel.send(`non posso entrare: ${error}`);
		}
	}
};
