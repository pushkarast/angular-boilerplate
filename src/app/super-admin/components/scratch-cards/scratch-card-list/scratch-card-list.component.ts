import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AdminService } from 'src/app/shared/services/admin-api/admin-api.service';
import { SpinnerService } from 'src/app/shared/services/spinner.service';
import option from "../../../../../assets/constants/ngSelectvalues"
import { NotifierService } from 'src/app/shared/services/toaster.service';

@Component({
  selector: 'app-scratch-card-list',
  templateUrl: './scratch-card-list.component.html',
  styleUrls: ['./scratch-card-list.component.css']
})
export class ScratchCardListComponent implements OnInit {
  modalRef?: BsModalRef
  scratchCardsList: any
  updateScratchCardData: FormGroup
  getList: FormGroup
  option = option.scratchType
  toggleButton = false
  freeOrPaidOption = option.freeOrPaidOption;
  discountList: any
  minAmtOrSepecificAmt = option.minAmtOrSepecificAmt;
  viewMoreCustomerList: any = []
  viewMoreAstrologerList: any = []
  rechargeListMore: any = []

  constructor(
    private modalService:BsModalService,
    private _AdminService:AdminService,
    private _SpinnerService:SpinnerService,
    private _FormBuilder: FormBuilder,
    private _NotifierService:NotifierService
  )
  {
    this.updateScratchCardData = this._FormBuilder.group({
      id: null,
      RatePerMin: 0,
      Min: 0,
      Type: [null],
      total: 0,
      discPer: 0,
      freeCheck: null,
      rechargeId: null,
      minOrSepecificAmt: null
    })
    this.getList = this._FormBuilder.group({
      page: 1,
      statusFilter: null
    })
    
  }

  ngOnInit(): void {
    this.getScratchCardsList()
  }

  getScratchCardsList() {
    this._SpinnerService.setState(true)
    this._AdminService.fetchScratchCards(this.getList.value).then((data)=>{
      if(data?.status){
        this.scratchCardsList=data?.data
      }
      this._SpinnerService.setState(false)
    })
  }

  deleteScratchCard(id: any) {
    this._AdminService.deleteScratchCard({  id: id }).then((data) => {
      if (data?.status) {
        this._NotifierService.showSuccess("Data Deleted");
        this.getScratchCardsList()
      }
    })
  }

  getSingleOfferData(id: any) {
    this._AdminService.getScratchCardById({  id: id }).then((data) => {
      if (data?.status) {
        this.updateScratchCardData.get('id')?.setValue(data?.data?.id)
        this.updateScratchCardData.get('Type')?.setValue(data?.data?.offerType)
        this.updateScratchCardData.get('RatePerMin')?.setValue(data?.data?.ratePerMin)
        this.updateScratchCardData.get('Min')?.setValue(data?.data?.min)

        if (this.updateScratchCardData.get('Type')?.value == '0' || this.updateScratchCardData.get('Type')?.value == '1') {
          this.updateScratchCardData.get('total')?.setValue(data?.data?.offerPrice)
        }
        else if (this.updateScratchCardData.get('Type')?.value == '2') {
          let rechargeIdArr = JSON.parse(data?.data?.referenceNo);
          if (rechargeIdArr.length == 1) {
            this.updateScratchCardData.get('minOrSepecificAmt')?.setValue('1')
          }
          else if (rechargeIdArr.length > 1) {
            this.updateScratchCardData.get('minOrSepecificAmt')?.setValue('0')
          }
          this.updateScratchCardData.get('discPer')?.setValue(data?.data?.offerPrice)
        }
      }
    })
  }

  openStatusModal(template: TemplateRef<any>, id: any) {
    this.getSingleOfferData(id)
    this.modalRef = this.modalService.show(template);
  }

  updateScratchCard() {
    this._AdminService.updateScratchCardById({  ...this.updateScratchCardData.value }).then((data) => {
      if (data?.status) {
        this._NotifierService.showSuccess("Data updated successfully");
        this.modalRef?.hide();
        this.getScratchCardsList()
      }
    })
  }

  setTotalValue(e: any) {
    let rate = this.updateScratchCardData.get('RatePerMin')?.value;
    let min = this.updateScratchCardData.get('Min')?.value;
    let total = rate*min;
    // console.log(rate, min);
    this.updateScratchCardData.get('total')?.setValue(total);
  }

  
  // disableRatePerMin(e: any) {
  //   // console.log(this.scratchCardData.get('freeCheck')?.value, 'event value check...')
  //     if (this.updateScratchCardData.get('freeCheck')?.value == '0') {
  //       this.updateScratchCardData.get('RatePerMin')?.value == 0
  //       this.toggleButton = true
  //     }
  //     else {
  //       this.toggleButton = false
  //     }
  // }

  onPaginateChange($: any) {
    this.getList.get('page')?.setValue($.pageIndex + 1);
    this.getScratchCardsList();
  }

  getDiscountDatas() {
    this._AdminService.getDiscountData().then((data) => {
      if (data?.status) {
        this.discountList = data?.data;
      }
    })
  }

  setFilter(e: any) {
    this.getList.get('statusFilter')?.setValue(e?.target.value);
    this.getScratchCardsList()
  }

  openDetailsModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {
      class: 'modal-lg',
      backdrop: 'static',
      keyboard: false,
    });
  }

  openAstroListModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {
      class: 'modal-lg',
      backdrop: 'static',
      keyboard: false,
    });
  }

  openRechargeListModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {
      class: 'modal-lg',
      backdrop: 'static',
      keyboard: false,
    });    
  }

  closeModal(type = '') {
    this.modalRef?.hide();
  }

  viewMoreList(list: []) {
    if (list?.length !== 0) {
      this.viewMoreCustomerList = list
    }
  }

  viewMoreAstroList(list: []) {
    if (list?.length !== 0) {
      this.viewMoreAstrologerList = list
    }
  }

  viewMoreRechargeList(list: []) {
    if (list?.length !== 0) {
      this.rechargeListMore = list
    }
  }

}
