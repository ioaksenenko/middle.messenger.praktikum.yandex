import type { Component } from "../component";

export const isEqual = (lhs: string, rhs: string): boolean => (
    lhs === rhs
);

export const render = (query: string, block: Component): Element | null => {
    const root = document.querySelector(query);
    root?.replaceWith(block.getContent());
    return root;
};
