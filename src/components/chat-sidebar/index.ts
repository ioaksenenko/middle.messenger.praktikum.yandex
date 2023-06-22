import { Component } from "../../core";
import { Box } from "../box";
import { SearchIcon } from "../../icons";
import { Size, Color, Shape } from "../../types";
import { InputBox } from "../input-box";
import ChatList from "../chat-list";
import ChatSidebarHeader from "../chat-sidebar-header";
import { BoxHeight } from "../box/types";

import type { TComponentOrComponentArray } from "../../core/component/types";

class ChatSidebar extends Component {
    protected render(): TComponentOrComponentArray {
        return new Box({
            height: BoxHeight.full,
            className: "chat-page__sidebar",
            children: [
                new ChatSidebarHeader(),
                new InputBox({
                    className: "chat-page__search",
                    size: Size.small,
                    color: Color.primary1,
                    shape: Shape.circular,
                    placeholder: "Поиск",
                    icon: new SearchIcon({
                        fill: Color.primary1
                    })
                }),
                new ChatList()
            ]
        });
    }
}

export default ChatSidebar;
