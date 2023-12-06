import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from 'src/app/shared/services/admin-api/admin-api.service';
import { SpinnerService } from 'src/app/shared/services/spinner.service';
import { NotifierService } from 'src/app/shared/services/toaster.service';
import options from '../../../../../assets/constants/ngSelectvalues';
@Component({
  selector: 'app-astrosetting',
  templateUrl: './astrosetting.component.html',
  styleUrls: ['./astrosetting.component.css']
})
export class AstrosettingComponent {
  bankDetails: FormGroup;
  astroSettings: FormGroup;
  earningSettings: FormGroup;
  seoSettings: FormGroup;
  promoSettings: FormGroup;
  sharePass: FormGroup;
  tag: FormGroup;
  astroId: any;
  status: any;
  astroProf: any;
  show = false;
  password = "password"
  isEdit: boolean = false
  tags = options?.tags;
  categories = options?.categories;
  permissionsArr: any;
  constructor(
    private _AdminService: AdminService,
    private _FormBuilder: FormBuilder,
    private _SpinnerService: SpinnerService,
    private _NotifierService: NotifierService,
    private _ActivatedRoute: ActivatedRoute
  ) {
    this.bankDetails = this._FormBuilder.group({
      BankName: [null],
      AccountNo: [null],
      AccountName: [null],
      IFSCCode: [null],
      AccountBranch: [null]
    });
    this.astroSettings = this._FormBuilder.group({
      c_status: [null],
      promotional_call_charges: [null],
      promotional_chat_charges: [null],
      second_promotional: [null],
      third_promotional: [null],
      promotional_per_day: [null],
      ChatEnable: [null],
      ChatSlabF: [null],
      ChatSlabT: [null],
      ChatCharges: [null],
      CallEnable: [null],
      CallSlabF: [null],
      CallSlabT: [null],
      CallCharges: [null],
      EmergencyChat: [null],
      EChatSlabF: [null],
      EChatSlabT: [null],
      EChatCharges: [null],
      EmergencyCall: [null],
      ECallSlabF: [null],
      ECallSlabT: [null],
      ECallCharges: [null],
      VCEnable: [null],
      VCCharges: [null],
      IsBusy: [],
      IsOnBoard: [],
      restrictRepeat: [null],
      fixedPromoPrice: [null],
      fixedPrice1: [null],
      fixedPrice2: [null],
      calloptDisable: [null],
      chatoptDisable: [null],
      vcalloptDisable: [null]
    });
    this.promoSettings = this._FormBuilder.group({
      status0: [0],
      slotPrice0: [0.0],
      slotPromoCount0: [5],
      id0: [null],
      status1: [0],
      slotPrice1: [0.0],
      slotPromoCount1: [5],
      id1: [null],
      status2: [0],
      slotPrice2: [0.0],
      slotPromoCount2: [5],
      id2: [null],
      status3: [0],
      slotPrice3: [0.0],
      slotPromoCount3: [5],
      id3: [null],
    })
    this.earningSettings = this._FormBuilder.group({
      astroshareper: [null],
      compshareper: [null],
      pg_per: [null],
      tds_per: [null],
      gstper: [null]
    });
    this.seoSettings = this._FormBuilder.group({
      seo_title: [null],
      seo_description: [null],
      seo_keywords: [null]
    });
    this.sharePass = this._FormBuilder.group({
      appPass: [null]
    });
    this.tag = this._FormBuilder.group({
      categories: [],
      tagsArr: []
    });
  }
  ngOnInit(): void {
    this._ActivatedRoute.queryParams.subscribe(params => {
      this.astroId = params["astroid"];
    })
    this.fetchAstrosetting();
    this.fetchPromoSlots()
  }

  fetchPromoSlots() {
    this._AdminService.getPromotionalSlots({ astroId: this.astroId }).then((data) => {
      if (data?.status && data?.data) {
        this.isEdit = true
        for (const [index, value] of data?.data.entries()) {
          this.promoSettings.get(`status${index}`)?.setValue(Number(value?.status));
          this.promoSettings.get(`slotPrice${index}`)?.setValue(value?.slotPrice);
          this.promoSettings.get(`slotPromoCount${index}`)?.setValue(value?.slotPromoCount);
          this.promoSettings.get(`id${index}`)?.setValue(value?.id);
        }
      }
    })
  }

