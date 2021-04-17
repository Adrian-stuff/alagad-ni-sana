require("dotenv").config();

const fetch = require("node-fetch");
const Discord = require("discord.js");
const client = new Discord.Client();

client.on("ready", () => {
  console.log(`logged in as ${client.user.tag}!`);
});

client.on("message", (message) => {
  const prefix = "eds";
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();

  if (command === "help") {
    const helpEmbed = {
      title: "**Commands:**",
      description: "Stan twice <3\n",
      color: 53380,
      footer: {
        text: "Pogi ni Adrian hehehe",
      },
      fields: [
        {
          name: "**Memes**",
          value:
            "``eds meme {subreddit}``  - generate random meme from a subreddit",
          inline: false,
        },
        {
          name: "**Help**",
          value: "``eds help`` - show this message",
          inline: false,
        },
        {
          name: "**Yes or (Yes) No**",
          value: "``eds yesno {question}`` - sends yes or no",
          inline: false,
        },
        {
          name: "**Qoute**",
          value: "``eds qoute`` - sends a random qoute ",
          inline: false,
        },
      ],
    };
    message.channel.send({ embed: helpEmbed });
  }
  if (command === "about") {
    message.channel.send("ginawa ako ni adrian pogi");
  }
  if (command === "meme") {
    fetch(`https://meme-api.herokuapp.com/gimme/${args}`)
      .then((res) => {
        if (!res.ok) {
          throw res.statusText();
        }
        return res.json();
      })
      .then((data) => {
        const memeEmbed = {
          color: 0x0099ff,
          title: data.title,
          url: data.postLink,
          author: {
            name: `u/${data.author}`,
            url: `https://reddit.com/user/${data.author}`,
          },
          thumbnail: {
            url: data.preview[1],
          },
          image: {
            url: data.url,
          },
        };
        message.channel.send({ embed: memeEmbed });
      })
      .catch(() => {
        message.channel.send(
          `sure kaba na tama yung subreddit mo ha? ${message.author}`
        );
      });
  }
  if (command === "qoute") {
    fetch("https://api.quotable.io/random")
      .then((res) => {
        if (!res.ok) {
          throw res.statusText;
        }
        return res.json();
      })
      .then((data) => {
        message.channel.send(`*${data.content}*\n - ${data.author}`);
      })
      .catch(() =>
        message.channel.send("lol sira server ulitin nalang mamaya kbye")
      );
  }
  if (command === "yesno") {
    const result = Math.floor(Math.random() * 11) % 2 === 0 ? "Yes" : "No";
    if (!args.length) {
      return message.channel.send(
        `bobo amputa walang tanong pano ko yan masasagot ha?, ${message.author}!`
      );
    }
    const question = args.toString().replace(/,/g, " ");
    message.reply(`"${question}" \n **${result}** `);
  }
  if (command === "meow") {
    if (!message.mentions.users.size) {
      return message.channel.send("meow meow no hooman :(");
    }
    const taggedUser = message.mentions.users.first();
    message.channel.send(`meow meow? <@!${taggedUser.id}>`);
  }
  if (command === "chatmoko") {
    message.author.send("i love you hehehe");
  }
});

client.login(process.env.TOKEN);
