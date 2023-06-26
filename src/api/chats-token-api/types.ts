import type { IResponseError } from "../base-api/types";

export interface IChatsTokenRequestData extends Record<string, number> {
    id: number;
}

export interface IChatsToken {
    token: string;
}

export type TChatsTokenResponseData = IChatsToken[] & IResponseError;
