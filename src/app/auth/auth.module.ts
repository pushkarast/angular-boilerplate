import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './components/login/login.component';
import { SaLoginComponent } from './components/sa-login/sa-login.component';
import { NgOtpInputModule } from 'ng-otp-input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    AuthComponent,
    LoginComponent,
    SaLoginComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    NgOtpInputModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ]
})
export class AuthModule { }
