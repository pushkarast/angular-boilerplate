declare var CKEDITOR: any;
import { Component, OnInit, TemplateRef,ViewChild  } from '@angular/core';
import option from "../../../../../assets/constants/ngSelectvalues"
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from 'src/app/shared/services/admin-api/admin-api.service';
import { SpinnerService } from 'src/app/shared/services/spinner.service';
import { NotifierService } from 'src/app/shared/services/toaster.service';
import { ActivatedRoute } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Subject, debounceTime, distinctUntilChanged } from 'rxjs';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { uploadAdapter } from './uploadAdapter';
import { Buffer } from 'buffer';

@Component({
  selector: 'app-add-new-scratch-card',
  templateUrl: './add-new-scratch-card.component.html',
  styleUrls: ['./add-new-scratch-card.component.css']
})
export class AddNewScratchCardComponent {
  @ViewChild('ckeditor') ckeditor: any;
  modelChanged: Subject<any> = new Subject<any>();
  scratchCardData: FormGroup;
  getAstroData: FormGroup;
  getCustomerData: FormGroup;
  getSelectedCustomerData: FormGroup;
  getSelectedAstroData: FormGroup;
  modalRef?: BsModalRef;
  customersList: any
  astrologersList: any 
  option = option.scratchType
  moneySpentFilter = option.moneySpentFilter
  fileViewer:any='No file Selected'
  TabOption: number = 1
  newSelectedCustomer: any = JSON.parse(localStorage.getItem('selected_Cust')!) || [];
  newSelectedAstrologer: any = JSON.parse(localStorage.getItem('selected_Astro')!) || [];
  callChatCountFilter = option.callChatCountFilter;
  rechargeTimesFilter = option.rechargeTimesFilter;
  scratchCardCustFilterType = option.scratchCardCustFilterType;
  isFormSubmitted: boolean = false;
  selectedCustomerForCreateCard: any = []
  aboutOffer: string = "";
  public Editor = ClassicEditor;
  getSelectedCustomerList: any = []
  getSelectedAstrologerList: any = []
  selectAllCustomerOption: boolean = false
  selectAllAstrologerOption: boolean = false
  selectAllSelectedCustomerOption: boolean = false
  selectAllSelectedAstrologerOption: boolean = false
  prevTimeLeft: any
  prevAstrologerName: any
  discountList: any
  minAmtOrSepecificAmt = option.minAmtOrSepecificAmt;
  freeOrPaidOption = option.freeOrPaidOption;
  toggleButton: boolean = false
  isValidForSubmit: boolean = false 
  aboutOfferTime: number = 0 
  aboutOfferFreeOrPaid: string = ""
  aboutOfferCallChatType: string = ""
  aboutOfferContent: string = 
        `
        <h2><strong>About offer</strong></h2>
        <ul>
          <li>Offer is valid only for one time.</li>
          <li>This free call will be for ${this.aboutOfferTime} minutes only.</li>
          <li>Chat will be disconnected automatically.</li>
          <li>Chat will connect only when astrologer will be online.</li>
        </ul>
        `;

  accountStatusAstro = option.accountStatusAstro;

  constructor(
    private _FormBuilder: FormBuilder,
    private _AdminService: AdminService,
    private _SpinnerService: SpinnerService,
    private _NotifierService: NotifierService,
    private _ActivatedRoute: ActivatedRoute,
    private modalService: BsModalService,
  ) {
    this.scratchCardData = this._FormBuilder.group({
      selectedCustomerForCreateCard: [""],
      selectedCustomersList: [null, [Validators.required]],
      selectedAstrologersList: [null, [Validators.required]],
      RatePerMin: 0,
      Min: 0,
      Type: null,
      scratchTill: null,
      expireAt: null,
      offerImage: null,
      offerThumbnailImg: null,
      total: 0,
      prevSrc: null,
      prevScThumbnail: null,
      discPer: 0,
      message: null,
      rechargeId: null,
      minOrSepecificAmt: null,
      freeCheck: null,
    })

    this.getAstroData = this._FormBuilder.group({
      search: null,
      callChatCount: null,
      page: 1,
      newSelectedAstrologer: null,
      accountStatusAstro: null,
    })

    this.getCustomerData = this._FormBuilder.group({
      search: null,
      moneySpent: null,
      rechargeTimes: null,
      type: null,
      page: 1,
      newSelectedCustomer: null,
    })

    this.getSelectedCustomerData = this._FormBuilder.group({
      page: 1,
    })

    
    this.getSelectedAstroData = this._FormBuilder.group({
      page: 1,
    })
  }

