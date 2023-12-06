import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from 'src/app/shared/services/admin-api/admin-api.service';
import { NotifierService } from 'src/app/shared/services/toaster.service';
import * as moment from 'moment';
import { Subject, debounceTime, distinctUntilChanged } from 'rxjs';
import option from '../../../../assets/constants/ngSelectvalues';
import global from '../../../../assets/constants/global';
import { SpinnerService } from 'src/app/shared/services/spinner.service';
import * as XLSX from 'xlsx';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CommonService } from 'src/app/shared/services/common.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Buffer } from 'buffer';
import { ConfigService } from 'src/app/shared/services/config.service';
import { io } from 'socket.io-client';
@Component({
  selector: 'app-chat-h',
  templateUrl: './chat-h.component.html',
  styleUrls: ['./chat-h.component.css']
})
export class ChatHComponent {
  modelChanged: Subject<any> = new Subject<any>();
  getChatdata: FormGroup;
  feedbackData: FormGroup;
  refundReason: any;
  permission: any
  isOTP: boolean = false;
  contactOption = option?.contactStatus;
  yesNo = option?.yesno;
  connetCall = false;
  tags: any;
  orderReview = [
    { name: 'Satisfied', color: 'warn' },
    { name: 'Unsatisfied', color: 'primary' },
    { name: 'IssueFound', color: 'accent' },
  ];
  modalData: any;
  callHistoryList: any = [];
  isSubmitted: boolean = false;
  moment: any = moment;
  page: number = 1;
  selectedCar: number = 0;
  // selected: any;
  alwaysShowCalendars: boolean;
  option = option.callchatoption;
  filter = option.filter;
  Math = Math;
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
  initialValues: any;
  socket: any;
  callData: any;
  disableButton = false;
  constructor(
    private _AdminService: AdminService,
    private _NotifierService: NotifierService,
    private _FormBuilder: FormBuilder,
    private _SpinnerService: SpinnerService,
    private modalService: BsModalService,
    private _ActivatedRoute: ActivatedRoute,
    private _ConfigService: ConfigService,
    private _CommonService: CommonService,
    private router: Router
  ) {
    this.alwaysShowCalendars = true;
    this.getChatdata = this._FormBuilder.group({
      from: [this.startDate.setUTCHours(0, 0, 0, 0).valueOf() + new Date().getTimezoneOffset() * 1000 * 60],
      to: [this.startDate.setUTCHours(23, 59, 59, 999).valueOf() + new Date().getTimezoneOffset() * 1000 * 60],
      status: ['none'],
      type: ['UCHAT'],
      page: this.page,
      search: [''],
      sfilter: ['mobile'],
      StartDate: [new Date(), Validators.required],
      isTelecaller: true
    });
    this.feedbackData = this._FormBuilder.group({
      orderId: [null, Validators.required],
      tags: [["Love"], Validators.required],
      orderReview: ["", Validators.required],
      orderFeed: [null, Validators.required],
      callStatus: ['0', Validators.required],
      welcomeNote: ['1', Validators.required],
      sendToAdmin: [false],
      dialId: [null]
    })
  }

  ngOnInit(): void {
    // localStorage.setItem("from", String(this.startDate.setUTCHours(0, 0, 0, 0).valueOf() + new Date().getTimezoneOffset() * 1000 * 60))
    // localStorage.setItem("to", String(this.startDate.setUTCHours(23, 59, 59, 999).valueOf() + new Date().getTimezoneOffset() * 1000 * 60))
    this.modelChanged
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe((val) => {
        this.getChatdata.get('search')?.setValue(val?.search);
        this.getChatReport();
      });
    this.getChatReport();
    this._ActivatedRoute.queryParams.subscribe(params => {
      if (params["permit"])
        this.permission = Buffer.from(params["permit"], 'base64').toString('ascii');
    })
    this.initialValues = this.feedbackData?.value;
    this.getMasterdata("tags");

    this.socket = io('https://new-api.myastroguruji.com'); // Replace with your server URL

    this.socket.on('room-joined', (data) => {
      console.log('Received data from the server:', data);
    });

    this.socket.on('room-disconnected', (data) => {
      console.log('Disconnected from room');
      this.connetCall = false;
    });
    // setTimeout(() => {
    //   window.location.reload()
    // }, 5000);
  }


