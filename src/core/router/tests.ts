import * as proxyquire from "proxyquire";
import * as sinon from "sinon";
import { assert } from "chai";
import { Route } from "../route";
import { Router } from ".";
import { Component } from "../component";

import type { IRouteProps } from "../route/types";

type TRouter = typeof Router;

describe("Router class tests", () => {
    it("should be singleton", () => {
        const rootQuery = "#root";
        const lhs = new Router(rootQuery);
        const rhs = new Router(rootQuery);
        assert.equal(lhs, rhs);
    });

    it("should set rootQuery when initialized", () => {
        const MockedRouter = class extends Router {
            get rootQuery(): string {
                return this._rootQuery;
            }

            static resetInstance(): void {
                Router._instance = null;
            }
        };

        MockedRouter.resetInstance();

        const rootQuery = "#root";
        const instance = new MockedRouter(rootQuery);

        const expected = rootQuery;
        const actual = instance.rootQuery;

        assert.equal(actual, expected);
    });

    it("should current route be null when initialized", () => {
        const MockedRouter = class extends Router {
            get currentRoute(): Route | null {
                return this._currentRoute;
            }

            static resetInstance(): void {
                Router._instance = null;
            }
        };

        MockedRouter.resetInstance();

        const rootQuery = "#root";
        const instance = new MockedRouter(rootQuery);

        assert.isNull(instance.currentRoute);
    });

    it("should routes be empty array when initialized", () => {
        const MockedRouter = class extends Router {
            get routes(): Route[] {
                return this._routes;
            }

            static resetInstance(): void {
                Router._instance = null;
            }
        };

        MockedRouter.resetInstance();

        const rootQuery = "#root";
        const instance = new MockedRouter(rootQuery);

        assert.isTrue(Array.isArray(instance.routes) && instance.routes.length === 0);
    });

    describe("use method tests", () => {
        it("should create route", () => {
            const mockedRouteConstructor = sinon.fake();

            const MockedRoute = class extends Route {
                constructor(pathname: string, ComponentClass: typeof Component, props: IRouteProps) {
                    super(pathname, ComponentClass, props);
                    mockedRouteConstructor();
                };
            };

            const { Router }: { Router: TRouter } = proxyquire(".", {
                "../route": {
                    Route: MockedRoute
                }
            });

            const MockedRouter = class extends Router {
                static resetInstance(): void {
                    Router._instance = null;
                }
            };

            MockedRouter.resetInstance();

            const rootQuery = "#root";
            const instance = new MockedRouter(rootQuery);

            const pathname = "/some/path/";
            const ComponentClass = Component;

            instance.use(pathname, ComponentClass);

            assert.isTrue(mockedRouteConstructor.calledOnce);
        });

        it("should add route to routes", () => {
            const MockedRouter = class extends Router {
                constructor(rootQuery: string) {
                    super(rootQuery);
                    this._routes = [];
                }

                get routes(): Route[] {
                    return this._routes;
                }

                static resetInstance(): void {
                    Router._instance = null;
                }
            };

            MockedRouter.resetInstance();

            const rootQuery = "#root";
            const instance = new MockedRouter(rootQuery);

            const pathname = "/some/path/";
            const ComponentClass = Component;

            instance.use(pathname, ComponentClass);

            assert.isTrue(instance.routes.length === 1);
        });
    });

    describe("start method tests", () => {
        it("should set window onpopstate listener", () => {
            window.onpopstate = null;

            const rootQuery = "#root";
            const instance = new Router(rootQuery);

            instance.start();

            assert.isNotNull(window.onpopstate);
        });

        it("should call _onRoute method", () => {
            const mockedOnRouteMethod = sinon.fake();
            const MockedRouter = class extends Router {
                _onRoute = mockedOnRouteMethod;
            };

            const rootQuery = "#root";
            const instance = new MockedRouter(rootQuery);

            instance.start();

            assert.isTrue(mockedOnRouteMethod.calledOnce);
        });
    });

    describe("go method tests", () => {
        it("should call window history push state", () => {
            const rootQuery = "#root";
            const instance = new Router(rootQuery);
            const pathname = "/some/path/";

            const prevLength = window.history.length;

            instance.go(pathname);

            const length = window.history.length;

            assert.isTrue(length - prevLength === 1);
        });

        it("should call _onRoute method with pathname", () => {
            const mockedOnRouteMethod = sinon.fake();
            const MockedRouter = class extends Router {
                _onRoute = mockedOnRouteMethod;
            };

            const rootQuery = "#root";
            const instance = new MockedRouter(rootQuery);
            const pathname = "/some/path/";

            instance.go(pathname);

            assert.isTrue(mockedOnRouteMethod.calledWith(pathname));
        });
    });

    describe("back method tests", () => {
        it("should call window history back", () => {
            const mockedBackHandler = sinon.fake();
            window.history.back = mockedBackHandler;

            const rootQuery = "#root";
            const instance = new Router(rootQuery);

            instance.back();

            assert.isTrue(mockedBackHandler.calledOnce);
        });
    });

    describe("forward method tests", () => {
        it("should call window history forward", () => {
            const mockedForwardHandler = sinon.fake();
            window.history.forward = mockedForwardHandler;

            const rootQuery = "#root";
            const instance = new Router(rootQuery);

            instance.forward();

            assert.isTrue(mockedForwardHandler.calledOnce);
        });
    });

    describe("getRoute method tests", () => {
        it("should return route with passed pathname", () => {
            class MockedRoute extends Route {
                constructor(pathname: string, ComponentClass: typeof Component, props: IRouteProps) {
                    super(pathname, ComponentClass, props);
                    this._pathname = pathname;
                }

                get pathname(): string {
                    return this._pathname;
                }

                match(pathname: string): boolean {
                    return this._pathname === pathname;
                }
            };

            const { Router }: { Router: TRouter } = proxyquire(".", {
                "../route": {
                    Route: MockedRoute
                }
            });

            const pathname = "/some/path/";
            const otherPathname = "/some/other/path/";
            const ComponentClass = Component;
            const props = { rootQuery: "#root" };

            const MockedRouter = class extends Router {
                constructor(rootQuery: string) {
                    super(rootQuery);
                    this._routes = [
                        new MockedRoute(pathname, ComponentClass, props),
                        new MockedRoute(otherPathname, ComponentClass, props)
                    ];
                }

                static resetInstance(): void {
                    Router._instance = null;
                }
            };

            MockedRouter.resetInstance();

            const rootQuery = "#root";
            const instance = new MockedRouter(rootQuery);

            const expected = pathname;
            const actual = (instance.getRoute(pathname) as MockedRoute)?.pathname;

            assert.equal(actual, expected);
        });
    });

    describe("_onRoute method tests", () => {
        it("should call getRoute method", () => {
            const mockedGetRouteMethod = sinon.fake();
            const MockedRouter = class extends Router {
                getRoute = mockedGetRouteMethod;

                static resetInstance(): void {
                    Router._instance = null;
                }

                onRoute(pathname: string): void {
                    this._onRoute(pathname);
                }
            };

            MockedRouter.resetInstance();

            const rootQuery = "#root";
            const instance = new MockedRouter(rootQuery);
            const pathname = "/some/path/";

            instance.onRoute(pathname);

            assert.isTrue(mockedGetRouteMethod.calledOnce);
        });

        it("should call route leave method when current route exists and differents received route", () => {
            const mockedRouteLeaveMethod = sinon.fake();
            const mockedRouteRenderMethod = sinon.fake();
            class MockedRoute extends Route {
                leave = mockedRouteLeaveMethod;
                render = mockedRouteRenderMethod;
            };

            const { Router }: { Router: TRouter } = proxyquire(".", {
                "../route": {
                    Route: MockedRoute
                }
            });

            const pathname = "/some/path/";
            const otherPathname = "/some/other/path/";
            const ComponentClass = Component;
            const props = { rootQuery: "#root" };

            const MockedRouter = class extends Router {
                constructor(rootQuery: string) {
                    super(rootQuery);
                    this._currentRoute = new MockedRoute(pathname, ComponentClass, props);
                    this._routes = [
                        new MockedRoute(otherPathname, ComponentClass, props)
                    ];
                }

                static resetInstance(): void {
                    Router._instance = null;
                }

                onRoute(pathname: string): void {
                    this._onRoute(pathname);
                }
            };

            MockedRouter.resetInstance();

            const rootQuery = "#root";
            const instance = new MockedRouter(rootQuery);

            instance.onRoute(otherPathname);

            assert.isTrue(mockedRouteLeaveMethod.calledOnce);
        });

        it("should change current route with received route when received route differents current one", () => {
            const mockedRouteLeaveMethod = sinon.fake();
            const mockedRouteRenderMethod = sinon.fake();
            class MockedRoute extends Route {
                leave = mockedRouteLeaveMethod;
                render = mockedRouteRenderMethod;

                get pathname(): string {
                    return this._pathname;
                }
            };

            const { Router }: { Router: TRouter } = proxyquire(".", {
                "../route": {
                    Route: MockedRoute
                }
            });

            const pathname = "/some/path/";
            const otherPathname = "/some/other/path/";
            const ComponentClass = Component;
            const props = { rootQuery: "#root" };

            const MockedRouter = class extends Router {
                constructor(rootQuery: string) {
                    super(rootQuery);
                    this._currentRoute = new MockedRoute(pathname, ComponentClass, props);
                    this._routes = [
                        new MockedRoute(otherPathname, ComponentClass, props)
                    ];
                }

                static resetInstance(): void {
                    Router._instance = null;
                }

                onRoute(pathname: string): void {
                    this._onRoute(pathname);
                }

                get currentRoute(): Route | null {
                    return this._currentRoute;
                }
            };

            MockedRouter.resetInstance();

            const rootQuery = "#root";
            const instance = new MockedRouter(rootQuery);

            instance.onRoute(otherPathname);

            const expected = otherPathname;
            const actual = (instance.currentRoute as MockedRoute)?.pathname;

            assert.equal(actual, expected);
        });

        it("should call route render method", () => {
            const mockedRouteLeaveMethod = sinon.fake();
            const mockedRouteRenderMethod = sinon.fake();
            class MockedRoute extends Route {
                leave = mockedRouteLeaveMethod;
                render = mockedRouteRenderMethod;
            };

            const { Router }: { Router: TRouter } = proxyquire(".", {
                "../route": {
                    Route: MockedRoute
                }
            });

            const pathname = "/some/path/";
            const otherPathname = "/some/other/path/";
            const ComponentClass = Component;
            const props = { rootQuery: "#root" };

            const MockedRouter = class extends Router {
                constructor(rootQuery: string) {
                    super(rootQuery);
                    this._currentRoute = new MockedRoute(pathname, ComponentClass, props);
                    this._routes = [
                        new MockedRoute(otherPathname, ComponentClass, props)
                    ];
                }

                static resetInstance(): void {
                    Router._instance = null;
                }

                onRoute(pathname: string): void {
                    this._onRoute(pathname);
                }
            };

            MockedRouter.resetInstance();

            const rootQuery = "#root";
            const instance = new MockedRouter(rootQuery);

            instance.onRoute(otherPathname);

            assert.isTrue(mockedRouteRenderMethod.calledOnce);
        });
    });
});
