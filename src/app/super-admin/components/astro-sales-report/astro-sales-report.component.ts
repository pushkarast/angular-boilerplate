import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from 'src/app/shared/services/admin-api/admin-api.service';
import { NotifierService } from 'src/app/shared/services/toaster.service';
import * as moment from 'moment';
import { Subject, debounceTime, distinctUntilChanged } from 'rxjs';
import option from '../../../../assets/constants/ngSelectvalues';
import { SpinnerService } from 'src/app/shared/services/spinner.service';
import * as XLSX from 'xlsx';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CommonService } from 'src/app/shared/services/common.service';
import { ActivatedRoute } from '@angular/router';
import { Buffer } from 'buffer';

@Component({
  selector: 'app-astro-sales-report',
  templateUrl: './astro-sales-report.component.html',
  styleUrls: ['./astro-sales-report.component.css']
})
export class AstroSalesReportComponent {
  modelChanged: Subject<any> = new Subject<any>();
  salesReportData: FormGroup;
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
  page: number = 1;
  salesReportList: any = [];

  constructor(
    private _AdminService: AdminService,
    private _NotifierService: NotifierService,
    private _FormBuilder: FormBuilder,
    private _SpinnerService: SpinnerService,
    private modalService: BsModalService,
    private _ActivatedRoute: ActivatedRoute,
    private _CommonService: CommonService
  ) {
    this.salesReportData = this._FormBuilder.group({
      from: [this.startDate.setUTCHours(0, 0, 0, 0).valueOf() + new Date().getTimezoneOffset() * 1000 * 60],
      to: [this.startDate.setUTCHours(23, 59, 59, 999).valueOf() + new Date().getTimezoneOffset() * 1000 * 60],
      page: this.page,
      search: [''],
      StartDate: [new Date(), Validators.required],
    });
  }

  ngOnInit(): void {
    this.modelChanged
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe((val) => {
        this.salesReportData.get('search')?.setValue(val?.search);
        this.getSalesReport();
      });
    this.getSalesReport();
  }

  search(event: any) {
    this.modelChanged.next({ search: event.target.value });
  }

  getSalesReport() {
    this._SpinnerService.setState(true);
    this._AdminService.astrologerSalesReport(this.salesReportData.value)
    .then((data) => {
        if (data?.status) {
          this._SpinnerService.setState(false);
          this.salesReportList = data?.data;
        } 
      });
  }

  choosedDate(event: any) {
    this.salesReportData
      .get('from')
      ?.setValue(new Date(event?.startDate?.$d).valueOf() + new Date().getTimezoneOffset() * 1000 * 60);
    this.salesReportData
      .get('to')
      ?.setValue(new Date(event?.endDate?.$d).valueOf() + new Date().getTimezoneOffset() * 1000 * 60);
    this.getSalesReport();
  }

  onPaginateChange($: any) {
    this.salesReportData.get('page')?.setValue($.pageIndex + 1);
    this.getSalesReport();
  }
  exportexcel(): void {
    /* pass here the table id */
    let fileName = 'Astro Sales Report.xlsx';
    this._SpinnerService.setState(true);
    this.salesReportData.get('page')?.setValue(null);
    this._AdminService.astrologerSalesReport(this.salesReportData.value).then((data) => {
      if (data?.status) {
        let exceldata: any = [];
        for (let item of data?.data?.orderDetails) {
          exceldata.push({
            Astrologer_Name: item?.fullname,
            Astrologer_MobileNo: item?.mobileno,
            Astrologer_EmailId: item?.emailid,
            Promotional_free_calls: item?.orderCounts?.promotional_call,
            repeat_promotional_call1: item?.orderCounts?.paid_promotional_call1,
            repeat_promotional_call2: item?.orderCounts?.paid_promotional_call2,
            Promotional_free_chats: item?.orderCounts?.promotional_chat_count,
            repeat_promotional_chat1: item?.orderCounts?.paid_promotional_chat1,
            repeat_promotional_chat2: item?.orderCounts?.paid_promotional_chat2,
            po_call_set1: item?.orderCounts?.po_set1_call,
            po_call_set2: item?.orderCounts?.po_set2_call,
            po_call_set3: item?.orderCounts?.po_set3_call,
            po_call_set4: item?.orderCounts?.po_set4_call,
            po_chat_set1: item?.orderCounts?.po_set1_chat,
            po_chat_set2: item?.orderCounts?.po_set2_chat,
            po_chat_set3: item?.orderCounts?.po_set3_chat,
            po_chat_set4: item?.orderCounts?.po_set4_chat,
            Paid_calls: item?.orderCounts?.paid_calls_count,
            Paid_chats: item?.orderCounts?.paid_chats_count,
            Repeat_calls: item?.repeatCallCount,
            Repeat_chats: item?.repeatChatCount,
          });
        }
        const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(exceldata);

        /* generate workbook and add the worksheet */
        const wb: XLSX.WorkBook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Astrologer Sales Report');
        /* save to file */
        XLSX.writeFile(wb, fileName);
        this._SpinnerService.setState(false);
      } else this._NotifierService.showError('Some Error Occurred!');
    });
  }
}