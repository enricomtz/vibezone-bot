const {
  Client,
  GatewayIntentBits,
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  Events
} = require('discord.js');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.MessageContent
  ]
});

// TOKEN
const TOKEN = process.env.DISCORD_TOKEN;

// BILD
const RULES_IMAGE_URL = "https://cdn.discordapp.com/attachments/1482145039525089350/1485248512970195104/40067a6c-5dd9-408c-9ae7-cfaf57d8fd2e.png?ex=69c12cf8&is=69bfdb78&hm=cb802e1138998e59d8edec68e80bf7a9019e2ad8eed23b86265770eb940c5fb9&";

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
          `• Ban\n\n` +

          `✅ Click the button below to verify.`
        )
        .setFooter({ text: 'VibeZone Verification System' })
        .setImage(RULES_IMAGE_URL);

      const row = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
          .setCustomId('verify_button')
          .setLabel('Verify')
          .setEmoji('✅')
          .setStyle(ButtonStyle.Success)
      );

      await message.channel.send({
        embeds: [embed],
        components: [row]
      });

      await message.delete().catch(() => {});
    } catch (error) {
      console.error('Fehler beim Senden der Regeln:', error);
    }
  }
});

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isButton()) return;
  if (interaction.customId !== 'verify_button') return;

  try {
    await interaction.reply({
      content: '✅ Verification successful.',
      ephemeral: true
    });
  } catch (error) {
    console.error('Fehler beim Verifizieren:', error);

    await interaction.reply({
      content: '❌ Verification failed. Please contact staff.',
      ephemeral: true
    }).catch(() => {});
  }
});

client.login(TOKEN);
