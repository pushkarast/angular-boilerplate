import { Component, OnInit, TemplateRef } from '@angular/core';
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
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-customer-feedbacks',
  templateUrl: './customer-feedbacks.component.html',
  styleUrls: ['./customer-feedbacks.component.css']
})
export class CustomerFeedbacksComponent {
  modalRef?: BsModalRef;
  feedbackData: FormGroup
  modelChanged: Subject<any> = new Subject<any>();
  page = 1;
  pageRef = 0
  feedbackList: any = [] 
  updateData: FormGroup
  option = option.rating;

  constructor(
    private _FormBuilder: FormBuilder,
    private _AdminService: AdminService,
    private _SpinnerService: SpinnerService,
    private _NotifierService: NotifierService,
    private _ActivatedRoute: ActivatedRoute,
    private modalService: BsModalService,
  ) {
    this.feedbackData = this._FormBuilder.group({
      CustomerId: null,
      page: 1,
      search: '',
      feedbackStatus: null,
    })
    this.updateData = this._FormBuilder.group({
      id: null,
      rating: null,
      review: 1,
      replyId: null,
      astroReply: '',
    })
  }

  ngOnInit(): void {
    this._ActivatedRoute.queryParams.subscribe(params => {
      this.feedbackData.get('CustomerId')?.setValue(params["id"])
    })
    this.modelChanged
    .pipe(debounceTime(300), distinctUntilChanged())
    .subscribe((val) => {
      this.feedbackData.get('search')?.setValue(val?.search);
      this.getFeedbackData();
    });
    this.getFeedbackData();
  }

  search(event: any) {
    this.modelChanged.next({ search: event.target.value });
  }

  getFeedbackData() {
    this._SpinnerService.setState(true)
    this._AdminService.getCutomerFeedbacksById( this.feedbackData.value ).then((data) => {
      if (data?.status) {
        this.feedbackList = data?.data
      }
      this._SpinnerService.setState(false)
    })
  }

  handleGoto(id: any) {
    this.feedbackData.get('page')?.setValue(id)
    this.pageRef = id - 1
    this.getFeedbackData();
  }

  onPaginateChange($: any) {
    this.feedbackData.get('page')?.setValue($.pageIndex + 1)
    this.getFeedbackData();
  }

  editFeedData(id: any) {
    this._SpinnerService.setState(true)
    this._AdminService.getFeedbackById({ feedId : id }).then((data) => {
      if (data?.status) {
        this.updateData.get('id')?.setValue(data?.data?.id)
        this.updateData.get('rating')?.setValue(data?.data?.rating)
        this.updateData.get('review')?.setValue(data?.data?.message)
        this.updateData.get('astroReply')?.setValue(data?.data?.reply)
        this.updateData.get('replyId')?.setValue(data?.data?.replyId)
      }
      this._SpinnerService.setState(false)
    })
  }

  openModal(template: TemplateRef<any>, feedId: any) {
    this.getFeedbackData()
    this.editFeedData(feedId)
    this.modalRef = this.modalService.show(template);
  }

  updateFeed() {
    this._SpinnerService.setState(true)
    this._AdminService.updateFeedbackById(this.updateData.value).then((data) => {
      if (data?.status) {
        // this.updateData.get('id')?.setValue(data?.data?.id)
        // this.updateData.get('rating')?.setValue(data?.data?.rating)
        // this.updateData.get('review')?.setValue(data?.data?.message)
        // this.updateData.get('astroReply')?.setValue(data?.data?.reply)
        this.modalRef?.hide();
        this.getFeedbackData();
      }
      this._SpinnerService.setState(false)
    })
  }

  feedbackEdit(type: any, feedId: any) {
    this._AdminService.editFeedbacks({ type: type, feedId: feedId }).then((data) => {
      if (data?.status) {
        this._NotifierService.showSuccess("Status updated successfully");
        this.getFeedbackData();
      }
      else
        this._NotifierService.showError("Some Error Occurred");
    });
  }

  resetFilterFn() {
    this.feedbackData.reset();
    window.location.reload();
  }

  exportexcel(): void {
    /* pass here the table id */
    let curr_dateFile = Date.now();
    let fileName = 'Customer_Feedback_Report_' + moment(Date.now()).format("DD-MM-YYYY") + '.xlsx';
    this._SpinnerService.setState(true);
    this.feedbackData.get('page')?.setValue(null);
    this._AdminService.getCutomerFeedbacksById(this.feedbackData.value).then((data) => {
      if (data?.status) {
        let exceldata: any = [];
        for (let item of data?.data?.feedbackData) {
          exceldata.push({
            FEEDBACK_ID: item?.id,
            ASTROLOGER_NAME: item?.FullName,
            ASTROLOGER_MOBILE: item?.MobileNo,
            RATING: item?.type=="UCHAT" ? "CHAT" : item?.type=="UCALL" ? "CALL" : item?.type =="VCALL" ? "Video-Call" : item?.type,
            REVIEW: item?.rating,
            FEEDBACK_STATUS	: item?.approved=="0" ? "Not Submitted" : "approved",
            ASTROLOGER_REPLY	: item?.reply ? item?.reply : "N/A",
            ASTRO_REPLY_STATUS : item?.replyIsApproved == "0" ? "Not Approved" : item?.replyIsApproved =="1" ? "Approved" : item?.replyIsApproved == "2" ? "Pending" : item?.replyIsApproved=="3" ? "negative" : "N/A",
            FEEDBACK_SUBMITTED	: item?.updated_at,
          });
        }
        const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(exceldata);

        /* generate workbook and add the worksheet */
        const wb: XLSX.WorkBook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Customer Feedback Data');
        /* save to file */
        XLSX.writeFile(wb, fileName);
        this._SpinnerService.setState(false);
      } else {
        this._NotifierService.showError('Some Error Occurred!');
        this._SpinnerService.setState(false);
      }
    });
  }

}
