import { Component, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AdminService } from 'src/app/shared/services/admin-api/admin-api.service';
import { CommonService } from 'src/app/shared/services/common.service';
import { SpinnerService } from 'src/app/shared/services/spinner.service';
import { NotifierService } from 'src/app/shared/services/toaster.service';
import { Buffer } from 'buffer';
import * as XLSX from 'xlsx';
import { Subject, debounceTime, distinctUntilChanged } from 'rxjs';
import option from '../../../../assets/constants/ngSelectvalues';

@Component({
  selector: 'app-astro-registration',
  templateUrl: './astro-registration.component.html',
  styleUrls: ['./astro-registration.component.css']
})
export class AstroRegistrationComponent {
  astroData: FormGroup;
  modalRef?: BsModalRef;
  modelChanged: Subject<any> = new Subject<any>();
  searchText: any = ""
  page = 1;
  permission: any;
  astroList: any = [];
  fileViewer = '';
  languageList: any;
  skillList: any;
  yesno = option.yesno;
  country = option.country
  gender = option.gender
  constructor(
    private _FormBuilder: FormBuilder,
    private _AdminService: AdminService,
    private _SpinnerService: SpinnerService,
    private _NotifierService: NotifierService,
    private modalService: BsModalService,
    private _ActivatedRoute: ActivatedRoute,
    private _CommonService: CommonService
  ) {
    this.astroData = this._FormBuilder.group({
      MobileNo: [null, Validators.required],
      CountryId: [null, Validators.required],
      Fullname: [null, Validators.required],
      Address: [null, Validators.required],
      DOB: [null, Validators.required],
      Email: [null, Validators.required],
      PlatformName: "",
      Earning: 0,
      Experience: [null, Validators.required],
      Gender: [null, Validators.required],
      HrsContributed: [null, Validators.required],
      InterviewTime: [null, Validators.required],
      IsRefered: [null, Validators.required],
      IsWorking: [null, Validators.required],
      LanguageId: [null, Validators.required],
      OnBoardComment: [null, Validators.required],
      PrimarySkillId: [null, Validators.required],
      ReferedPersonName: "",
      SourceOfBusiness: "",
      city: [null, Validators.required],
      OnBoardDescP: "",
      profile_img: ""
    });
  }
  get registerFormControl() {
    return this.astroData.controls;
  }
  ngOnInit(): void {
    this.modelChanged.pipe(debounceTime(300), distinctUntilChanged()).subscribe((val) => {
      this.searchText = val?.search;
      this.getnewAstro()
    });
    this._ActivatedRoute.queryParams.subscribe((params) => {
      if (params['permit'])
        this.permission = Buffer.from(params['permit'], 'base64').toString(
          'ascii'
        );
    });
    this.getnewAstro();
  }
  getnewAstro() {
    this.astroData.reset();
    this._SpinnerService.setState(true);
    this._AdminService
      .fetchNewastro({ page: this.page, search: this.searchText })
      .then((data) => {
        if (data?.status) {
          this.astroList = data?.data;
          this.languageList = data?.data?.langSkills?.language
          this.skillList = data?.data?.langSkills?.skills
        } else {
          this._NotifierService.showError('Some Error Occurred');
        }
      });
    this._SpinnerService.setState(false);
  }
  getPermisson(p_type: any) {
    return this._CommonService.getPermission(this.permission, p_type);
  }
  openModal(template: TemplateRef<any>) {
    this.astroData.reset();
    this.getnewAstro();
    this.modalRef = this.modalService.show(template, {
      class: 'modal-xl',
      backdrop: 'static',
      keyboard: false,
    });
  }
  closeModal(type = '') {
    this.astroData.reset();
    this.modalRef?.hide();
    this.getnewAstro();
  }
  search(event: any) {
    this.page = 1;
    this.modelChanged.next({ search: event.target.value })
    this.getnewAstro()
  }
  pagination($: any) {
    this.page = $.pageIndex + 1;
    this.getnewAstro();
  }
  deleteAstro(astroId: any = null) {
    if (confirm(`Are you sure want to delete`) == true) {
      this._SpinnerService.setState(true);
      this._AdminService
        .deleteNewastro({ astroId: astroId }).then((data) => {
          if (data?.status) {
            this._NotifierService.showSuccess('Astrologer Deleted');
            this.getnewAstro();
          } else {
            this._NotifierService.showError('Some Error Occurred');
          }
        });
      this._SpinnerService.setState(false);
    }
  }
  onSubmit() {
    this._AdminService
      .astroRegistration(this.setFormData()).then((data) => {
        if (data?.status) {
          this._NotifierService.showSuccess("Astrologer Addedd Success");
        }
        else {
          this._NotifierService.showSuccess(data?.message);
        }
      });
  }
  fileupload(event: Event): void {
    if (event.target !== null) {
      const files = (<HTMLInputElement>event.target).files;
      if (files !== null) {
        const fileList: FileList = files;
        if (fileList && fileList.length > 0) {
          const file: File = fileList[0];
          this.fileViewer = file.name;
          console.log(this.fileViewer)
          this.astroData.get('profile_img')?.setValue(file)
        }
      }
    }
  }
  setFormData() {
    const formData = new FormData();
    formData.set('Fullname', this.astroData.get('Fullname')?.value);
    formData.set('Email', this.astroData.get('Email')?.value);
    formData.set('CountryId', this.astroData.get('CountryId')?.value);
    formData.set('MobileNo', this.astroData.get('MobileNo')?.value);
    formData.set('Gender', this.astroData.get('Gender')?.value);
    formData.set('DOB', this.astroData.get('DOB')?.value);
    formData.set('Experience', this.astroData.get('Experience')?.value);
    formData.set('HrsContributed', this.astroData.get('HrsContributed')?.value);
    formData.set('IsWorking', this.astroData.get('IsWorking')?.value);
    formData.set('PlatformName', this.astroData.get('PlatformName')?.value);
    formData.set('Earning', this.astroData.get('Earning')?.value);
    formData.set('city', this.astroData.get('city')?.value);
    formData.set('SourceOfBusiness', this.astroData.get('SourceOfBusiness')?.value);
    formData.set('OnBoardDescP', Buffer?.from(this.astroData.get('OnBoardDescP')?.value).toString('base64'));
    formData.set('profileImg', this.astroData.get('profileImg')?.value);
    formData.set('LanguageId', this.astroData.get('LanguageId')?.value);
    formData.set('PrimarySkillId', this.astroData.get('PrimarySkillId')?.value);
    formData.set('InterviewTime', this.astroData.get('InterviewTime')?.value);
    formData.set('IsRefered', this.astroData.get('IsRefered')?.value);
    formData.set('OnBoardComment', this.astroData.get('OnBoardComment')?.value);
    formData.set('ReferedPersonName', this.astroData.get('ReferedPersonName')?.value);
    formData.set('profile_img', this.astroData.get('profile_img')?.value);
    return formData;
  }
  exportexcel() {
    let fileName = 'New AstroList.xlsx';
    this._AdminService
      .fetchNewastro({ exportExcel: true }).then((data) => {
        this._SpinnerService.setState(true);
        if (data?.status) {
          let exceldata: any = [];
          for (let datas of data?.data?.data) {
            exceldata.push({
              AstroId: datas?.AstroId,
              RefNo: datas?.RefNo,
              FullName: datas?.FullName,
              EmailId: datas?.EmailId,
              Country: datas?.Country,
              MobileNo: datas?.MobileNo,
              Gender: datas?.Gender,
              DOB: datas?.DOB,
              Experience: datas?.Experience,
              HrsContributed: datas?.HrsContributed,
              IsWorking: datas?.IsWorking,
              PlatformName: datas?.PlatformName,
              MonthlyIncome: datas?.MonthlyIncome,
              OnBoardDescP: Buffer.from(datas?.OnBoardDescP, 'base64').toString("ascii"),
              InterviewTime: datas?.InterviewTime,
              CityLiveIn: datas?.CityLiveIn,
              Source: datas?.Source,
              BioDescP: Buffer.from(datas?.BioDescP, 'base64').toString("ascii"),
              EntryDate: datas?.EntryDate,
              EntryTime: datas?.EntryTime,
              ApplicationStatus: datas?.ApplicationStatus,
            });
          }
          const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(exceldata);

          /* generate workbook and add the worksheet */
          const wb: XLSX.WorkBook = XLSX.utils.book_new();
          XLSX.utils.book_append_sheet(wb, ws, 'Call History Data');
          /* save to file */
          XLSX.writeFile(wb, fileName);
          this._SpinnerService.setState(false);
        } else this._NotifierService.showError('Some Error Occurred!');

      });
  }
}
