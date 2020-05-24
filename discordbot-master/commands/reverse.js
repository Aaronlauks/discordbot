exports.run = function (bot, message, args) {
    if (args.length < 1) {
        message.channel.send('<:xcross:658850997757804555> You must input text to be reversed!');
    }
    message.reply(args.join(' ').split('').reverse().join(''));


}

module.exports.config = {
  name: "reverse",
  description: "Makes the message you type in reversed",
  category: "Fun",
  usage: "a reverse <message>",
  accessableby: "Everyone",
  aliases: ["backwards", "rev"]
}
