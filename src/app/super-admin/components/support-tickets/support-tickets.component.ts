import { Component, TemplateRef, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import option from "../../../../assets/constants/ngSelectvalues"
import * as moment from "moment";
import { SpinnerService } from 'src/app/shared/services/spinner.service';
import { NotifierService } from 'src/app/shared/services/toaster.service';
import { AdminService } from 'src/app/shared/services/admin-api/admin-api.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Subject, debounceTime, distinctUntilChanged } from 'rxjs';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-support-tickets',
  templateUrl: './support-tickets.component.html',
  styleUrls: ['./support-tickets.component.css']
})
export class SupportTicketsComponent {
  modalRef?: BsModalRef
  modelChanged: Subject<any> = new Subject<any>();
  getSupportTickets: FormGroup
  updateTicket: FormGroup
  getSingleTicket: FormGroup
  sendReply: FormGroup
  editMessage: FormGroup
  option = option.supportStatus
  updateStatus = option.updateStatus
  ticketsList: any = []
  previousChatList: any = []
  supportOrderDetails: any = {}
  supportTicketDetails: any = {}
  chatHeaderCustomerName: any = null
  chatHeaderCustomerMobileNo: any = null
  chatHeaderTicketId: any = null
  ticketsSummary: any = {}
  page = 1;
  editBoxno = -1;
  fileViewer = "";
  modalId = null;
  customerId: any = null
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
  // startDate = new Date().getTime();
  // selected: any = { start: this.startDate, end: this.startDate + 1 };

  startDate = new Date();
  selected: any = { start: this.startDate, end: this.startDate };

  constructor(
    private _AdminService: AdminService,
    private _NotifierService: NotifierService,
    private _FormBuilder: FormBuilder,
    private _SpinnerService: SpinnerService,
    private modalService: BsModalService,
    private cdref: ChangeDetectorRef,
  ) {
    this.getSupportTickets = this._FormBuilder.group({
      from: [this.startDate.setUTCHours(0, 0, 0, 0).valueOf()],
      to: [this.startDate.setUTCHours(23, 59, 59, 999).valueOf()],
      // from: [this.startDate],
      // to: [this.startDate+1],
      status: ["none"],
      page: this.page,
      search: [''],
      StartDate: [new Date(), Validators.required],
      ticketId: [null]
    }),
      this.updateTicket = this._FormBuilder.group({
        ticketId: null,
        newStatus: [""],
        // message: ""
      })
    this.getSingleTicket = this._FormBuilder.group({
      ticketId: null,
      status: [""]
    })
    this.sendReply = this._FormBuilder.group({
      ticketId: null,
      message: "",
      imageUpload: null
    })
    this.editMessage = this._FormBuilder.group({
      id: null,
      message: "",
    })
  }

  ngOnInit(): void {
    this.modelChanged.pipe(debounceTime(300), distinctUntilChanged()).subscribe((val) => {
      this.getSupportTickets.get('search')?.setValue(val?.search)
      this.getAllTickets()
    });
    this.getAllTickets();
    // this.cdref.detectChanges();

  }

  getAllTickets(page = 1, ticketId = null) {
    // this._SpinnerService.setState(true)
    this._AdminService.getAllSupportTickets({ ...this.getSupportTickets.value, page: page, ticketId: ticketId }).then((data) => {
      // this.page = page;
      if (data?.status) {
        this._SpinnerService.setState(false)
        this.ticketsList = data?.data
        this.ticketsSummary = data?.data?.ticketsSummary
      } else {
        this._SpinnerService.setState(false)
        this._NotifierService.showError("Some Error Occurred");
      }
    })
  }

  choosedDate(event: any) {
    this.getSupportTickets.get('from')?.setValue(new Date(event?.startDate?.$d).valueOf());
    this.getSupportTickets.get('to')?.setValue(new Date(event?.endDate?.$d).valueOf());
    this.getAllTickets();
  }
  search(event: any) {
    this.modelChanged.next({ search: event.target.value })
  }

  ticketStatusUpdate(status: any, ticketId: any) {
    this._AdminService.updateTicketStaus({ status: status, ticketId: ticketId }).then((data) => {
      if (data?.status) {
        this._NotifierService.showSuccess("status updated");
        this.getAllTickets();
      }
      else
        this._NotifierService.showError("Some Error Occurred");
    });
  }

  singleTicketData(ticketId: any) {
    this._AdminService.getTicketById({ ticketId: ticketId }).then((data) => {
      if (data?.status) {
        this.updateTicket.get('ticketId')?.setValue(ticketId)
        this.sendReply.get('ticketId')?.setValue(ticketId)
        this.previousChatList = data?.data?.messages
        this.chatHeaderCustomerName = data?.data?.customerName
        this.chatHeaderCustomerMobileNo = data?.data?.customerMobileNo
        this.supportOrderDetails = data?.data?.orderDetails
        this.supportTicketDetails = data?.data?.ticketDetails
        this.chatHeaderTicketId = data?.data?.id

      }
      else
        this._NotifierService.showError("Some Error Occurred");
    });
  }

