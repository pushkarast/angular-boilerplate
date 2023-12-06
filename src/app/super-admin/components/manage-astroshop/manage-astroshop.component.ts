import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AdminService } from 'src/app/shared/services/admin-api/admin-api.service';
import { SpinnerService } from 'src/app/shared/services/spinner.service';
import { NotifierService } from 'src/app/shared/services/toaster.service';
import option from '../../../../assets/constants/ngSelectvalues';
import { Subject, debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-manage-astroshop',
  templateUrl: './manage-astroshop.component.html',
  styleUrls: ['./manage-astroshop.component.css'],
})
export class ManageAstroshopComponent implements OnInit {
  @ViewChild('template') template!: TemplateRef<any>;
  modelChanged: Subject<any> = new Subject<any>();
  modalRef?: BsModalRef;
  search: string = '';
  paginationData: any;
  productList: any;
  addProduct: FormGroup;
  astroList: any;
  categoryList: any;
  status = option.status1;
  productType=option.productType
  productForType=option.productForType
  isFormSubmitted: boolean = false;
  fileViewer: string = 'No File Selected';
  initialValues:any
  isEdit:boolean=false
  productUpdateId:any=''
  constructor(
    private modalService: BsModalService,
    private _AdminService: AdminService,
    private _NotifierService: NotifierService,
    private _SpinnerService: SpinnerService,
    private _FormBuilder: FormBuilder
  ) {
    this.addProduct = this._FormBuilder.group({
      productName: ['', [Validators.required]],
      status: [0],
      categoryname: [null, [Validators.required]],
      quantity: [1],
      purchasePrice: ['0.00'],
      ownProfit: ['0.00'],
      productType: ['1'],
      gst: ['', [Validators.required]],
      gstAmt: ['0.00'],
      discAmt: ['0.00'],
      totalAmount: ['0.00'],
      displayAmount: ['0.00'],
      hsncode: ['', [Validators.required]],
      productOriginType: ['inhouse'],
      astrologer: [null],
      recomPerc: [''],
      recomAmt: ['0.00'],
      astroPerc:[''],
      astroAmt:['0.00'],
      magProfitPer: ['100.00'],
      magProfitAmt: ['0.00'],
      image1: [''],
      image2: [''],
      image3: [''],
      image4: [''],
      desc:['',[Validators.required]],
      question1:[''],
      desc1:[''],
      question2:[''],
      desc2:[''],
      question3:[''],
      desc3:['']
    });
  }

  ngOnInit(): void {
    this.initialValues = this.addProduct.value;
    this.getProductList();
    this.getAstroList();
    this.getCategoryList()


    this.modelChanged.pipe(debounceTime(300), distinctUntilChanged()).subscribe((val) => {
      this.search=val.search
      this.getProductList()
    });

    this.addProduct.controls['purchasePrice'].valueChanges.subscribe(change => {
      this.addProduct.get('totalAmount')?.setValue((Number(this.addProduct.get('ownProfit')?.value)+Number(this.addProduct.get('gstAmt')?.value))+Number(change))
      this.addProduct.get('displayAmount')?.setValue((Number(this.addProduct.get('ownProfit')?.value)+Number(this.addProduct.get('gstAmt')?.value))+Number(change))
    });
    this.addProduct.controls['ownProfit'].valueChanges.subscribe(change => {
      // this.addProduct.get('magProfitAmt')?.setValue(Number(change))
      this.getPercentageAmount()
      this.addProduct.get('totalAmount')?.setValue( Number(this.addProduct.get('purchasePrice')?.value)+Number(this.addProduct.get('gstAmt')?.value)+Number(change))
      this.addProduct.get('displayAmount')?.setValue(Number(this.addProduct.get('purchasePrice')?.value)+Number(this.addProduct.get('gstAmt')?.value)+Number(change))
    });
    this.addProduct.controls['gst'].valueChanges.subscribe(change => {

      let gstAmount=this.gstAmount(change,this.addProduct.get('purchasePrice')?.value,this.addProduct.get('ownProfit')?.value)

      this.addProduct.get('gstAmt')?.setValue( Number(gstAmount))
      this.addProduct.get('totalAmount')?.setValue( Number(this.addProduct.get('purchasePrice')?.value)+Number(this.addProduct.get('ownProfit')?.value)+Number(gstAmount))
      this.addProduct.get('displayAmount')?.setValue(Number(this.addProduct.get('purchasePrice')?.value)+Number(this.addProduct.get('ownProfit')?.value)+Number(gstAmount))
    });
    this.addProduct.controls['discAmt'].valueChanges.subscribe(change => {
      this.addProduct.get('displayAmount')?.setValue(Number(this.addProduct.get('purchasePrice')?.value)+Number(this.addProduct.get('ownProfit')?.value)+Number(this.addProduct.get('gstAmt')?.value)+Number(change))
    });

    this.addProduct.controls['recomPerc'].valueChanges.subscribe(change => {
      if(this.addProduct.get('productOriginType')?.value==='inhouse'){
        let recomper:number= Number(this.gstAmount(change,this.addProduct.get('ownProfit')?.value,0))
        this.addProduct.get('recomAmt')?.setValue(Number(recomper))
        this.addProduct.get('magProfitPer')?.setValue(Number(100-change))
        let magprofit=Number(this.gstAmount(100-change,this.addProduct.get('ownProfit')?.value,0))
        this.addProduct.get('magProfitAmt')?.setValue(Number(magprofit))
      }
    });

    this.addProduct.controls['astroPerc'].valueChanges.subscribe(change => {
      if(this.addProduct.get('productOriginType')?.value!=='inhouse'){
        let recomper:number= Number(this.gstAmount(change,this.addProduct.get('ownProfit')?.value,0))
        this.addProduct.get('astroAmt')?.setValue(Number(recomper))
        this.addProduct.get('magProfitPer')?.setValue(Number(100-change))
        let magprofit=Number(this.gstAmount(100-change,this.addProduct.get('ownProfit')?.value,0))
        this.addProduct.get('magProfitAmt')?.setValue(Number(magprofit))
      }
    });
    

  }