  ngOnInit(): void {

    this.modelChanged.pipe(debounceTime(300), distinctUntilChanged()).subscribe((val) => {
      if ( this.TabOption == 2 ) {
        this.getCustomerData.get('search')?.setValue(val?.search)
        this.getCustomers()
        this.showMarkedCustomer()
      }
      else if (this.TabOption == 3) {
        if (this.getAstroData.get('search')?.value != null) {
          this.getAstroData.get('search')?.setValue(val?.search)
        }
        else if (this.getAstroData.get('callChatCount')?.value != null) {
          this.getAstroData.get('callChatCount')?.setValue(val?.callChatCount)
        }
        this.getAstrologers()
        this.showMarkedAstrologer()
      }
    });

    if ( this.TabOption == 2 ) {
      this.getCustomers()
      this.showMarkedCustomer()
    } 
    if (this.TabOption == 3) {
      this.getAstrologers()
      this.showMarkedAstrologer()
    }
  }

  openModal(template: TemplateRef<any>, blogId = null) {
    this.modalRef = this.modalService.show(template, { class: 'modal-xl', backdrop: "static", keyboard: false });
  }

  // closeModal(type = "") {
  //   if (type == "Close") {
  //     this.modalRef?.hide();
  //   }
  // }

  getCustomers(event: any = null, textCheck: any = null) {
    if (textCheck == 'moneySpent') {
      this.getCustomerData = this._FormBuilder.group({
        search: null,
        rechargeTimes: null,
        type: null,
        // moneySpent: event.target.textContent == "None" ? null : event.target.textContent == "1000+" ? '2' : event.target.textContent == "0-500" ? '0' : event.target.textContent == "501-1000" ? 1 : null,
        moneySpent: event.target.textContent == "None" ? null : 
                                                    event.target.textContent == "0-100" ? '1' :
                                                      event.target.textContent == "101-200" ? '2' :
                                                        event.target.textContent == "201-300" ? '3' : 
                                                          event.target.textContent == "301-500" ? '4' : 
                                                            event.target.textContent == "501-700" ? '5' : 
                                                              event.target.textContent == "701-1000" ? '6' : 
                                                                event.target.textContent == "1001-1500" ? '7' : 
                                                                  event.target.textContent == "1501-2000" ? '8' : 
                                                                    event.target.textContent == "2001-3000" ? '9' : 
                                                                      event.target.textContent == "3001-4000" ? '10' : 
                                                                        event.target.textContent == "4001-5000" ? '11' : 
                                                                          event.target.textContent == "5001-7001" ? '12' : 
                                                                            event.target.textContent == "7000+" ? '13' : null,

        page: 1
      })
    }
    else if (textCheck == 'rechargeTimes') {
      this.getCustomerData = this._FormBuilder.group({
        search: null,
        moneySpent: null,
        type: null,
        page: 1,
        rechargeTimes: event.target.textContent == 'None' ? null : event.target.textContent == 'more than 5 times' ? '6' : event.target.textContent,
      })
      this.getCustomerData.get('rechargeTimes')?.setValue(event.target.textContent);
    }
    else if (textCheck == 'type') {
      this.getCustomerData = this._FormBuilder.group({
        search: null,
        moneySpent: null,
        rechargeTimes: null,
        page: 1,
        type: event.target.textContent == 'Only Installed' ? '0' : event.target.textContent == 'Only Free Call Claimed' ? '1' : null
      })
    }

    this._AdminService.getCustomerList(this.getCustomerData.value).then((data) => {
      if (data?.status) {
        this.customersList = data?.data;
      }
    })
  }

  getAstrologers() {
    this._AdminService.getAstrologerList(this.getAstroData.value).then((data) => {
      if (data?.status) {
        this.astrologersList = data?.data;
      }
    })
  }

