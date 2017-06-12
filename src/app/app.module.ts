import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './components/app/app.component';
import { HomeComponent } from './components/home/home.component';
import { TestCanvasComponent } from './components/test-canvas/test-canvas.component';
import { TestItemComponent } from './components/test-item/test-item.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { TestResultsComponent } from './components/test-results/test-results.component';

import { SimpleNotificationsModule, PushNotificationsModule } from 'angular2-notifications';

import { UiDispatcherService } from 'app/services/ui-dispatcher.service';

const appRoutes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'test/:id', component: TestCanvasComponent },
    { path: 'test/:id/results', component: TestResultsComponent },
    { path: '**', component: PageNotFoundComponent }
];

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        TestCanvasComponent,
        TestItemComponent,
        PageNotFoundComponent,
        TestResultsComponent
    ],
    imports: [
        RouterModule.forRoot(appRoutes, { useHash: true }),
        BrowserModule,
        FormsModule,
        HttpModule,
        BrowserAnimationsModule,
        SimpleNotificationsModule, PushNotificationsModule
    ],
    providers: [UiDispatcherService],
    bootstrap: [AppComponent]
})
export class AppModule { }
