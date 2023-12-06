import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/shared/services/admin-api/admin-api.service';
import { SpinnerService } from 'src/app/shared/services/spinner.service';
import { NotifierService } from 'src/app/shared/services/toaster.service';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userInfo: FormGroup
  email: String = ""
  password: String = ""
  constructor(
    private _SpinnerService: SpinnerService,
    private _AdminService: AdminService,
    private _NotifierService: NotifierService,
    private _FormBuilder: FormBuilder,
    private _Router: Router,
  ) {
    this.userInfo = this._FormBuilder.group({
      email: ["", Validators.required],
      password: ["", Validators.required],
      ip: [{}]
    })
  }

  ngOnInit(): void { }

  submitLogin() {
    let ip: any;
    this._AdminService.getIP().then(($: any) => {
      console.log("OK", $)
      ip = $?.ip.split(',');
      ip = ip[0];
      this.userInfo.get('ip')?.setValue(ip)
      if (this.userInfo?.valid) {
        this._SpinnerService.setState(true)
        this._AdminService
          .adminUserlogin(this.userInfo.value)
          .then((data) => {
            console.log(data)
            if (data.status) {
              this._NotifierService.showSuccess(data.message);
              localStorage.setItem('_t_', data?.data?.token);
              localStorage.setItem('_p_', data?.data?.permission);
              localStorage.setItem('_ty_', data?.data?.type);
              this._Router.navigate(['/superAdmin']);
              this._SpinnerService.setState(false)
            } else {
              this._NotifierService.showError(data.message);
              this._SpinnerService.setState(false)
            }
          });
      } else {
        this._NotifierService.showError('Email/Password mismatch');
        this._SpinnerService.setState(false)
      }
    });

  }

}
