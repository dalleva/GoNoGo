import { Component, OnInit, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TestCanvasService } from 'app/services/test-canvas.service';
import { TestCanvas } from 'app/model/test-canvas';
import { TimeService } from 'app/services/time.service';
import { TestItem } from 'app/model/test-item.interface';
import { GlobalVariables } from "global";

@Component({
    selector: 'app-test-canvas',
    templateUrl: './test-canvas.component.html',
    styleUrls: ['./test-canvas.component.css'],
    providers: [TestCanvasService, TimeService]
})
export class TestCanvasComponent implements OnInit {
    private readonly startCountdown = 3;
    public testCanvas: TestCanvas;
    // public currentTestItem: TestItem;

    @HostListener('window:keydown', ['$event'])
    keyboardInput(event: KeyboardEvent) {
        const spaceKey = 32;

        if (event.keyCode === spaceKey) {
            // TODO: Trigger next event depending on state machine
        }
        console.log('keyboard', event);
    }

    constructor(
        private testCanvasService: TestCanvasService,
        private route: ActivatedRoute
    ) { }

    public ngOnInit() {
        const testId = this.route.snapshot.paramMap.get('id');
        this.testCanvasService.getTestById(testId).then(this.initializeTest);
    }

    public get CurrentTestItem(): TestItem {
        return (this.testCanvas === null || this.testCanvas === undefined)
            ? undefined
            : this.testCanvas.TestItems[0]; // TODO: Implement an iterator
    }

    private initializeTest = (testCanvas: TestCanvas): void => {
        this.testCanvas = testCanvas;
        // TODO: Shuffle test items
        console.log(testCanvas);
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

    public itemClicked(event: MouseEvent): void {
        console.log('clicked', event);
    }

    public canDisplayImage(): boolean {
        return this.testCanvas !== null && this.testCanvas !== undefined; // TODO: Check actual image url
    }

    public get CurrentImageUrl(): string {
        return GlobalVariables.IMAGES_PATH + this.testCanvas.TestItems[0].image.url;
    }
}
