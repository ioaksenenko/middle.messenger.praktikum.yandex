import { Validator } from "../validator";
import { passwordValidationRule } from "../../validation-rules";

class UserPasswordValidator extends Validator {
    constructor() {
        super({
            oldPassword: passwordValidationRule,
            newPassword: passwordValidationRule
        });
    }
}

export default new UserPasswordValidator();
