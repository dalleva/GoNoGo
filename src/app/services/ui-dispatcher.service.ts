import { Injectable } from '@angular/core';
import { HeaderDataState } from 'app/model/header-data-state.enum';
import { SidebarState } from 'app/model/sidebar-state.enum';
import { Button } from 'app/model/button.interface';

@Injectable()
export class UiDispatcherService {
    private sidebarState: SidebarState;
    private headerDataState: HeaderDataState;
    private headerButtons: Button[];

    public constructor() {
        this.setDefault();
    }

    public get SidebarState(): SidebarState {
        return this.sidebarState;
    }

    public get HeaderDataState(): HeaderDataState {
        return this.headerDataState;
    }

    public get HeaderButtons(): Button[] {
        return this.headerButtons;
    }

    public setDistractionFreeMode(): void {
        this.sidebarState = SidebarState.ForceClose;
        this.headerDataState = HeaderDataState.Disabled;
    }

    public setDefault(): void {
        this.sidebarState = SidebarState.Default;
        this.headerDataState = HeaderDataState.Default;
        this.headerButtons = [];
    }

    public addHeaderButton(button: Button): void {
        this.headerButtons.push(button);
    }
}
