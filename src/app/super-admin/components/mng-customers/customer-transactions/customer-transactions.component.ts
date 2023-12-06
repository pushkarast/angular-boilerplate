import { Component, OnInit } from '@angular/core';
import option from "../../../../../assets/constants/ngSelectvalues"
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from 'src/app/shared/services/admin-api/admin-api.service';
import { SpinnerService } from 'src/app/shared/services/spinner.service';
import { NotifierService } from 'src/app/shared/services/toaster.service';
import { ActivatedRoute } from '@angular/router';
import { Buffer } from 'buffer';
import { Subject, debounceTime, distinctUntilChanged } from 'rxjs';
import * as moment from 'moment';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-customer-transactions',
  templateUrl: './customer-transactions.component.html',
  styleUrls: ['./customer-transactions.component.css']
})
export class CustomerTransactionsComponent {
  txnData: FormGroup
  modelChanged: Subject<any> = new Subject<any>();
  txnReportList: any = []
  page = 1;
  pageRef = 0

  constructor(
    private _FormBuilder: FormBuilder,
    private _AdminService: AdminService,
    private _SpinnerService: SpinnerService,
    private _NotifierService: NotifierService,
    private _ActivatedRoute: ActivatedRoute
  ) {
    this.txnData = this._FormBuilder.group({
      CustomerId: null,
      page: 1,
      search: '',
      paymentStatus: null
    })
  }

  ngOnInit(): void {
    this._ActivatedRoute.queryParams.subscribe(params => {
      this.txnData.get('CustomerId')?.setValue(params["id"])
    })
    this.modelChanged
    .pipe(debounceTime(300), distinctUntilChanged())
    .subscribe((val) => {
      this.txnData.get('search')?.setValue(val?.search);
      this.getTxnData();
    });
    this.getTxnData();
  }

  search(event: any) {
    this.modelChanged.next({ search: event.target.value });
  }

  getTxnData() {
    this._SpinnerService.setState(true)
    this._AdminService.getTxnReportById( this.txnData.value ).then((data) => {
      if (data?.status) {
        this.txnReportList = data?.data
      }
      this._SpinnerService.setState(false)
    })
  }
  onPaginateChange($: any) {
    this.txnData.get('page')?.setValue($.pageIndex + 1)
    this.getTxnData();
  }

  handleGoto(id: any) {
    // this.txnData.get('CustomerId')?.setValue(id)
    this.txnData.get('page')?.setValue(id)
    // this.page = id;
    this.pageRef = id - 1
    this.getTxnData();
  }

  resetFilterFn() {
    this.txnData.reset();
    window.location.reload();
    // this.txnData.get('search')?.setValue('')
    // this.txnData.get('paymentStatus')?.setValue(null)
    // this.getTxnData()
    // this.txnData = this._FormBuilder.group({
    //   CustomerId: null,
    //   page: 1,
    //   search: '',
    //   paymentStatus: null
    // })
  }

  exportexcel(): void {
    /* pass here the table id */
    let curr_dateFile = Date.now();
    let fileName = 'Customer_Transaction_Report_' + moment(Date.now()).format("DD-MM-YYYY") + '.xlsx';
    this._SpinnerService.setState(true);
    this.txnData.get('page')?.setValue(null);
    this._AdminService.getTxnReportById(this.txnData.value).then((data) => {
      if (data?.status) {
        let exceldata: any = [];
        for (let item of data?.data?.txnReport) {
          exceldata.push({
            Transaction_Id: item?.TxnId,
            TYPE: item?.TxnType,
            PAYMENT_ID: item?.PaymentId,
            DATE: moment(item?.TxnRefNo).format('DD-MM-YYYY, h:m A'),
            AMOUNT: item?.Amount,
            GST_Per: item?.GSTPer,
            GST_AMOUNT	: item?.GSTAmt,
            DISCOUNT_Per: item?.DiscPer,
            DISCOUNT_AMOUNT: item?.DiscAmt,
            NET_AMOUNT: item?.NetAmt,
            PAYMENT_STATUS: item?.PaymentStatus,
            REMARKS: item?.Remarks,

          });
        }
        const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(exceldata);

        /* generate workbook and add the worksheet */
        const wb: XLSX.WorkBook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Customer Transaction Data');
        /* save to file */
        XLSX.writeFile(wb, fileName);
        this._SpinnerService.setState(false);
      } else this._NotifierService.showError('Some Error Occurred!');
    });
  }

}
