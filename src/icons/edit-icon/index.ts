import { Component } from "../../core";
import template from "./template.hbs";
import { Color } from "../../types";

import type { IIconProps } from "../types";

export class EditIcon extends Component<IIconProps> {
    constructor({ id, className, size = 24, fill = Color.black }: IIconProps = {}) {
        super({ id, className, size, fill }, template);
    }
}
