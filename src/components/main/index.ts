import { Component } from "../../core";
import { IMainProps } from "./types";
import { TComponentOrComponentArray } from "../../core/component/types";
import { Box } from "../box";
import { BoxTag } from "../box/types";

export class Main extends Component<IMainProps> {
    protected render(): TComponentOrComponentArray {
        return new Box({
            ...this.props,
            tag: BoxTag.main
        })
    }
}
