import * as Dotenv from "dotenv";
import * as TelegramBot from "node-telegram-bot-api";
import handleStartCommand from "./start-handler";
import handleOnSticker from "./sticker-handler";

// load .env config file
Dotenv.config();
const BOT_TOKEN = process.env.BOT_TOKEN;

if (!BOT_TOKEN) {
  console.error("No bot token specified. Please set BOT_TOKEN in env");
  process.exit(1);
}

// bot options
const botOptions = {
  polling: true,
  interval: 1000,
};

const bot = new TelegramBot(BOT_TOKEN as string, botOptions);
console.log("Bot started!");

bot.onText(/\/start/, handleStartCommand(bot));
bot.on("sticker", handleOnSticker(bot));
