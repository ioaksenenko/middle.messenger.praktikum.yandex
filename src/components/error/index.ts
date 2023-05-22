import { Component } from "../../core";
import { IErrorProps } from "./types";
import { TComponentOrComponentArray } from "../../core/component/types";
import { Box } from "../box";
import { Typography } from "../typography";
import { SadAvocado } from "../../images";
import { TypographyVariant } from "../typography/types";
import { Link } from "../link";
import { BoxAlignItems, BoxGap, BoxJustifyContent } from "../box/types";

export class Error extends Component<IErrorProps> {
    constructor({id, className, children, code}: IErrorProps) {
        super({id, className, children, code});
    }

    protected render(): TComponentOrComponentArray {
        return new Box({
            alignItems: BoxAlignItems.center,
            justifyContent: BoxJustifyContent.center,
            gap: BoxGap.xlarge,
            children: [
                new Typography({
                    children: this.props.code,
                    variant: TypographyVariant.mega
                }),
                new SadAvocado({
                    size: 250
                }),
                new Typography({
                    children: this.props.children,
                    variant: TypographyVariant.mega
                }),
                new Link({
                    href: "/chats/",
                    children: "Вернуться к чатам"
                })
            ]
        })
    }
}
