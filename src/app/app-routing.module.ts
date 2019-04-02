import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {LoginRegisterComponent} from './login-register/login-register.component';
import {MedicineDetailComponent} from './medicine-detail/medicine-detail.component';
import {ChemistDetailComponent} from './chemist-detail/chemist-detail.component';
import {CategoryPageComponent  } from "./category-page/category-page.component";
import {MedicineListComponent} from './medicine-list/medicine-list.component';
import {Cart1Component} from './cart/cart1/cart1.component';
import {Cart2Component} from './cart/cart2/cart2.component';
import {Cart3Component} from './cart/cart3/cart3.component';
import {Cart4Component} from './cart/cart4/cart4.component';
import { ChemistListingComponent } from './chemist-listing/chemist-listing.component';
import {HelpCenterComponent} from './help-center/help-center.component';
import {FaqComponent} from './info/faq/faq.component';
 
import {InfoPageComponent} from './info/info-page/info-page.component';
import {AboutUsComponent} from './info/about-us/about-us.component';
import {PrivacyPolicyComponent} from './info/privacy-policy/privacy-policy.component';
import {TermsConditionsComponent} from './info/terms-conditions/terms-conditions.component';
import {QrComponent} from './qr/qr.component';
import {NoPageFoundComponent} from './no-page-found/no-page-found.component';
import {ThankYouComponent} from './thank-you/thank-you.component';
import {MediaReleaseComponent} from './info/media-release/media-release.component';
import {MediaReleaseDetailComponent} from './info/media-release-detail/media-release-detail.component';
import {ContactUsComponent  } from "./info/contact-us/contact-us.component";
import {JobsAndCareerComponent} from './info/jobs-and-career/jobs-and-career.component';
import {AnonymousAuthenticationComponent} from './anonymous-authentication/anonymous-authentication.component';
import {SiteMapComponent} from './info/site-map/site-map.component';
import {PrescriptionUploadComponent} from './cart/prescription-upload/prescription-upload.component';
import {PreviewOrderComponent} from './cart/preview-order/preview-order.component';
import {MediaCenterComponent} from './info/media-center/media-center.component';
import {TestimonialDetailComponent} from './info/testimonial-detail/testimonial-detail.component';

const appRoutes: Routes = [
    // {
    //   path: '',
    //   redirectTo: 'home',
    //   pathMatch: 'full'
    // },
    {
      path: '',
      component: HomeComponent
    },
    {
        path: 'home',
        redirectTo: '',
      },
     
      {
        path: 'login-register',
        component: LoginRegisterComponent
      },
      {
        path: 'login',
        component: LoginRegisterComponent
      },
      {
        path: 'sign-up',
        component: LoginRegisterComponent
      },
      {
        path: 'forget-password',
        component: LoginRegisterComponent
      },
      {
        path: 'medicine-detail/:seourl',
        component: MedicineDetailComponent
      },

      {
        path: 'medicine-listing/:seourl',
        component: MedicineListComponent
      },
      {
        path: 'chemist-listing',
        component: ChemistListingComponent
      },
      {
        path: 'cart-step-one',
        component: Cart1Component
      },
      {
        path: 'cart-step-two',
        component: Cart2Component
      },
      {
        path: 'cart-step-three',
        component: Cart3Component
      },
      {
        path: 'cart-step-four',
        component: Cart4Component
      },
      
      {
        path: 'chemist-detail/:seourl',
        component: ChemistDetailComponent
      },
      {
        path: 'category',
        component: CategoryPageComponent
      },
      {
        path: 'category/:seourl',
        component: CategoryPageComponent
      },
     
      {
        path: 'help-center',
        component: HelpCenterComponent
      },
      {
        path: 'faq',
        component: FaqComponent
      },
      {
        path: 'about-us',
        component: AboutUsComponent
      },
 
      {
        path: 'privacy-policy',
        component: PrivacyPolicyComponent
      },
      {
        path: 'terms-conditions',
        component: TermsConditionsComponent,
       
      },
      {
        path: 'my-account',
        loadChildren: './my-account/my-account.module#MyAccountModule'
      },
      {
        path: 'chemist-account',
        loadChildren: './chemist-account/chemist-account.module#ChemistModule'
      },
      {
        path: 'qr',
        component: QrComponent
      },
      {
        path: 'thank-you',
        component: ThankYouComponent
      },
      
      {
        path: 'media',
        component: MediaReleaseComponent
      },
      {
        path: 'media-detail',
        component: MediaReleaseDetailComponent
      },
      {
        path: 'contact-us',
        component: ContactUsComponent
      },
      {
        path: 'jobs-and-careers',
        component: JobsAndCareerComponent
      },
      {
        path: 'modify-user-login',
        component: AnonymousAuthenticationComponent
      },
      {
        path: 'no-connection',
        component: NoPageFoundComponent
      },
      {
        path: 'sitemap',
        component: SiteMapComponent
      },
      {
        path: 'prescription-upload',
        component: PrescriptionUploadComponent
      },
      {
        path: 'preview-order',
        component: PreviewOrderComponent
      },
      {
        path: 'how-it-works',
        component: MediaCenterComponent
      },
      {
        path: 'testimonial-detail',
        component: TestimonialDetailComponent
      },
    {path: '**', component: NoPageFoundComponent},
 
  ];
  
  @NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule {
  
  }
  