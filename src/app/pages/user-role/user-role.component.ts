import { Component, OnInit, ViewChild, ElementRef  } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { DateAdapter, MatSnackBar } from '@angular/material';
import { environment } from '../../../environments/environment';
import { TreeviewItem, TreeviewConfig } from 'ngx-treeview';
import { SharedService } from '../../layouts/shared-service';
// import {ConfirmDialogService} from '../../helper/confirm-dialog/confirm-dialog.service';
import {IUserCustom} from '../user/user.model';
import {IuserRoleCustom} from './user-role.model';
import {UserRoleService} from './user-role.service';
import {UserService} from '../user/user.service';
import { consoleTestResultHandler } from 'tslint/lib/test';
import { IResponse } from '../user/user.model';

@Component({
  selector: 'app-user-role',
  templateUrl: './user-role.component.html',
  styleUrls: ['./user-role.component.scss']
})
export class UserRoleComponent implements OnInit {
  pageTitle = 'User Roles';
  f: FormGroup;
  objUserRoleList: IuserRoleCustom[];
  objUserList: IUserCustom[];
  selectedUser = 1;
  srv: string = environment.apiBaseUrl1;
  @ViewChild('fileInput') fileInput: ElementRef;
  config = TreeviewConfig.create({
    hasAllCheckBox: true,
    // hasFilter: true,
    // hasCollapseExpand: true,
    decoupleChildFromParent: false,
    maxHeight: 420
  });
  items: TreeviewItem[];
  values: number[];
  constructor(private service: UserRoleService, private fb: FormBuilder, private _sharedService: SharedService
    // , private dialogService: ConfirmDialogService
    , private userSevice: UserService
    // , private snackBar: MatSnackBar
  ) {
    this._sharedService.emitChange(this.pageTitle);
  }

  ngOnInit() {
    this.getObjList();
    this.items = [];
    this.onUserChange(this.selectedUser);
  }
  initForm(): void {}
  getObjList(): void {
    this.userSevice.get().subscribe(
      (data: IUserCustom[]) => { this.objUserList = data; this.selectedUser = this.objUserList[0].id },
      (error) => console.log(error));
  }
  onUserChange(event: any): void {
    if (event.value !== undefined) {
      this.selectedUser = event.value;
    }
    this.items = [];
    this.service.getRoleByUser(this.selectedUser).subscribe(
      (data: IuserRoleCustom[]) => {
        this.objUserRoleList = data;
        this.objUserRoleList.forEach(Role => {
          const mainsTree = new TreeviewItem({text: Role.role_name, value: Role.id, checked: Role.checked, collapsed: false});
          this.items.push(mainsTree);
        });
      },
      (error) => console.log(error)
    );
  }
  saveAssignForm() {
    if (this.values.length > 0) {
      const user_id = this._sharedService.getLoginUserId();
      this.service.updateRole(this.selectedUser, this.values, user_id).subscribe(
        (res: IResponse) => {
          if (res.code === 200) {
            this.openSnackBar('User role was applied successfully.', 'OK');
          }else {
            this.openSnackBar(res.message, 'Close')
          }
        },
        (error) => console.log(error)
      );
    }
  }
  openSnackBar(message: string, action: string) {
    // this.snackBar.open(message, action, {
    //   duration: 3000,
    // });
  }
}
