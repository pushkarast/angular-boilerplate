import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AdminService } from 'src/app/shared/services/admin-api/admin-api.service';

@Component({
  selector: 'app-master-detail',
  templateUrl: './master-detail.component.html',
  styleUrls: ['./master-detail.component.css']
})
export class MasterDetailComponent implements OnInit {

  masterList: any;
  masterData: FormGroup;
  modalRef?: BsModalRef;
  constructor(
    private _AdminService: AdminService,
    private _FormBuilder: FormBuilder,
    private modalService: BsModalService,
    private _ActivatedRoute: ActivatedRoute
  ) {
    this.masterData = this._FormBuilder.group({
      id: [null],
      masterId: [null],
      masterDetailName: [null],
      description: [null]
    })
  }
  ngOnInit(): void {
    this.getMasterdata();
  }
  getMasterdata(id = null) {
    this._ActivatedRoute.queryParams.subscribe(params => {
      this.masterData.get('masterId')?.setValue(params["mid"])
    })
    this.masterData.get('id')?.setValue(id);
    this._AdminService.getMasterDetailData(this.masterData?.value).then((data) => {
      if (data?.status) {
        if (id) {
          this.masterData.patchValue(data?.data[0]);
        }
        else
          this.masterList = data?.data;
        console.log(this.masterData?.value)
      }
    })
  }
  updateMaster() {
    this._AdminService.updateDetailData(this.masterData.value).then((data) => {
      if (data?.status)
        this.closeModal();
    });
  }
  openModal(template: TemplateRef<any>, id = null) {
    this.getMasterdata(id)
    this.modalRef = this.modalService.show(template, { class: 'modal-xl', backdrop: "static", keyboard: false });
  }
  closeModal() {
    this.masterData.reset();
    this.modalRef?.hide();
    this.getMasterdata()
  }
}
