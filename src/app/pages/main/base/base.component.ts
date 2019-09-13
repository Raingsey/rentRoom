import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SharedService } from '../../../layouts/shared-service';
import { MessageService } from 'primeng/components/common/messageservice';
import { ConfirmationService } from 'primeng/api';
import { environment } from '../../../../environments/environment';
import {Constant} from '../constant';
import * as moment from 'moment';
import * as deepEqual from 'deep-equal';

@Component({
    selector: 'app-base',
    templateUrl: './base.component.html',
    styleUrls: ['./base.component.scss']
})
export class BaseComponent {
    f: FormGroup;
    fs: FormGroup;
    formStatus = 'list';
    objList: any;
    obj: any;
    numRecord = 10;
    pageIndex = 0;
    queryString: string;
    cols: any[];
    sharedService: SharedService;
    fb: FormBuilder;
    confirmDialog: ConfirmationService;
    messageService: MessageService;
    service: any;
    pageName: string;
    baseServerPath = environment.apiBaseUrl1;
    isFormChanged = false;
    stopLoading = true;
    isNullShow = false;
    validate = false;
    start_date: Date;
    end_date: Date;
    fromDays: any;
    toDays: any;

    constructor() {
    }
    pageTitle(title: string) {
        this.sharedService.emitChange(title);
    }
    getObjList(): void {
        this.pageIndex = 0;
        this.queryData();
    }
    pageEvent(event) {
        this.numRecord = event.rows;
        this.pageIndex = event.page;
        this.queryData();
    }
    search(query: any) {
        this.queryString = query.query;
        this.pageIndex = 0;
        this.queryData();
    }
    queryData() {
        this.stopLoading = false;
        this.service.list(this.queryString, this.numRecord, this.numRecord * this.pageIndex).subscribe(
            (data: any) => {
                this.objList = data; this.log(data);
                this.stopLoading = true;
                this.isNullShow = true;
            },
            (error) => { this.log(error.message); this.isNullShow = true; }
        );
    }

