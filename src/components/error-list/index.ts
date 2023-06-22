import { Component } from "../../core";
import { Box, Typography, List } from "../../components";
import { BoxWidth } from "../box/types";
import { Color } from "../../types";
import { TypographyTag } from "../typography/types";

import type { TComponentOrComponentArray } from "../../core/component/types";
import type { IErrorListProps } from "./types";

export class ErrorList extends Component<IErrorListProps> {
    protected render(): TComponentOrComponentArray | null {
        return this.props.errors
            ? new Box({
                width: BoxWidth.full,
                children: Object.entries(this.props.errors).map(([key, errors]) => (
                    new Box({
                        width: BoxWidth.full,
                        children: [
                            new Typography({
                                color: Color.error,
                                children: `${key}:`
                            }),
                            new List({
                                children: errors.map(error => (
                                    new Typography({
                                        tag: TypographyTag.li,
                                        color: Color.error,
                                        children: error
                                    })
                                ))
                            })
                        ]
                    })
                ))
            })
            : null;
    }
}
