import { TestItem } from 'app/model/test-item.interface';
import { TestCanvasInformation } from 'app/model/test-canvas-information.interface';
import { Image } from 'app/model/image.interface';

export class TestCanvas {
    private identifiers: TestCanvasInformation;
    private testItems: TestItem[];

    public get Id(): string {
        return this.identifiers.id;
    }
    public get Image(): Image {
        // Make sure the image exists, if not return an empty image
        return (this.identifiers.image !== null && this.identifiers.image !== undefined)
            ? this.identifiers.image
            : { url: '', alt: '' }; // TODO: Use a factory to produce objects (use default picture instead of empty)
    }
    public get Name(): string {
        return this.identifiers.name;
    }
    public get Description(): string {
        return this.identifiers.description;
    }
    public get DatePublished(): Date {
        return this.identifiers.datePublished;
    }
    public get TestItems(): TestItem[] {
        return this.testItems;
    }
    public set TestItems(items: TestItem[]) {
        this.testItems = items;
    }

    constructor(identifiers: TestCanvasInformation) {
        this.identifiers = identifiers;
    }
}
