import { Component, OnInit } from '@angular/core';
import option from "../../../../../assets/constants/ngSelectvalues"
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from 'src/app/shared/services/admin-api/admin-api.service';
import { SpinnerService } from 'src/app/shared/services/spinner.service';
import { NotifierService } from 'src/app/shared/services/toaster.service';
import { ActivatedRoute } from '@angular/router';
import { Buffer } from 'buffer';
import { CommonService } from 'src/app/shared/services/common.service';
@Component({
  selector: 'app-astro-profile',
  templateUrl: './astro-profile.component.html',
  styleUrls: ['./astro-profile.component.css']
})
export class AstroProfileComponent implements OnInit {
  country = option.country;
  gender = option.gender;
  isWorking = option.notifications.scheduleIt;
  astroData: FormGroup;
  isFormSubmitted: boolean = false;
  languages = [];
  skills = [];
  fileViewer = "";
  astroLanguage: any;
  astroSkills: any;
  type = "";
  permission: any;
  startDate = new Date();
  constructor(
    private _FormBuilder: FormBuilder,
    private _AdminService: AdminService,
    private _SpinnerService: SpinnerService,
    private _NotifierService: NotifierService,
    private _ActivatedRoute: ActivatedRoute,
    private _CommonService: CommonService
  ) {
    this.astroData = this._FormBuilder.group({
      AstroId: [null, [Validators.required]],
      FullName: [null, [Validators.required]],
      EmailId: [null, [Validators.required]],
      CountryId: [null, [Validators.required]],
      MobileNo: [null, [Validators.required]],
      Gender: [null, [Validators.required]],
      DOB: [null, [Validators.required]],
      Experience: [null, [Validators.required]],
      HrsContribute: [null, [Validators.required]],
      IsWorking: [null, [Validators.required]],
      PlatformName: [''],
      MonthlyIncome: [null, [Validators.required]],
      OnBoardDescP: [null, [Validators.required]],
      CityLiveIn: [null, [Validators.required]],
      SourceOfBusiness: [null, [Validators.required]],
      BioDescP: [null, [Validators.required]],
      profileImg: [null, [Validators.required]],
      Language: [null, [Validators.required]],
      Skills: [null, [Validators.required]],
      DisplayName: [null, [Validators.required]]
    })
  }
  ngOnInit(): void {
    this._ActivatedRoute.queryParams.subscribe(params => {
      this.astroData.get('AstroId')?.setValue(params["astroid"])
      this.type = params["type"]
      if (params['permit'])
        this.permission = Buffer.from(params['permit'], 'base64').toString(
          'ascii'
        );
    })
    this.fetchAstrodata();
  }
  getPermisson(p_type: any) {
    return this._CommonService.getPermission(this.permission, p_type);
  }
  fetchAstrodata() {
    this._SpinnerService.setState(true)
    const allData = {
      AstroId: this.astroData.get('AstroId')?.value,
      from: this.startDate.setUTCHours(0, 0, 0, 0).valueOf() + new Date().getTimezoneOffset() * 1000 * 60,
      to: this.startDate.setUTCHours(23, 59, 59, 999).valueOf() + new Date().getTimezoneOffset() * 1000 * 60
    }
    this._AdminService.getAstrodetail(allData).then((data) => {
      if (data?.status) {
        this.astroData.patchValue(data?.data?.astroData);
        this.languages = data?.data?.languageList;
        this.skills = data?.data?.skills;
        this.astroData.get('OnBoardDescP')?.setValue(Buffer?.from(this.astroData.get('OnBoardDescP')?.value, "base64").toString())
        this.astroData.get('BioDescP')?.setValue(Buffer?.from(this.astroData.get('BioDescP')?.value, "base64").toString())
        this.astroSkills = JSON.parse(this.astroData.get('Skills')?.value)?.map((value: any) => value.value);
        this.astroLanguage = JSON.parse(this.astroData.get('Language')?.value)?.map((value: any) => value.value);
        this.astroData.get('Language')?.setValue(this.astroLanguage);
        this.astroData.get('Skills')?.setValue(this.astroSkills);
      }
      this._SpinnerService.setState(false)
    })
  }
  onBoardastro() {
    this._SpinnerService.setState(true)
    const astroName = this.astroData.get('FullName')?.value;
    const astroId = this.astroData.get('AstroId')?.value;
    if (confirm(`Do you want to onBoard ${astroName}`) == true) {
      this._AdminService.updateAstrostatus({ astroid: astroId }).then((data) => {
        if (data?.status) {
          this._NotifierService.showSuccess("Astrologer Onboarded")
        }
        else {
          this._NotifierService.showError("Some Error Occurred");

        }
      })
    }
    this._SpinnerService.setState(false)
  }
  setData() {
    if (this.astroData?.valid) {
      this.astroData.get('OnBoardDescP')?.setValue(Buffer.from(this.astroData.get('OnBoardDescP')?.value, "utf8").toString("base64"))
      this.astroData.get('BioDescP')?.setValue(Buffer.from(this.astroData.get('BioDescP')?.value, "utf8").toString("base64"))

      this._SpinnerService.setState(true)
      this._AdminService.setAstrodetail(this.setFormData()).then((data) => {
        if (data)
          this._NotifierService.showSuccess("Data Updated Successfully");
        else
          this._NotifierService.showSuccess("Somer Error Occurred");
        this.fetchAstrodata();
      });
    } else {
      this._NotifierService.showError("Please enter all the required fields");
    }
    this._SpinnerService.setState(false);
  }
  setFormData() {
    const formData = new FormData();
    formData.set('AstroId', this.astroData.get('AstroId')?.value);
    formData.set('FullName', this.astroData.get('FullName')?.value);
    formData.set('DisplayName', this.astroData.get('DisplayName')?.value);
    formData.set('EmailId', this.astroData.get('EmailId')?.value);
    formData.set('CountryId', this.astroData.get('CountryId')?.value);
    formData.set('MobileNo', this.astroData.get('MobileNo')?.value);
    formData.set('Gender', this.astroData.get('Gender')?.value);
    formData.set('DOB', this.astroData.get('DOB')?.value);
    formData.set('Experience', this.astroData.get('Experience')?.value);
    formData.set('HrsContribute', this.astroData.get('HrsContribute')?.value);
    formData.set('IsWorking', this.astroData.get('IsWorking')?.value);
    formData.set('PlatformName', this.astroData.get('PlatformName')?.value);
    formData.set('MonthlyIncome', this.astroData.get('MonthlyIncome')?.value);
    formData.set('OnBoardDescP', this.astroData.get('OnBoardDescP')?.value);
    formData.set('CityLiveIn', this.astroData.get('CityLiveIn')?.value);
    formData.set('SourceOfBusiness', this.astroData.get('SourceOfBusiness')?.value);
    formData.set('BioDescP', this.astroData.get('BioDescP')?.value);
    formData.set('profileImg', this.astroData.get('profileImg')?.value);
    formData.set('Language', JSON.stringify(this.astroData.get('Language')?.value));
    formData.set('Skills', JSON.stringify(this.astroData.get('Skills')?.value));
    return formData;
  }
  fileupload(event: Event): void {
    if (event.target !== null) {
      const files = (<HTMLInputElement>event.target).files;
      if (files !== null) {
        const fileList: FileList = files;
        if (fileList && fileList.length > 0) {
          const file: File = fileList[0];
          this.astroData.get('profileImg')?.setValue(file)
          this.fileViewer = file.name;
        }
      }
    }
  }
  isAdmin() {
    return this._CommonService.checkUserType()?.userType != 'admin'
  }
}
