import { TRequestData } from "./types";

export const queryStringify = (data: TRequestData) => {
    return data
        ? '?' + Object.entries(data).map(
            ([key, val]) => `${key}=${val}`
        ).join('&')
        : '';
}
