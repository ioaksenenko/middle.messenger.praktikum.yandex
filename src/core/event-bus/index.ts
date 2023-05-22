import { TEventListener } from "./types";

export class EventBus {
    listeners: Record<string, Array<TEventListener>>;

    constructor() {
        this.listeners = {};
    }

    _eventExistCheck(event: string): void {
        if (!this.listeners[event]) {
            throw new Error(`Event "${event}" does not exist.`);
        }
    }
    
    on(event: string, callback: TEventListener): void {
        if (!this.listeners[event]) {
            this.listeners[event] = [];
        }
        this.listeners[event].push(callback);
    }
    
    off(event: string, callback: TEventListener): void {
        this._eventExistCheck(event);
        this.listeners[event] = this.listeners[event].filter(
            listener => listener !== callback
        );
    }
    
    emit<T = unknown>(event: string, ...args: Array<T>): void {
        this._eventExistCheck(event);
        this.listeners[event].forEach(
            listener => listener(...args)
        );
    }
}
