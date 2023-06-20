import type { TUserUpdateRequestData } from "./types";

export const isUserUpdateRequestData = (value: unknown): value is TUserUpdateRequestData => (
    typeof value === "object" &&
    value &&
    Object.prototype.hasOwnProperty.call(value, "first_name") &&
    Object.prototype.hasOwnProperty.call(value, "second_name") &&
    Object.prototype.hasOwnProperty.call(value, "display_name") &&
    Object.prototype.hasOwnProperty.call(value, "login") &&
    Object.prototype.hasOwnProperty.call(value, "email") &&
    Object.prototype.hasOwnProperty.call(value, "phone") &&
    Object.keys(value).length === 6
);
