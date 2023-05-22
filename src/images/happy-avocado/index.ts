import { Component } from "../../core";
import { IImageProps } from "../types";
import template from "./template.hbs";

export class HappyAvocado extends Component<IImageProps> {
    constructor({id, className, size = 130}: IImageProps = {}) {
        super({id, className, size}, template);
    }
}
