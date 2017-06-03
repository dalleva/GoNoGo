import { Subscribable } from 'app/helpers/subscribable';

export class Stopwatch extends Subscribable<number> {
    private readonly refreshRate = 100; //Needs to be a multiple of 50
    private triggerRate = 1000; //Needs to be a multiple of 50 or could never trigger if doesnt match with interval
    private timeSpent = 0;
    private interval: any;

    public get TriggerRate(): number {
        return this.triggerRate;
    }
    public set TriggerRate(rate: number) {
        if (rate < this.refreshRate) {
            throw new Error('Trigger rate cannot be faster than the refresh rate');
        }
        else if (rate % 50 !== 0) {
            throw new Error('Trigger rate must be a multiple of 50');
        }
        this.triggerRate = rate;
    }

    public start(): void {
        this.clear();
        this.interval = setInterval(() => {
            this.timeSpent++;
            if ((this.refreshRate * this.timeSpent) % this.triggerRate === 0) {
                this.trigger(this.timeSpentInSeconds());
            }
        }, this.refreshRate);
    }

    public stop(): void {
        this.clear();
        this.timeSpent = 0;
    }

    public pause(): void {
        this.clear();
    }

    private clear(): void {
        clearInterval(this.interval);
        delete this.interval;
    }

    private timeSpentInSeconds(): number {
        return this.timeSpent / (1000 / this.refreshRate);
    }
}
