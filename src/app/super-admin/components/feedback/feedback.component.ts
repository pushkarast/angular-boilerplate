import { Component, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AdminService } from 'src/app/shared/services/admin-api/admin-api.service';
import { NotifierService } from 'src/app/shared/services/toaster.service';
import option from "../../../../assets/constants/ngSelectvalues"
import { SpinnerService } from 'src/app/shared/services/spinner.service';
import { Subject, debounceTime, distinctUntilChanged } from 'rxjs';
import * as XLSX from 'xlsx';
import * as moment from "moment";

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent {
  modalRef?: BsModalRef;
  modelChanged: Subject<any> = new Subject<any>();
  feedbackLists: any = [];
  feedbackInfo: FormGroup
  getFeedbackData: FormGroup
  page = 1;
  pageRef = 0
  apprOption = option.approve_not
  option = option.rating;
  filter = "None"
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

  constructor(
    private _AdminService: AdminService,
    private _NotifierService: NotifierService,
    private _FormBuilder: FormBuilder,
    private modalService: BsModalService,
    private _SpinnerService: SpinnerService
  ) {

    this.feedbackInfo = this._FormBuilder.group({
      rating: [null],
      message: [""],
      id: [],
      reply: [],
      replyId: null,
      post_id: null

    })
    
    this.getFeedbackData = this._FormBuilder.group({
      start: null, 
      p_type: null, 
      feedId: null, 
      filter: null, 
      search: '',
      // StartDate: [new Date(), Validators.required],
      // from: [this.startDate.setUTCHours(0, 0, 0, 0).valueOf()],
      // to: [this.startDate.setUTCHours(23, 59, 59, 999).valueOf()],
    })
  }
  ngOnInit(): void {
    this.modelChanged.pipe(debounceTime(300), distinctUntilChanged()).subscribe((val) => {
      this.getFeedbackData.get('search')?.setValue(val?.search)
      this.getFeedbacks();
    });
    this.getFeedbacks();
  }
  getFeedbacks(page = 1, feedId = null, filter = "None") {
    this._SpinnerService.setState(true)
    this._AdminService.fetchFeedbacks({ ...this.getFeedbackData.value,start: page, p_type: "3,4", feedId: feedId, filter: this.filter }).then((data) => {
      this.page = page;
      if (data?.status ) {
        this._SpinnerService.setState(false)
        if (data?.data) {
          if (!feedId) {
            this.feedbackLists = data?.data;
          }
          else {
            this.feedbackInfo.patchValue(data?.data);
            this.feedbackInfo.get('reply')?.setValue(data?.data?.reply?.message)
            this.feedbackInfo.get('replyId')?.setValue(data?.data?.reply?.id)
          }
        }
        else {
          this.feedbackLists = [];
        }
      }
    });
  }

  feedbackEdit(type: any, feedId: any) {
    this._AdminService.editFeedbacks({ type: type, feedId: feedId }).then((data) => {
      if (data?.status) {
        this._NotifierService.showSuccess("Changes Made success");
        this.getFeedbacks(this.page);
      }
      else
        this._NotifierService.showError("Some Error Occurred");
    });
  }
  updateFeed() {
    // console.log("UPDATE")
    this._AdminService.updateFeedbacks({ ...this.feedbackInfo.value }).then((data) => {
      if (data?.status) {
        // console.log("DOne");
        this.modalRef?.hide();
      }
    })
  }
  openModal(template: TemplateRef<any>, feedId: any) {
    this.getFeedbacks(1, feedId)
    this.modalRef = this.modalService.show(template);
  }
  onPaginateChange($: any) {
    // console.log('pagina on change1')
    this.getFeedbacks($.pageIndex + 1);
  }
  setFilter(event: any) {
    this.filter = event.value;
    this.getFeedbacks(1, null, this.filter)
  }
  handleGoto(id: any) {
    console.log('pagina on change2')

    this.page = id;
    this.pageRef = id - 1
    this.getFeedbacks(id);
  }
  replyStatusUpdate(id: any, status: any) {
    this._AdminService.updateAstroReplyStatus({ id: id, status: status }).then((data) => {
      if (data?.status) {
        this._NotifierService.showSuccess("success");
        this.getFeedbacks(this.page);
      }
      else
        this._NotifierService.showError("Some Error Occurred");
    });
  }

  search(event: any) {
    this.modelChanged.next({ search: event.target.value })
  }

  exportexcel(): void {
    /* pass here the table id */
    let fileName = 'Feedback Report.xlsx';
    this._SpinnerService.setState(true)
    this.getFeedbackData.get('start')?.setValue(null);
    this._AdminService.fetchFeedbacks({ ...this.getFeedbackData.value, p_type: "3,4", filter: this.filter }).then((data) => {
      if (data?.status) {
        let exceldata: any = [];
        for (let item of data?.data?.feedbacks) {
          exceldata.push({
            CUSTOMER_NAME: item?.userInfo?.fullname,
            CUSTOMER_MOBILE	: item?.userInfo?.mobile,
            REVIEW: item?.feed?.message,
            RATING: item?.feed?.rating ,
            ASTROLOGER_NAME: item?.astroInfo?.fullname,
            ASTROLOGER_MOBILE: item?.astroInfo?.mobileno,
            ASTROLOGER_REPLY	: item?.feed?.reply,
            FEEDBACK_STATUS	: item?.feed?.approved,
            ASTROLOGER_REPLY_STATUS	: item?.feed?.replyIsApproved,
            FEEDBACK_UpdateAt	: moment(item?.feed?.updated_at).format('DD-MM-YYYY'),
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

  choosedDate(event: any) {
    this.getFeedbackData.get('from')?.setValue(new Date(event?.startDate?.$d).valueOf());
    this.getFeedbackData.get('to')?.setValue(new Date(event?.endDate?.$d).valueOf());
    this.getFeedbacks();
  }
}
