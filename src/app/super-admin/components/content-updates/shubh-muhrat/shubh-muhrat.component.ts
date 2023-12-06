import { Component, TemplateRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AdminService } from 'src/app/shared/services/admin-api/admin-api.service';
import { CommonService } from 'src/app/shared/services/common.service';
import { SpinnerService } from 'src/app/shared/services/spinner.service';
import { NotifierService } from 'src/app/shared/services/toaster.service';
import { Buffer } from 'buffer';
import { FormBuilder, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-shubh-muhrat',
  templateUrl: './shubh-muhrat.component.html',
  styleUrls: ['./shubh-muhrat.component.css']
})
export class ShubhMuhratComponent {
  data: FormGroup;
  content: any;
  content2: any;
  list: any;
  permission: any;
  modalRef?: BsModalRef;
  currentid = null;
  constructor(
    private _AdminService: AdminService,
    private _SpinnerService: SpinnerService,
    private _NotifierService: NotifierService,
    private _ActivatedRoute: ActivatedRoute,
    private _FormBuilder: FormBuilder,
    private modalService: BsModalService
  ) {
    this.data = this._FormBuilder.group({
      title: [""],
      Descp: [""],
      Descp2: [""],
      id: [""],
      Slug: [""],
      type: ["shubhMuhrat"]
    })
  }
  config = {
    height: 500,
    selector: 'textarea#local-upload',
    block_unsupported_drop: false,
    image_title: true,
    automatic_uploads: true,
    toolbar_sticky: true,
    plugins: ["preview", "pagebreak", "lists", "link", "charmap", "table", "advlist", "table", "image"],
    toolbar:
      'undo redo| bold underline italic blocks | link image fontsize fontfamily | styles table | formatselect   |   backcolor forecolor | \
      alignleft aligncenter alignright alignjustify quicklink| pagebreak | \
      bullist numlist outdent indent | removeformat | help | wordcount '
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
  setData() {
    this.data.get('id')?.setValue(this.currentid);
    this.data.get('Descp')?.setValue(Buffer.from(this.content, 'utf8').toString('base64'))
    this.data.get('Descp2')?.setValue(Buffer.from(this.content2, 'utf8').toString('base64'))
    this.data.get('title')?.setValue(this.currentid == 0 ?
      Buffer.from(this.data.get('title')?.value, 'utf8').toString('base64') :
      this.data.get('title')?.value
    )
    this.data.get('type')?.setValue("shubhMuhrat");
    return this.data.value;
  }
  updateContent() {
    this._SpinnerService.setState(true);
    this._AdminService.updateContent(this.setData()).then((data) => {
      if (data?.status) {
        this._NotifierService.showSuccess('Update Success');
      } else {
        this._NotifierService.showError('Some Error Occurred');
      }
    });
    this._SpinnerService.setState(false);
    this.closeModal();
    this.showContent();
  }
  showContent(id = null) {
    this._SpinnerService.setState(true);
    this.content = "";
    this.content2 = "";
    this.list=[];
    this.data.reset();
    this._AdminService.showContent({ type: "shubhMuhrat", id: id }).then((data) => {
      if (data?.status) {
        if (id || id == 0) {
          this.data.get('title')?.setValue(id == 0
            ? Buffer?.from(data?.data?.Title, 'base64').toString()
            :
            data?.data?.Title
          );
          this.data.get('Descp')?.setValue(Buffer?.from(data?.data?.DescP, 'base64').toString());
          this.data.get('Descp2')?.setValue(Buffer?.from(data?.data?.DescP2, 'base64').toString());
        }
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
