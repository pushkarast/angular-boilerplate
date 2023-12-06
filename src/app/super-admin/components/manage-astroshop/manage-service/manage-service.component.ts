import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal';
import { Subject, debounceTime, distinctUntilChanged } from 'rxjs';
import { AdminService } from 'src/app/shared/services/admin-api/admin-api.service';
import { SpinnerService } from 'src/app/shared/services/spinner.service';
import { NotifierService } from 'src/app/shared/services/toaster.service';
import option from '../../../../../assets/constants/ngSelectvalues';
@Component({
  selector: 'app-manage-service',
  templateUrl: './manage-service.component.html',
  styleUrls: ['./manage-service.component.css']
})
export class ManageServiceComponent implements OnInit{
  modelChanged: Subject<any> = new Subject<any>();
  search: string = '';
  paginationData: any;
  serviceList:any;
  option=option.serviceFilter

  constructor(
    private modalService: BsModalService,
    private _AdminService: AdminService,
    private _NotifierService: NotifierService,
    private _SpinnerService: SpinnerService,
    private _FormBuilder: FormBuilder
  ){

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

  getServiceOrderList(page:any=1,filter:any=null){
    this._SpinnerService.setState(true)
    this._AdminService.getServiceOrderHistory({page:page,search:this.search,filter:filter}).then(data=>{
      if(data?.status){
        this.serviceList=data?.data?.servicerList
        this.paginationData=data?.data
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

  handleFilter(event:any){
    this.getServiceOrderList(1,event?event?.value:null)
  }

  giveManualReminder(bodyData:any){
    this._SpinnerService.setState(true)
    this._AdminService.serviceReminderManual(bodyData).then(data=>{
      if(data?.status){
        this._NotifierService.showSuccess('Reminder Sent Successfully')
      }else{
        this._NotifierService.showError('Something Went Wrong')
      }
      this._SpinnerService.setState(false)
    })
  }

}
