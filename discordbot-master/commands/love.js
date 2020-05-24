  
const { RichEmbed } = require("discord.js");


module.exports.run = async (client, message, args) => {
        // Get a member from mention, id, or username
      const getMember = message.mentions.members.first();       
        let person = getMember

        if (!person || message.author.id === person.id) {
            person = message.guild.members
                .filter(m => m.id !== message.author.id)
                .random();
        }

        const love = Math.random() * 100;
        const loveIndex = Math.floor(love / 10);
        const loveLevel = "💖".repeat(loveIndex) + "💔".repeat(10 - loveIndex);

        const embed = new RichEmbed()
            .setColor("#ffb6c1")
            .addField(`**${person.displayName}** loves **${message.member.displayName}** this much:`,
            `💟 ${Math.floor(love)}%\n\n${loveLevel}`);

        message.channel.send(embed);
}


module.exports.config = {
  name: "love",
  description: "Displays the affection between you and a random user or the user that u mention",
  category: "Fun",
  usage: "a love <user>",
  accessabeby: "Everyone",
  aliases: ["heart", "ship", "luv"]
}
