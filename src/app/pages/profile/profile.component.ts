import { Component, OnInit } from '@angular/core';
import {ProfileService} from './profile.service';
import { SharedService } from '../../layouts/shared-service';
import { FormBuilder, Validators } from '@angular/forms';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/components/common/messageservice';
import {Iprofile, IprofileObj} from './profile.model';
import {BaseComponent} from '../main/base/base.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent extends  BaseComponent implements  OnInit {
  constructor(public share: SharedService, public fb: FormBuilder
      , public service: ProfileService
      , public confirmDialog: ConfirmationService
      , public messageService: MessageService) {
    super();
    this.sharedService = share;
    this.pageName = 'Profile';
    this.initCols();
  }
  ngOnInit() {
    this.objList = {} as IprofileObj;
    this.obj = {} as Iprofile;
    this.getObjList();
  }
  initCols() {
    this.cols = [
      { field: 'product', header: 'Product' },
      { field: 'price', header: 'Price' },
      { field: 'description', header: 'Description'}
    ];
  }
  initObj() {
    this.obj = {} as Iprofile;
  }
  initForm() {
    this.f = this.fb.group({
      id: this.obj.id,
      product: [this.obj.product, Validators.required],
      price: [this.obj.price, Validators.required],
      description: [this.obj.description, Validators.required]
    });
  }

}
