export const last = <T>(list: Array<T>) => 
    Array.isArray(list) && list.length ? list[list.length - 1] : undefined;
