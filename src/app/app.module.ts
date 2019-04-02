import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {Api} from './api.service';
import {AppGlobals}  from './app.global';

import {PathLocationStrategy, LocationStrategy } from '@angular/common';
import { LoadingBarModule } from '@ngx-loading-bar/core';
import {HomeComponent} from './home/home.component';
import { SharedModule } from './shared/shared.module';
import { LoginRegisterComponent } from './login-register/login-register.component';
  
import { MedicineDetailComponent } from './medicine-detail/medicine-detail.component';
import { MedicineListComponent } from './medicine-list/medicine-list.component';
import { Cart1Component } from './cart/cart1/cart1.component';
import { CartHeaderComponent } from './cart/cart-header/cart-header.component';
import { Cart2Component } from './cart/cart2/cart2.component';
import { Cart3Component } from './cart/cart3/cart3.component';
import { ChemistDetailComponent } from './chemist-detail/chemist-detail.component';
import { CategoryPageComponent } from './category-page/category-page.component';
import { Cart4Component } from './cart/cart4/cart4.component';

import { ChemistListingComponent } from './chemist-listing/chemist-listing.component';
import { CountdownModule } from 'ngx-countdown';
import { HelpCenterComponent } from './help-center/help-center.component';
import { FaqComponent } from './info/faq/faq.component';
  
import { AngularFireMessagingModule } from '@angular/fire/messaging';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { AsyncPipe } from '../../node_modules/@angular/common';
import { MessagingService } from './shared/messaging.service';
 
 
import { InfoPageComponent } from './info/info-page/info-page.component';
import { AboutUsComponent } from './info/about-us/about-us.component';
import { TermsConditionsComponent } from './info/terms-conditions/terms-conditions.component';
import { PrivacyPolicyComponent } from './info/privacy-policy/privacy-policy.component';
import { QrComponent } from './qr/qr.component';
import { NoPageFoundComponent } from './no-page-found/no-page-found.component';
import { ThankYouComponent } from './thank-you/thank-you.component';
import { MediaReleaseComponent } from './info/media-release/media-release.component';
import { MediaReleaseDetailComponent } from './info/media-release-detail/media-release-detail.component';
import { ContactUsComponent } from './info/contact-us/contact-us.component';
import { LaunchPopupComponent } from './launch-popup/launch-popup.component';
import { JobsAndCareerComponent } from './info/jobs-and-career/jobs-and-career.component';
import { AnonymousAuthenticationComponent } from './anonymous-authentication/anonymous-authentication.component';
import { SiteMapComponent } from './info/site-map/site-map.component';
import { PrescriptionUploadComponent } from './cart/prescription-upload/prescription-upload.component';
import { PreviewOrderComponent } from './cart/preview-order/preview-order.component';
import { TestimonialDetailComponent } from './info/testimonial-detail/testimonial-detail.component';
import { MediaCenterComponent } from './info/media-center/media-center.component';


 
  
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    
    LoginRegisterComponent,
 
    MedicineDetailComponent,
    MedicineListComponent,
    Cart1Component,
    CartHeaderComponent,
    Cart2Component,
    Cart3Component,
    ChemistDetailComponent,
    CategoryPageComponent,
    Cart4Component,
    ChemistListingComponent,
    HelpCenterComponent,
    FaqComponent,
 
    InfoPageComponent,
    AboutUsComponent,
    TermsConditionsComponent,
    PrivacyPolicyComponent,
    QrComponent,
    NoPageFoundComponent,
    ThankYouComponent,
    MediaReleaseComponent,
    MediaReleaseDetailComponent,
    ContactUsComponent,
    LaunchPopupComponent,
 
    JobsAndCareerComponent,
 
    AnonymousAuthenticationComponent,
 
    SiteMapComponent,
 
    PrescriptionUploadComponent,
 
    PreviewOrderComponent,
 
    TestimonialDetailComponent,
 
    MediaCenterComponent,
 
    
   
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    SharedModule,
  
    CountdownModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFireMessagingModule,
    AngularFireModule.initializeApp(environment.firebase),
    LoadingBarModule.forRoot(),
   
  ],
  providers: [AppGlobals,Api,MessagingService, AsyncPipe,{provide: LocationStrategy, useClass: PathLocationStrategy}],
 //providers: [AppGlobals,Api,{provide: LocationStrategy, useClass: PathLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }
