import { Component } from "../../core";
import { IPageProps } from "./types";
import { Header } from "../header";
import { Main } from "../main";
import { Footer } from "../footer";
import { Box } from "../box";
import { BoxHeight, BoxTag } from "../box/types";

export class Page extends Component<IPageProps> {
    render() {
        return new Box({
            tag: BoxTag.body,
            children: [
                new Header(),
                new Main({
                    ...this.props,
                    height: BoxHeight.full
                }),
                new Footer()
            ]
        })
    }
}
