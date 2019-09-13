import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {BaseComponent} from '../main/base/base.component';
import {SharedService} from '../../layouts/shared-service';
import {FormArray, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators} from '@angular/forms';
import {UsersService} from './users.service';
import {ConfirmationService} from 'primeng/api';
import {MessageService} from 'primeng/components/common/messageservice';
import {AccessName, User, MerchantUserAccess, MerchantUserFilter, MerchantUserObj, Gender} from './users.model';

// import {AccessName, IAccessRight, IAccessStore, IStatus, IUsers, IUsersObj, MerchantUser, MerchantUserAccess, MerchantUserFilter, MerchantUserObj, MerchantUserResponse, Store} from './users.model';
import {isNullOrUndefined} from 'util';
import {Merchant} from '../model/merchant.model';
import {Store} from '../model/store.model';
import {Constant} from '../main/constant';
import * as forge from 'node-forge';
import * as moment from 'moment';


@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.scss']
})
export class UsersComponent extends BaseComponent implements OnInit {
    @Input() merchant: number;
    @Output() onActionBack = new EventEmitter();
    objMerchantList = [] as Merchant[];
    objGenderList = [] as Gender[];
    filter = {} as MerchantUserFilter;
    displayActive = false;
    comment: string;
    user_status: number;
    editAction: boolean;
    myObject: any;
    loading = false;
    disable = false;
    numRecords = 15;
    pageIndex = 0;
    queryString: string;
    objAccessNameList = [] as AccessName[];
    accessMerchantUser = [] as number[];
    selectedStores = [] as Store[];
    objListStores = [] as Store[];
    selectedStore: Store;
    objStoreList = [] as Store[];
    isCheckedList = [] as boolean[];
    objMerchantUserStatusList = [
        { name: 'Active', code: 'Active', key: '1'},
        { name: 'In-active', code: 'In-active', key: '2' },
        { name: 'Close', code: 'Close', key: '0' }
    ];
    objSubMerUserAcess = [] as AccessName[];
    accessSubMerchantUser = [] as number[];
    objSubMerchantUserAccess = {} as MerchantUserAccess;
    objSubMerchantUser = {} as User;


