import { Component, OnInit } from '@angular/core';
import { AppGlobals } from '../../../app.global';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { Router,ActivatedRoute } from '@angular/router';
import { Api } from '../../../api.service';
declare var $: any;

@Component({
  selector: 'app-offer-list',
  templateUrl: './offer-list.component.html',
  styleUrls: ['./offer-list.component.css']
})
export class OfferListComponent implements OnInit {

  state:any;
  offers:any=[];

  constructor(public global: AppGlobals, private loadingBar: LoadingBarService, 
    private router: Router, private api: Api,private aroute:ActivatedRoute) { this.state = this.global.getAppState(); }

  ngOnInit() {
    this.loadMyOffers();

    setTimeout(() => {

      $('.list a').removeClass('active');
      $('#offers').addClass('active');
    }, 20);


  }

  loadMyOffers(){

    this.loadingBar.start();

    let data = "user_id="+this.state.user.id ;
  
    /// console.log(this.address);
    this.api.getVendorOffersList(data).subscribe(
      (response) => {
     
        var dt: any = response;

        console.log(dt);
        //  this.enquires=enquiries;
     //   this.global.setToast('info', dt.message);

        if (dt.status == 200) {

          this.offers=dt.data;
          // this.wallet.lists=dt.data;
          // this.wallet.balance=dt.balance;
       //   this.global.setToast('info', dt.message);

        }
        else if (dt.status == 201) {

          // this.is_result_get=false;
          // this.searchresp=[];
        }

        this.loadingBar.stop();



      },
      (error) => {

        this.loadingBar.stop();
        console.log('RESPONSE FAILED'); console.log(error)
      }
    );
  }

}
