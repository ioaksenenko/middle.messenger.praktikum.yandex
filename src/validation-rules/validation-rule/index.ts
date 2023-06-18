class ValidationRule {
    error: string = "Validation error";

    validate<T = unknown>(_: T): boolean {
        throw new Error("Not implemented");
    };
}

export default ValidationRule;
