"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var platform_browser_1 = require("@angular/platform-browser");
var core_1 = require("@angular/core");
var animations_1 = require("@angular/platform-browser/animations");
var ng2_accordion_table_component_1 = require("./ng2-accordion-table/ng2-accordion-table.component");
var ng2_accordion_template_1 = require("./ng2-accordion-table/ng2-accordion-template");
var NgxAccordionTableModule = /** @class */ (function () {
    function NgxAccordionTableModule() {
    }
    NgxAccordionTableModule = __decorate([
        core_1.NgModule({
            declarations: [
                ng2_accordion_table_component_1.Ng2AccordionTableComponent,
                ng2_accordion_template_1.EscapeHtmlPipe
            ],
            imports: [
                platform_browser_1.BrowserModule,
                animations_1.BrowserAnimationsModule
            ]
        })
    ], NgxAccordionTableModule);
    return NgxAccordionTableModule;
}());
exports.NgxAccordionTableModule = NgxAccordionTableModule;
