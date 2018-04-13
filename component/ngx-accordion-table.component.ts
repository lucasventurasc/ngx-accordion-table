import {Component, Input} from '@angular/core';
import {AccordionTemplate, AccordionData} from './ngx-accordion-template';

@Component({
    selector: 'ngx-accordion-table',
    templateUrl: './ngx-accordion-table.component.html',
    styleUrls: ['./ngx-accordion-table.component.css']
})
export class NgxAccordionTableComponent {

    @Input() template: AccordionTemplate;
    @Input() data: AccordionData;

    constructor() {}

}
