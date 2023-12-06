import { Component } from '@angular/core';
import option from '../../../../../assets/constants/ngSelectvalues';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AdminService } from 'src/app/shared/services/admin-api/admin-api.service';
import { SpinnerService } from 'src/app/shared/services/spinner.service';
import { NotifierService } from 'src/app/shared/services/toaster.service';
import { ActivatedRoute } from '@angular/router';
import { CommonService } from 'src/app/shared/services/common.service';
@Component({
  selector: 'app-modify-userwallet',
  templateUrl: './modify-userwallet.component.html',
  styleUrls: ['./modify-userwallet.component.css']
})
export class ModifyUserwalletComponent {
  option = option.customRecharge;
  walletForm: FormGroup;
  isOTP: boolean = false;
  otp: string = '';
  ip: any;
  mobile: string = '';
  adminNum: any = null;
  initialValues: any;
  cusomerId: any = null;
  constructor(
    private _FormBuilder: FormBuilder,
    private _AdminService: AdminService,
    private _SpinnerService: SpinnerService,
    private _NotifierService: NotifierService,
    private _ActivatedRoute: ActivatedRoute,
    private _CommonService: CommonService
  ) {
    this.walletForm = this._FormBuilder.group({
      customerId: [null],
      type: [1],
      remarks: [null],
      amount: [null],
      otp: [null]
    });
  }
  ngOnInit(): void {
    this._ActivatedRoute.queryParams.subscribe(params => {
      this.cusomerId = params["id"]
      this.walletForm.get('customerId')?.setValue(this.cusomerId);
    })
    this.initialValues = this.walletForm.value;
  }
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
  onOtpChange(event: any) {
    this.walletForm.get('otp')?.setValue(event);
  }
  recharge() {
    console.log(this.walletForm?.value)
    this._SpinnerService.setState(true)
    this._AdminService
      .addRemoveuserwall(this.walletForm?.value)
      .then((data) => {
        if (data?.status) {
          this.walletForm.reset(this.initialValues);
          this.isOTP = false;
          this._NotifierService.showSuccess("Changes has been made to wallet")
        } else
          this._NotifierService.showError(data?.message)
      });

    this._SpinnerService.setState(false)
  }
}
