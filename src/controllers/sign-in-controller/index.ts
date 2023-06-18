import { signInValidator } from "../../validators";
import { signInApi } from "../../api";
import store from "../../core/store";
import { Router } from "../../core/router";

import type { ISignInRequestData } from "../../api/types";

const router = new Router("#root");

export class SignInController {
    public signIn(data: ISignInRequestData): void {
        store.set("signin.loading", true);
        store.set("signin.errors", null);

        signInValidator.validate(data);

        if (!signInValidator.isValid) {
            store.set("signin.errors", signInValidator.errors);
        }

        signInApi.request(data).then(response => {
            switch (response.status) {
                case 200: {
                    router.go("/chats/");
                    break;
                }
                case 400: {
                    store.set("signin.errors", {
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
            store.set("signin.loading", false);
        });
    }
}

export default new SignInController();
