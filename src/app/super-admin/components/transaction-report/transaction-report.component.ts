import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import option from '../../../../assets/constants/ngSelectvalues';
import * as moment from 'moment';
import { SpinnerService } from 'src/app/shared/services/spinner.service';
import { AdminService } from 'src/app/shared/services/admin-api/admin-api.service';
import { NotifierService } from 'src/app/shared/services/toaster.service';
import { Subject, debounceTime, distinctUntilChanged } from 'rxjs';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-transaction-report',
  templateUrl: './transaction-report.component.html',
  styleUrls: ['./transaction-report.component.css'],
})
export class TransactionReportComponent implements OnInit {
  modelChanged: Subject<any> = new Subject<any>();
  getTxnReport: FormGroup;
  option = option.paymentStatusOptions;
  TxnList: any = [];
  pageRef = 0;
  accountSummary: any = {
    totalEntry: 0,
    totalAmount: 0,
    totalDiscount: 0,
    netAmtWithoutGST: 0,
    totalGSTAmt: 0,
    netAmtWithGST: 0,
  };
  page: number = 1;
  ranges: any = {
    Today: [new Date(), new Date()],
    Yesterday: [
      moment().subtract(1, 'days').utc(),
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
    private _FormBuilder: FormBuilder,
    private _SpinnerService: SpinnerService,
    private _NotifierService: NotifierService
  ) {
    this.getTxnReport = this._FormBuilder.group({
      from: [this.startDate.setUTCHours(0, 0, 0, 0).valueOf()+this.startDate.getTimezoneOffset()*1000*60],
      to: [this.startDate.setUTCHours(23, 59, 59, 999).valueOf()+this.startDate.getTimezoneOffset()*1000*60],
      status: ['', [Validators.required, Validators.min(1)]],
      page: this.page,
      search: [''],
      StartDate: [new Date(), Validators.required],
    });
  }

  ngOnInit(): void {
    this.modelChanged
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe((val) => {
        this.getTxnReport.get('search')?.setValue(val?.search);
        this.TxnReports();
      });
    this.TxnReports();
  }

  TxnReports() {
    this._SpinnerService.setState(true);
    this._AdminService.TxnReports(this.getTxnReport.value).then((data) => {
      if (data?.status) {
        this._SpinnerService.setState(false);
        this.TxnList = data?.data;
        this.accountSummary = data?.data?.accountSummary;
      } else {
        this._SpinnerService.setState(false);
        if (data?.data?.error && data?.data?.error == 'ERR:0001')
          this._NotifierService.showError(
            'Trying to fetch data more than a year'
          );
        else this._NotifierService.showError('Some Error Occurred');
      }
    });
  }

  choosedDate(event: any) {
    this.getTxnReport
      .get('from')
      ?.setValue(
        new Date(new Date(event?.startDate?.$d).getTime()).valueOf() +new Date(event?.startDate?.$d).getTimezoneOffset()*1000*60
      );
    this.getTxnReport
      .get('to')
      ?.setValue(new Date(event?.endDate?.$d).getTime().valueOf() +new Date(event?.endDate?.$d).getTimezoneOffset()*1000*60);
    this.TxnReports();
  }
  search(event: any) {
    this.modelChanged.next({ search: event.target.value });
  }
  onPaginateChange($: any) {
    this.getTxnReport.get('page')?.setValue($.pageIndex + 1);
    this.TxnReports();
  }

  handleGoto(id: any) {
    this.page = id;
    // console.log(this.page, 'this page')
    this.getTxnReport.get('page')?.setValue(id);
    this.pageRef = id - 1;
    this.TxnReports();
  }

  exportexcel(): void {
    let fileName = 'Payment Transaction Report.xlsx';
    this._SpinnerService.setState(true);
    this.getTxnReport.get('page')?.setValue(null);
    this._AdminService.TxnReports(this.getTxnReport.value).then((data) => {
      if (data?.status) {
        let exceldata: any = [];
        for (let item of data?.data?.report) {
          exceldata.push({
            Transaction_Id: item?.TxnId,
            Transaction_Type: item?.TxnType,
            Transaction_Date: item?.TxnDate,
            Transaction_Time: item?.TxnTime,
            Customer_Name: item?.CustomerName,
            Mobile_No: item?.MobileNo,
            Amount: item?.Amount,
            Disc_Per: item?.DiscPer,
            Disc_Amount: item?.GSTAmt,
            Net_Amount: item?.NetAmt,
            GST_Per: item?.GSTPer,
            GST_Amount: item?.GSTAmt,
            Total_Amount: item?.TotalAmount,
            Payment_Status: item?.PaymentStatus,
            Payment_Id: item?.PaymentId,
            Coupon_No: item?.CouponNo,
            Coupon_Type: item?.CouponType,
          });
        }
        const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(exceldata);

        const wb: XLSX.WorkBook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Payment Transaction Report');

        XLSX.writeFile(wb, fileName);
        this._SpinnerService.setState(false);
      } else {
        this._NotifierService.showError('Some Error Occured!');
      }
    });
  }
}