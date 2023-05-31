import { Component } from "../../core";
import template from "./template.hbs";

import type { IImageProps } from "../types";

export class PleasedAvocado extends Component<IImageProps> {
    constructor({ id, className, size = 130 }: IImageProps = {}) {
        super({ id, className, size }, template);
    }
}
