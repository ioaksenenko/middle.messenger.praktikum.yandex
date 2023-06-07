export const last = <T>(list: T[]): T | undefined => (
    Array.isArray(list) && list.length ? list[list.length - 1] : undefined
);
