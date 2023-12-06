import { Component, ViewChild, TemplateRef } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AdminService } from 'src/app/shared/services/admin-api/admin-api.service';
import { SpinnerService } from 'src/app/shared/services/spinner.service';
import { NotifierService } from 'src/app/shared/services/toaster.service';
import option from "../../../../assets/constants/ngSelectvalues"
@Component({
  selector: 'app-prizes',
  templateUrl: './prizes.component.html',
  styleUrls: ['./prizes.component.css']
})
export class PrizesComponent {
  @ViewChild('template') template!: TemplateRef<any>;
  prize: FormGroup;
  prizesList: any;
  orderForm: any;
  data: any;
  items: any
  modalRef?: BsModalRef;
  fileViewer: any = 'No file Selected';
  option = option.status;
  initialValues: any;
  constructor(
    private modalService: BsModalService,
    private _AdminService: AdminService,
    private _NotifierService: NotifierService,
    private _SpinnerService: SpinnerService,
    private _FormBuilder: FormBuilder
  ) {
    this.orderForm = new FormGroup({
      items: new FormArray([])
    });
    this.prize = this._FormBuilder.group({
      id: [],
      image: [],
      price: [0],
      astroCommission: [50.50],
      magCommission: [50.50],
      status: [0],
      giftName:[""]
    });
  }

  ngOnInit(): void {
    this.initialValues = this.prize.value;
    this.getPrizeList();
  }
  getPrizeList() {
    this._SpinnerService.setState(true)
    this._AdminService.showGifts().then((data) => {
      if (data?.status) {
        this.items = this.orderForm.get('items') as FormArray;
        this.data = data?.data;
        this.prizesList = data?.data;
        this.data?.map((element: any, index: any) => {
          this.items.push(this.createItem());
          this.items.at(index).patchValue(element)
        })
      }
    });
    this._SpinnerService.setState(false)
  }
  openModal(template: TemplateRef<any>, blogId = null) {
    this.modalRef = this.modalService.show(template, {
      class: 'modal-lg',
      backdrop: 'static',
      keyboard: false,
    });
  }
  closeModal() {
    this.modalRef?.hide();
    this.prize.reset(this.initialValues);
    this.getPrizeList();
  }

  fileupload(event: Event, index: any = null): void {
    console.log(index)
    if (event.target !== null) {
      const files = (<HTMLInputElement>event.target).files;
      if (files !== null) {
        const fileList: FileList = files;
        if (fileList && fileList.length > 0) {
          const file: File = fileList[0];
          if (index || index == 0)
            this.items.at(index).get('image')?.setValue(file)
          else
            this.prize.get('image')?.setValue(file);
          this.fileViewer = file.name;
        }
      }
      console.log(this.items)
    }
  }

  addPrize(id = null) {
    this._AdminService.addUpdategifts(this.setFormData()).then((data) => {
      if (data?.status) {
        this._NotifierService.showSuccess("Data Added")
        this.closeModal();
      }
    })
  }
  setFormData() {
    const formData = new FormData();
    formData.set('id', this.prize.get('id')?.value);
    formData.set('image', this.prize.get('image')?.value);
    formData.set('price', this.prize.get('price')?.value);
    formData.set('astroCommission', this.prize.get('astroCommission')?.value);
    formData.set('magCommission', this.prize.get('magCommission')?.value);
    formData.set('status', this.prize.get('status')?.value);
    formData.set('giftName', this.prize.get('giftName')?.value);
    return formData;
  }
  createItem(): FormGroup {
    return this._FormBuilder.group({
      id: [],
      image: [],
      price: [],
      astroCommission: [],
      magCommission: [],
      status: [],
      giftName:[]
    });
  }
  updateData(index: any) {
    this._SpinnerService.setState(true);
    this.prize.patchValue(this.items.at(index).value);
    
    console.log(this.prize.value)
    this._AdminService.addUpdategifts(this.setFormData()).then(data => {
      if (data?.status) {
        this._NotifierService.showSuccess('Data Updated Successfully')
        this.getPrizeList();
      } else {
        this._NotifierService.showError('Something went wrong')
      }
      this._SpinnerService.setState(false)
    })
    this.prize.reset(this.initialValues);
  }
  deleteData(id: any) {
    this._SpinnerService.setState(true);
    this._AdminService
      .deletePrize({
        id: this.items.at(id).get('id').value,
      })
      .then((data) => {
        if (data.status) {
          this._NotifierService.showSuccess('Deleted Succesfully');
          this.getPrizeList();
        } else {
          this._NotifierService.showError('Something went wrong');
        }
        this._SpinnerService.setState(false);
      });
  }

}
