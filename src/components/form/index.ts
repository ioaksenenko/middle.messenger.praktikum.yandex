import { Component } from "../../core";
import { FormMethod } from "./types";
import template from "./template.hbs";

import type { IFormProps } from "./types";

export class Form extends Component<IFormProps> {
    constructor({
        id,
        className,
        children,
        method = FormMethod.get,
        action,
        onSubmit
    }: IFormProps = {}) {
        super({
            id,
            className,
            children,
            method,
            action,
            onSubmit
        }, template);
    }
}