  onPaginateChange($: any) {
    // this.getSupportTickets.get('page')?.setValue($.pageIndex + 1);
    // this.getAllTickets();
    this.getAllTickets($.pageIndex + 1);
  }

  updateTicketStatus() {
    this._AdminService.updateTicketStaus(this.updateTicket.value).then((data) => {
      if (data?.status) {
        this._NotifierService.showSuccess("success");
        this.updateTicket = this._FormBuilder.group({
          ticketId: null,
          newStatus: [""]
        })
        this.getAllTickets();
      }
      else
        this._NotifierService.showError("Some Error Occurred");
    })

    this.modalRef?.hide();
  }

  openModal(template: TemplateRef<any>, ticketId: any) {
    this.singleTicketData(ticketId);
    this.modalId = ticketId;
    // this.updateTicketStaus(ticketId)
    this.modalRef = this.modalService.show(template);
  }
  openStatusModal(template: TemplateRef<any>, ticketId: any) {
    this.singleTicketData(ticketId)
    this.modalRef = this.modalService.show(template);
  }

  sendReplyFn() {
    // console.log('send')
    // if (this.sendReply.get('imageUpload')?.value == null) {
    this._AdminService.startSupportChat(this.sendReply.value).then((data) => {
      if (data?.status) {
        this._NotifierService.showSuccess("success");
        // console.log(this.sendReply.get('ticketId')?.value)
        // this.getSupportTickets.get('search')?.setValue(val?.search)
        this.singleTicketData(this.sendReply.get('ticketId')?.value);
        this.getAllTickets();

        this.sendReply = this._FormBuilder.group({
          ticketId: null,
          message: ""
        })
      }
      else
        this._NotifierService.showError("Some Error Occurred");
    })
    //}
    //else {
    //   this._AdminService.uploadSupportChatImage(this.sendReply.value).then((data) => {
    //     if (data?.status) {
    //       this._NotifierService.showSuccess("success");
    //       // console.log(this.sendReply.get('ticketId')?.value)
    //       // this.getSupportTickets.get('search')?.setValue(val?.search)
    //       this.singleTicketData(this.sendReply.get('ticketId')?.value);
    //       this.getAllTickets();
    //       this.sendReply = this._FormBuilder.group({
    //         ticketId: null,
    //         message: "",
    //         imageUpload: null
    //       })
    //     }
    //     else
    //       this._NotifierService.showError("Some Error Occurred");
    //   })
    // }
    // this.modalRef?.hide();
  }

  uploadMsgImage(file: any, e: any) {
    const formData = new FormData();
    // console.log(this.sendReply.get('imageUpload')?.value)
    formData.set('imageUpload', this.sendReply.get('imageUpload')?.value);
    formData.set('ticketId', this.sendReply.get('ticketId')?.value);
    // console.log(this.sendReply.get('ticketId')?.value, 'form dataaa')
    this._AdminService.uploadSupportChatImage(formData).then((data) => {
      if (data?.status) {
        this._NotifierService.showSuccess("success");
        this.singleTicketData(this.sendReply.get('ticketId')?.value);
        this.getAllTickets();
        this.sendReply = this._FormBuilder.group({
          ticketId: null,
          message: "",
          imageUpload: null
        })
        e.target.value = null
        // this.sendReply.reset();
      }
      else
        this._NotifierService.showError("Some Error Occurred");
    })
  }

  fileupload(event: Event): void {
    // console.log(Event)
    if (event.target !== null) {
      const files = (<HTMLInputElement>event.target).files;
      if (files !== null) {
        const fileList: FileList = files;
        if (fileList && fileList.length > 0) {
          const file: File = fileList[0];
          this.sendReply.get('imageUpload')?.setValue(file)
          // console.log(file, 'file')
          this.uploadMsgImage(file, event)
          this.fileViewer = file.name;
          // this.cdref.detectChanges();
        }
      }
    }
  }
  showEdit(key, message) {
    this.editBoxno = key
    this.editMessage.get('message')?.setValue(message);
  }
  editMsg(id) {
    this.editMessage.get('id')?.setValue(id);
    this._AdminService.updateSupportChat(this.editMessage?.value).then((data) => {
      if (data?.status) {
        this.previousChatList = [];
        this.singleTicketData(this.modalId);
        this.editBoxno = -1;
      } else {
        this._NotifierService.showError(data?.message)
      }
    })
  }

}
