import { Component } from "../../core";
import { Page, Typography, QuestionLink, SignUpForm } from "../../components";
import { TypographyVariant, TypographyTag } from "../../components/typography/types";
import { BoxAlignItems, BoxGap, BoxJustifyContent } from "../../components/box/types";
import { userController } from "../../controllers";

import type { TComponentOrComponentArray } from "../../core/component/types";

class SignUpPage extends Component {
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
                    children: "Регистрация"
                }),
                new SignUpForm(),
                new QuestionLink({
                    question: "Уже зарегистированы?",
                    href: "/",
                    children: "Войти"
                })
            ]
        });
    }
}

export default SignUpPage;
