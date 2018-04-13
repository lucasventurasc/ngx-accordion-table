import {Component, EventEmitter, Input} from '@angular/core';
import {AccordionEventListener, Column, TableColumn, TableRow} from '../ngx-accordion-template';

@Component({
    selector: 'ngx-clickable-cell',
    templateUrl: './ngx-clickable-cell.component.html',
    styleUrls: ['./ngx-clickable-cell.component.css']
})
export class NgxClickableCellComponent {

    @Input() buttonId: string;
    @Input() value: string;
    @Input() eventListener: AccordionEventListener;
    @Input() isHtml: boolean;
    @Input() column: Column;
    @Input() row: TableRow;
    private eventEmitter: EventEmitter<any>;

    constructor() {}

    fireCellClick(event) {
        this.eventListener.notifyClickOn(this.row, this.column);
        console.log(JSON.stringify(event));
        console.log(this.row);
    }
}
