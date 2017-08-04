import * as TelegramBot from "node-telegram-bot-api";
import { getZippedStickersAsync } from "./stickerpack-zip";

export default (bot: TelegramBot) => async (msg: TelegramBot.API.IMessage) => {
  if (!msg.sticker) {
    bot.sendMessage(msg.chat.id, "Error: message does not contain a sticker");
    return;
  }
  const userSentSticker: TelegramBot.API.ISticker = msg.sticker;

  // get the sticker set
  const taskGetStickerSet: Promise<TelegramBot.API.IStickerSet> = bot._request("getStickerSet",
    { form: { name: userSentSticker.set_name } });

  // show user some info about the sticker pack
  const stickerSet = await taskGetStickerSet;
  await bot.sendMessage(msg.chat.id,
    `The sticker set is ${stickerSet.title} ` +
    `(<a href="https://telegram.me/addstickers/${stickerSet.name}">${stickerSet.name}</a>)\n` +
    `Contains ${stickerSet.stickers.length} stickers\n` +
    `<strong>Please wait while I put all the stickers into a zip for you...</strong>`,
    { parse_mode: "HTML" });

  try {
    // give user the download link to the zipped sticker pack
    const zipBuffer = await getZippedStickersAsync(bot)(stickerSet.stickers);
    bot.sendDocument(msg.chat.id, zipBuffer, {
      reply_to_message_id: msg.message_id,
    }, {
        filename: `${stickerSet.name}.zip`,
      });
  } catch (err) {
    bot.sendMessage(msg.chat.id, "An error occurred while zipping the stickers. Please try again");
  }

  console.log("zipped and sent", stickerSet.name);
};
