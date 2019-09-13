import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'page-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss']
})
export class PageConfirmComponent implements OnInit {
  constructor(private router: Router) { }

  ngOnInit() { }

  gotoLogin() {
    this.router.navigate(['/auth/login']);
  }
}
