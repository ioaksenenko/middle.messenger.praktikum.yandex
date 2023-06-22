import { chatsTokenApi } from "../../api";
import store from "../../core/store";
import { Router } from "../../core/router";

import type { IChatsTokenRequestData } from "../../api/types";

const router = new Router("#root");

export class ChatsTokenController {
    public getToken(data: IChatsTokenRequestData): void {
        store.set("chatsToken.loading", true);
        store.set("chatsToken.errors", null);

        chatsTokenApi.request(data).then(response => {
            switch (response.status) {
                case 200: {
                    store.set("chatsToken.data", response.data);
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
            store.set("chatsToken.loading", false);
        });
    }
}

export default new ChatsTokenController();
