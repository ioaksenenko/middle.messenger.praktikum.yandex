import type { IChatsTokenRequestData } from "./types";

export const isChatsTokenRequestData = (value: unknown): value is IChatsTokenRequestData => (
    typeof value === "object" &&
    value &&
    Object.prototype.hasOwnProperty.call(value, "id") &&
    Object.keys(value).length === 1
);
