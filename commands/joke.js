const discord = require("discord.js");
const axios = require("axios")

exports.run = async (bot, message, args) => {
  let getjoke = async () => {
      let response = await axios.get(
      "https://official-joke-api.appspot.com/random_joke"
      );
      let joke = response.data;
      return joke;
    };
    let jokeValue = await getjoke();
    const embed = new discord.RichEmbed()
    .setColor("#00ff15")
      .setAuthor(`😂😂😂 Here is your joke:`, message.guild.iconURL)
      .setThumbnail(bot.user.displayAvatarURL)
    .setDescription(`${jokeValue.setup}\n\nAnswer: ||${jokeValue.punchline}||`)
    .setFooter(`Category: ${jokeValue.type}`)
    message.channel.send(embed);
    }


module.exports.config = {
  name: "dadjoke",
  description: "Shows a random joke that will make u laugh 😂😂😂",
  category: "Fun",
  usage: "a dadjoke",
  accessableby: "Everyone",
  aliases: ["joke", "funny"]
}
