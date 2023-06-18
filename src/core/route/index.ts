import { render, isEqual } from "./helpers";

import type { Component } from "../component";

export interface IRouteProps {
    rootQuery: string;
}

export class Route<P extends Record<string, any> = any> {
    private _pathname: string;
    private readonly _blockClass: typeof Component<P>;
    private _block: Component<P> | null;
    private readonly _props: IRouteProps;

    constructor(pathname: string, view: typeof Component<P>, props: IRouteProps) {
        this._pathname = pathname;
        this._blockClass = view;
        this._block = null;
        this._props = props;
    }

    navigate(pathname: string): void {
        if (this.match(pathname)) {
            this._pathname = pathname;
            this.render();
        }
    }

    leave(): void {
        this._block?.hide(this._props.rootQuery);
    }

    match(pathname: string): boolean {
        return isEqual(pathname, this._pathname);
    }

    render(): void {
        if (!this._block) {
            this._block = new this._blockClass();
            render(this._props.rootQuery, this._block);
            return;
        }
        this._block.show(this._props.rootQuery);
    }
}
