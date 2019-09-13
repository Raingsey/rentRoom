import { Component, OnInit } from '@angular/core';
import { IMenuItem } from './menu-item';
import { MenuService } from './menu.service';

@Component({
  moduleId: module.id,
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  providers: [MenuService],
  host: {
    'class': 'app-menu'
  }
})
export class MenuComponent implements OnInit {
  menuItems: IMenuItem[];

  constructor( private menuService: MenuService ) { }

  getMenuItems(): void {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    console.log(user.id)
    this.menuService.getMenuItems1(user.id).subscribe(
      (menus: IMenuItem[]) => {
        this.menuItems = menus;
        console.log('Menu item');
        console.log(this.menuItems);
        console.log('Type of ********************************************');
        console.log(typeof this.menuItems);
        },
      (error) => console.log(error)
    );
  }

  getLiClasses(item: any, isActive: any) {
    return {
      'has-sub': item.sub,
      'active': item.active || isActive,
      'menu-item-group': item.groupTitle,
      'disabled': item.disabled
    };
  }
  getStyles(item: any) {
    return {
      'background': item.icon_bg,
      'color': item.icon_color
    };
  }

  ngOnInit(): void {
    this.getMenuItems();
  }

  toggle(event: Event, item: any, el: any) {
    event.preventDefault();

    const items: any[] = el.menuItems;

    if (item.active) {
      item.active = false;
    } else {
      for (let i = 0; i < items.length; i++) {
        items[i].active = false;
      }
      item.active = true;
    }
  }
}
