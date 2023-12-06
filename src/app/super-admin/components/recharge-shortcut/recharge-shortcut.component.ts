import { Component, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';
import { AdminService } from 'src/app/shared/services/admin-api/admin-api.service';
import { CommonService } from 'src/app/shared/services/common.service';
import { SpinnerService } from 'src/app/shared/services/spinner.service';
import { NotifierService } from 'src/app/shared/services/toaster.service';
import option from '../../../../assets/constants/ngSelectvalues';

@Component({
  selector: 'app-recharge-shortcut',
  templateUrl: './recharge-shortcut.component.html',
  styleUrls: ['./recharge-shortcut.component.css']
})
export class RechargeShortcutComponent {
  modelChanged: Subject<any> = new Subject<any>();
  rechargeData: FormGroup;
  modalData: any = [];
  rechargeList: any = []
  page: number = 1;
  permission: any;
  modalRef?: BsModalRef;
  statusOptions = option?.status
  constructor(
    private _AdminService: AdminService,
    private _NotifierService: NotifierService,
    private _FormBuilder: FormBuilder,
    private _SpinnerService: SpinnerService,
    private modalService: BsModalService,
    private _CommonService: CommonService
  ) {
    this.rechargeData = this._FormBuilder.group({
      id: [],
      firstUserdis: [0],
      secondUserdis: [0],
      thirdUserdis: [0],
      allUserdis: [0],
      isFirstActive: [0],
      isSecondActive: [0],
      isThirdActive: [0],
      isAllActive: [0],
      amount: [],
      status: []
    })
  }

  ngOnInit(): void {
    this.getRecharges();
  }
  getRecharges(id = null) {
    this._AdminService.getRecharges({ id: id }).then((data) => {
      if (data?.status) {
        if (id) {
          this.setFormData(id, data?.data)
        }
        else
          this.rechargeList = data?.data
      }
    });
  }
  getPermisson(p_type: any) {
    return this._CommonService.getPermission(this.permission, p_type)
  }
  openModal(template: TemplateRef<any>, id: any) {
    console.log(id)
    this.getRecharges(id);
    this.modalRef = this.modalService.show(template, {
      class: 'modal-md',
      backdrop: 'static',
      keyboard: false,
    });
  }
  closeModal() {
    this.rechargeData.reset();
    this.modalRef?.hide();
    this.getRecharges();
  }
  setFormData(id: any, data: any) {
    this.rechargeData.get('id')?.setValue(id);
    this.rechargeData.get('amount')?.setValue(data?.amount);
    this.rechargeData.get('status')?.setValue(data?.status);
    this.rechargeData.get('firstUserdis')?.setValue(data?.firstUserdis?.discount);
    this.rechargeData.get('secondUserdis')?.setValue(data?.secondUserdis?.discount);
    this.rechargeData.get('thirdUserdis')?.setValue(data?.thirdUserdis?.discount);
    this.rechargeData.get('allUserdis')?.setValue(data?.allUserdis?.discount);
    this.rechargeData.get('isFirstActive')?.setValue(data?.firstUserdis?.is_active);
    this.rechargeData.get('isSecondActive')?.setValue(data?.secondUserdis?.is_active);
    this.rechargeData.get('isThirdActive')?.setValue(data?.thirdUserdis?.is_active);
    this.rechargeData.get('isAllActive')?.setValue(data?.allUserdis?.is_active);
  }
  onSubmit() {
    this._AdminService.updateRecharges(this.rechargeData.value).then((data) => {
      if (data?.status) {
        this._NotifierService.showSuccess(data?.message)
      }
      else
        this._NotifierService.showError(data?.message)
    });
    this.closeModal();
  }
  deleteRecharge(id: any) {
    this._AdminService.deleteRecharges({ id: id }).then((data) => {
      if (data?.status) {
        this._NotifierService.showSuccess(data?.message)
      }
      else
        this._NotifierService.showError(data?.message)
    });
    this.rechargeData.reset();
    this.getRecharges();
  }
}
