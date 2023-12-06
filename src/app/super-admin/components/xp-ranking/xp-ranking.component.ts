import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from 'src/app/shared/services/admin-api/admin-api.service';
import { SpinnerService } from 'src/app/shared/services/spinner.service';
import { NotifierService } from 'src/app/shared/services/toaster.service';
import option from "../../../../assets/constants/ngSelectvalues"
import { Subject, debounceTime, distinctUntilChanged } from 'rxjs';
import * as moment from "moment";

@Component({
  selector: 'app-xp-ranking',
  templateUrl: './xp-ranking.component.html',
  styleUrls: ['./xp-ranking.component.css']
})
export class XpRankingComponent {
  modelChanged: Subject<any> = new Subject<any>();
  xpList: any = []
  getXpData: FormGroup

  constructor(
    private _AdminService: AdminService,
    private _FormBuilder: FormBuilder,
    private _SpinnerService: SpinnerService,
    private _NotifierService: NotifierService,
  ) {
    this.getXpData = this._FormBuilder.group({
      search: ""
    })
  }

  ngOnInit(): void {
    this.modelChanged.pipe(debounceTime(300), distinctUntilChanged()).subscribe((val) => {
      this.getXpData.get('search')?.setValue(val?.search)
      this.getXps()
    });
    this.getXps()
  }

  getXps() {
    this._SpinnerService.setState(true);
    this._AdminService.rankAstrologerByXp(this.getXpData.value).then((data) => {
      if (data?.status) {
        this.xpList = data?.data;
        this._SpinnerService.setState(false);
      }
    });
  }

  search(event: any) {
    this.modelChanged.next({ search: event.target.value });
  }
}
