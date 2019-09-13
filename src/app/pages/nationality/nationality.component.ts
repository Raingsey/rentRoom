import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../layouts/shared-service';
import { FormBuilder, Validators } from '@angular/forms';
import { Inationality, InationalityObj } from './nationality.model';
import { NationalityService } from './nationality.service';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/components/common/messageservice';
import {BaseComponent} from '../main/base/base.component';

@Component({
  selector: 'app-nationality',
  templateUrl: './nationality.component.html',
  styleUrls: ['./nationality.component.scss']
})
export class NationalityComponent extends BaseComponent implements OnInit {
    constructor(public share: SharedService, public fb: FormBuilder
        , public service: NationalityService
        , public confirmDialog: ConfirmationService
        , public messageService: MessageService) {
        super();
        this.sharedService = share;
        this.pageName = 'Nationality';
        this.initCols();
  }
  ngOnInit() {
      this.objList = {} as InationalityObj;
      this.obj = {} as Inationality;
      this.getObjList();
  }
  initCols() {
      this.cols = [
          { field: 'nationality', class: 'p40', header: 'Nationality' }
      ];
  }
  initObj() {
      this.obj = {} as Inationality;
  }
  initForm() {
      this.f = this.fb.group({
          id: this.obj.id,
          nationality: [this.obj.nationality, Validators.required]
      });
  }
}
