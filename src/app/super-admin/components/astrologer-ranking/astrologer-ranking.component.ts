import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from 'src/app/shared/services/admin-api/admin-api.service';
import { SpinnerService } from 'src/app/shared/services/spinner.service';
import { NotifierService } from 'src/app/shared/services/toaster.service';
import option from "../../../../assets/constants/ngSelectvalues"
import { Subject, debounceTime, distinctUntilChanged } from 'rxjs';
import * as moment from "moment";

@Component({
  selector: 'app-astrologer-ranking',
  templateUrl: './astrologer-ranking.component.html',
  styleUrls: ['./astrologer-ranking.component.css']
})
export class AstrologerRankingComponent {
  modelChanged: Subject<any> = new Subject<any>();
  resultList: any = [];
  option = option.rank_filer;
  page: number = 1
  reportData: FormGroup;
  reportDataByNewCustomer: FormGroup;
  reportDataByBusyTime: FormGroup;
  reportDataByOnlineTime: FormGroup;
  TabOption: number = 0;
  resultListNewCustomer: any = [];
  reportDataByRepeatCustomer: any = [];
  resultListBusyTime: any = [];
  resultListOnlineTime: any = [];
  pageRef = 0
  optionRank = option.byRank;
  optionRepeat = option.byRankRepeatCustomer
  optionBusy = option.busy_time
  optionOnline = option.online_time
  date_filter = option.date_filter
  orderType = option.call_chat_type

  ranges: any = {
    // 'Today': [new Date(), new Date()],
    // 'Yesterday': [moment().utc().subtract(1, 'days'), moment().subtract(1, 'days').local()],
    'Last 7 Days': [moment().utc().subtract(6, 'days'), moment()],
    'Last 30 Days': [moment().utc().subtract(29, 'days'), moment()],
    'This Month': [moment().utc().startOf('month'), moment().utc().endOf('month')],
    'Last Month': [moment().utc().subtract(1, 'month').startOf('month'), moment().utc().subtract(1, 'month').endOf('month')]
  }
  invalidDates: moment.Moment[] = [moment().add(2, 'days'), moment().add(3, 'days'), moment().add(5, 'days')];
  isInvalidDate = (m: moment.Moment) => {
    return this.invalidDates.some(d => d.isSame(m, 'day'))
  }
  startDate = new Date();
  selected: any = { start: this.startDate, end: this.startDate };


  constructor(
    private _AdminService: AdminService,
    private _FormBuilder: FormBuilder,
    private _SpinnerService: SpinnerService,
    private _NotifierService: NotifierService,
  ) {
    this.reportData = this._FormBuilder.group({
      dateStatus: ["", [Validators.required, Validators.min(1)]],
      status: ["", [Validators.required, Validators.min(1)]],
      page: this.page,
      search: ['']
    })
    this.reportDataByNewCustomer = this._FormBuilder.group({
      dateStatus: ["", [Validators.required, Validators.min(1)]],
      status: ["", [Validators.required, Validators.min(1)]],
      page: this.page,
      search: [''],
      flag: 0
    })
    this.reportDataByRepeatCustomer = this._FormBuilder.group({
      dateStatus: ["", [Validators.required, Validators.min(1)]],
      status: ["", [Validators.required, Validators.min(1)]],
      page: this.page,
      search: [''],
      flag: 1
    })
    this.reportDataByBusyTime = this._FormBuilder.group({
      dateStatus: ["", [Validators.required, Validators.min(1)]],
      status: ["", [Validators.required, Validators.min(1)]],
      page: this.page,
      search: [''],
      flag: 1,
      orderTypeStatus: ["", [Validators.required, Validators.min(1)]],
    })
    this.reportDataByOnlineTime = this._FormBuilder.group({
      dateStatus: ["", [Validators.required, Validators.min(1)]],
      status: ["", [Validators.required, Validators.min(1)]],
      page: this.page,
      search: [''],
      flag: 1,
      orderTypeStatus: ["", [Validators.required, Validators.min(1)]],
    })
    
  }

  setTabOption(data: any) {
    this.TabOption = data;
    if (this.TabOption) {
      this.fetchData();
    }
  }

  ngOnInit(): void {
    this.modelChanged.pipe(debounceTime(300), distinctUntilChanged()).subscribe((val) => {
      this.reportData.get('search')?.setValue(val?.search)
      this.fetchData()
    });
    this.fetchData()
  }

