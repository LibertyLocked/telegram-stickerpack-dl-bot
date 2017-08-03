import * as TelegramBot from "node-telegram-bot-api";

export default (bot: TelegramBot) => (msg: TelegramBot.API.IMessage, match: RegExpMatchArray | null) => {
  bot.sendMessage(msg.chat.id,
    "Welcome to sticker pack download bot\n" +
    "Send me a sticker to get started");
};
