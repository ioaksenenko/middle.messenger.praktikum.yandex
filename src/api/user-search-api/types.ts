import type { IResponseError } from "../base-api/types";
import type { IUser } from "../user-api/types";

export interface IUserSearchRequestData extends Record<string, string> {
    login: string;
}

export type TUserSearchResponseData = IUser[] & IResponseError;
