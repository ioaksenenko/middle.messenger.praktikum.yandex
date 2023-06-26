import { Component } from "../../core";
import template from "./template.hbs";

import type { ISelectProps } from "./types";

export class Select extends Component<ISelectProps> {
    constructor({ id, children, className, name, multiple }: ISelectProps) {
        super({ id, children, className, name, multiple }, template);
    }
}
