import type { IUserSearchRequestData } from "./types";

export const isUserSearchRequestData = (value: unknown): value is IUserSearchRequestData => (
    typeof value === "object" && value && Object.prototype.hasOwnProperty.call(value, "login") && Object.keys(value).length === 1
);
