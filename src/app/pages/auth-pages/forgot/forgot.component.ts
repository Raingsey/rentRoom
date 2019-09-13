import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthenticationService} from '../../../_guards/authentication.service';

@Component({
  selector: 'page-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.scss']
})
export class PageForgotComponent implements OnInit {
    f: FormGroup;
    model: any = {};
    loading: boolean;
    hide: boolean;
    error = '';

    constructor(private router: Router, private authenticationService: AuthenticationService,  private fb: FormBuilder) { }

    ngOnInit() {
        this.loading = false;
        this.hide = true;
        // reset login status
        this.authenticationService.logout();
        this.initForm();
    }
    initForm(): void {
        this.f = this.fb.group({
            'email' : [null, Validators.required],
        });
    }

    // ngOnInit() { }

    onSubmit(data: any) {
        this.loading = true;
        this.error = '';
        if (data === null) {
            return
        } else {
            // this.authenticationService.resetpassword(data.email, this.getRandomNumber().toString()).subscribe(
            //     (res: any) => {
            //         const json = JSON.parse(res);
            //         console.log(json.code);
            //         if (json.code === 200) {
            //             this.router.navigate(['/auth/login']);
            //             this.error = 'Please check your email!!.';
            //         } else {
            //             this.error = 'Email is valid!!.';
            //             this.loading = false;
            //         }
            //     },
            //     (err) => {
            //         this.error = 'Server not responding';
            //         console.log(err.message);
            //         this.loading = false;
            //     }
            // )
        }
    }

    getRandomNumber() {
        const random = Math.floor(Math.random() * (999999 - 100000)) + 100000;
        return random;
    }

}
