import { IComponentProps } from "../../core/component/types";

export interface IChatProps extends IComponentProps {
    avatar?: string;
    title: string;
    date?: string;
    message?: string;
    onClick?: EventListener;
    chatId?: string;
    active?: boolean;
};
