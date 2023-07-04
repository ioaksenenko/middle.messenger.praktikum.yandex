import { Component } from "../../core";
import { Box } from "../box";
import { connect } from "../../core/store/hocs";
import { InputBox } from "../input-box";
import store from "../../core/store";
import { userSearchController } from "../../controllers";
import { BoxGap, BoxWidth } from "../box/types";
import { Typography } from "../typography";
import { getDisplayName } from "../../controllers/user-controller/helpers";
import { Button } from "../button";
import { ButtonView } from "../button/types";
import { Shape } from "../../types";
import { cloneDeep } from "../../helpers";
import { TypographyVariant } from "../typography/types";

import type { IUserSearchState } from "./types";
import type { TComponentOrComponentArray } from "../../core/component/types";

class UserSearch extends Component<IUserSearchState> {
    protected render(): TComponentOrComponentArray {
        return new Box({
            width: BoxWidth.full,
            gap: BoxGap.middle,
            className: "user-search",
            children: [
                new InputBox({
                    label: "Поиск",
                    onChange: this.handleSearchInputChange.bind(this),
                    className: "user-search__input",
                    value: this.props.searchResults?.query
                }),
                ...(this.props.searchResults?.selectedUsers?.length
                    ? [
                        new Typography({
                            variant: TypographyVariant.h4,
                            children: "Выбранные пользователи:"
                        }),
                        new Box({
                            width: BoxWidth.full,
                            children: this.props.searchResults?.selectedUsers.map(
                                user => new Button({
                                    id: user.id,
                                    view: ButtonView.ghost,
                                    shape: Shape.geometric,
                                    children: getDisplayName(user) || "Безымянный пользователь",
                                    onClick: this.handleUnselectButtonClick.bind(this),
                                    className: "user-search__select-button"
                                })
                            )
                        }),
                        new Typography({
                            variant: TypographyVariant.h4,
                            children: "Результаты поиска:"
                        })
                    ]
                    : []
                ),
                new Box({
                    width: BoxWidth.full,
                    children: this.props.searchResults
                        ? this.props.searchResults.data?.length
                            ? this.props.searchResults.data.map(
                                user => new Button({
                                    id: user.id,
                                    view: ButtonView.ghost,
                                    shape: Shape.geometric,
                                    children: getDisplayName(user) || "Безымянный пользователь",
                                    onClick: this.handleSelectButtonClick.bind(this),
                                    className: "user-search__select-button"
                                })
                            )
                            : new Typography({
                                children: "Пользователя с таким логином не найдено"
                            })
                        : new Typography({
                            children: "Введите логин пользователя в поисковую строку для отображения результата"
                        })
                })
            ]
        });
    }

    private handleSearchInputChange(event: InputEvent): void {
        const input = event.target as HTMLInputElement;
        if (input.value) {
            userSearchController.searchUser({ login: input.value });
        } else {
            store.set("userSearchResults.data", null);
        }
        store.set("userSearchResults.query", input.value);
    }

    private handleSelectButtonClick(event: MouseEvent): void {
        const button = event.currentTarget as HTMLButtonElement;
        const id = button.dataset.id && /\d+/.test(button.dataset.id) ? parseInt(button.dataset.id) : undefined;
        const user = this.props.searchResults?.data?.find(user => user.id === id);
        if (user) {
            store.set("userSearchResults.selectedUsers", [
                ...(this.props.searchResults?.selectedUsers ?? []),
                cloneDeep(user)
            ]);
        }
    }

    private handleUnselectButtonClick(): void {
        //
    }
}

export default connect<IUserSearchState>(
    store => ({ searchResults: store.userSearchResults })
)(UserSearch);
