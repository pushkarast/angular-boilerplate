import { Component, OnInit } from '@angular/core';
import { EChartsOption } from 'echarts';
import { AdminService } from 'src/app/shared/services/admin-api/admin-api.service';
import { SpinnerService } from 'src/app/shared/services/spinner.service';
import { NotifierService } from 'src/app/shared/services/toaster.service';
import { Buffer } from 'buffer'
import * as moment from 'moment';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  dashData: any;
  userType: any;
  charts: EChartsOption
  chartsCallchat: EChartsOption
  dates: any;
  values: any;
  modelDate = new Date();
  constructor(
    private _AdminService: AdminService,
    private _NotifierService: NotifierService,
    private _SpinnerService: SpinnerService,
  ) {
    this.charts = {};
    this.chartsCallchat = {};
  }

  ngOnInit(): void {
    if (localStorage.getItem('_ty_'))
      this.userType = Buffer.from(localStorage.getItem('_ty_') || '{}', 'base64').toString('ascii');
    this.fetchDash();
  }
  fetchDash(graphDate: any = null) {

    this._SpinnerService.setState(true);
    this._AdminService.fetchDashboard({ graphDate: graphDate }).then((data) => {

      if (data?.status) {
        this.dashData = data?.data;
        this.dates = data?.data?.userData?.userDates;
        this.values = data?.data?.userData?.userCount;
        this.charts = {
          title: {
            text: 'New Monthly Customers'
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              animation: false
            }
          },
          yAxis: {
            type: 'value',
            name: "Customers"
          },
          xAxis: {
            type: 'category',
            data: data?.data?.userData?.userDates,
            name: "Date"
          },
          series: [
            {
              data: data?.data?.userData?.userCount,
              type: 'line'
            }
          ]
        };

        this.chartsCallchat = {
          title: {
            text: 'No. of Call/Chat/Video Calls'
          },
          tooltip: {
            trigger: 'axis'
          },
          xAxis: {
            type: 'category',
            nameLocation: 'middle',
            data: data?.data?.callChatvcdata?.dates
          },
          yAxis: {
            name: ''
          },
          series: [
            {
              type: 'line',
              showSymbol: true,
              name: "Total Chats",
              data: data?.data?.callChatvcdata?.chat
            },
            {
              type: 'line',
              showSymbol: true,
              name: "Total Calls",
              data: data?.data?.callChatvcdata?.call
            },
            {
              type: 'line',
              showSymbol: true,
              name: "Total VC",
              data: data?.data?.callChatvcdata?.vcall
            }
          ]
        }

      }
      else
        this._NotifierService.showError("Some Error Occurred")
    })
    this._SpinnerService.setState(false);
  }
  onOpenCalendar(container: any) {
    container.monthSelectHandler = (event: any): void => {
      container._store.dispatch(container._actions.select(event.date));
    };
    container.setViewMode('month');
  }
  getDate(date: any) {
    if (date) {
      this._SpinnerService.setState(true);
      this.fetchDash(moment(date).format("MM/DD/YYYY"));
      this._SpinnerService.setState(false);
    }
  }
}
