export const queryStringify = (data: unknown): string => {
    return typeof data === "object" && data
        ? "?" + Object.entries(data).map(
            ([key, val]) => `${key}=${String(val)}`
        ).join("&")
        : "";
};
