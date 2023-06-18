import type { IUser } from "../../data";
import type { IResponseError } from "../base-api/types";

export interface IMessage {
    user: Omit<IUser, "id" | "display_name">;
    time: string;
    content: string;
}

export interface IChat {
    id: number;
    title: string;
    avatar: string;
    unread_count: number;
    last_message: IMessage;
}

export type TChatList = IChat[];

export interface IChatListRequestData extends Record<string, string | number> {
    offset: number;
    limit: number;
    title: string;
}

export type TChatListResponseData = TChatList & IResponseError;

export interface IChatCreateRequestData extends Record<string, string> {
    title: string;
}

export interface IChatDeleteRequestData extends Record<string, number> {
    chatId: number;
}

export interface IChatDeleteResponseData {
    userId: number;
    result: Omit<IChat, "unread_count" | "last_message">;
}
