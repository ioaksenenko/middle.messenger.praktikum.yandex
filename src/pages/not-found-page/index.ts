import { Page, Error } from "../../components";
import { BoxAlignItems, BoxJustifyContent } from "../../components/box/types";
import { Component } from "../../core";
import { TComponentOrComponentArray } from "../../core/component/types";

export class NotFoundPage extends Component {
    protected render(): TComponentOrComponentArray {
        return new Page({
            alignItems: BoxAlignItems.center,
            justifyContent:  BoxJustifyContent.center,
            children: new Error({
                code: 404,
                children: "Не туда, Семпай!"
            })
        })
    }
}
