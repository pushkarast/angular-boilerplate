import { Component, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AdminService } from 'src/app/shared/services/admin-api/admin-api.service';
import { CommonService } from 'src/app/shared/services/common.service';
import { SpinnerService } from 'src/app/shared/services/spinner.service';
import { NotifierService } from 'src/app/shared/services/toaster.service';
import { Buffer } from 'buffer';
@Component({
  selector: 'app-astro-notice',
  templateUrl: './astro-notice.component.html',
  styleUrls: ['./astro-notice.component.css']
})
export class AstroNoticeComponent {
  modalRef?: BsModalRef;
  noticeData: FormGroup;
  permission: any;
  noticeList: any = [];
  page = 1;
  Image1: any;
  Image2: any;
  constructor(
    private _FormBuilder: FormBuilder,
    private _AdminService: AdminService,
    private _SpinnerService: SpinnerService,
    private _NotifierService: NotifierService,
    private modalService: BsModalService,
    private _ActivatedRoute: ActivatedRoute,
    private _CommonService: CommonService
  ) {
    this.noticeData = this._FormBuilder.group({
      id: [null],
      notiTitle: [null, Validators.required],
      notiContent: [null, Validators.required],
      image1: [null],
      image2: [null],
      update_at: [null],
      page: this.page
    });
  }
  ngOnInit(): void {
    this.getNotice();
    this._ActivatedRoute.queryParams.subscribe((params) => {
      if (params['permit'])
        this.permission = Buffer.from(params['permit'], 'base64').toString(
          'ascii'
        );
    });
  }
  getPermisson(p_type: any) {
    return this._CommonService.getPermission(this.permission, p_type);
  }
  getNotice(noticeId: any = null) {
    this.noticeList = [];
    this.noticeData.reset();
    this._SpinnerService.setState(true);
    this._AdminService
      .fetchNotice({ id: noticeId, page: this.page })
      .then((data) => {
        if (data?.status) {
          this?.noticeData?.patchValue(data?.data);
          this.noticeList = data?.data;
        }
        else {
          this._NotifierService.showError("Some Error Occurred");
        }
      });
    this._SpinnerService.setState(false);
  }
  onSubmit() {
    this._AdminService
      .editaddNotice(this.setFormData())
      .then((data) => {
        if (data?.status) {
          this._NotifierService.showSuccess("Success");
        }
        else {
          this._NotifierService.showError("Some Error Occurred");
        }
      });
    this.closeModal();
  }
  deletNotice(id: any) {
    this.noticeList = []
    this._AdminService
      .deleteNotice({ id: id })
      .then((data) => {
        if (data?.status) {
          this._NotifierService.showSuccess("Success");
        }
        else {
          this._NotifierService.showError("Some Error Occurred");
        }
      });
    this.getNotice();
  }
  openModal(template: TemplateRef<any>, blogId = null) {
    this.getNotice(blogId);
    this.modalRef = this.modalService.show(template, {
      backdrop: 'static',
      keyboard: false,
    });
  }
  closeModal(type = '') {
    this.noticeList = []
    this.getNotice();
    this.modalRef?.hide();
  }
  pagination($: any) {
    this.page = $.pageIndex + 1;
    this.getNotice();
  }
  fileupload(event: Event, imgType: any): void {
    if (event.target !== null) {
      const files = (<HTMLInputElement>event.target).files;
      if (files !== null) {
        const fileList: FileList = files;
        if (fileList && fileList.length > 0) {
          const file: File = fileList[0];
          if (imgType == "Image1") {
            console.log(file)
            this.noticeData.get('image1')?.setValue(file);
          } else
            this.noticeData.get('image2')?.setValue(file);
        }
      }
    }
  }
  setFormData() {
    const formData = new FormData();
    formData.set('id', this.noticeData.get('id')?.value)
    formData.set('notiTitle', this.noticeData.get('notiTitle')?.value)
    formData.set('notiContent', this.noticeData.get('notiContent')?.value)
    formData.set('image1', this.noticeData.get('image1')?.value)
    formData.set('image2', this.noticeData.get('image2')?.value)
    formData.set('update_at', this.noticeData.get('update_at')?.value)
    formData.set('page', this.noticeData.get('page')?.value)
    return formData;
  }
}
