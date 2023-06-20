import { signUpValidator } from "../../validators";
import { signUpApi } from "../../api";
import store from "../../core/store";
import { Router } from "../../core/router";

import type { ISignUpRequestData } from "../../api/types";

const router = new Router("#root");

export class SignInController {
    public signUp(data: ISignUpRequestData): void {
        store.set("signup.loading", true);
        store.set("signup.errors", null);

        signUpValidator.validate(data);

        if (!signUpValidator.isValid) {
            store.set("signup.errors", signUpValidator.errors);
        }

        signUpApi.request(data).then(response => {
            switch (response.status) {
                case 200: {
                    store.set("user.data.id", response.data.id);
                    router.go("/");
                    break;
                }
                case 400: {
                    store.set("signup.errors", {
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
            store.set("signup.loading", false);
        });
    }
}

export default new SignInController();
