import type { IUserPasswordUpdateRequestData } from "./types";

export const isUserPasswordUpdateRequestData = (value: unknown): value is IUserPasswordUpdateRequestData => (
    typeof value === "object" &&
    value &&
    Object.prototype.hasOwnProperty.call(value, "oldPassword") &&
    Object.prototype.hasOwnProperty.call(value, "newPassword") &&
    Object.keys(value).length === 2
);
