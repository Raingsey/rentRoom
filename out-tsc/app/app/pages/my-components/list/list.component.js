var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
var ListComponent = (function () {
    function ListComponent(fg) {
        this.fg = fg;
        this.actionNew = true;
        this.actionSearch = true;
        this.actionPaginate = true;
        this.range = true;
        this.pageRows = 10;
        this.numRecords = 120;
        this.pageOptions = [2, 3, 4, 5, 6];
        this.pageIndex = 0;
        this.onActionRow = new EventEmitter();
        this.onActionNew = new EventEmitter();
        this.onActionSearch = new EventEmitter();
        this.onActionPage = new EventEmitter();
    }
    ListComponent.prototype.ngOnInit = function () {
        this.initFormSearch();
    };
    ListComponent.prototype.initFormSearch = function () {
        this.fs = this.fg.group({
            'query': this.searchText
        });
    };
    ListComponent.prototype.doAction = function (action, data) {
        this.onActionRow.emit({ action: action, data: data });
    };
    ListComponent.prototype.newForm = function () {
        this.onActionNew.emit();
    };
    ListComponent.prototype.search = function (queryStr) {
        this.onActionSearch.emit(queryStr.query);
    };
    ListComponent.prototype.paginate = function (event) {
        this.onActionPage.emit(event);
    };
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], ListComponent.prototype, "searchText", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], ListComponent.prototype, "data", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], ListComponent.prototype, "cols", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], ListComponent.prototype, "actionRows", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], ListComponent.prototype, "actionNew", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], ListComponent.prototype, "actionSearch", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], ListComponent.prototype, "actionPaginate", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], ListComponent.prototype, "range", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], ListComponent.prototype, "pageRows", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], ListComponent.prototype, "numRecords", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], ListComponent.prototype, "pageOptions", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], ListComponent.prototype, "pageIndex", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], ListComponent.prototype, "onActionRow", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], ListComponent.prototype, "onActionNew", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], ListComponent.prototype, "onActionSearch", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], ListComponent.prototype, "onActionPage", void 0);
    ListComponent = __decorate([
        Component({
            selector: 'app-list',
            templateUrl: './list.component.html',
            styleUrls: ['./list.component.scss']
        }),
        __metadata("design:paramtypes", [FormBuilder])
    ], ListComponent);
    return ListComponent;
}());
export { ListComponent };
//# sourceMappingURL=list.component.js.map