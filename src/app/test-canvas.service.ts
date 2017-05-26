import { Injectable } from '@angular/core';
import { TestItem } from './test-item.interface';
import { TestCanvas } from './test-canvas';
import { ITestCanvasService } from './test-canvas.service.interface';

const MOCK_ITEMS1: TestItem[] = [
    { id: 'guid1', go: false, image: { url: 'imagename.jpg', alt: '' } },
    { id: 'guid2', go: true, image: { url: 'imagename.jpg', alt: '' } },
    { id: 'guid3', go: true, image: { url: 'imagename.jpg', alt: '' } },
    { id: 'guid4', go: false, image: { url: 'imagename.jpg', alt: '' } },
    { id: 'guid5', go: false, image: { url: 'imagename.jpg', alt: '' } }
];

const MOCK_ITEMS2: TestItem[] = [
    { id: 'guid6', go: false, image: { url: 'imagename.jpg', alt: '' } },
    { id: 'guid7', go: true, image: { url: 'imagename.jpg', alt: '' } },
    { id: 'guid8', go: false, image: { url: 'imagename.jpg', alt: '' } }
];

const MOCK_TEST_CANVAS1: TestCanvas = new TestCanvas({id: 'testId1', name: 'Le premier test'});
MOCK_TEST_CANVAS1.TestItems = MOCK_ITEMS1;

const MOCK_TEST_CANVAS2: TestCanvas = new TestCanvas({id: 'testIdd', name: 'Le deuxième test'});
MOCK_TEST_CANVAS2.TestItems = MOCK_ITEMS2;

@Injectable()
export class TestCanvasService implements ITestCanvasService {

    public getAvailableTests(userId: string): TestCanvas[] {
        return [ MOCK_TEST_CANVAS1, MOCK_TEST_CANVAS2 ]; // TODO: Connect to server
    }

    public getTestById(testId: string): TestCanvas {
        return MOCK_TEST_CANVAS1; // TODO: Connect to server
    }
}
