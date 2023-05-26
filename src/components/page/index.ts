import { Component } from "../../core";
import { IPageProps } from "./types";
import { Main } from "../main";
import { BoxHeight } from "../box/types";

export class Page extends Component<IPageProps> {
    render() {
        return new Main({
            ...this.props,
            height: BoxHeight.full
        })
    }
}
