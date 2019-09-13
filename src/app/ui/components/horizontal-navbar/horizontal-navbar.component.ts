import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';

@Component({
  moduleId: module.id,
  selector: 'app-horizontal-navbar',
  templateUrl: 'horizontal-navbar.component.html',
  styleUrls: ['horizontal-navbar.component.scss'],
  host: {
    '[class.app-navbar]': 'true',
    '[class.show-overlay]': 'showOverlay'
  }
})
export class HorizontalNavbarComponent implements OnInit {
  @Input() title: string;
  @Input() openedSidebar: boolean;
  @Input() compressMenu: boolean;
  @Output() sidebarState = new EventEmitter();
  @Output() compressState = new EventEmitter();
  showOverlay: boolean;
  userName: String;
  imagePath: String;

  constructor(private router: Router) {
    this.openedSidebar = false;
    this.showOverlay = false;
  }

  ngOnInit() {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    this.userName = user.name_eng;
    if (user.image_path) {
      this.imagePath = environment.apiBaseUrl1 + user.image_path;
    }else {
      this.imagePath = 'assets/img/avatar.png';
      // this.imagePath = 'http://192.168.1.199:8080/assets/images/abc.png';
    }
  }

  open(event) {
    const clickedComponent = event.target.closest('.nav-item');
    const items = clickedComponent.parentElement.children;

    event.preventDefault();

    for (let i = 0; i < items.length; i++) {
      items[i].classList.remove('opened');
    }
    clickedComponent.classList.add('opened');

    // Add class 'show-overlay'
    this.showOverlay = true;
  }

  close(event) {
    const clickedComponent = event.target;
    const items = clickedComponent.parentElement.children;

    event.preventDefault();

    for (let i = 0; i < items.length; i++) {
      items[i].classList.remove('opened');
    }

    // Remove class 'show-overlay'
    this.showOverlay = false;
  }

  openSidebar() {
    this.openedSidebar = !this.openedSidebar;
    this.sidebarState.emit();
  }
  compressSidebar() {
    this.compressMenu = !this.compressMenu;
    this.compressState.emit();
  }
  onLogout() {
    localStorage.removeItem('currentUser');
    this.router.navigate(['/auth/login']);
  }
  onChangePassword() {
    this.router.navigate(['/auth/change-password'])
  }
}
