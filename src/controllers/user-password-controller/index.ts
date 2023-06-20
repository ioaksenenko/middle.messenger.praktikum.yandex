import { userPasswordValidator } from "../../validators";
import { userPasswordApi } from "../../api";
import store from "../../core/store";
import { Router } from "../../core/router";

import type { IUserPasswordUpdateRequestData } from "../../api/types";

const router = new Router("#root");

export class UserPasswordController {
    public update(data: IUserPasswordUpdateRequestData): void {
        store.set("changePassword.loading", true);
        store.set("changePassword.errors", null);

        userPasswordValidator.validate(data);

        if (!userPasswordValidator.isValid) {
            store.set("changePassword.errors", userPasswordValidator.errors);
        }

        userPasswordApi.update(data).then(response => {
            switch (response.status) {
                case 200: {
                    router.go("/profile/");
                    break;
                }
                case 400: {
                    store.set("changePassword.errors", {
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
                    throw new Error(`Необработанный код ответа: ${response.status}`);
                }
            }
        }).catch(error => {
            console.log(error);
        }).finally(() => {
            store.set("changePassword.loading", false);
        });
    }
}

export default new UserPasswordController();
