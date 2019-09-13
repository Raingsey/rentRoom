var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { SharedService } from '../../layouts/shared-service';
import { FormBuilder } from '@angular/forms';
var PageDashboardComponent = (function () {
    function PageDashboardComponent(_sharedService, fb) {
        this._sharedService = _sharedService;
        this.fb = fb;
        this.pageTitle = 'Dashboard';
        this._sharedService.emitChange(this.pageTitle);
    }
    PageDashboardComponent.prototype.ngOnInit = function () {
        this.getBranch();
        this.initForm();
        this.data = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [
                {
                    label: 'My First dataset',
                    backgroundColor: '#42A5F5',
                    borderColor: '#1E88E5',
                    data: [65, 59, 80, 81, 56, 55, 40]
                },
                {
                    label: 'My Second dataset',
                    backgroundColor: '#9CCC65',
                    borderColor: '#7CB342',
                    data: [28, 48, 40, 19, 86, 27, 90]
                }
            ]
        };
        this.dataPie = {
            labels: ['A', 'B', 'C'],
            datasets: [
                {
                    data: [300, 50, 100],
                    backgroundColor: [
                        '#FF6384',
                        '#36A2EB',
                        '#FFCE56'
                    ],
                    hoverBackgroundColor: [
                        '#FF6384',
                        '#36A2EB',
                        '#FFCE56'
                    ]
                }
            ]
        };
        this.dataLine = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [
                {
                    label: 'First Dataset',
                    data: [65, 59, 80, 81, 56, 55, 40],
                    fill: false,
                    borderColor: '#4bc0c0'
                },
                {
                    label: 'Second Dataset',
                    data: [28, 48, 40, 19, 86, 27, 90],
                    fill: false,
                    borderColor: '#565656'
                }
            ]
        };
    };
    PageDashboardComponent.prototype.getBranch = function () {
        this.objBranchList = [
            { id: 1, branch_name: 'Phnom Penh' },
            { id: 2, branch_name: 'Main Branch' }
        ];
    };
    PageDashboardComponent.prototype.initForm = function () {
        this.f = this.fb.group({
            branch: null,
            loan_product: null,
            time: null,
        });
    };
    PageDashboardComponent.prototype.ngAfterViewInit = function () {
        this.getUploadButton();
        this.uploadBtn.classList.add('hide');
    };
    PageDashboardComponent.prototype.selectData = function (event) {
        this.msgs = [];
        this.msgs.push({ severity: 'info', summary: 'Data Selected',
            'detail': this.data.datasets[event.element._datasetIndex].data[event.element._index] });
    };
    PageDashboardComponent.prototype.onUploadCusProfile = function (event) {
        console.log(event.files);
    };
    PageDashboardComponent.prototype.getUploadButton = function () {
        var element = document.getElementById('fileUpload');
        var buttonB = element.getElementsByTagName('button');
        this.uploadBtn = buttonB.item(0);
    };
    PageDashboardComponent.prototype.submit = function () {
        this.uploadBtn.click();
    };
    PageDashboardComponent.prototype.removeFile = function (event) {
        console.log(event.file);
    };
    PageDashboardComponent.prototype.refreshData = function (obj) {
        console.log(obj);
    };
    PageDashboardComponent = __decorate([
        Component({
            moduleId: module.id,
            selector: 'app-page-dashboard',
            templateUrl: './dashboard.component.html',
            styleUrls: ['./dashboard.component.scss']
        }),
        __metadata("design:paramtypes", [SharedService,
            FormBuilder])
    ], PageDashboardComponent);
    return PageDashboardComponent;
}());
export { PageDashboardComponent };
//# sourceMappingURL=dashboard.component.js.map