  setFormData() {
    const formData = new FormData();
    formData.set('offerImage', this.scratchCardData.get('offerImage')?.value);
    formData.set('offerThumbnailImg', this.scratchCardData.get('offerThumbnailImg')?.value);
    formData.set('RatePerMin', this.scratchCardData.get('RatePerMin')?.value);
    formData.set('Min', this.scratchCardData.get('Min')?.value);
    formData.set('Type', this.scratchCardData.get('Type')?.value);
    formData.set('total', this.scratchCardData.get('total')?.value);
    formData.set('scratchTill', this.scratchCardData.get('scratchTill')?.value);
    formData.set('expireAt', this.scratchCardData.get('expireAt')?.value);
    formData.set('selectedCustomersList', JSON.stringify(this.newSelectedCustomer));
    formData.set('selectedAstrologersList', JSON.stringify(this.newSelectedAstrologer));
    formData.set('selectedCustomerForCreateCard', JSON.stringify(this.selectedCustomerForCreateCard));
    formData.set('aboutOffer', Buffer.from(this.aboutOfferContent, 'utf8').toString('base64'));
    formData.set('discPer', this.scratchCardData.get('discPer')?.value);
    formData.set('message', this.scratchCardData.get('message')?.value);
    formData.set('rechargeId', this.scratchCardData.get('rechargeId')?.value);
    formData.set('freeCheck', this.scratchCardData.get('freeCheck')?.value);
    formData.set('minOrSepecificAmt', this.scratchCardData.get('minOrSepecificAmt')?.value);
    // formData.set('aboutOfferContent', Buffer.from(this.aboutOffer, 'utf8').toString('base64'));
    
    return formData;
  }

  createScratchCardNew() {
    this.checkBeforeSubmit();
    if ( this.isValidForSubmit ) {
      this._AdminService.createScratchCard(this.setFormData()).then(data=>{
        if(data?.status){
          this._NotifierService.showSuccess('Scratch Card Created Successfully')
          this.newSelectedAstrologer = []
          if (localStorage.getItem("selected_Astro") ) {
            localStorage.removeItem('selected_Astro');
          }
          this.newSelectedCustomer = []
          if (localStorage.getItem("selected_Cust") ) {
            localStorage.removeItem('selected_Cust');
          }
          this.aboutOffer = ``;


          this.scratchCardData = this._FormBuilder.group({
            // selectedCustomerForCreateCard: [""],
            selectedCustomersList: [null],
            selectedAstrologersList: [null],
            RatePerMin: [null],
            Min: [null],
            Type: [null],
            scratchTill: [null],
            expireAt: [null],
            offerImage: [null],
            offerThumbnailImg: [null],
            total: [null],
            prevSrc: null,
            prevScThumbnail: null,
            message: null,
            rechargeId: null,
          })
          this.showMarkedAstrologer();
          this.showMarkedCustomer();
          window.location.reload();
        }else{
          this._NotifierService.showError('Something Went Wrong')
        }
      })
    }
    else {
      this._NotifierService.showError("Please enter all the required fields");
    }
  }

  fileupload(event: Event): void {
    if (event.target !== null) {
      const files = (<HTMLInputElement>event.target).files;
      if (files !== null) {
        const fileList: FileList = files;
        if (fileList && fileList.length > 0) {
          const file: File = fileList[0];
          this.scratchCardData.get('offerImage')?.setValue(file) 
          this.scratchCardData.get('prevScThumbnail')?.setValue(URL.createObjectURL(file)) 
          this.fileViewer = file.name;
        }
      }
    }
  }

  fileuploadOfferImg(event: Event): void {
    if (event.target !== null) {
      const files = (<HTMLInputElement>event.target).files;
      if (files !== null) {
        const fileList: FileList = files;
        if (fileList && fileList.length > 0) {
          const file: File = fileList[0];
          this.scratchCardData.get('offerThumbnailImg')?.setValue(file)
          this.scratchCardData.get('prevSrc')?.setValue(URL.createObjectURL(file))
          this.fileViewer = file.name;
        }
      }
    }
  }

  setTabOption(data: any) {
    this.TabOption = data;
    if ( this.TabOption == 2 ) {
      this.getCustomers()
      this.showMarkedCustomer()
    }
    if ( this.TabOption == 3 ) {
      this.getAstrologers()
    }
    if (this.TabOption == 1) {
      this.showMarkedCustomer()
    }
    if (this.TabOption == 4) {
      this.showMarkedCustomer();
      this.showMarkedAstrologer();
      this.getPreviewAstroDetail();
      this.calculateTimeLeft();
    }
  }

