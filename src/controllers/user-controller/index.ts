import { userApi } from "../../api";
import store from "../../core/store";
import { Router } from "../../core/router";
import { userValidator } from "../../validators";
import { prepareData } from "./helpers";

import type { IUser } from "../../api/user-api/types";

const router = new Router("#root");

export class UserController {
    public getUser(): void {
        store.set("user.loading", true);
        store.set("user.errors", null);
        store.set("user.data", null);

        userApi.request().then(response => {
            switch (response.status) {
                case 200: {
                    store.set("user.data", response.data);
                    break;
                }
                case 400: {
                    store.set("user.errors", {
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
            store.set("user.loading", false);
        });
    }

    public updateUser(data: IUser): void {
        store.set("user.loading", true);
        store.set("user.errors", null);
        store.set("user.data", null);

        userValidator.validate(data);

        if (!userValidator.isValid) {
            store.set("user.errors", userValidator.errors);
        }

        userApi.update(prepareData(data)).then(response => {
            switch (response.status) {
                case 200: {
                    store.set("user.data", response.data);
                    break;
                }
                case 400: {
                    store.set("user.errors", {
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
            store.set("user.loading", false);
        });
    }
}

export default new UserController();
