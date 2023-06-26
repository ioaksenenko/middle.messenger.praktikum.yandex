import type { IResponse, ISignInResponseSuccess } from "../../api/types";

export interface ISignInFormProps {
    login?: string;
    password?: string;
}

export interface ISignInState {
    response?: IResponse<ISignInResponseSuccess>;
}
