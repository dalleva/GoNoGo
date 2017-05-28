import { TestCanvas } from '../model/test-canvas';

export interface ITestCanvasService {
    getAvailableTests(userId: string): Promise<TestCanvas[]>;
    getTestById(testId: string): Promise<TestCanvas>;
}
