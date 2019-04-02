import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute  } from '@angular/router';
import { LoadingBarService } from '@ngx-loading-bar/core';
import {Api} from '../../api.service';
import {AppGlobals} from '../../app.global';
declare var classie:any;
declare var $:any;


@Component({
  selector: 'app-retailer-order-detail',
  templateUrl: './retailer-order-detail.component.html',
  styleUrls: ['./retailer-order-detail.component.css']
})
export class RetailerOrderDetailComponent implements OnInit {

  state:any;
  enquiry:any={
      
    'enquiry_detail':{'enquiry_id':'','order_no':'','order_date':'','payment_method':'','delivery_type':'','delivery_time':'','delivery_date':'','grand_total':''},
    'enquiry_item_detail':[],
    'shipping_detail':{'name':'','address':''}

  }
  constructor(private api:Api,private loadingBar: LoadingBarService,public global:AppGlobals,private router:Router,private aroute:ActivatedRoute) { this.state=this.global.getAppState(); }
  
  ngOnInit() {


   // this.getOrderDetail();
    $("html, body").animate({ scrollTop: 0 }, "slow");
    setTimeout(() => {
      $('.list a').removeClass('active');
      $('#retailerorders').addClass('active');
    }, 20);
  }

  getOrderDetail(){

    let data="user_id="+this.state.user.id+"&data_for=7"+"&user_type_id="+this.state.user.user_type_id;

    this.loadingBar.start();
    this.api.getProfileDetails(data).subscribe(
      (response) => {
      
        let dt: any = response;
        
        this.loadingBar.stop();
         

        if (dt.status == 200) {
          

          this.enquiry.enquiry_detail=dt.enquiry_detail;

      //    this.respdata.mapping_type_list=dt.data.mapping_type_list;
          
          

         

        }
        else if (dt.status == 201) {

        }

      },
      (error) => {

        this.loadingBar.stop();
        //   this.spinnerService.hide();
        console.log('RESPONSE FAILED'); console.log(error)
      }
    );

  }
}