  getPercentageAmount(){
    if(this.addProduct.get('productOriginType')?.value==='inhouse'){
      let recomper:number= Number(this.gstAmount(Number(this.addProduct.get('recomPerc')?.value),this.addProduct.get('ownProfit')?.value,0))
      this.addProduct.get('recomAmt')?.setValue(Number(recomper))
      this.addProduct.get('magProfitPer')?.setValue(Number(100-Number(this.addProduct.get('recomPerc')?.value)))
      let magprofit=Number(this.gstAmount(100-Number(this.addProduct.get('recomPerc')?.value),this.addProduct.get('ownProfit')?.value,0))
      this.addProduct.get('magProfitAmt')?.setValue(Number(magprofit))
    }
    if(this.addProduct.get('productOriginType')?.value!=='inhouse'){
      let recomper:number= Number(this.gstAmount(Number(this.addProduct.get('astroPerc')?.value),this.addProduct.get('ownProfit')?.value,0))
      this.addProduct.get('astroAmt')?.setValue(Number(recomper))
      this.addProduct.get('magProfitPer')?.setValue(Number(100-Number(this.addProduct.get('astroPerc')?.value)))
      let magprofit=Number(this.gstAmount(100-Number(this.addProduct.get('astroPerc')?.value),this.addProduct.get('ownProfit')?.value,0))
      this.addProduct.get('magProfitAmt')?.setValue(Number(magprofit))
    }
  }

  getProductList(page: any = 1) {
    this._SpinnerService.setState(true);
    this._AdminService
      .getAllProductList({ page: page, search: this.search })
      .then((data) => {
        if (data?.status) {
          this.productList = data?.data?.productList;
          this.paginationData = data?.data;
        }
        this._SpinnerService.setState(false);
      });
  }

