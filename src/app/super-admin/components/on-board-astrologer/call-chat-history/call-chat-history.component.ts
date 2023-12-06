import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from 'src/app/shared/services/admin-api/admin-api.service';
import { NotifierService } from 'src/app/shared/services/toaster.service';
import * as moment from 'moment';
import { Subject, debounceTime, distinctUntilChanged } from 'rxjs';
import option from '../../../../../assets/constants/ngSelectvalues';
import { SpinnerService } from 'src/app/shared/services/spinner.service';
import * as XLSX from 'xlsx';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ActivatedRoute } from '@angular/router';
import { CommonService } from 'src/app/shared/services/common.service';
@Component({
  selector: 'app-call-chat-history',
  templateUrl: './call-chat-history.component.html',
  styleUrls: ['./call-chat-history.component.css'],
})
export class CallChatHistoryComponent {
  modelChanged: Subject<any> = new Subject<any>();
  getCallData: FormGroup;
  modalData: any = [];
  callHistoryList: any = [];
  isSubmitted: boolean = false;
  moment: any = moment;
  page: number = 1;
  selectedCar: number = 0;
  // selected: any;
  alwaysShowCalendars: boolean;
  option = option.callchatoption;
  filter = option.astroProfilefilter;
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
  modalRef?: BsModalRef;

  constructor(
    private _AdminService: AdminService,
    private _NotifierService: NotifierService,
    private _FormBuilder: FormBuilder,
    private _SpinnerService: SpinnerService,
    private modalService: BsModalService,
    private _ActivatedRoute: ActivatedRoute,
    private _CommonService:CommonService
  ) {
    this.alwaysShowCalendars = true;
    this.getCallData = this._FormBuilder.group({
      from: [this.startDate.setUTCHours(0, 0, 0, 0).valueOf() + this.startDate.getTimezoneOffset() * 1000 * 60],
      to: [this.startDate.setUTCHours(23, 59, 59, 999).valueOf() + this.startDate.getTimezoneOffset() * 1000 * 60],
      status: ['none'],
      type: ['all'],
      page: this.page,
      search: [''],
      sfilter: ['mobile'],
      StartDate: [new Date(), Validators.required],
      astroId: [''],
    });
  }

  ngOnInit(): void {
    this._ActivatedRoute.queryParams.subscribe((params) => {
      this.getCallData.get('astroId')?.setValue(params['astroid']);
    });
    this.modelChanged
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe((val) => {
        this.getCallData.get('search')?.setValue(val?.search);
        this.getCallReport();
      });
    this.getCallReport();
  }

  getCallReport() {
    this._SpinnerService.setState(true);
    this._AdminService.callChatReport(this.getCallData.value).then((data) => {
      if (data?.status) {
        this._SpinnerService.setState(false);
        this.callHistoryList = data?.data;
      } else {
        this._SpinnerService.setState(false);
        if (data?.data?.error && data?.data?.error == 'ERR:0001')
          this._NotifierService.showError(
            'Trying to fetch data more than a year'
          );
        if (data?.data?.error && data?.data?.error == 'ERR:0004')
          this._NotifierService.showError('No Data Found !');
        else this._NotifierService.showError('Some Error Occurred');
      }
    });
  }
  getMinutes(seconds: any) {
    let date = new Date();
    date.setSeconds(seconds);
    let hhmmssFormat = date.toISOString().substr(11, 8);
    return hhmmssFormat;
  }
  choosedDate(event: any) {
    this.getCallData
      .get('from')
      ?.setValue(new Date(event?.startDate?.$d).valueOf() + new Date(event?.startDate?.$d).getTimezoneOffset() * 1000 * 60);
    this.getCallData
      .get('to')
      ?.setValue(new Date(event?.endDate?.$d).valueOf() + new Date(event?.endDate?.$d).getTimezoneOffset() * 1000 * 60);
    this.getCallReport();
  }
  search(event: any) {
    this.modelChanged.next({ search: event.target.value });
  }
  onPaginateChange($: any) {
    this.getCallData.get('page')?.setValue($.pageIndex + 1);
    this.getCallReport();
  }
  exportexcel(): void {
    /* pass here the table id */
    let fileName = 'Call History Report.xlsx';
    this._SpinnerService.setState(true);
    this.getCallData.get('page')?.setValue(null);
    this._AdminService.callChatReport(this.getCallData.value).then((data) => {
      if (data?.status) {
        let exceldata: any = [];
        for (let callChat of data?.data?.callchatData) {
          exceldata.push({
            CALL_DATE: moment(callChat?.order?.orderInitiate).format(
              'DD/MM/YYYY'
            ),
            CALL_TIME: moment(callChat?.order?.orderInitiate).format('hh:mm A'),
            CALL_ID: callChat?.order?.id,
            CALL_TYPE: callChat?.order?.orderType,
            CUSTOMER_NAME:
              callChat?.customerInfo?.firstname +
              ' ' +
              callChat?.customerInfo?.lastname,
            MOBILE: callChat?.customerInfo?.mobileno,
            ASTROLOGER_NAME: callChat?.astroname,
            CALL_STATUS: callChat?.order?.orderStatus,
            CALL_RATE: callChat?.charges?.astroRate,
            CALL_DURATION: callChat?.order?.orderDuration,
            TOTAL_CHARGES: callChat?.charges?.totalCharges,
            COMPANY_SHARE: callChat?.charges?.compAmt,
            ASTROLOGER_SHARE: callChat?.charges?.astroAmt,
            PG_PERCENTAGE: callChat?.charges?.pgPer,
            PG_AMOUNT: callChat?.charges?.pgAmt,
            TDS_PERCENTAGE: callChat?.charges?.TDSPer,
            TDS_AMOUNT: callChat?.charges?.TDSAmt,
            ASTROLOGER_NET_SHARE: callChat?.charges?.astroTotalAmt,
            REMARKS: callChat?.order?.remarks
              ? callChat?.order?.remarks
              : 'No Remarks',
            RECORDING_URL: callChat?.order?.recordinURL
              ? callChat?.order?.recordinURL
              : 'No URL Available',
          });
        }
        const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(exceldata);

        /* generate workbook and add the worksheet */
        const wb: XLSX.WorkBook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Call History Data');
        /* save to file */
        XLSX.writeFile(wb, fileName);
        this._SpinnerService.setState(false);
      } else this._NotifierService.showError('Some Error Occurred!');
    });
  }
  onRightClick(template: TemplateRef<any>, orderId: any) {
    this.modalRef = this.modalService.show(template);
    for (let data of this.callHistoryList?.callchatData) {
      if (data?.order?.id == orderId) {
        this.modalData = data;
        break;
      }
    }
    return false;
  }
  hideNumber(string: any) {
    if (this._CommonService.checkUserType()?.userType != 'admin')
      return this._CommonService.hideMobile(string);
    return string;
  }
  isAdmin() {
    return this._CommonService.checkUserType()?.userType != 'admin'
  }
}
