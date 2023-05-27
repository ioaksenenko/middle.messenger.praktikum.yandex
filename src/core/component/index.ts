import { TemplateDelegate, compile } from "handlebars";
import {v4 as makeUUID} from "uuid";
import { identity } from "../../helpers";
import { EventBus } from "../event-bus";

import {
    cloneDeep,
    isComponentOrComponentArray,
    isEventListenerOrEventListenerArray,
    isPseudoClass
} from "./helpers";

import {
    IComponentProps,
    ComponentEvent,
    TComponentOrComponentArray,
    TEventListenerOrEventListenerArray,
    TComponentRecord,
    TEventListenerRecord,
} from "./types";

export class Component<P extends Record<string, any> = {}> {
    private _template: HTMLTemplateElement;
    protected eventBus: EventBus;
    private _components: TComponentRecord;
    private _listeners: TEventListenerRecord;
    private _pseudoClasses: Record<string, boolean>;
    public id: string;
    
    constructor(protected props: P = {} as P, protected templateDelegate: TemplateDelegate | undefined = undefined) {
        this.id = props.id || makeUUID();
        this.props = this._makePropsProxy({
            ...props,
            id: this.id
        });
        this.templateDelegate = templateDelegate || compile("{{{ children }}}");
        this.eventBus = new EventBus();
        this._registerEvents();
        this.eventBus.emit(ComponentEvent.INIT);
    }

    private _makePropsProxy(props: P) {
        return new Proxy(props, {
            get: (target: P, prop: string) => {
                const value = target[prop];
                return typeof value === "function" ? value.bind(target) : value;
            },
            set: (target: P, prop: string, value) => {
                (target as Record<string, any>)[prop] = value;
                return true;
            },
            deleteProperty: () => {
                throw new Error("Not allowed");
            }
        });
    }
    
    private _registerEvents() {
        this.eventBus.on(ComponentEvent.INIT, this._init.bind(this));
        this.eventBus.on(ComponentEvent.RENDER, this._render.bind(this));
        this.eventBus.on(ComponentEvent.CDM, this._componentDidMount.bind(this));
        this.eventBus.on(ComponentEvent.CDU, this._componentDidUpdate.bind(this));
    }
  
    private _init() {
        this._template = this._createDocumentElement("template") as HTMLTemplateElement;
        this.eventBus.emit(ComponentEvent.RENDER);
    }

    private _createDocumentElement(tagName: string) {
        return document.createElement(tagName);
    }

    protected getComponentsAndListeners<T extends Record<string, any> = {}>(context: T) {
        const components: TComponentRecord = {};
        const listeners: TEventListenerRecord = {};
        const pseudoClasses: Record<string, boolean> = {};
        Object.keys(context).forEach((key) => {
            if (isComponentOrComponentArray(context[key])) {
                components[key] = context[key] as TComponentOrComponentArray;
            } else if (isEventListenerOrEventListenerArray(key, context[key])) {
                listeners[key.substring(2).toLocaleLowerCase()] = context[key] as TEventListenerOrEventListenerArray;
            } else if (isPseudoClass(key, context[key])) {
                pseudoClasses[key] = context[key];
            }
        });
        return {components, listeners, pseudoClasses};
    }

    private _removeAllEventListeners(component: Component) {
        component?._listeners && component._removeEventListeners(component._listeners);
        component?._components && Object.values(component._components).forEach(
            (componentOrComponentArray) => Array.isArray(componentOrComponentArray)
                ? componentOrComponentArray.forEach(
                    component => this._removeAllEventListeners(component)
                ) : this._removeAllEventListeners(componentOrComponentArray)
        );
    }

    private _addAllEventListeners(component: Component) {
        component?._listeners && component._addEventListeners(component._listeners);
        component?._components && Object.values(component._components).forEach(
            (componentOrComponentArray) => Array.isArray(componentOrComponentArray)
                ? componentOrComponentArray.forEach(
                    component => this._addAllEventListeners(component)
                ) : this._addAllEventListeners(componentOrComponentArray)
        );
    }

    private _applyAllPseudoClasses(component: Component) {
        component?._pseudoClasses && component._applyPseudoClasses(component._pseudoClasses);
        component?._components && Object.values(component._components).forEach(
            (componentOrComponentArray) => Array.isArray(componentOrComponentArray)
                ? componentOrComponentArray.forEach(
                    component => this._applyAllPseudoClasses(component)
                ) : this._applyAllPseudoClasses(componentOrComponentArray)
        );
    }
    
