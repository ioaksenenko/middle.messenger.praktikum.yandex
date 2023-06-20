import type { IResponseError } from "../base-api/types";

export interface ISignUpRequestData extends Record<string, string> {
    first_name: string;
    second_name: string;
    login: string;
    email: string;
    password: string;
    phone: string;
}

export interface ISignUpResponseSuccess {
    id: number;
}

export type TSignUpResponseData = ISignUpResponseSuccess & IResponseError;
