import { Component } from "../../core";
import template from "./template.hbs";

import type { IOptionProps } from "./types";

export class Option extends Component<IOptionProps> {
    constructor({ id, children, className, value }: IOptionProps) {
        super({ id, children, className, value }, template);
    }
}
