import { Component, AfterViewInit, style, state, animate, transition, trigger } from '@angular/core';
import { isUnsupportedBrowser } from 'bowser';
import { GlobalVariables } from 'global';
import { NotificationsService, SimpleNotificationsComponent, Options as ToastOptions } from 'angular2-notifications';
import { UiDispatcherService } from 'app/services/ui-dispatcher.service';
import { SidebarState } from 'app/model/sidebar-state.enum';
import { Button } from 'app/model/button.interface';
import { HeaderDataState } from 'app/model/header-data-state.enum';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    providers: [NotificationsService],
    animations: [
        trigger('fadeInOut', [
            transition(':enter', [   // :enter is alias to 'void => *'
                style({ opacity: 0 }),
                animate(300, style({ opacity: 1 }))
            ]),
            transition(':leave', [   // :leave is alias to '* => void'
                animate(300, style({ opacity: 0 }))
            ])
        ])
    ]
})
export class AppComponent implements AfterViewInit {
    public browserUnsupported = false;

    public get ForceCloseSidebar(): boolean {
        return this.uiDispatcherSevice.SidebarState === SidebarState.ForceClose;
    }

    public get HideHeaderData(): boolean {
        return this.uiDispatcherSevice.HeaderDataState === HeaderDataState.Disabled;
    }

    public get HeaderButtons(): Button[] {
        return this.uiDispatcherSevice.HeaderButtons;
    }

    constructor(private notificationsService: NotificationsService, private uiDispatcherSevice: UiDispatcherService) { }

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
