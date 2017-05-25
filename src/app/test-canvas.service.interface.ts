
export interface ITestCanvas {
    id: string;
}
export interface ITestCanvasService {
    GetAvailableTests(userId: string): ITestCanvas[];
    GetTestById(testId: string): ITestCanvas;
}
