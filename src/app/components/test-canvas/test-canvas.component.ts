import { Component, OnInit, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TestCanvasService } from 'app/services/test-canvas.service';
import { TestCanvas } from 'app/model/test-canvas';
import { TimeService } from 'app/services/time.service';
import { TestItem } from 'app/model/test-item.interface';
import { GlobalVariables } from 'global';
import { Iterator, CollectionIterator } from 'app/helpers/iterator';
import { ListShuffleHelper } from 'app/helpers/list-shuffle';
import { AnswerState } from 'app/model/answer-state.enum';

@Component({
    selector: 'app-test-canvas',
    templateUrl: './test-canvas.component.html',
    styleUrls: ['./test-canvas.component.css'],
    providers: [TestCanvasService, TimeService]
})
export class TestCanvasComponent implements OnInit {
    private readonly startCountdown = 3;
    private readonly spaceKey = 32;
    private isInTransition = false;
    private runningTimer: any; //TODO: Type, change any
    private testItems: Iterator<TestItem>;
    public testCanvas: TestCanvas;

    @HostListener('window:keydown', ['$event'])
    keyboardInput(event: KeyboardEvent) {
        console.log('keyboard', event);
        if (event.keyCode === this.spaceKey) {
            // TODO: Trigger next event depending on state machine
            event.preventDefault();
            this.executeGoCommand();
        }
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
            : this.testItems.getCurrent();
    }

    private initializeTest = (testCanvas: TestCanvas): void => {
        this.testCanvas = testCanvas;

        const shuffledItems = ListShuffleHelper.shuffleInPlace<TestItem>(testCanvas.TestItems); // TODO: Consider shuffling server side
        this.testItems = new CollectionIterator(shuffledItems);
        this.displayFirstItem();

        // this.initializeCountdown();
    }

    /*private initializeCountdown(): void {
        const countdownDone = () => {
            console.log('Countdown done');
        };

        const countdownUpdate = (timeLeft: number) => {
            console.log('Countdown update', timeLeft);
        };

        TimeService.Countdown(this.startCountdown, countdownDone, countdownUpdate);
    }*/

    public itemClicked(event: MouseEvent): void {
        console.log('clicked', event);
        this.executeGoCommand();
    }

    public canDisplayImage(): boolean {
        return !this.isInTransition && this.testCanvas !== null && this.testCanvas !== undefined; // TODO: Check actual image url
    }

    public get CurrentImageUrl(): string {
        return GlobalVariables.IMAGES_PATH + this.testItems.getCurrent().image.url;
    }

    public isValidAnswerState(): boolean {
        if (!this.canDisplayImage()) {
            return false;
        }
        return this.testItems.getCurrent().answer === AnswerState.Valid;
    }

    public isInvalidAnswerState(): boolean {
        if (!this.canDisplayImage()) {
            return false;
        }
        return this.testItems.getCurrent().answer === AnswerState.Invalid;
    }

    private executeGoCommand(): void {
        this.displaySuccess(this.testItems.getCurrent().go);
    }

    private displaySuccess(success: boolean): void {
        console.log('success', success);
        clearTimeout(this.runningTimer);

        this.testItems.getCurrent().answer = (success)
            ? AnswerState.Valid
            : this.testItems.getCurrent().answer = AnswerState.Invalid;

        this.runningTimer = TimeService.Timeout(250, () => {
            this.transitionToNextItem();
        });
    }

    private transitionToNextItem(): void {
        clearTimeout(this.runningTimer);
        this.isInTransition = true;
        this.runningTimer = TimeService.SemiRandomTimeout(750, 1000, () => {
            this.isInTransition = false;
            this.displayNextItem();
        });
    }

    private displayNextItem(): void {
        clearTimeout(this.runningTimer);
        if (this.testItems.hasNext()) {
            let item = this.testItems.next();
            this.runningTimer = TimeService.SemiRandomTimeout(2000, 2500, () => {
                this.displaySuccess(!item.go); // User made it to the end, check if he was supposed to click
            });
        }
    }

    private displayFirstItem(): void {
        if (this.testItems.hasNext()) {
            let item = this.testItems.getCurrent();
            this.runningTimer = TimeService.SemiRandomTimeout(4000, 5000, () => {
                this.displaySuccess(!item.go);
            });
        }
    }
}