    initForm() {
    }
    initFormSearch() {
        this.fs = this.fb.group({
            query: null
        });
    }
    initObj() {
    }
    showNewForm() {
        this.formStatus = 'new';
        this.pageTitle('New ' + this.pageName);
        this.initObj();
        this.initForm();
    }
    beforeShowEditForm() {}
    showEditForm(obj: any) {
        this.beforeShowEditForm();
        this.formStatus = 'edit';
        this.pageTitle('Edit ' + this.pageName);
        this.obj = obj;
        this.log(obj);
        this.initForm();
    }
    showDetailForm(obj: any) {
        this.formStatus = 'detail';
        this.pageTitle( this.pageName + ' detail');
        this.obj = obj;
    }
    cancelShowForm() {
        this.formStatus = 'list';
        this.pageTitle( this.pageName);
        this.initObj();
    }
    // showDeleteForm(obj: any) {
    //     this.confirmDialog.confirm({
    //         message: 'Do you want to delete this record?',
    //         header: 'Delete Confirmation',
    //         icon: 'fa fa-trash',
    //         accept: () => {
    //             this.log('delete');
    //             this.log(obj);
    //         },
    //         reject: () => {
    //             this.log('reject');
    //         }
    //     });
    // }
    showDeleteForm(obj: any) {
        this.log(obj);
        this.confirmDialog.confirm({
            message: 'Do you want to delete this record?',
            header: 'Delete Confirmation',
            icon: 'fa fa-trash',
            accept: () => {
                obj.status = false;
                this.service.update(obj).subscribe(
                    (res) => {
                        this.afterUpdateSuccess(res);
                    },
                    (error) => { this.log(error.message); }
                )
            },
            reject: () => {
                this.log('reject');
            }
        });
    }
    showMyCancelForm(obj: any) {
        this.log(obj);
        this.confirmDialog.confirm({
            message: 'Are you sure you want to cancel this?',
            header: 'Confirm Cancel',
            icon: 'fa fa-warning',
            accept: () => {
                this.log(obj);
            }
        });
    }
    saveObject(formObj: any) {
        this.sharedService.showLoading(true);
        if (this.formStatus === 'edit') {
            this.obj = formObj;
            this.obj.updated_by = this.sharedService.getLoginUserId();
            this.initialBeforeUpdate();
            this.log(this.obj);
            this.service.update(this.obj).subscribe(
                (res: any) => {
                    if (res) {
                        this.afterUpdateSuccess(res);
                    } else {
                        this.afterUpdateFailed();
                    }
                },
                (error) => { this.afterUpdateError(error.message); }
            );
        } else {
            this.obj = formObj;
            this.obj.created_by = this.sharedService.getLoginUserId();
            this.initialBeforeSave();
            this.log(this.obj);
            this.service.create(this.obj).subscribe(
                (res: any) => {
                    if (res) {
                        this.afterSaveSuccess(res);
                    } else {
                        this.afterSaveFailed();
                    }
                },
                (error) => { this.afterSaveError(error.message); }
            );
        }
    }
    onAction(event: any) {
        if (event.action === 'Edit') {
            this.showEditForm(event.data);
        } else if (event.action === 'Delete') {
            this.showDeleteForm(event.data);
        } else if (event.action === 'Detail') {
            this.showDetailForm(event.data);
        } else if (event.action === 'Approve') {
            this.showApproveForm(event.data);
        } else if (event.action === 'Reject') {
            this.showCancelForm(event.data);
        } else if (event.action === 'Download') {
            this.showDownloadForm(event.data);
        } else if (event.action === 'Refund') {
            this.showRefundForm(event.data);
        } else if (event.action === 'Void') {
            this.showVoidDialog(event.data);
        } else if (event.action === 'Cancel') {
            this.showMyCancelForm(event.data);
        }else if (event.action === 'delete') {
            this.showDelete(event.data);
        }else if (event.action === 'edit') {
            this.showEdit(event.data);
        }
    }
    initialBeforeSave() { }
    initialBeforeUpdate() { }
    afterSaveSuccess(res?: any) {
        this.formStatus = 'list';
        // this.getObjList();
        this.showAddUpdatedData(res);
        this.messageService.add({severity: 'success', summary: 'Created', detail: this.pageName + ' was created successfully.'});
        this.sharedService.showLoading(false);
    }
    showAddUpdatedData(data: any) {
        this.objList = {} as any;
        this.objList.results = [];
        this.objList.results.push(data.data);
        this.objList.length = 1;
        this.obj = {} as any;
    }
    showAddUpdatedBatch(data: any) {
        this.objList = {} as any;
        this.objList.results = [];
        this.objList.results.push(data.result);
        this.objList.length = 1;
        this.obj = {} as any;
    }
    showApproveForm(data: any) {}
    showCancelForm(data: any) {}
    showDownloadForm(data: any) {}
    showRefundForm(data: any) {}
    showVoidDialog(data: any) {}
    showEdit(data: any) {}
    showDelete(data: any) {}
    // showMyCancelForm(data: any) {}
    afterUpdateSuccess(res?: any) {
        this.formStatus = 'list';
        // this.getObjList();
        this.showAddUpdatedData(res);
        this.messageService.add({severity: 'success', summary: 'Updated', detail: this.pageName + ' was updated successfully.'});
        this.sharedService.showLoading(false);
    }
    afterDeleteSuccess(res?: any) {
        this.formStatus = 'list';
        // this.getObjList();
        // this.showAddUpdatedData(res);
        this.messageService.add({severity: 'success', summary: 'Delete', detail: this.pageName + ' was deleted successfully.'});
        this.sharedService.showLoading(false);
    }
    afterCancelSuccess(res?: any) {
        this.formStatus = 'list';
        this.messageService.add({severity: 'success', summary: 'Cancel', detail: this.pageName + ' was canceled successfully.'});
        this.sharedService.showLoading(false);
    }
    afterSaveFailed() {
        this.messageService.add({severity: 'error', summary: 'Service Error', detail: 'Server service went wrong!'});
    }
    afterSaveFailedMsg(res: any) {
        this.messageService.add({severity: 'error', summary: 'Error', detail: res.message});
        this.sharedService.showLoading(false);
    }
    afterUpdateFailed() {
        this.messageService.add({severity: 'error', summary: 'Service Error', detail: 'Server service went wrong!'});
    }
    afterSaveError(error?: any) {
        this.log(error); this.sharedService.showLoading(false);
    }
    afterUpdateError(error?: any) {
        this.log(error); this.sharedService.showLoading(false);
    }
    endProcess() {
        if (this.formStatus === 'new') {
            this.formStatus = 'list';
            this.getObjList();
            this.messageService.add({severity: 'success', summary: 'Created', detail: this.pageName + ' was created successfully.'});
            this.sharedService.showLoading(false);
        } else {
            this.formStatus = 'list';
            this.getObjList();
            this.messageService.add({severity: 'success', summary: 'Updated', detail: this.pageName + ' was updated successfully.'});
            this.sharedService.showLoading(false);
        }
    }
    onErrorHandler(error?: any) {
        this.log(error);
        this.sharedService.showLoading(false);
        this.stopLoading = true;
    }
    onResponseCodeError(title: string, detail: string) {
        this.sharedService.showLoading(false);
        this.messageService.add({severity: 'error', summary: title, detail: detail});
    }
    onResponseHandler(response: any, title?: string) {
        if (response.code === 200) {
            this.formStatus = 'list';
            this.showAddUpdatedData(response);
            this.messageService.add({severity: 'success', summary: title ? title : response.title, detail: response.message});
            this.sharedService.showLoading(false);
        } else {
            this.onResponseCodeError(title ? title : response.title, response.message);
        }
    }
    // region Disable Update Button while form not change
    onFormChangeDetect() {
        const defaultFormData = this.f.value;
        this.log(defaultFormData);
        this.f.valueChanges.debounceTime(100).subscribe((data) => {
            this.isFormChanged = !deepEqual(defaultFormData, data);
            // this.log(this.isFormChanged);
        });
    }
    formChangedWatcher() {
        this.isFormChanged = false;
        this.onFormChangeDetect();
    }
    // endregion
    /*validatesStart(e) {
        this.start_date = new Date(e);
        if ( this.end_date !== undefined ) {
            if (this.end_date < this.start_date) {
                this.log('Error');
                this.fs.controls['to_date'].setValue(null);
                this.validate = true;
            }else {
                this.log('Valid');
                this.validate = false;
            }
        }
    }

    validatesEnd(e) {
        this.end_date = new Date(e);
        if (this.end_date < this.start_date) {
            this.log('Error');
            // this.fs.controls['from_date'].setValue(null);
            this.fs.controls['to_date'].setValue(null);
            this.validate = true;
        }else {
            this.log('Valid');
            this.validate = false;
        }
    }*/

