const Discord = require("discord.js");

const TOKEN = "NDA1NjQwMDA1NTgzODk2NTc3.DU92tg.fzSgRZezVUi8x62kj4iDyLVK0BY";
const PREFIX = "!";

var bot = new Discord.Client();
var fortunes = [

  "Yes",
  "No",
  "Maybe"
];


bot.on("ready", function() {
  console.log("Ready");
});

bot.on("message", function(message) {
  if (message.author.equals(bot.user)) return;

  if (!message.content.startsWith(PREFIX)) return;

  var args = message.content.substring(PREFIX.length).split(" ");

  switch (args[0].toLowerCase()) {
    case "ping":
        message.channel.sendMessage("Pong!");
        break;
    case "info":
        message.channel.sendMessage("I am Zome bot! Made by Subnet Mask 255.0.0.0 AKA Sir_OddYT");

    case "8ball":
    if (args[1]) {
      message.channel.sendMessage(fortunes[Math.floor(Math.random() * fortunes.length)]);

    } else {
      message.channel.sendMessage("Can't read that")
    }



        break;
    default:
      message.channel.sendMessage("Invaild Command!")
   }

});

if [ -f $1/package.json ]; then
  echo 'Node.js'
  exit 0
fi

>&2 echo 'Node.js: package.json not found in application root'
exit 1




bot.login(TOKEN);
