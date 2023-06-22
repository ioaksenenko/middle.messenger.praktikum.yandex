import { logoutApi } from "../../api";
import store from "../../core/store";
import { Router } from "../../core/router";

const router = new Router("#root");

export class LogoutController {
    public logout(): void {
        logoutApi.request().then(response => {
            switch (response.status) {
                case 200: {
                    store.set("user.data", null);
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
        });
    }
}

export default new LogoutController();
