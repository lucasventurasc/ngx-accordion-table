import {Pipe, PipeTransform} from '@angular/core';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';
export {SafeHtml}


export class Row {
    private cells: Array<String>;

    constructor(cells: Array<String>) {
        this.cells = cells;
    }

    getCells() {
        return this.cells;
    }
}

export class Column {
    name: String;
    width: Number;

    constructor(name, width) {
        this.name = name;
        this.width = width;
    }
}

export class TableColumn extends Column {

    private htmlAllowed: boolean;

    constructor(name, width) {
        super(name, width);
    }

    allowHtml(allow: boolean) {
        this.htmlAllowed = true;
    }

    get isHtmlAllowed():boolean {
        return this.htmlAllowed;
    }

}

export class AccordionColumn extends Column {
    constructor(name, width) {
        super(name, width);
    }
}

export enum TargetOpenAction {
    ROW = 1,
    COLUMN = 2,
    ELEMENT = 3
}

export class AccordionTemplate {
    private accordionColumns: Array<AccordionColumn>;
    private tableColumns: Array<TableColumn>;
    private interactiveColumn: string;
    private targetOpenAction: TargetOpenAction;

    constructor() {
        let chevronColumn = new TableColumn("", "50px");
        this.tableColumns = [chevronColumn];
        this.accordionColumns = [];
        this.interactiveColumn = `<span _ngcontent-c1 class="chevron-up"></span>`;
        this.targetOpenAction = TargetOpenAction.ROW;
    }

    /**
     * Builder method to add columns to table model
     */
    addColumn(name: string, width: string) {
        this.tableColumns.push(new TableColumn(name, width));
        return this;
    }

    /**
     * Returns all columns inclusively columns added automatically
     */
    getTableColumnsForView() {
        return this.tableColumns;
    }

    /**
     * Returns all columns added manually
     */
    getTableColumns() {
        return this.tableColumns.slice(1, this.tableColumns.length);
    }

    /**
     * Return HTML from interactive column
     */
    getInteractiveColumn() {
        return this.interactiveColumn;
    }

    /**
     * Returns accordion columns added
     */
    getAccordionColumns() {
        return this.accordionColumns;
    }

    /**
     * Changes first column of table with html template received, allow to implement your own image, or icon o additional behaviour.
     */
    setInteractiveColumn(htmlTemplate: string) {
        this.interactiveColumn = htmlTemplate.replace(/(.*?)>(.*)/, '$1 _ngcontent-c1>$2');
    }

    /**
     * Builder method to add columns to accordion model
     */
    addAccordionColumn(name: string, width: string) {
        this.accordionColumns.push(new AccordionColumn(name, width));
        return this;
    }

    /**
     * Add a column which is allowed to render HTML
     */
    addHtmlColumn(name: string, width: string) {
        let tableColumn = new TableColumn(name, width);
        tableColumn.allowHtml(true);
        this.tableColumns.push(tableColumn);
    }

    /**
     * Changes if accordion table will opened by click on element, row or column
     */
    setTargetOpenAction(action: TargetOpenAction) {
        this.targetOpenAction = action;
    }

    /**
     * Return target option specified
     */
    getTargetOpenAction() {
        return this.targetOpenAction;
    }
}

export class AccordionData {

    private accordionTemplate: AccordionTemplate;
    private rows: Array<TableRow>;

    constructor(template: AccordionTemplate) {
        this.rows = [];
        this.accordionTemplate = template;
    }

    /**
     * Add a table row to accordion and return row created to add accordion data to table
     */
    addRow(cells) {
        if(this.accordionTemplate.getTableColumns().length !== cells.length) {
            throw "Data not matching with template"
        }

        let tableRow = new TableRow(cells, this.accordionTemplate.getAccordionColumns());
        this.rows.push(tableRow);
        return tableRow;
    }

    isHtmlColumn(index):boolean {
        let column = this.accordionTemplate.getTableColumns()[index];
        return column.isHtmlAllowed
    }

    getRows() {
        return this.rows;
    }
}

export class TableRow extends Row {
    private accordionRows: Array<AccordionRow>;
    private accordionTemplate: Array<AccordionColumn>;

    constructor(cells, accordionTemplate: Array<AccordionColumn>) {
        super(cells);
        this.accordionTemplate = accordionTemplate;
    }

    /**
     * Add row to child table of this row;
     */
    addAccordionRow(accordionCells: Array<String>) {
        if(!this.accordionRows) {
            this.accordionRows = []
        }

        if(this.accordionTemplate.length !== accordionCells.length) {
            throw 'Accordion data not matching with template'
        }

        this.accordionRows.push(new AccordionRow(accordionCells))
    }

    addAccordionRows(rows: Array<Array<String>>) {
        let that = this;
        rows.forEach(function(cells) {
            that.addAccordionRow(cells);
        });
    }

    getAccordionRows() {
        return this.accordionRows;
    }
}

export class AccordionRow extends Row {
}

@Pipe({ name: 'keepHtml', pure: false })
export class EscapeHtmlPipe implements PipeTransform {
    constructor(private sanitizer: DomSanitizer) {
    }

    transform(content) {
        return this.sanitizer.bypassSecurityTrustHtml(content);
    }
}


