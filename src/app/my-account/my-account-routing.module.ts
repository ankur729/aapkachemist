import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MyAccountHomeComponent} from './my-account-home/my-account-home.component';
import {FamilyTreeComponent} from './family-tree/family-tree.component';
import {ChangePasswordComponent} from './change-password/change-password.component';
import {UpdateProfileComponent} from './update-profile/update-profile.component';
import {MyAddressComponent} from './my-address/my-address.component';
import {MyOrdersComponent} from './my-orders/my-orders.component';
import {OrderDetailComponent} from './order-detail/order-detail.component';
import {MyChemistComponent} from './my-chemist/my-chemist.component';
import {MyWalletComponent} from './my-wallet/my-wallet.component';
import {MyNotificationComponent} from './my-notification/my-notification.component';
import {AddMemberComponent} from './add-member/add-member.component';
import {AddAddressComponent} from './add-address/add-address.component';
import {EditAddressComponent} from './edit-address/edit-address.component';
import {MyEnquriesComponent } from './my-enquries/my-enquries.component';
import {EnquiryDetailComponent} from './enquiry-detail/enquiry-detail.component';
import { EnquiryQuotationComponent } from './enquiry-quotation/enquiry-quotation.component';
import { EnquiryQuotationDetailComponent } from './enquiry-quotation-detail/enquiry-quotation-detail.component';
import {DeactivateAccountComponent} from './deactivate-account/deactivate-account.component';
import {ApcCashComponent} from './apc-cash/apc-cash.component';
import {RefferalComponent} from './refferal/refferal.component';
import {AddViewBillComponent} from './add-view-bill/add-view-bill.component';
import {ViewModifiedOrderComponent} from './view-modified-order/view-modified-order.component';
import {RefferHistoryComponent} from './reffer-history/reffer-history.component';
 import {BroadcastComponent} from './broadcast/broadcast.component';
import {ComplaintListComponent} from './complaint/complaint-list/complaint-list.component';
import {ComplaintAddComponent} from './complaint/complaint-add/complaint-add.component';
import {ComplaintDetailComponent} from './complaint/complaint-detail/complaint-detail.component';
import {BroadcastDetailComponent} from './broadcast-detail/broadcast-detail.component';

const routes: Routes = [
  { path: '', component: FamilyTreeComponent },
  { path: 'family-tree', component: FamilyTreeComponent },
  { path: 'change-password', component: ChangePasswordComponent },
  { path: 'update-profile', component: UpdateProfileComponent },
  { path: 'address', component: MyAddressComponent },
  { path: 'add-member', component: AddAddressComponent },
  { path: 'edit-member', component: EditAddressComponent },
  { path: 'orders', component: MyOrdersComponent },
  { path: 'order-detail', component: OrderDetailComponent },
  { path: 'chemist', component: MyChemistComponent },
  { path: 'wallet', component: MyWalletComponent },
  { path: 'notification', component: MyNotificationComponent },
  { path: 'add-member', component: AddMemberComponent },
  { path: 'enquires', component: MyEnquriesComponent },
  { path: 'enquiry-detail', component: EnquiryDetailComponent },
  { path: 'enquiry-quotation', component: EnquiryQuotationComponent },
  { path: 'enquiry-quotation-detail', component: EnquiryQuotationDetailComponent },
  {path:'deactivate-account',component:DeactivateAccountComponent}  ,
  {path:'apc-cash',component:ApcCashComponent},
  {path :'reffer-earn' ,component:RefferalComponent},
  {path :'view-invoice' ,component:AddViewBillComponent},
  {path :'view-modify-order' ,component:ViewModifiedOrderComponent},
  {path :'reffer-history' ,component:RefferHistoryComponent},
  {path :'complaint' ,component:ComplaintListComponent},
  {path :'add-complaint' ,component:ComplaintAddComponent},
  {path :'complaint-detail' ,component:ComplaintDetailComponent},
  {path :'broadcast' ,component:BroadcastComponent},
  {path :'broadcast-detail' ,component:BroadcastDetailComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyAccountRoutingModule { }
