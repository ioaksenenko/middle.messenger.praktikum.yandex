import { Component } from "../../core";
import { Box } from "../box";
import { BoxHeight, BoxPosition, BoxWidth } from "../box/types";
import { classNames } from "../../helpers";

import type { IOverlayProps } from "./types";
import type { TComponentOrComponentArray } from "../../core/component/types";

export class Overlay extends Component<IOverlayProps> {
    protected render(): TComponentOrComponentArray {
        return new Box({
            width: BoxWidth.full,
            height: BoxHeight.full,
            position: BoxPosition.absolute,
            className: classNames("overlay", this.props.className)
        });
    }
}
