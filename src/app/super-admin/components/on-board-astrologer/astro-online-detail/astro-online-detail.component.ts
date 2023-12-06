import { Component } from '@angular/core';
import { AdminService } from 'src/app/shared/services/admin-api/admin-api.service';
import { NotifierService } from 'src/app/shared/services/toaster.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SpinnerService } from 'src/app/shared/services/spinner.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import option from '../../../../../assets/constants/ngSelectvalues'

@Component({
  selector: 'app-astro-online-detail',
  templateUrl: './astro-online-detail.component.html',
  styleUrls: ['./astro-online-detail.component.css']
})
export class AstroOnlineDetailComponent {
  resultList: any = [];
  onlineData: FormGroup
  filter = option.onlineModeType
  ranges: any = {
    Today: [new Date(), new Date()],
    Yesterday: [
      moment().utc().subtract(1, 'days'),
      moment().subtract(1, 'days').local(),
    ],
    'Last 7 Days': [moment().utc().subtract(6, 'days'), moment()],
    'Last 30 Days': [moment().utc().subtract(29, 'days'), moment()],
    'This Month': [
      moment().utc().startOf('month'),
      moment().utc().endOf('month'),
    ],
    'Last Month': [
      moment().utc().subtract(1, 'month').startOf('month'),
      moment().utc().subtract(1, 'month').endOf('month'),
    ],
  };
  invalidDates: moment.Moment[] = [
    moment().add(2, 'days'),
    moment().add(3, 'days'),
    moment().add(5, 'days'),
  ];
  isInvalidDate = (m: moment.Moment) => {
    return this.invalidDates.some((d) => d.isSame(m, 'day'));
  };
  startDate = new Date();
  selected: any = { start: this.startDate, end: this.startDate };

  constructor(
    private _AdminService: AdminService,
    private _NotifierService: NotifierService,
    private _FormBuilder: FormBuilder,
    private _SpinnerService: SpinnerService,
    private modalService: BsModalService,
    private _ActivatedRoute: ActivatedRoute
  ) {
    this.onlineData = this._FormBuilder.group({
      astroId: null,
      search: '',
      page: 1,
      mode: null,
      from: [this.startDate.setUTCHours(0, 0, 0, 0).valueOf()+this.startDate.getTimezoneOffset()*1000*60],
      to: [this.startDate.setUTCHours(23, 59, 59, 999).valueOf()+this.startDate.getTimezoneOffset()*1000*60],

    });
  }

  ngOnInit(): void {
    this._ActivatedRoute.queryParams.subscribe((params) => {
      this.onlineData.get('astroId')?.setValue(params['astroid']);
    });
    this.getOnlineDetailData();
  }


  getOnlineDetailData() {
    this._AdminService.getAstrologerOnlineDetail(this.onlineData.value).then((data) => {
      if (data?.status) {
        this._SpinnerService.setState(false);
        this.resultList = data?.data;
      } 
    });
  }

  onPaginateChange($: any) {
    this.onlineData.get('page')?.setValue($.pageIndex + 1);
    this.getOnlineDetailData();
  }

  choosedDate(event: any) {
    this.onlineData
      .get('from')
      ?.setValue(new Date(event?.startDate?.$d).valueOf() +new Date(event?.startDate?.$d).getTimezoneOffset()*1000*60);
    this.onlineData
      .get('to')
      ?.setValue(new Date(event?.endDate?.$d).valueOf() +new Date(event?.endDate?.$d).getTimezoneOffset()*1000*60);
    this.getOnlineDetailData();
  }
}
