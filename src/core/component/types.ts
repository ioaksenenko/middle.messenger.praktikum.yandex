import { Component } from "./index";

export type TComponentOrComponentArray = Component | Array<Component>;
export type TEventListenerOrEventListenerArray = EventListener | Array<EventListener>;
export type TComponentRecord = Record<string, TComponentOrComponentArray>;
export type TEventListenerRecord = Record<string, TEventListenerOrEventListenerArray>;

export type TComponentChild = Component | string | number | boolean | undefined | null;

export interface IComponentProps {
    id?: string;
    children?: TComponentChild | Array<TComponentChild>
    className?: string;
};

export enum ComponentEvent {
    INIT = "init",
    CDM = "component-did-mount",
    CDU = "component-did-update",
    RENDER = "render"
}
