import { identity } from "../identity";

export const classNames = (...classes: Array<string | undefined | boolean>): string => {
    return classes.filter(identity).join(" ");
};
