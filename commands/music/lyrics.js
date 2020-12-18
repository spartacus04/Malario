const { Command } = require('../../discord.js-commando/src');
const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');
const cheerio = require('cheerio');
const geniusLyricsAPI = process.env.geniusLyricsAPI;

module.exports = class LyricsCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'lyrics',
      memberName: 'lyrics',
      aliases: ['lr'],
      description:
        'Trova le liriche della canzone che stai riproducendo',
      group: 'music',
      throttling: {
        usages: 1,
        duration: 10
      },
      args: [
        {
          key: 'songName',
          default: '',
          type: 'string',
          prompt: 'Di quale canzone vuoi trovare le liriche?'
        }
      ]
    });
  }
  async run(message, { songName }) {
    if (
      songName == '' &&
      message.guild.musicData.isPlaying &&
      !message.guild.triviaData.isTriviaRunning
    ) {
      songName = message.guild.musicData.nowPlaying.title;
    } else if (songName == '' && message.guild.triviaData.isTriviaRunning) {
      return message.say('Non puoi farlo durante il trivia!');
    } else if (songName == '' && !message.guild.musicData.isPlaying) {
      return message.say(
        'Bruh non stai riproducendo niente, dammi un nome o comincia a riprodurre'
      );
    }
    const sentMessage = await message.channel.send(
      '<:DK_Expand_Dong:712705428404043818> Cercando le liriche... <:DK_Expand_Dong:712705428404043818>'
    );

    // remove stuff like (Official Video)
    songName = songName.replace(/ *\([^)]*\) */g, '');

    // remove emojis
    songName = songName.replace(
      /([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g,
      ''
    );

    LyricsCommand.searchSong(songName)
      .then(function(url) {
        LyricsCommand.getSongPageURL(url)
          .then(function(url) {
            LyricsCommand.getLyrics(url)
              .then(function(lyrics) {
                if (lyrics.length > 4095) {
                  message.say(
                    'Step-Brother liriche, sei troppo lungo per entrare nel mio embed'
                  );
                  return;
                }
                if (lyrics.length < 2048) {
                  const lyricsEmbed = new MessageEmbed()
                    .setColor('#00724E')
                    .setDescription(lyrics.trim())
                    .setFooter('Date da genius.com');
                  return sentMessage.edit('', lyricsEmbed);
                } else {
                  // 2048 < lyrics.length < 4096
                  const firstLyricsEmbed = new MessageEmbed()
                    .setColor('#00724E')
                    .setDescription(lyrics.slice(0, 2048))
                    .setFooter('Date da genius.com');
                  const secondLyricsEmbed = new MessageEmbed()
                    .setColor('#00724E')
                    .setDescription(lyrics.slice(2048, lyrics.length))
                    .setFooter('Date da genius.com');
                  sentMessage.edit('', firstLyricsEmbed);
                  message.channel.send(secondLyricsEmbed);
                  return;
                }
              })
              .catch(function(err) {
                message.say(err);
                return;
              });
          })
          .catch(function(err) {
            message.say(err);
            return;
          });
      })
      .catch(function(err) {
        message.say(err);
        return;
      });
  }

  static searchSong(query) {
    return new Promise(async function(resolve, reject) {
      const searchURL = `https://api.genius.com/search?q=${encodeURI(query)}`;
      const headers = {
        Authorization: `Bearer ${geniusLyricsAPI}`
      };
      try {
        const body = await fetch(searchURL, { headers });
        const result = await body.json();
        const songPath = result.response.hits[0].result.api_path;
        resolve(`https://api.genius.com${songPath}`);
      } catch (e) {
        reject('Bruh non ho trovato niente');
      }
    });
  }

  static getSongPageURL(url) {
    return new Promise(async function(resolve, reject) {
      const headers = {
        Authorization: `Bearer ${geniusLyricsAPI}`
      };
      try {
        const body = await fetch(url, { headers });
        const result = await body.json();
        if (!result.response.song.url) {
          reject('Non ho trovato un url');
        } else {
          resolve(result.response.song.url);
        }
      } catch (e) {
        console.log(e);
        reject('Non ho trovato un url');
      }
    });
  }

  static getLyrics(url) {
    return new Promise(async function(resolve, reject) {
      try {
        const response = await fetch(url);
        const text = await response.text();
        const $ = cheerio.load(text);
        let lyrics = $('.lyrics')
          .text()
          .trim();
        if (!lyrics) {
          $('.Lyrics__Container-sc-1ynbvzw-2')
            .find('br')
            .replaceWith('\n');
          lyrics = $('.Lyrics__Container-sc-1ynbvzw-2').text();
          if (!lyrics) {
            reject(
              "C'è stato un problema a trovare le liriche, spegni e riaccendi"
            );
          } else {
            resolve(lyrics.replace(/(\[.+\])/g, ''));
          }
        } else {
          resolve(lyrics.replace(/(\[.+\])/g, ''));
        }
      } catch (e) {
        console.log(e);
        reject(
          "C'è stato un problema a trovare le liriche, spegni e riaccendi"
        );
      }
    });
  }
};
