import { Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
 


declare var $: any;
declare var classie: any;

@Injectable()
export class AppGlobals {
 
 //readonly baseAppUrl: string = 'https://www.anitbrain.in/demo/admin/';
 
//readonly baseAppUrl: string = 'https://www.aapkachemist.com/demoadmin/';
readonly baseAppUrl: string = 'https://www.appchemist.in/demo/admin/';
//readonly baseAppUrl: string = 'https://www.aapkachemist.com/admin/';
  //readonly baseAppUrl: string = 'http://10.15.1.227/aapka_new/';
 // readonly paytmcallbackurl: string = 'https://www.anitbrain.in/demo/paytm/paytmcallbackurl';
  readonly paytmcallbackurl: string = 'https://www.aapkachemist.com/admin/paytm/paytmcallbackurl';
 //readonly paytmcallbackurl: string = 'https://www.aapkachemist.com/demoadmin/paytm/paytmcallbackurl';

 
 //readonly baseAppUrl: string = 'http://192.168.1.3:3000/';

  //  readonly logoutAppUrl: string = 'http://idigities.com/alkauser/#/home/logout';
  //readonly logoutAppUrl: string = 'http://192.168.1.9:4200/#/home/logout';

  readonly apiUrl: string = 'api/';
  readonly sitekeyLocal:string='6LfKcYcUAAAAABG_Yn-l0n28-JXpOdKlu-BG8e7p';
  readonly sitekeyLive:string='6LcHcIcUAAAAAEB4hx5-TUHuJqX2PSJRbU2XV-Qc';
  //  readonly webSocketUrl:string='192.168.1.3:2000';
  //readonly webSocketUrl:string='173.212.239.217:2000';

  readonly imgUrl_thumb: string = this.baseAppUrl + 'public/uploads/images/thumb/';
  readonly imgUrl_large: string = this.baseAppUrl + 'public/uploads/images/large/';
  readonly imgUrl_medium: string = this.baseAppUrl + 'public/uploads/images/medium/';
  readonly imgUrl_raw: string = this.baseAppUrl + 'public/uploads/images/raw/';
  readonly imgUrl_small: string = this.baseAppUrl + 'public/uploads/images/small/';
  readonly imgUrl_crop: string = this.baseAppUrl + 'public/uploads/images/crop/';

  readonly captchaurl:string=this.baseAppUrl+'testapi/captcha'
  readonly nouser_img: string = this.baseAppUrl + 'uploads/random/nouser.png';

  readonly max_img_upload: number = 4;

  readonly payu_key: string = 'KDUBVDJl';
  readonly payu_salt: string = 'DSlsbIjPnX';
  readonly payu_service_provider: string = 'payu_paisa';
  // readonly payu_surl: string = 'http://idigities.com/alkauserfront/api/order/ordersuccessupdate';
  // readonly payu_furl: string = 'http://idigities.com/alkauserfront/home';
  readonly payumodel:any={
    
      'payu_key':'pIjKgYC7',
      'payu_salt':'B3Alw1bIAZ',
      'payu_service_provider':'',
      'payu_surl':'',
      'payu_furl':'',

  }
  
//     readonly paytm:any={
//     'INDUSTRY_TYPE_ID':'Retail',
//     'CHANNEL_ID':'WEB',
//     'WEBSITE':'WEBSTAGING',
//     'CALLBACK_URL':this.paytmcallbackurl,
//     'wallet_type':'1',
//     'merchant_id':'bqGooU97099444643138'
// }
//   readonly paytm:any={
//     'INDUSTRY_TYPE_ID':'Retail',
//     'CHANNEL_ID':'WEB',
//     'WEBSITE':'DEFAULT',
//     'CALLBACK_URL':this.paytmcallbackurl,
//     'wallet_type':'1',
//     'merchant_id':'bqGooU97099444643138'
// }


readonly paytm:any={
  'INDUSTRY_TYPE_ID':'Retail109',
  'CHANNEL_ID':'WEB',
  'WEBSITE':'WEBPROD',
  'CALLBACK_URL':this.paytmcallbackurl,
  'wallet_type':'1',
  'wallet_type_chemist':'0',
  'merchant_id':'bqGooU97099444643138',
  'bid_coin_type':'2'
}
  readonly toastmsg: any = {

    name_is_required: 'Name is required',
    mobile_is_required: 'Mobile is required',
    address_is_required: 'Address is required',
    landmark_is_required: 'Landmark is required',
    state_is_required: 'State is required',
    city_is_required: 'City is required',
    pincode_is_required: 'Pincode is required',
    select_address_type: 'Please select address type',
    added_to_cart: 'Item added to cart',
    empty_search: 'Please type keyword',
    login_invalid: 'Invalid login credentials',
    login_success: 'Successfully logged in',
    register_success: 'Register successfully',
    internet_problem: 'Please check your internet connection.!',
    payment_tab_not_accessable: 'Dont be oversmart,first complete step 2',
    insufficient_cart: 'Your cart is empty, unable to continue',
    no_products_to_show: 'No more foods to show',
    pay_mode_selected: 'Payment mode selected ',
    logout_success: 'Logout successfully.',
    otp_sent_success: 'OTP sent successfully',
    otp_entered_wrong: 'Invalid OTP',
    err: 'Some error occurred',

  }

  readonly noimgfound:any={

    'no_chemist_found':'assets/images/noitem/no_chemist.png',
    'no_order_found':'assets/images/noitem/no_order.png',
    'no_address_found':'assets/images/noitem/no_address.png',
    'no_apc_found':'assets/images/noitem/no_apc.png',
    'no_wallet_found':'assets/images/noitem/no_wallet.png',
    'no_refferal_found':'assets/images/noitem/no_refferal.png',
    'no_broadcast_found':'assets/images/noitem/no_broadcast.png',
    'no_complaint_found':'assets/images/noitem/no_complaint.png',
    'no_notification_found':'assets/images/noitem/no_notification.png'
    
  }
  state: any;

  constructor(private router: Router, private aroute: ActivatedRoute) {

  }

  public response: any;


  public loadCommonJquery() {

    //   $(".search_btn").click(function(){
    //       $(".search_popup").fadeIn();
    //   });

    //   $(".search_popup .search_div .close").click(function(){
    //       $(".search_popup").fadeOut();
    //   });
    $(window).scrollTop(0);
    $("body").hide();

    $("body").fadeIn(20);



  }

  readonly httpOptions = {
    headers: new HttpHeaders({
     
      'Content-Type': 'application/x-www-form-urlencoded',

      // 'Access-Control-Allow-Origin':'*',
      // 'Authorization':  "Basic YWNjZXNzYXBpYXBjYWQ4OTIzWU4yMzpYNDUkJSY4bW5oaiU2N143U0RmZHMjJDM0",
    })
  };
  readonly httpOptionsWithFileUpload = {
    headers: new HttpHeaders({
      'Content-Type': 'multipart/form-data',
    
      
    })
  };

  public auth() {

    if (localStorage.getItem('user') == undefined) {
      return false;
    }
    else if (localStorage.getItem('user') != undefined) {

      return true;
    }
  }

  public getUserInfo() {

    if (localStorage.getItem('user') != undefined || localStorage.getItem('user') != null) {

      return JSON.parse(localStorage.getItem('user'));
    }
    else {

      return '';
    }

  }


  public initState() {

    let sessionid = Math.floor(Date.now() / 1000);


    this.state = {

      // created_on:Math.floor(Date.now() / 1000),
      is_logged_in: false,
      is_logged_out: false,
      location_id: '',
      is_location_set:false,
      device_token:'',
      device_id:'',
      user_type:0,
      is_user_type_set:false,
      global: '',
      redirectdata:'',
      vendor_id:0,
      is_reset_cache7:0,
      is_show_thankyou:0,
      top_categories:[],
      maintenance:{'maintenance_status':'','maintenance_status_heading':'','maintenance_status_message':'','is_closed_on_home':'0'},
      userloc: {

        area: '',
        formatted_addr: 'Delhi',
        city: 'delhi',
        pincode: '110092',
        lat:'28.704060',
        long:'77.102493'

      },

      filter: {

        'filter_json': '',
        'location_id': '',
        'sorting_json': '',
        'page_no': '1',
        'per_page': '10'
      },
      footer:[],

      cartdata: {

        session_id:sessionid,
        cartcount:0,
        cart_amount:0,
        delivery_amount:0,
        gross_amount:0,
        customer_discount_wallet:0,
        lead_plan_detail_id:0,
        customer_discount_wallet_amount:0,
        lead_plan_id:0,
        total_product_discount_amount:0,
        items:[],
        
        net_payble_amount:0,
        prescription_arr:[],
        preview:{'delivery_type':'0','default_fullname':'','default_addr':'','default_mobile':'','address_id':'',
                'latitude':'','longitude':'','delivery_date':'','prescription_file':'','prescription_file2':'','prescription_file3':'',
                'delivery_time':'','items':[],'prescription_arr':[]}
        // total_items: 0,
        // pay_mode: 0,
        // delivery_method: 0,
        // tax_rate: 0,
        // tax_amt: 0,
        // sub_total: 0.0,
        // final_amt: 0.0,

        // payu: '',
        // useraddr: '',


        // items: {

        //   'categories': [],

        //   'cart': [],

        // }

      },

      user: '',

    }

    this.saveAppState(this.state);

  }


  public saveAppState(state) {

    localStorage.setItem('state', JSON.stringify(state));


  }

  public getAppState() {

    return JSON.parse(localStorage.getItem('state'));

  }

  public isNewUser() {

    if (localStorage.getItem('state') == null) {

      return true;
    }
    else {
      return false;

    }
  }


  public isLoggedIn() {

    let state = this.getAppState();
    if (state.is_logged_in) {

      return true;
    }
    else {
      return false;

    }
  }


  validateAppState() {


    if (this.isNewUser()) {

      this.initState();
    }

  }

  validateGlobalData(global) {
    //alert(this.isNewUser());
    if (this.isNewUser) {

      this.initState();
      let state = this.getAppState();
      if (state.global == "") {

        state.global = global;
        this.saveAppState(this.state);
      }
    }
    //console.log(this.getAppState());
    // let state=this.getAppState();
    console.log('dddddddd');
    // console.log(state);
    // if(state.global==""){

    //   state.global=global;
    // //  this.saveAppState(this.state);
    // }

  }


  startBusyLoader() {


    $("body").busyLoad("show", { animation: "slide", background: "rgba(76, 175, 80, 0.73)", spinner: "accordion" });



  }

  stopBusyLoader() {


    $('.busy-load-container').css("display", "none");


  }

  setToast(type, msg) {

    if (type == 'info') {

      $.toast({ title: msg, position: 'top', backgroundColor: '#21c592', textColor: '#fff', });

    }
    else if (type == 'error') {

      setTimeout(() => {
        $.toast({ title: msg, position: 'top', backgroundColor: 'red', textColor: '#fff' });
      }, 20);


    }
    else if (type == 'internet_error') {

      $.toast({ title: msg, position: 'top', backgroundColor: 'red', textColor: '#fff', duration: '20000' });

    }

  }

  navigate(link:any, data:any) {

    if (link == 'home') {

      this.router.navigate(['/home']);
    }
    else if (link == 'shop') {

      this.router.navigate(['/shop']);
    }
    else if (link == 'service') {

      this.router.navigate(['/service' + '/' + data.city + '/' + data.serviceslug]);
    }


  }


  calculateCartCount(menudata) {

    let count = 0;
    for (let i = 0; i < menudata.length; i++) {

      if (menudata[i].product == '') {

        for (let j = 0; j < menudata[i].subcategory.length; j++) {

          for (let k = 0; k < menudata[i].subcategory[j].product.length; k++) {

            if (typeof (menudata[i].subcategory[j].product[k].qty) != 'string') {

              let final_price = 0.0;

              if (menudata[i].subcategory[j].product[k].food_variant.length > 0) {



                for (let s = 0; s < menudata[i].subcategory[j].product[k].food_variant.length; s++) {


                  if (parseInt(menudata[i].subcategory[j].product[k].food_variant[s].qty) != 0) {

                    count = count + 1;
                  }
                }
              }
              else {

                count = count + 1;
              }


            }
          }
        }
      }
      else if (menudata[i].product != '') {


        for (let j = 0; j < menudata[i].product.length; j++) {



          if (typeof (menudata[i].product[j].qty) != 'string') {


            let final_price = 0.0;

            if (menudata[i].product[j].food_variant.length > 0) {



              for (let s = 0; s < menudata[i].product[j].food_variant.length; s++) {

                if (parseInt(menudata[i].product[j].food_variant[s].qty) != 0) {


                  count = count + 1;

                }
              }
            }
            else {


              count = count + 1;


            }




          }

        }
      }

    }

    return count;

  }


  seoUrl(url:any) {

    // make the url lowercase         
    var encodedUrl = url.toString().toLowerCase();

    // replace & with and           
    encodedUrl = encodedUrl.split(/\&+/).join("-and-")

    // remove invalid characters 
    encodedUrl = encodedUrl.split(/[^a-z0-9]/).join("-");

    // remove duplicates 
    encodedUrl = encodedUrl.split(/-+/).join("-");

    // trim leading & trailing characters 
    encodedUrl = encodedUrl.trim('-');

    return encodedUrl;
  }

  updateCart(cartdata:any){

    let sessionid=Math.floor(Date.now() / 1000);
    sessionid=sessionid+cartdata.user_id;


    let data="user_id="+this.state.user.id+"&address_id=";
    console.log(data);
   /// console.log(this.address);


    console.log(sessionid);
  }

  getNextYearList(next){

    console.log(next);
    let obj:any={'month':[{'key':'01','name':'Jan'},{'key':'02','name':'Feb'},{'key':'03','name':'March'},{'key':'04','name':'April'},{'key':'05','name':'May'},{'key':'06','name':'June'},{'key':'07','name':'July'},{'key':'08','name':'Aug'},{'key':'09','name':'Sept'},{'key':'10','name':'Oct'},{'key':'11','name':'Nov'},{'key':'12','name':'Dec'}],
                  'year':[]}

    let currentyear=(new Date()).getFullYear();
  //  currentyear=currentyear+next;
    for(let i=1;i<next+1;i++){

      let yr:any={'key':''};

      currentyear=currentyear+1;
      yr.key=currentyear;
      obj.year.push(yr);
    }
    return obj;

  }

  callOnLoadJS(){
    setTimeout(() => {
      $('.form_wrapper .form_listing .form_list .style').click(function(){
        $('.form_wrapper .form_listing .form_list .style').removeClass("current_input");
        $(this).addClass("current_input");
        $('.form_wrapper .form_listing .form_list .style .input').on('keypress',function(){
          if($(this).val().length >= 0){
             $('.form_wrapper .form_listing .form_list .style').removeClass('current_input');
          }
       });
    });
    $(document).click(function (e) {
      if (!$(e.target).is(".form_wrapper .form_listing .form_list .style, .form_wrapper .form_listing .form_list .style *,.form_wrapper .form_listing .form_list .style .input, .form_wrapper .form_listing .form_list .style .input *")) {
        $(".form_wrapper .form_listing .form_list .style").removeClass("current_input");
      }
    });
  }, 200);
  }

  callSelectJS(){

    setTimeout(() => {
     
      $('select').each(function () {


        var $this = $(this),
    
            numberOfOptions = $(this).children('option').length;
    
        $this.addClass('s-hidden');
    
        $this.wrap('<div class="select"></div>');
    
        $this.after('<div class="styledSelect"></div>');
    
        var $styledSelect = $this.next('div.styledSelect');
    
        $styledSelect.text($this.children('option').eq(0).text());
    
        var $list = $('<ul />', {
    
            'class': 'options'
    
        }).insertAfter($styledSelect);
    
    
        for (var i = 0; i < numberOfOptions; i++) {
    
          $('<li />', {
    
                text: $this.children('option').eq(i).text(),
    
                rel: $this.children('option').eq(i).val()
    
            }).appendTo($list);
    
        }
    
    
        var $listItems = $list.children('li');
    
    
        $styledSelect.click(function (e) {
    
            e.stopPropagation();
    
            // $('div.styledSelect.active').each(function () {
    
            //   $(this).removeClass('active').next('ul.options').hide();
    
            // });
            
    
            $(this).toggleClass('active').next('ul.options').toggle();
    
        });
    
    
        $listItems.click(function (e) {
    
            e.stopPropagation();
    
            $styledSelect.text($(this).text()).removeClass('active');
    
            $this.val($(this).attr('rel'));
    
            $list.hide();
    
        });
    
    
        $(document).click(function () {
    
            $styledSelect.removeClass('active');
    
            $list.hide();
    
        });
    
    
    
    });

        $('.nameDesigns').removeClass('active');
        $('#familytree').addClass('active');

        $(".style .input").on('click keypress',function(){
          $(this).parent(".style").addClass("inpActive");
                  
          $(this).blur(function(){
            var getitemval=$(this).val();						
              if(getitemval==''){
                $(this).parent(".style").removeClass("inpActive");
              }
          
          });
          
        });
      }, 20);
      $('.form_wrapper .form_listing .form_list .style').click(function(){
        $('.form_wrapper .form_listing .form_list .style').removeClass("current_input");
        $(this).addClass("current_input");
        $('.form_wrapper .form_listing .form_list .style .input').on('keypress',function(){
          if($(this).val().length >= 0){
             $('.form_wrapper .form_listing .form_list .style').removeClass('current_input');
          }
       });
    });
    $(document).click(function (e) {
      if (!$(e.target).is(".form_wrapper .form_listing .form_list .style, .form_wrapper .form_listing .form_list .style *,.form_wrapper .form_listing .form_list .style .input, .form_wrapper .form_listing .form_list .style .input *")) {
        $(".form_wrapper .form_listing .form_list .style").removeClass("current_input");
      }
    });
  }

  onRefreshCaptcha(id){

 
     
      $('#'+id).attr('src', this.captchaurl+"/?time="+ new Date().getTime());
     
   
    console.log(this.captchaurl);
  }
}
