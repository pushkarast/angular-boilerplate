import { Component, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {  BsModalService } from 'ngx-bootstrap/modal';
import { Subject, debounceTime, distinctUntilChanged } from 'rxjs';
import { AdminService } from 'src/app/shared/services/admin-api/admin-api.service';
import { SpinnerService } from 'src/app/shared/services/spinner.service';
import { NotifierService } from 'src/app/shared/services/toaster.service';
import option from '../../../../../assets/constants/ngSelectvalues'
import * as moment from 'moment';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-customers-list',
  templateUrl: './customers-list.component.html',
  styleUrls: ['./customers-list.component.css']
})
export class CustomersListComponent {
  customerData: FormGroup
  customerList: any = [];
  modelChanged: Subject<any> = new Subject<any>();
  page = 1;
  pageRef = 0;
  option = option.customerActiveStatus;
  otherOptions = option.customerActiveStatus;
  freeCallChatVCallFilter = option.freeCallChatVCallFilter;
  rechargeTimesFilter = option.rechargeTimesFilter;
  firstPaidCallChatFilter = option.firstPaidCallChatFilter;
  fiftyRsRechargeFilter = option.fiftyRsRechargeFilter;
  customerPanelCustomFilter = option.customerPanelCustomFilter;

  constructor(
    private _AdminService: AdminService,
    private _FormBuilder: FormBuilder,
    private _SpinnerService: SpinnerService,
    private _NotifierService: NotifierService,
    private modalService: BsModalService
  ) {
    this.customerData = this._FormBuilder.group({
      page: 1,
      search: "",
      customerStatus: null,
      freeCallChatVCallFilter: null,
      firstPaidCallChatFilter: null,
      rechargeTimesFilter: null,
      fiftyRsRechargeFilter: null,
      customerPanelCustomFilter: null,
    })
  }

  ngOnInit(): void {
    this.modelChanged.pipe(debounceTime(300), distinctUntilChanged()).subscribe((val) => {
      this.customerData.get('page')?.setValue(1);
      this.customerData.get('search')?.setValue(val?.search);
      this.fetchCustomers()
    });
    this.fetchCustomers();
  }

  rechargeTimesFilterFn() {
    this.customerData.get('page')?.setValue(this.customerData.get('page')?.value);
    this.customerData.get('search')?.setValue('');
    this.customerData.get('customerStatus')?.setValue(null);
    this.customerData.get('freeCallChatVCallFilter')?.setValue(null);
    this.customerData.get('firstPaidCallChatFilter')?.setValue(null);
    this.customerData.get('customerPanelCustomFilter')?.setValue(null);
    this.customerData.get('fiftyRsRechargeFilter')?.setValue(null);
    this.customerData.get('rechargeTimesFilter')?.setValue(this.customerData.get('rechargeTimesFilter')?.value);
    this.fetchCustomers()
  }

  freeCallChatVCallFilterFn() {
    this.customerData.get('page')?.setValue(this.customerData.get('page')?.value);
    this.customerData.get('search')?.setValue('');
    this.customerData.get('customerStatus')?.setValue(null);
    this.customerData.get('firstPaidCallChatFilter')?.setValue(null);
    this.customerData.get('rechargeTimesFilter')?.setValue(null);
    this.customerData.get('fiftyRsRechargeFilter')?.setValue(null);
    this.customerData.get('customerPanelCustomFilter')?.setValue(null);
    this.customerData.get('freeCallChatVCallFilter')?.setValue(this.customerData.get('freeCallChatVCallFilter')?.value);
    this.fetchCustomers()
  }

  firstPaidCallChatFilterFn() {
    this.customerData.get('page')?.setValue(this.customerData.get('page')?.value);
    this.customerData.get('search')?.setValue('');
    this.customerData.get('customerStatus')?.setValue(null);
    this.customerData.get('freeCallChatVCallFilter')?.setValue(null);
    this.customerData.get('rechargeTimesFilter')?.setValue(null);
    this.customerData.get('fiftyRsRechargeFilter')?.setValue(null);
    this.customerData.get('customerPanelCustomFilter')?.setValue(null);
    this.customerData.get('firstPaidCallChatFilter')?.setValue(this.customerData.get('firstPaidCallChatFilter')?.value);
    this.fetchCustomers()
  }

  fiftyRsRechargeFilterFn() {
    this.customerData.get('page')?.setValue(this.customerData.get('page')?.value);
    this.customerData.get('search')?.setValue('');
    this.customerData.get('customerStatus')?.setValue(null);
    this.customerData.get('freeCallChatVCallFilter')?.setValue(null);
    this.customerData.get('firstPaidCallChatFilter')?.setValue(null);
    this.customerData.get('rechargeTimesFilter')?.setValue(null);
    this.customerData.get('customerPanelCustomFilter')?.setValue(null);
    this.customerData.get('fiftyRsRechargeFilter')?.setValue(this.customerData.get('fiftyRsRechargeFilter')?.value);
    this.fetchCustomers()
  }

  customerStatusFn() {
    this.customerData.get('page')?.setValue(this.customerData.get('page')?.value);
    this.customerData.get('search')?.setValue('');
    this.customerData.get('freeCallChatVCallFilter')?.setValue(null);
    this.customerData.get('firstPaidCallChatFilter')?.setValue(null);
    this.customerData.get('rechargeTimesFilter')?.setValue(null);
    this.customerData.get('fiftyRsRechargeFilter')?.setValue(null);
    this.customerData.get('customerPanelCustomFilter')?.setValue(null);
    this.customerData.get('customerStatus')?.setValue(this.customerData.get('customerStatus')?.value);
    this.fetchCustomers()
  }

  customerPanelCustomFilterFn() {
    this.customerData.get('page')?.setValue(this.customerData.get('page')?.value);
    this.customerData.get('search')?.setValue('');
    this.customerData.get('customerStatus')?.setValue(null);
    this.customerData.get('freeCallChatVCallFilter')?.setValue(null);
    this.customerData.get('firstPaidCallChatFilter')?.setValue(null);
    this.customerData.get('rechargeTimesFilter')?.setValue(null);
    this.customerData.get('fiftyRsRechargeFilter')?.setValue(null);
    this.customerData.get('customerPanelCustomFilter')?.setValue(this.customerData.get('customerPanelCustomFilter')?.value);
    this.fetchCustomers()
  }

  fetchCustomers() {
    this._SpinnerService.setState(true);
    this._AdminService.getMngCustomersData(this.customerData.value).then((data) => {
      if (data?.status) {
        this.customerList = data?.data;
        this._SpinnerService.setState(false);
      }
    });
  }

  pagination($: any) {
    this.customerData.get('page')?.setValue($.pageIndex + 1);
    this.fetchCustomers();
  }

  search(event: any) {
    this.modelChanged.next({ search: event.target.value })
  }

  handleGoto(id: any) {
    this.customerData.get('page')?.setValue(id);
    this.fetchCustomers();
  }

  exportexcel(): void {
    /* pass here the table id */
    let fileName = 'Customer Report Report.xlsx';
    this._SpinnerService.setState(true);
    this.customerData.get('page')?.setValue(null);
    this._AdminService.getMngCustomersData(this.customerData.value).then((data) => {
      if (data?.status) {
        let exceldata: any = [];
        for (let item of data?.data?.customerDataList) {
          exceldata.push({
            FIRST_NAME: item?.FirstName,
            LAST_NAME	: item?.LastName,
            GENDER: item?.Gender,
            DOB: item?.DOB,
            BIRTH_TIME: item?.BirthTime,
            MOBILENO: item?.MobileNo,
            ENTRYDATE: item?.EntryDate,
          });
        }
        const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(exceldata);

        /* generate workbook and add the worksheet */
        const wb: XLSX.WorkBook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Customer List Data');
        /* save to file */
        XLSX.writeFile(wb, fileName);
        this._SpinnerService.setState(false);
      } else this._NotifierService.showError('Some Error Occurred!');
	this.customerData.get('page')?.setValue(1);
    });
  }
}
