import { identity } from "../../helpers";
import { Component } from "./index";
import { TComponentOrComponentArray, TEventListenerOrEventListenerArray } from "./types";

export const cloneDeep = <T>(value: T): T | Array<T> | Record<string | number | symbol, T> => {
    if (value && typeof value === 'object' && !(value instanceof Component)) {
        if (Array.isArray(value)) {
            return value.map(
                el => cloneDeep(el)
            );
        } else {
            return Object.fromEntries(
                Object.entries(value).map(
                    ([key, val]) => [key, cloneDeep(val)]
                )
            );
        }
    }
    return value;
};


export const isComponentOrComponentArray = (arg: unknown): arg is TComponentOrComponentArray => {
    return arg instanceof Component || Array.isArray(arg) && arg.filter(identity).every(el => el instanceof Component);
};

export const isEventListenerOrEventListenerArray = (key: string, arg: unknown): arg is TEventListenerOrEventListenerArray => {
    return key.startsWith('on') && (typeof arg === 'function' || Array.isArray(arg) && arg.every(el => typeof el === 'function'));
};

const pseudoClasses = ['focus'];

export const isPseudoClass = (key: string, arg: unknown): arg is boolean => {
    return pseudoClasses.includes(key) && typeof arg === 'boolean';
}
