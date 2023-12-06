import { Component, TemplateRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from 'src/app/shared/services/admin-api/admin-api.service';
import { CommonService } from 'src/app/shared/services/common.service';
import { SpinnerService } from 'src/app/shared/services/spinner.service';
import { NotifierService } from 'src/app/shared/services/toaster.service';
import { Buffer } from 'buffer';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
@Component({
  selector: 'app-policy',
  templateUrl: './policy.component.html',
  styleUrls: ['./policy.component.css']
})
export class PolicyComponent {
  content: any;
  list: any;
  permission: any;
  modalRef?: BsModalRef;
  currentid = null;
  config = {
    height: 500,
    block_unsupported_drop: false,
    image_title: true,
    automatic_uploads: true,
    plugins: ["preview", "pagebreak", "lists", "link", "charmap", "table", "advlist", "table"],
    toolbar:
      'undo redo| bold underline italic blocks | link fontsize fontfamily | styles table | formatselect   |   backcolor forecolor | \
      alignleft aligncenter alignright alignjustify quicklink| pagebreak | \
      bullist numlist outdent indent | removeformat | help | wordcount'
  }
  constructor(
    private _AdminService: AdminService,
    private _SpinnerService: SpinnerService,
    private _NotifierService: NotifierService,
    private _ActivatedRoute: ActivatedRoute,
    private _CommonService: CommonService,
    private modalService: BsModalService
  ) {

  }
  ngOnInit(): void {
    this.showContent();
    this._ActivatedRoute.queryParams.subscribe((params) => {
      if (params['permit'])
        this.permission = Buffer.from(params['permit'], 'base64').toString(
          'ascii'
        );
    });
  }

  updateContent() {
    const encyContent = Buffer.from(this.content, 'utf8').toString('base64');
    this._SpinnerService.setState(true);
    this._AdminService.updateContent({ type: "policy", content: encyContent, id: this.currentid }).then((data) => {
      if (data?.status) {
        this._NotifierService.showSuccess('Update Success');
      } else {
        this._NotifierService.showError('Some Error Occurred');
      }
    });
    this.showContent();
    this._SpinnerService.setState(false);
    this.closeModal();
  }
  showContent(id = null) {
    this._SpinnerService.setState(true);
    this.content = "";
    this._AdminService.showContent({ type: "policy", id: id }).then((data) => {
      if (data?.status) {
        if (id)
          this.content = Buffer?.from(data?.data?.DescP, 'base64').toString();
        else
          this.list = data?.data
      } else {
        this._NotifierService.showError('Some Error Occurred');
      }
    });
    this._SpinnerService.setState(false);
  }
  openModal(id: any, template: TemplateRef<any>) {
    this.currentid = id;
    this.showContent(id);
    this.modalRef = this.modalService.show(template, { class: 'modal-xl', backdrop: "static", keyboard: false });
  }
  closeModal() {
    this.modalRef?.hide();
    this.showContent();
    this.currentid = null;
  }
}
