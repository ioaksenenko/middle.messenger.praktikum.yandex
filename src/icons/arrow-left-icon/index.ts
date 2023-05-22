import { Component } from "../../core";
import { Color } from "../../types";
import { IIconProps } from "../types";
import template from "./template.hbs";

export class ArrowLeftIcon extends Component<IIconProps> {
    constructor({id, className, size = 24, fill = Color.black}: IIconProps = {}) {
        super({id, className, size, fill}, template);
    }
}
