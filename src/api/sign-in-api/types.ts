import type { IResponseError } from "../base-api/types";

export interface ISignInRequestData extends Record<string, string> {
    login: string;
    password: string;
}

export interface ISignInResponseSuccess {
    user_id: number;
}

export type TSignInResponseData = ISignInResponseSuccess & IResponseError;
