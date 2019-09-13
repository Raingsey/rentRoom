import { Component, OnInit } from '@angular/core';
import {BaseComponent} from '../main/base/base.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {TreeviewItem, TreeviewConfig, DownlineTreeviewItem} from 'ngx-treeview';
import { SharedService } from '../../layouts/shared-service';
import { IRole, IRoleObj } from './role.model';
import { RoleService } from './role.service';
import {Imenu} from './role-menu.model';
// import {ConfirmDialogService} from '../../helper/confirm-dialog/confirm-dialog.service';
// import { MatSnackBar } from '@angular/material';
import { IResponse } from '../user/user.model';
import {baseBuildCommandOptions} from '@angular/cli/commands/build';
import {Role} from '../user-role/user-role.model';
import {Gender} from '../users/users.model';
import {User} from '../model/user.model';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss']
})

export class RoleComponent extends BaseComponent implements OnInit {
  f: FormGroup;
  formStatus = 'list';
  objList = {} as IRoleObj;
  objMenuItem: Imenu[];
  obj = {} as IRole;
  objRoleList = [] as Role[];
  objUsersList = [] as User[];
  selectedFiles: FileList;
  selectedRole = 1;
  config = TreeviewConfig.create({
    hasAllCheckBox: true,
    // hasFilter: true,
    hasCollapseExpand: true,
    decoupleChildFromParent: false,
    maxHeight: 420
  });
  items: TreeviewItem[];
  values: number[];
  fs: FormGroup;
  queryString: string;
  numRecords = 15;
  pageIndex = 0;
  stopLoading: any;
  constructor(public service: RoleService, public fb: FormBuilder, public _sharedService: SharedService,
              // private dialogService: ConfirmDialogService,
              private fsb: FormBuilder,
              // private snackBar: MatSnackBar
              ) {
    super();
  }

  ngOnInit() {
    this.getObjList();
    this.initFormSearch();
    this.initCols();
    this.items = [];
  }
  initForm(): void {
    this.selectedFiles = {} as FileList;
    this.f = this.fb.group({
      'id' : this.obj.id,
      'role_name' : [this.obj.role_name, Validators.required],
      'description' : [this.obj.description]
    });
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
  search(query: any) {
    this.queryString = query.query;
    this.pageIndex = 0;
    this.queryData();
  }
  pageEvent(event) {
    this.numRecords = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.queryData();
  }
  queryData() {
    this.stopLoading = false;
    this.service.list(this.queryString, this.numRecords, this.numRecords * this.pageIndex).subscribe(
      (data: IRoleObj) => {
        this.objList = data;
        this.stopLoading = true;
        this.isNullShow = true;
        },
      (error) => console.log(error.message)
    );
  }

  initCols() {
    this.cols = [
      { field: 'role_name', header: 'Role Name' },
      { field: 'description', header: 'Description' }
    ];
  }
  onRoleChange(event: any): void {
    if (event.value !== undefined) {
      this.selectedRole = event.value;
    }
    this.items = [];
    this.service.getMainMenu(this.selectedRole).subscribe(
      (data: Imenu[]) => {
        this.objMenuItem = data;
        // add main tree
        this.objMenuItem.forEach(RM => {
          // add sub tree
          let objSubTree: Imenu[];
          // console.log(this.objMenuItem);
          this.service.getSubMenu(this.selectedRole, RM.value).subscribe(
            (dataSub: Imenu[]) => {
              objSubTree = dataSub;
              if (objSubTree.length > 0) {
                const mainsTree = new TreeviewItem({text: RM.text, value: RM.value, checked: RM.checked,
                  collapsed: false, children: [{text: 'Salad', value: 21}]});
                objSubTree.forEach(RMSub => {
                  mainsTree.children.push(new TreeviewItem({ text: RMSub.text, value: RMSub.value, checked: RMSub.checked }));
                });
                mainsTree.children.splice(0, 1);
                mainsTree.correctChecked();
                this.items.push(mainsTree);
              } else {
                const mainsTree = new TreeviewItem({text: RM.text, value: RM.value, checked: RM.checked, collapsed: false});
                this.items.push(mainsTree);
              }
            });
        });
      },
      (error) => console.log(error)
    );
  }
  onSelectedChange(downlineItems: DownlineTreeviewItem[]) {
    console.log('Change');
  }
    showNewForm() {
    this.formStatus = 'new';
    this.initForm();
  }
  showAssignForm(obj: IRole) {
    this.formStatus = 'assign';
    this.selectedRole = obj.id;
    this.onRoleChange(this.selectedRole);
    this.initForm();
  }
  cancelShowForm() {
    this.formStatus = 'list';
    this.obj = {} as IRole;
  }
  showEditForm(selectedObj: IRole) {
    this.formStatus = 'edit';
    this.obj = selectedObj;
    this.initForm();
  }
  saveObject(formObj: IRole) {
    this.obj = formObj;
    if (this.formStatus === 'edit') {
      this.obj.updated_by = this._sharedService.getLoginUserId();
      this.obj.updated_date = new Date().toISOString();
      this.service.update(formObj.id, this.obj).subscribe(
        (response) => {
          this.formStatus = 'list';
          this.obj = {} as IRole;
          this.getObjList()
          this.openSnackBar('Role was updated successfully.', 'OK')
        },
        (error) => console.log(error)
      );
    } else {
      this.obj.created_by = this._sharedService.getLoginUserId()
      this.service.create(this.obj).subscribe(
        (response) => {
          this.formStatus = 'list'; this.formStatus = 'list';
          this.obj = {} as IRole;
          this.getObjList()
          this.openSnackBar('Role was created successfully.', 'OK')
        },
        (error) => console.log(error)
      );
    }
  }
  saveAssignForm() {
    if (this.values.length > 0) {
      const user_id = this._sharedService.getLoginUserId();
      this.service.updatePermission(this.selectedRole, this.values, user_id).subscribe(
        (res: IResponse) => {
          if (res.code === 200) {
            // this.dialogService
            //   .confirm('Apply permission', 'Permission was applied. Do you want to assign another role?')
            //   .subscribe(resp => {
            //     if (resp) {
            //     } else {
            //       this.formStatus = 'list'
            //     }
            //   })
          } else {
            this.openSnackBar(res.message, 'Close');
          }
        },
        (error) => console.log(error)
      );
    }
  }
  openSnackBar(message: string, action: string) {
    // this.snackBar.open(message, action, {
    //   duration: 2000,
    // });
  }
}
