import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AdminService } from 'src/app/shared/services/admin-api/admin-api.service';

@Component({
  selector: 'app-master',
  templateUrl: './master.component.html',
  styleUrls: ['./master.component.css']
})
export class MasterComponent implements OnInit {
  masterList: any;
  masterData: FormGroup;
  modalRef?: BsModalRef;
  constructor(
    private _AdminService: AdminService,
    private _FormBuilder: FormBuilder,
    private modalService: BsModalService
  ) {
    this.masterData = this._FormBuilder.group({
      id: [null],
      masterName: [null],
      description: [null]
    })
  }
  ngOnInit(): void {
    this.getMasterdata();
  }
  getMasterdata(masterId = null) {
    this._AdminService.getMasterData({ masterId: masterId }).then((data) => {
      this.masterData.reset();
      if (data?.status) {
        if (masterId) {
          this.masterData.patchValue(data?.data[0]);
        }
        else
          this.masterList = data?.data;
        console.log(this.masterData?.value)
      }
    })
  }
  updateMaster() {
    this._AdminService.updateMasterData(this.masterData.value).then((data) => {
      if (data?.status)
        this.closeModal();
    });
  }
  openModal(template: TemplateRef<any>, masterId = null) {
    this.getMasterdata(masterId)
    this.modalRef = this.modalService.show(template, { class: 'modal-xl', backdrop: "static", keyboard: false });
  }
  closeModal() {
    this.masterData.reset();
    this.modalRef?.hide();
    this.getMasterdata()
  }
}
