import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';
import { AdminService } from 'src/app/shared/services/admin-api/admin-api.service';
import { SpinnerService } from 'src/app/shared/services/spinner.service';
import { NotifierService } from 'src/app/shared/services/toaster.service';
import option from '../../../../../assets/constants/ngSelectvalues';

@Component({
  selector: 'app-astroshop-order-history',
  templateUrl: './astroshop-order-history.component.html',
  styleUrls: ['./astroshop-order-history.component.css'],
})
export class AstroshopOrderHistoryComponent implements OnInit {
  modelChanged: Subject<any> = new Subject<any>();
  modalRef?: BsModalRef;
  search: string = '';
  paginationData: any;
  orderList: any;
  updateOrder: FormGroup;
  deliveryStatus = option.deliveryStatus;
  orderDetails: any;
  returnDetails:any

  constructor(
    private modalService: BsModalService,
    private _AdminService: AdminService,
    private _NotifierService: NotifierService,
    private _SpinnerService: SpinnerService,
    private _FormBuilder: FormBuilder
  ) {
    this.updateOrder = _FormBuilder.group({
      value: [3],
      trackingUrl: [''],
      orderid: [''],
    });
  }

  ngOnInit(): void {
    this.getShopOrderHistory();
  }

  getShopOrderHistory(page: any = 1) {
    this._SpinnerService.setState(true);
    this._AdminService
      .getShopOrderHistory({ page: page, searchInput: this.search })
      .then((data) => {
        if (data?.status) {
          this.orderList = data?.data?.orderHistory;
          this.paginationData = data?.data;
        }
        this._SpinnerService.setState(false);
      });
  }

  searchProduct(event: any) {
    this.modelChanged.next({ search: event.target.value });
  }
  pagination($: any) {
    // this.page = $.pageIndex + 1;
    this.getShopOrderHistory($.pageIndex + 1);
  }

  openModal(template: TemplateRef<any>, value: number, url: any, orderid: any) {
    if (value == 3 || value == 4) {
      this.updateOrder.get('value')?.setValue(value);
    }
    this.updateOrder.get('trackingUrl')?.setValue(url ? url : '');
    this.updateOrder.get('orderid')?.setValue(orderid);
    this.modalRef = this.modalService.show(template, {
      class: 'modal-md',
      backdrop: 'static',
      keyboard: false,
    });
  }

  openDetailsModal(template: TemplateRef<any>, orderid: any) {
    this._SpinnerService.setState(true);
    this._AdminService.getOrderDetails({ orderid: orderid }).then((data) => {
      if (data?.status && data?.data) {
        this.orderDetails = data?.data?.orderDetail;
        this.modalRef = this.modalService.show(template, {
          class: 'modal-lg',
          backdrop: 'static',
          keyboard: false,
        });
      } else {
        this._NotifierService.showError('Something went wrong');
      }
      this._SpinnerService.setState(false);
    });
  }

  closeModal(type = '') {
    this.modalRef?.hide();
    this.updateOrder.get('trackingUrl')?.setValue('');
    this.updateOrder.get('value')?.setValue(3);
    this.updateOrder.get('orderid')?.setValue('');
    // this.isEdit=false
    // this.productUpdateId=''
  }

  updateOrderStatus(value: number, orderid: any) {
    this._SpinnerService.setState(true);
    this._AdminService
      .updateOrderStatus({ value: value, orderid: orderid })
      .then((data) => {
        if (data?.status) {
          this.getShopOrderHistory(this.paginationData?.currentPage);
          this.closeModal()
          this._NotifierService.showSuccess('Status Updated Successfully');
        } else {
          this._NotifierService.showError('Something went wrong');
          this._SpinnerService.setState(false);
        }
      });
  }

  submitUpdate() {
    this._SpinnerService.setState(true);
    let obj = {
      value: this.updateOrder.get('value')?.value,
      orderid: this.updateOrder.get('orderid')?.value,
      url: this.updateOrder.get('trackingUrl')?.value,
    };
    this._AdminService.updateOrderDeliveryStatus(obj).then((data) => {
      if (data?.status) {
        this.getShopOrderHistory(this.paginationData?.currentPage);
        this._NotifierService.showSuccess('Status Updated Successfully');
        this.closeModal();
      } else {
        this._NotifierService.showError('Something went wrong');
        this._SpinnerService.setState(false);
      }
    });
  }

  getInvoicePDF(orderid:any){
    this._SpinnerService.setState(true);
    this._AdminService
      .getInvoiceOrShippingAddress({ OrderId: orderid })
      .then((data) => {
        if (data?.status) {
          // this.getShopOrderHistory(this.paginationData?.currentPage);
          this.downloadPdf(data?.data?.pdf,orderid)
        } else {
          this._NotifierService.showError('Something went wrong');
        }
        this._SpinnerService.setState(false);

      });
  }

  downloadPdf(data: any,id:any) {
    let downloadLink = document.createElement('a');
    downloadLink.setAttribute('id', 'a1');
    const linkSource = `data:application/pdf;base64,${data}`;
    downloadLink.href = linkSource;
    downloadLink.download = `${id}.pdf`;
    downloadLink.click();
    downloadLink.remove();
  }

  getReturnDetails(orderid:any,template: TemplateRef<any>){
    this._SpinnerService.setState(true);
    this._AdminService
      .getProductReturnDetail({ orderid: orderid })
      .then((data) => {
        if (data?.status) {
          this.returnDetails=data?.data?.returnData
          this.modalRef = this.modalService.show(template, {
            class: 'modal-lg',
            backdrop: 'static',
            keyboard: false,
          });
        }
        this._SpinnerService.setState(false);
      });
  }
}
