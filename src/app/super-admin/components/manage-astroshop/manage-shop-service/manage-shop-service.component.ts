import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Subject, debounceTime, distinctUntilChanged } from 'rxjs';
import { AdminService } from 'src/app/shared/services/admin-api/admin-api.service';
import { SpinnerService } from 'src/app/shared/services/spinner.service';
import { NotifierService } from 'src/app/shared/services/toaster.service';
import option from '../../../../../assets/constants/ngSelectvalues';

@Component({
  selector: 'app-manage-shop-service',
  templateUrl: './manage-shop-service.component.html',
  styleUrls: ['./manage-shop-service.component.css'],
})
export class ManageShopServiceComponent implements OnInit {
  @ViewChild('template') template!: TemplateRef<any>;
  modelChanged: Subject<any> = new Subject<any>();
  modalRef?: BsModalRef;
  search: string = '';
  paginationData: any;
  page:any=1
  serviceList: any;
  addService: FormGroup;
  initialValues: any;
  isEdit: boolean = false;
  isFormSubmitted: boolean = false;
  status = option.statusString;
  broadcastType=option?.broadcastType
  categoryList: any;
  serviceUpdateId: any;
  filter:any=null
  constructor(
    private modalService: BsModalService,
    private _AdminService: AdminService,
    private _NotifierService: NotifierService,
    private _SpinnerService: SpinnerService,
    private _FormBuilder: FormBuilder
  ) {
    this.addService = this._FormBuilder.group({
      serviceName: ['', [Validators.required]],
      status: ['0'],
      categoryname: [null, [Validators.required]],
      gst: [18, [Validators.required]],
      image1: [''],
      image2: [''],
      image3: [''],
      image4: [''],
      desc: ['', [Validators.required]],
      question1: [''],
      desc1: [''],
      question2: [''],
      desc2: [''],
      question3: [''],
      desc3: [''],
      broadcastType:['0']
    });
  }

  ngOnInit(): void {
    this.initialValues = this.addService.value;
    this.modelChanged
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe((val) => {
        this.search = val.search;
        this.getServiceList();
      });

    this.getCategoryList();
    this.getServiceList();
  }

  getServiceList(page: any = 1) {
    this._SpinnerService.setState(true);
    this._AdminService
      .getAllServiceList({ page: page, search: this.search,filter:this.filter })
      .then((data) => {
        if (data?.status) {
          this.serviceList = data?.data?.serviceList;
          console.log(this.serviceList);

          this.paginationData = data?.data;
        }
        this._SpinnerService.setState(false);
      });
  }

  getCategoryList() {
    this._AdminService.getAllProductCategoryList().then((data) => {
      if (data?.status) {
        this.categoryList = data?.data?.categoryList;
        console.log(this.categoryList);
      }
    });
  }

  openModal(template: TemplateRef<any>, blogId = null) {
    this.modalRef = this.modalService.show(template, {
      class: 'modal-xl',
      backdrop: 'static',
      keyboard: false,
    });
  }

  closeModal(type = '') {
    this.modalRef?.hide();
    this.addService.reset(this.initialValues);
    this.isFormSubmitted = false;
    this.isEdit=false
    this.serviceUpdateId=''
  }
  pagination($: any) {
    this.page = $.pageIndex + 1;
    this.getServiceList($.pageIndex + 1);
  }
  searchProduct(event: any) {
    this.modelChanged.next({ search: event.target.value });
  }

  getProductById(data: any) {
    this.addService.get('serviceName')?.setValue(data?.serviceName);
    this.addService.get('status')?.setValue(data?.status);
    this.addService.get('categoryname')?.setValue(data?.catid);
    this.addService.get('gst')?.setValue(data?.gst);
    this.addService.get('desc')?.setValue(data?.descP);
    this.addService.get('question1')?.setValue(data?.ques1);
    this.addService.get('desc1')?.setValue(data?.ans1);
    this.addService.get('question2')?.setValue(data?.ques2);
    this.addService.get('desc2')?.setValue(data?.ans2);
    this.addService.get('question3')?.setValue(data?.ques3);
    this.addService.get('desc3')?.setValue(data?.ans3);
    this.addService.get('broadcastType')?.setValue(data?.broadcastType);
    this.serviceUpdateId=data?.id
    this.isEdit=true

    this.openModal(this.template)
  }

