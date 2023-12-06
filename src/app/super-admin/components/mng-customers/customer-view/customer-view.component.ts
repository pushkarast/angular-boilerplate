import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/shared/services/admin-api/admin-api.service';
import { SpinnerService } from 'src/app/shared/services/spinner.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Params } from '@angular/router';

@Component({
  selector: 'app-customer-view',
  templateUrl: './customer-view.component.html',
  styleUrls: ['./customer-view.component.css']
})
export class CustomerViewComponent {
  selectedTab = 1;
  customerId: any;
  params = new HttpParams();
  routerString = "customer-profile";
  qParamsType: any;
  // queryParams: Params = { type: 'txn' };

  constructor(
    private _ActivatedRoute: ActivatedRoute,
    private _AdminService: AdminService,
    private _SpinnerService: SpinnerService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    // console.log(this.router, 'routerl...')

    this._ActivatedRoute.queryParams.subscribe((params) => {
      this.qParamsType = params['type'];
      this.customerId = params['id'];
    });
    this.setTabOption(1);
    // this.fetchAstrodata();


  }
  setTabOption(selectedOption: any) {
    this.selectedTab = selectedOption;
    // params = params.append('type','txn');
    // this.router.append(['superAdmin/txn-history', {id: this.customerId}]);

    var queryParams: Params = { type: 'txn' };
    if (selectedOption == '1') {
      var queryParams: Params = { type: 'profile', id: this.customerId };
      this.routerString = "customer-profile";
    }
    else if (selectedOption == '2') {
      var queryParams: Params = { type: 'callLog', id: this.customerId };
      this.routerString = "call-history";
    }
    else if (selectedOption == '3') {
      var queryParams: Params = { type: 'txn', id: this.customerId };
      this.routerString = "txn-history";
    }
    else if (selectedOption == '4') {
      var queryParams: Params = { type: 'offer', id: this.customerId };
      this.routerString = "customer-offers";
    }
    else if (selectedOption == '5') {
      var queryParams: Params = { type: 'feedback', id: this.customerId };
      this.routerString = "customer-feedbacks";
    }
    else if (selectedOption == '6') {
      var queryParams: Params = { type: 'custom', id: this.customerId };
      this.routerString = "custom-offers";
    }
    else if (selectedOption == '7') {
      var queryParams: Params = { type: 'modifyWallet', id: this.customerId };
      this.routerString = "modify-wallet";
    }
    else if (selectedOption == '8') {
      var queryParams: Params = { type: 'activity', id: this.customerId };
      this.routerString = "customer-activity";
    }
    // console.log(this.routerString, 'routerStringrouterString...')

    this.router.navigate(
      [`/superAdmin/mng-customers/customer-view/${this.routerString}`],
      {
        relativeTo: this._ActivatedRoute,
        queryParams,
        // queryParamsHandling: 'merge', // remove to replace all query params by provided
      });

    // routerLink="txn-history" [queryParams]="{id:customerId}" 
  }


}