  addNewAstrologers(e: any) {
    // console.log(e.target.value, 'target value check...')
    if ( e.target.checked ) {
      this.newSelectedAstrologer.push(e.target.value)
      // console.log(this.newSelectedAstrologer, 'this.newSelectedAstrologer...')
    }
    else {

      this.newSelectedAstrologer = this.newSelectedAstrologer.filter((item: any) => item != e.target.value)
    }
    localStorage.setItem("selected_Astro", JSON.stringify(this.newSelectedAstrologer));
    this.showMarkedAstrologer()
  }

  removeFromSelectedAstrologer(e: any) {
    // console.log(e.target.value, 'target value check...')
    if ( e.target.checked ) {
      this.newSelectedAstrologer.push(e.target.value)
      // console.log(this.newSelectedAstrologer, 'this.newSelectedAstrologer...')
    }
    else {

      this.newSelectedAstrologer = this.newSelectedAstrologer.filter((item: any) => item != e.target.value)
    }
    localStorage.setItem("selected_Astro", JSON.stringify(this.newSelectedAstrologer));
    this.showMarkedAstrologer()
    this.getAstroData.get('newSelectedAstrologer')?.setValue(this.newSelectedAstrologer)
    this.getAstrologers()
  }

  addNewCustomers(e: any) {
    if ( e.target.checked ) {
      this.newSelectedCustomer.push(e.target.value)
    }
    else {
      this.newSelectedCustomer = this.newSelectedCustomer.filter((item: any) => item != e.target.value)
    }
    localStorage.setItem("selected_Cust", JSON.stringify(this.newSelectedCustomer));
    this.showMarkedCustomer()
    // this.getCustomerData.get('newSelectedCustomer')?.setValue(this.newSelectedCustomer)
    // this.getCustomers()
    // console.log(this.newSelectedCustomer, 'newSelectedCustomer')
    this.selectAllSelectedCustomerOption = false
  }

  removeFromSelectedCustomers(e: any) {
    if ( e.target.checked ) {
      this.newSelectedCustomer.push(e.target.value)
    }
    else {
      this.newSelectedCustomer = this.newSelectedCustomer.filter((item: any) => item != e.target.value)
    }
    localStorage.setItem("selected_Cust", JSON.stringify(this.newSelectedCustomer));
    this.showMarkedCustomer()
    this.getCustomerData.get('newSelectedCustomer')?.setValue(this.newSelectedCustomer)
    this.getCustomers()
    // console.log(this.newSelectedCustomer, 'newSelectedCustomer')
    this.selectAllSelectedCustomerOption = false
  }

  selectAllAstro(e: any) {
    if (this.astrologersList?.astrologerList?.every((val: any) => val.checked == true)) {
      this.astrologersList?.astrologerList?.forEach((val: any) => { val.checked = false });
      this.astrologersList?.astrologerList.forEach((val: any) => { 
        this.newSelectedAstrologer = this.newSelectedAstrologer.filter((item: any) => item != val.AstroId)
      });
    }
    else {
      this.astrologersList.astrologerList?.forEach((val: any) => { val.checked = true });

      this.astrologersList.astrologerList?.forEach((item: any) => {
        this.newSelectedAstrologer.push(item.AstroId.toString())
      })
      localStorage.setItem("selected_Astro", JSON.stringify(this.newSelectedAstrologer));
    }
    this.showMarkedAstrologer()
  }

  selectAllCustomers(e: any) {
    if (this.customersList?.customerList.every((val: any) => val.checked == true)) {
      this.customersList?.customerList.forEach((val: any) => { val.checked = false });
      this.customersList?.customerList.forEach((val: any) => { 
        this.newSelectedCustomer = this.newSelectedCustomer.filter((item: any) => item != val.CustomerId)
      });
      localStorage.setItem("selected_Cust", JSON.stringify(this.newSelectedCustomer));
    }
    else {
      this.customersList?.customerList?.forEach((val: any) => { val.checked = true });
      this.customersList?.customerList?.forEach((item: any) => {
        this.newSelectedCustomer.push(item.CustomerId.toString())
      })
      localStorage.setItem("selected_Cust", JSON.stringify(this.newSelectedCustomer));
    }
    this.showMarkedCustomer()
  }

