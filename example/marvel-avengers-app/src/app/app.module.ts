import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {NgxAccordionTableModule} from 'ngx-accordion-table'


@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        NgxAccordionTableModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
