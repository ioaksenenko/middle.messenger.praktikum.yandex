import { Component } from "../../core";
import { Box } from "../box";
import { BoxTag } from "../box/types";

import type { IHeaderProps } from "./types";
import type { TComponentOrComponentArray } from "../../core/component/types";

export class Header extends Component<IHeaderProps> {
    protected render(): TComponentOrComponentArray {
        return new Box({
            ...this.props,
            tag: BoxTag.header
        });
    }
}
