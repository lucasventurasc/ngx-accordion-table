import {Pipe, PipeTransform} from '@angular/core';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';
export {SafeHtml}


export class Row {
    public cells: Array<String>;

    constructor(cells: Array<String>) {
        this.cells = cells;
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

export class AccordionTemplate {
    public accordionColumns: Array<AccordionColumn>;
    public tableColumns: Array<TableColumn>;

    constructor() {
        let chevronColumn = new TableColumn("", "50px");
        this.tableColumns = [chevronColumn];
        this.accordionColumns = [];
    }

    /**
     * Builder method to add columns to table model
     */
    addColumn(name: string, width: string) {
        this.tableColumns.push(new TableColumn(name, width));
        return this;
    }

    getTableColumns() {
        return this.tableColumns.slice(1, this.tableColumns.length);
    }

    getAccordionColumns() {
        return this.accordionColumns;
    }

    /**
     * Builder method to add columns to accordion model
     */
    addAccordionColumn(name: string, width: string) {
        this.accordionColumns.push(new AccordionColumn(name, width));
        return this;
    }

    addHtmlColumn(name: string, width: string) {
        let tableColumn = new TableColumn(name, width);
        tableColumn.allowHtml(true);
        this.tableColumns.push(tableColumn);
    }
}

export class AccordionData {

    private accordionTemplate: AccordionTemplate;
    rows: Array<TableRow>;

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
}

export class TableRow extends Row {
    accordionRows: Array<AccordionRow>;
    accordionTemplate: Array<AccordionColumn>;

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


