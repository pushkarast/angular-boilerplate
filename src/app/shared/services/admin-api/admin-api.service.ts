import { Injectable } from '@angular/core';
import { ApiService } from '../api-service/api.service';
import { ConfigService } from '../config.service';
import { ResponseBase } from '../../models/response.model';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  adminRoot: string;
  stagAdminRoot: string;

  constructor(
    private _ApiService: ApiService,
    private _ConfigService: ConfigService
  ) {
    this.adminRoot = `${this._ConfigService.config['api'].commonApiRoot}`;
    this.stagAdminRoot = `${this._ConfigService.config['api'].stagCommonRoot}`;
  }

  getIP(): Promise<ResponseBase> {
    return this._ApiService.postRequest<ResponseBase>(
      `/api/v1/auth/get-ip`,
      {},
      { apiRoot: this.stagAdminRoot }
    );
  }
  submitSAMobile(body: any): Promise<ResponseBase> {
    return this._ApiService.postRequest<ResponseBase>(
      `/api/v1/auth/sa-admin-login`,
      body,
      { apiRoot: this.adminRoot }
    );
  }
  submitSAOTP(body: any): Promise<ResponseBase> {
    return this._ApiService.postRequest<ResponseBase>(
      `/api/v1/auth/saAdminOTPValidation`,
      body,
      { apiRoot: this.adminRoot }
    );
  }
  callChatReport(body: any): Promise<ResponseBase> {
    return this._ApiService.postRequest<ResponseBase>(
      `/api/v1/admin/callchatReport`,
      body,
      { apiRoot: this.adminRoot }
    );
  }
  showChat(body: any): Promise<ResponseBase> {
    return this._ApiService.postRequest<ResponseBase>(
      `/api/v1/admin/getchat`,
      body,
      { apiRoot: this.adminRoot }
    );
  }
  sendNotification(body: any): Promise<ResponseBase> {
    return this._ApiService.postRequest<ResponseBase>(
      `/api/v1/admin/sendNotification`,
      body,
      { apiRoot: this.adminRoot }
    );
  }
  getNotification(body: any): Promise<ResponseBase> {
    return this._ApiService.postRequest<ResponseBase>(
      `/api/v1/admin/getNotificationList`,
      body,
      { apiRoot: this.adminRoot }
    );
  }

  deleteNotification(body: any): Promise<ResponseBase> {
    return this._ApiService.postRequest<ResponseBase>(
      `/api/v1/admin/deleteNotificationList`,
      body,
      { apiRoot: this.adminRoot }
    );
  }
  stopNotification(body: any): Promise<ResponseBase> {
    return this._ApiService.postRequest<ResponseBase>(
      `/api/v1/admin/stopNotification`,
      body,
      { apiRoot: this.adminRoot }
    );
  }
  restartNotification(body: any): Promise<ResponseBase> {
    return this._ApiService.postRequest<ResponseBase>(
      `/api/v1/admin/restartNotification`,
      body,
      { apiRoot: this.adminRoot }
    );
  }
  fetchFeedbacks(body: any): Promise<ResponseBase> {
    return this._ApiService.postRequest<ResponseBase>(
      `/api/v1/admin/fetchFeedbacks`,
      body,
      { apiRoot: this.adminRoot }
    );
  }
  editFeedbacks(body: any): Promise<ResponseBase> {
    return this._ApiService.postRequest<ResponseBase>(
      `/api/v1/admin/aDfeedback`,
      body,
      { apiRoot: this.adminRoot }
    );
  }
  updateFeedbacks(body: any): Promise<ResponseBase> {
    return this._ApiService.postRequest<ResponseBase>(
      `/api/v1/admin/updateFeedback`,
      body,
      { apiRoot: this.adminRoot }
    );
  }
  blog(body: any): Promise<ResponseBase> {
    return this._ApiService.postRequest<ResponseBase>(
      `/api/v1/admin/blog`,
      body,
      { apiRoot: this.adminRoot }
    );
  }
  fetchBlogs(body: any = null): Promise<ResponseBase> {
    return this._ApiService.postRequest<ResponseBase>(
      `/api/v1/admin/fetchBlogs`,
      body,
      { apiRoot: this.adminRoot }
    );
  }
  deleteBlog(body: any = null): Promise<ResponseBase> {
    return this._ApiService.postRequest<ResponseBase>(
      `/api/v1/admin/deletedBlog`,
      body,
      { apiRoot: this.adminRoot }
    );
  }
  TxnReports(body: any): Promise<ResponseBase> {
    return this._ApiService.postRequest<ResponseBase>(
      `/api/v1/admin/paymentTransReportShow`,
      body,
      { apiRoot: this.adminRoot }
    );
  }
  addSupportCategory(body: any): Promise<ResponseBase> {
    return this._ApiService.postRequest<ResponseBase>(
      `/api/v1/admin/addSupportCategory`,
      body,
      { apiRoot: this.adminRoot }
    );
  }
  fetchMasterTags(body: any): Promise<ResponseBase> {
    return this._ApiService.postRequest<ResponseBase>(
      `/api/v1/admin/fetchMasterTags`,
      body,
      { apiRoot: this.adminRoot }
    );
  }
  fetchSupportCatList(): Promise<ResponseBase> {
    return this._ApiService.postRequest<ResponseBase>(
      `/api/v1/admin/fetchSupportCatList`,
      { apiRoot: this.adminRoot }
    );
  }
  addSupportSubCategory(body: any): Promise<ResponseBase> {
    return this._ApiService.postRequest<ResponseBase>(
      `/api/v1/admin/addSupportSubCategory`,
      body,
      { apiRoot: this.adminRoot }
    );
  }
  getAllSupportTickets(body: any): Promise<ResponseBase> {
    return this._ApiService.postRequest<ResponseBase>(
      `/api/v1/admin/getAllSupportTickets`,
      body,
      { apiRoot: this.adminRoot }
    );
  }
  updateTicketStaus(body: any): Promise<ResponseBase> {
    return this._ApiService.postRequest<ResponseBase>(
      `/api/v1/admin/updateTicketStaus`,
      body,
      { apiRoot: this.adminRoot }
    );
  }
  getTicketById(body: any): Promise<ResponseBase> {
    return this._ApiService.postRequest<ResponseBase>(
      `/api/v1/admin/getTicketById`,
      body,
      { apiRoot: this.adminRoot }
    );
  }
  startSupportChat(body: any): Promise<ResponseBase> {
    return this._ApiService.postRequest<ResponseBase>(
      `/api/v1/admin/startSupportChat`,
      body,
      { apiRoot: this.adminRoot }
    );
  }
  fetchSupportCatLists(): Promise<ResponseBase> {
    return this._ApiService.postRequest<ResponseBase>(
      `/api/v1/common/fetchSupportCatList`,
      { apiRoot: this.adminRoot }
    );
  }
  editSupportCategory(body: any): Promise<ResponseBase> {
    return this._ApiService.postRequest<ResponseBase>(
      `/api/v1/admin/editSupportCategory`,
      body,
      { apiRoot: this.adminRoot }
    );
  }
  getCategoryDetailById(body: any): Promise<ResponseBase> {
    return this._ApiService.postRequest<ResponseBase>(
      `/api/v1/admin/getCategoryDetailById`,
      body,
      { apiRoot: this.adminRoot }
    );
  }
  getSupportSubcategory(): Promise<ResponseBase> {
    return this._ApiService.postRequest<ResponseBase>(
      `/api/v1/common/getSupportSubcategory`,
      { apiRoot: this.adminRoot }
    );
  }
  getSupportSubcategoryById(body: any): Promise<ResponseBase> {
    return this._ApiService.postRequest<ResponseBase>(
      `/api/v1/common/getSupportSubcategoryById`,
      body,
      { apiRoot: this.adminRoot }
    );
  }
  editSupportSubCatById(body: any): Promise<ResponseBase> {
    return this._ApiService.postRequest<ResponseBase>(
      `/api/v1/admin/editSupportSubCatById`,
      body,
      { apiRoot: this.adminRoot }
    );
  }
  updateAstroReplyStatus(body: any): Promise<ResponseBase> {
    return this._ApiService.postRequest<ResponseBase>(
      `/api/v1/admin/updateAstroReplyStatus`,
      body,
      { apiRoot: this.adminRoot }
    );
  }
  fetchAstroreport(body: any = null): Promise<ResponseBase> {
    return this._ApiService.postRequest<ResponseBase>(
      `/api/v1/admin/fetchAstroreport`,
      body,
      { apiRoot: this.adminRoot }
    );
  }
  alterastroReport(body: any = null): Promise<ResponseBase> {
    return this._ApiService.postRequest<ResponseBase>(
      `/api/v1/admin/alterastroReport`,
      body,
      { apiRoot: this.adminRoot }
    );
  }
  fetchAstrolist(body: any = null): Promise<ResponseBase> {
    return this._ApiService.postRequest<ResponseBase>(
      `/api/v1/admin/getastroList`,
      body,
      { apiRoot: this.adminRoot }
    );
  }
  getAstroRankByRating(body: any = null): Promise<ResponseBase> {
    return this._ApiService.postRequest<ResponseBase>(
      `/api/v1/admin/getAstroRankByRating`,
      body,
      { apiRoot: this.adminRoot }
    );
  }
  getAstrodetail(body: any = null): Promise<ResponseBase> {
    return this._ApiService.postRequest<ResponseBase>(
      `/api/v1/admin/fetchAstroDetail`,
      body,
      { apiRoot: this.adminRoot }
    );
  }
  setAstrodetail(body: any = null): Promise<ResponseBase> {
    return this._ApiService.postRequest<ResponseBase>(
      `/api/v1/admin/updateAstrodetails`,
      body,
      { apiRoot: this.adminRoot }
    );
  }
  getAstroRankByNewCustomer(body: any = null): Promise<ResponseBase> {
    return this._ApiService.postRequest<ResponseBase>(
      `/api/v1/admin/getAstroRankByNewCustomer`,
      body,
      { apiRoot: this.adminRoot }
    );
  }
  getAstroRankByBusyTime(body: any = null): Promise<ResponseBase> {
    return this._ApiService.postRequest<ResponseBase>(
      `/api/v1/admin/getAstroRankByBusyTime`,
      body,
      { apiRoot: this.adminRoot }
    );
  }
  getAstroRankByOnlineTime(body: any = null): Promise<ResponseBase> {
    return this._ApiService.postRequest<ResponseBase>(
      `/api/v1/admin/getAstroRankByOnlineTime`,
      body,
      { apiRoot: this.adminRoot }
    );
  }
  deleteSupportCategory(body: any = null): Promise<ResponseBase> {
    return this._ApiService.postRequest<ResponseBase>(
      `/api/v1/admin/deleteSupportCategory`,
      body,
      { apiRoot: this.adminRoot }
    );
  }
  deleteSupportSubCategory(body: any = null): Promise<ResponseBase> {
    return this._ApiService.postRequest<ResponseBase>(
      `/api/v1/admin/deleteSupportSubCategory`,
      body,
      { apiRoot: this.adminRoot }
    );
  }
  getMasterData(body: any = null): Promise<ResponseBase> {
    return this._ApiService.postRequest<ResponseBase>(
      `/api/v1/admin/getMasterData`,
      body,
      { apiRoot: this.adminRoot }
    );
  }
  getAllBanner(body: any = null): Promise<ResponseBase> {
    return this._ApiService.postRequest<ResponseBase>(
      `/api/v1/admin/getAllBanner`,
      body,
      { apiRoot: this.adminRoot }
    );
  }
  getAstroListForDropDown(body: any = null): Promise<ResponseBase> {
    return this._ApiService.postRequest<ResponseBase>(
      `/api/v1/admin/getAstroListForDropDown`,
      body,
      { apiRoot: this.adminRoot }
    );
  }
  uploadBanner(body: any = null): Promise<ResponseBase> {
    return this._ApiService.postRequest<ResponseBase>(
      `/api/v1/admin/uploadBanner`,
      body,
      { apiRoot: this.adminRoot }
    );
  }
  deleteBanner(body: any = null): Promise<ResponseBase> {
    return this._ApiService.postRequest<ResponseBase>(
      `/api/v1/admin/deleteBanner`,
      body,
      { apiRoot: this.adminRoot }
    );
  }
  updateMasterData(body: any = null): Promise<ResponseBase> {
    return this._ApiService.postRequest<ResponseBase>(
      `/api/v1/admin/setMasterData`,
      body,
      { apiRoot: this.adminRoot }
    );
  }
  getMasterDetailData(body: any = null): Promise<ResponseBase> {
    return this._ApiService.postRequest<ResponseBase>(
      `/api/v1/admin/getMasterDetailData`,
      body,
      { apiRoot: this.adminRoot }
    );
  }
  updateDetailData(body: any = null): Promise<ResponseBase> {
    return this._ApiService.postRequest<ResponseBase>(
      `/api/v1/admin/setMasterDetailData`,
      body,
      { apiRoot: this.adminRoot }
    );
  }
  fetchAdminusers(body: any = null): Promise<ResponseBase> {
    return this._ApiService.postRequest<ResponseBase>(
      `/api/v1/admin/fetchAdminusers`,
      body,
      { apiRoot: this.adminRoot }
    );
  }
  deleteAdminusers(body: any = null): Promise<ResponseBase> {
    return this._ApiService.postRequest<ResponseBase>(
      `/api/v1/admin/deleteAdminusers`,
      body,
      { apiRoot: this.adminRoot }
    );
  }
  updateAdminusers(body: any = null): Promise<ResponseBase> {
    return this._ApiService.postRequest<ResponseBase>(
      `/api/v1/admin/updateAdminusers`,
      body,
      { apiRoot: this.adminRoot }
    );
  }
  uploadSupportChatImage(body: any = null): Promise<ResponseBase> {
    return this._ApiService.postRequest<ResponseBase>(
      `/api/v1/admin/uploadSupportChatImage`,
      body,
      { apiRoot: this.adminRoot }
    );
  }
  adminUserlogin(body: any = null): Promise<ResponseBase> {
    return this._ApiService.postRequest<ResponseBase>(
      `/api/v1/auth/saAdminUserauth`,
      body,
      { apiRoot: this.adminRoot }
    );
  }
  getAstrosettings(body: any = null): Promise<ResponseBase> {
    return this._ApiService.postRequest<ResponseBase>(
      `/api/v1/admin/getAstrosetting`,
      body,
      { apiRoot: this.adminRoot }
    );
  }
  updateAstrosettings(body: any = null): Promise<ResponseBase> {
    return this._ApiService.postRequest<ResponseBase>(
      `/api/v1/admin/updateAstrosetting`,
      body,
      { apiRoot: this.adminRoot }
    );
  }
  changeStatus(body: any = null): Promise<ResponseBase> {
    return this._ApiService.postRequest<ResponseBase>(
      `/api/v1/admin/changeStatus`,
      body,
      { apiRoot: this.adminRoot }
    );
  }
  getAstrorecord(body: any = null): Promise<ResponseBase> {
    return this._ApiService.postRequest<ResponseBase>(
      `/api/v1/admin/fetchAstrorecord`,
      body,
      { apiRoot: this.adminRoot }
    );
  }
  getAstroPromoVideos(body: any = null): Promise<ResponseBase> {
    return this._ApiService.postRequest<ResponseBase>(
      `/api/v1/admin/getAstroPromoVideos`,
      body,
      { apiRoot: this.adminRoot }
    );
  }
  addUpdatepromovideo(body: any = null): Promise<ResponseBase> {
    return this._ApiService.postRequest<ResponseBase>(
      `/api/v1/admin/addUpdatepromovideo`,
      body,
      { apiRoot: this.adminRoot }
    );
  }
  getAllProductList(body: any = null): Promise<ResponseBase> {
    return this._ApiService.postRequest<ResponseBase>(
      `/api/v1/admin/getAllProductList`,
      body,
      { apiRoot: this.adminRoot }
    );
  }
  getAllProductCategoryList(body: any = null): Promise<ResponseBase> {
    return this._ApiService.postRequest<ResponseBase>(
      `/api/v1/admin/getAllProductCategoryList`,
      body,
      { apiRoot: this.adminRoot }
    );
  }
  deleteService(body: any = null): Promise<ResponseBase> {
    return this._ApiService.postRequest<ResponseBase>(
      `/api/v1/admin/deleteService`,
      body,
      { apiRoot: this.adminRoot }
    );
  }
  uploadShopProduct(body: any = null): Promise<ResponseBase> {
    return this._ApiService.postRequest<ResponseBase>(
      `/api/v1/admin/uploadShopProduct`,
      body,
      { apiRoot: this.adminRoot }
    );
  }
  getProductDetailById(body: any = null): Promise<ResponseBase> {
    return this._ApiService.postRequest<ResponseBase>(
      `/api/v1/admin/getProductDetailById`,
      body,
      { apiRoot: this.adminRoot }
    );
  }
  updateProduct(body: any = null): Promise<ResponseBase> {
    return this._ApiService.postRequest<ResponseBase>(
      `/api/v1/admin/updateProduct`,
      body,
      { apiRoot: this.adminRoot }
    );
  }
  uploadShopCategory(body: any = null): Promise<ResponseBase> {
    return this._ApiService.postRequest<ResponseBase>(
      `/api/v1/admin/uploadShopCategory`,
      body,
      { apiRoot: this.adminRoot }
    );
  }
  getSharedProductList(body: any = null): Promise<ResponseBase> {
    return this._ApiService.postRequest<ResponseBase>(
      `/api/v1/admin/getSharedProductList`,
      body,
      { apiRoot: this.adminRoot }
    );
  }
  getShopOrderHistory(body: any = null): Promise<ResponseBase> {
    return this._ApiService.postRequest<ResponseBase>(
      `/api/v1/admin/getShopOrderHistory`,
      body,
      { apiRoot: this.adminRoot }
    );
  }
  updateOrderStatus(body: any = null): Promise<ResponseBase> {
    return this._ApiService.postRequest<ResponseBase>(
      `/api/v1/admin/updateOrderStatus`,
      body,
      { apiRoot: this.adminRoot }
    );
  }
  updateOrderDeliveryStatus(body: any = null): Promise<ResponseBase> {
    return this._ApiService.postRequest<ResponseBase>(
      `/api/v1/admin/updateOrderDeliveryStatus`,
      body,
      { apiRoot: this.adminRoot }
    );
  }
  getOrderDetails(body: any = null): Promise<ResponseBase> {
    return this._ApiService.postRequest<ResponseBase>(
      `/api/v1/admin/getOrderDetails`,
      body,
      { apiRoot: this.adminRoot }
    );
  }
  getInvoiceOrShippingAddress(body: any = null): Promise<ResponseBase> {
    return this._ApiService.postRequest<ResponseBase>(
      `/api/v1/admin/getInvoiceOrShippingAddress`,
      body,
      { apiRoot: this.adminRoot }
    );
  }
  getProductReturnDetail(body: any = null): Promise<ResponseBase> {
    return this._ApiService.postRequest<ResponseBase>(
      `/api/v1/admin/getProductReturnDetail`,
      body,
      { apiRoot: this.adminRoot }
    );
  }
  deleteShopCategory(body: any = null): Promise<ResponseBase> {
    return this._ApiService.postRequest<ResponseBase>(
      `/api/v1/admin/deleteShopCategory`,
      body,
      { apiRoot: this.adminRoot }
    );
  }
  uploadService(body: any = null): Promise<ResponseBase> {
    return this._ApiService.postRequest<ResponseBase>(
      `/api/v1/admin/uploadService`,
      body,
      { apiRoot: this.adminRoot }
    );
  }
  getAllServiceList(body: any = null): Promise<ResponseBase> {
    return this._ApiService.postRequest<ResponseBase>(
      `/api/v1/admin/getAllServiceList`,
      body,
      { apiRoot: this.adminRoot }
    );
  }
  updateService(body: any = null): Promise<ResponseBase> {
    return this._ApiService.postRequest<ResponseBase>(
      `/api/v1/admin/updateService`,
      body,
      { apiRoot: this.adminRoot }
    );
  }
  addAstrologerToService(body: any = null): Promise<ResponseBase> {
    return this._ApiService.postRequest<ResponseBase>(
      `/api/v1/admin/addAstrologerToService`,
      body,
      { apiRoot: this.adminRoot }
    );
  }
  getServiceAstroList(body: any = null): Promise<ResponseBase> {
    return this._ApiService.postRequest<ResponseBase>(
      `/api/v1/admin/getServiceAstroList`,
      body,
      { apiRoot: this.adminRoot }
    );
  }
  updateAstrologerService(body: any = null): Promise<ResponseBase> {
    return this._ApiService.postRequest<ResponseBase>(`/api/v1/admin/updateAstrologerService`, body, { apiRoot: this.adminRoot });
  }
  getServiceOrderHistory(body: any = null): Promise<ResponseBase> {
    return this._ApiService.postRequest<ResponseBase>(`/api/v1/admin/getServiceOrderHistory`, body, { apiRoot: this.adminRoot });
  }
  getAstropromocomment(body: any = null): Promise<ResponseBase> {
    return this._ApiService.postRequest<ResponseBase>(
      `/api/v1/admin/getAstropromocomment`,
      body,
      { apiRoot: this.adminRoot }
    );
  }
  updateAstroreview(body: any = null): Promise<ResponseBase> {
    return this._ApiService.postRequest<ResponseBase>(
      `/api/v1/admin/updateAstroreview`,
      body,
      { apiRoot: this.adminRoot }
    );
  }
  getRepeatedcust(body: any = null): Promise<ResponseBase> {
    return this._ApiService.postRequest<ResponseBase>(
      `/api/v1/admin/getRepeatedcust`,
      body,
      { apiRoot: this.adminRoot }
    );
  }
  getHorocontent(body: any = null): Promise<ResponseBase> {
    return this._ApiService.postRequest<ResponseBase>(
      `/api/v1/admin/getHorocontent`,
      body,
      { apiRoot: this.adminRoot }
    );
  }
  updateHorocontent(body: any = null): Promise<ResponseBase> {
    return this._ApiService.postRequest<ResponseBase>(
      `/api/v1/admin/updateHorocontent`,
      body,
      { apiRoot: this.adminRoot }
    );
  }
  getHoroscope(body: any = null): Promise<ResponseBase> {
    return this._ApiService.postRequest<ResponseBase>(
      `/api/v1/admin/getHoroscope`,
      body,
      { apiRoot: this.adminRoot }
    );
  }
  updateHoroscope(body: any = null): Promise<ResponseBase> {
    return this._ApiService.postRequest<ResponseBase>(
      `/api/v1/admin/updateHoroscope`,
      body,
      { apiRoot: this.adminRoot }
    );
  }
  addHoroscope(body: any = null): Promise<ResponseBase> {
    return this._ApiService.postRequest<ResponseBase>(
      `/api/v1/admin/addHoroscope`,
      body,
      { apiRoot: this.adminRoot }
    );
  }
  getMngCustomersData(body: any = null): Promise<ResponseBase> {
    return this._ApiService.postRequest<ResponseBase>(
      `/api/v1/admin/getMngCustomersData`,
      body,
      { apiRoot: this.adminRoot }
    );
  }
  getCustomerDetailById(body: any = null): Promise<ResponseBase> {
    return this._ApiService.postRequest<ResponseBase>(
      `/api/v1/admin/getCustomerDetailById`,
      body,
      { apiRoot: this.adminRoot }
    );
  }
  getCustomerCallLogsById(body: any = null): Promise<ResponseBase> {
    return this._ApiService.postRequest<ResponseBase>(
      `/api/v1/admin/getCustomerCallLogsById`,
      body,
      { apiRoot: this.adminRoot }
    );
  }
  updateCustomerProfile(body: any = null): Promise<ResponseBase> {
    return this._ApiService.postRequest<ResponseBase>(
      `/api/v1/admin/updateCustomerProfile`,
      body,
      { apiRoot: this.adminRoot }
    );
  }
  getTxnReportById(body: any = null): Promise<ResponseBase> {
    return this._ApiService.postRequest<ResponseBase>(
      `/api/v1/admin/getTxnReportById`,
      body,
      { apiRoot: this.adminRoot }
    );
  }
  getCutomerFeedbacksById(body: any = null): Promise<ResponseBase> {
    return this._ApiService.postRequest<ResponseBase>(
      `/api/v1/admin/getCutomerFeedbacksById`,
      body,
      { apiRoot: this.adminRoot }
    );
  }
  getFeedbackById(body: any = null): Promise<ResponseBase> {
    return this._ApiService.postRequest<ResponseBase>(
      `/api/v1/admin/getFeedbackById`,
      body,
      { apiRoot: this.adminRoot }
    );
  }
  updateFeedbackById(body: any = null): Promise<ResponseBase> {
    return this._ApiService.postRequest<ResponseBase>(
      `/api/v1/admin/updateFeedbackById`,
      body,
      { apiRoot: this.adminRoot }
    );
  }
  getCustomerScratchCardById(body: any = null): Promise<ResponseBase> {
    return this._ApiService.postRequest<ResponseBase>(
      `/api/v1/admin/getCustomerScratchCardById`,
      body,
      { apiRoot: this.adminRoot }
    );
  }


  getCustomerList(body: any = null): Promise<ResponseBase> {
    return this._ApiService.postRequest<ResponseBase>(`/api/v1/admin/getCustomerList`, body, { apiRoot: this.adminRoot });
  }
  getAstrologerList(body: any = null): Promise<ResponseBase> {
    return this._ApiService.postRequest<ResponseBase>(`/api/v1/admin/getAstrologerList`, body, { apiRoot: this.adminRoot });
  }
  createScratchCard(body: any = null): Promise<ResponseBase> {
    return this._ApiService.postRequest<ResponseBase>(`/api/v1/admin/createScratchCard`, body, { apiRoot: this.adminRoot });
  }
  fetchScratchCards(body: any = null): Promise<ResponseBase> {
    return this._ApiService.postRequest<ResponseBase>(`/api/v1/admin/fetchScratchCards`, body, { apiRoot: this.adminRoot });
  }
  checkSelectedCust(body: any = null): Promise<ResponseBase> {
    return this._ApiService.postRequest<ResponseBase>(`/api/v1/admin/checkSelectedCust`, body, { apiRoot: this.adminRoot });
  }
  getSelectedCustomerForOffer(body: any = null): Promise<ResponseBase> {
    return this._ApiService.postRequest<ResponseBase>(`/api/v1/admin/getSelectedCustomerForOffer`, body, { apiRoot: this.adminRoot });
  }
  getSelectedAstrologerForOffer(body: any = null): Promise<ResponseBase> {
    return this._ApiService.postRequest<ResponseBase>(`/api/v1/admin/getSelectedAstrologerForOffer`, body, { apiRoot: this.adminRoot });
  }
  getOfferAstroDetail(body: any = null): Promise<ResponseBase> {
    return this._ApiService.postRequest<ResponseBase>(`/api/v1/admin/getOfferAstroDetail`, body, { apiRoot: this.adminRoot });
  }
  deleteScratchCard(body: any = null): Promise<ResponseBase> {
    return this._ApiService.postRequest<ResponseBase>(`/api/v1/admin/deleteScratchCard`, body, { apiRoot: this.adminRoot });
  }
  getScratchCardById(body: any = null): Promise<ResponseBase> {
    return this._ApiService.postRequest<ResponseBase>(`/api/v1/admin/getScratchCardById`, body, { apiRoot: this.adminRoot });
  }
  updateScratchCardById(body: any = null): Promise<ResponseBase> {
    return this._ApiService.postRequest<ResponseBase>(`/api/v1/admin/updateScratchCardById`, body, { apiRoot: this.adminRoot });
  }
  getDiscountData(body: any = null): Promise<ResponseBase> {
    return this._ApiService.postRequest<ResponseBase>(`/api/v1/admin/getDiscountData`, body, { apiRoot: this.adminRoot });
  }
  deleteHoroscope(body: any = null): Promise<ResponseBase> {
    return this._ApiService.postRequest<ResponseBase>(`/api/v1/admin/deleteHoroscope`, body, { apiRoot: this.adminRoot });
  }
  fetchPopups(body: any = null): Promise<ResponseBase> {
    return this._ApiService.postRequest<ResponseBase>(`/api/v1/admin/fetchOfferpopup`, body, { apiRoot: this.adminRoot });
  }
  addUpdatePopup(body: any = null): Promise<ResponseBase> {
    return this._ApiService.postRequest<ResponseBase>(`/api/v1/admin/addUpdatePopup`, body, { apiRoot: this.adminRoot });
  }
  deletePopup(body: any = null): Promise<ResponseBase> {
    return this._ApiService.postRequest<ResponseBase>(`/api/v1/admin/deletePopup`, body, { apiRoot: this.adminRoot });
  }
  serviceReminderManual(body: any = null): Promise<ResponseBase> {
    return this._ApiService.postRequest<ResponseBase>(
      `/api/v1/admin/serviceReminderManual`,
      body,
      { apiRoot: this.adminRoot }
    );
  }
  deleteAstroService(body: any = null): Promise<ResponseBase> {
    return this._ApiService.postRequest<ResponseBase>(
      `/api/v1/admin/deleteAstroService`,
      body,
      { apiRoot: this.adminRoot }
    );
  }
  blockUserByAdmin(body: any = null): Promise<ResponseBase> {
    return this._ApiService.postRequest<ResponseBase>(
      `/api/v1/admin/blockUserByAdmin`,
      body,
      { apiRoot: this.adminRoot }
    );
  }
  getAstrologerOnlineDetail(body: any = null): Promise<ResponseBase> {
    return this._ApiService.postRequest<ResponseBase>(
      `/api/v1/admin/getAstrologerOnlineDetail`,
      body,
      { apiRoot: this.adminRoot }
    );
  }
  sendAdminOTP(body: any = null): Promise<ResponseBase> {
    return this._ApiService.postRequest<ResponseBase>(
      `/api/v1/admin/sendAdminOTP`,
      body,
      { apiRoot: this.adminRoot }
    );
  }

  initiateOrderRefund(body: any = null): Promise<ResponseBase> {
    return this._ApiService.postRequest<ResponseBase>(
      `/api/v1/admin/initiateOrderRefund`,
      body,
      { apiRoot: this.adminRoot }
    );
  }
  updateAstroImageStatus(body: any = null): Promise<ResponseBase> {
    return this._ApiService.postRequest<ResponseBase>(
      `/api/v1/admin/updateAstroImageStatus`,
      body,
      { apiRoot: this.adminRoot }
    );
  }
  getRecharges(body: any = null): Promise<ResponseBase> {
    return this._ApiService.postRequest<ResponseBase>(`/api/v1/admin/getRecharges`, body, { apiRoot: this.adminRoot });
  }
  updateRecharges(body: any = null): Promise<ResponseBase> {
    return this._ApiService.postRequest<ResponseBase>(`/api/v1/admin/updateRecharges`, body, { apiRoot: this.adminRoot });
  }
  deleteRecharges(body: any = null): Promise<ResponseBase> {
    return this._ApiService.postRequest<ResponseBase>(`/api/v1/admin/deleteRecharge`, body, { apiRoot: this.adminRoot });
  }
  showContent(body: any = null): Promise<ResponseBase> {
    return this._ApiService.postRequest<ResponseBase>(`/api/v1/admin/showContent`, body, { apiRoot: this.adminRoot });
  }
  showGifts(body: any = null): Promise<ResponseBase> {
    return this._ApiService.postRequest<ResponseBase>(`/api/v1/admin/showGifts`, body, { apiRoot: this.adminRoot });
  }
  addUpdategifts(body: any = null): Promise<ResponseBase> {
    return this._ApiService.postRequest<ResponseBase>(`/api/v1/admin/addUpdategifts`, body, { apiRoot: this.adminRoot });
  }
  deletePrize(body: any = null): Promise<ResponseBase> {
    return this._ApiService.postRequest<ResponseBase>(`/api/v1/admin/deletePrize`, body, { apiRoot: this.adminRoot });
  }
  updateContent(body: any = null): Promise<ResponseBase> {
    return this._ApiService.postRequest<ResponseBase>(`/api/v1/admin/updateContent`, body, { apiRoot: this.adminRoot });
  }
  astromallEarning(body: any = null): Promise<ResponseBase> {
    return this._ApiService.postRequest<ResponseBase>(`/api/v1/admin/astromallEarning`, body, { apiRoot: this.adminRoot });
  }
  fetchDashboard(body: any = null): Promise<ResponseBase> {
    return this._ApiService.postRequest<ResponseBase>(`/api/v1/admin/fetchDashboard`, body, { apiRoot: this.adminRoot });
  }
  customRecharge(body: any = null): Promise<ResponseBase> {
    return this._ApiService.postRequest<ResponseBase>(`/api/v1/admin/customRecharge`, body, { apiRoot: this.adminRoot });
  }
  getTechsupport(body: any = null): Promise<ResponseBase> {
    return this._ApiService.postRequest<ResponseBase>(`/api/v1/admin/fetchTechsupport`, body, { apiRoot: this.adminRoot });
  }
  uploadAddtechsupport(body: any = null): Promise<ResponseBase> {
    return this._ApiService.postRequest<ResponseBase>(`/api/v1/admin/uploadAddtechsupport`, body, { apiRoot: this.adminRoot });
  }
  fetchTechcomments(body: any = null): Promise<ResponseBase> {
    return this._ApiService.postRequest<ResponseBase>(`/api/v1/admin/fetchTechcomments`, body, { apiRoot: this.adminRoot });
  }
  updateTechcomments(body: any = null): Promise<ResponseBase> {
    return this._ApiService.postRequest<ResponseBase>(`/api/v1/admin/updateTechcomments`, body, { apiRoot: this.adminRoot });
  }
  deleteTechsupport(body: any = null): Promise<ResponseBase> {
    return this._ApiService.postRequest<ResponseBase>(`/api/v1/admin/deleteTechsupport`, body, { apiRoot: this.adminRoot });
  }
  fetchNotice(body: any = null): Promise<ResponseBase> {
    return this._ApiService.postRequest<ResponseBase>(`/api/v1/admin/fetchNotice`, body, { apiRoot: this.adminRoot });
  }
  editaddNotice(body: any = null): Promise<ResponseBase> {
    return this._ApiService.postRequest<ResponseBase>(`/api/v1/admin/editaddNotice`, body, { apiRoot: this.adminRoot });
  }
  deleteNotice(body: any = null): Promise<ResponseBase> {
    return this._ApiService.postRequest<ResponseBase>(`/api/v1/admin/deleteNotice`, body, { apiRoot: this.adminRoot });
  }
  getCallinfoByid(body: any = null): Promise<ResponseBase> {
    return this._ApiService.postRequest<ResponseBase>(`/api/v1/admin/getCallinfoByid`, body, { apiRoot: this.adminRoot });
  }
  submitCallfeed(body: any = null): Promise<ResponseBase> {
    return this._ApiService.postRequest<ResponseBase>(`/api/v1/admin/submitCallfeed`, body, { apiRoot: this.adminRoot });
  }
  initiateTeleCall(body: any = null): Promise<ResponseBase> {
    return this._ApiService.postRequest<ResponseBase>(`/api/v1/admin/initiateTeleCall`, body, { apiRoot: this.adminRoot });
  }
  fetchTeleData(body: any = null): Promise<ResponseBase> {
    return this._ApiService.postRequest<ResponseBase>(`/api/v1/admin/fetchTeleData`, body, { apiRoot: this.adminRoot });
  }
  fetchNewastro(body: any = null): Promise<ResponseBase> {
    return this._ApiService.postRequest<ResponseBase>(`/api/v1/admin/fetchNewastro`, body, { apiRoot: this.adminRoot });
  }
  updateAstrostatus(body: any = null): Promise<ResponseBase> {
    return this._ApiService.postRequest<ResponseBase>(`/api/v1/admin/updateAstrostatus`, body, { apiRoot: this.adminRoot });
  }
  deleteNewastro(body: any = null): Promise<ResponseBase> {
    return this._ApiService.postRequest<ResponseBase>(`/api/v1/admin/deleteNewastro`, body, { apiRoot: this.adminRoot });
  }
  datewiseCallChatVcallCount(body: any = null): Promise<ResponseBase> {
    return this._ApiService.postRequest<ResponseBase>(`/api/v1/admin/datewiseCallChatVcallCount`, body, { apiRoot: this.adminRoot });
  }
  getScratchCardAcCustomers(body: any = null): Promise<ResponseBase> {
    return this._ApiService.postRequest<ResponseBase>(`/api/v1/admin/getScratchCardAcCustomers`, body, { apiRoot: this.adminRoot });
  }
  getCommonServiceOrderHistory(body: any = null): Promise<ResponseBase> {
    return this._ApiService.postRequest<ResponseBase>(`/api/v1/admin/getCommonServiceOrderHistory`, body, { apiRoot: this.adminRoot });
  }
  getCommonServiceUserOrder(body: any = null): Promise<ResponseBase> {
    return this._ApiService.postRequest<ResponseBase>(`/api/v1/admin/getCommonServiceUserOrder`, body, { apiRoot: this.adminRoot });
  }
  getActiveServiceAstroList(body: any = null): Promise<ResponseBase> {
    return this._ApiService.postRequest<ResponseBase>(`/api/v1/admin/getActiveServiceAstroList`, body, { apiRoot: this.adminRoot });
  }
  updateAstroServicePackage(body: any = null): Promise<ResponseBase> {
    return this._ApiService.postRequest<ResponseBase>(`/api/v1/admin/updateAstroServicePackage`, body, { apiRoot: this.adminRoot });
  }
  getAstroServicePackage(body: any = null): Promise<ResponseBase> {
    return this._ApiService.postRequest<ResponseBase>(`/api/v1/admin/getAstroServicePackage`, body, { apiRoot: this.adminRoot });
  }
  updateServiceLandingPage(body: any = null): Promise<ResponseBase> {
    return this._ApiService.postRequest<ResponseBase>(`/api/v1/admin/updateServiceLandingPage`, body, { apiRoot: this.adminRoot });
  }
  getServiceLandingPage(body: any = null): Promise<ResponseBase> {
    return this._ApiService.postRequest<ResponseBase>(`/api/v1/admin/getServiceLandingPage`, body, { apiRoot: this.adminRoot });
  }
  astroRegistration(body: any = null): Promise<ResponseBase> {
    return this._ApiService.postRequest<ResponseBase>(`/api/v1/admin/astroRegistration`, body, { apiRoot: this.adminRoot });
  }
  getPromotionalSlots(body: any = null): Promise<ResponseBase> {
    return this._ApiService.postRequest<ResponseBase>(`/api/v1/admin/getPromotionalSlots`, body, { apiRoot: this.adminRoot });
  }
  updatePromotionalSlots(body: any = null): Promise<ResponseBase> {
    return this._ApiService.postRequest<ResponseBase>(`/api/v1/admin/updatePromotionalSlots`, body, { apiRoot: this.adminRoot });
  }
  
  
  
  updateSupportChat(body: any = null): Promise<ResponseBase> {
    return this._ApiService.postRequest<ResponseBase>(`/api/v1/admin/updateSupportChat`, body, { apiRoot: this.adminRoot });
  }
  addRemoveuserwall(body: any = null): Promise<ResponseBase> {
    return this._ApiService.postRequest<ResponseBase>(`/api/v1/admin/addRemoveuserwall`, body, { apiRoot: this.adminRoot });
  }
  changevidOrder(body: any = null): Promise<ResponseBase> {
    return this._ApiService.postRequest<ResponseBase>(`/api/v1/admin/changevidOrder`, body, { apiRoot: this.adminRoot });
  }
  telemarkAsread(body: any = null): Promise<ResponseBase> {
    return this._ApiService.postRequest<ResponseBase>(`/api/v1/admin/telemarkAsread`, body, { apiRoot: this.adminRoot });
  }
  userAnalytics(body: any = null): Promise<ResponseBase> {
    return this._ApiService.postRequest<ResponseBase>(`/api/v1/admin/userAnalytics`, body, { apiRoot: this.adminRoot });
  }
  astrologerSalesReport(body: any = null): Promise<ResponseBase> {
    return this._ApiService.postRequest<ResponseBase>(`/api/v1/admin/astrologerSalesReport`, body, { apiRoot: this.adminRoot });
  }
  updateXpPointValue(body: any = null): Promise<ResponseBase> {
    return this._ApiService.postRequest<ResponseBase>(`/api/v1/admin/updateXpPointValue`, body, { apiRoot: this.adminRoot });
  }
  fetchXpPointValues(body: any = null): Promise<ResponseBase> {
    return this._ApiService.postRequest<ResponseBase>(`/api/v1/admin/fetchXpPointValues`, body, { apiRoot: this.adminRoot });
  }
  rankAstrologerByXp(body: any = null): Promise<ResponseBase> {
    return this._ApiService.postRequest<ResponseBase>(`/api/v1/admin/rankAstrologerByXp`, body, { apiRoot: this.adminRoot });
  }
  getAstrologerXp(body: any = null): Promise<ResponseBase> {
    return this._ApiService.postRequest<ResponseBase>(`/api/v1/admin/getAstrologerXp`, body, { apiRoot: this.adminRoot });
  }
  adminXpEdit(body: any = null): Promise<ResponseBase> {
    return this._ApiService.postRequest<ResponseBase>(`/api/v1/admin/adminXpEdit`, body, { apiRoot: this.adminRoot });
  }
}
