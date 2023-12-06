import { Component } from '@angular/core';
import option from '../../../../assets/constants/ngSelectvalues';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AdminService } from 'src/app/shared/services/admin-api/admin-api.service';
import { SpinnerService } from 'src/app/shared/services/spinner.service';
import { NotifierService } from 'src/app/shared/services/toaster.service';
import { ActivatedRoute } from '@angular/router';
import { CommonService } from 'src/app/shared/services/common.service';
@Component({
  selector: 'app-custom-recharge',
  templateUrl: './custom-recharge.component.html',
  styleUrls: ['./custom-recharge.component.css']
})
export class CustomRechargeComponent {
  option = option.customRecharge;
  rechargeForm: FormGroup;
  isOTP: boolean = false;
  otp: string = '';
  ip: any;
  mobile: string = '';
  adminNum: any = null;
  initialValues: any;
  constructor(
    private _FormBuilder: FormBuilder,
    private _AdminService: AdminService,
    private _SpinnerService: SpinnerService,
    private _NotifierService: NotifierService,
    private _ActivatedRoute: ActivatedRoute,
    private _CommonService: CommonService
  ) {
    this.rechargeForm = this._FormBuilder.group({
      type: [1],
      mobileNo: [null],
      Amount: [null],
      otp: [null],
      paymentId: [null]
    });
  }
  ngOnInit(): void {
    this.initialValues = this.rechargeForm.value;
  }
  // submitOTP() {
  //   let otpData = {
  //     mobile: this.rechargeForm.get('adminNum')?.value,
  //     otp: this.otp,
  //     ip: this.ip,
  //   };
  //   this._AdminService.submitSAOTP(otpData).then((data) => {
  //     if (data.status) {
  //       this.recharge();
  //       this.isOTP = false;
  //       this.rechargeForm.reset(this.initialValues);
  //     } else {
  //       this._NotifierService.showError(data.message);
  //     }
  //   });
  // }
  submitMobile() {
    this._SpinnerService.setState(true)
    this._AdminService
      .sendAdminOTP()
      .then((data) => {
        if (data.status) {
          this.isOTP = true;
          this._NotifierService.showSuccess(data.message);
          this._SpinnerService.setState(false);
        } else {
          this._NotifierService.showError(data.message);
          this._SpinnerService.setState(false)
        }
      });
  }
  recharge() {
    this._AdminService
      .customRecharge(this.rechargeForm.value)
      .then((data) => {
        if (data.status) {
          this._NotifierService.showSuccess(data.message);
          this._SpinnerService.setState(false);
          this.isOTP = false;
          this.rechargeForm.reset(this.initialValues);
        } else {
          this._NotifierService.showError(data.message);
          this._SpinnerService.setState(false)
        }
      });
  }
  onOtpChange(event: any) {
    this.rechargeForm.get('otp')?.setValue(event);
  }

}
