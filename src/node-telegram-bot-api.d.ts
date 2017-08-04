/**
 * Preliminary type definitions for node-telegram-bot-api
 * Author: libertylocked
 * License: MIT
 */

declare module "node-telegram-bot-api" {
  class TelegramBot {
    constructor(token: string, options?: any);
    public onText(regexp: RegExp, callback: (msg: TelegramBot.API.IMessage, match: RegExpExecArray | null) => void): void;
    public on(event: TelegramBot.MessageType, listenerFn: (...args: Array<any>) => void): void;
    public sendMessage(chatId: string | number, text: string, options?: any): Promise<TelegramBot.API.IMessage>;
    public sendDocument(chatId: string | number, doc: string | ReadableStream | Buffer, options?: any, fileOpts?: any)
      : Promise<TelegramBot.API.IMessage>;
    public getFileLink(fileId: string): Promise<string>;

    // XXX: wildcard for unimplemented methods
    [K: string]: any;
  }

  namespace TelegramBot {
    type MessageType =
      "audio" |
      "channel_chat_created" |
      "contact" |
      "delete_chat_photo" |
      "document" |
      "game" |
      "group_chat_created" |
      "invoice" |
      "left_chat_member" |
      "location" |
      "migrate_from_chat_id" |
      "migrate_to_chat_id" |
      "new_chat_members" |
      "new_chat_photo" |
      "new_chat_title" |
      "photo" |
      "pinned_message" |
      "sticker" |
      "successful_payment" |
      "supergroup_chat_created" |
      "text" |
      "video" |
      "video_note" |
      "voice";

    /**
     * Telegram Bot API types
     */
    namespace API {
      interface IMessage {
        message_id: number;
        from?: IUser;
        date: number;
        chat: IChat;
        forward_from?: IUser;
        forward_from_chat?: IChat;
        forward_from_message_id?: number;
        forward_date?: number;
        reply_to_message?: IMessage;
        edit_date?: number;
        text?: string;
        entities?: IMessageEntity[];
        audio?: any;
        document?: IDocument;
        game?: any;
        photo?: IPhotoSize[];
        sticker?: ISticker;
        video?: any;
        voice?: any;
        video_note?: any;
        new_chat_members?: IUser[];
        caption?: string;
        contact?: any;
        location?: ILocation;
        venue?: any;
        new_chat_member?: IUser;
        left_chat_member?: IUser;
        new_chat_title?: string;
        new_chat_photo?: IPhotoSize[];
        delete_chat_photo?: true;
        group_chat_photo?: true;
        supergroup_chat_created?: true;
        channel_chat_created?: true;
        migrate_to_chat_id?: number;
        migrate_from_chat_id?: number;
        pinned_message?: IMessage;
        invoice?: any;
        successful_payment?: any;
      }

      interface IMessageEntity {
        type: "mention" | "hashtag" | "bot_command" | "url" | "email" | "bold" | "italic" | "code" |
          "pre" | "text_link" | "text_mention";
        offset: number;
        length: number;
        url?: string;
        user?: IUser;
      }

      interface IUser {
        id: number;
        first_name: string;
        last_name?: string;
        username?: string;
        language_code?: string;
      }

      interface IChat {
        id: number;
        type: "private" | "group" | "supergroup" | "channel";
        title?: string;
        username?: string;
        first_name?: string;
        last_name?: string;
        all_members_are_administrators?: boolean;
        photo?: IChatPhoto;
        description?: string;
        invite_link?: string;
      }

      interface IChatPhoto {
        small_file_id: string;
        big_file_id: string;
      }

      interface ILocation {
        longitutde: number;
        latitude: number;
      }

      interface IDocument {
        file_id: string;
        thumb?: IPhotoSize;
        file_name?: string;
        mime_type?: string;
        file_size?: number;
      }

      interface ISticker {
        file_id: string;
        width: number;
        height: number;
        thumb?: IPhotoSize;
        emoji?: string;
        set_name?: string;
        mask_position?: IMaskPosition;
        file_size?: number;
      }

      interface IStickerSet {
        name: string;
        title: string;
        contains_masks: boolean;
        stickers: ISticker[];
      }

      interface IPhotoSize {
        file_id: string;
        width: number;
        height: number;
        file_size?: number;
      }

      interface IMaskPosition {
        point: "forehead" | "eyes" | "mouth" | "chin";
        x_shift: number;
        y_shift: number;
        scale: number;
      }
    }

  }

  export = TelegramBot;
}
