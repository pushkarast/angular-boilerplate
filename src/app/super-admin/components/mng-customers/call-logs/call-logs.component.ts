import { Component, ElementRef, ViewChild } from '@angular/core';
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
  selector: 'app-call-logs',
  templateUrl: './call-logs.component.html',
  styleUrls: ['./call-logs.component.css']
})
export class CallLogsComponent  {
  @ViewChild('mydiv') resetSearch! : ElementRef;

  modelChanged: Subject<any> = new Subject<any>();
  callLogData: FormGroup
  callLogList: any = []
  pageRef = 0
  callLogTypeFilter = option.callLogTypeFilter;

  constructor(
    private _FormBuilder: FormBuilder,
    private _AdminService: AdminService,
    private _SpinnerService: SpinnerService,
    private _NotifierService: NotifierService,
    private _ActivatedRoute: ActivatedRoute
  ) {
    this.callLogData = this._FormBuilder.group({
      CustomerId: null,
      page: 1,
      filter: null,
      search: '',
      paymentStatus: null
    })
  }

  ngOnInit(): void {
    // console.log(this.callLogList, 'test...')
    this._ActivatedRoute.queryParams.subscribe(params => {
      this.callLogData.get('CustomerId')?.setValue(params["id"])
    })
    this.modelChanged
    .pipe(debounceTime(300), distinctUntilChanged())
    .subscribe((val) => {
      this.callLogData.get('search')?.setValue(val?.search);
      this.getCallLogsData();
    });
    this.getCallLogsData();
  }

  getCallLogsData() {
    this._SpinnerService.setState(true)
    this._AdminService.getCustomerCallLogsById( this.callLogData.value ).then((data) => {
      if (data?.status) {
        this.callLogList = data?.data
        // console.log(this.callLogList, 'this call log list')
      }
      this._SpinnerService.setState(false)
    })
  }

  handleGoto(id: any) {
    this.callLogData.get('CustomerId')?.setValue(id)
    // this.page = id;
    this.pageRef = id - 1
    this.getCallLogsData();
  }
  onPaginateChange($: any) {
    this.callLogData.get('page')?.setValue($.pageIndex + 1)
    this.getCallLogsData();
  }

  search(event: any) {
    this.modelChanged.next({ search: event.target.value });
  }

  resetFilterFn() {
    this.callLogData.reset();
    window.location.reload();

    // //this.resetSearch.nativeElement.textContent = ""
    // console.log(this.resetSearch, 'testing..')
    // // this.callLogData.reset();
  }

  exportexcel(): void {
    /* pass here the table id */
    let curr_dateFile = Date.now();
    let fileName = 'Customer_Call_Report_' + moment(Date.now()).format("DD-MM-YYYY") + '.xlsx';
    this._SpinnerService.setState(true);
    this.callLogData.get('page')?.setValue(null);
    this._AdminService.getCustomerCallLogsById(this.callLogData.value).then((data) => {
      if (data?.status) {
        let exceldata: any = [];
        for (let item of data?.data?.activityDetails) {
          exceldata.push({
            Date: item?.dateTime ? moment(item?.dateTime).format("DD-MM-YYYY") : "N/A",
            Time: item?.dateTime? moment(item?.dateTime).format("hh:mm:ss") : "N/A",
            Id: item?.id,
            Type: item?.type=="UCHAT" ? "CHAT" : item?.type=="UCALL" ? "CALL" : item?.type =="VCALL" ? "Video-Call" : item?.type,
            Mobile: item?.astroProfileData?.astroMobileNo,
            Astrologer_Name: item?.astroProfileData?.astroName,
            Status: item?.callStatus,
            Rate	: item?.chargeDetails?.astroRate,
            Duration_IN_SEC: item?.duration,
            Total_Charges: item?.chargeDetails?.totalCharges,
            Company_Share: item?.chargeDetails?.compAmt,
            Astrologer_Share: item?.chargeDetails?.astroAmt,
            PG_Percent: item?.chargeDetails?.pgPer,
            PG_Amt: item?.chargeDetails?.pgAmt,
            TDS_Per: item?.chargeDetails?.TDSPer,
            TDS_Amt: item?.chargeDetails?.TDSAmt,
            Astrologer_NetShare: item?.chargeDetails?.astroTotalAmt,
          });
        }
        const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(exceldata);

        /* generate workbook and add the worksheet */
        const wb: XLSX.WorkBook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Customer CallLog Data');
        /* save to file */
        XLSX.writeFile(wb, fileName);
        this._SpinnerService.setState(false);
      } else this._NotifierService.showError('Some Error Occurred!');
    });
  }


}
