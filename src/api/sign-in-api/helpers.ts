import type { ISignInRequestData } from "./types";

export const isSignInRequestData = (value: unknown): value is ISignInRequestData => (
    typeof value === "object" &&
    value &&
    Object.prototype.hasOwnProperty.call(value, "login") &&
    Object.prototype.hasOwnProperty.call(value, "password") &&
    Object.keys(value).length === 2
);
