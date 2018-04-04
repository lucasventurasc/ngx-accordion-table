import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {NgxAccordionTableComponent} from './ngx-accordion-table.component';
import {EscapeHtmlPipe} from './ngx-accordion-template';

@NgModule({
    declarations: [
        NgxAccordionTableComponent,
        EscapeHtmlPipe
    ],
    exports: [
        NgxAccordionTableComponent
    ],
    imports: [
        BrowserModule,
    ]
})
export class NgxAccordionTableModule {
}
