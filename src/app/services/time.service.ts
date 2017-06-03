import { Injectable } from '@angular/core';
import { RandomnessHelper } from 'app/helpers/random';

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

    public static Timer(): void {
    }

    // TODO: Create a timer which can be paused and resumed, I remember doing this once... GB

}

/*export interface Timer {
    secondsSpent: number;
    start(): void;
    pause(): void;
    resume(): void;
}

class Timer implements Timer*/
