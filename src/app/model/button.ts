import { Subscribable } from 'app/helpers/subscribable';

export interface ButtonProperties {
    content: string;
    icon?: string;
    cssClasses?: string[];
}

export class Button extends Subscribable<MouseEvent> {
    private subscribers;
    private properties: ButtonProperties;

    public constructor(properties: ButtonProperties) {
        super();
        this.properties = properties;
    }

    public get Properties(): ButtonProperties {
        return this.properties;
    }

    public getStringCssClasses(): string {
        if (this.properties.cssClasses === null || this.properties.cssClasses === undefined) {
            return '';
        }
        return this.properties.cssClasses.join(' ');
    }
}
