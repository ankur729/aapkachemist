import { Component, OnInit, ViewChild } from '@angular/core';
import { HeaderComponent } from '../../incl/header/header.component';
import { Api } from '../../api.service';
import { AppGlobals } from '../../app.global';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { Router } from '@angular/router';
import { PopupComponent } from '../../popup/popup.component';
declare var $: any;

@Component({
  selector: 'app-cart2',
  templateUrl: './cart2.component.html',
  styleUrls: ['./cart2.component.css']
})
export class Cart2Component implements OnInit {

  isdeliveryaddrchoose: boolean = false;
  state: any;
  respdata: any = { 'dayslots': [], 'default_addr': { 'id': '', 'default_addr': '','default_fullname':'','default_mobile':'' }, 'time_arr': [], 'payment_modes': [], 'maintenance': { 'maintenance_status': '0', 'maintenance_status_message': '', 'maintenance_status_heading': '' }, 'is_date_switched': '0','d_date_right':'','d_time_right':'' };
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
    'minimum_order_amount': '0'
  };
  status: any = {
    'is_process': false, 'is_sent': false, 'process_txt': 'Please wait..we are sending your enquiry.!',
    'sent_txt': 'Thank you for ordering with your nearby chemist. We will confirm your order soon!',
    'is_confirm_popup': false, 'confirm_txt': 'Are you sure you want to go ahead with this order?', 'is_order_confirmed': false
  };

  cart: any = { 'cart_amount': '', 'delivery_amount': '', 'cart_count': '', 'gross_amount': '', 'items': [], 'customer_discount_wallet': '', 'lead_plan_detail_id': '', 'lead_plan_id': '', 'customer_discount_wallet_amount': '' };

  @ViewChild('child')
  private child: HeaderComponent;
  @ViewChild('popupchild') popup: PopupComponent;

  constructor(private api: Api, public global: AppGlobals, private loadingBar: LoadingBarService, private router: Router) { this.state = this.global.getAppState(); }

  ngOnInit() {




    if (this.state.cartdata.cartcount == 0) {
      this.router.navigate(['/home']);
    }
    else {

      this.loadCartData();
      //this.loadData();
    }
    //  this.child.cartcount=this.state.cartdata.cartcount;
    $("html, body").animate({ scrollTop: 0 }, "slow");
  }

  onChangeAddress() {

    this.isdeliveryaddrchoose = !this.isdeliveryaddrchoose;




  }

  loadCartData() {

    // if (this.state.is_logged_in == false ) {

    //   this.global.setToast('error','Please login or register');

    // }

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


            state.cartdata.session_id = dt.session_id;

            this.state.cartdata = state.cartdata;
            this.child.cartcount = dt.data.length;


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

    this.loadingBar.start();

    let data = "&user_id=" + this.state.user.id;
    this.api.getDateTimeSlots(data).subscribe(
      (response) => {


        this.loadingBar.stop();

        var dt: any = response;

     //   console.log(dt);

        //    this.global.setToast('info',dt.message);

        if (dt.status == 200) {

          this.setMaintenanceParams(dt);
          //   this.respdata.maintenance.maintenance_status=dt.maintenance_status;
          //  // this.respdata.maintenance.maintenance_status=0;
          //   this.respdata.maintenance.maintenance_status_heading=dt.maintenance_status_heading;
          //   this.respdata.maintenance.maintenance_status_message=dt.maintenance_status_message;

          this.respdata.dayslots = dt.dayslots;
          let tarr = dt.time_arr;
          let timearr: any = tarr.map(elem => {

            // alert(JSON.stringify(elem));
            elem['is_available'] = '0';
          });

          this.onLoadTimeValidate(tarr)
          //  this.respdata.time_arr = tarr;


          this.respdata.payment_modes = dt.payment_modes;
          this.cartdata.delivery_type = '0';
         
          $('#dropathome').addClass('active');


          if (dt.default_addr.id != undefined) {

            this.respdata.id = dt.id;
            this.respdata.default_addr.id = dt.default_addr.id;
            this.respdata.default_addr.default_addr = dt.default_addr.default_addr;
            this.respdata.default_addr.default_fullname = dt.default_addr.default_fullname;
            this.respdata.default_addr.default_mobile = dt.default_addr.default_mobile;

           
            
            this.cartdata.address_id = dt.default_addr.id;
            this.cartdata.latitude = this.state.userloc.lat.toString();
            this.cartdata.longitude = this.state.userloc.long.toString();

          }

          //  this.child.cartCountEvent();
          //console.log(this.child.cartCountEvent());


        }
        else if (dt.status == 201) {


        }





      },
      (error) => {


        console.log('RESPONSE FAILED'); console.log(error)
      }
    );

  }

  toggleDeliveryOptions(type) {

    $('.checkmark').removeClass('active');


    if (type == '1') {
      this.cartdata.delivery_type = '1';
      $('#pickfromshop').addClass('active');
    }
    else if (type == '0') {
      this.cartdata.delivery_type = '0';
      $('#dropathome').addClass('active');
     
    }



  }

  setDayTimeSlots(type, datetime) {

    //console.log(datetime);
    if (type == 'date') {

      $('.day_list').removeClass('active');
      var str = '#' + datetime.day + datetime.weekday;

    
      

      $(str).addClass('active');



     // $(str).addClass('active');



      this.cartdata.delivery_date = datetime.year + "-" + datetime.month + "-" + datetime.day;

      if (this.cartdata.delivery_date != this.currentDate()) {
        this.respdata.time_arr.map(elem => {

          elem.is_available = '1';
        })
      }
      else if (this.cartdata.delivery_date == this.currentDate()) {

        this.onLoadTimeValidate(this.respdata.time_arr);
        $('.TimeSlot .list').removeClass('active');
        this.cartdata.delivery_time = '';
      }

      this.respdata.d_date_right= this.getMonthNameFromNumber(datetime.month)+" "+datetime.year;
        this.respdata.d_time_right= datetime.day+" "+this.getMonthNameFromNumber(datetime.month);

    }
    else if (type == 'time') {


      if (this.validateTime(datetime)) {
        $('.time_list').removeClass('active');
        var str = '#time_' + datetime.id;




        $(str).addClass('active');
        this.cartdata.delivery_time = datetime.time_from + "-" + datetime.time_to;
      }
      var d = new Date();




    }

  }

  validateTime(datetime) {

    var d = new Date();
    let currenthour = d.getHours();

    if (this.cartdata.delivery_date == '') {

    }

    else {

      if (this.cartdata.delivery_date == this.currentDate() && this.respdata.is_date_switched == 0) {

        let selectedhour = datetime.time_from.split(':');
        selectedhour = parseInt(selectedhour);


        if (selectedhour <= currenthour) {

          this.global.setToast('error', 'Sorry, this time slot is not available');
          return false;

        }
        else {

          return true;

        }

      }
      else {

        return true;

      }

    }
  }

  onLoadTimeValidate(time_arr) {


    var d = new Date();
    let currenthour = d.getHours();


    let selectedhour: any = '';

    time_arr.map(elem => {

      selectedhour = elem.time_from.split(':');
      selectedhour = parseInt(selectedhour);
      if (selectedhour <= currenthour) {

        elem.is_available = '0';

        //   return false;

      }
      else {

        elem.is_available = '1';

        this.respdata.d_date_right= this.getMonthNameFromNumber(this.respdata.dayslots[0].month)+" "+this.respdata.dayslots[0].year;
        this.respdata.d_time_right= this.respdata.dayslots[0].day+" "+this.getMonthNameFromNumber(this.respdata.dayslots[0].month);
  
        // return true;
      }

    });


    this.cartdata.delivery_date = this.currentDate();
    this.respdata.time_arr = time_arr;

    let tcount = 0;
    this.respdata.time_arr.map(elem => {

      if (elem.is_available > 0) {
        tcount = tcount + 1;

      }
    });
    if (tcount == 0) {
      this.respdata.is_date_switched = '1';
      this.respdata.dayslots.splice(0, 1);
      this.respdata.d_date_right= this.getMonthNameFromNumber(this.respdata.dayslots[0].month)+" "+this.respdata.dayslots[0].year;
      this.respdata.d_time_right= this.respdata.dayslots[0].day+" "+this.getMonthNameFromNumber(this.respdata.dayslots[0].month);
      this.respdata.time_arr.map(elem => {

        elem.is_available = '1';

      });
    }



  }

  navigate(field) {


    if (field == 'add-address') {

      if (this.state.user.user_type_id != '1' && this.state.user.user_type_id != '0') {


        this.router.navigate(['/chemist-account/add-address'], { queryParams: { redirecturl: 'cart-step-two' } })


      }
      else if (this.state.user.user_type_id == '1') {


        this.router.navigate(['/my-account/add-member'], { queryParams: { redirecturl: 'cart-step-two' } })
      }


    }

    else if (field == 'select-address') {

      this.router.navigate(['/cart-step-three'])
    }
  }

  setPaymentMode(mode) {



    $('.choose_btn').removeClass('active');

    let str = "#mode_" + mode.id;
    $(str).addClass('active');
    this.cartdata.payment_method = mode.id;

  }

  onAssignEnquiryToVendor(data){

    

  }

  onSubmitEnquiry() {



    if (!this.validateBeforeEnquiry()) {


    }
    else if (this.status.is_order_confirmed == false) {

      this.popup.onReceivePopupData({'type':'confirm','confirm_txt':'Are you sure you want to go ahead with this order?','primary_btn_txt':'Confirm','secondary_btn_txt':'Close'});
    }
    else {

      this.popup.onReceivePopupData({'type':'process','confirm_txt':'We are sending your order to your nearby chemist.','primary_btn_txt':'Yes, Confirm It','secondary_btn_txt':'Close It'});
      this.status.is_process = true;
      this.cartdata.session_id = this.state.cartdata.session_id;
      this.cartdata.user_id = this.state.user.id;
      this.cartdata.user_type_id = this.state.user.user_type_id;

      let directenquiry = 0;
      if (this.state.vendor_id != 0) {
        directenquiry = 1;
      }


      this.loadingBar.start();

      let data = "user_id=" + this.cartdata.user_id + "&session_id=" + this.cartdata.session_id + "&user_type_id=" + this.cartdata.user_type_id +
        "&entry_type=" + this.cartdata.entry_type + "&address_id=" + this.cartdata.address_id + "&latitude=" + this.cartdata.latitude +
        "&longitude=" + this.cartdata.longitude + "&preference_id=" + this.cartdata.preference_id + "&delivery_type=" + this.cartdata.delivery_type +
        "&delivery_date=" + this.cartdata.delivery_date + "&delivery_time=" + this.cartdata.delivery_time + "&payment_method=" + this.cartdata.payment_method +
        "&vendor_id=" + this.state.vendor_id + "&direct_enquiry=" + directenquiry + "&lead_plan_detail_id=" + this.state.cartdata.lead_plan_detail_id +
        "&customer_discount_wallet_amount=" + this.state.cartdata.customer_discount_wallet_amount + "&net_payble_amount=" + this.state.cartdata.net_payble_amount +
        "&total_product_discount_amount=" + this.state.cartdata.total_product_discount_amount + "&order_via=0" + "&apc_cash_used=" + this.state.cartdata.apc_cash_used;
      

      this.api.generateEnquiry(data).subscribe(

        (response) => {


          this.loadingBar.stop();

          var dt: any = response;

         // console.log(dt);
          if (dt.status == 200) {

            this.onAssignOrderToVendor({'order_id':dt.order_id,'user_id':dt.user_id});
          
          //  this.popup.onReceivePopupData({ 'type': '' });
         //   this.popup.onReceivePopupData({'type':'success','sent_txt':'Thank you for ordering with your nearby chemist. We will confirm your order soon.!','primary_btn_txt':'Go to Order','secondary_btn_txt':'Go to Home'});
            // this.global.setToast('info', dt.message);
             this.state.cartdata.cartcount = 0;
             this.state.cartdata.vendor_id = 0;
             this.child.cartcount = 0;
             this.state.is_show_thankyou=1;
             this.global.saveAppState(this.state);
            setTimeout(() => {
              this.router.navigate(['/thank-you'],{queryParams:{'page':'order'}});
            }, 200);
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


          }

        },
        (error) => {
          this.global.setToast('erro', 'Server error..please try after some time');
          console.log('RESPONSE FAILED'); console.log(error)
        }
      );
    }

  }

  onAssignOrderToVendor(odata:any){
  
     
    let data:any="order_id="+odata.order_id+"&user_id="+odata.user_id;
    //console.log(data);
    this.api.assignEnquiryToVendor(data).subscribe(

      (response) => {

 
        var dt: any = response;
   //     console.log('FINAL ORDER');
     //     console.log(dt);
        
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

  validateBeforeEnquiry() {

    if (this.cartdata.address_id.length == 0) {
      this.global.setToast('error', 'Delivery address is required');
      return false;
    }
    else if (this.cartdata.delivery_date.length == 0) {
      this.global.setToast('error', 'Delivery date is required');
      return false;
    }
    else if (this.cartdata.delivery_time.length == 0) {
      this.global.setToast('error', 'Delivery time is required');
      return false;
    }
    else if (this.cartdata.payment_method.length == 0) {
      this.global.setToast('error', 'Payment mode is required');
      return false;
    }
    else {
      return true;
    }
  }
  currentDate() {
    var d = new Date(),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
  }
  onRedirect(type) {

    if (type == 'home') {

      this.router.navigate(['/home']);
    }
    else if (type == 'my-enquiries') {

      if (this.state.user.user_type_id == '1') {

        this.router.navigate(['/my-account/orders'])
      }
      else {
        this.router.navigate(['/chemist-account/stock-enquiry'])
      }
    }
  }

  setMaintenanceParams(data) {

    this.state.maintenance.maintenance_status = data.maintenance_status;
    this.state.maintenance.maintenance_status_heading = data.maintenance_status_heading;
    this.state.maintenance.maintenance_status_message = data.maintenance_status_message;


    this.global.saveAppState(this.state);

  }

  getMonthNameFromNumber(number:any){

    switch(number){

      case "01":return "Jan";break;
      case "02":return "Feb";break;
      case "03":return "March";break;
      case "04":return "April";break;
      case "05":return "May";break;
      case "06":return "Jun";break;
      case "07":return "Jul";break;
      case "08":return "Aug";break;
      case "09":return "Sept";break;
      case "10":return "Oct";break;
      case "11":return "Nov";break;
      case "12":return "Dec";break;
      
    }
  }

  onCloseLaunchPopup() {

    this.router.navigate(['/home']);
    //this.state.maintenance.is_closed_on_home='1';
    //this.global.saveAppState(this.state);
  //  console.log('Close popup request');

  }

  /*  Dynamic Popup Function */
  onConfirmingOrCancelOrder(type: any) {

    if (type == 'confirm') {

      this.status.is_confirm_popup = false;
      this.status.is_order_confirmed = true;
      this.onSubmitEnquiry();
    }
    else if (type == 'cancel') {
      this.status.is_confirm_popup = false;

    }

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
    
      if (obj.type == 0) {

        //Go To Order
       
        this.popup.onReceivePopupData({ 'type': '' });
        this.onRedirect('my-enquiries');
      }
      else if (obj.type == 1) {

        this.onRedirect('home')
        //on primary btn clicked...
  
      }
    }
 

    //console.log(event);
  }

  /*  Dynamic Popup Function */
  // onContinue(){

  //   //preview:{'delivery_type':'0','addr_name':'','addr_str':'','addr_contact':'','items':[],'prescription_arr':[]}


  // }
 
  onNext(){
    
    if (!this.validateBeforeEnquiry()) {


    }
    else{

      this.state.cartdata.preview.delivery_type = this.cartdata.delivery_type;
    
      this.state.cartdata.preview.default_fullname =this.respdata.default_addr.default_fullname;
      this.state.cartdata.preview.default_addr = this.respdata.default_addr.default_addr;
      this.state.cartdata.preview.default_mobile = this.respdata.default_addr.default_mobile;
      this.state.cartdata.preview.items=this.state.cartdata.items;
      this.state.cartdata.preview.prescription_arr =this.state.cartdata.prescription_arr;
      this.state.cartdata.preview.address_id =this.cartdata.address_id;
      this.state.cartdata.preview.latitude =this.cartdata.latitude;
      this.state.cartdata.preview.longitude =this.cartdata.longitude;
      this.state.cartdata.preview.delivery_date =this.cartdata.delivery_date;
      this.state.cartdata.preview.delivery_time =this.cartdata.delivery_time;
   
      this.global.saveAppState(this.state);
  
  
      this.router.navigate(['/preview-order']);
    }
   // preview:{'delivery_type':'0','addr_name':'','addr_str':'','addr_contact':'','items':[],'prescription_arr':[]}
  
  }

}
