import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MyAccountRoutingModule } from './my-account-routing.module';
import { MyAccountTopPanelComponent } from './my-account-top-panel/my-account-top-panel.component';
import { MyAccountLeftPanelComponent } from './my-account-left-panel/my-account-left-panel.component';
import { FamilyTreeComponent } from './family-tree/family-tree.component';
import { MyAccountHomeComponent } from './my-account-home/my-account-home.component';
import { SharedModule } from '../shared/shared.module';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { AddMemberComponent } from './add-member/add-member.component';
import { AddAddressComponent } from './add-address/add-address.component';
import { MyAddressComponent } from './my-address/my-address.component';
import { MyChemistComponent } from './my-chemist/my-chemist.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { MyWalletComponent } from './my-wallet/my-wallet.component';
import { MyNotificationComponent } from './my-notification/my-notification.component';
import { OrderDetailComponent } from './order-detail/order-detail.component';
import { UpdateProfileComponent } from './update-profile/update-profile.component';
import { EditAddressComponent } from './edit-address/edit-address.component';
import { MyEnquriesComponent } from './my-enquries/my-enquries.component';
import { EnquiryDetailComponent } from './enquiry-detail/enquiry-detail.component';
import { EnquiryQuotationComponent } from './enquiry-quotation/enquiry-quotation.component';
import { EnquiryQuotationDetailComponent } from './enquiry-quotation-detail/enquiry-quotation-detail.component';
import { DeactivateAccountComponent } from './deactivate-account/deactivate-account.component';
import { ApcCashComponent } from './apc-cash/apc-cash.component';
import { RefferalComponent } from './refferal/refferal.component';
import { AddViewBillComponent } from './add-view-bill/add-view-bill.component';
import { ViewModifiedOrderComponent } from './view-modified-order/view-modified-order.component';
import { RefferHistoryComponent } from './reffer-history/reffer-history.component';
import { ComplaintListComponent } from './complaint/complaint-list/complaint-list.component';
import { ComplaintAddComponent } from './complaint/complaint-add/complaint-add.component';
import { ComplaintDetailComponent } from './complaint/complaint-detail/complaint-detail.component';
import { BroadcastComponent } from './broadcast/broadcast.component';
import { BroadcastDetailComponent } from './broadcast-detail/broadcast-detail.component';


@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    MyAccountRoutingModule,
   
  ],
  declarations: [MyAccountTopPanelComponent, MyAccountLeftPanelComponent, FamilyTreeComponent,
     MyAccountHomeComponent, ChangePasswordComponent, AddMemberComponent, AddAddressComponent,
      MyAddressComponent, MyChemistComponent, MyOrdersComponent, MyWalletComponent, MyNotificationComponent,
       OrderDetailComponent, UpdateProfileComponent, EditAddressComponent, MyEnquriesComponent, EnquiryDetailComponent,
        EnquiryQuotationComponent, EnquiryQuotationDetailComponent, DeactivateAccountComponent,
         ApcCashComponent, RefferalComponent,AddViewBillComponent, ViewModifiedOrderComponent,
          RefferHistoryComponent, ComplaintListComponent, ComplaintAddComponent, ComplaintDetailComponent, BroadcastComponent, BroadcastDetailComponent]
})
export class MyAccountModule { }