    private _render() {
        this._removeAllEventListeners(this);

        const content = this.render();

        const context = {...cloneDeep(this.props), children: content};
        const { components, listeners, pseudoClasses } = this.getComponentsAndListeners(context);
        const internalListeners = this._getInternalListeners();
        const allListeners = Object.fromEntries(
            Object.entries(listeners).map(
                ([key, val]) => internalListeners[key]
                    ? (
                        [key, Array.isArray(val)
                            ? [...val, internalListeners[key]]
                            : [val, internalListeners[key]]]
                    ) : [key, val]
            ).concat(
                Object.entries(internalListeners).filter(
                    ([key, _]) => !listeners[key]
                )
            )
        );

        Object.entries(components).forEach(([key, val]) => {
            (context as Record<string, any>)[key] = Array.isArray(val) ? val.filter(identity).map(
                component => this._renderStub(component)
            ).join('') : this._renderStub(val);
        });

        if (this.templateDelegate) {
            this._template.innerHTML = this.templateDelegate(context);
        }

        const element = this._template.content.firstElementChild;
        if (element) {
            if (!element.getAttribute("id")) {
                element.setAttribute("id", this.props.id);
            }

            Object.values(components).forEach(val => {
                Array.isArray(val) ? val.filter(identity).forEach(
                    component => this._replaceStub(component)
                ) : this._replaceStub(val);
            });
            
            Object.entries(listeners).forEach(
                ([key, val]) => Array.isArray(val) ? val.forEach(
                    listener => this._template.content.firstElementChild?.addEventListener(key, listener)
                ) : this._template.content.firstElementChild?.addEventListener(key, val)
            );

            const oldElement = document.getElementById(this.props.id);
            const newElement = this._template.content.firstElementChild;
            if (oldElement) {
                newElement && oldElement.replaceWith(newElement);
            } else {
                const id =  this._getFragmentChildId();
                id && newElement && document.getElementById(id)?.replaceWith(newElement);
            }
        }
        
        this._setAttributes();

        this._components = components;
        this._listeners = allListeners;
        this._pseudoClasses = pseudoClasses;
 
        this._removeAllEventListeners(this);
        this._applyAllPseudoClasses(this);
        this._addAllEventListeners(this);

        this._componentDidMount();
    }

    private _applyPseudoClasses(pseudoClasses: Record<string, boolean>) {
        const element = document.getElementById(this.props.id) as HTMLInputElement;
        element && Object.entries(pseudoClasses).forEach(
            ([key, val]) => val && this._applyPseudoClass(key, element)
        );
    }

    private _applyPseudoClass(pseudoClass: string, element: HTMLInputElement) {
        switch(pseudoClass) {
            case 'focus':
                element.focus();
                try {
                    element.setSelectionRange(element.value.length, element.value.length);
                } catch { };
                return;
            default:
                return;
        };
    }

    private _getFragmentChildId() {
        if (!Array.isArray(this._components?.children)) {
            const props = this._components?.children.props as {id: string};
            return props?.id;
        }
    }

    protected render(): TComponentOrComponentArray {
        return this.props.children;
    }

    private _renderStub<T extends IComponentProps = {}>(component: Component<T>) {
        const element = component.props.id && document.getElementById(component.props.id);
        if (element) {
            component._template.content.appendChild(element);
        }
        return `<div id="${component.props.id}"></div>`;
    }

    private _replaceStub<T extends IComponentProps = {}>(component: Component<T>) {
        if (component.props.id) {
            this._template.content.getElementById(component.props.id)?.replaceWith(component.getContent());
        }
    }

    private _removeEventListeners(listeners: TEventListenerRecord) {
        const element = document.getElementById(this.props.id);
        Object.entries(listeners).forEach(
            ([key, val]) => Array.isArray(val) ? val.forEach(
                listener => element?.removeEventListener(key, listener)
            ) : element?.removeEventListener(key, val)
        );
    }

    private _addEventListeners(listeners: TEventListenerRecord) {
        const element = document.getElementById(this.props.id);
        Object.entries(listeners).forEach(
            ([key, val]) => Array.isArray(val) ? val.forEach(
                listener => element?.addEventListener(key, listener)
            ) : element?.addEventListener(key, val)
        );
    }
    
    private _componentDidMount() {
        this.componentDidMount();
    }
    
    protected componentDidMount() {};
  
    private _componentDidUpdate(oldProps: P, newProps: P) {
        const response = this.componentDidUpdate(oldProps, newProps);
        response && this.eventBus.emit(ComponentEvent.RENDER);
    }
  
    protected componentDidUpdate(oldProps: P, newProps: P) {
        return true;
    };
  
    public setProps(nextProps: P) {
        const oldProps = cloneDeep(this.props);
        nextProps && Object.assign(this.props, nextProps);
        const newProps = cloneDeep(this.props);
        this.eventBus.emit(ComponentEvent.CDU, oldProps, newProps);
    };
  
    public getContent() {
        return this._template.content;
    }

    private _setAttributes() {
        const element = this._template.content.firstElementChild;
        if (element) {
            const attrs = this.getAttributes();
            Object.entries(attrs).forEach(
                ([key, val]) => element.setAttribute(key, val)
            );
        }
    }

    protected getAttributes(): Record<string, string> {
        return {};
    }

    private _getInternalListeners(): Record<string, EventListener> {
        const prototype = Object.getPrototypeOf(this);
        const propertyNames = Object.getOwnPropertyNames(prototype).filter(
            name => isEventListenerOrEventListenerArray(name, prototype[name])
        );
        return Object.fromEntries(
            propertyNames.map(
                name => [name.substring(2).toLocaleLowerCase(), prototype[name].bind(this)]
            )
        );
    }
}
