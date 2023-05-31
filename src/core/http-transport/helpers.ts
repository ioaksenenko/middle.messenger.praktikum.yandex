import type { TRequestData } from "./types";

export const queryStringify = (data: TRequestData): string => {
    return typeof data === "object" && data
        ? "?" + Object.entries(data).map(
            ([key, val]) => `${key}=${String(val)}`
        ).join("&")
        : "";
};
