import type { IValidationRule } from "./types";

export const nameValidator = (value: string): boolean => {
    return !value || /^[A-ZА-Я][a-zA-Zа-яА-Я-]*$/.test(value);
};

export const nameValidatorRule = (): IValidationRule => ({
    error: "Допустима только латиница или кирилица. Первая буква должна быть заглавной. Без пробелов и без цифр, нет спецсимволов (допустим только дефис).",
    validate: nameValidator
});

export const loginValidator = (value: string): boolean => {
    return !value || (/^[a-zA-Z0-9-_]{3,20}$/.test(value) && !/^\d+$/.test(value));
};

export const loginValidatorRule = (): IValidationRule => ({
    error: "Должно быть от 3 до 20 символов, латиница, может содержать цифры, но не состоять из них, без пробелов, без спецсимволов (допустимы дефис и нижнее подчёркивание).",
    validate: loginValidator
});

export const emailValidator = (value: string): boolean => {
    return !value || /^[a-z0-9-_.]+@[a-z]+\.[a-z]+$/i.test(value);
};

export const emailValidatorRule = (): IValidationRule => ({
    error: "Должна быть латиница, может включать цифры и спецсимволы вроде дефиса, обязательно должна быть «собака» (@) и точка после неё, но перед точкой обязательно должны быть буквы.",
    validate: emailValidator
});

export const passwordValidator = (value: string): boolean => {
    return !value || (/^.{8,40}$/.test(value) && /[A-Z]+/.test(value) && /[0-9]+/.test(value));
};

export const passwordValidatorRule = (): IValidationRule => ({
    error: "Должно быть от 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра.",
    validate: passwordValidator
});

export const phoneValidator = (value: string): boolean => {
    return !value || /^\+?\d{10,15}$/.test(value);
};

export const phoneValidatorRule = (): IValidationRule => ({
    error: "Должно быть от 10 до 15 символов, состоит из цифр, может начинается с плюса.",
    validate: phoneValidator
});
