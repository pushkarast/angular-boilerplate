import { Component, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Buffer } from 'buffer';
import option from '../../../../../assets/constants/ngSelectvalues';
import { AdminService } from 'src/app/shared/services/admin-api/admin-api.service';
import { SpinnerService } from 'src/app/shared/services/spinner.service';
import { NotifierService } from 'src/app/shared/services/toaster.service';
import { ActivatedRoute } from '@angular/router';
import { CommonService } from 'src/app/shared/services/common.service';

@Component({
  selector: 'app-tech-comments',
  templateUrl: './tech-comments.component.html',
  styleUrls: ['./tech-comments.component.css']
})
export class TechCommentsComponent {
  commentForm: FormGroup;
  vid: any;
  permission: any;
  videoList: any;
  show = false;
  modalRef?: BsModalRef;
  filter = "None";
  page = 1;
  option = option.commentFilter;
  constructor(
    private _FormBuilder: FormBuilder,
    private _AdminService: AdminService,
    private _SpinnerService: SpinnerService,
    private _NotifierService: NotifierService,
    private modalService: BsModalService,
    private _ActivatedRoute: ActivatedRoute,
    private _CommonService: CommonService
  ) {
    this.commentForm = this._FormBuilder.group({
      id: [''],
      review: [null],
      video_id: [this.vid],
      status: [''],
      reply: [''],
      is_deleted: [''],
    });
  }
  ngOnInit(): void {
    this._ActivatedRoute.queryParams.subscribe((params) => {
      this.vid = params['vid'];
      if (params['permit'])
        this.permission = Buffer.from(params['permit'], 'base64').toString(
          'ascii'
        );
    });
    this.fetchComments();
  }
  fetchComments(id = null) {
    this.videoList = [];
    this._SpinnerService.setState(true);
    this._AdminService
      .fetchTechcomments({ vid: this.vid, id: id, page: this.page, filter: this.filter })
      .then((data) => {
        if (data?.status) {
          if (id) {
            this.commentForm.get('id')?.setValue(id);
            this.commentForm.get('review')?.setValue(data?.data?.message);
            this.commentForm.get('video_id')?.setValue(data?.data?.post_id);
            this.commentForm.get('status')?.setValue(data?.data?.approved);
            this.commentForm.get('reply')?.setValue(data?.data?.reply?.message);
            this.commentForm
              .get('is_deleted')
              ?.setValue(data?.data?.is_deleted);
            this._SpinnerService.setState(false);
          } else { this.videoList = data?.data; }

        }
      });
    this._SpinnerService.setState(false);
  }
  updateReview(statusUpdate = false) {
    this._SpinnerService.setState(true);
    this._AdminService
      .updateTechcomments(this.commentForm?.value)
      .then((data) => {
        if (data?.status) {
          this._NotifierService.showSuccess('Data Update Successfully');
          this.closeModal();
        }
      });
    this._SpinnerService.setState(false);
  }
  openModal(template: TemplateRef<any>, id: any) {
    // console.log(prevTags, 'prev tagss')
    this.fetchComments(id);
    this.modalRef = this.modalService.show(template, {
      backdrop: 'static',
      keyboard: false,
    });
  }
  closeModal() {
    this.show = false;
    this.commentForm.reset();
    this.modalRef?.hide();
    this.fetchComments();
  }
  StatusEdit(status = "0", id: any, is_deleted = "0") {
    this._SpinnerService.setState(true);
    this.commentForm.get('id')?.setValue(id);
    this.commentForm.get('status')?.setValue(status);
    this.commentForm.get('is_deleted')?.setValue(is_deleted);
    this._AdminService.updateTechcomments(this.commentForm?.value);
    this.fetchComments(); //filling formgroup
    this._SpinnerService.setState(false);
    this._NotifierService.showSuccess('Status Updated');
  }
  onPaginateChange($: any) {
    this.page = $.pageIndex + 1;
    this.fetchComments();
  }
  setFilter(event: any) {
    this.filter = event.value;
    this.fetchComments()
  }
}
