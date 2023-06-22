import type { IResponse } from "../../api/types";

export interface IChatCreationFormProps {
    title?: string;
}

export interface IChatCreationFormState {
    response?: IResponse;
}
