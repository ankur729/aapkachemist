import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ChemistAccountHomeComponent} from './chemist-account-home/chemist-account-home.component';
// import {FamilyTreeComponent} from './family-tree/family-tree.component';
 import {ChangePasswordComponent} from './change-password/change-password.component';
 import {RetailerOrdersComponent} from './retailer-orders/retailer-orders.component';
 import {RetailerOrderDetailComponent} from './retailer-order-detail/retailer-order-detail.component';
 import {RetailerEnquiryComponent} from './retailer-enquiry/retailer-enquiry.component';
 import {StockEnquiryComponent} from './stock-enquiry/stock-enquiry.component';
 import {StockOrdersComponent} from './stock-orders/stock-orders.component';
 import {NotificationsComponent} from './notifications/notifications.component';
 
 import { StockOrderDetailComponent } from './stock-order-detail/stock-order-detail.component';
 import {ProfileSetupComponent} from './profile-setup/profile-setup.component';
 
import {UpdateProfileComponent} from './update-profile/update-profile.component';
import {AddAddressComponent} from './add-address/add-address.component';
import {MyAddressComponent} from './my-address/my-address.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import { RetailerEnquiryDetailComponent } from './retailer-enquiry-detail/retailer-enquiry-detail.component';
import { RetailerOrderTrackingComponent } from './retailer-order-tracking/retailer-order-tracking.component';
import { StockEnquiryQuotesComponent } from './stock-enquiry-quotes/stock-enquiry-quotes.component';
import { StockEnquiryDetailComponent } from './stock-enquiry-detail/stock-enquiry-detail.component';
import {MyWalletComponent} from './my-wallet/my-wallet.component';
import {ViewProfileComponent} from './view-profile/view-profile.component';
import {DeactivateAccountComponent} from './deactivate-account/deactivate-account.component';
import {EditAddressComponent} from './edit-address/edit-address.component';
import {BuyPlanComponent} from './buy-plan/buy-plan.component';
import {SearchDistributorComponent} from './search-distributor/search-distributor.component';
import {PackageHistoryComponent} from './package-history/package-history.component';
 
import {OfferListComponent} from './offers/offer-list/offer-list.component';
 
import {RefferalComponent} from './refferal/refferal.component';
import {RefferHistoryComponent} from './reffer-history/reffer-history.component';
import {AddOfferComponent} from './offers/add-offer/add-offer.component';
import {MyOffersComponent} from './offers/my-offers/my-offers.component';
import {EditOfferComponent} from './offers/edit-offer/edit-offer.component';
import {AddViewBillComponent} from './add-view-bill/add-view-bill.component';
import {BidCoinComponent} from './bid-coin/bid-coin.component';
import {PaymentComponent} from './payment/payment.component';
import {ModifyCartComponent} from './modify-cart/modify-cart.component';
import {SendModifiedQuotationComponent} from './send-modified-quotation/send-modified-quotation.component';
import {AddUpdateBankDetailsComponent} from './add-update-bank-details/add-update-bank-details.component';
 import {InvoiceComponent} from './invoice/invoice.component';
 import {BroadcastComponent} from './broadcast/broadcast.component';
 import {BroadcastDetailComponent} from './broadcast-detail/broadcast-detail.component';
 import {OrderHistoryComponent} from './order-history/order-history.component';
 import {ComplaintListComponent} from './complaint/complaint-list/complaint-list.component';
 import {ComplaintAddComponent} from './complaint/complaint-add/complaint-add.component';
 import {ComplaintDetailComponent} from './complaint/complaint-detail/complaint-detail.component';
// import {UpdateProfileComponent} from './update-profile/update-profile.component';
// import {MyAddressComponent} from './my-address/my-address.component';
// import {MyOrdersComponent} from './my-orders/my-orders.component';
// import {OrderDetailComponent} from './order-detail/order-detail.component';
// import {MyChemistComponent} from './my-chemist/my-chemist.component';
// import {MyWalletComponent} from './my-wallet/my-wallet.component';

