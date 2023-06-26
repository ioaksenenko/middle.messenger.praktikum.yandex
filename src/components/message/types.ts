import type { IComponentProps } from "../../core/component/types";

export interface IMessageProps extends IComponentProps {
    children: string;
    time: string;
    userId: number;
}

export interface IMessageStore {
    currentUserId?: number;
}

export type TMessageProps = IMessageProps & IMessageStore;
