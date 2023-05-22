import { Component } from "../../core";
import { TComponentOrComponentArray } from "../../core/component/types";
import { Box } from "../box";
import { IAvatarProps } from "./types";
import { classNames } from "../../helpers";
import { Image } from "../image";
import { Overlay } from "../overlay";
import { BoxFlexDirection } from "../box/types";
import { HappyAvocado } from "../../images";

export class Avatar extends Component<IAvatarProps> {
    constructor({id, className, children, src, size = 130}: IAvatarProps = {}) {
        super({id, className, children, src, size});
    }

    protected render(): TComponentOrComponentArray {
        return new Box({
            className: classNames("avatar", this.props.className),
            children: [
                this.props.src ? new Image({
                    className: "avatar__image",
                    src: this.props.src,
                    width: this.props.size,
                    height: this.props.size,
                    alt: "avatar"
                }) : new HappyAvocado({
                    size: this.props.size
                }),
                ...(this.props.children ? [
                    new Overlay({
                        className: "avatar__overlay"
                    }),
                    new Box({
                        className: "avatar__actions",
                        children: this.props.children,
                        flexDirection: BoxFlexDirection.row
                    })
                ] : [])
            ]
        });
    }
}
