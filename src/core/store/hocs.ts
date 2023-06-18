import store from "../../core/store";
import { StoreEvents } from "../../core/store/types";
import { isEqual } from "../../core/store/helpers";

import type { TState } from "../../core/store/types";
import type { Component } from "../../core";

export const connect = <P extends Record<string, any> = any>(
    mapStateToProps: (state: TState) => P
) => (
    ComponentClass: typeof Component<P>
) => class extends ComponentClass {
    constructor(props: P) {
        let state = mapStateToProps(store.getState()) || {};

        super({ ...props, ...state });

        store.on(StoreEvents.Updated, () => {
            const newState = mapStateToProps(store.getState()) || {};

            if (!isEqual(state, newState)) {
                this.setProps({ ...newState });
            }

            state = newState;
        });
    }
};
