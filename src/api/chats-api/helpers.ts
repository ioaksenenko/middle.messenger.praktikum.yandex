import type { IChatListRequestData, IChatCreateRequestData, IChatDeleteRequestData } from "./types";

export const isChatListRequestData = (value: unknown): value is IChatListRequestData => (
    !value || (
        typeof value === "object" &&
        Object.keys(value).filter(name => !["offset", "limit", "title"].includes(name)).length === 0
    )
);

export const isChatCreateRequestData = (value: unknown): value is IChatCreateRequestData => (
    typeof value === "object" &&
    value !== null &&
    Object.prototype.hasOwnProperty.call(value, "title") &&
    Object.keys(value).length === 1
);

export const isChatDeleteRequestData = (value: unknown): value is IChatDeleteRequestData => (
    typeof value === "object" &&
    value !== null &&
    Object.prototype.hasOwnProperty.call(value, "chatId") &&
    Object.keys(value).length === 1
);