    constructor(public share: SharedService
        , public fb: FormBuilder
        , public service: UsersService
        , public messageService: MessageService) {
        super();
        this.sharedService = share;
        this.pageName = 'Sub Merchant User';
        this.editAction = false;
        this.initCols();
    }
    ngOnInit() {
        // this.getSubMerchantUserAccess();
        this.objList = {} as MerchantUserObj;
        this.obj = {} as User;
        this.getMerchant();
        this.getGender();
        this.initFormSearch();
        if (this.merchant) {
            this.filter.max = this.numRecord;
            this.filter.offset = 0;
            this.queryData();
        } else {
            setTimeout(() => this.pageTitle('Sub Merchant User'), 0);
        }
        // this.getAllAccessNameList();
    }
    getGender() {
        this.service.get('/gender').subscribe(
            (data: Gender[]) => {
                this.objGenderList = data;
            },
            (error) => this.onErrorHandler(error)
        );
    }
    getMerchant() {
        this.service.get('/merchant').subscribe(
            (data: Merchant[]) => {
                this.objMerchantList = data;
            },
            (error) => this.onErrorHandler(error)
        );
    }
    // getSubMerchantUserAccess() {
    //     this.service.getlistMerchantUserById(this.sharedService.getLoginUserId()).subscribe(res => {
    //         this.objSubMerchantUserAccess = res.results[0].merchant_user_access;
    //         this.objSubMerchantUser = res.results[0];
    //         console.log('*********************************************')
    //         console.log(this.objSubMerchantUser)
    //     })
    // }
    getSubMerchantStores() {
        this.service.getlistMerchantUserStoreById(this.sharedService.getLoginUserId()).subscribe(res => {
           this.objListStores = res.results[0].stores;
        })
    }
    initObj() {
        this.obj = {} as User;
    }
    initCols() {
        this.cols = [
            { field: 'name_eng', header: 'Name' },
            { field: 'username', header: 'User Name' },
            { field: 'name_kh', header: 'Khmer Name' },
            { field: 'email', header: 'Email' },
            { field: 'dob', header: 'Date of birth', pipe: 'dateSimfoni'},
            { field: 'gender.sex', header: 'Gender'},
            { field: 'created_by_id', header: 'Create By'},
            { field: 'status', header: 'Status'}
        ];
    }
    initFormSearch(): void {
        this.fs = this.fb.group({
            'merchant_id' : this.filter.merchant_id,
            'merchant_user_name' : this.filter.merchant_user_name,
            'user_status' : this.filter.user_status
        });
    }
    initForm(): void {
        if (this.formStatus === 'new') {
            this.f = this.fb.group({
                name_eng: [this.obj.name_eng, Validators.required],
                name_kh: this.obj.name_kh,
                username: [this.obj.username , Validators.required],
                email: [this.obj.email, Validators.required],
                password: [this.obj.password, Validators.required],
                dob: this.obj.dob,
                gender: this.obj.gender,
              //  status: this.obj.status,
            });
        } else {
            this.f = this.fb.group({
                id: this.obj.id,
                name_eng: [this.obj.name_eng, Validators.required],
                name_kh: [this.obj.name_kh, Validators.required],
                username: [this.obj.username , Validators.required],
                // contact: this.obj.contact,
                email: [this.obj.email, Validators.required],
                dob: this.obj.dob,
                gender: this.obj.gender,
                status: this.obj.status,
            });
            // this.initMerchantUserAccessEditForm();
            this.formChangedWatcher();
        }
    }
    /**/
    initMerchantUserAccess(initObj: MerchantUserAccess) {
        return this.fb.group({
            access_name: [initObj.access_name, Validators.required],
            store: [initObj.store, Validators.required]
        })
    }
    /*
    initMerchantUserAccess(initObj: MerchantUserAccess) {
        return this.fb.group({
            access_name: initObj.access_name,
            store: initObj.store
        })
    }*/
    initMerchantUserAccessEditForm() {
        const control = <FormArray>this.f.controls['merchant_user_access'];
        control.removeAt(0);
        this.obj.merchant_user_access!.forEach(pf => {
            // control.push(this.initMerchantUserAccess(pf));
            this.addNewRow(pf as MerchantUserAccess);
        });
    }

    addNewRow(data: any) {
        const control = <FormArray> this.f.controls['merchant_user_access'];
        control.push(this.initMerchantUserAccess(data));
    }

    // getAllAccessNameList() {
    //     return this.service.queryAllAccessName().subscribe(
    //         (data: AccessName[]) => {
    //             this.objAccessNameList = data;
    //             this.isCheckedList = this.objAccessNameList.map((val) => false);
    //         },
    //         (err) => {console.log(err.message); }
    //     )
    // }
    onSelectMerchantChanged(mer: any) {
        const cnt = <FormArray> this.f.controls['merchant_user_access'];
        for (let i = 0; i < cnt.length; i++) {
            const fg = <FormGroup> cnt.controls[i];
            fg.controls['store'].patchValue('');
        }
        this.objStoreList = [];
        this.setRequiredValidationForm();
        this.getStoreList(mer.id.toString());
    }

    getStoreList(id: string) {
        this.service.listAllStoreByMerchant(id).subscribe(
            (data: Store[]) => {
                console.log('************************** store **********************')
                console.log(data)
                this.objStoreList = data;
            },
            (err) => { console.log(err.message); }
        );
    }

