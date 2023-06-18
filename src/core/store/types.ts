export enum StoreEvents {
    Updated = "updated"
}

export type TState = Record<string, any>;

export interface IRequestState<TData = any> {
    loading: boolean;
    errors: Record<string, string[]>;
    data: TData;
}
