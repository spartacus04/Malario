const randomPuppy = require('random-puppy');

module.exports = {
	name: 'meme',
	description: 'manda un meme',
	cooldown: 2,
	execute(message) {
		let reddit = [
			"ShitPostCrusaders",
			"memes"
		]
	
		let subreddit = reddit[Math.floor(Math.random() * reddit.length)];
	
		message.channel.startTyping();
	
		randomPuppy(subreddit).then(async url => {
				await message.channel.send({
					files: [{
						attachment: url,
						name: 'meme.png'
					}]
				}).then(() => message.channel.stopTyping());
		}).catch(err => console.error(err));
	}
};
