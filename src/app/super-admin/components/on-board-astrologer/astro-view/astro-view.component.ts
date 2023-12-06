import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from 'src/app/shared/services/admin-api/admin-api.service';
import { CommonService } from 'src/app/shared/services/common.service';
import { SpinnerService } from 'src/app/shared/services/spinner.service';

@Component({
  selector: 'app-astro-view',
  templateUrl: './astro-view.component.html',
  styleUrls: ['./astro-view.component.css'],
})
export class AstroViewComponent implements OnInit {
  selectedTab = 1;
  astroid: any;
  astroData: any;
  onlineData: any;
  earnings: any;
  startDate = new Date();
  constructor(
    private _ActivatedRoute: ActivatedRoute,
    private _AdminService: AdminService,
    private _SpinnerService: SpinnerService,
    private _CommonService: CommonService
  ) { }
  ngOnInit(): void {
    this._ActivatedRoute.queryParams.subscribe((params) => {
      this.astroid = params['astroid'];
    });
    this.setTabOption(1);
    this.fetchAstrodata();
  }
  setTabOption(selectedOption: any) {
    this.selectedTab = selectedOption;
  }
  fetchAstrodata() {
    this._SpinnerService.setState(true);
    const sendData = {
      AstroId: this.astroid,
      from: this.startDate.setUTCHours(0, 0, 0, 0).valueOf() + new Date().getTimezoneOffset() * 1000 * 60,
      to: this.startDate.setUTCHours(23, 59, 59, 999).valueOf() + new Date().getTimezoneOffset() * 1000 * 60
    }
    this._AdminService
      .getAstrodetail(sendData)
      .then((data) => {
        if (data?.status) {
          this.astroData = data?.data?.astroData;
          this.onlineData = data?.data?.onlineStatus;
          this.earnings = data?.data;
        }
      });
    this._SpinnerService.setState(false);
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
