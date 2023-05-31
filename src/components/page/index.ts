import { Component } from "../../core";
import { Main } from "../main";
import { BoxHeight } from "../box/types";

import type { IPageProps } from "./types";
import type { TComponentOrComponentArray } from "../../core/component/types";

export class Page extends Component<IPageProps> {
    protected render(): TComponentOrComponentArray {
        return new Main({
            ...this.props,
            height: BoxHeight.full
        });
    }
}
