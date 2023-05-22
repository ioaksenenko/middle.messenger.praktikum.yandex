import { Component } from "../../core";
import { IImageProps } from "./types";
import template from "./template.hbs";

export class Image extends Component<IImageProps> {
    constructor({id, className, src, width, height, alt}: IImageProps) {
        super({id, className, src, width, height, alt}, template);
    }
}
