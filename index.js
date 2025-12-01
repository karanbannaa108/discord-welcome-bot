const { Client, GatewayIntentBits } = require("discord.js");

// TOKEN Render ki env se aayega
const TOKEN = process.env.TOKEN;

// ✅ Welcome channel ID (tumhara)
const CHANNEL_ID = "1445071566667907203";

// ✅ Tumhara Vercel image API URL
const IMAGE_API = "https://welcome-image-api.vercel.app/api/welcome";

if (!TOKEN) {
  console.log("❌ Env TOKEN missing hai. Render me set karo.");
  process.exit(1);
}

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
  ],
});

client.once("ready", () => {
  console.log(`✅ Logged in as ${client.user.tag}`);
});

client.on("guildMemberAdd", async (member) => {
  try {
    const channel = member.guild.channels.cache.get(CHANNEL_ID);
    if (!channel) {
      console.log("❌ Welcome channel nahi mila, ID:", CHANNEL_ID);
      return;
    }

    const username = member.user.username;
    const avatarURL = member.user.displayAvatarURL({
      extension: "png",
      size: 256,
    });

    const imageUrl =
      `${IMAGE_API}?username=${encodeURIComponent(username)}` +
      `&avatar=${encodeURIComponent(avatarURL)}`;

    await channel.send({
      content: `🎉 Welcome ${member} to **${member.guild.name}**!`,
      files: [{ attachment: imageUrl, name: "welcome.png" }],
    });

    console.log("✅ Welcome bheja:", username);
  } catch (err) {
    console.error("⚠️ Error sending welcome:", err);
  }
});

client.login(TOKEN);
