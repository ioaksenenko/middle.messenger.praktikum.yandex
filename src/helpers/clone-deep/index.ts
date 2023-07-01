export const cloneDeep = <T extends object = object>(obj: T): T | Date | Set<unknown> | Map<unknown, unknown> | object | T[] => (
    (function _cloneDeep(item: T): T | Date | Set<unknown> | Map<unknown, unknown> | object | T[] {
        if (item === null || typeof item !== "object") {
            return item;
        }

        if (item instanceof Date) {
            return new Date(item.valueOf());
        }

        if (item instanceof Array) {
            return item.map(val => _cloneDeep(val));
        }

        if (item instanceof Set) {
            const copy = new Set();
            item.forEach(
                val => copy.add(_cloneDeep(val))
            );
            return copy;
        }

        if (item instanceof Map) {
            const copy = new Map();
            item.forEach(
                (val, key) => copy.set(key, _cloneDeep(val))
            );
            return copy;
        }

        if (item instanceof Object) {
            return Object.fromEntries(
                Object.entries(item).map(
                    ([key, val]) => [key, _cloneDeep(val)]
                )
            );
        }

        throw new Error(`Unable to copy object: ${String(item)}`);
    })(obj)
);
