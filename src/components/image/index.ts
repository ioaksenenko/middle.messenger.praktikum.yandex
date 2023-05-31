import { Component } from "../../core";
import template from "./template.hbs";

import type { IImageProps } from "./types";

export class Image extends Component<IImageProps> {
    constructor({ id, className, src, width, height, alt }: IImageProps) {
        super({ id, className, src, width, height, alt }, template);
    }
}
