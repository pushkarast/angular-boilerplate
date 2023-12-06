import { Component, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Subject, debounceTime, distinctUntilChanged } from 'rxjs';
import { AdminService } from 'src/app/shared/services/admin-api/admin-api.service';
import { SpinnerService } from 'src/app/shared/services/spinner.service';
import { NotifierService } from 'src/app/shared/services/toaster.service';
import option from '../../../../../assets/constants/ngSelectvalues';
import { ActivatedRoute } from '@angular/router';
import { CommonService } from 'src/app/shared/services/common.service';
@Component({
  selector: 'app-astro-resgistration',
  templateUrl: './astro-resgistration.component.html',
  styleUrls: ['./astro-resgistration.component.css']
})
export class AstroResgistrationComponent {
  astroList: any = [];
  astroData: FormGroup;
  page = 1;
  modelChanged: Subject<any> = new Subject<any>();
  modalRef?: BsModalRef;
  imagesList: any = []
  option = option.photoFilter;
  filter: any = null;
  constructor(
    private _AdminService: AdminService,
    private _FormBuilder: FormBuilder,
    private _SpinnerService: SpinnerService,
    private _NotifierService: NotifierService,
    private modalService: BsModalService,
    private _ActivatedRoute: ActivatedRoute,
    private _CommonService: CommonService,

  ) {
    this.astroData = this._FormBuilder.group({
      page: 1,
      search: "",
      astroId: null,
      filter: [this.filter]
    })
  }
  ngOnInit(): void {
    this.modelChanged.pipe(debounceTime(300), distinctUntilChanged()).subscribe((val) => {
      this.astroData.get('page')?.setValue(1);
      this.astroData.get('search')?.setValue(val?.search);
      this.fetchAstrologer()
    });
    this._ActivatedRoute.queryParams.subscribe(params => {
      if (params["type"]) {
        this.astroData?.get('filter')?.setValue('0');
        this.filter = "0"
      }
    })
    this.fetchAstrologer();
  }

  fetchAstrologer(astroId = null) {
    this._SpinnerService.setState(true);
    this.astroData.get('astroId')?.setValue(astroId);
    this._AdminService.fetchAstrolist(this.astroData.value).then((data) => {
      if (data?.status) {
        this.astroList = data?.data;
        if (data?.data?.imagesData) {
          this.imagesList = data?.data?.imagesData
        }
        console.log(this.imagesList, 'this.image list')

      }
    });
    this._SpinnerService.setState(false);
  }
  search(event: any) {
    this.modelChanged.next({ search: event.target.value })
  }
  pagination($: any) {
    this.astroData.get('page')?.setValue($.pageIndex + 1);
    this.fetchAstrologer();
  }
  openModal(template: TemplateRef<any>, astroId: any) {
    this.fetchAstrologer(astroId);
    this.modalRef = this.modalService.show(template, { class: 'modal-xl', backdrop: "static", keyboard: false });
  }
  openImagesModal(template: TemplateRef<any>, astroId: any) {
    this.astroData.get('astroId')?.setValue(astroId)
    this.fetchAstrologer(astroId);
    this.modalRef = this.modalService.show(template, { class: 'modal-xl', backdrop: "static", keyboard: false });
  }
  closeModal(type = '') {
    this.modalRef?.hide();
    this.fetchAstrologer()
  }
  updateImageStatus(index: any, status: boolean) {
    this._AdminService.updateAstroImageStatus({ index: index, status: status, astroId: this.astroData.get('astroId')?.value }).then((data) => {
      if (data?.status) {
        this._NotifierService.showSuccess(data?.message)
        this.fetchAstrologer(this.astroData.get('astroId')?.value);
      }
      else {
        this._NotifierService.showError(data?.message)
      }
    });
  }
  setFilter(event: any) {
    this.astroData.get('filter')?.setValue(event.value)
    this.fetchAstrologer()
  }
  hideNumber(string: any) {
    if (this._CommonService.checkUserType()?.userType != 'admin')
      return this._CommonService.hideMobile(string);
    return string;
  }
  isAdmin() {
    return this._CommonService.checkUserType()?.userType != 'admin'
  }
}
