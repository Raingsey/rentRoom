import { Component, OnInit } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'app-vertical-navbar',
  templateUrl: 'vertical-navbar.component.html',
  styleUrls: ['vertical-navbar.component.scss'],
  host: {'class': 'vertical-navbar'}
})
export class VerticalNavbarComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
