import { IComponentProps } from "../../core/component/types";

export enum FormMethod {
    get = "GET",
    post = "POST",
    put = "PUT",
    delete = "DELETE"
}

export interface IFormProps extends IComponentProps {
    method?: FormMethod;
    action?: string;
    onSubmit?: EventListener;
};
