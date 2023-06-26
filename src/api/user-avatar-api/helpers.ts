export const isFormData = (value: unknown): value is FormData => (
    typeof value === "object" &&
    Object.prototype.toString.call(value) === "[object FormData]"
);
