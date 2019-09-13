import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import * as moment from 'moment';



@Injectable()
export class SharedService {
    // Observable string sources
    private emitChangeSource = new Subject();
    private emitShowLoading = new Subject();

    // Observable string streams
    changeEmitted$ = this.emitChangeSource.asObservable();
    showLoading$ = this.emitShowLoading.asObservable();

    // Service message commands
    emitChange(change: string) {
        this.emitChangeSource.next(change);
    }

    showLoading(show: boolean) {
        this.emitShowLoading.next(show);
    }

    getLoginUserId() {
        const user = JSON.parse(localStorage.getItem('currentUser'));
        return user.id
        // return 1
    }
    getLoginUserBranch() {
        const user = JSON.parse(localStorage.getItem('currentUser'));
        // return user.id
        return 1
    }

    getBranch() {
        return 1;
    }

    getName(obj: any, fieldSearch: string, valueSearch: any, fieldReturn: string) {
        return obj.find(x => x[fieldSearch] === valueSearch)[fieldReturn];
    }

    dateFilter(date: any): any {
        return  new Date(date).toLocaleDateString();
    }

    dateTimeFilter(date: any): any {
        return  moment(date).format('MM/DD/YYYY HH:mm:ss');
    }
}
