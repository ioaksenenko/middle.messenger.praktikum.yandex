import { EventBus } from "../event-bus";
import { StoreEvents } from "./types";
import { set } from "./helpers";
import { cloneDeep } from "../../helpers";

import type { TState } from "./types";

export class Store extends EventBus {
    protected readonly _state: TState = {};

    public getState(): TState {
        return cloneDeep(this._state);
    }

    public set(path: string, value: unknown): void {
        set(this._state, path, value);
        if (typeof this._listeners[StoreEvents.Updated] !== "undefined") {
            this.emit(StoreEvents.Updated);
        }
    }
}

export default new Store();
