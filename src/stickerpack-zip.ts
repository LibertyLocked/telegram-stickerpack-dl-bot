import * as fetch from "isomorphic-fetch";
import * as JSZip from "jszip";
import * as TelegramBot from "node-telegram-bot-api";
import showProgressBar from "./progress-bar";

interface IBufferedFile {
  filename: string;
  stream: ReadableStream;
}

const getBufferedStickerAsync = (bot: TelegramBot) => {
  return async (sticker: TelegramBot.API.ISticker): Promise<IBufferedFile> => {
    const fileURI: string = await bot.getFileLink(sticker.file_id);
    const filename = fileURI.slice(fileURI.lastIndexOf("/") + 1);
    const stream = await fetchStreamAsync(fileURI);
    return {
      filename,
      stream,
    } as IBufferedFile;
  };
};

const fetchStreamAsync = async (fileURI: string): Promise<ReadableStream> => {
  const resp = await fetch(fileURI);
  if (resp.body === null) {
    throw new Error("body is null when fetching " + fileURI);
  }
  return resp.body;
};

/**
 * Returns a stream buffer of the zipped stickers when resolved
 * @param bot Telegram bot instance
 * @param chatId Chat ID to send the progress bar
 */
export const getZippedStickersAsync = (bot: TelegramBot, chatId: number) => {
  return async (stickers: TelegramBot.API.ISticker[]): Promise<Buffer> => {
    // Show progress
    let progressMsg = await bot.sendMessage(chatId, showProgressBar(16)(0));
    let stickersDownloaded = 0;
    const progressInterval = setInterval(async () => {
      try {
        const percentage = Math.min((stickersDownloaded / stickers.length) * 100, 100);
        const progressStr = showProgressBar(16)(percentage) + ` ${percentage.toFixed(0)}%`;
        if (progressMsg.text === progressStr) {
          return;
        }
        progressMsg = await bot.editMessageText(progressStr, {
          message_id: progressMsg.message_id,
          chat_id: chatId,
        }) as TelegramBot.API.IMessage;

        if (percentage === 100) {
          clearInterval(progressInterval);
        }
      } catch (err) {
        clearInterval(progressInterval);
      }
    }, 500);

    try {
      const zip: JSZip = new JSZip();
      const addToZipTasks = stickers.map((sticker) => {
        // map isn't async
        // this starts a task to put every sticker into the zip
        // and puts the running tasks into tasks array
        return (async () => {
          const bufferedFile = await getBufferedStickerAsync(bot)(sticker);
          stickersDownloaded++;
          zip.file(bufferedFile.filename, bufferedFile.stream);
        })();
      });

      // make sure all the stickers are added to zip
      await Promise.all(addToZipTasks);

      // generate the zip
      return zip.generateAsync({ type: "nodebuffer", streamFiles: true });
    } catch (err) {
      clearInterval(progressInterval);
      throw err;
    }
  };
};
