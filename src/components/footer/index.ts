import { Component } from "../../core";
import { Box } from "../box";
import { BoxTag } from "../box/types";

import type { IFooterProps } from "./types";
import type { TComponentOrComponentArray } from "../../core/component/types";

export class Footer extends Component<IFooterProps> {
    protected render(): TComponentOrComponentArray {
        return new Box({
            ...this.props,
            tag: BoxTag.footer
        });
    }
}
