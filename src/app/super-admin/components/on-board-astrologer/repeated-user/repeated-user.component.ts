import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'src/app/shared/services/admin-api/admin-api.service';
import { SpinnerService } from 'src/app/shared/services/spinner.service';
import { Buffer } from 'buffer'
import { Params } from '@angular/router';
import { CommonService } from 'src/app/shared/services/common.service';

@Component({
  selector: 'app-repeated-user',
  templateUrl: './repeated-user.component.html',
  styleUrls: ['./repeated-user.component.css'],
})
export class RepeatedUserComponent {
  page = 1;
  astroId: any;
  prof: any;
  permission: any;
  custList: any;
  constructor(
    private _AdminService: AdminService,
    private _SpinnerService: SpinnerService,
    private _ActivatedRoute: ActivatedRoute,
    private router: Router,
    private _CommonService: CommonService

  ) { }
  onPaginateChange($: any) {
    this.page = $.pageIndex + 1;
    this.fetchCustomer();
  }
  ngOnInit(): void {
    this._ActivatedRoute.queryParams.subscribe((params) => {
      this.astroId = params['astroid'];
      this.prof = params['prof'];
      if (params['permit'])
        this.permission = Buffer.from(params['permit'], 'base64').toString(
          'ascii'
        );
    });
    this.fetchCustomer();
  }
  fetchCustomer() {
    this._SpinnerService.setState(true);
    this._AdminService
      .getRepeatedcust({
        astroid: this.astroId,
        page: this.page,
      })
      .then((data) => {
        if (data?.status) {
          this.custList = data?.data;
          this._SpinnerService.setState(false);
        }
      });
  }

  redirectToCustomerProfile(id: any) {
    const queryParams: Params = { type: `profile`, id: id };

    this.router.navigate(
      [`/superAdmin/mng-customers/customer-view/customer-profile`],
      {
        relativeTo: this._ActivatedRoute,
        queryParams,
        // queryParamsHandling: 'merge', // remove to replace all query params by provided
      });
  }
  isAdmin() {
    return this._CommonService.checkUserType()?.userType != 'admin'
  }
  hideNumber(string: any) {
    if (this._CommonService.checkUserType()?.userType != 'admin')
      return this._CommonService.hideMobile(string);
    return string;
  }
}
