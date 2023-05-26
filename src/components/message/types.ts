import { IComponentProps } from "../../core/component/types";
import { IUser } from "../../data";

export interface IMessageProps extends IComponentProps {
    children: string;
    date: string;
    sender: IUser;
    recipient: IUser;
}