    onAccessNameClicked(index: number) {
        const fa = <FormArray> this.f.controls['merchant_user_access'];
        this.isCheckedList[index] = !this.isCheckedList[index];
        if (this.isCheckedList[index]) {
            for (let i = 0; i < fa.length; i++) {
                const fg = <FormGroup> fa.controls[i];
                if (!this.isCheckedList[i]) {
                    fg.get('access_name').clearValidators();
                    fg.get('access_name').updateValueAndValidity();
                    fg.get('store').clearValidators();
                    fg.get('store').updateValueAndValidity();
                } else {
                    fg.get('access_name').setValidators([Validators.required]);
                    fg.get('access_name').updateValueAndValidity();
                    fg.get('store').setValidators([Validators.required]);
                    fg.get('store').updateValueAndValidity();
                }
            }

        } else if (!this.isCheckedList.includes(true)) {
            for (let i = 0; i < fa.length; i++) {
                const fg = <FormGroup> fa.controls[i];
                fg.get('access_name').setValidators([Validators.required]);
                fg.get('access_name').updateValueAndValidity();
                fg.get('store').setValidators([Validators.required]);
                fg.get('store').updateValueAndValidity();
            }
        } else {
            const  fg = <FormGroup> fa.controls[index];
            fg.get('access_name').clearValidators();
            fg.get('access_name').updateValueAndValidity();
            fg.get('store').clearValidators();
            fg.get('store').updateValueAndValidity();
        }

    }

    cancelShowForm() {
        this.formStatus = 'list';
        if (this.merchant) {
            this.pageTitle('Merchant  > Sub Merchant User');
        } else {
            this.pageTitle('Sub Merchant User');
        }
        this.obj = {} as User;
        this.queryData();
    }
    showNewForm() {
        this.formStatus = 'new';
      /*  this.accessMerchantUser = this.objSubMerchantUser.merchant_user_access.map(val => val.access_name.id);
        this.getStoreList(this.objSubMerchantUser.merchant.id.toString());
        this.selectedStores = this.getAccessNameSubDetail();
        this.objListStores = this.selectedStores;
        this.selectedStores = [];
        console.log('***************************** select store ****************************')
        console.log(this.selectedStores)
        this.editAction = false;
        this.pageTitle('Create ' + this.pageName);
        // this.isCheckedList = this.objAccessNameList.map((val, i) => !(!this.selectedStores[i]));
        // this.objStoreList = [];
        // this.accessMerchantUser = [];
        // this.selectedStores = [];
        this.isCheckedList = this.objAccessNameList.map((val) => true);*/
        // this.initObj();
        this.initForm();
        // this.service.getAccessStoreByMerchant(this.sharedService.getLoginUserId()).subscribe(res => {
        //     if (res.code === 200) {
        //         this.objStoreList = res.store;
        //     }
        // })
    }

