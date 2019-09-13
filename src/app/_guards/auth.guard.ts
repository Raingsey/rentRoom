import { Injectable } from '@angular/core';
import {Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, ActivatedRoute} from '@angular/router';
import {AuthenticationService} from './authentication.service';
// import { tokenNotExpired } from 'angular2-jwt';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    const params: any = this.activatedRoute.snapshot.params;
    console.log(params.id);
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    // console.log('get user login' + localStorage.getItem('currentUser'));
    const url = window.location.href;
     if (url.includes('?q=changePass') === true) {
       this.router.navigate(['/auth/change-password']);
       return false;
     }
    if (localStorage.getItem('currentUser')) {
      return true
    }
    this.router.navigate(['/auth/login']);
    return false;
  }
}
