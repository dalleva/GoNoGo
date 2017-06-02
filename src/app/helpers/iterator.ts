// Source : https://github.com/torokmark/design_patterns_in_typescript/tree/master/iterator

export interface Iterator<T> {
    getCurrent(): T;
    next(): T;
    hasNext(): boolean;
}

/*export interface Aggregator<T> {
    createIterator(): Iterator<T>;
}*/

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
        const result = this.collection[this.position];
        this.position += 1;
        return result;
    }

    public hasNext(): boolean {
        return this.position < this.collection.length;
    }
}

/*export class IterableList<T> implements Aggregator<T> {
    private collection: T[] = [];

    constructor(collection: T[]) {
        this.collection = collection;
    }
    public createIterator(): Iterator<T> {
        return new CollectionIterator<T>(this.collection);
    }
}*/