  getAstroList() {
    this._AdminService.getAstroListForDropDown().then((data) => {
      if (data?.status) {
        this.astroList = data?.data;
      }
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
    this.addProduct.reset(this.initialValues)
    this.isEdit=false
    this.productUpdateId=''
  }

  gstAmount(percent: any, profit: any, purchase: any) {
    return (
      (Number(percent) / 100) *
      (Number(profit) + Number(purchase))
    ).toFixed(2);
  }

  totalAmount(percent: any, profit: any, purchase: any, discount: any) {
    return (
      Number(this.gstAmount(percent, profit, purchase)) +
      Number(discount) +
      (Number(profit) + Number(purchase))
    ).toFixed(2);
  }

  pagination($: any) {
    // this.page = $.pageIndex + 1;
    this.getProductList($.pageIndex + 1);
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
              this.addProduct.get('image1')?.setValue(file)
              break;
            case 2:
              this.addProduct.get('image2')?.setValue(file)
              break;
            case 3:
              this.addProduct.get('image3')?.setValue(file)
              break;
            case 4:
              this.addProduct.get('image4')?.setValue(file)
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
    formData.set('productName', this.addProduct.get('productName')?.value);
    formData.set('status', this.addProduct.get('status')?.value);
    formData.set('categoryname', this.addProduct.get('categoryname')?.value);
    formData.set('quantity', this.addProduct.get('quantity')?.value);
    formData.set('purchasePrice', this.addProduct.get('purchasePrice')?.value);
    formData.set('ownProfit', this.addProduct.get('ownProfit')?.value);
    formData.set('productType', this.addProduct.get('productType')?.value);
    formData.set('gst', this.addProduct.get('gst')?.value);
    formData.set('gstAmt', this.addProduct.get('gstAmt')?.value);
    formData.set('discAmt', this.addProduct.get('discAmt')?.value);
    formData.set('totalAmount', this.addProduct.get('totalAmount')?.value);
    formData.set('displayAmount', this.addProduct.get('displayAmount')?.value);
    formData.set('hsncode', this.addProduct.get('hsncode')?.value);
    formData.set('productOriginType', this.addProduct.get('productOriginType')?.value);
    formData.set('astrologer', this.addProduct.get('astrologer')?.value);
    formData.set('recomPerc', this.addProduct.get('recomPerc')?.value);
    formData.set('recomAmt', this.addProduct.get('recomAmt')?.value);
    formData.set('astroPerc', this.addProduct.get('astroPerc')?.value);
    formData.set('astroAmt', this.addProduct.get('astroAmt')?.value);
    formData.set('magProfitPer', this.addProduct.get('magProfitPer')?.value);
    formData.set('magProfitAmt', this.addProduct.get('magProfitAmt')?.value);
    formData.set('image1', this.addProduct.get('image1')?.value);
    formData.set('image2', this.addProduct.get('image2')?.value);
    formData.set('image3', this.addProduct.get('image3')?.value);
    formData.set('image4', this.addProduct.get('image4')?.value);
    formData.set('desc', this.addProduct.get('desc')?.value);
    formData.set('question1', this.addProduct.get('question1')?.value);
    formData.set('desc1', this.addProduct.get('desc1')?.value);
    formData.set('question2', this.addProduct.get('question2')?.value);
    formData.set('desc2', this.addProduct.get('desc2')?.value);
    formData.set('question3', this.addProduct.get('question3')?.value);
    formData.set('desc3', this.addProduct.get('desc3')?.value);
    if(this.isEdit){
      formData.set('productId',this.productUpdateId);
    }

    return formData;
  }

  submitProduct(){
    this.isFormSubmitted=true
    if(this.addProduct?.valid){
      this._SpinnerService.setState(true)
      this._AdminService.uploadShopProduct(this.setFormData()).then(data=>{
        if(data?.status){
          this._NotifierService.showSuccess('Data Added Successfully')
          this.modalRef?.hide()
          this.resetForm()
          this.getProductList()
        }else{
          this._NotifierService.showError('Something Went wrong')
        }
        this.isFormSubmitted=false
        this._SpinnerService.setState(false)

      })
    }
  }

  resetForm(){
    this.addProduct.reset(this.initialValues)
  }

  searchProduct(event: any) {
    this.modelChanged.next({ search: event.target.value })
  }

  getProductById(id:any){
    this._SpinnerService.setState(true)
    this._AdminService.getProductDetailById({productId:id}).then(data=>{
      if(data?.status&& data?.data){
        this.productUpdateId=id
        this.addProduct.patchValue(data?.data?.productDetails)
        this.openModal(this.template)
        this.isEdit=true
      }
      this._SpinnerService.setState(false)
    })
  }

  updateProduct(){
    this.isFormSubmitted=true
    if(this.addProduct?.valid){
      this._SpinnerService.setState(true)
      this._AdminService.updateProduct(this.setFormData()).then(data=>{
        if(data?.status){
          this._NotifierService.showSuccess('Data Updated Successfully')
          this.modalRef?.hide()
          this.isEdit=false
          this.productUpdateId=''
          this.resetForm()
          this.getProductList()
        }else{
          this._NotifierService.showError('Something Went wrong')
        }
        this.isFormSubmitted=false
        this._SpinnerService.setState(false)

      })
    }
  }

}
