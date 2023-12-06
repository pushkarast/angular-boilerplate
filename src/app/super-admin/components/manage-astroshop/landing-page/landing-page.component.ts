import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AdminService } from 'src/app/shared/services/admin-api/admin-api.service';
import { SpinnerService } from 'src/app/shared/services/spinner.service';
import { NotifierService } from 'src/app/shared/services/toaster.service';
import option from '../../../../../assets/constants/ngSelectvalues';
import { Clipboard } from '@angular/cdk/clipboard';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css'],
})
export class LandingPageComponent implements OnInit {
  serviceData: any;
  status = option.statusString;
  activeAstroList: any;
  modalRef?: BsModalRef;
  addLandingPage: FormGroup;
  selectedServiceId: any;
  initialValues: any;
  isEdit: boolean = false;
  editData: any;
  constructor(
    private modalService: BsModalService,
    private _AdminService: AdminService,
    private _NotifierService: NotifierService,
    private _SpinnerService: SpinnerService,
    private _FormBuilder: FormBuilder,
    private _ActivatedRoute: ActivatedRoute,
    private _Clipboard: Clipboard
  ) {
    this.addLandingPage = this._FormBuilder.group({
      templeName: [''],
      aboutPuja: [''],
      aboutPujaTemple: [''],
      benefitTitle1: [''],
      benefitTitle2: [''],
      benefitTitle3: [''],
      benefitTitle4: [''],
      benefitDesc1: [''],
      benefitDesc2: [''],
      benefitDesc3: [''],
      benefitDesc4: [''],
      faqTitle1: [''],
      faqTitle2: [''],
      faqTitle3: [''],
      faqTitle4: [''],
      faq1: [''],
      faq2: [''],
      faq3: [''],
      faq4: [''],
      adImage: [null],
      redirectLink: [''],
      videoLink: [null],
    });
  }

  ngOnInit(): void {
    this.initialValues = this.addLandingPage?.value;
    this._ActivatedRoute.queryParams.subscribe((params: any) => {
      this.serviceData = params;
      // this.getServiceAstrologer(params?.serviceId);
    });
    this.getAstroServiceList();
  }

  getAstroServiceList() {
    this._SpinnerService.setState(true);
    this._AdminService
      .getActiveServiceAstroList({ serviceId: this.serviceData?.serviceId })
      .then((data) => {
        if (data?.status) {
          this.activeAstroList = data?.data;
        }
        this._SpinnerService.setState(false);
      });
  }

