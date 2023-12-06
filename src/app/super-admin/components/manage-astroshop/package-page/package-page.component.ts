import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AdminService } from 'src/app/shared/services/admin-api/admin-api.service';
import { SpinnerService } from 'src/app/shared/services/spinner.service';
import { NotifierService } from 'src/app/shared/services/toaster.service';

@Component({
  selector: 'app-package-page',
  templateUrl: './package-page.component.html',
  styleUrls: ['./package-page.component.css'],
})
export class PackagePageComponent implements OnInit {
  serviceData: any;
  activeAstroList: any = [];
  modalRef?: BsModalRef;
  addPackage: FormGroup;
  selectedServiceId: any;
  isEdit: boolean = false;
  editData:any
  initialValues:any

  constructor(
    private modalService: BsModalService,
    private _AdminService: AdminService,
    private _NotifierService: NotifierService,
    private _SpinnerService: SpinnerService,
    private _FormBuilder: FormBuilder,
    private _ActivatedRoute: ActivatedRoute
  ) {
    this.addPackage = this._FormBuilder.group({
      packagePrice0: [0.0],
      packageTitle0: [''],
      familyCount0:[1],
      prasad0:[false],
      desc10: [''],
      desc20: [''],
      desc30: [''],
      desc40: [''],
      desc50: [''],
      desc60: [''],
      desc70: [''],
      desc80: [''],
      packagePrice1: [0.0],
      packageTitle1: [''],
      familyCount1:[1],
      prasad1:[false],
      desc11: [''],
      desc21: [''],
      desc31: [''],
      desc41: [''],
      desc51: [''],
      desc61: [''],
      desc71: [''],
      desc81: [''],
      packagePrice2: [0.0],
      packageTitle2: [''],
      familyCount2:[1],
      prasad2:[false],
      desc12: [''],
      desc22: [''],
      desc32: [''],
      desc42: [''],
      desc52: [''],
      desc62: [''],
      desc72: [''],
      desc82: [''],
      packagePrice3: [0.0],
      packageTitle3: [''],
      familyCount3:[1],
      prasad3:[false],
      desc13: [''],
      desc23: [''],
      desc33: [''],
      desc43: [''],
      desc53: [''],
      desc63: [''],
      desc73: [''],
      desc83: [''],
    });
  }

  ngOnInit(): void {


    this.initialValues = this.addPackage.value;
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
      .getAstroServicePackage(this.selectedServiceId)
      .then((data) => {
        if (data?.status && data?.data) {
          this.isEdit = true;
          this.editData=data?.data
          for (const [index, value] of data?.data.entries()) {
            this.addPackage.get(`packagePrice${index}`)?.setValue(value?.price);
            this.addPackage.get(`packageTitle${index}`)?.setValue(value?.title);
            this.addPackage.get(`familyCount${index}`)?.setValue(value?.familyCount);
            this.addPackage.get(`prasad${index}`)?.setValue(value?.prasad=='1'?true:false);
            let descData=JSON.parse(value.descP)
            
            this.addPackage.get(`desc1${index}`)?.setValue(descData[0]);
            this.addPackage.get(`desc2${index}`)?.setValue(descData[1]);
            this.addPackage.get(`desc3${index}`)?.setValue(descData[2]);
            this.addPackage.get(`desc4${index}`)?.setValue(descData[3]);
            this.addPackage.get(`desc5${index}`)?.setValue(descData[4]);
            this.addPackage.get(`desc6${index}`)?.setValue(descData[5]);
            this.addPackage.get(`desc7${index}`)?.setValue(descData[6]);
            this.addPackage.get(`desc8${index}`)?.setValue(descData[7]);
            
          }
          this.openModal(template);
        } else if (data?.status && !data?.data) {
          this.openModal(template);
          this.isEdit=false
        }
        this._SpinnerService.setState(false);
      });

    // this.openModal(template)
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
    this.addPackage?.reset(this.initialValues);
    this.isEdit=false
  }

  submitPrice() {
    let finalData: any = [];
    for (let i = 0; i < 4; i++) {
      let obj = {
        packagePrice: this.addPackage.get(`packagePrice${i}`)?.value,
        packageTitle: this.addPackage.get(`packageTitle${i}`)?.value,
        serialNo: i,
        astroServiceid: this.selectedServiceId?.id,
        astroid: this.selectedServiceId?.astroid,
        desc1: this.addPackage.get(`desc1${i}`)?.value,
        desc2: this.addPackage.get(`desc2${i}`)?.value,
        desc3: this.addPackage.get(`desc3${i}`)?.value,
        desc4: this.addPackage.get(`desc4${i}`)?.value,
        desc5: this.addPackage.get(`desc5${i}`)?.value,
        desc6: this.addPackage.get(`desc6${i}`)?.value,
        desc7: this.addPackage.get(`desc7${i}`)?.value,
        desc8: this.addPackage.get(`desc8${i}`)?.value,
        familyCount: this.addPackage.get(`familyCount${i}`)?.value,
        prasad: this.addPackage.get(`prasad${i}`)?.value,
        ...(this.isEdit && {id: this.editData[i]?.id})
      };
      finalData.push(obj);
    }

    this._SpinnerService.setState(true);
    this._AdminService
      .updateAstroServicePackage({ packageBody: finalData,edit:this.isEdit })
      .then((data) => {
        if (data?.status) {
          this.closeModal();
          this._NotifierService.showSuccess('Data Updated Successfully');
        }
        this._SpinnerService.setState(false);
      });
  }
}
