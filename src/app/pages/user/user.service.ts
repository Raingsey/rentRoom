import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Response } from '@angular/http';
import { environment } from '../../../environments/environment';
import 'rxjs/Rx';
import * as _ from 'lodash';

import { IUser, IUserCustom, IUserObj } from './user.model';
import { AuthenticationService} from '../../_guards/authentication.service';
import { isNullOrUndefined } from 'util';
import { IResponse } from './user.model';

@Injectable()
export class UserService {
  private userUrl = environment.apiBaseUrl1 + '/user';
  constructor(private http: HttpClient, private authenticationService: AuthenticationService) { }
  get() {
    // add authorization header with jwt token
    // let headers = new Headers({ 'Authorization': 'Bearer ' + this.authenticationService.token });
    // let options = new RequestOptions({ headers: headers });

    return this.http.get<IUser[]>(this.userUrl)
      .map(data => _.values(data));
    // .map(data => data.join());
  }
  list(queryString: string, max: number, offset: number) {
    let Params = new HttpParams();
    Params = Params.append('max', max.toString());
    Params = Params.append('offset', offset.toString());
    if (isNullOrUndefined(queryString) || queryString === '') {
      return this.http.get<IUserObj>(this.userUrl + '/list', {params: Params})
    }
    Params = Params.append('query', queryString);
    return this.http.get<IUserObj>(this.userUrl + '/list', {params: Params})
  }
  show(id: number) {
    return this.http.get<IUserCustom>(this.userUrl + '/' + id)
      .map(data => _.values(data));
  }

  update(user: IUser) {
    return this.http.put<IResponse>(this.userUrl + '/' + user.id, user);
  }

  updateImage(data: any) {
    return this.http.post<IResponse>(this.userUrl + '/uploadProfile', data);
  }

  create(user: IUser) {
    return this.http.post<IResponse>(this.userUrl, user);
  }
  // getUsers(): Observable<IUser[]> {
  //   // add authorization header with jwt token
  //   let headers = new Headers({ 'Authorization': 'Bearer ' + this.authenticationService.token });
  //   let options = new RequestOptions({ headers: headers });
  //
  //   // get users from api
  //   return this.http.get('/api/users', options)
  //     .map((response: Response) => response.json());
  // }

}
