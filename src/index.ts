import { Footer, Header } from "./components";
import {
    NavigationPage,
    LoginPage,
    RegistrationPage,
    ChatsPage,
    ProfilePage,
    NotFoundPage,
    ServerErrorPage
} from "./pages";

const getPage = () => {
    switch(location.pathname) {
        case "/":
            return new NavigationPage();
        case "/login/":
            return new LoginPage();
        case "/registration/":
            return new RegistrationPage();
        case "/chats/":
            return new ChatsPage();
        case "/profile/":
            return new ProfilePage();
        case "/not-found/":
            return new NotFoundPage();
        case "/server-error/":
            return new ServerErrorPage();
        default:
            return new NotFoundPage();
    }
};

document.body.prepend(new Header().getContent());
document.body.appendChild(new Footer().getContent());
document.getElementById('root')?.replaceWith(
    getPage().getContent()
);

// import { Box, Button, InputBox, Typography } from "./components";
// import { BoxFlexDirection } from "./components/box/types";
// import { ButtonView } from "./components/button/types";
// import { nameValidatorRule } from "./helpers/validators";
// import { SearchIcon, TrashIcon } from "./icons";
// import { Page } from "./components";


// const page = new Page({
//     children: 'asd'
// })

// setTimeout(() => {
//     page.setProps({
//         children: 'sdf'
//     })
// }, 1000);

// document.getElementById('root')?.replaceWith(
//     page.getContent()
// );
