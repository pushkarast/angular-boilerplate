import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AdminService } from 'src/app/shared/services/admin-api/admin-api.service';
import { SpinnerService } from 'src/app/shared/services/spinner.service';
import { NotifierService } from 'src/app/shared/services/toaster.service';
import option from '../../../../../assets/constants/ngSelectvalues';
import * as moment from 'moment';

@Component({
  selector: 'app-manage-service-astro-relation',
  templateUrl: './manage-service-astro-relation.component.html',
  styleUrls: ['./manage-service-astro-relation.component.css'],
})
export class ManageServiceAstroRelationComponent implements OnInit {
  updateAstroService: any;
  serviceData: any;
  modalRef?: BsModalRef;
  astroList: any;
  selectedAstrologer: any = [];
  astroServiceRelation: any;
  pagination:any
  items:any
  status=option.statusString
  constructor(
    private modalService: BsModalService,
    private _AdminService: AdminService,
    private _NotifierService: NotifierService,
    private _SpinnerService: SpinnerService,
    private _FormBuilder: FormBuilder,
    private _ActivatedRoute: ActivatedRoute
  ) {
    this.updateAstroService = new FormGroup({
      items: new FormArray([], Validators.required),
    });
  }

  ngOnInit(): void {
    this._ActivatedRoute.queryParams.subscribe((params: any) => {
      this.serviceData = params;
      this.getServiceAstrologer(params?.serviceId);
    });

    this.getAstroList();
  }

  getAstroList() {
    this._AdminService.getAstroListForDropDown().then((data) => {
      if (data?.status) {
        this.astroList = data?.data;
        
      }
    });
  }

  createItem(): FormGroup {
    return this._FormBuilder.group({
      servicePrice: [0.0],
      astroCommission: [50.0],
      magCommission: [50.0],
      status: ['1'],
      fullname:[''],
      id:[''],
      image:[''],
      scheduledOn:[null],
      scheduledStamp:[null],
      currentStamp:[null],
      quantity:[0]
    });
  }

  clearAllItem(){
    this.items = this.updateAstroService.get('items') as FormArray;
    while (this.items.length !== 0) {
      this.items.removeAt(0)
    }
  }

  openModal(template: TemplateRef<any>, blogId = null) {
    this.modalRef = this.modalService.show(template, {
      class: 'modal-lg',
      backdrop: 'static',
      keyboard: false,
    });
  }

  closeModal(type = '') {
    this.modalRef?.hide();
    this.selectedAstrologer = [];
  }

  getServiceAstrologer(serviceId: any,page:any=1) {
    this._SpinnerService.setState(true);
    this._AdminService
      .getServiceAstroList({ serviceId: serviceId,page:page })
      .then((data) => {
        if (data?.status) {
          this.astroServiceRelation = data?.data?.astroServiceList;
          this.pagination=data?.data
          this.updateAstroService.reset()
          this.clearAllItem()
          this.items = this.updateAstroService.get('items') as FormArray;
          this.astroServiceRelation?.map((element: any, index: any) => {
          this.items.push(this.createItem());
          this.items.at(index).patchValue(element)
          console.log(element?.scheduledOn);
          this.items.at(index).get('scheduledStamp').setValue(element?.scheduledOn)
          this.items.at(index).get('currentStamp').setValue(element?.currentDate)
          
          if(element?.scheduledOn){
            this.items.at(index).get('scheduledOn').setValue(moment(element?.scheduledOn)?.format('YYYY-MM-DDTHH:mm'))
          }   
        })
        }
        this._SpinnerService.setState(false);
      });
  }

  onPaginateChange($: any) {
    // this.getSupportTickets.get('page')?.setValue($.pageIndex + 1);
    // this.getAllTickets();
    this.getServiceAstrologer(this.serviceData?.serviceId,$.pageIndex + 1);
  }

  deleteAstrologer(id:any){
    this._SpinnerService.setState(true);
      this._AdminService
        .deleteAstroService({
          serviceId:this.items.at(id).get('id').value,
        })
        .then((data) => {
          if (data.status) {
            this._NotifierService.showSuccess('Astrologer Deleted Succesfully');
            this.getServiceAstrologer(this.serviceData?.serviceId)
          } else {
            this._NotifierService.showError('Something went wrong');
          }
          this._SpinnerService.setState(false);
        });
  }

  updateAstrologers() {
    this._SpinnerService.setState(true);
    if (this.selectedAstrologer?.length !== 0 && this.serviceData?.serviceId) {
      this._AdminService
        .addAstrologerToService({
          astroIdList: this.selectedAstrologer,
          serviceId: this.serviceData?.serviceId,
          broadcastType:this.serviceData?.type
        })
        .then((data) => {
          if (data.status) {
            this._NotifierService.showSuccess('Astrologer Added Succesfully');
            this.closeModal();
            this.getServiceAstrologer(this.serviceData?.serviceId)
          } else {
            this._NotifierService.showError('Something went wrong');
          }
          this._SpinnerService.setState(false);
        });
    } else {
      this._NotifierService.showError('Please Enter Valid Data');
    }
  }

  handleCommissionChange(index:any){
    let com:any=parseFloat(this.items.at(index).get('astroCommission').value).toFixed(2);
    this.items.at(index).get('magCommission').setValue((100-com).toFixed(2))
  }

  updateAstroServiceData(index:any){
    this._SpinnerService.setState(true)

    if(this.serviceData?.type=='1'){
      this.items.at(index).get('scheduledOn')?.setValue(new Date(this.items.at(index).get('scheduledOn').value).toISOString())
    }

    this._AdminService.updateAstrologerService(this.items.at(index).value).then(data=>{
      if(data?.status){
        this._NotifierService.showSuccess('Data Updated Successfully')
        this.getServiceAstrologer(this.serviceData?.serviceId)
      }else{
        this._NotifierService.showError('Something went wrong')
      }
      this._SpinnerService.setState(false)
    })
  }
}
