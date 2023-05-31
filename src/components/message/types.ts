import type { IComponentProps } from "../../core/component/types";
import type { IUser } from "../../data";

export interface IMessageProps extends IComponentProps {
    children: string;
    date: string;
    sender: IUser;
    recipient: IUser;
}
