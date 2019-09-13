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
var ListDeepComponent = (function () {
    function ListDeepComponent(fg) {
        this.fg = fg;
        this.actionNew = true;
        this.actionSearch = true;
        this.actionPaginate = true;
        this.range = true;
        this.pageOptions = [2, 3, 4, 5, 6];
        this.pageIndex = 0;
        this.onActionRow = new EventEmitter();
        this.onActionNew = new EventEmitter();
        this.onActionSearch = new EventEmitter();
        this.onActionPage = new EventEmitter();
    }
    ListDeepComponent.prototype.ngOnInit = function () {
        this.initFormSearch();
    };
    ListDeepComponent.prototype.initFormSearch = function () {
        this.fs = this.fg.group({
            'query': this.searchText
        });
    };
    ListDeepComponent.prototype.doAction = function (action, data) {
        this.onActionRow.emit({ action: action, data: data });
    };
    ListDeepComponent.prototype.newForm = function () {
        this.onActionNew.emit();
    };
    ListDeepComponent.prototype.search = function (queryStr) {
        this.onActionSearch.emit(queryStr.query);
    };
    ListDeepComponent.prototype.paginate = function (event) {
        this.onActionPage.emit(event);
    };
    ListDeepComponent.prototype.customSort = function (event) {
        event.data.sort(function (data1, data2) {
            var value1 = '';
            var value2 = '';
            if (event.field) {
                var arr = event.field.split('.');
                switch (arr.length) {
                    case 1:
                        value1 = data1[event.field];
                        value2 = data2[event.field];
                        break;
                    case 2:
                        value1 = data1[arr[0]][arr[1]];
                        value2 = data2[arr[0]][arr[1]];
                        break;
                    case 3:
                        value1 = data1[arr[0]][arr[1]][arr[2]];
                        value2 = data2[arr[0]][arr[1]][arr[2]];
                        break;
                    default:
                        value1 = data1[event.field];
                        value2 = data2[event.field];
                }
            }
            var result = null;
            if (value1 == null && value2 != null) {
                result = -1;
            }
            else if (value1 != null && value2 == null) {
                result = 1;
            }
            else if (value1 == null && value2 == null) {
                result = 0;
            }
            else if (typeof value1 === 'string' && typeof value2 === 'string') {
                result = value1.localeCompare(value2);
            }
            else {
                result = (value1 < value2) ? -1 : (value1 > value2) ? 1 : 0;
            }
            return (event.order * result);
        });
    };
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], ListDeepComponent.prototype, "searchText", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], ListDeepComponent.prototype, "data", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], ListDeepComponent.prototype, "cols", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], ListDeepComponent.prototype, "actionRows", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], ListDeepComponent.prototype, "actionNew", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], ListDeepComponent.prototype, "actionSearch", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], ListDeepComponent.prototype, "actionPaginate", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], ListDeepComponent.prototype, "range", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], ListDeepComponent.prototype, "pageRows", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], ListDeepComponent.prototype, "numRecords", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], ListDeepComponent.prototype, "pageOptions", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], ListDeepComponent.prototype, "pageIndex", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], ListDeepComponent.prototype, "onActionRow", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], ListDeepComponent.prototype, "onActionNew", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], ListDeepComponent.prototype, "onActionSearch", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], ListDeepComponent.prototype, "onActionPage", void 0);
    ListDeepComponent = __decorate([
        Component({
            selector: 'app-list-deep',
            templateUrl: './list-deep.component.html',
            styleUrls: ['./list-deep.component.scss']
        }),
        __metadata("design:paramtypes", [FormBuilder])
    ], ListDeepComponent);
    return ListDeepComponent;
}());
export { ListDeepComponent };
//# sourceMappingURL=list-deep.component.js.map