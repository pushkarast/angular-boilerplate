import { Component, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AdminService } from 'src/app/shared/services/admin-api/admin-api.service';
import { CommonService } from 'src/app/shared/services/common.service';
import { ConfigService } from 'src/app/shared/services/config.service';
import { SpinnerService } from 'src/app/shared/services/spinner.service';
import { NotifierService } from 'src/app/shared/services/toaster.service';
import option from '../../../../assets/constants/ngSelectvalues';
import * as moment from 'moment';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subject, debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-telecall-report',
  templateUrl: './telecall-report.component.html',
  styleUrls: ['./telecall-report.component.css']
})
export class TelecallReportComponent implements OnInit {
  data: any;
  option = option.telefilterOption;
  filterData: FormGroup;
  callData: any;
  modalRef?: BsModalRef;
  modelChanged: Subject<any> = new Subject<any>();
  page = 1;
  searchText = "";
  maticonList = {
    Love: { name: 'favorite', color: "text-red-500" },
    Family: { name: 'people', color: "text-blue-500" },
    Business: { name: 'business', color: "text-purple-500" },
    Financial: { name: 'attach_money', color: "text-green-600" },
  }
  callDisconnetarr = ['NO ANSWER', 'disconnected_by_callee', 'disconnected_by_caller', 'noanswer'];
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
    private _SpinnerService: SpinnerService,
    private modalService: BsModalService,
    private _ActivatedRoute: ActivatedRoute,
    private _ConfigService: ConfigService,
    private _CommonService: CommonService,
    private _FormBuilder: FormBuilder
  ) {
    this.filterData = this._FormBuilder.group({
      from: [this.startDate.setUTCHours(0, 0, 0, 0).valueOf() + this.startDate.getTimezoneOffset() * 1000 * 60],
      to: [this.startDate.setUTCHours(23, 59, 59, 999).valueOf() + this.startDate.getTimezoneOffset() * 1000 * 60],
      filter: ['none'],
      StartDate: [new Date()]
    });
  }
  ngOnInit(): void {
    this.getTeledata();
    this.modelChanged.pipe(debounceTime(300), distinctUntilChanged()).subscribe((val) => {
      this.searchText = val?.search;
      this.getTeledata()
    });
  }
  filter() {
    this.page = 1;
    this.getTeledata();
  }
  getTeledata(id = null) {
    // this._SpinnerService.setState(true);
    this._AdminService.fetchTeleData({
      id: id, page: this.page, search: this.searchText, ...this.filterData.value
    }).then((data) => {
      if (data?.status) {
        if (id) {
          const dataS = data?.data?.data;
          this.callData = {
            ...dataS,
            concerns: dataS?.concerns ? JSON.parse(dataS?.concerns) : null
          }
        }
        else
          this.data = data?.data
      }
      else
        this._NotifierService.showError(data?.message)
    })
  }
  markAsread(id: any = null) {
    this._AdminService.telemarkAsread({ id: id }).then((data) => {
      if (data?.status) {
        this.closeModal();
        this._NotifierService.showSuccess("Marked As read");
      }
      else
        this._NotifierService.showError("Some Error Occurred");
    });
  }
  closeModal() {
    this.modalRef?.hide();
    this.getTeledata()
  }
  choosedDate(event: any) {
    this.filterData
      .get('from')
      ?.setValue(new Date(event?.startDate?.$d).valueOf() + new Date().getTimezoneOffset() * 1000 * 60);
    this.filterData
      .get('to')
      ?.setValue(new Date(event?.endDate?.$d).valueOf() + new Date().getTimezoneOffset() * 1000 * 60);
    this.getTeledata();
  }
  openModal(template: TemplateRef<any>, id: any) {
    // console.log(prevTags, 'prev tagss')
    this.getTeledata(id)
    this.modalRef = this.modalService.show(template);
  }
  onPaginateChange($: any) {
    this.page = $.pageIndex + 1;
    this.getTeledata();
  }
  handleGoto(page) {
    if (!page || page == "")
      this.page = 1;
    else
      this.page = page;
    this.getTeledata();
  }
  search(event) {
    this.page = 1;
    this.modelChanged.next({ search: event.target.value })
    this.getTeledata()
  }
}
