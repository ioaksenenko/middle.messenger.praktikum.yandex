import { Component } from "../../core";
import { Box } from "../box";
import { BoxTag } from "../box/types";

import type { IMainProps } from "./types";
import type { TComponentOrComponentArray } from "../../core/component/types";

export class Main extends Component<IMainProps> {
    protected render(): TComponentOrComponentArray {
        return new Box({
            ...this.props,
            tag: BoxTag.main
        });
    }
}
