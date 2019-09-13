import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import 'rxjs/Rx';
import * as _ from 'lodash';
import {ICreditTerm} from './credit-term.model';

@Injectable()
export class CreditTermService {
    private baseUrl = environment.apiBaseUrl1 + '/creditterm';

    constructor(private http: HttpClient) { }

    get() {
      return this.http.get<ICreditTerm[]>(this.baseUrl).map((data) => _.values(data))
    }

}
