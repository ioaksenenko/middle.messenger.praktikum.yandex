import { Component } from "../../core";
import template from "./template.hbs";

import type { IComponentProps } from "../../core/component/types";

export class Nav extends Component {
    constructor({ id, className, children }: IComponentProps = {}) {
        super({ id, className, children }, template);
    }
}
