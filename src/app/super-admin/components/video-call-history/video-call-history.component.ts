import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from 'src/app/shared/services/admin-api/admin-api.service';
import { NotifierService } from 'src/app/shared/services/toaster.service';
import * as moment from "moment";
import { Subject, debounceTime, distinctUntilChanged } from 'rxjs';
import option from "../../../../assets/constants/ngSelectvalues"
import { SpinnerService } from 'src/app/shared/services/spinner.service';
import * as XLSX from 'xlsx';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
@Component({
  selector: 'app-video-call-history',
  templateUrl: './video-call-history.component.html',
  styleUrls: ['./video-call-history.component.css']
})
export class VideoCallHistoryComponent {
  modelChanged: Subject<any> = new Subject<any>();
  getCallData: FormGroup;
  modalData: any = [];
  refundData: FormGroup;
  refundReason:any
  isOTP:boolean=false
  accountSummary: any = {
    totalEntry: 0,
    totalCharges: 0,
    acShares: 0,
    astroShares: 0,
    totalPgamt: 0,
    totalTdsamt: 0,
    totalNetamt: 0
  }
  callHistoryList: any = []
  isSubmitted: boolean = false
  moment: any = moment
  page: number = 1
  selectedCar: number = 0;
  // selected: any;
  alwaysShowCalendars: boolean;
  option = option.callchatoption;
  filter = option.filter;
  ranges: any = {
    'Today': [new Date(), new Date()],
    'Yesterday': [moment().utc().subtract(1, 'days'), moment().subtract(1, 'days').local()],
    'Last 7 Days': [moment().utc().subtract(6, 'days'), moment()],
    'Last 30 Days': [moment().utc().subtract(29, 'days'), moment()],
    'This Month': [moment().utc().startOf('month'), moment().utc().endOf('month')],
    'Last Month': [moment().utc().subtract(1, 'month').startOf('month'), moment().utc().subtract(1, 'month').endOf('month')]
  }
  invalidDates: moment.Moment[] = [moment().add(2, 'days'), moment().add(3, 'days'), moment().add(5, 'days')];
  isInvalidDate = (m: moment.Moment) => {
    return this.invalidDates.some(d => d.isSame(m, 'day'))
  }
  startDate = new Date();
  selected: any = { start: this.startDate, end: this.startDate };
  modalRef?: BsModalRef;
  Math = Math;


  constructor(
    private _AdminService: AdminService,
    private _NotifierService: NotifierService,
    private _FormBuilder: FormBuilder,
    private _SpinnerService: SpinnerService,
    private modalService: BsModalService
  ) {
    this.alwaysShowCalendars = true;
    this.getCallData = this._FormBuilder.group({
      from: [this.startDate.setUTCHours(0, 0, 0, 0).valueOf()],
      to: [this.startDate.setUTCHours(23, 59, 59, 999).valueOf()],
      status: ["none"],
      type: ["VCALL"],
      page: this.page,
      search: [''],
      sfilter: ['mobile'],
      StartDate: [new Date(), Validators.required]
    })
    this.refundData = this._FormBuilder.group({
      reason:[''],
      message:[''],
      otp:[''],
      orderid:['']
    });
  }

  ngOnInit(): void {
    this.modelChanged.pipe(debounceTime(300), distinctUntilChanged()).subscribe((val) => {
      this.getCallData.get('search')?.setValue(val?.search)
      this.getCallReport()
    });
    this.getCallReport();
    this.getMasterdata('refund reason')
  }

  getMasterdata(masterName: any) {
    this._AdminService
      .getMasterDetailData({ masterName: masterName })
      .then((data) => {
        if (data?.status) {
          this.refundReason=data?.data
        }
      });
  }

