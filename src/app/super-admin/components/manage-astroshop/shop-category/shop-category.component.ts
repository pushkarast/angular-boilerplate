import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Subject, debounceTime, distinctUntilChanged } from 'rxjs';
import { AdminService } from 'src/app/shared/services/admin-api/admin-api.service';
import { SpinnerService } from 'src/app/shared/services/spinner.service';
import { NotifierService } from 'src/app/shared/services/toaster.service';
import option from '../../../../../assets/constants/ngSelectvalues';
import { Buffer } from 'buffer';

@Component({
  selector: 'app-shop-category',
  templateUrl: './shop-category.component.html',
  styleUrls: ['./shop-category.component.css']
})
export class ShopCategoryComponent implements OnInit{
  @ViewChild('template') template!: TemplateRef<any>;
  modelChanged: Subject<any> = new Subject<any>();
  modalRef?: BsModalRef;
  search: string = '';
  paginationData: any;
  productList: any;
  addProductCategory: FormGroup;
  astroList: any;
  categoryList: any;
  status = option.status;
  productType=option.productType
  productForType=option.productForType
  isFormSubmitted: boolean = false;
  fileViewer: string = 'No File Selected';
  initialValues:any
  isEdit:boolean=false
  productUpdateId:any=''
  categoryType=option.productType

  constructor(
    private modalService: BsModalService,
    private _AdminService: AdminService,
    private _NotifierService: NotifierService,
    private _SpinnerService: SpinnerService,
    private _FormBuilder: FormBuilder
  ){
    this.addProductCategory = this._FormBuilder.group({
      categoryName: ['', [Validators.required]],
      status: [1],
      desc: [null, [Validators.required]],
      image: [''],
      type:['1']

    });
  }

  ngOnInit(): void {
    this.initialValues = this.addProductCategory.value;
    this.getShopCategoryList()

    this.modelChanged.pipe(debounceTime(300), distinctUntilChanged()).subscribe((val) => {
      this.search=val.search
      this.getShopCategoryList()
    });
  }


  getShopCategoryList(){
    this._SpinnerService.setState(true)
    this._AdminService.getAllProductCategoryList({search:this.search}).then((data) => {
      if (data?.status) {
        this.categoryList = data?.data?.categoryList;
      }
      this._SpinnerService.setState(false)
    });
  }

  deleteCategory(id:any){
    this._SpinnerService.setState(true)
    this._AdminService.deleteShopCategory({id:id}).then((data) => {
      if (data?.status) {
        this.getShopCategoryList()
        this._NotifierService.showSuccess('Deleted Successfully')
      }else{
        this._NotifierService.showError('Something went wrong')
      }
      this._SpinnerService.setState(false)
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
    this.addProductCategory.reset(this.initialValues)
    this.isEdit=false
    this.productUpdateId=''
  }

  fileupload(event: Event, key: any): void {
    if (event.target !== null) {
      const files = (<HTMLInputElement>event.target).files;
      if (files !== null) {
        const fileList: FileList = files;
        if (fileList && fileList.length > 0) {
          const file: File = fileList[0];
          this.addProductCategory.get('image')?.setValue(file)
        }
      }
    }
  }
  resetForm(){
    this.addProductCategory.reset(this.initialValues)
  }

  searchProduct(event: any) {
    this.modelChanged.next({ search: event.target.value })
  }

  pagination($: any) {
    // this.page = $.pageIndex + 1;
    // this.getProductList($.pageIndex + 1);
  }

  getProductById(data:any){

    this.addProductCategory?.get('categoryName')?.setValue(data?.CatName)
    this.addProductCategory?.get('status')?.setValue(data?.Status)
    this.addProductCategory?.get('type')?.setValue(data?.categoryType)
    this.addProductCategory?.get('desc')?.setValue( Buffer.from(data?.DescP, 'base64').toString('ascii'))

    this.productUpdateId=data?.CatId
    this.openModal(this.template)
    this.isEdit=true

    // Buffer.from(params["permit"], 'base64').toString('ascii');
  }

  updateProduct(){

  }

  setFormData(){
    const formData = new FormData();
    
    formData.set('categoryName', this.addProductCategory.get('categoryName')?.value);
    formData.set('status', this.addProductCategory.get('status')?.value);
    formData.set('desc', this.addProductCategory.get('desc')?.value);
    formData.set('image', this.addProductCategory.get('image')?.value);
    formData.set('type', this.addProductCategory.get('type')?.value);

    if(this.isEdit){
      formData.set('categoryId',this.productUpdateId);
    }

    return formData;

  }

  submitProduct(){
    this.isFormSubmitted=true
    if(this.addProductCategory?.valid){
      this._SpinnerService.setState(true)
      this._AdminService.uploadShopCategory(this.setFormData()).then(data=>{
        if(data?.status){
          this._NotifierService.showSuccess(`Data ${this.isEdit?'Updated':'Added'} Successfully`)
          this.modalRef?.hide()
          this.isEdit=false
          this.productUpdateId=''
          this.resetForm()
          this.getShopCategoryList()
        }else{
          this._NotifierService.showError('Something Went wrong')
        }
        this.isFormSubmitted=false
        this._SpinnerService.setState(false)

      })
    }
  }


}
