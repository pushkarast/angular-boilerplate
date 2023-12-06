import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AdminService } from 'src/app/shared/services/admin-api/admin-api.service';
import { NotifierService } from 'src/app/shared/services/toaster.service';

@Component({
  selector: 'app-adminusers',
  templateUrl: './adminusers.component.html',
  styleUrls: ['./adminusers.component.css']
})
export class AdminusersComponent implements OnInit {
  usersList: any;
  userData: FormGroup;
  modalRef?: BsModalRef;
  password = "password"
  show = false;
  initialValues = "";
  constructor(
    private _AdminService: AdminService,
    private _FormBuilder: FormBuilder,
    private modalService: BsModalService,
    private _NotifierService: NotifierService,
  ) {
    this.userData = this._FormBuilder.group({
      id: [null],
      name: [null, Validators.required],
      email: [null, Validators.required],
      password: [null, Validators.required],
      mobile: [null, Validators.required],
      allowedIp: ['122.176.61.221']
    })
  }
  ngOnInit(): void {
    this.getAdminusers();
    this.initialValues = this.userData?.value;
  }
  getAdminusers(id = null) {
    this._AdminService.fetchAdminusers({ id: id }).then((data) => {
      if (data?.status) {
        if (id) {
          this.userData.patchValue(data?.data[0]);
          this.userData.get('mobile')?.setValue(data?.data[0]?.mobileno)
        }
        else
          this.usersList = data?.data
      }
    })
  }
  deleteUser(id = null) {
    this._AdminService.deleteAdminusers({ id: id }).then((data) => {
      if (data?.status) {
        this._NotifierService.showSuccess("Success")
        this.getAdminusers();
      }
    })
  }
  updateUser() {
    this._AdminService.updateAdminusers(this.userData?.value).then((data) => {
      if (data?.status) {
        this.closeModal();
        this._NotifierService.showSuccess("Success")
      }
    })
  }
  passwordShow() {
    this.show = !this.show;
    if (this.show)
      this.password = "text"
    else
      this.password = "password"
  }
  openModal(template: TemplateRef<any>, id = null) {
    this.getAdminusers(id)
    this.modalRef = this.modalService.show(template, { class: 'modal-xl', backdrop: "static", keyboard: false });
  }
  closeModal() {
    this.show = false;
    this.password = "password"
    this.userData.reset(this.initialValues);
    this.modalRef?.hide();
    this.getAdminusers()
  }
}
