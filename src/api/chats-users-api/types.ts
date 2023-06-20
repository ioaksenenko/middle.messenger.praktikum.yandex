import type { IResponseError } from "../base-api/types";
import type { IUser } from "../user-api/types";

export interface IChatsUsersRequestData extends Record<string, number[] | number> {
    users: number[];
    chatId: number;
}

export type IChatsUsersResponseData = IResponseError;

export interface IChatsUsersListRequestData extends Record<string, number | string | undefined> {
    chatId: number;
    offset?: number;
    limit?: number;
    name?: string;
    email?: string;
}

export type IChatsUsersListResponseData = IUser[] | IResponseError;