  getPermisson(p_type: any) {
    return this._CommonService.getPermission(this.permission, p_type)
  }
  hideNumber(string: any) {
    return this._CommonService.hideMobile(string);
  }
  getTime(seconds: any) {
    let a;
    let hours = Math.floor(seconds / 3600).toString();
    let minutes = Math.floor((seconds % 3600) / 60).toString();
    let second = (seconds % 60).toString();
    if (parseInt(hours) < 10) hours = "0" + hours;
    if (parseInt(minutes) < 10) minutes = "0" + minutes;
    if (parseInt(second) < 10) second = "0" + second;
    return hours + ":" + minutes + ":" + second;
  }
  getChatReport() {
    this._SpinnerService.setState(true);
    this._AdminService.callChatReport(this.getChatdata.value).then((data) => {
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
    this.getChatdata
      .get('from')
      ?.setValue(new Date(event?.startDate?.$d).valueOf() + new Date().getTimezoneOffset() * 1000 * 60);
    this.getChatdata
      .get('to')
      ?.setValue(new Date(event?.endDate?.$d).valueOf() + new Date().getTimezoneOffset() * 1000 * 60);
    this.getChatReport();
  }
  search(event: any) {
    this.modelChanged.next({ search: event.target.value });
  }
  onPaginateChange($: any) {
    this.getChatdata.get('page')?.setValue($.pageIndex + 1);
    this.getChatReport();
  }

  closeModal() {
    this.modalRef?.hide()
    this.connetCall = false;
    this.feedbackData.reset(this.initialValues);
    this.disableButton = false;
  }

  openModal(template: TemplateRef<any>, id = null) {
    this.feedbackData.get('orderId')?.setValue(id);
    this._AdminService
      .getCallinfoByid({ id: this.feedbackData.get('orderId')?.value })
      .then((data) => {
        if (data?.status) {
          this.modalData = data?.data;
        }
        else {
          this._NotifierService.showError(data?.message)
          this.closeModal()
        }
      });
    this.modalRef = this.modalService.show(template, { class: 'modal-xl', backdrop: "static", keyboard: false });
  }
  callStatus(event: any) {
    if (event.value != "0") {
      this.feedbackData.get('welcomeNote')?.clearValidators();
      this.feedbackData.get('orderFeed')?.clearValidators();
      this.feedbackData.get('tags')?.clearValidators();
    }
    else {
      this.feedbackData.get('welcomeNote')?.setValidators([Validators.required]);
      this.feedbackData.get('orderFeed')?.setValidators([Validators.required]);
      this.feedbackData.get('tags')?.setValidators([Validators.required]);
    }
    console.log(this.feedbackData.errors)
  }
  getMasterdata(masterName: any) {
    this._AdminService
      .getMasterDetailData({ masterName: masterName, nameOnly: true })
      .then((data) => {
        if (data?.status) {
          this.tags = data?.data.map((element: any) => {
            return { ...element, color: global?.defaultColor[Math.floor(Math.random() * global?.defaultColor.length)] }
          })
        }
      });
  }

  startCall() {
    this.connetCall = !this.connetCall;
    const tData = {
      orderId: this.feedbackData.get('orderId')?.value
    }
    this._AdminService
      .initiateTeleCall(tData)
      .then((data) => {
        if (data?.status) {
          this.socket.emit('join_call_telecaller', data?.data);
          this.callData = data?.data;
          this.feedbackData.get('dialId')?.setValue(data?.data?.room)
        }
        else {
          this._NotifierService.showInfo(data?.message)
        }
      })
  }
  disconnectCall() {

    if (this.connetCall)
      this.socket.emit('hang_upteleCall', JSON.stringify(this.callData));
  }
  ValidateForm() {
    if (this.feedbackData.get('orderId')?.invalid ||
      this.feedbackData.get('tags')?.invalid ||
      this.feedbackData.get('orderReview')?.invalid ||
      this.feedbackData.get('orderFeed')?.invalid ||
      this.feedbackData.get('callStatus')?.invalid ||
      this.feedbackData.get('welcomeNote')?.invalid
    )
      return false;
    else return true;

  }
  submitCallFeed() {
    if (this.ValidateForm()) {
      this.disableButton = true;
      this._SpinnerService.setState(true);
      console.log(Validators.required)
      this._AdminService
        .submitCallfeed(this.feedbackData?.value)
        .then((data) => {
          window.location.href = this.router.url;
        });
      this._SpinnerService.setState(false);
      this.closeModal();
    } else
      this._NotifierService.showError("Please Fill all the details")
    this.disableButton = false;
  }
}
