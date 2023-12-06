import { Component, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AdminService } from 'src/app/shared/services/admin-api/admin-api.service';
import { CommonService } from 'src/app/shared/services/common.service';
import { SpinnerService } from 'src/app/shared/services/spinner.service';
import { NotifierService } from 'src/app/shared/services/toaster.service';
import { Buffer } from 'buffer'
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { NgbdSortableHeader } from 'src/app/shared/directives/sortable';

@Component({
  selector: 'app-tech-supportvid',
  templateUrl: './tech-supportvid.component.html',
  styleUrls: ['./tech-supportvid.component.css']
})
export class TechSupportvidComponent {
  videoData: FormGroup;
  astroId: any;
  videoList: any;
  fileViewer: any = 'No file Selected';
  permission: any;
  show = false;
  modalRef?: BsModalRef;
  prof: any;
  page = 1;
  type = null;
  tabOption = 1;
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
      title: [null],
      description: [null],
      id: [null],
      videoLength: [null],
      video: [null],
      image: [null],
      type: [null]
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
      .getTechsupport({ id: videoId, page: this.page, videoType: this.type })
      .then((data) => {
        if (data?.status) {
          if (videoId) this.videoData.patchValue(data?.data);
          else this.videoList = data?.data?.videos;
          this._SpinnerService.setState(false);
        }
      });
  }
  fileupload(event: Event, type: any): void {
    if (event.target !== null) {
      const files = (<HTMLInputElement>event.target).files;
      if (files !== null) {
        const fileList: FileList = files;
        if (fileList && fileList.length > 0) {
          const file: File = fileList[0];
          if (type == "image")
            this.videoData.get('image')?.setValue(file);
          if (type == "video")
            this.videoData.get('video')?.setValue(file);
          this.fileViewer = file.name;
        }
      }
    }
  }
  deleteVideo(id = null) {
    this._AdminService.deleteTechsupport({ id: id }).then((data) => {
      if (data?.status) {
        this.fetchVideos();
      }
    });
  }
  onSubmit() {
    this._SpinnerService.setState(true);
    this._AdminService.uploadAddtechsupport(this.setFormData()).then((data) => {
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
    formData.set('image', this.videoData.get('image')?.value);
    formData.set('video', this.videoData.get('video')?.value);
    formData.set('videoLength', this.videoData.get('videoLength')?.value);
    formData.set('id', this.videoData.get('id')?.value);
    formData.set('astroid', this.astroId);
    formData.set('videoType', this.videoData.get('type')?.value);
    return formData;
  }
  onPaginateChange($: any) {
    this.page = $.pageIndex + 1;
    this.fetchVideos();
  }
  setTabOption(id, type) {
    this.videoData.get('type')?.setValue(type);
    this.tabOption = id;
    this.type = type
    this.fetchVideos();
  }
  drop(event: any) {
    const data = {
      vid: event.item.data.id,
      sort_id: event.currentIndex,
      prevsort_id: event.previousIndex,
      type: "TV"
    }
    
    this._AdminService.changevidOrder(data).then((data) => {
      if (data?.status) {
        this.fetchVideos();
      }
    });
  }
}
