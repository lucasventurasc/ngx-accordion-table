
## Introduction

This is a small component to create accordion tables (table inside another table) allowing
different number of columns for Angular apps, this component is using bootstrap and
small javascript functions behind the scenes.

Please feel free to fork, contribute and open pull requests for this project.


V1.00 - This first version have low flexibility and features but the idea is to improve for everything
which is needed.

## Getting Started

To install the component on your app run

```bash
npm install ngx-accordion-table --save
```
Install dependencies
```bash
npm install jquery bootstrap@4 --save
```
**Note:** Bootstrap is an Optional dependency.

In your **angular-cli.json** you need to add CSS and Javascript files (considering which you installed bootstrap).
```json
"styles": [  
  "../node_modules/bootstrap/dist/css/bootstrap.min.css" 
],  
"scripts": [  
  "../node_modules/bootstrap/dist/js/bootstrap.min.js",  
  "../node_modules/jquery/dist/jquery.min.js",  
  "../node_modules/ngx-accordion-table/js/ngx-accordion-table-script.js"  
]
```

Now we need to change the your main **app.module.ts**. You need to import **BrowserModule** and **NgxAccordionTableModule** and import as below:

```typescript
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import { NgxAccordionTableModule } from 'ngx-accordion-table'

@NgModule({
    declarations: [
        ...,
    ],
    imports: [
        BrowserModule,
        NgxAccordionTableModule
    ],
    bootstrap: [YourComponent]
})
```
In your component HTML code you need to write the accordion-table directive with a couple parameters:
 **[template]** which will the reference of your accordion template;
 **[data]** which be the representation of all data
```html
<ngx-accordion-table [template]="accordionTemplate" 
					 [data]="accordionData">
</ngx-accordion-table>
```
Now we need to build our template, in your component.ts you will use the class **AccordionTemplate** to write your template.
Lets imagine that we want to show all Marvel Movies already created in parent table and for each movie we want to show all avengers which participated of that movie.
```typescript
import {AccordionTemplate} from 'ngx-accordion-table';  

[...]//Your @component declaration  
  
export class YourComponent { 
    accordionTemplate: AccordionTemplate;  
	constructor() {  
	    this.accordionTemplate = YourComponent.buildTemplate();  
    }  
    private static buildTemplate() {  
        let template = new AccordionTemplate();  
	    template.addColumn("Marvel Movie", "*")  
	            .addColumn("Year", "100px")  
	            .addColumn("Main Character", "150px")  
	            .addHtmlColumn("Revenues", "100px")  
		template.addAccordionColumn("Avenger Name", "200px")  
	            .addAccordionColumn("Avenger Codename", "400px")  
	            .addAccordionColumn("Main Power", "400px");
        return template;  
    }
}
```

Done we already defined our template, we can see three different methods:
* **addColumn** *//adds a column* to parent table
* **addHtmlColumn** //adds a column to parent table which render html data
* **addAccordionColumn** //adds a column to accordion template

Now lets add another method to our component to fill rows and see how it works.
```typescript
private static addData(template: AccordionTemplate) {  
    let data = new AccordionData(template);  
    let avengersLink =`<a href="https://www.the-numbers.com/movie/Avengers-The-(2012)">$1,519,479,547</a>` 
	let row = data.addRow(["The Avengers", "2012", "None", avengersLink;]);  
	row.addAccordionRows(  
        [["Tony Stark", "Iron Man", "Playboy, Billionaire, Philanthropist"  
	   ],["Bruce Banner", "Hulk", "Infinity Strength, Endurance"  
	   ],["Steve Rogers", "Captain America", "Super Soldier, Strength, Endurance, Agility, Speed"  
	   ],["Thor Odinson", "Thor", "Long Life, Lightning Control, Mjolnir, Super Strength, Speed, Endurance"]]  
    );  
    let ultronLink = `<a href="https://www.the-numbers.com/movie/Avengers-Age-of-Ultron#tab=summary">$1,408,218,722</a>`
    let rowWithoutAccordion = data.addRow(["Avengers: Age of Ultron", "2015", "Iron Man"]);  
  return data;  
}
```
And for example purposes lets call him on constructor:
```typescript
import {AccordionTemplate, AccordionTemplate} from 'ngx-accordion-table';  

export class YourComponent { 
    accordionTemplate: AccordionTemplate;  
    accordionData: AccordionData;
	constructor() {  
	    this.accordionTemplate = YourComponent.buildTemplate();
	    this.accordionData = YourComponent.addData(this.accordionTemplate) 
    }
[...]
```

If we run this code we could see a table like this
**Colapsed**:
![colapsed](https://image.ibb.co/j0z61c/ngx_marvel_accordion_table_example_collapsed.png)
**Opened**
![opened](https://image.ibb.co/eJsn7H/ngx_marvel_accordion_table_example.png)
That code could be found in example folder within this repository.

## For developers <3
After clone and inside project folder:
```bash
npm install . #to install dependencies
```
To build the component:
```bash
npm run build && cd dist && npm pack
```
To run example project:
```bash
cd example/marvel-app-example/
npm install . # will install all dependencies together with ngx-accordion-table component
ng serve # will start angular server at localhost:4200
```
To update component in example project run
```bash
npm install ../../dist/ngx-accordion-table-x.x.x.tgz --upgrade #where x is the generated version
```
Thanks for read!

