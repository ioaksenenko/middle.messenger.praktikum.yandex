import { Page, Error } from "../../components";
import { BoxAlignItems, BoxJustifyContent } from "../../components/box/types";
import { Component } from "../../core";

import type { TComponentOrComponentArray } from "../../core/component/types";

export class ServerErrorPage extends Component {
    protected render(): TComponentOrComponentArray {
        return new Page({
            alignItems: BoxAlignItems.center,
            justifyContent: BoxJustifyContent.center,
            children: new Error({
                code: 500,
                children: "Внутренняя ошибка сервера"
            })
        });
    }
}
