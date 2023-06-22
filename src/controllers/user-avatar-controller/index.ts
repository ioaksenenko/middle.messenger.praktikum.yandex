import { userAvatarApi } from "../../api";
import store from "../../core/store";
import { Router } from "../../core/router";

const router = new Router("#root");

export class UserAvatarController {
    public updateUserAvatar(data: FormData): void {
        store.set("user.loading", true);
        store.set("user.errors", null);

        userAvatarApi.update(data).then(response => {
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

export default new UserAvatarController();
