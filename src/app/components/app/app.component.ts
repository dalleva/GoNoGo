import { Component, AfterViewInit } from '@angular/core';
import { isUnsupportedBrowser } from 'bowser';
import { GlobalVariables } from '../../../global';
import { NotificationsService, SimpleNotificationsComponent, Options as ToastOptions } from 'angular2-notifications';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    providers: [NotificationsService]
})
export class AppComponent implements AfterViewInit {
    public title = 'app works!';
    public browserUnsupported = false;

    constructor(private notificationsService: NotificationsService) { }

    public ngAfterViewInit() {
        this.browserUnsupported = isUnsupportedBrowser(GlobalVariables.BROWSER_REQUIREMENTS_NOT_STRICT, false);
        if (this.browserUnsupported) {
            // TODO: Use cookies or local storage to warn user only once
            this.notificationsService.warn(
                'Browser not supported', // TODO: Extract these hard-coded messages in json or i18n file
                'We detected that your browser is old and some elements may not display well. Please update your browser if you have issues.',
                {
                    showProgressBar: false,
                    timeOut: 0
                }
            );
        }
    }

    public getToastOptions(): ToastOptions {
        return GlobalVariables.TOAST_OPTIONS;
    }
}
