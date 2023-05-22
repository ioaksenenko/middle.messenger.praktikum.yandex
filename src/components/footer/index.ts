import { Component } from "../../core";
import { IFooterProps } from "./types";
import { TComponentOrComponentArray } from "../../core/component/types";
import { Box } from "../box";
import { BoxTag } from "../box/types";

export class Footer extends Component<IFooterProps> {
    protected render(): TComponentOrComponentArray {
        return new Box({
            ...this.props,
            tag: BoxTag.footer
        })
    }
}
