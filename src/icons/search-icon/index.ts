import { Component } from "../../core";
import { IIconProps } from "../types";
import template from "./template.hbs";
import { Color } from "../../types";

export class SearchIcon extends Component<IIconProps> {
    constructor({id, className, size = 24, fill = Color.black}: IIconProps = {}) {
        super({id, className, size, fill}, template);
    }
}