  updateProduct() {
    this.isFormSubmitted = true;
    if (this.addService?.valid) {
      this._SpinnerService.setState(true);
      this._AdminService.updateService(this.setFormData()).then((data) => {
        if (data?.status) {
          this._NotifierService.showSuccess('Data Updated Successfully');
          this.closeModal()
          this.resetForm();
          this.getServiceList()
        } else {
          this._NotifierService.showError('Something Went wrong');
        }
        this.isFormSubmitted = false;
        this._SpinnerService.setState(false);
      });
    }
  }

  submitProduct() {
    this.isFormSubmitted = true;
    if (this.addService?.valid) {
      this._SpinnerService.setState(true);
      this._AdminService.uploadService(this.setFormData()).then((data) => {
        if (data?.status) {
          this._NotifierService.showSuccess('Data Added Successfully');
          this.closeModal()
          this.resetForm();
          this.getServiceList()
        } else {
          this._NotifierService.showError('Something Went wrong');
        }
        this.isFormSubmitted = false;
        this._SpinnerService.setState(false);
      });
    }
  }

  resetForm() {
    this.addService.reset(this.initialValues);
  }

  fileupload(event: Event, key: any): void {
    if (event.target !== null) {
      const files = (<HTMLInputElement>event.target).files;
      if (files !== null) {
        const fileList: FileList = files;
        if (fileList && fileList.length > 0) {
          const file: File = fileList[0];
          switch (key) {
            case 1:
              this.addService.get('image1')?.setValue(file);
              break;
            case 2:
              this.addService.get('image2')?.setValue(file);
              break;
            case 3:
              this.addService.get('image3')?.setValue(file);
              break;
            case 4:
              this.addService.get('image4')?.setValue(file);
              break;
            default:
              break;
          }
          // this.addBannerForm.get('bannerImage')?.setValue(file)
        }
      }
    }
  }

  setFormData() {
    const formData = new FormData();
    formData.set('serviceName', this.addService.get('serviceName')?.value);
    formData.set('status', this.addService.get('status')?.value);
    formData.set('categoryname', this.addService.get('categoryname')?.value);
    formData.set('gst', this.addService.get('gst')?.value);
    formData.set('image1', this.addService.get('image1')?.value);
    formData.set('image2', this.addService.get('image2')?.value);
    formData.set('image3', this.addService.get('image3')?.value);
    formData.set('image4', this.addService.get('image4')?.value);
    formData.set('desc', this.addService.get('desc')?.value);
    formData.set('question1', this.addService.get('question1')?.value);
    formData.set('desc1', this.addService.get('desc1')?.value);
    formData.set('question2', this.addService.get('question2')?.value);
    formData.set('desc2', this.addService.get('desc2')?.value);
    formData.set('question3', this.addService.get('question3')?.value);
    formData.set('desc3', this.addService.get('desc3')?.value);
    formData.set('broadcastType', this.addService.get('broadcastType')?.value);
    
    if (this.isEdit) {
      formData.set('id', this.serviceUpdateId);
    }

    return formData;
  }

  isDelete(id:any){
    if(confirm("Are you sure you want to delete the Puja ")) {
      this._AdminService.deleteService({id:id}).then(data=>{
        if(data?.status){
          this._NotifierService.showSuccess('Deleted Successfully')
          this.getServiceList(this.page)
        }else{
          this._NotifierService.showError('Something Went Wrong')
        }
      })
    }
  }
}
