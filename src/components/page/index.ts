import { Component } from "../../core";
import { Header } from "../header";
import { Main } from "../main";
import { Footer } from "../footer";
import { BoxHeight } from "../box/types";

import type { IPageProps } from "./types";
import type { TComponentOrComponentArray } from "../../core/component/types";

export class Page extends Component<IPageProps> {
    protected render(): TComponentOrComponentArray {
        return [
            new Header(),
            new Main({
                ...this.props,
                height: BoxHeight.full
            }),
            new Footer()
        ];
    }
}
