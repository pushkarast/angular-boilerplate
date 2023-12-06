import { Component, TemplateRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AdminService } from 'src/app/shared/services/admin-api/admin-api.service';
import { CommonService } from 'src/app/shared/services/common.service';
import { SpinnerService } from 'src/app/shared/services/spinner.service';
import { NotifierService } from 'src/app/shared/services/toaster.service';
import { Buffer } from 'buffer';
import option from '../../../../assets/constants/ngSelectvalues';

@Component({
  selector: 'app-offer-popup',
  templateUrl: './offer-popup.component.html',
  styleUrls: ['./offer-popup.component.css'],
})
export class OfferPopupComponent implements OnInit {
  permission: any;
  modalRef?: BsModalRef;
  popupList: any;
  popupData: FormGroup;
  type = option.popupType;
  status = option.status;
  redirection = option.popupRedirection;
  redirectTo = option.popupRedirect_to;
  fileViewer: any = 'No file Selected';
  page = 1;
  constructor(
    private _FormBuilder: FormBuilder,
    private _AdminService: AdminService,
    private _SpinnerService: SpinnerService,
    private _NotifierService: NotifierService,
    private modalService: BsModalService,
    private _ActivatedRoute: ActivatedRoute,
    private _CommonService: CommonService
  ) {
    this.popupData = this._FormBuilder.group({
      id: [],
      title: [null, Validators.required],
      image: [null],
      type: [null, Validators.required],
      status: [null, Validators.required],
      redirection: [null, Validators.required],
      priority: [null, Validators.required],
      redirection_type: [],
      link: [],
      blog_id: [],
      astro_id: [],
      recharge: [],
    });
  }
  ngOnInit(): void {
    this.fetchPopups();
    this._ActivatedRoute.queryParams.subscribe((params) => {
      if (params['permit'])
        this.permission = Buffer.from(params['permit'], 'base64').toString(
          'ascii'
        );
    });
  }
  fetchPopups(id = null) {
    this._SpinnerService.setState(true);
    this._AdminService.fetchPopups({ id: id }).then((data) => {
      if (data?.status) {
        if (id) {
          this.popupData.patchValue(data?.data);
        } else this.popupList = data?.data;
      }
    });
    this._SpinnerService.setState(false);
  }
  openModal(template: TemplateRef<any>, id = null) {
    if (id) {
      this.fetchPopups(id);
    }
    this.modalRef = this.modalService.show(template, {
      class: 'modal-xl',
      backdrop: 'static',
      keyboard: false,
    });
  }
  closeModal(type = '') {

    this.modalRef?.hide();
    this.fetchPopups();
    this.popupData.reset();
  }
  pagination($: any) {
    this.page = $.pageIndex + 1;
    this.fetchPopups();
  }
  onSubmit() {
    console.log(this.popupData.value);
    this._AdminService.addUpdatePopup(this.setFormData()).then((data) => {
      if (data.status) {
        this._NotifierService.showSuccess("Success")
      }
      else
        this._NotifierService.showError(data?.message);
    });
    this.closeModal();
  }
  fileupload(event: Event): void {
    if (event.target !== null) {
      const files = (<HTMLInputElement>event.target).files;
      if (files !== null) {
        const fileList: FileList = files;
        if (fileList && fileList.length > 0) {
          const file: File = fileList[0];
          this.popupData.get('image')?.setValue(file);
          this.fileViewer = file.name;
        }
      }
    }
  }
  getPermisson(p_type: any) {
    return this._CommonService.getPermission(this.permission, p_type)
  }
  setFormData() {
    const formData = new FormData();
    formData.set('id', this.popupData.get('id')?.value);
    formData.set('title', this.popupData.get('title')?.value);
    formData.set('image', this.popupData.get('image')?.value);
    formData.set('type', this.popupData.get('type')?.value);
    formData.set('status', this.popupData.get('status')?.value);
    formData.set('redirection', this.popupData.get('redirection')?.value);
    formData.set('priority', this.popupData.get('priority')?.value);
    formData.set('redirection_type', this.popupData.get('redirection_type')?.value);
    formData.set('link', this.popupData.get('link')?.value);
    formData.set('blog_id', this.popupData.get('blog_id')?.value);
    formData.set('astro_id', this.popupData.get('astro_id')?.value);
    formData.set('recharge', this.popupData.get('recharge')?.value);
    return formData;
  }
  deletePopup(id: any) {
    this._AdminService.deletePopup({ id: id }).then((data) => {
      if (data.status) {
        this._NotifierService.showSuccess("Deleted");
        this.fetchPopups();
      }
      else
        this._NotifierService.showError(data.message)
    });
  }
}
