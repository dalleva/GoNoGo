import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TestCanvasService } from 'app/services/test-canvas.service';
import { TestCanvas } from 'app/model/test-canvas';
import { TimeService } from 'app/services/time.service';
import { TestItem } from 'app/model/test-item.interface';
import { GlobalVariables } from 'global';
import { Iterator, CollectionIterator } from 'app/helpers/iterator';
import { ListShuffleHelper } from 'app/helpers/list-shuffle';
import { AnswerState } from 'app/model/answer-state.enum';
import { UiDispatcherService } from 'app/services/ui-dispatcher.service';
import { Button } from 'app/model/button';

@Component({
    selector: 'app-test-canvas',
    templateUrl: './test-canvas.component.html',
    styleUrls: ['./test-canvas.component.css'],
    providers: [TestCanvasService]
})
export class TestCanvasComponent implements OnInit, OnDestroy {
    private readonly startCountdown = 3;
    private readonly spaceKey = 32;
    private isInTransition = false;
    private runningTimer: any; //TODO: Type, change any
    private testItems: Iterator<TestItem>;
    private headerButtons: Button[];
    public testCanvas: TestCanvas;

    @HostListener('window:keydown', ['$event'])
    keyboardInput(event: KeyboardEvent) {
        if (event.keyCode === this.spaceKey) {
            event.preventDefault();
            this.executeGoCommand();
        }
    }

    public itemClicked(event: MouseEvent): void {
        this.executeGoCommand();
    }

    constructor(
        private testCanvasService: TestCanvasService,
        private uiDispatcherSevice: UiDispatcherService,
        private route: ActivatedRoute
    ) { }

    public ngOnInit(): void {
        this.uiDispatcherSevice.setDistractionFreeMode();

        this.headerButtons = new Array();
        this.headerButtons['pause'] = new Button({ content: 'Pause', icon: 'fa fa-pause' });
        this.headerButtons['pause'].on('click', this.onPauseClicked);
        this.headerButtons['cancel'] = new Button({ content: 'Cancel', icon: 'fa fa-times' });
        this.headerButtons['cancel'].on('click', this.onCancelClicked);
        this.headerButtons['resume'] = new Button({ content: 'Cancel', icon: 'fa fa-play' });
        this.headerButtons['resume'].on('click', this.onResumeClicked);
        this.uiDispatcherSevice.addHeaderButton(this.headerButtons['pause']);
        this.uiDispatcherSevice.addHeaderButton(this.headerButtons['cancel']);
        console.log('dispatcher', this.uiDispatcherSevice);

        const testId = this.route.snapshot.paramMap.get('id');
        this.testCanvasService.getTestById(testId).then(this.initializeTest);
    }

    public ngOnDestroy(): void {
        this.uiDispatcherSevice.setDefault();
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

        //this.initializeCountdown();
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

        this.runningTimer = TimeService.Timeout(750, () => {
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
            const item = this.testItems.next();
            this.runningTimer = TimeService.SemiRandomTimeout(2000, 2500, () => {
                this.displaySuccess(!item.go); // User made it to the end, check if he was supposed to click
            });
        }
        else {
            this.endOfTest();
        }
    }

    private displayFirstItem(): void {
        if (this.testItems.hasNext()) {
            const item = this.testItems.getCurrent();
            this.runningTimer = TimeService.SemiRandomTimeout(2000, 2500, () => {
                this.displaySuccess(!item.go);
            });
        }
    }

    private endOfTest(): void {
        console.log('end of test');
        this.isInTransition = true;
        //TODO: Navigate to results page
    }

    private onPauseClicked(event: MouseEvent): void  {
        console.log('Pause clicked', event, this.uiDispatcherSevice);
        this.uiDispatcherSevice.removeHeaderButtons();
        this.uiDispatcherSevice.addHeaderButton(this.headerButtons['resume']);
        this.uiDispatcherSevice.addHeaderButton(this.headerButtons['cancel']);
    }

    private onResumeClicked(event: MouseEvent): void {
        console.log('Resume clicked', event);
        this.uiDispatcherSevice.removeHeaderButtons();
        this.uiDispatcherSevice.addHeaderButton(this.headerButtons['pause']);
        this.uiDispatcherSevice.addHeaderButton(this.headerButtons['cancel']);
    }

    private onCancelClicked(event: MouseEvent): void {
        console.log('Cancel clicked', event);
        this.endOfTest();
    }
}
