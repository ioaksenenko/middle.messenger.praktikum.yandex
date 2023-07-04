import { chatsUsersApi } from "../../api";
import store from "../../core/store";
import { Router } from "../../core/router";

import type { IChatsUsersRequestData, IChatsUsersListRequestData } from "../../api/types";

const router = new Router("#root");

export class ChatsUsersController {
    public addUsers(data: IChatsUsersRequestData): void {
        store.set("chatsUsers.loading", true);
        store.set("chatsUsers.errors", null);

        chatsUsersApi.update(data).then(response => {
            switch (response.status) {
                case 200: {
                    break;
                }
                case 400: {
                    store.set("chatsUsers.errors", {
                        "Bad Request": [response.data.reason]
                    });
                    break;
                }
                case 401: {
                    router.go("/");
                    break;
                }
                case 500: {
                    router.go("/server-error/");
                    break;
                }
                default: {
                    throw new Error(`Необработанный код ответа ${response.status}`);
                }
            }
        }).catch(error => {
            console.log(error);
        }).finally(() => {
            store.set("chatsUsers.loading", false);
        });
    }

    public delUsers(data: IChatsUsersRequestData): void {
        store.set("chatsUsers.loading", true);
        store.set("chatsUsers.errors", null);

        chatsUsersApi.delete(data).then(response => {
            switch (response.status) {
                case 200: {
                    break;
                }
                case 400: {
                    store.set("chatsUsers.errors", {
                        "Bad Request": [response.data.reason]
                    });
                    break;
                }
                case 401: {
                    router.go("/");
                    break;
                }
                case 500: {
                    router.go("/server-error/");
                    break;
                }
                default: {
                    throw new Error(`Необработанный код ответа ${response.status}`);
                }
            }
        }).catch(error => {
            console.log(error);
        }).finally(() => {
            store.set("chatsUsers.loading", false);
        });
    }

    public getUsers(data: IChatsUsersListRequestData): void {
        store.set("chatsUsers.loading", true);
        store.set("chatsUsers.errors", null);

        chatsUsersApi.request(data).then(response => {
            switch (response.status) {
                case 200: {
                    store.set("chatsUsers.data", response.data);
                    store.set("userSearchResults.data", response.data);
                    break;
                }
                case 401: {
                    router.go("/");
                    break;
                }
                case 404: {
                    store.set("chatsUsers.errors", {
                        "Not found": ["Чат не найден"]
                    });
                    break;
                }
                case 500: {
                    router.go("/server-error/");
                    break;
                }
                default: {
                    throw new Error(`Необработанный код ответа ${response.status}`);
                }
            }
        }).catch(error => {
            console.log(error);
        }).finally(() => {
            store.set("chatsUsers.loading", false);
        });
    }
}

export default new ChatsUsersController();
