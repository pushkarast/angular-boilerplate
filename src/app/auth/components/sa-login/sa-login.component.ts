import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/shared/services/admin-api/admin-api.service';
import { SpinnerService } from 'src/app/shared/services/spinner.service';
import { NotifierService } from 'src/app/shared/services/toaster.service';
import * as CryptoJS from 'crypto-js';
import { ConfigService } from 'src/app/shared/services/config.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-sa-login',
  templateUrl: './sa-login.component.html',
  styleUrls: ['./sa-login.component.css'],
})
export class SaLoginComponent implements OnInit {
  isOTP: boolean = false;
  otp: string = '';
  ip: any;
  mobile: string = '';


  constructor(
    private _Router: Router,
    private _SpinnerService: SpinnerService,
    private _AdminService: AdminService,
    private _NotifierService: NotifierService,
    private _ConfigService: ConfigService,
    private _CookieService: CookieService
  ) { }

  ngOnInit(): void {
    this.getIPAddress();
  }

  submitOTP() {
    let otpData = {
      mobile: this.mobile,
      otp: this.otp,
      ip: this.ip,
    };

    this._AdminService.submitSAOTP(otpData).then((data) => {
      if (data.status) {
        this._NotifierService.showSuccess(data.message);
        // let token=CryptoJS.AES.encrypt( data?.data?.token, this._ConfigService.config['skey']).toString()
        // this._CookieService.set('_t_',data?.data?.token, { expires: 1 })
        localStorage.setItem('_t_', data?.data?.token)
        localStorage.setItem('_ty_', data?.data?.type)
        this._Router.navigate(['/superAdmin']);
      } else {
        this._NotifierService.showError(data.message);
      }
    });
  }

  submitMobile() {
    if (this.mobile !== '' && this.mobile.length == 10) {
      this._SpinnerService.setState(true)
      this._AdminService
        .submitSAMobile({ mobile: this.mobile, ip: this.ip })
        .then((data) => {
          if (data.status) {
            this.isOTP = true;
            this._NotifierService.showSuccess(data.message);
            this._SpinnerService.setState(false)
          } else {
            this._NotifierService.showError(data.message);
            this._SpinnerService.setState(false)
          }
        });
    } else {
      this._NotifierService.showError('Please enter a valid number');
      this._SpinnerService.setState(false)
    }
  }

  getIPAddress() {
    this._AdminService.getIP().then(($: any) => {
      this.ip = $?.ip.split(',');
      this.ip = this.ip[0];
    });
    // this.ip="192.168.0.102"

  }

  onOtpChange(event: any) {
    this.otp = event;
  }
}
