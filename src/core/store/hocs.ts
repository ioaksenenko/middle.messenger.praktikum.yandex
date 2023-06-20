import store from "../../core/store";
import { StoreEvents } from "../../core/store/types";
import { isEqual } from "../../core/store/helpers";

import type { TState } from "../../core/store/types";
import type { Component } from "../../core";

export const connect = <S extends Record<string, any> = any, P extends Record<string, any> = any>(
    mapStateToProps: (state: TState) => S
) => (
    ComponentClass: typeof Component<S & P>
) => class extends ComponentClass {
    constructor(props: S & P) {
        let state = mapStateToProps(store.getState()) || {};

        super({ ...(props ?? {}), ...state });

        store.on(StoreEvents.Updated, () => {
            const newState = mapStateToProps(store.getState()) || {};

            if (!isEqual(state, newState)) {
                this.setProps({ ...props, ...newState });
            }

            state = newState;
        });
    }
};
