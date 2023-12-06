import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AdminService } from 'src/app/shared/services/admin-api/admin-api.service';
import { NotifierService } from 'src/app/shared/services/toaster.service';

@Component({
  selector: 'app-admin-userpermission',
  templateUrl: './admin-userpermission.component.html',
  styleUrls: ['./admin-userpermission.component.css']
})
export class AdminUserpermissionComponent {
  orderForm: any;
  usersList: any;
  items: any;
  modalRef?: BsModalRef;
  userid: any;
  userName: any;
  userpermissions: any;
  optionsObj: any = {};
  isFormSubmitted: boolean = false;
  permissionsArr: any;
  constructor(
    private _AdminService: AdminService,
    private _FormBuilder: FormBuilder,
    private modalService: BsModalService,
    private _NotifierService: NotifierService,
    private _ActivatedRoute: ActivatedRoute
  ) { }
  ngOnInit() {
    this._ActivatedRoute.queryParams.subscribe(params => {
      this.userid = params["uid"];
    })
    this.orderForm = new FormGroup({
      role: new FormControl('', Validators.required),
      items: new FormArray([], Validators.required)
    });
    this.getMasterdata("permissions")
    this.getMasterdata("role")
    this.getMasterdata("permission_name")
    this.getAdminuser(this.userid)
  }
  getAdminuser(id = null) {
    this._AdminService.fetchAdminusers({ id: id }).then((data) => {
      if (data?.status) {
        this.userName = data?.data[0].name;
        this.userpermissions = JSON.parse(data?.data[0].permission);
        this.orderForm.get('role').setValue(this.userpermissions?.role)
        this.items = this.orderForm.get('items') as FormArray;
        this.userpermissions?.items?.map((element: any, index: any) => {
          this.items.push(this.createItem());
          this.items.at(index).get('permissionfor')?.setValue(element?.permissionfor)
          this.items.at(index).get('permissions')?.setValue(element?.permissions)
        })
      }
    })
  }
  createItem(): FormGroup {
    return this._FormBuilder.group({
      permissionfor: '',
      permissions: this.permissionsArr
    });
  }
  getMasterdata(masterName: any) {
    this._AdminService.getMasterDetailData({ masterName: masterName }).then((data) => {
      if (data?.status) {
        this.optionsObj[masterName] = data?.data;
      };
    })
  }
  handlePermission($event: any, index: any) {
    let arr: any = {}
    this.permissionsArr = $event.map((element: any) => {
      arr[element?.name] = element?.value
    })
  }
  addItem(): void {
    this.items = this.orderForm.get('items') as FormArray;
    this.items.push(this.createItem());
    console.log(this.items.value)
  }
  removeItem(index: any) {
    if (index !== -1) this.items.removeAt(index)
  }
  submit() {
    const permissions = JSON.stringify(this.orderForm?.value);
    this._AdminService.updateAdminusers({ permissions: permissions, id: this.userid }).then((data) => {
      if (data?.status) {
        this._NotifierService.showSuccess("Success")
      }
    });
  }
}
