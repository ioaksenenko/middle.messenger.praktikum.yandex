import { Component } from "../../core";
import { IQuestionLinkProps } from "./types";
import { Box } from "../box";
import { BoxJustifyContent, BoxGap, BoxFlexDirection } from "../box/types";
import { Typography } from "../typography";
import { TypographyVariant } from "../typography/types";
import { Link } from "../link";
import { TComponentOrComponentArray } from "../../core/component/types";
import { Color } from "../../types";

export class QuestionLink extends Component<IQuestionLinkProps> {
    constructor({id, className, children, question, href}: IQuestionLinkProps) {
        super({id, className, children, question, href});
    }

    protected render(): TComponentOrComponentArray {
        return new Box({
            flexDirection: BoxFlexDirection.row,
            justifyContent: BoxJustifyContent.center,
            gap: BoxGap.large,
            children: [
                new Typography({
                    variant: TypographyVariant.bodyL,
                    color: Color.secondary1,
                    children: this.props.question
                }),
                new Link({
                    href: this.props.href,
                    variant: TypographyVariant.bodyL,
                    color: Color.primary1,
                    children: this.props.children
                })
            ]
        });
    }
}
