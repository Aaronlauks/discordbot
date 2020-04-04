const { RichEmbed } = require("discord.js");
const { prefix } = require("../config.json");
const { readdirSync } = require("fs");

exports.run = (bot, message, args, ops) => {
  let categories = ops.categories;
  let array = Array.from(categories.keys());
  if (!args[0]) {

    const embed = new RichEmbed()
      .setColor("#00ff15")
      .setAuthor(`Help is on the way!`, message.guild.iconURL)
      .setThumbnail(bot.user.displayAvatarURL)
      .setDescription(
        `These are the available commands for ${message.guild.me.displayName}\nThe bot prefix is: **${prefix}**\n`
      );

    array.forEach(category => {
      let text = "";
      let co = categories.get(category);
      co.forEach(function(command) {
        text += `\`${command}\` `;
      });
      embed.addField(`**${category}**`, `${text}`);
    });
    
    message.channel.send(embed);
    message.channel.send('```diff\n-Use "a help <command>" to get more info on a specific command, for example: a help help```')
  }
  console.log(args[0]);
  if (args[0]) {
    let command = args[0];
    if(bot.commands.get(command)){
      command = bot.commands.get(command);
    } else {
      command = bot.commands.get(bot.aliases.get(command));

    }
    const embed = new RichEmbed()
      .setColor("#00ff15")
      .setAuthor(`Help is on the way!`, message.guild.iconURL)
      .setThumbnail(bot.user.displayAvatarURL)
      .setDescription(
        `The bot prefix is: **${prefix}**\n`
      )
      .addField(`**Command:**`, `${command.config.name || "Not Set"}`)
      .addField(`**Description:**`, `${command.config.description || "Not Set"}`)
      .addField(`**Usage:**`, `${command.config.usage || "Not Set"}`)
      .addField(`**Accessable by:**`, `${command.config.accessableby || "Not Set"}`)
      .addField(`**Aliases:**`, `${command.config.aliases || "Not Set"}`)
      .setFooter(
        `© ${message.guild.me.displayName} | help command`,
        bot.user.displayAvatarURL
      );
      message.channel.send(embed);
  }
};


module.exports.config = {
  name: "help",
  description: "This is the help command so uhh...",
  category: "Miscellaneous",
  usage: "a help <command>",
  accessableby: "Everyone",
  aliases: ["h", "halp", "info"]
}