// import {AddMemberComponent} from './add-member/add-member.component';
// import {AddAddressComponent} from './add-address/add-address.component';
// import {EditAddressComponent} from './edit-address/edit-address.component';
// import {MyEnquriesComponent } from './my-enquries/my-enquries.component';
// import {EnquiryDetailComponent} from './enquiry-detail/enquiry-detail.component';

const routes: Routes = [
  { path: '', component: ChangePasswordComponent },
  // { path: 'family-tree', component: FamilyTreeComponent },
   { path: 'change-password', component: ChangePasswordComponent },
   { path: 'retailer-orders', component: RetailerOrdersComponent },
   { path: 'retailer-enquiry', component: RetailerEnquiryComponent },
   { path: 'retailer-enquiry-detail', component: RetailerEnquiryDetailComponent },
 
   { path: 'stock-enquiry', component: StockEnquiryComponent },
   { path: 'stock-enquiry-quotes', component: StockEnquiryQuotesComponent },
   { path: 'stock-enquiry-detail', component: StockEnquiryDetailComponent },

   { path: 'stock-orders', component: StockOrdersComponent },
   { path: 'notifications', component: NotificationsComponent },
   { path: 'retailer-order-detail', component: RetailerOrderDetailComponent },
   { path: 'retailer-order-track', component: RetailerOrderTrackingComponent },
   
   { path: 'stock-order-detail', component: StockOrderDetailComponent },
   { path: 'profile-setup', component: ProfileSetupComponent },
   {path :'update-profile' , component:UpdateProfileComponent},
   {path :'add-address' , component:AddAddressComponent},
   { path: 'edit-address', component: EditAddressComponent },
   {path :'my-address' , component:MyAddressComponent},
   {path :'dashboard' , component:DashboardComponent},
   {path :'my-wallet' ,component:MyWalletComponent},
   {path :'view-profile' ,component:ViewProfileComponent},
   {path :'deactivate-account' ,component:DeactivateAccountComponent},
   {path :'buy-plan' ,component:BuyPlanComponent},
   {path :'search-distributor' ,component:SearchDistributorComponent},
   {path :'package-history' ,component:PackageHistoryComponent},
   {path :'add-offer' ,component:AddOfferComponent},
   {path :'offers' ,component:OfferListComponent},
    {path:'edit-offer',component:EditOfferComponent},
   {path :'reffer-earn' ,component:RefferalComponent},
   {path :'reffer-history' ,component:RefferHistoryComponent},
   {path :'my-offers' ,component:MyOffersComponent},
   {path :'add-view-bill' ,component:AddViewBillComponent},
   {path :'bid-coin' ,component:BidCoinComponent},
   {path :'payment' ,component:PaymentComponent},
   {path :'modify-order' ,component:ModifyCartComponent},
   {path :'send-modified-quotation' ,component:SendModifiedQuotationComponent},
   {path :'update-bank-details' ,component:AddUpdateBankDetailsComponent},
   {path :'invoice' ,component:InvoiceComponent},
   {path :'broadcast' ,component:BroadcastComponent},
   {path :'broadcast-detail' ,component:BroadcastDetailComponent},
   {path :'order-history' ,component:OrderHistoryComponent},
   {path :'complaint' ,component:ComplaintListComponent},
   {path :'add-complaint' ,component:ComplaintAddComponent},
   {path :'complaint-detail' ,component:ComplaintDetailComponent},
   
  // { path: 'update-profile', component: UpdateP rofileComponent },
  // { path: 'address', component: MyAddressComponent },
  // { path: 'add-address', component: AddAddressComponent },
  // { path: 'edit-address', component: EditAddressComponent },
  // { path: 'orders', component: MyOrdersComponent },
  // { path: 'order-detail', component: OrderDetailComponent },
  // { path: 'chemist', component: MyChemistComponent },
  // { path: 'wallet', component: MyWalletComponent },
  // { path: 'notification', component: MyNotificationComponent },
  // { path: 'add-member', component: AddMemberComponent },
  // { path: 'enquires', component: MyEnquriesComponent },
  // { path: 'enquiry-detail', component: EnquiryDetailComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChemistRoutingModule { }
