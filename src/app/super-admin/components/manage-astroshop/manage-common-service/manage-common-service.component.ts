import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Subject, debounceTime, distinctUntilChanged } from 'rxjs';
import { AdminService } from 'src/app/shared/services/admin-api/admin-api.service';
import { SpinnerService } from 'src/app/shared/services/spinner.service';
import { NotifierService } from 'src/app/shared/services/toaster.service';
import option from '../../../../../assets/constants/ngSelectvalues';
import * as XLSX from 'xlsx';
import * as moment from 'moment';

@Component({
  selector: 'app-manage-common-service',
  templateUrl: './manage-common-service.component.html',
  styleUrls: ['./manage-common-service.component.css']
})
export class ManageCommonServiceComponent implements OnInit {
  modelChanged: Subject<any> = new Subject<any>();
  search: string = '';
  paginationData: any;
  serviceList: any;
  option = option.serviceFilter
  modalRef?: BsModalRef;
  userList: any
  excelName: any

  constructor(
    private modalService: BsModalService,
    private _AdminService: AdminService,
    private _NotifierService: NotifierService,
    private _SpinnerService: SpinnerService,
    private _FormBuilder: FormBuilder
  ) {

  }

  ngOnInit(): void {
    this.getServiceOrderList()
    this.modelChanged
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe((val) => {
        this.search = val.search;
        this.getServiceOrderList();
      });
  }

  getServiceOrderList(page: any = 1, filter: any = null) {
    this._SpinnerService.setState(true)
    this._AdminService.getCommonServiceOrderHistory({ page: page, search: this.search, filter: filter }).then(data => {
      if (data?.status) {
        this.serviceList = data?.data?.servicerList
        this.paginationData = data?.data
      }
      this._SpinnerService.setState(false)
    })
  }

  searchProduct(event: any) {
    this.modelChanged.next({ search: event.target.value });
  }
  pagination($: any) {
    // this.page = $.pageIndex + 1;
    this.getServiceOrderList($.pageIndex + 1);
  }

  handleFilter(event: any) {
    this.getServiceOrderList(1, event ? event?.value : null)
  }

  giveManualReminder(bodyData: any) {
    this._SpinnerService.setState(true)
    this._AdminService.serviceReminderManual(bodyData).then(data => {
      if (data?.status) {
        this._NotifierService.showSuccess('Reminder Sent Successfully')
      } else {
        this._NotifierService.showError('Something Went Wrong')
      }
      this._SpinnerService.setState(false)
    })
  }

  getUserList(template: TemplateRef<any>, id: any, nameData: any) {

    this.excelName = `${moment(nameData?.time).format('DD-MM-YYYY-hh:mm-a')}`

    this._SpinnerService.setState(true)
    this._AdminService.getCommonServiceUserOrder({ astroServiceId: id }).then(data => {
      if (data?.status) {
        this.userList = data?.data
        this.openModal(template)
      }
      this._SpinnerService.setState(false)
    })
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
  }

  exportexcel(): void {
    /* pass here the table id */
    let fileName = `${this.excelName}.xlsx`;
    this._SpinnerService.setState(true);
    if (this.userList?.length !== 0) {
      let exceldata: any = [];
      for (let userData of this.userList) {
        exceldata.push({
          ORDERID: userData?.OrderId,
          CUSTOMER: userData?.customerDetail?.firstname + " " + userData?.customerDetail?.lastname,
          MOBILE: userData?.customerDetail?.mobileno,
          GOTRA: userData?.gotra,
          DATE: userData?.OrderDate + " " + userData?.OrderTime,
          PRICE: userData?.TotalCharges,
          PACKAGE: userData?.package,
          FAMILYCOUNT: userData?.familyCount,
          FAMILYDATA: userData?.familyDetails,
          PRASADADDRESS: userData?.prasadAdd
        });
      }
      const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(exceldata);

      /* generate workbook and add the worksheet */
      const wb: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, this.excelName);
      /* save to file */
      XLSX.writeFile(wb, fileName);
      this._SpinnerService.setState(false);
    } else this._NotifierService.showError('Some Error Occurred!');
  }

}
