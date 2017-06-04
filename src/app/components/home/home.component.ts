import { Component, OnInit } from '@angular/core';
import { TestCanvasService } from 'app/services/test-canvas.service';
import { TestCanvas } from 'app/model/test-canvas';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
    providers: [TestCanvasService]
})
export class HomeComponent implements OnInit {

    public availableCanvasList: TestCanvas[];

    constructor(private testCanvasService: TestCanvasService) { }

    ngOnInit() {
        this.testCanvasService.getAvailableTests('').then((tests: TestCanvas[]) => {
            this.availableCanvasList = tests;
            console.log('Received tests avail', tests);
        });
    }

    public buildTestCanvasUrl(testCanvasId: string): string {
        return '/test/' + testCanvasId; // TODO: Use an UrlBuilder
    }

    public getDateString(dateToTranslate: Date): string {
        return dateToTranslate.toLocaleDateString(); // TODO: Use an angular pipe in the html
    }

}
