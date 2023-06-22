import { Component } from "../../core";
import {
    Box,
    Page,
    MessageList,
    MessageInputBox,
    ChatHeader,
    ChatSidebar
} from "../../components";
import { BoxFlexDirection, BoxHeight, BoxWidth } from "../../components/box/types";

import type { TComponentOrComponentArray } from "../../core/component/types";

class ChatsPage extends Component {
    protected render(): TComponentOrComponentArray {
        return new Page({
            flexDirection: BoxFlexDirection.row,
            children: [
                new ChatSidebar(),
                new Box({
                    height: BoxHeight.full,
                    width: BoxWidth.full,
                    children: [
                        new ChatHeader(),
                        new MessageList(),
                        new MessageInputBox()
                    ]
                })
            ]
        });
    }
}

export default ChatsPage;
