import { render, isEqual } from "./helpers";

import type { Component } from "../component";
import type { IRouteProps } from "./types";

export class Route<P extends Record<string, any> = any> {
    protected readonly _ComponentClass: typeof Component<P>;
    protected readonly _props: IRouteProps;
    protected _component: Component<P> | null;
    protected _pathname: string;

    constructor(pathname: string, ComponentClass: typeof Component<P>, props: IRouteProps) {
        this._pathname = pathname;
        this._ComponentClass = ComponentClass;
        this._component = null;
        this._props = props;
    }

    navigate(pathname: string): void {
        if (this.match(pathname)) {
            this.render();
        }
    }

    leave(): void {
        this._component?.hide(this._props.rootQuery);
    }

    match(pathname: string): boolean {
        return isEqual(pathname, this._pathname);
    }

    render(): void {
        if (!this._component) {
            this._component = new this._ComponentClass();
            render(this._props.rootQuery, this._component);
            return;
        }
        this._component.show(this._props.rootQuery);
    }
}