  fetchData() {
    if ( this.TabOption == 0 ) {

      // console.log(this.TabOption,'0')
      this._SpinnerService.setState(true);
      this._AdminService.getAstroRankByRating(this.reportData.value).then((data) => {
        if (data?.status) {
          this.resultList = data?.data;
          this._SpinnerService.setState(false);
        }
      });
    }
    else if ( this.TabOption == 1 ) {
      // console.log(this.TabOption,'1')

      this._SpinnerService.setState(true);
      this._AdminService.getAstroRankByNewCustomer(this.reportDataByNewCustomer.value).then((data) => {
        if (data?.status) {
          this._SpinnerService.setState(false);
          this.resultListNewCustomer = data?.data;
          // console.log(this.resultListNewCustomer.resultData)
        }
      });
    }
    else if ( this.TabOption == 2 ) {
      // console.log(this.TabOption,'2')

      this._SpinnerService.setState(true);
      this._AdminService.getAstroRankByNewCustomer(this.reportDataByRepeatCustomer.value).then((data) => {
        if (data?.status) {
          this.resultListNewCustomer = data?.data;
          // console.log(this.resultListNewCustomer.resultData)
          this._SpinnerService.setState(false);
        }
      });
    }
    else if ( this.TabOption == 3 ) {
      // console.log(this.TabOption, '3')

      this._SpinnerService.setState(true);
      this._AdminService.getAstroRankByBusyTime(this.reportDataByBusyTime.value).then((data) => {
        if (data?.status) {
          this.resultListBusyTime = data?.data;
          this._SpinnerService.setState(false);
        }
      });
    }
    else if ( this.TabOption == 4 ) {
      // console.log(this.TabOption, '4')
      this._SpinnerService.setState(true);
      this._AdminService.getAstroRankByOnlineTime(this.reportDataByOnlineTime.value).then((data) => {
        if (data?.status) {
          this.resultListOnlineTime = data?.data;
          this._SpinnerService.setState(false);
        }
      });
    }
  }

  onPaginateChange($: any) {
    if ( this.TabOption == 0 ) {
      this.reportData.get('page')?.setValue($.pageIndex + 1);
    }
    else if ( this.TabOption == 1 ) {
      this.reportDataByNewCustomer.get('page')?.setValue($.pageIndex + 1);
    }
    else if ( this.TabOption == 2 ) {
      this.reportDataByRepeatCustomer.get('page')?.setValue($.pageIndex + 1);
    }
    else if ( this.TabOption == 3 ) {
      this.reportDataByBusyTime.get('page')?.setValue($.pageIndex + 1);
    }
    else if ( this.TabOption == 4 ) {
      this.reportDataByOnlineTime.get('page')?.setValue($.pageIndex + 1);
    }
    this.fetchData();
  }

  search(event: any) {
    if ( this.TabOption == 0 ) {
      this.reportData.get('search')?.setValue(event.target.value);
    }
    else if ( this.TabOption == 1 ) {
      this.reportDataByNewCustomer.get('search')?.setValue(event.target.value);
    }
    else if ( this.TabOption == 2 ) {
      this.reportDataByRepeatCustomer.get('search')?.setValue(event.target.value);
    }
    else if ( this.TabOption == 3 ) {
      this.reportDataByBusyTime.get('search')?.setValue(event.target.value);
    }
    else if ( this.TabOption == 4 ) {
      this.reportDataByOnlineTime.get('search')?.setValue(event.target.value);
    }
    this.fetchData();
  }

  handleGoto(id: any) {
    this.page = id;
    if ( this.TabOption == 0 ) {
      this.reportData.get('page')?.setValue(id);
    }
    else if ( this.TabOption == 1 ) {
      this.reportDataByNewCustomer.get('page')?.setValue(id);
    }
    else if ( this.TabOption == 2 ) {
      this.reportDataByRepeatCustomer.get('page')?.setValue(id);
    }
    else if ( this.TabOption == 3 ) {
      this.reportDataByBusyTime.get('page')?.setValue(id);
    }
    else if ( this.TabOption == 4 ) {
      this.reportDataByOnlineTime.get('page')?.setValue(id);
    }
    this.pageRef = id - 1
    this.fetchData();
  }

  choosedDate(event: any) {
    this.reportDataByNewCustomer.get('from')?.setValue(new Date(event?.startDate?.$d).valueOf());
    this.reportDataByNewCustomer.get('to')?.setValue(new Date(event?.endDate?.$d).valueOf());
    this.fetchData();
  }
}