    validatesStart(e) {
        this.start_date = new Date(e);
        console.log('hour =' , moment(new Date()).format('HH'));
        console.log('hour 2 =' , moment(this.start_date).format('HH'));
        if (moment(this.start_date).format('HH') === moment(new Date()).format('HH') || this.fromDays !==  moment(new Date(e)).format('DD')) {
            this.fs.value.from_date.setHours(0, 0, 0, 0);
            this.fs.controls['from_date'].setValue(this.fs.value.from_date);
        }
        console.log('day =', this.fromDays);
        console.log('day 2 =', moment(new Date(e)).format('DD'));
        this.fromDays = moment(new Date(e)).format('DD');
        if ( this.end_date !== undefined ) {
            if (this.end_date < this.start_date) {
                this.log('Error');
                this.fs.controls['to_date'].setValue(null);
                this.validate = true;
            }else {
                this.log('Valid');
                this.validate = false;
            }
        }
    }

    validatesEnd(e) {
        this.end_date = new Date(e);
        console.log('************* to day ****************');
        console.log('hour =' , moment(new Date()).format('HH'));
        console.log('hour 2 =' , moment(this.end_date).format('HH'));
        if (moment(this.end_date).format('HH') === moment(new Date()).format('HH') || this.toDays !== moment(new Date(e)).format('DD') || this.end_date < this.start_date) {
            this.fs.value.to_date.setHours(23, 59, 59, 0);
            this.end_date = this.fs.value.to_date;
            this.fs.controls['to_date'].setValue(this.end_date);
        }
        console.log('day =', this.fromDays);
        console.log('day 2 =', moment(new Date(e)).format('DD'));
        this.toDays = moment(this.end_date).format('DD');
        console.log('end_date ' , this.end_date);
        console.log('start_date' , this.start_date);
        if (this.end_date < this.start_date) {
            this.log('Error');
            // this.fs.controls['from_date'].setValue(null);
            this.fs.controls['to_date'].setValue(null);
            this.validate = true;
        }else {
            this.log('Valid');
            this.validate = false;
        }
    }

    validatesStartF(e) {
        this.start_date = new Date(e);
        if ( this.end_date !== undefined ) {
            if (this.end_date < this.start_date) {
                this.log('Error');
                // this.fs.controls['from_date'].setValue(null);
                this.f.controls['to_date'].setValue(null);
                this.validate = true;
            }else {
                this.log('Valid');
                this.validate = false;
            }
        }
    }

    validatesEndF(e) {
        this.end_date = new Date(e);
        if (this.end_date < this.start_date) {
            this.log('Error');
            // this.fs.controls['from_date'].setValue(null);
            this.f.controls['to_date'].setValue(null);
            this.validate = true;
        }else {
            this.log('Valid');
            this.validate = false;
        }
    }
    // custom validate field
    isFieldValid(field: string) {
        status = '';
        // return this.f.get(field).hasError('required') && this.f.get(field).touched;
        if (this.f.get(field).hasError('required') && this.f.get(field).touched) {
            status = 'required';
        } else if (this.f.get(field).hasError('email') && this.f.get(field).touched) {
            status = 'invalidEmail';
        } else if (this.f.get(field).hasError('minlength') && this.f.get(field).touched) {
            status = 'minlength';
        } else if (this.f.get(field).hasError('maxlength') && this.f.get(field).touched) {
            status = 'maxlength';
        } else if (this.f.get(field).hasError('mismatch') && this.f.get(field).touched) {
            status = 'mismatch';
        } else {
            status = 'valid';
        }
        return {
            status: status,
            field: field
        }
    }
    isEmailValid(field: string) {
        return this.f.get(field).hasError('email') && this.f.get(field).touched;
    }

    displayFieldCss(field: string) {
        return {
            'has-error': this.isFieldValid(field),
            'has-feedback': this.isFieldValid(field)
        };
    }
    isEmptyInputValue(value: any): boolean {
        const length: number = value ? value.length : 0;
        if (value != null) {
            return false;  // don't validate empty values to allow optional controls
        } else {
            return true;
        }
        // we don't check for string here so it also works with arrays
        //  return value != null || value.length !== 0;
    }
    statusStyle(status: String) {
        const statusObj = Constant.TRANSACTION_STATUSES.find(x => x.name === status);
        let color = '#999999';
        if (statusObj) {
            color = statusObj.bg_color;
        }
        return {
            'background-color': color,
            'color': '#FFFFFF',
            'padding': '2px 4px',
            'border-radius': '2px'
        }
    }
    myStatusStyle(status: String) {
        const statusObj = Constant.MERCHANT_STATUSES.find(x => x.name === status);
        let color = '#999999';
        if (statusObj) {
            color = statusObj.bg_color;
        }
        return {
            'background-color': color,
            'color': '#FFFFFF',
            'padding': '2px 4px',
            'border-radius': '2px'
        }

    }
    log(str: any) {
        // console.log(str);
    }
}

