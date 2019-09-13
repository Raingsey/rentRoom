import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IUser, IUserObj } from './user.model';
import { UserService } from './user.service';
import {environment} from '../../../environments/environment';
import {SharedService} from '../../layouts/shared-service';
// import { MatSnackBar } from '@angular/material';
import { IResponse } from './user.model';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  pageTitle = 'Users';
  f: FormGroup;
  ff: FormGroup;
  formStatus = 'list';
  gv = 'g';
  objList = {} as IUserObj;
  obj = {} as IUser;
  imagePath: string;
  @ViewChild('fileInput') fileInput: ElementRef;
  fs: FormGroup;
  numRecords = 15;
  pageIndex = 0;
  queryString: string;
  userStatus = [
    'Active',
    'In-Active'
  ];
  constructor(private service: UserService
      , private fb: FormBuilder
      , private _sharedService: SharedService
      , private fsb: FormBuilder
      // , private snackBar: MatSnackBar
  ) {
    this._sharedService.emitChange(this.pageTitle);
  }

  ngOnInit() {
    this.getObjList();
    this.initFormSearch();
  }
  initForm(): void {
    this.f = this.fb.group({
      'id' : this.obj.id,
      'name_eng' : [this.obj.name_eng, Validators.compose([Validators.required, Validators.maxLength(30)])],
      // 'name_kh' : this.objApproval.name_kh,
      'email' : [this.obj.email, Validators.compose([Validators.required, Validators.email])],
      'username' : [this.obj.username, Validators.compose([Validators.required, Validators.maxLength(30)])],
      'password' : this.formStatus === 'new' ?
        [this.obj.password, Validators.compose([Validators.required, Validators.minLength(6)])] : this.obj.password,
      'user_image': this.obj.user_image,
      'image_path': this.obj.image_path,
      'status': [this.obj.user_status, Validators.required],
    });
    this.ff = this.fb.group({
      'id' : this.obj.id,
      'name_eng' : [this.obj.name_eng],
      'name_kh' : this.obj.name_kh,
      'email' : [this.obj.email],
      'username' : [this.obj.username],
      'user_image': this.obj.user_image,
      'image_path': this.obj.image_path,
    });
  }
  statusValError() {
    return this.f.controls['status'].hasError('required') ? 'Please select status' : '';
  }
  initFormSearch(): void {
    this.fs = this.fsb.group({
      'query' : this.queryString
    });
  }
  getObjList(): void {
    this.pageIndex = 0;
    this.queryData();
  }
  pageEvent(event) {
    this.numRecords = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.queryData();
  }
  search(query: any) {
    this.queryString = query.query;
    this.pageIndex = 0;
    this.queryData();
  }
  showNewForm() {
    this.formStatus = 'new';
    this.initForm();
  }
  showEditForm(selecedUser: IUser) {
    this.formStatus = 'edit';
    this.gv = 'g';
    this.obj = selecedUser;
    this.obj.branch_id = 1;
    this.initForm();
  }
  queryData() {
    this.service.list(this.queryString, this.numRecords, this.numRecords * this.pageIndex).subscribe(
      (data: IUserObj) => this.objList = data,
      (error) => console.log(error.message)
    );
  }
  showViewForm(selecedUser: IUser) {
    this.gv = 'v';
    this.obj = selecedUser;
    this.obj.branch_id = 1;
    if (this.obj.image_path) {
      this.imagePath = environment.apiBaseUrl1 + this.obj.image_path;
    } else {
      this.imagePath = 'assets/content/avatar.png';
    }
    this.initForm();
  }
  cancelShowForm() {
    this.formStatus = 'list';
    this.gv = 'g';
    this.obj = {} as IUser;
  }
  saveObject(formObj: IUser) {
    if (this.formStatus === 'edit') {
      this.obj = formObj;
      this.obj.updated_by = this._sharedService.getLoginUserId();
      this.obj.updated_date = new Date().toISOString();
      this.service.update(this.obj).subscribe(
      (res: IResponse) => {
        if (res.code === 200) {
          this.formStatus = 'list';
          this.gv = 'g';
          this.obj = {} as IUser;
          this.getObjList();
          this.openSnackBar('User has been updated successfully.', 'Close');
        } else {
          this.openSnackBar(res.message, 'Close');
        }
      },
      (error) => console.log(error)
      );
    } else {
      this.obj = formObj;
      this.obj.created_by = this._sharedService.getLoginUserId();
      this.obj.branch_id = 1;
      this.service.create(this.obj).subscribe(
        (res: IResponse) => {
          if (res.code === 200) {
            this.formStatus = 'list';
            this.gv = 'g';
            this.obj = {} as IUser;
            this.getObjList()
            this.openSnackBar('User has been saved successfully.', 'Close');
          } else {
            this.openSnackBar(res.message, 'Close');
          }
        },
        (error) => console.log(error)
      );
    }
  }
  uploadImage(formObj: IUser) {
    const fileBrowser = this.fileInput.nativeElement;
    const formdata: FormData = new FormData();
    formdata.append('id', String(formObj.id));
    formdata.append('user_id', this._sharedService.getLoginUserId().toString());
    if (fileBrowser.files && fileBrowser.files[0]) {
      formdata.append('user_image', fileBrowser.files[0]);
    } else {
      this.openSnackBar('Please select new photo.', 'Close');
      return;
    }

    this.service.updateImage(formdata).subscribe(
      (res: IResponse) => {
        if (res.code === 200) {
          this.formStatus = 'list';
          this.gv = 'g';
          this.obj = {} as IUser;
          this.getObjList()
          this.openSnackBar('Image profile has been upload successfully.', 'OK')
        } else {
          this.openSnackBar(res.message, 'Close')
        }
      },
      (error) => console.log(error)
    );
  }
  openSnackBar(message: string, action: string) {
    // this.snackBar.open(message, action, {
    //   duration: 2000,
    // });
  }
}
