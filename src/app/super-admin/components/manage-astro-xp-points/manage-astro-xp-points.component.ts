import { Component, OnInit, TemplateRef,ViewChild  } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from 'src/app/shared/services/admin-api/admin-api.service';
import { SpinnerService } from 'src/app/shared/services/spinner.service';
import { NotifierService } from 'src/app/shared/services/toaster.service';
import { ActivatedRoute } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Subject, debounceTime, distinctUntilChanged } from 'rxjs';
import { Buffer } from 'buffer';

@Component({
  selector: 'app-manage-astro-xp-points',
  templateUrl: './manage-astro-xp-points.component.html',
  styleUrls: ['./manage-astro-xp-points.component.css']
})
export class ManageAstroXpPointsComponent {
  xpData: FormGroup;

  constructor(
    private _FormBuilder: FormBuilder,
    private _AdminService: AdminService,
    private _SpinnerService: SpinnerService,
    private _NotifierService: NotifierService,
    private _ActivatedRoute: ActivatedRoute,
    private modalService: BsModalService,
  ) {
    this.xpData = this._FormBuilder.group({
      positiveFeedback: 0,
      negativeFeedback: 0,
      normalFeedback: 0,
      completedOrder: 0,
      missedOrder: 0,
      declinedOrder: 0,
      completedFree: 0,
      missedFree: 0,
      declinedFree: 0,
      repeatUserCompleted: 0,
      busyTime: 0,
      onlineTime: 0,
      repeatUserMissed: 0,
      repeatUserDeclined: 0,
      dailyDeduction: 0
    })
  }

  ngOnInit(): void {
    this.getXpData();
  }

  getXpData() {
    this._AdminService.fetchXpPointValues().then((data) => {
      if (data?.status) {
        this.xpData.patchValue(data?.data)
      }
    });
  }

  updateXpData() {
    this._AdminService.updateXpPointValue(this.xpData.value).then((data) => {
      if (data?.status) {
        this._NotifierService.showSuccess("Success")
        this.getXpData()
      } else {
        this._NotifierService.showSuccess("something went wrong!")
      }
    });
  }

}