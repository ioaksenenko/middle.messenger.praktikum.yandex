import type { ISignUpRequestData } from "./types";

export const isSignUpRequestData = (value: unknown): value is ISignUpRequestData => (
    typeof value === "object" &&
    value &&
    Object.prototype.hasOwnProperty.call(value, "first_name") &&
    Object.prototype.hasOwnProperty.call(value, "second_name") &&
    Object.prototype.hasOwnProperty.call(value, "login") &&
    Object.prototype.hasOwnProperty.call(value, "email") &&
    Object.prototype.hasOwnProperty.call(value, "password") &&
    Object.prototype.hasOwnProperty.call(value, "phone") &&
    Object.keys(value).length === 6
);
