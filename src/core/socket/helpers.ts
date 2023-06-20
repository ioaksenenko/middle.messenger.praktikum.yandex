import type { IMessage } from "../../components/message-list/types";

interface IMessageObject {
    message: string;
}

export const hasMessage = (value: unknown): value is IMessageObject => (
    Object.prototype.hasOwnProperty.call(value, "message")
);

export const compareMessagesByDate = (lhs: IMessage, rhs: IMessage): number => (
    (lhsTime, rhsTime) => (
        lhsTime < rhsTime
            ? -1
            : lhsTime > rhsTime
                ? 1
                : 0
    )
)(
    new Date(lhs.time).getTime(),
    new Date(rhs.time).getTime()
);
