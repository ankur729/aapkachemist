import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute  } from '@angular/router';
import { LoadingBarService } from '@ngx-loading-bar/core';
import {Api} from '../../api.service';
import {AppGlobals} from '../../app.global';
declare var classie:any;
declare var $:any;


@Component({
  selector: 'app-stock-enquiry-detail',
  templateUrl: './stock-enquiry-detail.component.html',
  styleUrls: ['./stock-enquiry-detail.component.css']
})
export class StockEnquiryDetailComponent implements OnInit {

  state: any;
  enquiry: any = {
    'enquiry_id': '',
    'reply_status': '',
    'enquiry_detail': { 'order_id': '', 'order_no': '', 'total_discount': '', 'sub_total': '', 'grand_total': '', 'order_date': '', 'payment_method': '', 'delivery_date': '', 'delivery_time': '', 'delivery_type': '', 'delivery_charge': '', 'vendor_name': '', 'vendor_id': '', 'app_confirm_flag': '','area':'','enquiry_original_grand_total':''  },
    'enquiry_item_detail': [],
    'shipping_detail': { 'name': '', 'address': '' }

  };
  status: any = { 'is_process': false, 'is_sent': false, 'process_txt': 'Please wait..we are confirming your order.!', 'sent_txt': 'Thank you.! your order is confirmed.',
                  'is_confirm_popup':false, 'confirm_txt':'Are you sure to confirm your order ?'};
                  
  address: any = { 'enquiry_id': '', 'address_data': { 'address': '', 'pincode': '' }, 'user_type': '', 'full_name': '', 'mobile': '', 'address': '', 'landmark': '', 'state': '', 'city': '', 'pincode': '', 'makeitdefault': '0', 'address_type': '' };
  constructor(private api: Api, private loadingBar: LoadingBarService, public global: AppGlobals, private router: Router, private aroute: ActivatedRoute) { this.state = this.global.getAppState(); }

  ngOnInit() {

    this.enquiry.enquiry_id = this.aroute.snapshot.queryParams["enquiryid"];
    this.enquiry.reply_status = this.aroute.snapshot.queryParams["reply_status"];
    this.getEnquiryDetailById();  
    setTimeout(() => {
      $('.list a').removeClass('active');
      $('#stockenquiry').addClass('active');
    }, 20);
  }


  getEnquiryDetailById() {

    this.loadingBar.start();
    let data = "enquiry_id=" + this.enquiry.enquiry_id + "&reply_status=" + this.enquiry.reply_status + "&enquiry_order_type=0";
    
    this.api.getVendorEnquiryDetail(data).subscribe(
      (response) => {


        var dt: any = response;
        if (dt.status == "200") {

          this.setParams(dt.data);
          // let addr=dt.data[0];
          // this.address.address_id=addr.address_id;
          // this.address.full_name=addr.full_name;
          // this.address.mobile=addr.mobile;
          // this.address.address=addr.address;
          // this.address.landmark=addr.landmark;
          // this.address.state=addr.state;
          // this.address.city=addr.city;
          // this.address.pincode=addr.pincode;
          // this.address.address_type=addr.address_type;

          //  this.order=dt.order_data;
          // this.isvalid=true;
        }


        else if (dt.status == "201") {

          // console.log(dt.data);
          //   history.go(-1);
          //  this.global.setToast('error',this.global.toastmsg.login_invalid);

        }
        //  console.log(dt);

        this.loadingBar.stop();



      },
      (error) => {

        //   $('.preloader').fadeOut();
        //   this.spinnerService.hide();
        console.log('RESPONSE FAILED'); console.log(error)
      }
    );

  }

  setParams(data) {
 
    this.enquiry.enquiry_detail.order_id = data.enquiry_detail.order_id;
    this.enquiry.enquiry_detail.order_no = data.enquiry_detail.order_no;
    this.enquiry.enquiry_detail.total_discount = data.enquiry_detail.total_discount;
    this.enquiry.enquiry_detail.sub_total = data.enquiry_detail.sub_total;
    this.enquiry.enquiry_detail.grand_total = data.enquiry_detail.grand_total;
    this.enquiry.enquiry_detail.order_date = data.enquiry_detail.order_date;
    this.enquiry.enquiry_detail.payment_method = data.enquiry_detail.payment_method;
    this.enquiry.enquiry_detail.delivery_date = data.enquiry_detail.delivery_date;
    this.enquiry.enquiry_detail.delivery_time = data.enquiry_detail.delivery_time;
    this.enquiry.enquiry_detail.delivery_type = data.enquiry_detail.delivery_type;
    this.enquiry.enquiry_detail.delivery_charge = data.enquiry_detail.delivery_charge;
    this.enquiry.enquiry_detail.vendor_name = data.enquiry_detail.vendor_name;
    this.enquiry.enquiry_detail.vendor_id = data.enquiry_detail.vendor_id;
    this.enquiry.enquiry_detail.app_confirm_flag = data.enquiry_detail.app_confirm_flag;
    this.enquiry.enquiry_detail.area = data.enquiry_detail.area;
    this.enquiry.enquiry_detail.enquiry_original_grand_total = data.enquiry_detail.enquiry_original_grand_total;
    
    this.enquiry.enquiry_item_detail = data.enquiry_item_detail;

    this.enquiry.shipping_detail.name = data.shipping_detail.name;
    this.enquiry.shipping_detail.address = data.shipping_detail.address;

  }

  onConfirmOrder() {

    //   this.loadingBar.start();
    if(this.enquiry.enquiry_detail.app_confirm_flag =='0'){

      if(!this.status.is_confirm_popup){
        this.status.is_confirm_popup=!this.status.is_confirm_popup;
      }
      else{
        
        this.status.is_confirm_popup=false;
        this.status.is_process=true;
  

      let data = "user_id=" + this.state.user.id + "&order_id=" + this.enquiry.enquiry_detail.order_id + "&enquiry_id=" + this.enquiry.enquiry_id + "&vendor_id=" + this.enquiry.enquiry_detail.vendor_id;
     
      this.api.confirmOrder(data).subscribe(
        (response) => {
  
      
  
          var dt: any = response;
          if (dt.status == "200") {
            this.status.is_sent=true;
            //     this.setParams(dt.data);
            // this.global.setToast('info', dt.message);
            // this.router.navigate(['/my-account/enquires']);
  
          }
  
  
          else if (dt.status == "201") {
  
  
  
          }
  
  
          this.loadingBar.stop();
  
  
  
        },
        (error) => {
  
  
          console.log('RESPONSE FAILED'); console.log(error)
        }
      );
    }
  
  }
  }
  onClose(type){

    if(type=='enquiryprocess'){
      this.router.navigate(['/chemist-account/stock-enquiry']);
      this.status.is_process=false;

    }
    else if(type=='confirmprocess'){
     
     
      this.status.is_confirm_popup=false;
      
    }

  }
}
