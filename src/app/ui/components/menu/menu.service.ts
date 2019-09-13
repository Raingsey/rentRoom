import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Global } from '../../../helper/global';
import 'rxjs/Rx';
import * as _ from 'lodash';


import { IMenuItem } from './menu-item';
import {AuthenticationService} from '../../../_guards/authentication.service';

@Injectable()
export class MenuService {
  private menuUrl =  environment.apiBaseUrl1 + '/users/getMenuItem/';
  constructor(private http: HttpClient, private auth: AuthenticationService, private gb: Global) {
  }
  getMenuItems() {
    // console.log('token inside menu service: ' + this.auth.getToken());
  // , {headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.auth.getToken())}
    return this.http.get<IMenuItem[]>(this.menuUrl)
      .map(data => _.values(data));
  }
  getMenuItems1(user_id: number) {
    console.log('user ' + user_id)
    // console.log('token inside menu service: ' + this.auth.getToken());
    // , {headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.auth.getToken())}
    return this.http.post<IMenuItem[]>(this.menuUrl , {user_id: user_id} )
      .map(data => _.values(data));
  }
}