    pageEvent(event) {
        this.numRecord = event.rows;
        this.filter.max = this.numRecord;
        this.filter.offset = event.rows * event.page;
        this.queryData();
    }
    search(query: any) {
        this.filter = query;
        if (query.user_status) {
            this.filter.user_status = query.user_status.key;
        }
        this.filter.max = this.numRecord;
        this.filter.offset = 0;
        this.queryData();
    }
    // queryData() {
    //     this.stopLoading = false;
    //     this.filter.merchant = this.merchant;
    //     this.filter.user_id = this.sharedService.getLoginUserId();
    //     this.service.listSubMerchantUser(this.filter).subscribe(
    //         (data: MerchantUserObj) => {
    //             this.objList = data;
    //             this.stopLoading = true;
    //             this.isNullShow = true;
    //         },
    //         (error) => this.onErrorHandler(error)
    //     );
    // }
    queryData() {
        this.stopLoading = false;
        this.filter.merchant = this.merchant;
        this.filter.user_id = this.sharedService.getLoginUserId();
        this.service.list(this.queryString, this.numRecords, this.numRecords * this.pageIndex).subscribe(
            (data: MerchantUserObj) => {
                this.objList = data;
                this.stopLoading = true;
                this.isNullShow = true;
            },
            (error) => this.onErrorHandler(error)
        );
    }
    onBack() {
        this.onActionBack.emit();
    }
    showEditForm(obj: any) {
        this.beforeShowEditForm();
        this.formStatus = 'edit';
        this.pageTitle('Edit ' + this.pageName);
        this.obj = obj;
        this.objSubMerchantUserAccess = this.obj.merchant_user_access;
        this.objSubMerchantUser = this.obj;
        this.accessMerchantUser = this.objSubMerchantUser.merchant_user_access.map(val => val.access_name.id);
        // this.getStoreList(this.objSubMerchantUser.merchant.id.toString());
        this.getSubMerchantStores();
        this.selectedStores = this.getAccessNameSubDetail();
        console.log('********************************************* select stotre');
        console.log(this.selectedStores);
        // this.objListStores = this.selectedStores
        // console.log('********************************************* obj');
        // console.log(this.obj);
        this.isCheckedList = this.objAccessNameList.map((val, i) => !(!this.selectedStores[i]));
        this.disable = false;
        this.editAction = true;
        this.initForm();
        // this.onClearValidationForm();
    }
    showComment(status: number) {
        this.comment = null;
        this.user_status = status;
        this.displayActive = true;
    }
    changeStatus() {
        this.sharedService.showLoading(true);
        this.service.changeStatus(this.obj.id, this.user_status, this.sharedService.getLoginUserId()).subscribe(
            (res: any) => {
                if (res.code === 200) {
                    this.messageService.add({severity: 'success', summary: 'Updated', detail: this.pageName + ' updated successfully!'});
                    this.sharedService.showLoading(false);
                    res.data.merchant = this.obj.merchant;
                    this.obj = res.data;
                    const index = this.objList.results.findIndex(x => x.id === res.data.id);
                    this.objList.results[index].user_status = res.data.user_status;
                    // this.objList.results[index].comment = res.data.comment;
                    this.displayActive = false;
                } else {
                    this.messageService.add({severity: 'error', summary: 'Exception', detail: res.message});
                    this.sharedService.showLoading(false);
                }
            },
            (error) => this.onErrorHandler(error)
        );
    }
    showDetailForm(obj: any) {
        this.formStatus = 'detail';
        this.pageTitle( this.pageName + ' detail');
        this.obj = obj;
        console.log(this.obj.merchant_user_access)
        this.accessMerchantUser = this.obj.merchant_user_access.map(val => val.access_name.id);
        this.getStoreList(this.obj.merchant.id.toString());
        this.selectedStores = this.getAccessNameDetail();
    }

    getAccessNameDetail() {
        const accessNameId = this.objAccessNameList.map(acc => acc);
        const resUserAccess = this.obj.merchant_user_access.map(val => val);
        const accessResult = [];
        for (let i = 0; i < accessNameId.length; i++) {
            let isEqual = false;
            let index = i;
            for (let j = 0; j < resUserAccess.length; j++) {
                isEqual = accessNameId[i].id === resUserAccess[j].access_name.id;
                if (isEqual) {
                    index = j;
                    break;
                }
            }
            accessResult[i] = isEqual ? resUserAccess[index].store : null;
        }
        return accessResult;
    }

    getAccessNameSubDetail() {
        const accessNameId = this.objAccessNameList.map(acc => acc);
        const resUserAccess = this.objSubMerchantUser.merchant_user_access.map(val => val);
        const accessResult = [];
        for (let i = 0; i < accessNameId.length; i++) {
            let isEqual = false;
            let index = i;
            for (let j = 0; j < resUserAccess.length; j++) {
                isEqual = accessNameId[i].id === resUserAccess[j].access_name.id;
                if (isEqual) {
                    index = j;
                    break;
                }
            }
            accessResult[i] = isEqual ? resUserAccess[index].store : null;
        }
        return accessResult;
    }

