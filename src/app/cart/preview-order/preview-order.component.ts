import { Component, OnInit, ViewChild } from '@angular/core';
import { HeaderComponent } from '../../incl/header/header.component';
import { Api } from '../../api.service';
import { AppGlobals } from '../../app.global';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { Router } from '@angular/router';
import { PopupComponent } from '../../popup/popup.component';
declare var $: any;
 
declare var FgGallery: any;
declare var window: any;
@Component({
  selector: 'app-preview-order',
  templateUrl: './preview-order.component.html',
  styleUrls: ['./preview-order.component.css']
})
export class PreviewOrderComponent implements OnInit {

  galleryinit:any;

  

  @ViewChild('popupchild') popup: PopupComponent;
  state: any;
  cartdata: any = {
    'user_id': '',
    'session_id': '',
    'user_type_id': '',
    'entry_type': 'Enquiry',
    'address_id': '',
    'latitude': '',
    'longitude': '',
    'preference_id': '0',
    'delivery_type': '0',
    'delivery_date': '',
    'delivery_time': '',
    'payment_method': '12',
    'minimum_order_amount': '0',
    'is_prescrip_valid':false,
    'prescription_status':''
  };


  status: any = {
    'is_process': false, 'is_sent': false, 'process_txt': 'Please wait..we are sending your enquiry.!',
    'sent_txt': 'Thank you for ordering with your nearby chemist. We will confirm your order soon!',
    'is_confirm_popup': false, 'confirm_txt': 'Are you sure you want to go ahead with this order?', 'is_order_confirmed': false
  };

  @ViewChild('child')
  private child: HeaderComponent;

  
  constructor(private api: Api, public global: AppGlobals, private loadingBar: LoadingBarService, private router: Router) {
     this.state = this.global.getAppState();
    
    }

