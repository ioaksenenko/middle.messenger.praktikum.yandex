import { userSearchApi } from "../../api";
import store from "../../core/store";
import { Router } from "../../core/router";

import type { IUserSearchRequestData } from "../../api/types";

const router = new Router("#root");

export class UserSearchController {
    public searchUser(data: IUserSearchRequestData): void {
        store.set("userSearchResults.loading", true);
        store.set("userSearchResults.errors", null);

        userSearchApi.request(data).then(response => {
            switch (response.status) {
                case 200: {
                    store.set("userSearchResults.data", response.data);
                    break;
                }
                case 400: {
                    store.set("userSearchResults.errors", {
                        "Bad Request": [response.data.reason]
                    });
                    break;
                }
                case 401: {
                    router.go("/login/");
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
            store.set("userSearchResults.loading", false);
        });
    }
}

export default new UserSearchController();
