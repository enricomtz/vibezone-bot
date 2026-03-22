const {
  Client,
  GatewayIntentBits,
  EmbedBuilder,
  Events
} = require('discord.js');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

const TOKEN = process.env.DISCORD_TOKEN;

const RULES_IMAGE_URL = "https://cdn.discordapp.com/attachments/1482145039525089350/1483201102064254979/40067a6c-5dd9-408c-9ae7-cfaf57d8fd2e.png?ex=69b9ba2b&is=69b868ab&hm=1c6a104063161e987a722b0145c94bd307dbec0bb368d5ad3c4182075ab4af73&";

client.once(Events.ClientReady, () => {
  console.log(`Bot online als ${client.user.tag}`);
});

client.on('messageCreate', async (message) => {
  if (message.author.bot) return;

  if (message.content === '!rules') {
    try {
      const embed = new EmbedBuilder()
        .setTitle('📜 VIBEZONE SERVER RULES')
        .setColor(0x5865F2)
        .setDescription(
          `1️⃣ **Follow Discord's Terms of Service**\n` +
          `https://discord.com/terms\n` +
          `https://discord.com/guidelines\n\n` +

          `2️⃣ **Respect everyone**\n` +
          `No harassment, insults, discrimination or toxic behavior.\n\n` +

          `3️⃣ **No racism / hate speech**\n` +
          `Any racist or discriminatory content will result in punishment.\n\n` +

          `4️⃣ **No spam or self promotion**\n` +
          `Advertising is not allowed without staff permission.\n\n` +

          `5️⃣ **Keep channels on topic**\n` +
          `Use the correct channels for your messages.\n\n` +

          `6️⃣ **No NSFW content**\n` +
          `This is a safe community server.\n\n` +

          `7️⃣ **Listen to staff**\n` +
          `Moderators and admins have the final decision.\n\n` +

          `⚠️ **Breaking the rules may result in:**\n` +
          `• Warning\n` +
          `• Mute\n` +
          `• Kick\n` +
          `• Ban`
        )
        .setFooter({ text: 'VibeZone Rules' });

      if (RULES_IMAGE_URL && RULES_IMAGE_URL !== "HIER_DEIN_BILD_LINK") {
        embed.setImage(RULES_IMAGE_URL);
      }

      await message.channel.send({
        embeds: [embed]
      });

      await message.delete().catch(() => {});
    } catch (error) {
      console.error('Fehler beim Senden der Regeln:', error);
    }
  }
});

client.login(TOKEN);
