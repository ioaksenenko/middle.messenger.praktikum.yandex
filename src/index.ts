import { Router } from "./core/router";
import {
    SignInPage,
    SignUpPage,
    ChatsPage,
    ProfilePage,
    NotFoundPage,
    ServerErrorPage,
    ChangePasswordPage
} from "./pages";
import "./styles.pcss";

const router = new Router("#root");

router
    .use("/", SignInPage)
    .use("/sign-up", SignUpPage)
    .use("/settings", ProfilePage)
    .use("/messenger", ChatsPage)
    .use("/server-error", ServerErrorPage)
    .use("/change-password", ChangePasswordPage)
    .use("", NotFoundPage)
    .start();