    /*saveObject(formObj: any) {
        this.sharedService.showLoading(true);
        this.obj = formObj;
        this.obj.password = this.randomPassword(10) + Constant.FIRST_PASS;
        console.log(this.obj);
        this.obj.merchant_user_access = this.obj.merchant_user_access.map((val, i) => {
            if (val.access_name !== null && val.access_name.length > 0 && val.access_name.includes(this.objAccessNameList[i].id)) {
                return {
                    access_name: this.objAccessNameList[i].id,
                    store: val.store
                }
            }
        }).filter(item => item);

        console.log('******************************* obj merchant user access');
        console.log(this.obj.merchant_user_access)
        if (this.formStatus === 'new') {
            this.obj.created_by_merchant = this.sharedService.getLoginUserId();
            this.service.saveSubMerchantUser(this.obj, this.obj.merchant_user_access).subscribe(
                (res: MerchantUserResponse) => {
                    console.log('fucking res **************************');
                    console.log(res);
                    if (res.code === 200) {
                        this.afterSaveSuccess(res);
                    } else {
                        this.afterSaveFailedMsg(res);
                    }
                },
                (err) => {
                    this.afterSaveError(err);
                }
            );
        } else {
            this.obj.updated_by_merchant = this.sharedService.getLoginUserId();
            console.log(this.obj)
            this.service.updateSubMerchantUser(this.obj, this.obj.merchant_user_access).subscribe(
                (res: MerchantUserResponse) => {
                    if (res.code === 200) {
                        this.afterUpdateSuccess(res);
                    } else {
                        this.afterUpdateFailed();
                    }
                },
                (err) => {
                    this.afterUpdateError(err);
                }
            );
        }
    }*/
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
            this.obj.dob = moment('yyyy-MM-dd HH:mm:ss', this.obj.dob).toISOString();
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
    onClearValidationForm() {
        const fa = <FormArray> this.f.controls['merchant_user_access'];
        for (let i = 0; i < fa.length; i++) {
            const fg = <FormGroup> fa.controls[i];
            fg.get('access_name').clearValidators();
            fg.get('access_name').updateValueAndValidity();
            fg.get('store').clearValidators();
            fg.get('store').updateValueAndValidity();
        }
    }

    setRequiredValidationForm() {
        const fa = <FormArray> this.f.controls['merchant_user_access'];
        for (let i = 0; i < fa.length; i++) {
            const fg = <FormGroup> fa.controls[i];
            if (this.isCheckedList[i]) {
                fg.get('access_name').setValidators([Validators.required]);
                fg.get('access_name').updateValueAndValidity();
                fg.get('store').setValidators([Validators.required]);
                fg.get('store').updateValueAndValidity();
            }
        }
    }

    onSelectStoreChanged(data: any) {
        // console.log(data);
        // this.objStoreList = data;
    }

    randomPassword(length) {
        const chars = 'abcdefghijklmnopqrstuvwxyz!@#$%^&*()-+<>ABCDEFGHIJKLMNOP1234567890';
        let pass = '';
        for (let x = 0; x < length; x++) {
            const i = Math.floor(Math.random() * chars.length);
            pass += chars.charAt(i);
        }
        console.log(pass);
        return pass;
    }

    EncryptPassword(password: string) {
        const token = Constant.ENCRYPE_PASS.token;
        const passWord = password + token;
        const secrete = Constant.ENCRYPE_PASS.secrete;
        const salt = Constant.ENCRYPE_PASS.salt;
        const key = forge.pkcs5.pbkdf2(secrete, salt, 40, 16);
        const iv = Constant.ENCRYPE_PASS.iv;

        const cipher = forge.cipher.createCipher('AES-CBC', key);
        cipher.start({iv: iv});
        cipher.update(forge.util.createBuffer(passWord));
        cipher.finish();
        const cipherText = forge.util.encode64(cipher.output.getBytes());
        return cipherText;
    }
}
