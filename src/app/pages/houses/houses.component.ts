import { Component, OnInit } from '@angular/core';
import {BaseComponent} from '../main/base/base.component';
import {Houses, HousesObj, HouseType, Owner, UserFiller} from './houses.model';
import {SharedService} from '../../layouts/shared-service';
import {FormBuilder, Validators} from '@angular/forms';
import {HousesService} from '../houses/houses.service';
import {MessageService} from 'primeng/components/common/messageservice';
import {Gender, User} from '../users/users.model';

@Component({
  selector: 'app-houses',
  templateUrl: './houses.component.html',
  styleUrls: ['./houses.component.scss']
})
export class HousesComponent extends BaseComponent implements OnInit {
  filter = {} as UserFiller;
  objOwnerList = [] as Owner[];
  objHouseTypeList = [] as HouseType[];
  numRecords = 15;
  pageIndex = 0;
  queryString: string;
  /// objList = [] as Houses[];
  constructor(public share: SharedService
            , public fb: FormBuilder
            , public service: HousesService
            , public messageService: MessageService) {
    super();
    this.initCols();
    // this.pageTitle('House');
  }

  ngOnInit() {
    this.objList = {} as HousesObj;
    this.obj = {} as Houses;
    this.queryData();
  }
  initCols() {
    this.cols = [
      { field: 'house_name', header: 'House' },
      { field: 'owner.name_eng', header: 'Owner'},
      { field: 'rent_type.name', header: 'House type'},
      { field: 'note', header: 'Note' },
      { field: 'province.province', header: 'Province' },
      { field: 'district.district', header: 'District' },
      { field: 'commune.commune', header: 'Commune' },
      { field: 'village.village', header: 'Village' }
    ];
  }

  showDetailForm(obj: any) {
    this.formStatus = 'detail';
    // this.pageTitle( this.pageName + ' detail');
    this.obj = obj;
    console.log(obj);
  }

  initObj() {
    this.obj = {} as Houses;
  }
  getOnwer() {
    this.service.get('/users/list').subscribe(
        (data: Owner[]) => {
          this.objOwnerList = data;
        },
        (error) => this.onErrorHandler(error)
    );
  }
  getHouseType() {
    this.service.get('/rentType').subscribe(
        (data: HouseType[]) => {
          this.objHouseTypeList = data;
        },
        (error) => this.onErrorHandler(error)
    );
  }
  queryData() {
    this.stopLoading = false;
    // this.filter.user_id = this.sharedService.getLoginUserId();
    this.service.list(this.queryString, this.numRecords, this.numRecords * this.pageIndex).subscribe(
        (data: HousesObj) => {
          this.objList = data;
          this.stopLoading = true;
          this.isNullShow = true;
        },
        (error) => this.onErrorHandler(error)
    );
  }
  initForm(): void {
    if (this.formStatus === 'new') {
      this.f = this.fb.group({
        house_name: [this.obj.house_name, Validators.required],
        owner: this.obj.owner,
        house_type: this.obj.house_type,
        // username: [this.obj.username , Validators.required],
        // email: [this.obj.email, Validators.required],
        // password: [this.obj.password, Validators.required],
        // dob: this.obj.dob,
        // gender: this.obj.gender,
        //  status: this.obj.status,
      });
    }
    // else {
    //   this.f = this.fb.group({
    //     id: this.obj.id,
    //     name_eng: [this.obj.name_eng, Validators.required],
    //     name_kh: [this.obj.name_kh, Validators.required],
    //     username: [this.obj.username , Validators.required],
    //     // contact: this.obj.contact,
    //     email: [this.obj.email, Validators.required],
    //     dob: this.obj.dob,
    //     gender: this.obj.gender,
    //     status: this.obj.status,
    //   });
      // this.initMerchantUserAccessEditForm();
      this.formChangedWatcher();
    }
  // }
  cancelShowForm() {
    this.formStatus = 'list';
    this.obj = {} as Houses;
    this.queryData();
  }
}
