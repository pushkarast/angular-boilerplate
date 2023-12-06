import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from 'src/app/shared/services/admin-api/admin-api.service';
import { NotifierService } from 'src/app/shared/services/toaster.service';
import * as moment from 'moment';
import { Subject, debounceTime, distinctUntilChanged } from 'rxjs';
import option from '../../../../../assets/constants/ngSelectvalues';
import { SpinnerService } from 'src/app/shared/services/spinner.service';
import * as XLSX from 'xlsx';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-astro-xps',
  templateUrl: './astro-xps.component.html',
  styleUrls: ['./astro-xps.component.css']
})
export class AstroXpsComponent {
  xpData: FormGroup
  result: any
  modalRef?: BsModalRef
  modifyXp: FormGroup

  constructor(
    private _AdminService: AdminService,
    private _NotifierService: NotifierService,
    private _FormBuilder: FormBuilder,
    private _SpinnerService: SpinnerService,
    private modalService: BsModalService,
    private _ActivatedRoute: ActivatedRoute
  ) {
    this.xpData = this._FormBuilder.group({
      astroId: null
    })
    this.modifyXp = this._FormBuilder.group({
      astroid: null,
      xp: 0
    })
  }

  ngOnInit(): void {
    this._ActivatedRoute.queryParams.subscribe((params) => {
      this.xpData.get('astroId')?.setValue(params['astroid']);
      this.modifyXp.get('astroid')?.setValue(params['astroid']);
    });
    this.getXpData();
  }

  getXpData() {
    this._SpinnerService.setState(true);
    this._AdminService.getAstrologerXp(this.xpData.value).then((data) => {
      if (data?.status) { 
        this.result = data?.data
        this._SpinnerService.setState(false);
        this.modifyXp.get('xp')?.setValue(0);
        this.closeModal()
      }
    });
  }

  updateXp() {
    this._SpinnerService.setState(true);
    this._AdminService.adminXpEdit(this.modifyXp.value).then((data) => {
      if (data?.status) { 
        this._NotifierService.showSuccess(data.message);
        this.getXpData()
      }
    });
  }

  openModel(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {
      class: 'modal-lg',
      backdrop: 'static',
      keyboard: false,
    });
  }

  closeModal(type = '') {
    this.modalRef?.hide();
  }
}
