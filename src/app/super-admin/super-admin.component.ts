import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { Sidenav, Carousel, Dropdown, initTE, Ripple } from 'tw-elements';
import { Buffer } from 'buffer';
@Component({
  selector: 'app-super-admin',
  templateUrl: './super-admin.component.html',
  styleUrls: ['./super-admin.component.css']
})
export class SuperAdminComponent {
  items = ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5'];
  expandedIndex = 0;
  faChevronUp = faChevronUp
  faChevropDown = faChevronDown
  permissions: any = {};
  type: any;
  userType: any;
  constructor(private router: Router) { }

  checkPermission(permissionFor: any) {
    if (this.userType == 'admin')
      return true;

    if (this.permissions.items) {
      for (let element of this.permissions?.items) {
        if (element.permissionfor == permissionFor)
          return true;
      }
    }
    return false;
  }

  getPermission(permissionFor: any) {
    if (this.permissions.items) {
      for (let element of this.permissions?.items) {
        if (element.permissionfor == permissionFor)
          return Buffer?.from(JSON.stringify(element.permissions)).toString('base64');
      }
    }
    return "";
  }
  ngOnInit() {
    initTE({ Carousel, Dropdown, Sidenav, Ripple });
    if (localStorage.getItem('_ty_'))
      this.userType = Buffer.from(localStorage.getItem('_ty_') || '{}', 'base64').toString('ascii');
    if (this.userType != "admin" && localStorage.getItem('_p_'))
      this.permissions = JSON.parse(Buffer.from(localStorage.getItem('_p_') || '{}', 'base64').toString('ascii'));
    if (localStorage.getItem('_t_'))
      this.type = Buffer.from(localStorage.getItem('_t_') || '{}', 'base64').toString('ascii');
  }

  logout() {
    localStorage.clear()
    this.router.navigate(['/'])
  }

}
