import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AdminService } from 'src/app/shared/services/admin-api/admin-api.service';
import { CommonService } from 'src/app/shared/services/common.service';
import { SpinnerService } from 'src/app/shared/services/spinner.service';
import { NotifierService } from 'src/app/shared/services/toaster.service';
declare var CKEDITOR: any;
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Buffer } from 'buffer';
import option from '../../../../assets/constants/ngSelectvalues';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-horo-content',
  templateUrl: './horo-content.component.html',
  styleUrls: ['./horo-content.component.css'],
})
export class HoroContentComponent implements OnInit {
  @ViewChild('ckeditor') ckeditor: any;
  horoList: any;
  modalRef?: BsModalRef;
  permission: any;
  public Editor = ClassicEditor;
  horoData: FormGroup;
  desc: any;
  desc2: any;
  options = option.status;
  constructor(
    private _AdminService: AdminService,
    private _NotifierService: NotifierService,
    private _FormBuilder: FormBuilder,
    private _SpinnerService: SpinnerService,
    private modalService: BsModalService,
    private _CommonService: CommonService,
    private _ActivatedRoute: ActivatedRoute,
  ) {
    this.horoData = this._FormBuilder.group({
      Id: [null],
      type: [null, Validators.required],
      Title: [null, Validators.required],
      Status: [null, Validators.required],
      DescP: [null, Validators.required],
      DescP2: [null, Validators.required],
    });
  }

  ngOnInit(): void {
    this.fetchHoroContent();
    this._ActivatedRoute.queryParams.subscribe((params) => {
      if (params['permit'])
        this.permission = Buffer.from(params['permit'], 'base64').toString(
          'ascii'
        );
    });
  }
  fetchHoroContent(id = null) {
    this._SpinnerService.setState(true);
    this._AdminService.getHorocontent({ id: id }).then((data) => {
      if (data?.status) {
        if (id) {
          this.horoData.patchValue(data?.data);
          this.horoData
            .get('DescP')
            ?.setValue(Buffer?.from(data?.data?.DescP, 'base64').toString());
          this.horoData
            .get('DescP2')
            ?.setValue(Buffer?.from(data?.data?.DescP2, 'base64').toString());
        } else this.horoList = data?.data?.type;
        console.log(this.horoData?.value)

      }
    });
    this._SpinnerService.setState(false);
  }
  openModal(template: TemplateRef<any>, id = null) {
    this.fetchHoroContent(id);
    this.modalRef = this.modalService.show(template, {
      class: 'modal-xl',
      backdrop: 'static',
      keyboard: false,
    });
  }
  closeModal() {
    this.horoData.reset();
    this.modalRef?.hide();
    this.fetchHoroContent();
  }
  getPermisson(p_type: any) {
    return this._CommonService.getPermission(this.permission, p_type);
  }
  setDescr(editor: any, type: any) {
    if (type == 'desc') this.desc = editor.editor.getData();
    else if (type == 'desc2') this.desc2 = editor.editor.getData();
  }
  onSubmit() {
    this.horoData
      .get('DescP')
      ?.setValue(Buffer.from(this.desc, 'utf8').toString('base64'));
    this.horoData
      .get('DescP2')
      ?.setValue(Buffer.from(this.desc2, 'utf8').toString('base64'));
    this._AdminService.updateHorocontent(this.horoData.value).then((data) => {
      if (data?.status) {
        this._NotifierService.showSuccess('Data Updated');
        this.closeModal();
      } else this._NotifierService.showError(data?.message);
    });
  }
}
