import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from 'src/app/shared/services/admin-api/admin-api.service';
import { NotifierService } from 'src/app/shared/services/toaster.service';
import * as moment from 'moment';
import { Subject, debounceTime, distinctUntilChanged } from 'rxjs';
import { SpinnerService } from 'src/app/shared/services/spinner.service';
import * as XLSX from 'xlsx';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CommonService } from 'src/app/shared/services/common.service';
import { ActivatedRoute } from '@angular/router';
import { Buffer } from 'buffer';
@Component({
  selector: 'app-customer-activity',
  templateUrl: './customer-activity.component.html',
  styleUrls: ['./customer-activity.component.css']
})
export class CustomerActivityComponent {
  activityList: any = [];
  acitiviyData: FormGroup
  constructor(
    private _AdminService: AdminService,
    private _NotifierService: NotifierService,
    private _FormBuilder: FormBuilder,
    private _SpinnerService: SpinnerService,
    private modalService: BsModalService,
    private _ActivatedRoute: ActivatedRoute,
    private _CommonService: CommonService
  ) {
    this.acitiviyData = this._FormBuilder.group({
      CustomerId: null,
      page: 1,
    })
  }

  ngOnInit(): void {
    // console.log(this.callLogList, 'test...')
    this._ActivatedRoute.queryParams.subscribe(params => {
      this.acitiviyData.get('CustomerId')?.setValue(params["id"])
    })
    this.getUserActivityData();
  }

  getUserActivityData() {
    this._AdminService
      .userAnalytics(this.acitiviyData.value)
      .then((data) => {
        if (data?.status) {
          this.activityList = data?.data
        }
      });
  }

  onPaginateChange($: any) {
    this.acitiviyData.get('page')?.setValue($.pageIndex + 1)
    this.getUserActivityData();
  }
}
