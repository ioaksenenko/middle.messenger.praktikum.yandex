import { Nav, NavLink, Page } from "../../components";
import { BoxAlignItems, BoxJustifyContent } from "../../components/box/types";
import { Component } from "../../core";
import { TComponentOrComponentArray } from "../../core/component/types";

export class NavigationPage extends Component {
    protected render(): TComponentOrComponentArray {
        return new Page({
            alignItems: BoxAlignItems.center,
            justifyContent: BoxJustifyContent.center,
            children: new Nav({
                children: [
                    new NavLink({
                        href: "/login",
                        children: "Авторизация"
                    }),
                    new NavLink({
                        href: "/registration/",
                        children: "Регистрация"
                    }),
                    new NavLink({
                        href: "/chats/",
                        children: "Страница чатов"
                    }),
                    new NavLink({
                        href: "/profile/",
                        children: "Профиль пользователя"
                    }),
                    new NavLink({
                        href: "/not-found/",
                        children: "Ошибка 404"
                    }),
                    new NavLink({
                        href: "/server-error/",
                        children: "Ошибка 500"
                    })
                ]
            })
        })
    }
}
