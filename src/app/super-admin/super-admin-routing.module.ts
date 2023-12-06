import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SuperAdminComponent } from './super-admin.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CallHistoryComponent } from './components/call-history/call-history.component';
import { ChatHistoryComponent } from './components/chat-history/chat-history.component';
import { ChatsComponent } from './components/chat-history/components/chats/chats.component';
import { NotificationComponent } from './components/notification/notification.component';
import { FeedbackComponent } from './components/feedback/feedback.component';
import { BlogComponent } from './components/blog/blog.component';
import { TransactionReportComponent } from './components/transaction-report/transaction-report.component';
import { AddSupportCategoryComponent } from './components/add-support-category/add-support-category.component';
import { SupportTicketsComponent } from './components/support-tickets/support-tickets.component';
import { AstrologerReportComponent } from './components/astrologer-report/astrologer-report.component';
import { AstrologerRankingComponent } from './components/astrologer-ranking/astrologer-ranking.component';
import { AuthGuard } from '../authGuard/auth.guard';
import { MasterComponent } from './components/master/master.component';
import { VideoCallHistoryComponent } from './components/video-call-history/video-call-history.component';
import { BannersComponent } from './components/banners/banners.component';
import { MasterDetailComponent } from './components/master/master-detail/master-detail.component';
import { AdminusersComponent } from './components/adminusers/adminusers.component';
import { AdminUserpermissionComponent } from './components/adminusers/admin-userpermission/admin-userpermission.component';
import { OnBoardAstrologerComponent } from './components/on-board-astrologer/on-board-astrologer.component';
import { AstroProfileComponent } from './components/on-board-astrologer/astro-profile/astro-profile.component';
import { AstroResgistrationComponent } from './components/on-board-astrologer/astro-resgistration/astro-resgistration.component';
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
import { ScratchCardListComponent } from './components/scratch-cards/scratch-card-list/scratch-card-list.component';
import { AddNewScratchCardComponent } from './components/scratch-cards/add-new-scratch-card/add-new-scratch-card.component';
// import { ManageCustomersComponent } from './components/manage-customers/manage-customers.component';
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
import { RechargeShortcutComponent } from './components/recharge-shortcut/recharge-shortcut.component';
import { ContentUpdatesComponent } from './components/content-updates/content-updates.component';
import { KundliComponent } from './components/content-updates/kundli/kundli.component';
import { MatchMakingComponent } from './components/content-updates/match-making/match-making.component';
import { PolicyComponent } from './components/content-updates/policy/policy.component';
import { ShubhMuhratComponent } from './components/content-updates/shubh-muhrat/shubh-muhrat.component';
import { PrizesComponent } from './components/prizes/prizes.component';
import { CustomRechargeComponent } from './components/custom-recharge/custom-recharge.component';
import { TechSupportvidComponent } from './components/tech-supportvid/tech-supportvid.component';
import { TechCommentsComponent } from './components/tech-supportvid/tech-comments/tech-comments.component';
import { AstroNoticeComponent } from './components/astro-notice/astro-notice.component';
import { CallHComponent } from './telecallcomponents/call-h/call-h.component';
import { ChatHComponent } from './telecallcomponents/chat-h/chat-h.component';
import { VideoHComponent } from './telecallcomponents/video-h/video-h.component';
import { TelecallReportComponent } from './components/telecall-report/telecall-report.component';
import { AstroRegistrationComponent } from './components/astro-registration/astro-registration.component';
import { CallChatVcallCountDatewiseComponent } from './components/call-chat-vcall-count-datewise/call-chat-vcall-count-datewise.component';
import { ViewScratchCardsStatusComponent } from './components/scratch-cards/view-scratch-cards-status/view-scratch-cards-status.component';
import { ManageCommonServiceComponent } from './components/manage-astroshop/manage-common-service/manage-common-service.component';
import { LandingPageComponent } from './components/manage-astroshop/landing-page/landing-page.component';
import { PackagePageComponent } from './components/manage-astroshop/package-page/package-page.component';
import { CustomerCustomRechComponent } from './components/mng-customers/customer-custom-rech/customer-custom-rech.component';
import { ModifyUserwalletComponent } from './components/mng-customers/modify-userwallet/modify-userwallet.component';
import { Blog2Component } from './components/blog2/blog2.component';
import { CustomerActivityComponent } from './components/mng-customers/customer-activity/customer-activity.component';
import { AstroSalesReportComponent } from './components/astro-sales-report/astro-sales-report.component';
import { ManageAstroXpPointsComponent } from './components/manage-astro-xp-points/manage-astro-xp-points.component';
import { XpRankingComponent } from './components/xp-ranking/xp-ranking.component';
import { AstroXpsComponent } from './components/on-board-astrologer/astro-xps/astro-xps.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    component: SuperAdminComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'call-history', component: CallHistoryComponent },
      { path: 'chat-history', component: ChatHistoryComponent },
      { path: 'chats/:chatId', component: ChatsComponent },
      { path: 'notification', component: NotificationComponent },
      { path: 'feedback', component: FeedbackComponent },
      { path: 'mng-popup', component: OfferPopupComponent },
      { path: 'blog', component: BlogComponent },
      { path: 'blog2', component: Blog2Component },
      { path: 'transaction-report', component: TransactionReportComponent },
      { path: 'add-support-category', component: AddSupportCategoryComponent },
      { path: 'support-tickets', component: SupportTicketsComponent },
      { path: 'astrologer-report', component: AstrologerReportComponent },
      { path: 'astro_pv_comments', component: AstroPvCommentsComponent },
      {
        path: 'onBoardastro',
        component: OnBoardAstrologerComponent,
        children: [
          {
            path: '',
            redirectTo: 'astrologer-registration',
            pathMatch: 'full',
          },
          { path: 'astro-list', component: AstroResgistrationComponent },
          { path: 'astrosetting', component: AstrosettingComponent },
          {
            path: 'astro-view',
            component: AstroViewComponent,
            children: [
              {
                path: '',
                redirectTo: 'astrologer-registration',
                pathMatch: 'full',
              },
              { path: 'astro-profile', component: AstroProfileComponent },
              { path: 'call_chatHistory', component: CallChatHistoryComponent },
              { path: 'asroRecord', component: AstroRecordComponent },
              {
                path: 'astrologer-promo-videos',
                component: AstroPromoVideosComponent,
              },
              {
                path: 'repeated-users',
                component: RepeatedUserComponent,
              },
              { path: 'online-details', component: AstroOnlineDetailComponent },
              { path: 'astro-xp', component: AstroXpsComponent },
            ],
          },
        ],
      },
      { path: 'astrologer-promo-videos', component: AstroPromoVideosComponent },
      { path: 'astrologers-ranking', component: AstrologerRankingComponent },
      { path: 'master', component: MasterComponent },
      { path: 'video-history', component: VideoCallHistoryComponent },
      { path: 'manage-banners', component: BannersComponent },
      { path: 'master/masterDetail', component: MasterDetailComponent },
      { path: 'admin-users', component: AdminusersComponent },
      {
        path: 'admin-users/usersPermission',
        component: AdminUserpermissionComponent,
      },
      { path: 'manage-astroshop', component: ManageAstroshopComponent },
      { path: 'shop-category', component: ShopCategoryComponent },
      { path: 'shared-product', component: SharedProductComponent },
      {
        path: 'manage-order-history',
        component: AstroshopOrderHistoryComponent,
      },
      { path: 'manage-shop-service', component: ManageShopServiceComponent },
      { path: 'manage-landing-page', component: LandingPageComponent },
      { path: 'manage-package-page', component: PackagePageComponent },
      { path: 'manage-common-service', component: ManageCommonServiceComponent },
      {
        path: 'manage-service-astro-relation',
        component: ManageServiceAstroRelationComponent,
      },
      { path: 'manage-service-history', component: ManageServiceComponent },
      {
        path: 'horoscope-content',
        component: HoroContentComponent
      },
      {
        path: 'horo-sign-prediction',
        component: HoroSignpredictionComponent
      }, {
        path: 'scratchCards',
        component: ScratchCardsComponent,
        children: [
          { path: 'scratch-card-list', component: ScratchCardListComponent },
          { path: 'add-new-scratch-card', component: AddNewScratchCardComponent },
        ],
      },
      {
        path: 'mng-customers',
        component: MngCustomersComponent,
        children: [
          { path: 'customer-list', component: CustomersListComponent },
          // { path: 'customer-profile', component: CustomerProfileComponent },
          {
            path: 'customer-view',
            component: CustomerViewComponent,
            children: [
              { path: 'customer-profile', component: CustomerProfileComponent },
              { path: 'call-history', component: CallLogsComponent },
              { path: 'txn-history', component: CustomerTransactionsComponent },
              { path: 'customer-offers', component: CustomerOffersComponent },
              { path: 'customer-feedbacks', component: CustomerFeedbacksComponent },
              { path: 'custom-offers', component: CustomerCustomRechComponent },
              { path: 'modify-wallet', component: ModifyUserwalletComponent },
              { path: 'customer-activity', component: CustomerActivityComponent }

            ],
          },

        ],
      },
      {
        path: 'utilites',
        component: ScratchCardsComponent,
        children: [
          { path: 'recharge-shortcuts', component: RechargeShortcutComponent },
          { path: 'add-new-scratch-card', component: AddNewScratchCardComponent },
          { path: 'customRecharge', component: CustomRechargeComponent },
        ],
      },
      {
        path: 'content',
        component: ContentUpdatesComponent,
        children: [
          { path: 'kundli', component: KundliComponent },
          { path: 'matchMaking', component: MatchMakingComponent },
          { path: 'policy', component: PolicyComponent },
          { path: 'shubhMuhrat', component: ShubhMuhratComponent },
        ],
      },
      {
        path: 'prizes',
        component: PrizesComponent
      },
      {
        path: 'tech-support',
        component: TechSupportvidComponent,
      },
      { path: 'tech-comment', component: TechCommentsComponent },
      { path: 'astrologers-notice', component: AstroNoticeComponent },
      {
        path: 'report',
        children: [
          { path: 'callhistory', component: CallHComponent },
          { path: 'chathistory', component: ChatHComponent },
          { path: 'vcallhistory', component: VideoHComponent },
        ]
      },
      {
        path: 'telecall',
        children: [
          { path: 'callhistory', component: TelecallReportComponent },
        ]
      },
      {
        path: 'astrologer-registration', component: AstroRegistrationComponent,
      },
      { path: 'viewAstro', component: AstroProfileComponent },
      { path: 'datewise-call-chat-videocall-count', component: CallChatVcallCountDatewiseComponent },
      { path: 'view-scratch-cards-status', component: ViewScratchCardsStatusComponent },
      { path: 'astrologers-sales-report', component: AstroSalesReportComponent },
      { path: 'manage-astro-xp', component: ManageAstroXpPointsComponent },
      { path: 'astro-xp-ranking', component: XpRankingComponent }
    ],
  },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SuperAdminRoutingModule { }
