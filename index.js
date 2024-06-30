const { Client, GatewayIntentBits, ActivityType } = require('discord.js');
require('dotenv').config();
const express = require('express');

// Initialize Discord client with essential intents
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

// Set up Express server
const app = express();
const port = 3000;

// Simple endpoint to confirm server status
app.get('/', (req, res) => {
  res.send('YaY Your Bot Status Changed✨');
});

// Start the Express server
app.listen(port, () => {
  console.log(`🔗 Listening to RTX: http://localhost:${port}`);
  console.log(`🔗 Powered By RTX`);
});

const statusMessage = "WATCHING discord.gg/SFRC"; // Permanent status message

// Function to set the bot's status
function setPermanentStatus() {
  try {
    client.user.setPresence({
      activities: [{ name: statusMessage, type: ActivityType.Watching }],
      status: 'dnd',
    });
    console.log(`\x1b[36m%s\x1b[0m`, `|    🚀 Bot status set to: ${statusMessage}`);
  } catch (error) {
    console.error('Failed to set presence:', error);
  }
}

// Function to log in the bot
async function login() {
  try {
    await client.login(process.env.TOKEN);
    console.log(`\x1b[36m%s\x1b[0m`, `|    🐇 Logged in as ${client.user.tag}`);
  } catch (error) {
    console.error('Failed to log in:', error);
    process.exit(1);
  }
}

// Event listener for when the bot is ready
client.once('ready', () => {
  console.log(`\x1b[36m%s\x1b[0m`, `|    ✅ Bot is ready as ${client.user.tag}`);
  console.log(`\x1b[36m%s\x1b[0m`, `|    ✨HAPPY NEW YEAR MY DEAR FAMILY`);
  console.log(`\x1b[36m%s\x1b[0m`, `|    ❤️WELCOME TO 2024`);
  
  // Set status immediately upon startup
  setPermanentStatus();
});

// Regularly reset the status to ensure permanence
setInterval(() => {
  if (client.user) {
    setPermanentStatus();
  }
}, 60000); // Adjust the interval as needed (60 seconds here)

// Start the bot by logging in
login();
