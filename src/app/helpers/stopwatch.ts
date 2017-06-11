import { Subscribable } from 'app/helpers/subscribable';

export class Stopwatch extends Subscribable<number> {
    protected intervalRate = 100; //Needs to be a multiple of 50
    protected triggerUpdateRate = 1000; //Needs to be a multiple of 50 or could never trigger if doesnt match with interval
    protected ticks = 0;
    protected interval: any;

    public get TriggerRate(): number {
        return this.triggerUpdateRate;
    }
    public set TriggerRate(rate: number) {
        if (rate < this.intervalRate) {
            throw new Error('Trigger rate cannot be faster than the interval rate');
        }
        else if (rate % 50 !== 0) {
            throw new Error('Trigger rate must be a multiple of 50');
        }
        this.triggerUpdateRate = rate;
    }

    public start(): void {
        this.clear();
        this.interval = setInterval(() => {
            this.ticks++;
            this.tryTriggerTimeUpdate();
        }, this.intervalRate);
    }

    public stop(): void {
        this.clear();
        this.ticks = 0;
    }

    public pause(): void {
        this.clear();
    }

    protected clear(): void {
        clearInterval(this.interval);
        delete this.interval;
    }

    protected tryTriggerTimeUpdate(): void {
        if ((this.intervalRate * this.ticks) % this.triggerUpdateRate === 0) {
            this.trigger('timeUpdate', this.timeSpentInSeconds());
        }
    }

    protected timespentInMilliseconds(): number {
        return this.ticks / (1000 / this.intervalRate);
    }

    protected timeSpentInSeconds(): number {
        return this.timespentInMilliseconds() * 1000;
    }
}

export class CountdownTimer extends Stopwatch {
    private readonly minimumUpdatesPerSecond: number;
    private timeout: number;

    public constructor(timeout: number) {
        super();
        this.minimumUpdatesPerSecond = 10;
        this.timeout = timeout;
        this.intervalRate = this.computeOptimalIntervalRate();
        this.triggerUpdateRate = timeout;
    }

    private computeOptimalIntervalRate(): number {
        // maximum interval possible with given minimum updates per second
        let maximumInterval = 1000 / this.minimumUpdatesPerSecond;

        // example timeout = 1353 & maxInterval = 500, leftover = 353 so timeCoveredByInt. = 1000
        let timeCoveredByIntegerNumberOfCycles = this.timeout - this.timeout % maximumInterval;

        // ex timeout = 1353 & maxInterval = 500, numberOfCycles = 2 + 1 = 3
        let numberOfCycles = Math.floor(timeCoveredByIntegerNumberOfCycles / maximumInterval) + 1;

        // ex timeout = 1353 & maxInterval = 500, return 1353 / 3 = 451
        return this.timeout / numberOfCycles;
    }

    protected tryTriggerTimeUpdate(): void {
        super.tryTriggerTimeUpdate();
        this.tryTriggerDone();
    }

    private tryTriggerDone(): void {
        if ((this.intervalRate * this.ticks) >= this.timeout) {
            this.trigger('done', this.timespentInMilliseconds());
            this.stop();
        }
    }
}
