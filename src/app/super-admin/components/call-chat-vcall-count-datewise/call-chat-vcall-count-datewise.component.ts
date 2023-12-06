import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from 'src/app/shared/services/admin-api/admin-api.service';
import { NotifierService } from 'src/app/shared/services/toaster.service';
import * as moment from 'moment';
import { Subject, debounceTime, distinctUntilChanged } from 'rxjs';
import option from '../../../../assets/constants/ngSelectvalues';
import { SpinnerService } from 'src/app/shared/services/spinner.service';
import * as XLSX from 'xlsx';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-call-chat-vcall-count-datewise',
  templateUrl: './call-chat-vcall-count-datewise.component.html',
  styleUrls: ['./call-chat-vcall-count-datewise.component.css']
})
export class CallChatVcallCountDatewiseComponent {
  getData: FormGroup
  logDataList: any = []
  pageRef = 0

  constructor(
    private _AdminService: AdminService,
    private _NotifierService: NotifierService,
    private _FormBuilder: FormBuilder,
    private _SpinnerService: SpinnerService,
    private modalService: BsModalService,
  ) {
    this.getData = this._FormBuilder.group({
      page: 1
    })
  }

  ngOnInit(): void {
    this.getLogsData()
  }

  getLogsData() {
    this._SpinnerService.setState(true);
    this._AdminService.datewiseCallChatVcallCount(this.getData.value).then((data) => {
      if (data?.status) {
        this.logDataList = data?.data;
        // this.accountSummary = data?.data?.accountSummary;
        this._SpinnerService.setState(false);
      } 
      else {
        this._SpinnerService.setState(false);
        this._NotifierService.showError('Some Error Occured!');
      }
    });
  }

  onPaginateChange($: any) {
    this.getData.get('page')?.setValue($.pageIndex + 1);
    this.getLogsData();
  }

  handleGoto(id: any) {
    this.getData.get('page')?.setValue(id);
    // this.page = id;
    this.pageRef = id - 1
    this.getLogsData();
  }
}
