import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LoadingBarService } from '@ngx-loading-bar/core';
import {Api} from '../../api.service';
import {AppGlobals} from '../../app.global';
import {HeaderComponent} from '../../incl/header/header.component';

declare var $:any;
@Component({
  selector: 'app-stock-enquiry-quotes',
  templateUrl: './stock-enquiry-quotes.component.html',
  styleUrls: ['./stock-enquiry-quotes.component.css']
})
export class StockEnquiryQuotesComponent implements OnInit {

  state:any;
  enquiry:any={'enquiryid':'','entrytype':''};
  respdata:any={
    'address_data':{'address':'','address_id':'','address_type':'','city':'','default_address':'','flat_no':'','full_name':'','landmark':'','mobile':'','pincode':''},
    'all_quotes_data':[],
    'best_deals_data':[],
    'product_data':[],
    'order_data':{'enquiry_id':'','app_confirm_flag':'','delivery_charge':'','delivery_date':'','delivery_time':'','grand_total':'','order_date':'',
                  'order_no':'','order_id':'','order_status':'','sub_total':'','total_discount':'','total_tax':''}
  }
  lists:any=[];     
 constructor(private aroute:ActivatedRoute,private router:Router,private loadingBar:LoadingBarService,private api:Api,public global:AppGlobals,
   ) { this.state=this.global.getAppState()


   }
  ngOnInit() {


    this.enquiry.enquiryid=this.aroute.snapshot.queryParams["enquiryid"];
    this.enquiry.entrytype=this.aroute.snapshot.queryParams["entrytype"];
 
     this.getListing();
     setTimeout(() => {
      $('.list a').removeClass('active');
      $('#stockenquiry').addClass('active');
    }, 20);
  }

  getListing(){
    
    this.loadingBar.start();
    let data;
    data="user_id="+this.state.user.id+"&entry_type=Enquiry"+"&order_id="+this.enquiry.enquiryid;

    this.api.getOrderOrEnquiryDetail(data).subscribe(
      (response) => {
      

        var dt: any = response;
         
        if (dt.status == 200) {
 
         // this.lists=dt.data;
          
          this.setParams(dt);
         
    //      $('.cartListing').fadeIn(500);
        //  this.business_details=
          this.loadingBar.stop();
         

        }
        else if (dt.status == 201) {

       //   this.global.setToast('error','Sorry, no result found');
          this.loadingBar.stop();

        }

      },
      (error) => {

        this.loadingBar.stop();
        //   this.spinnerService.hide();
        console.log('RESPONSE FAILED'); console.log(error)
      }
    );

  }

  setParams(data){

    this.respdata.order_data.order_id=data.order_data.order_id;
    this.respdata.order_data.app_confirm_flag=data.order_data.app_confirm_flag;
    this.respdata.order_data.delivery_charge_id=data.order_data.delivery_charge;
    this.respdata.order_data.delivery_date=data.order_data.delivery_date;
    this.respdata.order_data.delivery_time=data.order_data.delivery_time;
    this.respdata.order_data.grand_total=data.order_data.grand_total;
    this.respdata.order_data.order_date=data.order_data.order_date;
    this.respdata.order_data.order_no=data.order_data.order_no;
    this.respdata.order_data.order_status=data.order_data.order_status;
    this.respdata.order_data.sub_total=data.order_data.sub_total;
    this.respdata.order_data.total_discount=data.order_data.total_discount;
    this.respdata.order_data.total_tax=data.order_data.total_tax;
    this.respdata.order_data.enquiry_id=data.order_data.enquiry_id;
 
    
   // alert(this.respdata.order_data.enquiry_id);
    this.respdata.all_quotes_data=data.all_quotes_data;

    this.respdata.address_data.address_id=data.address_data.address_id;
    this.respdata.address_data.full_name=data.address_data.full_name;
    this.respdata.address_data.mobile=data.address_data.mobile;
    this.respdata.address_data.user_relation_name=data.address_data.user_relation_name;
    this.respdata.address_data.address_type=data.address_data.address_type;
    this.respdata.address_data.default_address=data.address_data.default_address;
    this.respdata.address_data.flat_no=data.address_data.flat_no;
    this.respdata.address_data.address=data.address_data.address;
    this.respdata.address_data.landmark=data.address_data.landmark;
    this.respdata.address_data.state=data.address_data.state;
    this.respdata.address_data.city=data.address_data.city;
    this.respdata.address_data.pincode=data.address_data.pincode;

    this.respdata.best_deals_data=data.best_deals_data;
    this.respdata.product_data=data.product_data;
  }


}
