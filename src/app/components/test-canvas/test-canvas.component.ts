import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TestCanvasService } from 'app/services/test-canvas.service';
import { TestCanvas } from 'app/model/test-canvas';
import { TimeService } from 'app/services/time.service';

@Component({
    selector: 'app-test-canvas',
    templateUrl: './test-canvas.component.html',
    styleUrls: ['./test-canvas.component.css'],
    providers: [TestCanvasService, TimeService]
})
export class TestCanvasComponent implements OnInit {
    public testCanvas: TestCanvas;

    constructor(
        private testCanvasService: TestCanvasService,
        private route: ActivatedRoute
    ) { }

    public ngOnInit() {
        const testId = this.route.snapshot.paramMap.get('id');
        this.testCanvasService.getTestById(testId).then(this.initializeTest);
    }

    private initializeTest = (testCanvas: TestCanvas): void => {
        this.testCanvas = testCanvas;
        console.log('test initialized', testCanvas);
        this.initializeCountdown();
    }

    private initializeCountdown(): void {
        const countdownDone = () => {
            console.log('Countdown done');
        };

        const countdownUpdate = (timeLeft: number) => {
            console.log('Countdown update', timeLeft);
        };

        TimeService.Countdown(this.startCountdown, countdownDone, countdownUpdate);
    }

    }
}
