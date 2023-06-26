import { chatsApi } from "../../api";
import store from "../../core/store";
import { Router } from "../../core/router";
import { modal } from "../../components";

import type {
    IChatListRequestData,
    IChatCreateRequestData,
    IChatDeleteRequestData
} from "../../api/types";

const router = new Router("#root");

export class ChatsController {
    public getChats(data?: IChatListRequestData): void {
        store.set("chats.loading", true);
        chatsApi.request(data).then(response => {
            switch (response.status) {
                case 200: {
                    store.set("chats.data", response.data);
                    break;
                }
                case 401: {
                    router.go("/signin/");
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
            store.set("chats.loading", false);
        });
    }

    public createChat(data: IChatCreateRequestData): void {
        store.set("chats.loading", true);
        store.set("chats.errors", null);

        chatsApi.create(data).then(response => {
            switch (response.status) {
                case 200: {
                    this.getChats();
                    modal.hide();
                    break;
                }
                case 400: {
                    store.set("chats.errors", {
                        "Bad Request": [response.data.reason]
                    });
                    break;
                }
                case 401: {
                    router.go("/signin/");
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
            store.set("chats.loading", false);
        });
    }

    public deleteChat(data: IChatDeleteRequestData): void {
        store.set("chats.loading", true);
        store.set("chats.errors", null);

        chatsApi.delete(data).then(response => {
            switch (response.status) {
                case 200: {
                    this.getChats();
                    modal.hide();
                    return;
                }
                case 400: {
                    store.set("chats.errors", {
                        "Bad Request": [response.data.reason]
                    });
                    break;
                }
                case 401: {
                    router.go("/signin/");
                    break;
                }
                case 403: {
                    store.set("chats.errors", {
                        "Ошибка доступа": ["Отсутствуют права на удаление чата"]
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
            store.set("chats.loading", false);
        });
    }
}

export default new ChatsController();