  getCallReport() {
    this._SpinnerService.setState(true)
    this._AdminService.callChatReport(this.getCallData.value).then((data) => {
      if (data?.status) {
        this._SpinnerService.setState(false)
        this.callHistoryList = data?.data
        this.accountSummary = data?.data?.accountSummary;
      } else {
        this._SpinnerService.setState(false)
        if (data?.data?.error && data?.data?.error == "ERR:0001")
          this._NotifierService.showError("Trying to fetch data more than a year");
        if (data?.data?.error && data?.data?.error == "ERR:0004")
          this._NotifierService.showError("No Data Found !");
        else
          this._NotifierService.showError("Some Error Occurred");
      }
    })
  }
  getTime(seconds: any) {
    let hours = Math.floor(seconds / 3600).toString();
    let minutes = Math.floor((seconds % 3600) / 60).toString();
    let second = (seconds % 60).toString();
    if (parseInt(hours) < 10) hours = "0" + hours;
    if (parseInt(minutes) < 10) minutes = "0" + minutes;
    if (parseInt(second) < 10) second = "0" + second;
    return hours + ":" + minutes + ":" + second;
  }
  choosedDate(event: any) {
    this.getCallData.get('from')?.setValue(new Date(event?.startDate?.$d).valueOf());
    this.getCallData.get('to')?.setValue(new Date(event?.endDate?.$d).valueOf());
    this.getCallReport();
  }
  search(event: any) {
    this.modelChanged.next({ search: event.target.value })
  }
  onPaginateChange($: any) {
    this.getCallData.get('page')?.setValue($.pageIndex + 1);
    this.getCallReport();
  }
  exportexcel(): void {
    /* pass here the table id */
    let fileName = 'Call History Report.xlsx';
    this._SpinnerService.setState(true)
    this.getCallData.get('page')?.setValue(null);
    this._AdminService.callChatReport(this.getCallData.value).then((data) => {
      if (data?.status) {
        let exceldata: any = [];
        for (let callChat of data?.data?.callchatData) {
          exceldata.push({
            CALL_DATE: moment(callChat?.order?.orderInitiate).format('DD/MM/YYYY'),
            CALL_TIME: moment(callChat?.order?.orderInitiate).format('hh:mm A'),
            CALL_ID: callChat?.order?.id,
            CUSTOMER_NAME: callChat?.customerInfo?.firstname + " " + callChat?.customerInfo?.lastname,
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
            REMARKS: callChat?.order?.remarks ? callChat?.order?.remarks : "No Remarks",
            RECORDING_URL: callChat?.order?.recordinURL ? "https://new-myastroguruji.s3.ap-south-1.amazonaws.com/" + callChat?.order?.recordinURL : "No URL Available"
          })
        }
        const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(exceldata);

        /* generate workbook and add the worksheet */
        const wb: XLSX.WorkBook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Call History Data');
        /* save to file */
        XLSX.writeFile(wb, fileName);
        this._SpinnerService.setState(false)
      }
      else
        this._NotifierService.showError("Some Error Occurred!");
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


  openRefund(template: TemplateRef<any>, orderId: any){
    this.refundData.get('orderid')?.setValue(orderId)
    this.modalRef = this.modalService.show(template,{backdrop:'static'});
  }

  closeModal(){
    this.modalRef?.hide()
    this.isOTP=false
  }

  submitRefund(){
    this._SpinnerService.setState(true)
    
    this._AdminService.initiateOrderRefund(this.refundData?.value).then(data=>{
      if(data?.status){
        this.getCallReport();
        this.modalRef?.hide()
        this.isOTP=false
        this.refundData.reset()
        this._NotifierService.showSuccess('Refunded Successfully')
      }else{
        this._NotifierService.showError('Something Went Wrong')
      }
      this._SpinnerService.setState(false)
    })

  }

  onOtpChange(event: any) {
    this.refundData.get('otp')?.setValue(event);
  }

  sendOTP(){
    this._AdminService.sendAdminOTP().then(data=>{
      if(data?.status){
        this._NotifierService.showSuccess('OTP Sent')
        this.isOTP=true
      }else{
        this._NotifierService.showError('Something Went Wrong')
      }
    })
  }
}
