import { Route } from "../route";
import type { Component } from "../component";

export class Router {
    private static __instance: Router;
    protected routes: Route[];
    protected history: History;
    private _currentRoute: Route | null;
    private readonly _rootQuery: string;

    constructor(rootQuery: string) {
        if (Router.__instance) {
            return Router.__instance;
        }

        this.routes = [];
        this.history = window.history;
        this._currentRoute = null;
        this._rootQuery = rootQuery;

        Router.__instance = this;
    }

    use<P extends Record<string, any> = any>(pathname: string, block: typeof Component<P>): Router {
        const route = new Route(pathname, block, { rootQuery: this._rootQuery });
        this.routes.push(route);
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
        this.history.pushState({}, "", pathname);
        this._onRoute(pathname);
    }

    back(): void {
        this.history.back();
    }

    forward(): void {
        this.history.forward();
    }

    getRoute(pathname: string): Route | undefined {
        return this.routes.find(
            route => route.match(pathname)
        );
    }
}