  ngOnInit() {

 
    this.loadCartData();
    $("html, body").animate({ scrollTop: 0 }, "slow");
  }

  
  loadCartData() {

    
   
    // if (this.state.is_logged_in == false ) {

    //   this.global.setToast('error','Please login or register');

    // }
    // this.state.cartdata.preview.delivery_type = this.cartdata.delivery_type;
    // this.state.cartdata.preview.default_fullname =this.respdata.default_addr.default_fullname;
    // this.state.cartdata.preview.default_addr = this.respdata.default_addr.default_addr;
    // this.state.cartdata.preview.default_mobile = this.respdata.default_addr.default_mobile;
    // this.state.cartdata.preview.items=this.state.cartdata.items;
    // this.state.cartdata.preview.prescription_arr =this.state.cartdata.prescription_arr;


    // else {
    let direct_enquiry: any = 0;
    if (this.state.vendor_id != 0) {
      direct_enquiry = 1;

    }


    //    this.loadingBar.start();
    let data;
    if (this.state.is_logged_in) {

      data = "session_id=" + this.state.cartdata.session_id + "&user_id=" + this.state.user.id + "&direct_enquiry=" + direct_enquiry + "&vendor_id=" + this.state.vendor_id;;
    }
    else if (!this.state.is_logged_in) {
      data = "session_id=" + this.state.cartdata.session_id + "&user_id=" + "&direct_enquiry=" + direct_enquiry + "&vendor_id=" + this.state.vendor_id;;
    }



    //  let data = "session_id=" + this.state.cartdata.session_id + "&user_id="+(this.state.is_logged_in)?this.state.user.id:'';
    this.api.fetchCartData(data).subscribe(
      (response) => {

        let state = this.global.getAppState();
        this.loadingBar.stop();

        var dt: any = response;

        //    this.global.setToast('info',dt.message);


        if (dt.status == 200) {


          if (dt.net_payble_amount < dt.minimum_order_amount) {

            state.minimum_order_amount = dt.minimum_order_amount;
            this.global.saveAppState(state);
            this.router.navigate(['/cart-step-one']);

          }
          else {
            //      this.global.setToast('info', dt.message);
            let cdta = dt.data;

            cdta.map(elem => {
              if (parseInt(elem.product_qty) < 1) {

                let qty = parseInt(elem.product_qty);
                qty = qty + 1;

                elem.product_qty = qty.toString();
              }
            });

            // this.cartdata = cdta;
            // this.cart.cart_amount = dt.cart_amount;
            // console.log('CART AMT');
            // console.log(this.cart.cart_amount);
            // this.cart.delivery_amount = dt.delivery_amount;
            // this.cart.gross_amount = dt.gross_amount;
            // this.cart.items = this.cartdata;




            state.cartdata.cart_amount = dt.cart_amount;
            state.cartdata.cartcount = dt.cart_count;
            state.cartdata.delivery_amount = dt.delivery_amount;
            state.cartdata.gross_amount = dt.cart_amount;
            state.cartdata.customer_discount_wallet = dt.customer_discount_wallet;
            state.cartdata.customer_discount_wallet_amount = dt.customer_discount_wallet_amount;
            state.cartdata.lead_plan_detail_id = dt.lead_plan_detail_id;
            state.cartdata.lead_plan_id = dt.lead_plan_id;
            state.cartdata.net_payble_amount = dt.net_payble_amount;
            state.minimum_order_amount = dt.minimum_order_amount;
            state.cartdata.apc_cash_used = dt.apc_cash_used;
            state.cartdata.items = dt.data;
            state.cartdata.prescription_status=dt.prescription_status;

            this.cartdata.is_prescrip_valid=true;
            setTimeout(() => {
              this.galleryinit = new FgGallery('.fg-gallery', {
                cols: 1,
                style: {
                  'width': '150px',
                  'border': '2px solid #009788',
                  'height': '130px',
                 'padding':'5px',
                }
              })
        
              
            }, 200);
            state.cartdata.session_id = dt.session_id;

            this.state.cartdata = state.cartdata;
//            this.child.cartcount = dt.data.length;

            console.log('FINAL STATE');
         //   console.log(this.state);
            //   this.global.saveAppState(state);

            // else if(state.cartdata.minimum_order_amount == undefined){

            //   this.router.navigate(['/cart-step-one']);
            // }


            //this.state.cartdata.itemst=this.cart;
            this.loadData();
         
          }




        }
        else if (dt.status == 201) {


        }





      },
      (error) => {


        console.log('RESPONSE FAILED'); console.log(error)
      }
    );


    // }

  }
  loadData() {

    // this.loadingBar.start();

    // let data = "&user_id=" + this.state.user.id;
    // this.api.getDateTimeSlots(data).subscribe(
    //   (response) => {


    //     this.loadingBar.stop();

    //     var dt: any = response;

    //  //   console.log(dt);

    //     //    this.global.setToast('info',dt.message);

    //     if (dt.status == 200) {

    //   //    this.setMaintenanceParams(dt);
    //       //   this.respdata.maintenance.maintenance_status=dt.maintenance_status;
    //       //  // this.respdata.maintenance.maintenance_status=0;
    //       //   this.respdata.maintenance.maintenance_status_heading=dt.maintenance_status_heading;
    //       //   this.respdata.maintenance.maintenance_status_message=dt.maintenance_status_message;

    //   //    this.respdata.dayslots = dt.dayslots;
    //       let tarr = dt.time_arr;
    //       let timearr: any = tarr.map(elem => {

    //         // alert(JSON.stringify(elem));
    //         elem['is_available'] = '0';
    //       });

    //    //   this.onLoadTimeValidate(tarr)
    //       //  this.respdata.time_arr = tarr;


    // //      this.respdata.payment_modes = dt.payment_modes;
    //       this.cartdata.delivery_type = '0';
         
    //       $('#dropathome').addClass('active');


    //       if (dt.default_addr.id != undefined) {

    //         // this.respdata.id = dt.id;
    //         // this.respdata.default_addr.id = dt.default_addr.id;
    //         // this.respdata.default_addr.default_addr = dt.default_addr.default_addr;
    //         // this.respdata.default_addr.default_fullname = dt.default_addr.default_fullname;
    //         // this.respdata.default_addr.default_mobile = dt.default_addr.default_mobile;

           
            
    //         this.cartdata.address_id = dt.default_addr.id;
    //         this.cartdata.latitude = this.state.userloc.lat.toString();
    //         this.cartdata.longitude = this.state.userloc.long.toString();

    //       }

    //       //  this.child.cartCountEvent();
    //       //console.log(this.child.cartCountEvent());


    //     }
    //     else if (dt.status == 201) {


    //     }





    //   },
    //   (error) => {


    //     console.log('RESPONSE FAILED'); console.log(error)
    //   }
    // );

  }

