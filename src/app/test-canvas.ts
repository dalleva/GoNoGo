import { TestItem } from './test-item.interface';
import { TestCanvasInformation } from './test-canvas-information.interface';

export class TestCanvas {
    private identifiers: TestCanvasInformation;
    private testItems: TestItem[];

    public get Id(): string {
        return this.identifiers.id;
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