  getPackageDetails(template: TemplateRef<any>, data: any) {
    this.selectedServiceId = data;
    this._SpinnerService.setState(true);
    this._AdminService
      .getServiceLandingPage(this.selectedServiceId)
      .then((data) => {
        if (data?.status && data?.data) {
          this.editData = data?.data;
          this.addLandingPage.patchValue(data?.data);
          let benefits = JSON.parse(data?.data?.benefits);
          let faq = JSON.parse(data?.data?.faq);
          for (const [index, value] of benefits.entries()) {
            this.addLandingPage
              .get(`benefitTitle${index + 1}`)
              ?.setValue(value?.benefitTitle);
            this.addLandingPage
              .get(`benefitDesc${index + 1}`)
              ?.setValue(value?.benefitDesc);
          }
          if(faq){
            for (const [index, value] of faq.entries()) {
              this.addLandingPage
                .get(`faqTitle${index + 1}`)
                ?.setValue(value?.faqTitle);
              this.addLandingPage
                .get(`faq${index + 1}`)
                ?.setValue(value?.faq);
            }
          }
          this.addLandingPage.get(`adImage}`)?.setValue(null);
          this.openModal(template);
          this.isEdit = true;
        } else if (data?.status && !data?.data) {
          this.openModal(template);
          this.isEdit = false;
        }
        this._SpinnerService.setState(false);
      });
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {
      class: 'modal-xl',
      backdrop: 'static',
      keyboard: false,
    });
  }

  closeModal(type = '') {
    this.modalRef?.hide();
    this.addLandingPage.reset(this.initialValues);
    this.isEdit = false;
  }

  getFormData() {
    let formData = new FormData();

    formData.set('templeName', this.addLandingPage.get('templeName')?.value);
    formData.set('aboutPuja', this.addLandingPage.get('aboutPuja')?.value);
    formData.set(
      'aboutPujaTemple',
      this.addLandingPage.get('aboutPujaTemple')?.value
    );
    formData.set(
      'benefitTitle1',
      this.addLandingPage.get('benefitTitle1')?.value
    );
    formData.set(
      'benefitTitle2',
      this.addLandingPage.get('benefitTitle2')?.value
    );
    formData.set(
      'benefitTitle3',
      this.addLandingPage.get('benefitTitle3')?.value
    );
    formData.set(
      'benefitTitle4',
      this.addLandingPage.get('benefitTitle4')?.value
    );
    formData.set(
      'benefitDesc1',
      this.addLandingPage.get('benefitDesc1')?.value
    );
    formData.set(
      'benefitDesc2',
      this.addLandingPage.get('benefitDesc2')?.value
    );
    formData.set(
      'benefitDesc3',
      this.addLandingPage.get('benefitDesc3')?.value
    );
    formData.set(
      'benefitDesc4',
      this.addLandingPage.get('benefitDesc4')?.value
    );
    formData.set(
      'faqTitle1',
      this.addLandingPage.get('faqTitle1')?.value
    );
    formData.set(
      'faqTitle2',
      this.addLandingPage.get('faqTitle2')?.value
    );
    formData.set(
      'faqTitle3',
      this.addLandingPage.get('faqTitle3')?.value
    );
    formData.set(
      'faqTitle4',
      this.addLandingPage.get('faqTitle4')?.value
    );
    formData.set(
      'faq1',
      this.addLandingPage.get('faq1')?.value
    );
    formData.set(
      'faq2',
      this.addLandingPage.get('faq2')?.value
    );
    formData.set(
      'faq3',
      this.addLandingPage.get('faq3')?.value
    );
    formData.set(
      'faq4',
      this.addLandingPage.get('faq4')?.value
    );
    formData.set('adImage', this.addLandingPage.get('adImage')?.value);
    formData.set('videoLink', this.addLandingPage.get('videoLink')?.value);

    formData.set(
      'redirectLink',
      this.addLandingPage.get('redirectLink')?.value
    );
    formData.set('astroid', this.selectedServiceId?.astroid);
    formData.set('astroServiceId', this.selectedServiceId?.id);
    formData.set('isEdit', JSON.stringify(this.isEdit));
    if (this.isEdit) {
      formData.set('id', this.editData?.id);
    }
    return formData;
  }

  updateLandingPage() {
    this._SpinnerService.setState(true);
    this._AdminService
      .updateServiceLandingPage(this.getFormData())
      .then((data) => {
        if (data?.status) {
          this._NotifierService.showSuccess('Data Updated Successfully');
          this.getAstroServiceList()
          this.closeModal();
        } else {
          this._NotifierService.showError('Something went wrong');
        }
        this._SpinnerService.setState(false);
      });
  }

  fileupload(event: Event, type: boolean = true): void {
    if (event.target !== null) {
      const files = (<HTMLInputElement>event.target).files;
      if (files !== null) {
        const fileList: FileList = files;
        if (fileList && fileList.length > 0) {
          const file: File = fileList[0];
          if (type) {
            this.addLandingPage.get('adImage')?.setValue(file);
          } else {
            this.addLandingPage.get('videoLink')?.setValue(file);
          }
        }
      }
    }
  }

  copyLandingPageUrl(link: any) {
    console.log(link);
    
    let url = `https://www.myastroguruji.com/onlinepuja/${link?.astro}/${link?.slug}?landing=${link?.landing}`;
    this._Clipboard.copy(url);
    this._NotifierService.showSuccess('Copied To Clipboard');
  }
}
