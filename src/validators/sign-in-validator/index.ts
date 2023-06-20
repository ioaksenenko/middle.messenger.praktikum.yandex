import { Validator } from "../validator";
import { loginValidationRule, passwordValidationRule } from "../../validation-rules";

class SignInValidator extends Validator {
    constructor() {
        super({
            login: loginValidationRule,
            password: passwordValidationRule
        });
    }
}

export default new SignInValidator();
