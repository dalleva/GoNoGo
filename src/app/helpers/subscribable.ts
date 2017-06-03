//Inspired by : https://stackoverflow.com/a/14657922/6316091
export class Subscribable<T> {
    private handlers: ((data?: T) => void)[] = [];

    public on(handler: (data?: T) => void): void {
        this.handlers.push(handler);
    }

    public off(handler: (data?: T) => void): void {
        this.handlers = this.handlers.filter(h => h !== handler);
    }

    protected trigger(data?: T) {
        this.handlers.slice(0).forEach(h => h(data));
    }
}
