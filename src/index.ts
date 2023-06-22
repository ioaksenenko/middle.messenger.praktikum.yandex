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

const router = new Router("#root");

router
    .use("/", ChatsPage)
    .use("/signin/", SignInPage)
    .use("/signup/", SignUpPage)
    .use("/profile/", ProfilePage)
    .use("/not-found/", NotFoundPage)
    .use("/server-error/", ServerErrorPage)
    .use("/change-password/", ChangePasswordPage)
    .start();

// import ChatSidebar from "./components/chat-sidebar";
// import { render } from "./core/route/helpers";

// const box = new ChatSidebar();

// render("#root", box);
