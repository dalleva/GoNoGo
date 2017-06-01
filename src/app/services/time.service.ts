import { Injectable } from '@angular/core';

@Injectable()
export class TimeService {

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

    // TODO: Create a timer which can be paused and resumed, I remember doing this once... GB

}
