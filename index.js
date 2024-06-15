const { Client, GatewayIntentBits, ActivityType, TextChannel } = require('discord.js');
require('dotenv').config();
const express = require('express');

// Initialize Discord client with all intents
const client = new Client({
  intents: Object.keys(GatewayIntentBits).map((intent) => GatewayIntentBits[intent]),
});

// Set up Express server
const app = express();
const port = 3000;
app.get('/', (req, res) => {
  res.send('YaY Your Bot Status Changed✨');
});
app.listen(port, () => {
  console.log(`🔗 Listening to RTX: http://localhost:${port}`);
  console.log(`🔗 Powered By RTX`);
});

// Fixed status message
const statusMessage = "WATCHING Greenville Roleplay Complex";
const channelId = 'YOUR_CHANNEL_ID_HERE'; // Set this to your channel ID

// Login function
async function login() {
  try {
    await client.login(process.env.TOKEN);
    console.log(`\x1b[36m%s\x1b[0m`, `|    🐇 Logged in as ${client.user.tag}`);
  } catch (error) {
    console.error('Failed to log in:', error);
    process.exit(1);
  }
}

// Function to set status and send message
function setStatusAndSendMessage() {
  client.user.setPresence({
    activities: [{ name: statusMessage, type: ActivityType.Watching }],
    status: 'dnd',
  }).catch((error) => {
    console.error('Failed to set presence:', error);
  });

  const textChannel = client.channels.cache.get(channelId);

  if (textChannel instanceof TextChannel) {
    textChannel.send(`Bot status is: ${statusMessage}`).catch((error) => {
      console.error('Failed to send message:', error);
    });
  } else {
    console.log('Text channel not found or invalid.');
  }
}

// Event listener for when the bot is ready
client.once('ready', () => {
  console.log(`\x1b[36m%s\x1b[0m`, `|    ✅ Bot is ready as ${client.user.tag}`);
  console.log(`\x1b[36m%s\x1b[0m`, `|    ✨HAPPY NEW YEAR MY DEAR FAMILY`);
  console.log(`\x1b[36m%s\x1b[0m`, `|    ❤️WELCOME TO 2024`);
  setStatusAndSendMessage();
});

// Start the bot
login();
