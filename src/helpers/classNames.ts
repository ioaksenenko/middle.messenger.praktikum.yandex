import { identity } from "./identity";

export const classNames = (...classes: Array<string | undefined>): string => {
    return classes.filter(identity).join(' ');
}