  onSubmitEnquiry() {


    if (this.status.is_order_confirmed == false) {

      this.popup.onReceivePopupData({'type':'confirm','confirm_txt':'Are you sure you want to go ahead with this order?','primary_btn_txt':'Confirm','secondary_btn_txt':'Close'});
    }
    else {

      this.setPrescriptionData();
      this.popup.onReceivePopupData({'type':'process','confirm_txt':'We are sending your order to your nearby chemist.','primary_btn_txt':'Yes, Confirm It','secondary_btn_txt':'Close It'});
      this.status.is_process = true;
      this.cartdata.session_id = this.state.cartdata.session_id;
      this.cartdata.user_id = this.state.user.id;
      this.cartdata.user_type_id = this.state.user.user_type_id;

      let directenquiry = 0;
      if (this.state.vendor_id != 0) {
        directenquiry = 1;
      }
 
   
    //  this.loadingBar.start();

      let data = "user_id=" + this.cartdata.user_id + "&session_id=" + this.cartdata.session_id + "&user_type_id=" + this.cartdata.user_type_id +
        "&entry_type=" + this.cartdata.entry_type + "&address_id=" + this.state.cartdata.preview.address_id + "&latitude=" +this.state.cartdata.preview.latitude +
        "&longitude=" + this.state.cartdata.preview.longitude + "&preference_id=" + this.cartdata.preference_id + "&delivery_type=" + this.state.cartdata.preview.delivery_type +
        "&delivery_date=" + this.state.cartdata.preview.delivery_date + "&delivery_time=" +this.state.cartdata.preview.delivery_time + "&payment_method=" + this.cartdata.payment_method +
        "&vendor_id=" + this.state.vendor_id + "&direct_enquiry=" + directenquiry + "&lead_plan_detail_id=" + this.state.cartdata.lead_plan_detail_id +
        "&customer_discount_wallet_amount=" + this.state.cartdata.customer_discount_wallet_amount + "&net_payble_amount=" + this.state.cartdata.net_payble_amount +
        "&total_product_discount_amount=" + this.state.cartdata.total_product_discount_amount + "&order_via=0" + "&apc_cash_used=" + this.state.cartdata.apc_cash_used+
        "&prescription_file="+this.state.cartdata.preview.prescription_file+"&prescription_file1="+this.state.cartdata.preview.prescription_file1+
        "&prescription_file2="+this.state.cartdata.preview.prescription_file2+"&prescription_status="+this.state.cartdata.prescription_status;
      
  
        
         console.log(data);
         
        this.generateEnquiry(data);
        this.state.cartdata.cartcount = 0;
        this.state.cartdata.vendor_id = 0;
        this.child.cartcount = 0;
        
        this.state.is_show_thankyou=1;
        this.state.cartdata.preview.prescription_file='';
        this.state.cartdata.preview.prescription_file1='';
        this.state.cartdata.preview.prescription_file2='';
        
        this.state.cartdata.prescription_arr=[];
        this.global.saveAppState(this.state);
           setTimeout(() => {
            this.router.navigate(['/thank-you'],{queryParams:{'page':'order'}});
          }, 200);
    }

  }

