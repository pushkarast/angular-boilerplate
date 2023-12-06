import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AdminService } from 'src/app/shared/services/admin-api/admin-api.service';
import { SpinnerService } from 'src/app/shared/services/spinner.service';
import option from '../../../../assets/constants/ngSelectvalues';
import { NotifierService } from 'src/app/shared/services/toaster.service';

@Component({
  selector: 'app-banners',
  templateUrl: './banners.component.html',
  styleUrls: ['./banners.component.css'],
})
export class BannersComponent implements OnInit {
  modalRef?: BsModalRef;
  bannerList: any;
  addBannerForm: FormGroup;
  fileViewer: any = 'No file Selected';
  bannerType = option.bannerType;
  astroList: any;
  status = option.status;
  yesNo = option.yesno;
  bannerData: any;
  constructor(
    private modalService: BsModalService,
    private _AdminService: AdminService,
    private _SpinnerService: SpinnerService,
    private _FormBuilder: FormBuilder,
    private _NotifierService: NotifierService
  ) {
    this.addBannerForm = this._FormBuilder.group({
      bannerId: [null],
      bannerImage: [null],
      bannerType: ['1'],
      link: ['#'],
      astrologer: [null],
      status: [1],
      forIOS: ['0'],
        });
  }

  ngOnInit(): void {
    this.getBannerList();
    this.getAstroList();
  }

  getAstroList() {
    this._AdminService.getAstroListForDropDown().then((data) => {
      if (data?.status) {
        this.astroList = data?.data;
      }
    });
  }

  getBannerList(bannerId = null) {
    this._SpinnerService.setState(true);
    this._AdminService.getAllBanner({ bannerId: bannerId }).then((data) => {
      if (data?.status) {
        if (bannerId) this.bannerData = data?.data?.bannerList;
        else this.bannerList = data?.data?.bannerList;
        if (bannerId) {
          this.addBannerForm
            .get('bannerType')
            ?.setValue(this.bannerData?.AstroId ? '2' : '1');
          this.addBannerForm.get('link')?.setValue(this.bannerData?.Link);
          this.addBannerForm.get('status')?.setValue(this.bannerData?.Status);
          this.addBannerForm.get('forIOS')?.setValue(this.bannerData?.isIOS);
          this.addBannerForm.get('link')?.setValue(this.bannerData?.Link);
          this.addBannerForm
            .get('bannerId')
            ?.setValue(bannerId);
          this.addBannerForm
            .get('astrologer')
            ?.setValue(this.bannerData?.AstroId);
        }
      }
    });
    this._SpinnerService.setState(false);
  }

  deleteBanner(id: any) {
    this._SpinnerService.setState(true);
    this._AdminService.deleteBanner({ bannerId: id }).then((data) => {
      if (data?.status) {
        this.getBannerList();
        this._NotifierService.showSuccess('Banner Deleted Successfully');
      }
      this._SpinnerService.setState(false);
    });
  }

  formGroupReset() {
    this.addBannerForm.reset();
    this.addBannerForm.get('bannerType')?.setValue('1');
    this.addBannerForm.get('link')?.setValue('#');
    this.addBannerForm.get('status')?.setValue(1);
    this.addBannerForm.get('forIOS')?.setValue('0');
    this.fileViewer = 'No file Selected';
  }

  openModal(template: TemplateRef<any>, bannerId = null) {
    if (bannerId) this.getBannerList(bannerId);
    this.modalRef = this.modalService.show(template, {
      class: 'modal-xl',
      backdrop: 'static',
      keyboard: false,
    });
  }

  closeModal(type = '') {
    this.modalRef?.hide();
    this.formGroupReset();
  }

  fileupload(event: Event): void {
    if (event.target !== null) {
      const files = (<HTMLInputElement>event.target).files;
      if (files !== null) {
        const fileList: FileList = files;
        if (fileList && fileList.length > 0) {
          const file: File = fileList[0];
          this.addBannerForm.get('bannerImage')?.setValue(file);
          this.fileViewer = file.name;
        }
      }
    }
  }

  uploadBanner() {
    if (this.addBannerForm.get('bannerId')?.value || this.fileViewer !== 'No file Selected') {
      console.log(this.addBannerForm.get('bannerId')?.value || this.fileViewer !== 'No file Selected')
      this._SpinnerService.setState(true);
      this._AdminService.uploadBanner(this.setFormData()).then((data) => {
        if (data?.status) {
          this._NotifierService.showSuccess('Banner Added Successfully');
          this.getBannerList();
          this.formGroupReset();
          this.modalRef?.hide();
        } else {
          this._NotifierService.showError('Something Went Wrong');
        }
        this._SpinnerService.setState(false);
      });
    } else {
      this._NotifierService.showError('Please Select An Image');
    }
  }

  setFormData() {
    const formData = new FormData();

    formData.set('bannerImage', this.addBannerForm.get('bannerImage')?.value);
    formData.set('bannerType', this.addBannerForm.get('bannerType')?.value);
    formData.set('link', this.addBannerForm.get('link')?.value);
    formData.set('astrologer', this.addBannerForm.get('astrologer')?.value);
    formData.set('status', this.addBannerForm.get('status')?.value);
    formData.set('forIOS', this.addBannerForm.get('forIOS')?.value);
    formData.set('bannerId', this.addBannerForm.get('bannerId')?.value?this.addBannerForm.get('bannerId')?.value:null);
   
    return formData;
  }
}
