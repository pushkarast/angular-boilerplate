import { Component, OnInit,EventEmitter,Output } from '@angular/core';
import option from "../../../../../assets/constants/ngSelectvalues"
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from 'src/app/shared/services/admin-api/admin-api.service';
import { SpinnerService } from 'src/app/shared/services/spinner.service';
import { NotifierService } from 'src/app/shared/services/toaster.service';
import { ActivatedRoute,Router } from '@angular/router';
import { Params } from '@angular/router';

@Component({
  selector: 'app-customer-profile',
  templateUrl: './customer-profile.component.html',
  styleUrls: ['./customer-profile.component.css']
})
export class CustomerProfileComponent {

  gender = option.gender;
  cusomerId: any = null
  customerName: string = ""
  profileImage: any = null
  totalCallCount: any = null
  totalChatCount: any = null
  totalVideoCallCount: any = null
  feedbackList: any = null
  callLogsList: any = null 
  txnReportList: any = null 
  TabOption: number = 0
  customerData: FormGroup
  accountStatus: any = null
  customerMoblieNo: any = null
  callLogsStatus: any = null
  freePromotionalData: any = null 
  totalFreePromoCount: number = 0
  routerString: string = "customer-profile"

  constructor(
    private _FormBuilder: FormBuilder,
    private _AdminService: AdminService,
    private _SpinnerService: SpinnerService,
    private _NotifierService: NotifierService,
    private _ActivatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.customerData = this._FormBuilder.group({
      CustomerId: [null, [Validators.required]],
      FirstName: [null, [Validators.required]],
      LastName: [null, [Validators.required]],
      Gender: [null, [Validators.required]],
      DOB: [null, [Validators.required]],
      BirthTime: [null, [Validators.required]],
      BirthPlace: [null, [Validators.required]],
      Address: [null, [Validators.required]],
      MobileNo: [null, [Validators.required]],
      maritial_status: [''],
      termsConditon: [null, [Validators.required]],
      image1: [null, [Validators.required]],
    })
  }

  ngOnInit(): void {
    this._ActivatedRoute.queryParams.subscribe(params => {
      this.cusomerId = params["id"]
    })
    this.fetchCustomerData();
  }

  fetchCustomerData() {
    this._SpinnerService.setState(true)
    this._AdminService.getCustomerDetailById({ CustomerId: this.cusomerId }).then((data) => {
      if (data?.status) {
        if ( this.TabOption == 0 ) {
          this.customerName = data?.data?.customerDetails?.FirstName + " " + data?.data?.customerDetails?.LastName
          this.profileImage = data?.data?.customerDetails?.image1
          this.totalCallCount = data?.data?.callLogs?.totalCallCount
          this.totalChatCount = data?.data?.callLogs?.totalChatCount        
          this.totalVideoCallCount = data?.data?.callLogs?.totalVideoCallCount
          this.feedbackList = data?.data?.feedbackList
          this.callLogsList = data?.data?.recentCallLogsList
          this.txnReportList = data?.data?.txnReport
          this.accountStatus = data?.data?.customerDetails?.Status
          this.customerMoblieNo = data?.data?.customerDetails?.MobileNo
          this.callLogsStatus = data?.data?.callLogsStatus;
          this.freePromotionalData = data?.data?.freePromotionalData;
          this.totalFreePromoCount = data?.data?.callLogs?.totalFreePromotional
        }
        else if (this.TabOption == 1 ) {
          this.customerData.patchValue(data?.data?.customerDetails);
        }

        
        // this.customerData.patchValue(data?.data?.customerDetails);
        // this.languages = data?.data?.languageList;
        // this.skills = data?.data?.skills;
        // this.astroData.get('OnBoardDescP')?.setValue(Buffer?.from(this.astroData.get('OnBoardDescP')?.value, "base64").toString())
        // this.astroData.get('BioDescP')?.setValue(Buffer?.from(this.astroData.get('BioDescP')?.value, "base64").toString())
        // this.astroSkills = JSON.parse(this.astroData.get('Skills')?.value).map((value: any) => value.value);
        // this.astroLanguage = JSON.parse(this.astroData.get('Language')?.value).map((value: any) => value.value);
        // this.astroData.get('Language')?.setValue(this.astroLanguage);
        // this.astroData.get('Skills')?.setValue(this.astroSkills);
      }
      this._SpinnerService.setState(false)
    })
  }

  setTabOption(data: any) {
    this.TabOption = data;
    this.fetchCustomerData();
  }

  updateProfile() {
    this._AdminService.updateCustomerProfile(this.customerData.value).then((data) => {
      if (data?.status) {
        this._NotifierService.showSuccess(data?.message);
        this.fetchCustomerData();
      } else {
        this._NotifierService.showError("Some Error Occurred");
      }
    })
  }

  // fetchUpdateCustomerData() {
  //   this._SpinnerService.setState(true)
  //   this._AdminService.getCustomerDetailById({ CustomerId: this.cusomerId }).then((data) => {
  //     if (data?.status) {
  //       this.customerData.patchValue(data?.data?.customerDetails);
  //       // this.languages = data?.data?.languageList;
  //       // this.skills = data?.data?.skills;
  //       // this.astroData.get('OnBoardDescP')?.setValue(Buffer?.from(this.astroData.get('OnBoardDescP')?.value, "base64").toString())
  //       // this.astroData.get('BioDescP')?.setValue(Buffer?.from(this.astroData.get('BioDescP')?.value, "base64").toString())
  //       // this.astroSkills = JSON.parse(this.astroData.get('Skills')?.value).map((value: any) => value.value);
  //       // this.astroLanguage = JSON.parse(this.astroData.get('Language')?.value).map((value: any) => value.value);
  //       // this.astroData.get('Language')?.setValue(this.astroLanguage);
  //       // this.astroData.get('Skills')?.setValue(this.astroSkills);
  //     }
  //     this._SpinnerService.setState(false)
  //   })
  // }
  blockUser() {
    this._AdminService.blockUserByAdmin({ CustomerId: this.cusomerId}).then((data) => {
      if (data?.status) {
        this._NotifierService.showSuccess(data?.message);
        this.fetchCustomerData();
      } else {
        this._NotifierService.showError("Some Error Occurred");
      }
    })
  }

  setLinkOption(text: any) {
    const queryParams: Params = { type: `${text}`, id: this.cusomerId };
    
    if ( text == 'feedback' ) {
      this.routerString = "customer-feedbacks"
    }
    else if ( text == 'callLog' ) {
      this.routerString = "call-history"
    }    
    else if ( text == 'txn' ) {
      this.routerString = "txn-history"
    }
    

    this.router.navigate(
      [`/superAdmin/mng-customers/customer-view/${this.routerString}`], 
      {
        relativeTo: this._ActivatedRoute,
        queryParams, 
        // queryParamsHandling: 'merge', // remove to replace all query params by provided
      });
  }

}