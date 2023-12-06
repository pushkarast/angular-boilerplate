import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import * as moment from 'moment';
import { Subject, debounceTime, distinctUntilChanged } from 'rxjs';
import { AdminService } from 'src/app/shared/services/admin-api/admin-api.service';
import { SpinnerService } from 'src/app/shared/services/spinner.service';
import { NotifierService } from 'src/app/shared/services/toaster.service';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-astrologer-report',
  templateUrl: './astrologer-report.component.html',
  styleUrls: ['./astrologer-report.component.css']
})
export class AstrologerReportComponent {
  reportData: FormGroup;
  modelChanged: Subject<any> = new Subject<any>();
  reportList: any = [];
  name = 'Angular';
  modelDate = new Date();
  excelS3link = ""
  TabOption = 1;
  constructor(
    private _AdminService: AdminService,
    private _FormBuilder: FormBuilder,
    private _SpinnerService: SpinnerService,
    private _NotifierService: NotifierService,
  ) {
    this.reportData = this._FormBuilder.group({
      page: 1,
      astroid: null,
      all: false,
      monthIndex: new Date().getMonth(),
      year: new Date().getFullYear(),
      search: null
    })
  }
  ngOnInit(): void {
    this.modelChanged.pipe(debounceTime(300), distinctUntilChanged()).subscribe((val) => {
      this.reportData.get('search')?.setValue(val?.search)
      this.fetchAstroreport()
    });
    this.fetchAstroreport();
  }
  fetchAstroreport() {
    this._SpinnerService.setState(true);
    this.reportData.get('all')?.setValue(false);
    this.reportList = []
    if (this.TabOption == 1) {
      this._AdminService.fetchAstroreport(this.reportData.value).then((data) => {
        if (data?.status) {
          this.reportList = data?.data;
          this._SpinnerService.setState(false);
        }
      });
    }
    else if (this.TabOption == 2) {
      this._AdminService.astromallEarning(this.reportData.value).then((data) => {
        if (data?.status) {
          this.reportList = data?.data;
          this._SpinnerService.setState(false);
        }
      });
    }
  }
  onOpenCalendar(container: any) {
    container.monthSelectHandler = (event: any): void => {
      container._store.dispatch(container._actions.select(event.date));
    };
    container.setViewMode('month');
  }
  getDate(date: any) {
    if (date) {
      this.excelS3link = ""
      const selectedMonth = new Date(date);
      this.reportData.get('monthIndex')?.setValue(selectedMonth.getMonth());
      this.reportData.get('year')?.setValue(selectedMonth.getFullYear());
      this.fetchAstroreport();
    }
  }
  pagination($: any) {
    // console.log("pagination", this.reportData.value)
    this.reportData.get('page')?.setValue($.pageIndex + 1)
    this.fetchAstroreport();
  }
  search(event: any) {
    this.reportData.get('page')?.setValue(1)
    this.modelChanged.next({ search: event.target.value })

  }
  changeStatus(id: any) {
    // console.log(id)
    this._AdminService.alterastroReport({ id: id }).then((data) => {
      if (data?.status) {
        this.fetchAstroreport();
      } else
        this._NotifierService.showError("Some Error Occurred!");
    })
  }
  setTabOption(id: any, type: string) {
    this.TabOption = id;
    this.fetchAstroreport();
  }

  // exportexcel(): void {
  //   /* pass here the table id */
  //   let fileName = 'Astrologer Monthly Report.xlsx';
  //   this._SpinnerService.setState(true)
  //   this.reportData.get('all')?.setValue(true);
  //   this._AdminService.fetchAstroreport(this.reportData.value).then((data) => {
  //     if (data?.status) {
  //       this.excelS3link = data.data
  //       this._SpinnerService.setState(false)
  //     }
  //     else
  //       this._NotifierService.showError("Some Error Occurred!");
  //   });
  //   this.reportData.get('all')?.setValue(false);
  // }

  exportexcel(): void {
    /* pass here the table id */
    let fileName = 'PaymentReport.xlsx';
    this._SpinnerService.setState(true);
    this.reportData.get('all')?.setValue(true);
    this._AdminService.fetchAstroreport(this.reportData.value).then((data) => {
      if (data?.status) {
        console.log(data?.data)
        let exceldata: any = [];
        for (let datas of data?.data) {
          exceldata.push({
            AstroId: datas?.AstroId,
            FullName: datas?.FullName,
            EmailId: datas?.EmailId,
            MobileNo: datas?.MobileNo,
            IFSCCode: datas?.IFSCCode,
            BankName: datas?.BankName,
            AccountBranch: datas?.AccountBranch,
            AccountName: datas?.AccountName,
            AccountNo: datas?.AccountNo,
            TotalAmount: datas?.TotalAmount,
            PaidStatus: datas?.PaidStatus
          });
        }
        const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(exceldata);

        /* generate workbook and add the worksheet */
        const wb: XLSX.WorkBook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Call History Data');
        /* save to file */
        XLSX.writeFile(wb, fileName);
        this._SpinnerService.setState(false);
      } else this._NotifierService.showError('Some Error Occurred!');

    });
  }

  astroMallexportexcel(): void {
    let fileName = 'AstromallReport.xlsx';
    this._SpinnerService.setState(true);
    this.reportData.get('all')?.setValue(true);
    this._AdminService.astromallEarning(this.reportData.value).then((data) => {
      if (data?.status) {
        console.log(data?.data)
        let exceldata: any = [];
        for (let datas of data?.data) {
          exceldata.push({
            AstroId: datas?.AstroId,
            FullName: datas?.FullName,
            EmailId: datas?.EmailId,
            MobileNo: datas?.MobileNo,
            IFSCCode: datas?.IFSCCode,
            BankName: datas?.BankName,
            AccountBranch: datas?.AccountBranch,
            AccountName: datas?.AccountName,
            AccountNo: datas?.AccountNo,
            TotalAmount: datas?.TotalAmount,
            PaidStatus: datas?.PaidStatus
          });
        }
        const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(exceldata);

        /* generate workbook and add the worksheet */
        const wb: XLSX.WorkBook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Call History Data');
        /* save to file */
        XLSX.writeFile(wb, fileName);
        this._SpinnerService.setState(false);
      } else this._NotifierService.showError('Some Error Occurred!');
    });
  }


}
