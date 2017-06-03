// Source : https://github.com/torokmark/design_patterns_in_typescript/tree/master/iterator

export interface Iterator<T> {
    getCurrent(): T;
    next(): T;
    hasNext(): boolean;
}

export class CollectionIterator<T> implements Iterator<T> {
    private collection: T[] = [];
    private position = 0;

    constructor(collection: T[]) {
        this.collection = collection;
    }

    public getCurrent(): T {
        if (this.collection.length === 0) {
            return undefined;
        }
        return this.collection[this.position];
    }

    public next(): T {
        // Error handling is left out
        this.position++;
        const result = this.collection[this.position];
        return result;
    }

    public hasNext(): boolean {
        return this.position < this.collection.length - 1;
    }
}
