const Discord = require("discord.js");
const YTDL = require("ytdl-core");

const TOKEN = "NDA1NjQwMDA1NTgzODk2NTc3.DU92tg.fzSgRZezVUi8x62kj4iDyLVK0BY";
const PREFIX = "!";
const Hello =  "Hi there!"


var bot = new Discord.Client();
var servers = {};


function generateHex(){
  return "#" + Math.floor(Math.random() * 16777215).toString(16);
}
function play(connection, message) {
  var server = servers[message.guild.id];

  server.dispatcher = connection.playStream(YTDL(server.queue[0], {filter: "audioonly"}));

  server.queue.shift();

  server.dispatcher.on("end", function() {
    if (server.queue[0]) play(connection,message);
    else connection.disconnect();
  });
}


var fortunes = [

  "Yes",
  "No",
  "Maybe",
  "Ask again later",
  "Cant think right now :cry:"
];



bot.on("guildMemberAdd", function(member) {
  member.guild.channels.find("name", "general").sendMessage(member.toString()+ "Welcome to the Zome server!");

  member.addRole(member.guild.roles.find("name", "Member"));
});




bot.on("message", function(message){
  if (message.content == "Hello") {
    message.channel.sendMessage("Hi there!");

  };

});

bot.on("message", function(message){
  if (message.content == "How are you?") {
    message.channel.sendMessage("Good, you?");

  };

});

bot.on("message", function(message){
  if (message.content == "ban") {
    if(!message.member.permissions.has("ADMINISTRATOR")) return message.reply("You are not an admin!");
    const member = message.mentions.member.first();
    if (!member) return message.reply("Invalid usage, please do !ban @User#1234");
    member.ban({
      days: args[1] || null,
      reason: "Banned by ${msg.author.tag}"
    });
  }

});


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
            message.channel.sendMessage("")
          }
    break;





  case "profile":
      var embed = new Discord.RichEmbed()
          .addField("Name: ", message.author.toString(), true)
          .setThumbnail(message.author.avatarURL)
          .setColor(0x00ffff)
        message.channel.sendEmbed(embed);
        break;



        case "play":
        if (!args[1]) {
          message.channel.sendMessage("Please provide a link");
            return;
        }

        if (!message.member.voiceChannel) {
          message.channel.sendMessage("You must be in a voice channel!");
        }

        if(!servers[message.guild.id]) servers[message.guild.id] = {
          queue: []
        };

        var server = servers[message.guild.id];

        server.queue.push(args[1]);

        if (!message.guild.voiceConnection) message.member.voiceChannel.join().then(function(connection) {
            play(connection, message);
        });

        break;

        case "skip":
        var server = servers[message.guild.id];

        if (server.dispatcher) server.dispatcher.end();
        break;

        case "stop":
        var server = servers[message.guild.id];

        if (message.guild.voiceConnection) message.guild.voiceConnection.disconnect();
        break;


        bot.on(`message`, message => {
          if (message.content === "/ban") {

          }
        });







    default:
      message.channel.sendMessage("Invaild Command!")
   }

});


bot.login(TOKEN);