  generateEnquiry(data){
    this.api.generateEnquiry(data).subscribe(

      (response) => {


        this.loadingBar.stop();

        var dt: any = response;

      console.log(dt);
   
        if (dt.status == 200) {

          this.onAssignOrderToVendor({'order_id':dt.order_id,'user_id':dt.user_id});
        
        //  this.popup.onReceivePopupData({ 'type': '' });
       //   this.popup.onReceivePopupData({'type':'success','sent_txt':'Thank you for ordering with your nearby chemist. We will confirm your order soon.!','primary_btn_txt':'Go to Order','secondary_btn_txt':'Go to Home'});
          // this.global.setToast('info', dt.message);
 
          // setTimeout(() => {
          //   this.router.navigate(['/thank-you'],{queryParams:{'page':'order'}});
          // }, 200);
          // this.status.is_process = true;
          // this.status.is_sent = true;

      
        
        //  this.router.navigate(['/thank-you']);
          // this.popup.onReceivePopupData({ 'type': '' });
          // this.popup.onReceivePopupData({'type':'success','sent_txt':'Thank you for ordering with your nearby chemist. We will confirm your order soon.!','primary_btn_txt':'Go to Order','secondary_btn_txt':'Go to Home'});
          // // this.global.setToast('info', dt.message);
          // this.state.cartdata.cartcount = 0;
          // this.state.cartdata.vendor_id = 0;
          // this.child.cartcount = 0;
          // this.global.saveAppState(this.state);
          // // setTimeout(() => {
          // //   this.router.navigate(['/home']);
          // // }, 20);
          // this.status.is_process = true;
          // this.status.is_sent = true;


        }
        else if (dt.status == 201) {

          this.router.navigate(['/cart-step-one']);
        }

      },
      (error) => {
        this.global.setToast('erro', 'Server error..please try after some time');
        console.log('RESPONSE FAILED'); console.log(error)
      }
    );

  }

  setPrescriptionData(){

    for(let i=0;i<this.state.cartdata.preview.prescription_arr.length;i++){

      if(i==0){
        this.state.cartdata.preview.prescription_file=this.state.cartdata.preview.prescription_arr[i].prescription_file;
      }
      else{
        this.state.cartdata.preview.prescription_file='';
      }
      if(i==1){
    
        this.state.cartdata.preview.prescription_file1=this.state.cartdata.preview.prescription_arr[i].prescription_file;
      }
      else{
        this.state.cartdata.preview.prescription_file1='';
      }
      if(i==2){
        
        this.state.cartdata.preview.prescription_file2=this.state.cartdata.preview.prescription_arr[i].prescription_file;
      }
      else{
        this.state.cartdata.preview.prescription_file2='';
      }
    }
    // this.state.cartdata.preview.prescription_arr.forEach((elem,idx) => {
      
    //   if(idx==0){
       
    //     this.state.cartdata.preview.prescription_file=(elem.prescription_file!=undefined)?elem.prescription_file:'';

    //   }
    //    if(idx==1){
   
    //     this.state.cartdata.preview.prescription_file1=(elem.prescription_file!=undefined)?elem.prescription_file:'';
        
    //   }
    //    if(idx==2){
         
    //     this.state.cartdata.preview.prescription_file2=(elem.prescription_file!=undefined)?elem.prescription_file:'';
        
    //   }
    // });
  }
  onAssignOrderToVendor(odata:any){
  
     
    let data:any="order_id="+odata.order_id+"&user_id="+odata.user_id;
    console.log(data);
    this.api.assignEnquiryToVendor(data).subscribe(

      (response) => {

 
        var dt: any = response;
         console.log('FINAL ORDER');
         console.log(dt);
        
        if (dt.status == 200) {

 

        }
        else if (dt.status == 201) {


        }

      },
      (error) => {
        this.global.setToast('erro', 'Server error..please try after some time');
        console.log('RESPONSE FAILED'); console.log(error)
      }
    );



  }

  onPopupActionReceived(obj:any) {
    //  console.log(obj);
      if(obj.mode=='confirm'){
  
        if (obj.type == 0) {
  
          this.popup.onReceivePopupData({ 'type': '' });
    
        }
        else if (obj.type == 1) {
  
          this.popup.onReceivePopupData({ 'type': '' });
          this.status.is_order_confirmed=1;
          this.onSubmitEnquiry();
          //on primary btn clicked...
    
        }
   
      }
      else if(obj.mode=='success'){
      
        // if (obj.type == 0) {
  
        //   //Go To Order
         
        //   this.popup.onReceivePopupData({ 'type': '' });
        //   this.onRedirect('my-enquiries');
        // }
        // else if (obj.type == 1) {
  
        //   this.onRedirect('home')
        //   //on primary btn clicked...
    
        // }
      }
   
  
      //console.log(event);
    }

    onRemoveFromDirectOrder(){

      this.state.vendor_id = 0;
      this.global.saveAppState(this.state);
      this.loadCartData();
    }
  
  onNext(){


  }
}
