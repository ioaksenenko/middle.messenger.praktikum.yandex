import { Route } from "../route";
import type { Component } from "../component";

export class Router {
    protected static _instance: Router | null;
    protected _rootQuery: string;
    protected _currentRoute: Route | null;
    protected _routes: Route[];
    protected _history: History;

    constructor(rootQuery: string) {
        if (Router._instance) {
            return Router._instance;
        }

        this._rootQuery = rootQuery;
        this._currentRoute = null;
        this._routes = [];
        this._history = window.history;

        Router._instance = this;
    }

    use<P extends Record<string, any> = any>(pathname: string, ComponentClass: typeof Component<P>): Router {
        const route = new Route(pathname, ComponentClass, { rootQuery: this._rootQuery });
        this._routes.push(route);
        return this;
    }

    start(): void {
        window.onpopstate = (event: PopStateEvent) => {
            const currentTarget = event.currentTarget as Window;
            currentTarget && this._onRoute(currentTarget.location.pathname);
        };

        this._onRoute(window.location.pathname);
    }

    _onRoute(pathname: string): void {
        const route = this.getRoute(pathname);
        if (!route) {
            return;
        }

        if (this._currentRoute && this._currentRoute !== route) {
            this._currentRoute.leave();
        }

        this._currentRoute = route;
        route.render();
    }

    go(pathname: string): void {
        this._history.pushState({}, "", pathname);
        this._onRoute(pathname);
    }

    back(): void {
        this._history.back();
    }

    forward(): void {
        this._history.forward();
    }

    getRoute(pathname: string): Route | undefined {
        return this._routes.find(
            route => route.match(pathname)
        );
    }
}
