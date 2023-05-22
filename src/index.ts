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

document.getElementById('root')?.replaceWith(
    getPage().getContent()
);
