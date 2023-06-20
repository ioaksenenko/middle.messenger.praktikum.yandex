import type { IResponseError } from "../base-api/types";

export interface IUser extends Record<string, string | number> {
    id: number;
    first_name: string;
    second_name: string;
    display_name: string;
    login: string;
    email: string;
    phone: string;
    avatar: string;
}

export type TUserRetrieveResponseData = IUser & IResponseError;

export type TUserUpdateRequestData = Omit<IUser, "id" | "avatar">;
