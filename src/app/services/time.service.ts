import { Injectable } from '@angular/core';
import { RandomnessHelper } from 'app/helpers/random';
import { Stopwatch, CountdownTimer } from 'app/helpers/stopwatch';

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

    public static Timeout(milliseconds: number, onDone: Function): CountdownTimer {
        const t = this.CreateCountdownTimer(milliseconds);
        t.on('done', (time: number) => {
            onDone();
        });
        t.start();
        return t;
    }

    public static SemiRandomTimeout(minimum: number, maximum: number, onDone: Function): Stopwatch {
        const delay = RandomnessHelper.getRandomInt(minimum, maximum);
        return TimeService.Timeout(delay, onDone);
    }

    public static CreateCountdownTimer(timeout: number): CountdownTimer {
        return new CountdownTimer(timeout);
    }

}
