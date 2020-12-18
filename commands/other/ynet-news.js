const { MessageEmbed } = require('discord.js');
const newsAPI = process.env.newsAPI;
const { Command } = require('../../discord.js-commando/src');
const fetch = require('node-fetch');

module.exports = class YnetNewsCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'ynet-news',
      aliases: ['israel-news', 'ynet'],
      group: 'other',
      memberName: 'ynet-news',
      description: 'Risponde con le ultime news di Israele',
      throttling: {
        usages: 2,
        duration: 10
      }
    });
  }

  async run(message) {
    // powered by NewsAPI.org
    try {
      const response = await fetch(
        `https://newsapi.org/v2/top-headlines?sources=ynet&pageSize=5&apiKey=${newsAPI}`
      );
      const json = await response.json();
      let articleArr = json.articles;
      let processArticle = article => {
        let embed = new MessageEmbed()
          .setColor('#BA160C')
          .setTitle(article.title)
          .setURL(article.url)
          .setAuthor(article.author)
          .setDescription(article.description)
          .setThumbnail(article.urlToImage)
          .setTimestamp(article.publishedAt)
          .setFooter('Attivato da NewsAPI.org');
        return embed;
      };
      async function processArray(array) {
        for (let article of array) {
          let msg = await processArticle(article);
          message.say(msg);
        }
      }
      await processArray(articleArr);
    } catch (err) {
      message.say("C'è qualquadra che non cosa");
      return console.error(err);
    }
  }
};
