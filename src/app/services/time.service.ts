import { Injectable } from '@angular/core';
import { RandomnessHelper } from 'app/helpers/random';
import { Stopwatch } from 'app/helpers/stopwatch';

//Provides an abstraction layer over timeouts and intervals
@Injectable()
export class TimeService {

    //time in seconds
    public static Countdown(time: number, onDone?: Function, onChange?: Function): void {
        setTimeout(() => {
            time--;

            if (time > 0) {
                onChange(time);
                TimeService.Countdown(time, onDone, onChange);
            }
            else if (time === 0) {
                onDone();
            }
        }, 1000);
    }

    public static Timeout(milliseconds: number, onDone: Function): number {
        return setTimeout(onDone, milliseconds);
    }

    public static SemiRandomTimeout(minimum: number, maximum: number, onDone: Function): number {
        const delay = RandomnessHelper.getRandomInt(minimum, maximum);
        return TimeService.Timeout(delay, onDone);
    }

    public static CreateTimer(): Stopwatch {
        return new Stopwatch();
    }

}
