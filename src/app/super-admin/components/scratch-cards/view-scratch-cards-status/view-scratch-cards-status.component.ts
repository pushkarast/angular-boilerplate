import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AdminService } from 'src/app/shared/services/admin-api/admin-api.service';
import { SpinnerService } from 'src/app/shared/services/spinner.service';
import option from "../../../../../assets/constants/ngSelectvalues"
import { NotifierService } from 'src/app/shared/services/toaster.service';
import { Subject, debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-view-scratch-cards-status',
  templateUrl: './view-scratch-cards-status.component.html',
  styleUrls: ['./view-scratch-cards-status.component.css']
})
export class ViewScratchCardsStatusComponent {
  getData: FormGroup
  cardList: any = []
  scratchCardFilter = option.scratchCardFilter
  pageRef = 0
  modelChanged: Subject<any> = new Subject<any>();
  summaryCount: any = null
  modalRef?: BsModalRef
  viewMoreAstrologerList: any = []
  rechargeListMore: any = []
  
  constructor(
    private modalService:BsModalService,
    private _AdminService:AdminService,
    private _SpinnerService:SpinnerService,
    private _FormBuilder: FormBuilder,
    private _NotifierService:NotifierService
  ) {
    this.getData = this._FormBuilder.group({
      page: 1,
      search: '',
      cardFilter: null
    })
  }

  ngOnInit(): void {
    this.modelChanged.pipe(debounceTime(300), distinctUntilChanged()).subscribe((val) => {
      this.getData.get('search')?.setValue(val?.search)
      this.getCardData();
    });
    this.getCardData()   
  }

  getCardData() {
    this._SpinnerService.setState(true)
    this._AdminService.getScratchCardAcCustomers(this.getData.value).then((data)=>{
      if(data?.status){
        this.cardList=data?.data
        this.summaryCount = data?.data?.summaryCount
      }
      this._SpinnerService.setState(false)
    })
  }
  onPaginateChange($: any) {
    this.getData.get('page')?.setValue($.pageIndex + 1);
    this.getCardData();
  }

  handleGoto(id: any) {
    this.getData.get('page')?.setValue(id);
    this.pageRef = id - 1
    this.getCardData();
  }

  search(event: any) {
    this.modelChanged.next({ search: event.target.value })
  }

  openAstroListModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {
      class: 'modal-lg',
      backdrop: 'static',
      keyboard: false,
    });
  }

  closeModal(type = '') {
    this.modalRef?.hide();
  }

  viewMoreAstroList(list: []) {
    if (list?.length !== 0) {
      this.viewMoreAstrologerList = list
    }
  }

  openRechargeListModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {
      class: 'modal-lg',
      backdrop: 'static',
      keyboard: false,
    });    
  }

  viewMoreRechargeList(list: []) {
    if (list?.length !== 0) {
      this.rechargeListMore = list
    }
  }
}
