export interface IResponseError {
    reason: string;
}

export interface IResponse<TData = any> {
    loading: boolean;
    errors: Record<string, string[]>;
    data: TData;
}
