//Inspired by : https://stackoverflow.com/a/14657922/6316091
export abstract class Subscribable<T> {
    private handlers: Handler<T>[] = [];

    //TODO: Use enum of possible events rather than a string eventName
    public on(eventName: string, callback: (data?: T) => void): void {
        this.handlers.push({eventName, callback});
    }

    public off(callback: (data?: T) => void): void {
        this.handlers = this.handlers.filter(h => h.callback !== callback);
    }

    protected trigger(eventName: string, data?: T) {
        this.handlers.slice(0).filter(h => h.eventName === eventName).forEach(h => h.callback(data));
    }
}

interface Handler<T> {
    eventName: string;
    callback: (data?: T) => void;
}
