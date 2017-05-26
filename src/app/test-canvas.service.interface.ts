import { TestCanvas } from './test-canvas';

export interface ITestCanvasService {
    getAvailableTests(userId: string): TestCanvas[];
    getTestById(testId: string): TestCanvas;
}
