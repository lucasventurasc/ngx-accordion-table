import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {NgxAccordionTableComponent} from './ngx-accordion-table.component';
import {NgxClickableCellComponent} from './row-button/ngx-clickable-cell.component';
import {EscapeHtmlPipe} from './ngx-accordion-template';

@NgModule({
    declarations: [
        NgxAccordionTableComponent,
        EscapeHtmlPipe,
        NgxClickableCellComponent
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
