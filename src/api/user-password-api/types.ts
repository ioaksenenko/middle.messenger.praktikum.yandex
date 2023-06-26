import type { IResponseError } from "../base-api/types";

export interface IUserPasswordUpdateRequestData extends Record<string, string> {
    oldPassword: string;
    newPassword: string;
}

export type TUserPasswordUpdateResponseData = IResponseError;
