import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AdminService } from 'src/app/shared/services/admin-api/admin-api.service';
import { CommonService } from 'src/app/shared/services/common.service';
import { SpinnerService } from 'src/app/shared/services/spinner.service';
import { NotifierService } from 'src/app/shared/services/toaster.service';
import { Buffer } from 'buffer';
@Component({
  selector: 'app-astro-promo-videos',
  templateUrl: './astro-promo-videos.component.html',
  styleUrls: ['./astro-promo-videos.component.css'],
})
export class AstroPromoVideosComponent implements OnInit {
  videoData: FormGroup;
  astroId: any;
  videoList: any;
  fileViewer: any = 'No file Selected';
  permission: any;
  show = false;
  modalRef?: BsModalRef;
  prof: any;
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
    this.videoData = this._FormBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      link: ['', Validators.required],
      image: ['', Validators.required],
      id: [''],
      astroid: [this.astroId],
    });
  }
  ngOnInit(): void {
    this._ActivatedRoute.queryParams.subscribe((params) => {
      this.astroId = params['astroid'];
      this.prof = params['prof'];
      if (params['permit'])
        this.permission = Buffer.from(params['permit'], 'base64').toString(
          'ascii'
        );
    });
    this.fetchVideos();
  }
  fetchVideos(videoId: any = null) {
    this._SpinnerService.setState(true);
    this._AdminService
      .getAstroPromoVideos({ astroId: this.astroId, videoId: videoId ,page:this.page })
      .then((data) => {
        if (data?.status) {
          if (videoId) this.videoData.patchValue(data?.data);
          else this.videoList = data?.data;
          this._SpinnerService.setState(false);
        }
      });
  }
  fileupload(event: Event): void {
    if (event.target !== null) {
      const files = (<HTMLInputElement>event.target).files;
      if (files !== null) {
        const fileList: FileList = files;
        if (fileList && fileList.length > 0) {
          const file: File = fileList[0];
          this.videoData.get('image')?.setValue(file);
          this.fileViewer = file.name;
        }
      }
    }
  }
  onSubmit() {
    this._SpinnerService.setState(true);
    this._AdminService.addUpdatepromovideo(this.setFormData()).then((data) => {
      if (data?.status) {
        this.fetchVideos();
        this.closeModal();
      }
    });
  }
  getPermisson(p_type: any) {
    return this._CommonService.getPermission(this.permission, p_type);
  }
  closeModal() {
    this.show = false;
    this.videoData.reset();
    this.modalRef?.hide();
    this.fetchVideos();
  }
  openModal(videoId = null, template: TemplateRef<any>) {
    if (videoId) this.fetchVideos(videoId);
    this.modalRef = this.modalService.show(template, {
      class: 'modal-xl',
      backdrop: 'static',
      keyboard: false,
    });
  }
  setFormData() {
    const formData = new FormData();
    formData.set('title', this.videoData.get('title')?.value);
    formData.set('description', this.videoData.get('description')?.value);
    formData.set('link', this.videoData.get('link')?.value);
    formData.set('image', this.videoData.get('image')?.value);
    formData.set('id', this.videoData.get('id')?.value);
    formData.set('astroid', this.astroId);
    return formData;
  }
  onPaginateChange($: any) {
    this.page = $.pageIndex + 1;
    this.fetchVideos();
  }
}
