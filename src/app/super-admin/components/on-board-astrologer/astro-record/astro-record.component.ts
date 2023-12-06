import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from 'src/app/shared/services/admin-api/admin-api.service';
import { SpinnerService } from 'src/app/shared/services/spinner.service';

@Component({
  selector: 'app-astro-record',
  templateUrl: './astro-record.component.html',
  styleUrls: ['./astro-record.component.css'],
})
export class AstroRecordComponent implements OnInit {
  astroid: any;
  astroRecord: any;
  constructor(
    private _AdminService: AdminService,
    private _SpinnerService: SpinnerService,
    private _ActivatedRoute: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this._ActivatedRoute.queryParams.subscribe((params) => {
      this.astroid = params['astroid'];
    });
    this.fetchAstrorecord();
  }
  fetchAstrorecord() {
    this._SpinnerService.setState(true);
    this._AdminService
      .getAstrorecord({ astroId: this.astroid })
      .then((data) => {
        if (data?.status) {
          this.astroRecord = data?.data;
        }
        this._SpinnerService.setState(false);
      });
  }
}
