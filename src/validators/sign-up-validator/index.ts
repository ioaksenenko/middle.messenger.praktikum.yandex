import { Validator } from "../validator";
import {
    nameValidationRule,
    loginValidationRule,
    emailValidationRule,
    passwordValidationRule,
    phoneValidationRule
} from "../../validation-rules";

class SignUpValidator extends Validator {
    constructor() {
        super({
            first_name: nameValidationRule,
            second_name: nameValidationRule,
            login: loginValidationRule,
            email: emailValidationRule,
            password: passwordValidationRule,
            phone: phoneValidationRule
        });
    }
}

export default new SignUpValidator();
