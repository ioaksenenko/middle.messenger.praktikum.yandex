import { Component } from "../../core";
import { Color } from "../../types";
import template from "./template.hbs";

import type { IIconProps } from "../types";

export class UploadIcon extends Component<IIconProps> {
    constructor({ id, className, size = 24, fill = Color.black }: IIconProps = {}) {
        super({ id, className, size, fill }, template);
    }
}
