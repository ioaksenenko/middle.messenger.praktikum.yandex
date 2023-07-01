import { identity } from "./identity";

export const join = (...args: string[]): string => (
    args.reduce<string[]>((arr, arg) => arr.concat(arg.split(/\/(?<!:\/)/)), []).filter(identity).join("/")
);
