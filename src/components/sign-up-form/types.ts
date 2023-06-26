import type { IResponse, ISignUpResponseSuccess } from "../../api/types";

export interface ISignUpFormProps {
    firstName?: string;
    secondName?: string;
    login?: string;
    email?: string;
    password?: string;
    phone?: string;
}

export interface ISignUpState {
    response?: IResponse<ISignUpResponseSuccess>;
}
