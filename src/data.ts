export interface IUser {
    id: string;
    email: string;
    login: string;
    first_name: string;
    last_name: string;
    phone: string;
    avatar?: string;
}

export interface IMessage {
    chatId: string;
    id: string;
    sender: IUser;
    recipient: IUser;
    date: string;
    message: string;
}

export interface IChat {
    source: IUser;
    target: IUser;
    id: string;
    messages: Array<IMessage>;
    avatar?: string;
    title: string;
};

export const users: Array<IUser> = [{
    id: "990d721b-e5ab-4630-bc3c-9eaad3107505",
    email: "ioaksenenko@gmail.com",
    login: "ioaksenenko",
    first_name: "Иван",
    last_name: "Аксененко",
    phone: "+79612186143"
}, {
    id: "940eec7a-1d0d-4460-99cd-0af1fe994707",
    email: "user1@gmail.com",
    login: "user1",
    first_name: "Имя 1",
    last_name: "Фамилия 1",
    phone: "+71234567890",
    avatar: "https://yobte.ru/uploads/posts/2019-11/krasivye-devushki-v-krasnyh-platjah-78-foto-6.jpg"
}, {
    id: "13b8e913-c3f8-461d-864f-2e844368c051",
    email: "user2@gmail.com",
    login: "user2",
    first_name: "Имя 2",
    last_name: "Фамилия 2",
    phone: "+71234567890",
    avatar: "https://mykaleidoscope.ru/x/uploads/posts/2022-09/1663644397_8-mykaleidoscope-ru-p-spokoinii-paren-krasivo-8.jpg"
}];

export const messages: Array<IMessage> = [{
    chatId: "9b172465-3899-423f-8c45-0558bbeb55d8",
    id: "948874b8-1c05-4fe7-9e93-d485d9317418",
    sender: users[0],
    recipient: users[1],
    date: "2023-05-25T03:13:29.419Z",
    message: "Привет!",
}, {
    chatId: "9b172465-3899-423f-8c45-0558bbeb55d8",
    id: "5d2cf146-7641-46b0-b3bb-8b661d07d413",
    sender: users[1],
    recipient: users[0],
    date: "2023-05-25T03:14:23.419Z",
    message: "Привет! Как дела?"
}, {
    chatId: "9b172465-3899-423f-8c45-0558bbeb55d8",
    id: "f81c3e29-036a-46a2-bfba-44f34eb49788",
    sender: users[0],
    recipient: users[1],
    date: "2023-05-25T03:15:48.419Z",
    message: "Нормально! А у тебя?"
}, {
    chatId: "9b172465-3899-423f-8c45-0558bbeb55d8",
    id: "b6986484-9058-44b5-91fa-8413e358af51",
    sender: users[1],
    recipient: users[0],
    date: "2023-05-25T03:16:11.419Z",
    message: "Да тоже пойдет."
}, {
    chatId: "9b172465-3899-423f-8c45-0558bbeb55d8",
    id: "2f3b2c37-66f6-45e8-8361-798192ad0ae6",
    sender: users[0],
    recipient: users[1],
    date: "2023-05-25T03:17:13.419Z",
    message: "Ну вот и пообщались."
}];

export const chats: Array<IChat> = [{
    source: users[0],
    target: users[1],
    id: "9b172465-3899-423f-8c45-0558bbeb55d8",
    messages: messages.filter(
        message => message.chatId === "9b172465-3899-423f-8c45-0558bbeb55d8"
    ),
    avatar: "https://yobte.ru/uploads/posts/2019-11/krasivye-devushki-v-krasnyh-platjah-78-foto-6.jpg",
    title: "Имя 1 Фамилия 1"
}, {
    source: users[0],
    target: users[2],
    id: "34fa5e81-8659-43dd-ac13-efc9885cef5f",
    messages: messages.filter(
        message => message.chatId === "34fa5e81-8659-43dd-ac13-efc9885cef5f"
    ),
    avatar: "https://mykaleidoscope.ru/x/uploads/posts/2022-09/1663644397_8-mykaleidoscope-ru-p-spokoinii-paren-krasivo-8.jpg",
    title: "Имя 2 Фамилия 2"
}]

export const currentUserId = "990d721b-e5ab-4630-bc3c-9eaad3107505";
