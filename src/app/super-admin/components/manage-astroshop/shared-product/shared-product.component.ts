import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import * as moment from 'moment';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subject, debounceTime, distinctUntilChanged } from 'rxjs';
import { AdminService } from 'src/app/shared/services/admin-api/admin-api.service';
import { SpinnerService } from 'src/app/shared/services/spinner.service';
import { NotifierService } from 'src/app/shared/services/toaster.service';

@Component({
  selector: 'app-shared-product',
  templateUrl: './shared-product.component.html',
  styleUrls: ['./shared-product.component.css']
})
export class SharedProductComponent implements OnInit{

  modelChanged: Subject<any> = new Subject<any>();
  modalRef?: BsModalRef;
  search: string = '';
  paginationData: any;
  sharedList:any=[]
  ranges: any = {
    'Today': [new Date(), new Date()],
    'Yesterday': [moment().utc().subtract(1, 'days'), moment().subtract(1, 'days').local()],
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
    private _NotifierService: NotifierService,
    private _SpinnerService: SpinnerService,
  ){

  }

  ngOnInit(): void {

    this.getSharedProduct()

    this.modelChanged.pipe(debounceTime(300), distinctUntilChanged()).subscribe((val) => {
      this.search=val.search
      this.getSharedProduct()
    });
  }

  getSharedProduct(page:any=1){
    this._SpinnerService.setState(true)
    this._AdminService.getSharedProductList({page:page,searchInput:this.search}).then(data=>{
      if(data?.status){
        this.sharedList=data?.data?.sharedList
        this.paginationData=data?.data
      }
      this._SpinnerService.setState(false)
    })
  }

  searchProduct(event: any) {
    this.modelChanged.next({ search: event.target.value })
  }
  pagination($: any) {
    // this.page = $.pageIndex + 1;
    this.getSharedProduct($.pageIndex + 1);
  }
  choosedDate(event: any) {
    console.log(event);
    
    // this.getChatdata.get('from')?.setValue(new Date(event?.startDate?.$d).valueOf());
    // this.getChatdata.get('to')?.setValue(new Date(event?.endDate?.$d).valueOf());
    // this.getChatReport();
  }


}
