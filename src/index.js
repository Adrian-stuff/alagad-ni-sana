require("dotenv").config();

const Discord = require("discord.js");
const { meme, yesno, qoute } = require("./functions/func");
const helpEmbed = require("./embeds/help.json");

const guildId = "828933252986306581";
const client = new Discord.Client();

const getApp = (guildId) => {
  const app = client.api.applications(client.user.id);
  if (guildId) {
    app.guilds(guildId);
  }
  return app;
};

client.on("ready", async () => {
  console.log(`logged in as ${client.user.tag}!`);

  const commands = await getApp(guildId).commands.get();
  // console.log(commands);

  await getApp(guildId).commands.post({
    data: {
      name: "ping",
      description: "A simple ping pong command",
    },
  });

  await getApp(guildId).commands.post({
    data: {
      name: "embed",
      description: "displays an embed",
      options: [
        {
          name: "Name",
          description: "Your Name",
          required: true,
          type: 3,
        },
        {
          name: "Last-Name",
          description: "Your Last Name",
          required: false,
          type: 3,
        },
      ],
    },
  });

  await getApp(guildId).commands.post({
    data: {
      name: "yesno",
      description: "Sends a Yes or No",
      options: [
        {
          name: "Question",
          description: "Question",
          required: true,
          type: 3,
        },
      ],
    },
  });

  client.ws.on("INTERACTION_CREATE", async (interaction) => {
    const { name, options } = interaction.data;

    const command = name.toLowerCase();

    const args = {};

    if (options) {
      options.forEach((option) => {
        const { name, value } = option;
        args[name] = value;
      });
    }

    if (command === "ping") {
      reply(interaction, "tite");
    }
    if (command === "embed") {
      const embed = new Discord.MessageEmbed().setTitle("Example Embed");

      for (const arg in args) {
        const value = args[arg];
        embed.addField(arg + ":", value);
      }
      reply(interaction, embed);
    }
    if (command === "yesno") {
      // console.log("herre", interaction);
      reply(interaction, yesno(interaction, args.question));
    }
  });
  const reply = async (interaction, response) => {
    let data = {
      content: response,
    };

    if (typeof response === "object") {
      data = await createAPIMessage(interaction, response);
    }

    client.api.interactions(interaction.id, interaction.token).callback.post({
      data: {
        type: 4,
        data,
      },
    });
  };

  const createAPIMessage = async (interaction, content) => {
    const { data, files } = await Discord.APIMessage.create(
      client.channels.resolve(interaction.channel_id),
      content
    )
      .resolveData()
      .resolveFiles();
    return { ...data, files };
  };
});
// =======================
//          END
// =======================

client.on("message", (message) => {
  const prefix = "eds";
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();

  // HELP COMMAND
  if (command === "help") {
    message.channel.send({ embed: helpEmbed });
  }
  // ABOUT COMMAND
  if (command === "about") {
    message.channel.send("ginawa ako ni adrian pogi");
  }
  // MEME COMMAND
  if (command === "meme") {
    meme(message, args);
  }
  // QOUTE COMMAND
  if (command === "qoute") {
    qoute(message, args);
  }
  // YESNO COMMAND
  if (command === "yesno") {
    message.channel.send(yesno(message, args));
  }
  // MEOW??? COMMAND
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
  if (command === "tite" || command === "pp") {
    const body = `     | |\n`.repeat(Math.floor(Math.random() * 11));
    const taggedUser = message.mentions.users.first();
    // console.log(taggedUser);
    const titeEmbed = {
      title: "**Measure your pp:**",
      description:
        `${taggedUser ? taggedUser.username : message.author.username}'s pp\n` +
        "```     /'\\\n" +
        body +
        "    \\_|_/```",
      color: 15406156,
    };
    message.channel.send({ embed: titeEmbed });
  }
});

client.login(process.env.TOKEN);
