const discord = require("discord.js");
const bot = new discord.Client({ disableEveryone: true });
const randomPuppy = require("random-puppy");

module.exports.run = async (bot, message, args) => {
  let reddit = ["HoldMyBeer", "Facepalm", "CrappyDesign", "CringePics", "memes", "dankmemes", "MemeEconomy", "Animemes", "PrequelMemes", "terriblefacebookmemes", "woooosh", "PewdiepieSubmissions", "funny", "teenagers"];

  let subreddit = reddit[Math.floor(Math.random() * reddit.length)];

  message.channel.startTyping();
  
  randomPuppy(args[0] || subreddit)
    .then(async url => {
      message.channel.send("r/" + (args[0] || subreddit) + ":");
      await message.channel.send(url).then(() => message.channel.stopTyping());
    })
    .catch(err => {
    console.error(err)
    if(args[0]) message.channel.send(`<:xcross:658850997757804555> Couldn't find a subreddit called "${args[0]}"`);
  });
};

module.exports.config = {
  name: "meme",
  description: "Gives a meme from your favourite subreddits or subreddits of your choice",
  category: "Fun",
  usage: "a meme <subreddit>",
  accessableby: "Everyone",
  aliases: ["memes", "redddit"]
}
