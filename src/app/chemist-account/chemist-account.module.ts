import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChemistRoutingModule } from './chemist-account-routing.module';
 import { SharedModule } from '../shared/shared.module';
import { RetailerOrdersComponent } from './retailer-orders/retailer-orders.component';
import { RetailerOrderDetailComponent } from './retailer-order-detail/retailer-order-detail.component';
import { StockOrderDetailComponent } from './stock-order-detail/stock-order-detail.component';
import { StockOrdersComponent } from './stock-orders/stock-orders.component';
import { StockEnquiryComponent } from './stock-enquiry/stock-enquiry.component';
import { NotificationsComponent } from './notifications/notifications.component';
// import { MyAccountTopPanelComponent } from './my-account-top-panel/my-account-top-panel.component';
 import { ChemistAccountLeftPanelComponent } from './chemist-account-left-panel/chemist-account-left-panel.component';
// import { FamilyTreeComponent } from './family-tree/family-tree.component';
 import { ChemistAccountHomeComponent } from './chemist-account-home/chemist-account-home.component';

 import { ChangePasswordComponent } from './change-password/change-password.component';
import { RetailerEnquiryComponent } from './retailer-enquiry/retailer-enquiry.component';
import { ProfileSetupComponent } from './profile-setup/profile-setup.component';
import { ProfileheaderComponent } from './profile-setup/profileheader/profileheader.component';
import { BusinessDetailsComponent } from './profile-setup/business-details/business-details.component';
import { RegistrationDetailComponent } from './profile-setup/registration-detail/registration-detail.component';
import { BusinessTimingsComponent } from './profile-setup/business-timings/business-timings.component';
import { DocumentDetailsComponent } from './profile-setup/document-details/document-details.component';
import { DeliveryDetailsComponent } from './profile-setup/delivery-details/delivery-details.component';
import { SocialMediaComponent } from './profile-setup/social-media/social-media.component';
import { MapCategoryComponent } from './profile-setup/map-category/map-category.component';
import { UpdateProfileComponent } from './update-profile/update-profile.component';
import { AddAddressComponent } from './add-address/add-address.component';
import { EditAddressComponent } from './edit-address/edit-address.component';
import { MyAddressComponent } from './my-address/my-address.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RetailerEnquiryDetailComponent } from './retailer-enquiry-detail/retailer-enquiry-detail.component';
import { RetailerOrderTrackingComponent } from './retailer-order-tracking/retailer-order-tracking.component';
import { StockEnquiryQuotesComponent } from './stock-enquiry-quotes/stock-enquiry-quotes.component';
import { StockEnquiryDetailComponent } from './stock-enquiry-detail/stock-enquiry-detail.component';
import { MyWalletComponent } from './my-wallet/my-wallet.component';
 
import { ViewProfileComponent } from './view-profile/view-profile.component';
import { DeactivateAccountComponent } from './deactivate-account/deactivate-account.component';
import { PaymentComponent } from './payment/payment.component';
import { BuyPlanComponent } from './buy-plan/buy-plan.component';
import { PackageHistoryComponent } from './package-history/package-history.component';
import { SearchDistributorComponent } from './search-distributor/search-distributor.component';
 
import { OfferListComponent } from './offers/offer-list/offer-list.component';
 
import { RefferalComponent } from './refferal/refferal.component';
import { MyOffersComponent } from './offers/my-offers/my-offers.component';
 
import { AddOfferComponent } from './offers/add-offer/add-offer.component';
import { BankDetailsComponent } from './profile-setup/bank-details/bank-details.component';
import { EditOfferComponent } from './offers/edit-offer/edit-offer.component';
import { AddViewBillComponent } from './add-view-bill/add-view-bill.component';
import { BidCoinComponent } from './bid-coin/bid-coin.component';
import { PaymentsComponent } from './payments/payments.component';
import { ModifyCartComponent } from './modify-cart/modify-cart.component';
import { SendModifiedQuotationComponent } from './send-modified-quotation/send-modified-quotation.component';
import { AddUpdateBankDetailsComponent } from './add-update-bank-details/add-update-bank-details.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { BroadcastComponent } from './broadcast/broadcast.component';
import { BroadcastDetailComponent } from './broadcast-detail/broadcast-detail.component';
import { OrderHistoryComponent } from './order-history/order-history.component';
import { ComplaintAddComponent } from './complaint/complaint-add/complaint-add.component';
import { ComplaintDetailComponent } from './complaint/complaint-detail/complaint-detail.component';
import { ComplaintListComponent } from './complaint/complaint-list/complaint-list.component';
import { RefferHistoryComponent } from './reffer-history/reffer-history.component';
 
 
 
// import { AddMemberComponent } from './add-member/add-member.component';
// import { AddAddressComponent } from './add-address/add-address.component';
// import { MyAddressComponent } from './my-address/my-address.component';
// import { MyChemistComponent } from './my-chemist/my-chemist.component';
// import { MyOrdersComponent } from './my-orders/my-orders.component';
// import { MyWalletComponent } from './my-wallet/my-wallet.component';
// import { MyNotificationComponent } from './my-notification/my-notification.component';
// import { OrderDetailComponent } from './order-detail/order-detail.component';
// import { UpdateProfileComponent } from './update-profile/update-profile.component';
// import { EditAddressComponent } from './edit-address/edit-address.component';
// import { MyEnquriesComponent } from './my-enquries/my-enquries.component';
// import { EnquiryDetailComponent } from './enquiry-detail/enquiry-detail.component';
@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ChemistRoutingModule,
 
  ],
  declarations: [ChemistAccountHomeComponent, ChemistAccountLeftPanelComponent,ChangePasswordComponent,RetailerOrdersComponent, RetailerEnquiryComponent,
    StockEnquiryComponent,StockOrdersComponent,NotificationsComponent,RetailerOrderDetailComponent,StockOrderDetailComponent, ProfileSetupComponent, ProfileheaderComponent, BusinessDetailsComponent, RegistrationDetailComponent, BusinessTimingsComponent, DocumentDetailsComponent, DeliveryDetailsComponent, SocialMediaComponent, MapCategoryComponent, UpdateProfileComponent, AddAddressComponent, EditAddressComponent, MyAddressComponent, DashboardComponent, RetailerEnquiryDetailComponent, RetailerOrderTrackingComponent, StockEnquiryQuotesComponent, StockEnquiryDetailComponent, MyWalletComponent, ViewProfileComponent, DeactivateAccountComponent, PaymentComponent, BuyPlanComponent, PackageHistoryComponent, SearchDistributorComponent, OfferListComponent, RefferalComponent, MyOffersComponent, AddOfferComponent, BankDetailsComponent, EditOfferComponent, AddViewBillComponent, BidCoinComponent, PaymentsComponent, ModifyCartComponent, SendModifiedQuotationComponent, AddUpdateBankDetailsComponent, InvoiceComponent, BroadcastComponent, BroadcastDetailComponent, OrderHistoryComponent, ComplaintAddComponent, ComplaintDetailComponent, ComplaintListComponent, RefferHistoryComponent]
})
export class ChemistModule { }
