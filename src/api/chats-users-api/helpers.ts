import type { IChatsUsersRequestData, IChatsUsersListRequestData } from "./types";

export const isChatsUsersRequestData = (value: unknown): value is IChatsUsersRequestData => (
    typeof value === "object" &&
    value !== null &&
    Object.prototype.hasOwnProperty.call(value, "users") &&
    Object.prototype.hasOwnProperty.call(value, "chatId") &&
    Object.keys(value).length === 2
);

export const isChatsUsersListRequestData = (value: unknown): value is IChatsUsersListRequestData => (
    !value || (
        typeof value === "object" &&
        Object.prototype.hasOwnProperty.call(value, "chatId") &&
        Object.keys(value).filter(name => !["chatId", "offset", "limit", "name", "email"].includes(name)).length === 0
    )
);