  selectAllMarkedCustomers(e: any) {
    this.getSelectedCustomerList?.result.forEach((val: any) => { 
      this.newSelectedCustomer = this.newSelectedCustomer.filter((item: any) => item != val.CustomerId)
    });
    localStorage.setItem("selected_Cust", JSON.stringify(this.newSelectedCustomer));
    this.showMarkedCustomer()
    // this.selectAllSelectedAstrologerOption = true
  }

  selectAllMarkedAstrologers(e: any) {
    this.getSelectedAstrologerList?.result.forEach((val: any) => { 
      this.newSelectedAstrologer = this.newSelectedAstrologer.filter((item: any) => item != val.AstroId)
    });
    localStorage.setItem("selected_Astro", JSON.stringify(this.newSelectedAstrologer));
    this.showMarkedAstrologer()

  }

  search(event: any) {
    this.modelChanged.next({ search: event.target.value })
  }

  searchCallChatCount(event: any) {
    this.modelChanged.next({ callChatCount: event.target.value })
  }

  resetFn() {
    this.getAstroData = this._FormBuilder.group({
      search: null,
      callChatCount: null,
      page: 1,
    })
    this.getAstrologers();
  }

  onPaginateChange($: any) {               

    if (this.TabOption == 2) {
      this.selectAllCustomerOption = false;
      this.getCustomerData.get('page')?.setValue($.pageIndex + 1);
      this.getCustomers();
    }
    else if (this.TabOption == 3) {
      this.selectAllAstrologerOption = false;
      this.getAstroData.get('page')?.setValue($.pageIndex + 1);
      this.getAstrologers();
    }
  }

  onPaginateChangeSelecCust($: any) {
    this.getSelectedCustomerData.get('page')?.setValue($.pageIndex + 1);
    this.showMarkedCustomer();
  }

  onPaginateChangeSelecAstro($: any) {
    this.getSelectedAstroData.get('page')?.setValue($.pageIndex + 1);
    this.showMarkedAstrologer();
  }

  resetCustomerFilter() {
    this.getCustomerData = this._FormBuilder.group({
      search: null,
      moneySpent: null,
      rechargeTimes: null,
      type: null,
      page: 1,
    })
  }

  setTotalValue(e: any) {
    let rate = this.scratchCardData.get('RatePerMin')?.value;
    let min = this.scratchCardData.get('Min')?.value;
    let total = rate*min;
    this.scratchCardData.get('total')?.setValue(total);
    this.setAboutOfferContents();
  }

  setAboutOfferContents() {
    let rate = this.scratchCardData.get('RatePerMin')?.value;
    let min = this.scratchCardData.get('Min')?.value;
    let total = rate*min;
    // this.scratchCardData.get('total')?.setValue(total);
    this.aboutOfferTime = this.scratchCardData.get('Min')?.value;
    this.aboutOfferCallChatType = this.scratchCardData.get('Type')?.value == '0' ? 'Call' : this.scratchCardData.get('Type')?.value =='1' ? 'Chat' : '';
    this.aboutOfferFreeOrPaid = this.scratchCardData.get('freeCheck')?.value == '0' ? 'Free' : this.scratchCardData.get('freeCheck')?.value == '1'  ? 'Paid' : '';

    if ( this.scratchCardData.get('Type')?.value == '2' ) {
      this.aboutOfferContent = 
      `
      <ul>
        <li>Offer is valid only for one time.</li>
      </ul>
      `;
    }
    else {
      this.aboutOfferContent = 
      `
      <ul>
        <li> Offer is valid only for one time.</li>
        <li> This ${this.aboutOfferFreeOrPaid} ${this.aboutOfferCallChatType} will be for ${min} minutes only.</li>
        <li> ${this.aboutOfferCallChatType} will be disconnected automatically.</li>
        <li> ${this.aboutOfferCallChatType} will connect only when astrologer will be online.</li>
      </ul>
      `;
    }

    this.setDescr(this.Editor, this.aboutOfferContent)
  }


