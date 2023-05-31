import type { IComponentProps } from "../../core/component/types";

export interface IQuestionLinkProps extends IComponentProps {
    question: string;
    children: string;
    href: string;
}
