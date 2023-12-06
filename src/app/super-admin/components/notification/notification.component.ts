import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { AdminService } from 'src/app/shared/services/admin-api/admin-api.service';
import { NotifierService } from 'src/app/shared/services/toaster.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import option from "../../../../assets/constants/ngSelectvalues"
import { SpinnerService } from 'src/app/shared/services/spinner.service';
import { MatPaginator } from '@angular/material/paginator';
@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {

  @ViewChild('paginator') paginator!: MatPaginator;

  modalRef?: BsModalRef
  getInfo: FormGroup
  type: String = ""
  TabOption: number = 1
  tabType: string = 'Immediate'
  notificationList: any = []
  editNotificationList: any = []
  todayDate: any = moment().format("YYYY-MM-DD")
  moment: any = moment()
  panelOpenState: Boolean = false
  isFormSubmitted: boolean = false
  notificationOptions = option.notifications
  notificationLink = option.notificationLink
  astroList: any
  paginationData: any
  submitForm: boolean = false
  constructor(
    private _NotifierService: NotifierService,
    private _AdminService: AdminService,
    private _FormBuilder: FormBuilder,
    private modalService: BsModalService,
    private _SpinnerService: SpinnerService,
  ) {
    this.getInfo = this._FormBuilder.group({
      notiId: [null],
      title: [null, [Validators.required]],
      message: [null, [Validators.required]],
      notiType: [null, [Validators.required]],
      notiFor: [null, [Validators.required]],
      scheduled: ['No'],
      scheduledDate: [""],
      scheduledTime: [""],
      scheduledType: ['Immediate'],
      image: [null],
      link: [null],
      astroid: [null]
    });
  }

  ngOnInit(): void {
    console.log('updated')
    this.getNotiList()
    this.getAstroList()
  }

  getAstroList() {
    this._AdminService.getAstroListForDropDown().then((data) => {
      if (data?.status) {
        this.astroList = data?.data;

      }
    });
  }

  getFormData() {
    console.log(this.paginationData)
    let formData = new FormData()

    console.log(this.getInfo.value);


    formData.set('notiId', this.getInfo.get('notiId')?.value);
    formData.set('title', this.getInfo.get('title')?.value);
    formData.set('message', this.getInfo.get('message')?.value);
    formData.set('notiType', this.getInfo.get('notiType')?.value);
    formData.set('notiFor', this.getInfo.get('notiFor')?.value);
    formData.set('scheduled', this.getInfo.get('scheduled')?.value);
    formData.set('scheduledDate', this.getInfo.get('scheduledDate')?.value);

    // formData.set('scheduledTime', this.getInfo.get('scheduledTime')?.value);

    const timeinUTC = new Date(this.getInfo.get('scheduledDate')?.value + " " + this.getInfo.get('scheduledTime')?.value);
    formData.set('scheduledTime', timeinUTC.getUTCHours() + ":" + timeinUTC.getUTCMinutes());

    formData.set('scheduledType', this.getInfo.get('scheduledType')?.value);
    formData.set('image', this.getInfo.get('image')?.value);
    formData.set('link', this.getInfo.get('link')?.value);
    formData.set('astroid', this.getInfo.get('astroid')?.value);


    return formData
  }

  getData(edited = false) {
    this.submitForm = true
    if (this.getInfo?.valid) {
      this._AdminService.sendNotification(this.getFormData()).then((data) => {
        if (data?.status) {
          this._NotifierService.showSuccess("Notification Triggered");
          this.modalRef?.hide();
          this.getNotiList()
          this.resetFormData()
        } else {
          this._NotifierService.showError("Some Error Occurred");
        }
        this.submitForm = false
      })
    } else {
      this._NotifierService.showError("Please enter all the required fields");
    }
  }
  setType(event: any = null) {
    this.type = event.value;
    if (event.value == "No") {
      this.getInfo.get('scheduledTime')?.setValue("");
      this.getInfo.get('scheduledDate')?.setValue("");
      this.getInfo.get('scheduledType')?.setValue("Immediate");
      this.getInfo.get('scheduledType')?.clearValidators()
      this.getInfo.get('scheduledType')?.updateValueAndValidity()
    } else {
      this.getInfo.get('scheduledType')?.setValidators([Validators.required])
      this.getInfo.get('scheduledType')?.updateValueAndValidity()
    }
  }

  pagination($: any) {
    // this.page = $.pageIndex + 1;
    this.getNotiList(null, $.pageIndex + 1);
  }

  getNotiList(notiId = null, page: number = 1) {
    this._SpinnerService.setState(true);
    //setting timezone as per the server
    this._AdminService.getNotification({ notiId: notiId, type: this.tabType, page: page }).then((data) => {
      if (data?.status) {
        if (!notiId) {
          this.notificationList = data?.data?.data
          this.paginationData = data?.data
          if (page == 1) {
            this.paginator.firstPage();
          }
        }
        else {
          this.editNotificationList = data?.data?.data
          this.getInfo.get('notiId')?.setValue(data?.data?.data?.id)
          this.getInfo.get('title')?.setValue(data?.data?.data?.title);
          this.getInfo.get('message')?.setValue(data?.data?.data?.description);
          this.getInfo.get('notiType')?.setValue(data?.data?.data?.notification_type);
          this.getInfo.get('link')?.setValue(data?.data?.data?.link);
          this.getInfo.get('notiFor')?.setValue(data?.data?.data?.type);
          this.getInfo.get('scheduled')?.setValue(data?.data?.data?.schedule_type == "Immediate" ? "No" : "Yes");
          if (data?.data?.data?.schedule_type != 'Immediate') {
            this.type = "Yes";
            this.getInfo.get('scheduledDate')?.setValue(moment(data?.data?.data?.scheduled_at).format("yyyy-MM-DD"));
            this.getInfo.get('scheduledTime')?.setValue(moment(data?.data?.data?.scheduled_at).format("HH:mm"));
            console.log(this.getInfo.get('scheduledTime')?.value);

            this.getInfo.get('scheduledType')?.setValue(data?.data.data?.schedule_type);
          }
          else {
            this.type = "No"
          }
        }
        this._SpinnerService.setState(false);
      } else {
        this._NotifierService.showError("Some Error Occurred");
        this._SpinnerService.setState(false);
      }
    })
  }
  setTabOption(id: any, type: string) {
    this.TabOption = id;
    this.getInfo.reset();
    this.tabType = type
    this.getNotiList();
    this.getInfo.get('scheduledType')?.setValue(type);
    if (id !== 1) {
      this.getInfo.get('scheduled')?.setValue('Yes')
    } else {
      this.getInfo.get('scheduled')?.setValue('No')
    }
  }
  deleteNoty(notyId: any) {
    this._AdminService.deleteNotification({ notiId: notyId }).then((data) => {
      if (data?.status) {
        this._NotifierService.showSuccess("Notification Deleted");
        this.getNotiList();
      } else {
        this._NotifierService.showError("Some Error Occurred");
      }
    });
  }
  stopNoty(notyId: any) {
    this._AdminService.stopNotification({ notiId: notyId }).then((data) => {
      if (data?.status) {
        this._NotifierService.showSuccess("Notification Stopped");
        this.getNotiList();
      } else {
        this._NotifierService.showError("Some Error Occurred");
      }
    });
  }
  restartNoty(notyId: any) {
    this._AdminService.restartNotification({ notiId: notyId }).then((data) => {
      if (data?.status) {
        this._NotifierService.showSuccess("Notification Restarted");
        this.getNotiList();
      } else {
        this._NotifierService.showError("Some Error Occurred");
      }
    });
  }
  myFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    // Prevent Saturday and Sunday from being selected.
    return day !== 0 && day !== 6;
  };
  togglePanel = () => {
    this.resetFormData()
    this.panelOpenState = !this.panelOpenState;
    this.getNotiList();
  }
  openModal(template: TemplateRef<any>, notiID: any) {
    this.getNotiList(notiID);
    this.modalRef = this.modalService.show(template, { backdrop: 'static' });
  }
  closeModal() {
    this.resetFormData()
    this.modalRef?.hide()
  }

  resetFormData() {
    this.getInfo.reset();
    this.TabOption !== 1 ? this.getInfo.get('scheduled')?.setValue('Yes') : this.getInfo.get('scheduled')?.setValue('No')
    this.getInfo.get('scheduledType')?.setValue(this.tabType);
  }

  fileupload(event: Event, key: any): void {
    if (event.target !== null) {
      const files = (<HTMLInputElement>event.target).files;
      if (files !== null) {
        const fileList: FileList = files;
        if (fileList && fileList.length > 0) {
          const file: File = fileList[0];
          this.getInfo.get('image')?.setValue(file)
        }
      }
    }
  }
}
