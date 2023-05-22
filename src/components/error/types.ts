import { IComponentProps } from "../../core/component/types";

export interface IErrorProps extends IComponentProps {
    code: number;
    children: string;
};
