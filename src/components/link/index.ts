import { Component } from "../../core";
import { Typography } from "../typography";
import { TypographyTag, TypographyVariant } from "../typography/types";
import { Color } from "../../types";
import { Router } from "../../core/router";

import type { ILinkProps } from "./types";
import type { TComponentOrComponentArray } from "../../core/component/types";

const router = new Router("#root");

export class Link extends Component<ILinkProps> {
    constructor({
        id,
        className,
        children,
        variant = TypographyVariant.bodyL,
        color = Color.primary1,
        href,
        onClick
    }: ILinkProps) {
        super({ id, className, children, href, variant, color, onClick });
    }

    protected render(): TComponentOrComponentArray {
        return new Typography({
            className: "link",
            children: this.props.children,
            tag: TypographyTag.a,
            variant: this.props.variant,
            color: this.props.color,
            onClick: this.handleClick.bind(this)
        });
    }

    protected getAttributes(): Record<string, string> {
        return {
            href: this.props.href
        };
    }

    handleClick(event: MouseEvent): void {
        event.preventDefault();
        this.props.onClick?.(event);
        const target = event.target as HTMLLinkElement;
        const url = new URL(target.href);
        router.go(url.pathname);
    }
}
