import {Component} from '@angular/core';
import {AccordionData, AccordionTemplate} from "ngx-accordion-table";
import {TableRow, TargetOpenAction} from "../../../../component/ngx-accordion-template";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    accordionTemplate: AccordionTemplate;
    accordionData: AccordionData;

    constructor() {
        this.accordionTemplate = AppComponent.buildTemplate();
        this.accordionData = AppComponent.addData(this.accordionTemplate);
    }

    private static buildTemplate() {
        let template = new AccordionTemplate();
        template.setTargetOpenAction(TargetOpenAction.ELEMENT);
        template.eventListener.subscribe("Revenues", function(row: TableRow) {
            console.log(row.getCells());
        });

        template.addColumn("Marvel Movie", "*")
            .addColumn("Year", "50px")
            .addColumn("Main Character", "250px")
            .addHtmlColumn("Revenues", "100px")
            .addHiddenColumn('identifier');
        template.addAccordionColumn("Avenger Name", "200px")
            .addAccordionColumn("Avenger Codename", "400px")
            .addAccordionColumn("Main Power", "400px")
            .addAccordionHiddenColumn('in-identifier');
        return template;
    }

    private static addData(template: AccordionTemplate) {
        let data = new AccordionData(template);
        let row = data.addRow([
            "The Avengers",
            "2012",
            "None",
            `<button>$1,519,479,547</button>`,
            '10024039431;2'
        ]);
        row.addAccordionRows(
            [["Tony Stark", "Iron Man", "Playboy, Billionaire, Philanthropist", "HiddenA"
            ],["Bruce Banner",  "Hulk", "Infinity Strength, Endurance", "HiddenB"
            ],["Steve Rogers", "Captain America", "Super Soldier, Strength, Endurance, Agility, Speed", "HiddenC"
            ],["Thor Odinson", "Thor", "Long Life, Lightning Control, Mjolnir, Super Strength, Speed, Endurance", ""]]
        );
        let rowWithoutAccordion = data.addRow([
            "Avengers: Age of Ultron",
            "2015",
            "Iron Man",
            `<a href="https://www.the-numbers.com/movie/Avengers-Age-of-Ultron#tab=summary">$1,408,218,722</a>`,
            "45679872654;1"
        ]);
        return data;
    }
}