  showMarkedCustomer() {
    // this.selectAllSelectedCustomerOption = true;
    this._AdminService.getSelectedCustomerForOffer({ ...this.getSelectedCustomerData.value, selectedCustList: this.newSelectedCustomer }).then((data) => {
      if (data?.status) {
        this.getSelectedCustomerList = data?.data;
      }
    })
  }

  showMarkedAstrologer() {
    this._AdminService.getSelectedAstrologerForOffer({ ...this.getSelectedAstroData.value, selectedAstroList: this.newSelectedAstrologer }).then((data) => {
      if (data?.status) {
        this.getSelectedAstrologerList = data?.data;
        this.getPreviewAstroDetail()
      }
    })
  }

  onReady(editor: ClassicEditor): void {
    editor.plugins.get('FileRepository').createUploadAdapter = (
      loader: any
    ) => {
      return new uploadAdapter(loader);
    };
  }

  setDescr(editor: any, aboutOffer: any) {
    if ( editor.editor ) {
      this.aboutOffer = editor.editor.getData();
    }
  }



  getPreviewAstroDetail() {
    this._AdminService.getOfferAstroDetail({  selectedAstroList: this.newSelectedAstrologer }).then((data) => {
      if (data?.status) {
        this.prevAstrologerName = data?.data;
      }
    })
  }

  days_between(y1: any,m1: any,d1: any,y2: any,m2: any,d2: any) {
      let date1 = new Date(y1, m1, d1);
      let date2 = new Date(y2, m2, d2);
      let diff = new Date(date2.getTime() - date1.getTime());

      let years = diff.getUTCFullYear() - 1970; 
      let months = diff.getUTCMonth(); 
      let days = diff.getUTCDate()-1; 
      return days
      // console.log("remaining time = " + years + " years, " + months + " months, " + days + " days.")
  }

  calculateTimeLeft() {
    const curr_date = new Date();

    let day = curr_date.getDate();
    let month = curr_date.getMonth() + 1;
    let year = curr_date.getFullYear();

    let myDate = this.scratchCardData.get('expireAt')?.value;
    if (myDate) {
      myDate = myDate.split("-");
      let myDateDay = myDate[2].split("T")

      let remainingDasysCount = this.days_between(Number(year),Number(month),Number(day),Number(myDate[0]),Number(myDate[1]),Number(myDateDay[0]))
      this.prevTimeLeft = remainingDasysCount;
    }

  }

  getDiscountDatas() {
    this._AdminService.getDiscountData().then((data) => {
      if (data?.status) {
        this.discountList = data?.data;
      }
    })
  }

  disableRatePerMin(e: any) {
    // console.log(this.scratchCardData.get('freeCheck')?.value, 'event value check...')
      if (this.scratchCardData.get('freeCheck')?.value == '0') {
        this.toggleButton = true
        this.scratchCardData.get('RatePerMin')?.setValue(0)
      }
      else {
        this.toggleButton = false
      }
      this.setAboutOfferContents()
  }

  setDefaultImages(e: any) {
    // console.log(this.scratchCardData.get('Type')?.value, 'this.scratchCardData.get.value')
    if ( this.scratchCardData.get('Type')?.value == '0' ) {
      this.disableRatePerMin(e);
      if (this.scratchCardData.get('freeCheck')?.value == '0') {
        this.scratchCardData.get('prevSrc')?.setValue('assets/images/free-call.webp')
        this.scratchCardData.get('prevScThumbnail')?.setValue('assets/images/free-call-thumbnail.webp')
        this.scratchCardData.get('offerImage')?.setValue('assets/images/free-call.webp')
        this.scratchCardData.get('offerThumbnailImg')?.setValue('assets/images/free-call-thumbnail.webp')
      }
      else {
        this.scratchCardData.get('prevSrc')?.setValue('assets/images/discounted-call.webp')
        this.scratchCardData.get('prevScThumbnail')?.setValue('assets/images/free-call-thumbnail.webp')
        this.scratchCardData.get('offerImage')?.setValue('assets/images/discounted-call.webp')
        this.scratchCardData.get('offerThumbnailImg')?.setValue('assets/images/free-call-thumbnail.webp')
      }
    }
    if (this.scratchCardData.get('Type')?.value == '1' ) {
      this.disableRatePerMin(e);
      if (this.scratchCardData.get('freeCheck')?.value == '0') {
        this.scratchCardData.get('prevSrc')?.setValue('assets/images/free-chat.webp')
        this.scratchCardData.get('prevScThumbnail')?.setValue('assets/images/free-chat-thumbnail.webp')
        this.scratchCardData.get('offerImage')?.setValue('assets/images/free-chat.webp')
        this.scratchCardData.get('offerThumbnailImg')?.setValue('assets/images/free-chat-thumbnail.webp')
      }
      else {
        this.scratchCardData.get('prevSrc')?.setValue('assets/images/discount-chats.webp')
        this.scratchCardData.get('prevScThumbnail')?.setValue('assets/images/free-chat-thumbnail.webp')
        this.scratchCardData.get('offerImage')?.setValue('assets/images/discount-chats.webp')
        this.scratchCardData.get('offerThumbnailImg')?.setValue('assets/images/free-chat-thumbnail.webp')
      }
    }
    if (this.scratchCardData.get('Type')?.value == '2' ) {
      this.scratchCardData.get('prevSrc')?.setValue('assets/images/extra-discount.webp')
      this.scratchCardData.get('prevScThumbnail')?.setValue('assets/images/extra-discount Thum.webp')
    }
  }

