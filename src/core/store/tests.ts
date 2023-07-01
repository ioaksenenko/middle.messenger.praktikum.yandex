import * as sinon from "sinon";
import { assert } from "chai";
import { merge, set } from "./helpers";
import { Store } from ".";
import { StoreEvents } from "./types";

import type { TState } from "./types";

describe("merge function tests", () => {
    it("should merge nested objects", () => {
        const lhs = { a: { b: { a: 2 } }, d: 5 };
        const rhs = { a: { b: { c: 1 } } };

        const res = merge(lhs, rhs);

        const expected = `{"a":{"b":{"a":2,"c":1}},"d":5}`;
        const actual = JSON.stringify(res);

        assert.equal(actual, expected);
    });
});

describe("set function tests", () => {
    it("should set nested objects", () => {
        const obj = { foo: 5 };
        const path = "bar.baz";
        const value = 10;

        const res = set(obj, path, value);

        const expected = `{"foo":5,"bar":{"baz":10}}`;
        const actual = JSON.stringify(res);

        assert.equal(actual, expected);
    });

    it("should not set value if obj is not object", () => {
        const obj = 3;
        const path = "foo.bar";
        const value = "baz";

        const res = set(obj, path, value);

        const expected = "3";
        const actual = JSON.stringify(res);

        assert.equal(actual, expected);
    });
});

describe("Store class tests", () => {
    it("should has empty state when initialized", () => {
        const MockedStore = class extends Store {
            public getState(): TState {
                return this._state;
            }
        };
        const instance = new MockedStore();

        const expected = "{}";
        const actual = JSON.stringify(instance.getState());

        assert.equal(actual, expected);
    });

    it("should change state when call set method", () => {
        const MockedStore = class extends Store {
            public getState(): TState {
                return this._state;
            }
        };
        const instance = new MockedStore();
        const path: string = "a";
        const value: string = "b";

        instance.set(path, value);

        const expected = `{"a":"b"}`;
        const actual = JSON.stringify(instance.getState());

        assert.equal(actual, expected);
    });

    it("should change state and leave existing properties unchanged", () => {
        const MockedStore = class extends Store {
            protected readonly _state: TState = {
                a: "b"
            };

            public getState(): TState {
                return this._state;
            }
        };
        const instance = new MockedStore();
        const path: string = "c";
        const value: string = "d";

        instance.set(path, value);

        const expected = `{"a":"b","c":"d"}`;
        const actual = JSON.stringify(instance.getState());

        assert.equal(actual, expected);
    });

    it("should set nested property", () => {
        const MockedStore = class extends Store {
            protected readonly _state: TState = {
                a: {
                    b: "c"
                }
            };

            public getState(): TState {
                return this._state;
            }
        };
        const instance = new MockedStore();
        const path: string = "a.d";
        const value: string = "e";

        instance.set(path, value);

        const expected = `{"a":{"b":"c","d":"e"}}`;
        const actual = JSON.stringify(instance.getState());

        assert.equal(actual, expected);
    });

    it("should emit updated event when call set method", () => {
        const MockedStore = class extends Store {
            constructor() {
                super();
                this._listeners = {
                    [StoreEvents.Updated]: [(): void => {}]
                };
            }

            emit = sinon.fake();

            getState(): TState {
                return this._state;
            }
        };
        const instance = new MockedStore();
        const path: string = "a";
        const value: string = "b";

        instance.set(path, value);

        assert.isTrue(instance.emit.calledWith(StoreEvents.Updated));
    });
});
