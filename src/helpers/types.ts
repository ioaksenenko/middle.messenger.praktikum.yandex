export interface IValidationRule {
    error: string;
    validate: (value: string) => boolean;
}