  fetchAstrosetting() {
    this._SpinnerService.setState(true)
    this._AdminService.getAstrosettings({ astroId: this.astroId }).then((data) => {
      const astroSetdata = data?.data?.astroSet;
      this.bankDetails.patchValue(astroSetdata);
      this.astroSettings.patchValue(astroSetdata);
      this.earningSettings.patchValue(astroSetdata);
      this.seoSettings.patchValue(astroSetdata) ;
      this.tag.get('tagsArr')?.setValue(JSON.parse(astroSetdata?.tags));
      this.tag.get('categories')?.setValue(JSON.parse(astroSetdata?.categories));
      //options to disable chat/call/video call to astrologers
      //uncomment this
      // const enableOptions = JSON.parse(astroSetdata.enableOptions);
      // this.astroSettings.get('calloptDisable')?.setValue(enableOptions?.callDisable);
      // this.astroSettings.get('chatoptDisable')?.setValue(enableOptions?.chatDisable);
      // this.astroSettings.get('vcalloptDisable')?.setValue(enableOptions?.vcallDisable);
      this.astroProf = data?.data?.astroProf;
      console.log(data?.data?.astroProf)
      this.astroSettings.get('IsOnBoard')?.setValue(this.astroProf?.IsOnBoard)
    })
    this._SpinnerService.setState(false)
  }

  updatePromoSlots() {
    this._SpinnerService.setState(true)
    let finalData: any = [];
    for (let i = 0; i < 4; i++) {
      let obj = {
        status: this.promoSettings.get(`status${i}`)?.value,
        slotPrice: this.promoSettings.get(`slotPrice${i}`)?.value,
        slotPromoCount: this.promoSettings.get(`slotPromoCount${i}`)?.value,
        id: this.promoSettings.get(`id${i}`)?.value,
      };
      finalData.push(obj);
    }
    this._AdminService.updatePromotionalSlots({ promoSlots: finalData, astroId: this.astroId, isEdit: this.isEdit }).then(data => {
      if (data?.status) {
        this._NotifierService.showSuccess('Promotional Slot Updated Successfully')
        this.fetchPromoSlots()
      } else {
        this._NotifierService.showError('Something Went Wrong')
      }
    })
    this._SpinnerService.setState(false)
  }

  updateAstrosetting(type: any) {
    this._SpinnerService.setState(true);
    let formData;
    if (type == "bank")
      formData = this.bankDetails?.value
    else if (type == "earning")
      formData = this.earningSettings?.value
    else if (type == "seo")
      formData = this.seoSettings?.value
    else if (type == "settings") {
      if (this.astroSettings.get('VCCharges')?.value == 0) {
        this.astroSettings.get('VCCharges')?.setValue(this.astroSettings.get('CallCharges')?.value)
      }
      formData = this.astroSettings?.value
    }
    else if (type == "share") {
      formData = this.sharePass?.value
    }
    else if (type == "tags") {
      const data = {
        tags: JSON.stringify(this.tag.get('tagsArr')?.value),
        categories: JSON.stringify(this.tag.get('categories')?.value)
      }
      formData = data;
    }
    this._AdminService.updateAstrosettings({ astroId: this.astroId, type: type, formData }).then((data) => {
      if (data?.status) {
        this._SpinnerService.setState(false);
        this._NotifierService.showSuccess(data?.message)
      }
      this.sharePass.reset();
    });
    this._SpinnerService.setState(false);
  }
  setValue(type: any, event: any) {
    console.log(type);

    if (type == "c_status") {
      const c_status = event.target.checked ? "P" : "F";
      this.astroSettings.get('c_status')?.setValue(c_status);
    }
    else if (type == "tags") {
      let tagsArr: any = [];
      event.map((element: any) => {
        tagsArr.push(element?.value)
      })
      this.tag.get('tagsArr')?.setValue(tagsArr);
    }
    else if (type == "categories") {
      let categories: any = [];
      event.map((element: any) => {
        categories.push(element?.value)
      })
      this.tag.get('categories')?.setValue(categories);
    }
    else if (type == "calloptDisable" || type == "vcalloptDisable" || type == "chatoptDisable")
      this.astroSettings.get(type)?.setValue(event.target.checked);
    else
      this.astroSettings.get(type)?.setValue(event.target.checked ? "1" : "0");
    console.log(event.target.checked)
    console.log(this.astroSettings.value)
  }

  handlePromoOnOff(event: any, i: any) {
    this.promoSettings.get(`status${i}`)?.setValue(event.target.checked ? 1 : 0)
  }

  changeStatus(status: any) {
    let isOnline = false;
    this._SpinnerService.setState(true);
    if (status == 'Online')
      isOnline = true;
    this._AdminService.changeStatus({ astroId: this.astroId, markOnline: isOnline }).then((data) => {
      if (data?.status) {
        this._NotifierService.showSuccess("Astrologer marked " + status);
        this.fetchAstrosetting();
      }
      else
        this._NotifierService.showError(data?.message);
      this._SpinnerService.setState(false);
    })
  }
  passwordShow() {
    this.show = !this.show;
    if (this.show)
      this.password = "text"
    else
      this.password = "password"
  }
}
