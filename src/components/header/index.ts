import { Component } from "../../core";
import { IHeaderProps } from "./types";
import { TComponentOrComponentArray } from "../../core/component/types";
import { Box } from "../box";
import { BoxTag } from "../box/types";

export class Header extends Component<IHeaderProps> {
    protected render(): TComponentOrComponentArray {
        return new Box({
            ...this.props,
            tag: BoxTag.header
        })
    }
}
