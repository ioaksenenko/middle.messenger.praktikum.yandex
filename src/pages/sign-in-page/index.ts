import { Component } from "../../core";
import { Page, Typography, QuestionLink, SignInForm } from "../../components";
import { TypographyVariant, TypographyTag } from "../../components/typography/types";
import { BoxAlignItems, BoxGap, BoxJustifyContent } from "../../components/box/types";

import type { TComponentOrComponentArray } from "../../core/component/types";
import { userController } from "../../controllers";

class SignInPage extends Component {
    constructor() {
        super();
        userController.getUser();
    }

    protected render(): TComponentOrComponentArray {
        return new Page({
            alignItems: BoxAlignItems.center,
            justifyContent: BoxJustifyContent.center,
            gap: BoxGap.xlarge,
            children: [
                new Typography({
                    tag: TypographyTag.h1,
                    variant: TypographyVariant.h1,
                    children: "Вход"
                }),
                new SignInForm(),
                new QuestionLink({
                    question: "Ещё не зарегистированы?",
                    href: "/sign-up",
                    children: "Зарегистрироваться"
                })
            ]
        });
    }
}

export default SignInPage;
