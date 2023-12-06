import { Component, OnInit, TemplateRef } from '@angular/core';
import option from "../../../../../assets/constants/ngSelectvalues"
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from 'src/app/shared/services/admin-api/admin-api.service';
import { SpinnerService } from 'src/app/shared/services/spinner.service';
import { NotifierService } from 'src/app/shared/services/toaster.service';
import { ActivatedRoute } from '@angular/router';
import { Buffer } from 'buffer';
import { Subject, debounceTime, distinctUntilChanged } from 'rxjs';
import * as moment from 'moment';
import * as XLSX from 'xlsx';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
@Component({
  selector: 'app-customer-offers',
  templateUrl: './customer-offers.component.html',
  styleUrls: ['./customer-offers.component.css']
})
export class CustomerOffersComponent {
  modalRef?: BsModalRef;
  scratchCardData: FormGroup
  modelChanged: Subject<any> = new Subject<any>();
  page = 1;
  pageRef = 0
  scratchCardDataList: any = []

  constructor(
    private _FormBuilder: FormBuilder,
    private _AdminService: AdminService,
    private _SpinnerService: SpinnerService,
    private _NotifierService: NotifierService,
    private _ActivatedRoute: ActivatedRoute,
    private modalService: BsModalService,
  ) {
    this.scratchCardData = this._FormBuilder.group({
      CustomerId: null,
      page: 1,
      search: '',
      offerStatus: null,
      offerOnStatus: null,
      freeOrPaidStatus: null,
    })
  }

  ngOnInit(): void {
    this._ActivatedRoute.queryParams.subscribe(params => {
      this.scratchCardData.get('CustomerId')?.setValue(params["id"])
    })
    this.modelChanged
    .pipe(debounceTime(300), distinctUntilChanged())
    .subscribe((val) => {
      this.scratchCardData.get('search')?.setValue(val?.search);
      this.getOfferData();
    });
    this.getOfferData();
  }


  search(event: any) {
    this.modelChanged.next({ search: event.target.value });
  }

  getOfferData() {
    this._SpinnerService.setState(true)
    this._AdminService.getCustomerScratchCardById( this.scratchCardData.value ).then((data) => {
      if (data?.status) {
        this.scratchCardDataList = data?.data
      }
    })
    this._SpinnerService.setState(false)
  }

  handleGoto(id: any) {
    this.scratchCardData.get('page')?.setValue(id)
    this.pageRef = id - 1
    this.getOfferData();
  }

  onPaginateChange($: any) {
    this.scratchCardData.get('page')?.setValue($.pageIndex + 1)
    this.getOfferData();
  }

  resetFilter() {
    this.scratchCardData.reset();
    window.location.reload();
  }

  exportexcel(): void {
    /* pass here the table id */
    let curr_dateFile = Date.now();
    let fileName = 'Customer_Offer_Report_' + moment(Date.now()).format("DD-MM-YYYY") + '.xlsx';
    this._SpinnerService.setState(true);
    this.scratchCardData.get('page')?.setValue(null);
    this._AdminService.getCustomerScratchCardById(this.scratchCardData.value).then((data) => {
      if (data?.status) {
        let exceldata: any = [];
        for (let item of data?.data?.result) {
          exceldata.push({
            ID: item?.id,
            STATUS: item?.offerStatus,
            OFFER_TYPE: item?.offerType,
            FREE_OR_PAID: item?.FreeOrPaid,
          });
        }
        const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(exceldata);

        /* generate workbook and add the worksheet */
        const wb: XLSX.WorkBook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Customer Offer Data');
        /* save to file */
        XLSX.writeFile(wb, fileName);
        this._SpinnerService.setState(false);
      } else this._NotifierService.showError('Some Error Occurred!');
    });
  }
}
