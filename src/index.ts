import { Router } from "./core/router";
import {
    LoginPage,
    RegistrationPage,
    ChatsPage,
    ProfilePage,
    NotFoundPage,
    ServerErrorPage,
    ChangePasswordPage
} from "./pages";

const router = new Router("#root");

router
    .use("/", ChatsPage)
    .use("/login/", LoginPage)
    .use("/registration/", RegistrationPage)
    .use("/profile/", ProfilePage)
    .use("/not-found/", NotFoundPage)
    .use("/server-error/", ServerErrorPage)
    .use("/change-password/", ChangePasswordPage)
    .start();
