export const toCamelCase = (str: string): string => (
    str
        .replace(/_(.)/g, ($1) => $1.toUpperCase())
        .replace(/_/g, "")
        .replace(/^(.)/, ($1) => $1.toLowerCase())
);