  checkBeforeSubmit() {
    if ( this.scratchCardData?.get('Type')?.value == '0' || this.scratchCardData?.get('Type')?.value == '1') {
      if (this.scratchCardData?.get('freeCheck')?.value == '0') {
        // console.log(this.scratchCardData?.get('Min')?.value, 'check 1')
        // console.log(this.scratchCardData?.get('RatePerMin')?.value, 'check 2')
        // console.log(this.scratchCardData?.get('expireAt')?.value, 'check 3')
        // console.log(this.scratchCardData?.get('offerThumbnailImg')?.value, 'check 4')
        // console.log(this.scratchCardData?.get('Min')?.value, 'check 1')
        if (
          // this.scratchCardData?.get('message')?.value &&
          this.scratchCardData?.get('Min')?.value &&
          this.scratchCardData?.get('expireAt')?.value &&
          this.scratchCardData?.get('offerImage')?.value &&
          this.scratchCardData?.get('offerThumbnailImg')?.value && 
          this.newSelectedAstrologer && this.newSelectedAstrologer.length > 0 &&
          this.newSelectedCustomer && this.newSelectedCustomer.length > 0
        ) {
          this.isValidForSubmit = true;
        }
      }
      else if ((this.scratchCardData?.get('freeCheck')?.value == '1')){


        if (
          // this.scratchCardData?.get('message')?.value &&
          this.scratchCardData?.get('Min')?.value &&
          this.scratchCardData?.get('RatePerMin')?.value &&
          this.scratchCardData?.get('expireAt')?.value &&
          this.scratchCardData?.get('offerImage')?.value &&
          this.scratchCardData?.get('offerThumbnailImg')?.value && 
          this.newSelectedAstrologer && this.newSelectedAstrologer.length > 0 &&
          this.newSelectedCustomer && this.newSelectedCustomer.length > 0
        ) {
          this.isValidForSubmit = true;
        }
      }
    }
    else if ( this.scratchCardData?.get('Type')?.value == '2' ) {
      if (
        // this.scratchCardData?.get('message')?.value &&
        this.scratchCardData?.get('rechargeId')?.value &&
        this.scratchCardData?.get('minOrSepecificAmt')?.value &&
        this.scratchCardData?.get('discPer')?.value &&
        // this.scratchCardData?.get('offerImage')?.value &&
        // this.scratchCardData?.get('offerThumbnailImg')?.value && 
        this.newSelectedCustomer && this.newSelectedCustomer.length > 0
      ) {
        this.isValidForSubmit = true;
      }
    }

  }

  manageNextTab() {
    if ( this.TabOption >= 1 && this.TabOption <= 3 ) {
      this.TabOption += 1;
    }
    // else {
    //   this.TabOption = 4;
    // }
  }

  manageBackTab() {
    if ( this.TabOption >= 2 && this.TabOption <= 4 ) {
      this.TabOption -= 1;
    }
    // else {
    //   this.TabOption = 1;
    // }
  }

}