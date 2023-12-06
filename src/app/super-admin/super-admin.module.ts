import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SuperAdminRoutingModule } from './super-admin-routing.module';
import { SuperAdminComponent } from './super-admin.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CdkAccordionModule } from '@angular/cdk/accordion';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CallHistoryComponent } from './components/call-history/call-history.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';
import { NgSelectModule } from '@ng-select/ng-select';
import { ChatHistoryComponent } from './components/chat-history/chat-history.component';
import { ChatsComponent } from './components/chat-history/components/chats/chats.component';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { NotificationComponent } from './components/notification/notification.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatBadgeModule } from '@angular/material/badge';
import { ModalModule } from 'ngx-bootstrap/modal';
import { FeedbackComponent } from './components/feedback/feedback.component';
import { BlogComponent } from './components/blog/blog.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { TransactionReportComponent } from './components/transaction-report/transaction-report.component';
import { AddSupportCategoryComponent } from './components/add-support-category/add-support-category.component';
import { SupportTicketsComponent } from './components/support-tickets/support-tickets.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { AstrologerReportComponent } from './components/astrologer-report/astrologer-report.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { AstrologerRankingComponent } from './components/astrologer-ranking/astrologer-ranking.component';
import { MasterComponent } from './components/master/master.component';
import { VideoCallHistoryComponent } from './components/video-call-history/video-call-history.component';
import { BannersComponent } from './components/banners/banners.component';
import { MasterDetailComponent } from './components/master/master-detail/master-detail.component';
import { AdminusersComponent } from './components/adminusers/adminusers.component';
import { AdminUserpermissionComponent } from './components/adminusers/admin-userpermission/admin-userpermission.component';
import { OnBoardAstrologerComponent } from './components/on-board-astrologer/on-board-astrologer.component';
import { AstroResgistrationComponent } from './components/on-board-astrologer/astro-resgistration/astro-resgistration.component';
import { AstroProfileComponent } from './components/on-board-astrologer/astro-profile/astro-profile.component';
import { AstrosettingComponent } from './components/on-board-astrologer/astrosetting/astrosetting.component';
import { AstroViewComponent } from './components/on-board-astrologer/astro-view/astro-view.component';
import { CallChatHistoryComponent } from './components/on-board-astrologer/call-chat-history/call-chat-history.component';
import { AstroRecordComponent } from './components/on-board-astrologer/astro-record/astro-record.component';
import { AstroPromoVideosComponent } from './components/astro-promo-videos/astro-promo-videos.component';
import { ManageAstroshopComponent } from './components/manage-astroshop/manage-astroshop.component';
import { ShopCategoryComponent } from './components/manage-astroshop/shop-category/shop-category.component';
import { SharedProductComponent } from './components/manage-astroshop/shared-product/shared-product.component';
import { AstroshopOrderHistoryComponent } from './components/manage-astroshop/astroshop-order-history/astroshop-order-history.component';
import { ManageShopServiceComponent } from './components/manage-astroshop/manage-shop-service/manage-shop-service.component';
import { ManageServiceAstroRelationComponent } from './components/manage-astroshop/manage-service-astro-relation/manage-service-astro-relation.component';
import { AstroPvCommentsComponent } from './components/astro-pv-comments/astro-pv-comments.component';
import { RepeatedUserComponent } from './components/on-board-astrologer/repeated-user/repeated-user.component';
import { HoroContentComponent } from './components/horo-content/horo-content.component';
import { HoroSignpredictionComponent } from './components/horo-signprediction/horo-signprediction.component';
import { ScratchCardsComponent } from './components/scratch-cards/scratch-cards.component';
import { AddNewScratchCardComponent } from './components/scratch-cards/add-new-scratch-card/add-new-scratch-card.component';
import { ScratchCardListComponent } from './components/scratch-cards/scratch-card-list/scratch-card-list.component';
import { MngCustomersComponent } from './components/mng-customers/mng-customers.component';
import { CustomerProfileComponent } from './components/mng-customers/customer-profile/customer-profile.component';
import { CustomersListComponent } from './components/mng-customers/customers-list/customers-list.component';
import { CustomerViewComponent } from './components/mng-customers/customer-view/customer-view.component';
import { CallLogsComponent } from './components/mng-customers/call-logs/call-logs.component';
import { CustomerTransactionsComponent } from './components/mng-customers/customer-transactions/customer-transactions.component';
import { CustomerOffersComponent } from './components/mng-customers/customer-offers/customer-offers.component';
import { CustomerFeedbacksComponent } from './components/mng-customers/customer-feedbacks/customer-feedbacks.component';
import { OfferPopupComponent } from './components/offer-popup/offer-popup.component';
import { ManageServiceComponent } from './components/manage-astroshop/manage-service/manage-service.component';
import { AstroOnlineDetailComponent } from './components/on-board-astrologer/astro-online-detail/astro-online-detail.component';
import { NgOtpInputModule } from 'ng-otp-input';
import { RechargeShortcutComponent } from './components/recharge-shortcut/recharge-shortcut.component';
import { ContentUpdatesComponent } from './components/content-updates/content-updates.component';
import { PolicyComponent } from './components/content-updates/policy/policy.component';
import { KundliComponent } from './components/content-updates/kundli/kundli.component';
import { MatchMakingComponent } from './components/content-updates/match-making/match-making.component';
import { ShubhMuhratComponent } from './components/content-updates/shubh-muhrat/shubh-muhrat.component';
import { EditorModule } from '@tinymce/tinymce-angular';
import { PrizesComponent } from './components/prizes/prizes.component';
import { NgxEchartsModule } from 'ngx-echarts';
import * as echarts from 'echarts';
import { CustomRechargeComponent } from './components/custom-recharge/custom-recharge.component';
import { TechSupportvidComponent } from './components/tech-supportvid/tech-supportvid.component';
import { TechCommentsComponent } from './components/tech-supportvid/tech-comments/tech-comments.component';
import { AstroNoticeComponent } from './components/astro-notice/astro-notice.component';
import { CallHComponent } from './telecallcomponents/call-h/call-h.component';
import { ChatHComponent } from './telecallcomponents/chat-h/chat-h.component';
import { VideoHComponent } from './telecallcomponents/video-h/video-h.component';
import {MatChipsModule} from '@angular/material/chips';
import { TelecallReportComponent } from './components/telecall-report/telecall-report.component';
import { AstroRegistrationComponent } from './components/astro-registration/astro-registration.component';
import { CallChatVcallCountDatewiseComponent } from './components/call-chat-vcall-count-datewise/call-chat-vcall-count-datewise.component';
import { ViewScratchCardsStatusComponent } from './components/scratch-cards/view-scratch-cards-status/view-scratch-cards-status.component';
import { ManageCommonServiceComponent } from './components/manage-astroshop/manage-common-service/manage-common-service.component';
import { LandingPageComponent } from './components/manage-astroshop/landing-page/landing-page.component';
import { PackagePageComponent } from './components/manage-astroshop/package-page/package-page.component';
import { CustomerCustomRechComponent } from './components/mng-customers/customer-custom-rech/customer-custom-rech.component';
import { ModifyUserwalletComponent } from './components/mng-customers/modify-userwallet/modify-userwallet.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { Blog2Component } from './components/blog2/blog2.component';
import { CustomerActivityComponent } from './components/mng-customers/customer-activity/customer-activity.component';
import { AstroSalesReportComponent } from './components/astro-sales-report/astro-sales-report.component';
import { ManageAstroXpPointsComponent } from './components/manage-astro-xp-points/manage-astro-xp-points.component';
import { XpRankingComponent } from './components/xp-ranking/xp-ranking.component';
import { AstroXpsComponent } from './components/on-board-astrologer/astro-xps/astro-xps.component';
@NgModule({
  declarations: [
    SuperAdminComponent,
    DashboardComponent,
    CallHistoryComponent,
    ChatHistoryComponent,
    ChatsComponent,
    NotificationComponent,
    FeedbackComponent,
    BlogComponent,
    TransactionReportComponent,
    AddSupportCategoryComponent,
    SupportTicketsComponent,
    AstrologerReportComponent,
    AstrologerRankingComponent,
    MasterComponent,
    BannersComponent,
    MasterDetailComponent,
    AstroResgistrationComponent,
    AstroProfileComponent,
    AdminusersComponent,
    AdminUserpermissionComponent,
    VideoCallHistoryComponent,
    OnBoardAstrologerComponent,
    AstrosettingComponent,
    AstroViewComponent,
    CallChatHistoryComponent,
    AstroRecordComponent,
    AstroPromoVideosComponent,
    ManageAstroshopComponent,
    ShopCategoryComponent,
    SharedProductComponent,
    AstroshopOrderHistoryComponent,
    ManageShopServiceComponent,
    ManageServiceAstroRelationComponent,
    AstroPvCommentsComponent,
    RepeatedUserComponent,
    HoroContentComponent,
    HoroSignpredictionComponent,
    ScratchCardsComponent,
    AddNewScratchCardComponent,
    ScratchCardListComponent,
    MngCustomersComponent,
    CustomerProfileComponent,
    CustomersListComponent,
    CustomerViewComponent,
    CallLogsComponent,
    CustomerTransactionsComponent,
    CustomerOffersComponent,
    CustomerFeedbacksComponent,
    OfferPopupComponent,
    ManageServiceComponent,
    AstroOnlineDetailComponent,
    RechargeShortcutComponent,
    ContentUpdatesComponent,
    PolicyComponent,
    KundliComponent,
    MatchMakingComponent,
    ShubhMuhratComponent,
    PrizesComponent,
    CustomRechargeComponent,
    TechSupportvidComponent,
    TechCommentsComponent,
    AstroNoticeComponent,
    CallHComponent,
    ChatHComponent,
    VideoHComponent,
    TelecallReportComponent,
    AstroRegistrationComponent,
    CallChatVcallCountDatewiseComponent,
    ViewScratchCardsStatusComponent,
    ManageCommonServiceComponent,
    LandingPageComponent,
    PackagePageComponent,
    CustomerCustomRechComponent,
    ModifyUserwalletComponent,
    Blog2Component,
    CustomerActivityComponent,
    AstroSalesReportComponent,
    ManageAstroXpPointsComponent,
    XpRankingComponent,
    AstroXpsComponent
  ],
  imports: [
    EditorModule,
    CommonModule,
    SuperAdminRoutingModule,
    CdkAccordionModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    NgSelectModule,
    MatNativeDateModule,
    FormsModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatInputModule,
    MatExpansionModule,
    MatSelectModule,
    MatBadgeModule,
    NgOtpInputModule,
    NgxDaterangepickerMd.forRoot(),
    ModalModule.forRoot(),
    BsDatepickerModule.forRoot(),
    MatButtonModule, MatMenuModule, MatIconModule,
    CKEditorModule,
    MatCheckboxModule,
    NgxEchartsModule.forChild(),
    MatChipsModule,
    DragDropModule
  ]
})
export class SuperAdminModule { }
