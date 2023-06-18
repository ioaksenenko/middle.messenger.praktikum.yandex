import { Router } from "./core/router";
import {
    NavigationPage,
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
    .use("/", NavigationPage)
    .use("/login/", LoginPage)
    .use("/registration/", RegistrationPage)
    .use("/chats/", ChatsPage)
    .use("/profile/", ProfilePage)
    .use("/not-found/", NotFoundPage)
    .use("/server-error/", ServerErrorPage)
    .use("/change-password/", ChangePasswordPage)
    .start();

// import { InputBox } from "./components";
// import { emailValidatorRule } from "./helpers/validators";

// const block = new InputBox({
//     validationRules: [emailValidatorRule()]
// });

// document.getElementById("root")?.replaceWith(block.getContent());
