import { cloneDeep } from "../../helpers";

import type { TValidationErrors } from "./types";
import type { ValidationRule } from "../../validation-rules";

export class Validator {
    private __isValid: boolean;
    private __errors: TValidationErrors;
    private readonly __rules: Record<string, ValidationRule>;

    constructor(rules: Record<string, ValidationRule>) {
        this.__rules = { ...rules };
    }

    public get isValid(): boolean {
        return this.__isValid;
    }

    public get errors(): TValidationErrors {
        return cloneDeep<TValidationErrors>(this.__errors) as TValidationErrors;
    }

    public validate<T extends Record<string, unknown>>(data: T): void {
        this.__isValid = true;
        this.__errors = {};
        Object.entries(this.__rules).forEach(([name, rule]) => {
            this.__validateField(name, data[name], rule);
        });
    }

    private __validateField<TFieldValue = unknown>(name: string, value: TFieldValue, rule: ValidationRule): void {
        if (!rule.validate<TFieldValue>(value)) {
            this.__isValid = false;
            this.__setError(name, rule.error);
        }
    }

    private __setError(fieldName: string, error: string): void {
        if (!Object.prototype.hasOwnProperty.call(this.__errors, fieldName)) {
            this.__errors[fieldName] = [];
        }
        this.__errors[fieldName].push(error);
    }
}
