import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//import { CounterService } from './counter.service';
import { AgmCoreModule } from '@agm/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {HeaderComponent} from '../incl/header/header.component';
import {FooterComponent} from '../footer/footer.component';
import {NoDataFoundComponent} from '../no-data-found/no-data-found.component';
import { PaytmGatewayComponent } from '../paytm-gateway/paytm-gateway.component';
import {PayumoneyGatewayComponent} from '../payumoney-gateway/payumoney-gateway.component';
 
import { PopupComponent } from '../popup/popup.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
       
    AgmCoreModule.forRoot({
     
      apiKey: 'AIzaSyDThSOosn0rAi6Qe_W8Zz24WmQ_CzVMQFE',
      libraries: ["places"]
    }),
  ],
  declarations: [HeaderComponent,FooterComponent,NoDataFoundComponent,PaytmGatewayComponent,PayumoneyGatewayComponent,PopupComponent],
  exports: [
    HeaderComponent,NoDataFoundComponent,PopupComponent,
    FooterComponent,AgmCoreModule,PaytmGatewayComponent,FormsModule,PayumoneyGatewayComponent
  ] 
  
})
export class SharedModule {}