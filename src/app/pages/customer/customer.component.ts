import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../layouts/shared-service';
import {FormArray, FormBuilder, Validators} from '@angular/forms';
import { CustomerService } from './customer.service';
import {ICustomer, ICustomerObj, ICustomerProfile, IGender, INationality} from './customer.model';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/components/common/messageservice';
import { BaseComponent } from '../main/base/base.component';
import * as moment from 'moment';

@Component({
    selector: 'app-customer',
    templateUrl: './customer.component.html',
    styleUrls: ['./customer.component.scss']
})
export class CustomerComponent extends BaseComponent implements OnInit {
    objGenderList: IGender[];
    objNationalityList: INationality[];
    btnCusProfileUpload: HTMLButtonElement;
    customer_id = 0;
    constructor(public share: SharedService
        , public fb: FormBuilder
        , public service: CustomerService
        , public confirmDialog: ConfirmationService
        , public messageService: MessageService) {
        super();
        this.sharedService = share;
        this.pageName = 'Customer';
        this.initCols();
    }
    ngOnInit() {
        this.objList = {} as ICustomerObj;
        this.obj = {} as ICustomer;
        this.getObjList();
        this.service.get('/gender').subscribe((data: IGender[]) => { this.objGenderList = data; }, (error) => console.log(error.message));
        this.service.get('/nationality').subscribe((data: INationality[]) => this.objNationalityList = data, (error) => console.log(error.message));
    }
    initCols() {
        this.cols = [
            { field: 'first_name', header: 'First Name' },
            { field: 'last_name', header: 'Last Name' },
            { field: 'gender.gender', header: 'Gender' },
            { field: 'dob', pipe: 'date', header: 'Date of birth' },
            { field: 'nationality.nationality', header: 'Nationality' },
        ];
    }
    initObj() {
        this.obj = {} as ICustomer;
    }
    initialUploadButton() {
        const e1: HTMLElement = document.getElementById('fileProfile');
        const bl1: NodeListOf<HTMLButtonElement> = e1.getElementsByTagName('button');
        this.btnCusProfileUpload = bl1.item(1);

        // this.btnCusProfileUpload.classList.add('hide');
    }
    initDefaultData() {
        this.obj.gender = this.objGenderList[0];
    }
    initForm() {
        setTimeout(() => this.initialUploadButton(), 100);
        if (this.formStatus === 'new') {
            this.initDefaultData();
            this.f = this.fb.group({
                id: this.obj.id,
                first_name: [this.obj.first_name,  Validators.required],
                last_name: [this.obj.last_name, Validators.required],
                gender: this.obj.gender ? this.obj.gender.id : null,
                dob: this.obj.dob,
                nationality: this.obj.nationality
            });
        } else {
            this.f = this.fb.group({
                id: this.obj.id,
                first_name: [this.obj.first_name,  Validators.required],
                last_name: [this.obj.last_name, Validators.required],
                gender: this.obj.gender.id,
                dob: this.obj.dob ? moment(this.obj.dob).format('DD-MMM-YYYY') : null,
                nationality: this.obj.nationality,
                customer_profiles: this.fb.array([this.initCustomerProfileForm({} as ICustomerProfile)]),
            });
            this.initCustomerProfileEdit();
        }
    }
    initCustomerProfileForm(pro: ICustomerProfile) {
        return this.fb.group({
            id: pro.id,
            file_name: pro.file_name,
            file_path: pro.file_path,
            status: pro.status
        });
    }
    deleteCustomerProfile(index: number) {
        const control = <FormArray>this.f.controls['customer_profiles'];
        control.at(index).value.status = false;
    }
    initCustomerProfileEdit() {
        const controls = <FormArray>this.f.controls['customer_profiles'];
        controls.removeAt(0);
        if (this.obj.customer_profiles.length > 0) {
            this.obj.customer_profiles.forEach(pf => {
                controls.push(this.initCustomerProfileForm(pf));
            });
        }
    }
    onUploadCusProfile(files) {
        if (files.length > 0) {
            this.service.uploadProfile(files, this.customer_id.toString()).subscribe(
                () => {
                    this.endProcess();
                },
                () => {
                    this.endProcess();
                }
            )
        } else {
            this.endProcess();
        }
    }
    initialBeforeUpdate() {
        this.obj.dob = this.obj.dob ? new Date(this.obj.dob).toISOString() : null;
        this.obj.gender = this.objGenderList.find(x => x.id === this.obj.gender.id)
    }
    afterSaveSuccess(res?: any) {
        this.customer_id = res.id;
        this.btnCusProfileUpload.click();
    }
    afterUpdateSuccess(res?: any) {
        this.customer_id = res.id;
        this.btnCusProfileUpload.click();
    }
    endProcess() {
        this.formStatus = 'list';
        this.getObjList();
        this.messageService.add({severity: 'success', summary: 'Service Message', detail: this.pageName + ' create successfully!'});
        this.sharedService.showLoading(false);
}
}
