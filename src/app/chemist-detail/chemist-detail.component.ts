import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { Api } from '../api.service';
import { AppGlobals } from '../app.global';
import { Meta, Title } from '@angular/platform-browser';
import { HeaderComponent } from '../incl/header/header.component';
import { PopupComponent } from '../popup/popup.component';

declare var $: any;
declare var FgGallery: any;
declare var window: any;


@Component({
  selector: 'app-chemist-detail',
  templateUrl: './chemist-detail.component.html',
  styleUrls: ['./chemist-detail.component.css']
})
export class ChemistDetailComponent implements OnInit {

  state: any;
  todata: any = { 'to_user_id': '', 'to_user_type_id': '', 'seo_url': '' };
  respdata: any = {

    'business_delivery': { 'min_amt_free_delivery': '', 'open_time': '', 'close_time': '', 'discount_percent': '', 'open_close_status': '0', 'user_id': '' },
    'business_timing': [],
    'gallery_img': [],
    'payment_mode': [],
    'social_data': { 'facebook_url': '', 'google_plus_url': '', 'instagram_url': '', 'linkedin_url': '', 'pinterest_url': '', 'twitter_url': '' },
    'user_data': {
      'vendor_id': '', 'vendor_rating': '', 'vendor_shopname': '', 'address': '', 'area': '', 'vendor_mobile': '',
      'whatsapp_no': '', 'landline': '', 'vendor_summary': '', 'is_favourite': '0', 'total_favourite': '0',
      'vendor_email': '', 'user_total_rating': 0, 'user_type_name': '', 'prime_status': '',
      'trusted_status': '', 'vendor_latitude': '', 'vendor_longitude': '', 'vendor_distance': '',
      'direct_access_enquiry': '0', 'direct_cart_message_show': '', 'direct_order_cart_message': '','cart_count':''
    },
    'enquiry': { 'name': '', 'email': '', 'mobile': '', 'message': '' },
    'review_data': [],
    'current_day_no': '',
    'direct_order_msg': 'Are you sure, you want to directly order from this chemist. APC discounts and cashback are not eligible on such orders?',
    'direct_order_msg_clear_cart': 'Are you sure, you want to directly order from this chemist. APC discounts and cashback are not eligible on such orders, your previous cart will be cleared?',
    'review_count': '0',
    'review_page_no': 0
  }
  is_payment_mode_available: boolean = false;
  status: any = {
    'is_process': false, 'is_sent': false, 'process_txt': 'Please wait..we are sending your quotation.!', 'sent_txt': 'Vendor added to direct enquiry',
    'is_confirm_popup': false, 'confirm_txt': ''
  };
  is_clear_cart: boolean = false;
  galleryinit: any;
  @ViewChild('child')
  private child: HeaderComponent;
  @ViewChild('popupchild') popup: PopupComponent;

  constructor(private aroute: ActivatedRoute, private router: Router,

    private loadingBar: LoadingBarService, private api: Api, public global: AppGlobals, private title: Title, private meta: Meta) { this.state = this.global.getAppState() }

  ngOnInit() {

    setTimeout(() => {
      $(".style .input").on('click keypress', function () {
        $(this).parent(".style").addClass("inpActive");

        $(this).blur(function () {
          var getitemval = $(this).val();
          if (getitemval == '') {
            $(this).parent(".style").removeClass("inpActive");
          }

        });

      });




    }, 200);


    $('.chemistDetail_page').hide();
    //  console.log(this.state);
    this.aroute.params.subscribe(params => {

      // this.todata.to_user_id = this.aroute.snapshot.queryParams["id"];
      // this.todata.to_user_type_id = this.aroute.snapshot.queryParams["typeid"];
      // this.respdata.gallery_img=[];
      this.todata.seo_url = this.aroute.snapshot.paramMap.get('seourl');

      $('.searchResultdiv').css('display', 'none');
      $('.input_box').val('');
      this.getVendorDetail();

    });
    $("html, body").animate({ scrollTop: 0 }, "slow");

    function openModal() {
      document.getElementById('myModal').style.display = "block";
    }



  }

  getVendorDetail() {


    let data;
    // if (!this.state.is_logged_in) {
    //   data = "from_user_id=&from_user_type_id=&to_user_id=" + this.todata.to_user_id + "&to_user_type_id=" + this.todata.to_user_type_id;
    // }
    // else {
    //   data = "from_user_id=" + this.state.user.id + "&from_user_type_id=" + this.state.user.user_type_id + "&to_user_id=" + this.todata.to_user_id + "&to_user_type_id=" + this.todata.to_user_type_id;
    // }
    if (!this.state.is_logged_in) {
      data = "from_user_id=&from_user_type_id=&seo_url=" + this.todata.seo_url + "&session_id=" + this.state.cartdata.session_id;
    }
    else {
      data = "from_user_id=" + this.state.user.id + "&from_user_type_id=" + this.state.user.user_type_id + "&seo_url=" + this.todata.seo_url + "&session_id=" + this.state.cartdata.session_id;;
    }
    this.respdata.gallery_img = [];
 
    this.loadingBar.start();
    this.api.getVendorDetail(data).subscribe(
      (response) => {

        var dt: any = response;

    
        if (dt.status == 200) {
          let timingarr = [];
          let timings = dt.data.business_timing;
          timings.map(elem => { elem.istoday = '0' });

          this.respdata.business_timing = timings;


          if (dt.data.business_timing.length > 0) {

            timingarr = dt.data.business_delivery.payment_mode.split(',');
            dt.data.payment_mode.map(elem => {
              elem['ischecked'] = '0';
            });


            for (let i = 0; i < timingarr.length; i++) {
              dt.data.payment_mode.map(elem => {

                if (elem.id == timingarr[i]) {

                  elem['ischecked'] = '1';


                }

              })

            }


          }

          this.respdata.payment_mode = dt.data.payment_mode;

          this.respdata.gallery_img = dt.data.gallery_img;

          this.respdata.business_delivery.min_amt_free_delivery = dt.data.business_delivery.min_amt_free_delivery;
          this.respdata.business_delivery.open_time = dt.data.business_delivery.open_time;
          this.respdata.business_delivery.close_time = dt.data.business_delivery.close_time;
          this.respdata.business_delivery.discount_percent = dt.data.business_delivery.discount_percent;
          this.respdata.business_delivery.open_close_status = dt.data.business_delivery.open_close_status;
          this.respdata.business_delivery.user_id = dt.data.business_delivery.user_id;

          this.respdata.social_data.facebook_url = dt.data.social_data.facebook_url;
          this.respdata.social_data.google_plus_url = dt.data.social_data.google_plus_url;
          this.respdata.social_data.instagram_url = dt.data.social_data.instagram_url;
          this.respdata.social_data.linkedin_url = dt.data.social_data.linkedin_url;
          this.respdata.social_data.pinterest_url = dt.data.social_data.pinterest_url;
          this.respdata.social_data.twitter_url = dt.data.social_data.twitter_url;

          this.respdata.user_data.vendor_shopname = dt.data.user_data.vendor_shopname;
          this.respdata.user_data.address = dt.data.user_data.address;
          this.respdata.user_data.area = dt.data.user_data.area;
          this.respdata.user_data.vendor_mobile = dt.data.user_data.vendor_mobile;
          this.respdata.user_data.whatsapp_no = dt.data.user_data.whatsapp_no;
          this.respdata.user_data.landline = dt.data.user_data.landline;
          this.respdata.user_data.vendor_summary = dt.data.user_data.vendor_summary;
          this.respdata.user_data.vendor_rating = dt.data.user_data.vendor_rating;
          this.respdata.user_data.is_favourite = dt.data.user_data.is_favourite;
          this.respdata.user_data.total_favourite = dt.data.user_data.total_favourite;
          this.respdata.user_data.vendor_email = dt.data.user_data.vendor_email;
          this.respdata.user_data.user_total_rating = dt.data.user_data.user_total_rating;
          this.respdata.user_data.user_type_name = dt.data.user_data.user_type_name;
          this.respdata.user_data.prime_status = dt.data.user_data.prime_status;
          this.respdata.user_data.trusted_status = dt.data.user_data.trusted_status;
          this.respdata.user_data.vendor_latitude = dt.data.user_data.vendor_latitude;
          this.respdata.user_data.vendor_longitude = dt.data.user_data.vendor_longitude;
          this.respdata.user_data.direct_access_enquiry = dt.data.user_data.direct_access_enquiry;
          this.respdata.user_data.vendor_id = dt.data.user_data.vendor_id;
          this.respdata.user_data.direct_cart_message_show = dt.data.user_data.direct_cart_message_show;
          this.respdata.user_data.direct_order_cart_message = dt.data.user_data.direct_order_cart_message;
          this.respdata.user_data.cart_count = dt.data.user_data.cart_count;
          
          this.todata.to_user_id = dt.data.social_data.user_id;
          this.todata.to_user_type_id = dt.data.social_data.user_type_id;
          this.respdata.review_data = dt.data.review_data;

          this.respdata.review_count = dt.data.review_count;

          if ((this.state.vendor_id != '' || this.state.vendor_id != 0) && this.state.vendor_id == dt.data.user_data.vendor_id) {
            $('#directenquirybtn').text('Remove From Direct Order');
          }

          $('.chemistDetail_page').fadeIn("slow");

          this.callJS();
          setTimeout(() => {
            this.galleryinit = new FgGallery('.fg-gallery', {
              cols: 1,
              style: {
                width: '150px',
                border: '5px solid #fff',
                height: '130px',
              }
            })

            $('.rating').addRating();
          }, 200);
          this.loadingBar.stop();

          $("html, body").animate({ scrollTop: 0 }, "slow");
          if (this.respdata.business_timing.length > 0) {
            this.checkIfDateIsTodaysDate();
          }
          dt.data.payment_mode.map(elem => {

            if (elem['ischecked'] == '1') {
              this.is_payment_mode_available = true;
            }
            //elem['ischecked'] = '0';
          });

          this.respdata.user_data.vendor_distance = this.calcCrow(this.state.userloc.lat, this.state.userloc.long, this.respdata.user_data.vendor_latitude, this.respdata.user_data.vendor_longitude)
        }
        else if (dt.status == 201) {


          this.router.navigate(['unauth-access']);
          //  this.global.setToast('error', dt.message);
          this.loadingBar.stop();
        }

      },
      (error) => {

        //  this.router.navigate(['unauth-access']);
        this.loadingBar.stop();
        //   this.spinnerService.hide();
        console.log('RESPONSE FAILED'); console.log(error)
      }
    );

  }

  tConv24(time24: any) {
    let ts = time24;
    let H = +ts.substr(0, 2);
    let h: any = (H % 12) || 12;
    h = (h < 10) ? ("0" + h) : h;  // leading 0 at the left for 1 digit hours
    let ampm = H < 12 ? " AM" : " PM";
    ts = h + ts.substr(2, 3) + ampm;
    return ts;
  };
  ngAfterViewInit() {

    // setTimeout(() => {
    //   var a = new FgGallery('.fg-gallery', {
    //     cols: 4,
    //     style: {
    //       width:'70px',
    //         border: '2px solid #fff',
    //         height: '70px',
    //     }
    // })
    // }, 20);

  }

  callJS() {

    setTimeout(() => {

      // $('.photor').photor();


      $(function () {
        $('.seaTabs_tab').each(function (item) {
          $(this).click(function () {
            $(this).addClass('seaTabs_switch_active').siblings().removeClass('seaTabs_switch_active');
            $($('.seaTabs_item')[item]).addClass('seaTabs_content_active').siblings().removeClass('seaTabs_content_active');
          });
        });
      });


      $(function () {
        $('.seaTabs_tab2').each(function (item) {
          $(this).click(function () {
            $(this).addClass('seaTabs_switch_active2').siblings().removeClass('seaTabs_switch_active2');
            $($('.seaTabs_item2')[item]).addClass('seaTabs_content_active2').siblings().removeClass('seaTabs_content_active2');
          });
        });
      });

      /*javascript for all categorey button is start from here*/

      $(document).ready(function (e) {
        $(".all-cat").hover(function () {

          $(".all-cat-mega").toggle();

        });
      });

      $('.chemistDetail_page .chem-open').click(function () {
        $('.opening_ours_chart').toggle(200);

      });


    }, 20);
  }

  addRemoveToFavourites() {

    let data: any;

    if (!this.state.is_logged_in) {

      this.global.setToast('error', 'Please login or register to add favourites');
    }
    else if (this.state.user.id == this.todata.to_user_id) {

      this.global.setToast('error', 'You cant set to favourite itself');
    }
    else {

      if (this.respdata.user_data.is_favourite == '0') {
        data = "from_user_id=" + this.state.user.id + "&from_user_type_id=" + this.state.user.user_type_id + "&to_user_id=" + this.respdata.business_delivery.user_id + "&to_user_type_id=2&type=1";
        this.respdata.user_data.total_favourite = parseInt(this.respdata.user_data.total_favourite) + 1;

      }
      else {
        data = "from_user_id=" + this.state.user.id + "&from_user_type_id=" + this.state.user.user_type_id + "&to_user_id=" + this.respdata.business_delivery.user_id + "&to_user_type_id=2&type=0";
        this.respdata.user_data.total_favourite = parseInt(this.respdata.user_data.total_favourite) - 1;

      }

      this.loadingBar.start();
      this.api.addRemoveToFavourites(data).subscribe(
        (response) => {



          var dt: any = response;

          if (dt.status == 200) {


            this.global.setToast('info', dt.message);
            if (this.respdata.user_data.is_favourite == '0') {

              this.respdata.user_data.is_favourite = '1';
              $('#hearticon').removeClass('fa-heart-o');
              $('#hearticon').addClass('fa-heart');

            }
            else {

              this.respdata.user_data.is_favourite = '0';
              $('#hearticon').removeClass('fa-heart');
              $('#hearticon').addClass('fa-heart-o');
            }
          }
          else if (dt.status == 201) {
            this.global.setToast('error', dt.message);
          }
          this.loadingBar.stop();
        },
        (error) => {

          this.loadingBar.stop();
          //   this.spinnerService.hide();
          console.log('RESPONSE FAILED'); console.log(error);
        }
      );

    }
  }

  checkIfDateIsTodaysDate() {
    let date = new Date();
    let day = date.getDay();

    this.respdata.current_day_no = day;



    switch (day) {
      case 0:
        this.respdata.business_timing[0].istoday = '1';
        break;
      case 1:
        this.respdata.business_timing[1].istoday = '1';
        break;
      case 2:
        this.respdata.business_timing[2].istoday = '1';
        break;
      case 3:
        this.respdata.business_timing[3].istoday = '1';
        break;
      case 4:
        this.respdata.business_timing[4].istoday = '1';
        break;
      case 5:
        this.respdata.business_timing[5].istoday = '1';
        break;
      case 6:
        this.respdata.business_timing[6].istoday = '1';
        break;
      case 7:
        this.respdata.business_timing[7].istoday = '1';
        break;

      default:

        break;
    }

    // console.log(  this.respdata.business_timing);
  }

  onAddToDirectEnquiry() {

   
    if (this.state.vendor_id == this.respdata.business_delivery.user_id) {

      this.state.vendor_id = 0;
      $('#directenquirybtn').text('Add to Direct Order');
      this.global.saveAppState(this.state);

    }
    else {
    //  alert(2);
     
      if( this.respdata.user_data.cart_count>0){
        this.is_clear_cart = true;
      }
      if (this.respdata.user_data.direct_cart_message_show == 1) {

 
        //alert(2);
        this.status.is_confirm_popup = true;
        this.popup.onReceivePopupData({ 'type': 'confirm', 'confirm_txt': this.respdata.user_data.direct_order_cart_message, 'primary_btn_txt': 'Confirm', 'secondary_btn_txt': 'Close' });
      }
      else {

        this.AddToDirectOrder();

      }
    }


    // this.status.is_process=false;
    // this.state.is_confirm_popup=true;
    //  console.log(this.status.is_process);
    // console.log(this.state.cartdata.items.length);
    //console.log(this.state.vendor_id);
    // console.log(this.respdata.business_delivery.user_id);

    // if (!this.status.is_process && this.state.vendor_id != this.respdata.business_delivery.user_id  ) {

    //   this.status.is_confirm_popup = true;
    // }
    //   if (!this.status.is_process && this.state.cartdata.items.length > 0 && this.state.vendor_id == 0) {

    //     // direct_order_cart_message direct_cart_message_show
    //        console.log('v');

    //      if(this.respdata.user_data.direct_cart_message_show==1){
    //       this.status.is_confirm_popup = true;
    //       this.popup.onReceivePopupData({ 'type': 'confirm', 'confirm_txt': this.respdata.user_data.direct_order_cart_message, 'primary_btn_txt': 'Confirm', 'secondary_btn_txt': 'Close' });
    //      }
    //      else{
    //       this.AddToDirectOrder();
    //      }
    //     //
    //     // this.status.confirm_txt="Are you sure to add vendor to direct enquiry, your previous cart will be cleared ?";

    //    // 
    //     this.is_clear_cart = true;
    //   }
    //   else if (!this.status.is_process && this.state.cartdata.items.length == 0 && this.state.vendor_id != this.respdata.business_delivery.user_id) {

    //     // console.log('1');

    //     // this.status.is_confirm_popup = true;
    //     // this.status.confirm_txt="Are you sure to add vendor to direct enquiry?";
    //     if(this.respdata.user_data.direct_cart_message_show==1){
    //       this.status.is_confirm_popup = true;
    //       this.popup.onReceivePopupData({ 'type': 'confirm', 'confirm_txt': this.respdata.user_data.direct_order_cart_message, 'primary_btn_txt': 'Confirm', 'secondary_btn_txt': 'Close' });
    //      }
    //      else{
    //       this.AddToDirectOrder();
    //      }
    //  //   this.popup.onReceivePopupData({ 'type': 'confirm', 'confirm_txt': this.respdata.direct_order_msg, 'primary_btn_txt': 'Confirm', 'secondary_btn_txt': 'Close' });

    //   }
    //   else if (!this.status.is_process && this.state.cartdata.items.length == 0 && this.state.vendor_id != 0 && this.state.vendor_id != this.respdata.business_delivery.user_id) {

    // //    console.log('2');

    //     // this.status.is_confirm_popup = true;
    //     // this.status.confirm_txt="Are you sure to add vendor to direct enquiry?";
    //     if(this.respdata.user_data.direct_cart_message_show==1){
    //       this.status.is_confirm_popup = true;
    //       this.popup.onReceivePopupData({ 'type': 'confirm', 'confirm_txt': this.respdata.user_data.direct_order_cart_message, 'primary_btn_txt': 'Confirm', 'secondary_btn_txt': 'Close' });
    //      }
    //      else{
    //       this.AddToDirectOrder();
    //      }
    //  //   this.popup.onReceivePopupData({ 'type': 'confirm', 'confirm_txt': this.respdata.direct_order_msg, 'primary_btn_txt': 'Confirm', 'secondary_btn_txt': 'Close' });
    //   }
    //   else if (!this.status.is_process && this.state.cartdata.items.length > 0 && this.state.vendor_id != 0 && this.state.vendor_id != this.respdata.business_delivery.user_id) {

    //    //  console.log('12');
    //    if(this.respdata.user_data.direct_cart_message_show==1){
    //     this.status.is_confirm_popup = true;
    //     this.popup.onReceivePopupData({ 'type': 'confirm', 'confirm_txt': this.respdata.user_data.direct_order_cart_message, 'primary_btn_txt': 'Confirm', 'secondary_btn_txt': 'Close' });
    //    }
    //    else{
    //     this.AddToDirectOrder();
    //    }
    //  //   this.status.is_confirm_popup = true;
    //     // this.status.confirm_txt="Are you sure to add vendor to direct enquiry, your previous cart will be cleared ?";
    //   //  this.popup.onReceivePopupData({ 'type': 'confirm', 'confirm_txt': this.respdata.direct_order_msg_clear_cart, 'primary_btn_txt': 'Confirm', 'secondary_btn_txt': 'Close' });
    //     this.is_clear_cart = true;
    //     // this.removeItem();

    //   }
    //   else if (this.state.vendor_id == this.respdata.business_delivery.user_id) {
    //     this.state.vendor_id = 0;
    //     $('#directenquirybtn').text('Add to Direct Order');
    //     this.global.saveAppState(this.state);
    //   }
    //   else{

    //   }

    //   console.log(this.state);
    // if (this.state.vendor_id == this.todata.to_user_id) {

    //   this.state.vendor_id = 0;
    //   $('#directenquirybtn').text('Add to Direct Enquiry');
    //   this.global.saveAppState(this.state);
    // }
    // else {

    //   this.state.vendor_id = this.todata.to_user_id;
    //   $('#directenquirybtn').text('Added to Direct Enquiry');
    //   this.global.saveAppState(this.state);
    // }
  }
  onClose(type: any, mode: any) {

    if (type == 'enquiryprocess') {
      this.router.navigate(['/chemist-account/retailer-enquiry'], { queryParams: { 'type': '' } });
      this.status.is_process = false;

    }
    else if (type == 'confirmprocess' && mode == 'cancel') {

      // this.router.navigate(['/my-account/enquires']);
      this.status.is_confirm_popup = false;

    }
    else if (type == 'sendprocess' && mode == 'cancel') {

      // this.router.navigate(['/my-account/enquires']);
      this.status.is_process = false;

    }
    else if (type == 'confirmprocess' && mode == 'confirm') {

      //  console.log('99');
      if (this.state.vendor_id == this.respdata.business_delivery.user_id) {

        this.state.vendor_id = 0;
        $('#directenquirybtn').text('Add to Direct Order');
        this.global.saveAppState(this.state);

      }
      else {

        //  console.log('100');

        //  console.log(this.state);
        // alert('2');
        $('#directenquirybtn').text('Remove From Direct Order');


        if (this.is_clear_cart) {
          this.removeItem();
        }
      }
      //  alert( this.respdata.business_delivery.user_id);
      this.state.vendor_id = this.respdata.business_delivery.user_id;
      this.global.saveAppState(this.state);
      this.status.is_confirm_popup = false;
      //   this.status.is_process=true;
      this.status.is_sent = true;
      $("header .mainHeader .insideDesign .right_part .icon_menu .list .input_box#headersearch").after("<span class='search_input_overlay'></span>");
      $(".search_input_overlay").show();
      $("header .mainHeader .insideDesign .right_part .icon_menu .list .input_box#headersearch").focus();

      $(document).on("click", ".search_input_overlay", function () {
        $(".search_input_overlay").remove();
      });
    }



    // else if(type=='confirmprocess' && mode=='cancel'){

    //   this.router.navigate(['/my-account/enquires']);
    //   this.status.is_confirm_popup=false;

    // }
  }

  removeItem() {


    let state = this.global.getAppState();

    // let cdata = { 'removecart': '1', 'rowid': '', 'session_id': '', 'user_id': '' };

    // cdata.user_id = state.user.id;
    // cdata.rowid = productdata.rowid;
    // cdata.session_id = state.cartdata.session_id;


    // let data = "session_id=" + cdata.session_id + "&user_id=&rowid=" + cdata.rowid + "&removecart=" + cdata.removecart;

    let data: any;
    if (this.state.is_logged_in) {

      data = "session_id=" + this.state.cartdata.session_id + "&user_id=" + this.state.user.id;
    }
    else if (!this.state.is_logged_in) {
      data = "session_id=" + this.state.cartdata.session_id + "&user_id=";
    }
    // console.log(data);
    this.api.emptyCart(data).subscribe(
      (response) => {
        // alert('444');



        var dt: any = response;


        this.child.cartCountEvent();

        if (dt.status == 200) {
          // this.state.vendor_id = this.respdata.business_delivery.user_id;
          // this.global.saveAppState(this.state);
          //    this.global.setToast('info', dt.message);



          //   this.cart.delivery_amount = dt.delivery_amount;
          //   this.cart.gross_amount = dt.cart_amount;
          //   this.cart.items = dt.data;

          //   this.state = this.global.getAppState();
          //   this.state.cartdata.cart_amount = dt.cart_amount;
          //   this.cart.cart_amount=dt.cart_amount;
          //   this.state.cartdata.cartcount=dt.cart_count;
          //   this.state.cartdata.delivery_amount = this.cart.delivery_amount;
          //   this.state.cartdata.gross_amount = this.cart.gross_amount;
          //   this.state.cartdata.items = this.cart.items;


          //   this.state.cartdata.total_product_discount_amount=dt.total_product_discount_amount;
          //   this.state.cartdata.net_payble_amount=dt.net_payble_amount;
          //   this.cart.net_payble_amount=dt.net_payble_amount;

          // //  this.state.cartdata.session_id=dt.session_id;
          //   this.child.cartcount=dt.cart_count;
          //   this.global.saveAppState(this.state);
          //   this.cart.gross_amount=dt.cart_amount;



          // this.cart.cart_amount= this.calculateTotalMRP(this.state.cartdata.items);
          // this.cart.gross_amount =this.calculateGrandTotal(this.state.cartdata.items);


        }
        else if (dt.status == 201) {

          // this.is_result_get=false;
          // this.searchresp=[];
        }




      },
      (error) => {


        console.log('RESPONSE FAILED'); console.log(error)
      }
    );

  }

  ngOnDestroy() {

    $('.gallery-data').hide();
    //FgGallery.prototype.galleryCloseFunc();
  }

  /*  Dynamic Popup Function */
  onConfirmingOrCancelOrder(type: any) {

    if (type == 'confirm') {

      this.status.is_confirm_popup = false;
      this.status.is_order_confirmed = true;
      //  this.onSubmitEnquiry();
    }
    else if (type == 'cancel') {
      this.status.is_confirm_popup = false;

    }

  }

  AddToDirectOrder() {

  
    if (this.state.vendor_id == this.respdata.business_delivery.user_id) {

      this.state.vendor_id = 0;
      $('#directenquirybtn').text('Add to Direct Order');
      this.global.saveAppState(this.state);

    }
    else {

      //     console.log('100');




      //     console.log(this.state);
      // alert('2');
      $('#directenquirybtn').text('Remove From Direct Order');


      if (this.is_clear_cart) {

        this.removeItem();
        // this.state.vendor_id = this.respdata.business_delivery.user_id;
        // this.global.saveAppState(this.state);
      }

    }
    this.state.vendor_id = this.respdata.business_delivery.user_id;
    this.state.cartdata.direct_order = { 'vendor_shop_name': this.respdata.user_data.vendor_shopname, 'msg': '*This order will be sent directly to the selected chemist. APC discounts and cashback are not eligible on such orders' },
      this.global.saveAppState(this.state);


    this.status.is_confirm_popup = false;
    //   this.status.is_process=true;
    this.status.is_sent = true;
    $("header .mainHeader .insideDesign .right_part .icon_menu .list .input_box#headersearch").after("<span class='search_input_overlay'></span>");
    $(".search_input_overlay").show();
    $("header .mainHeader .insideDesign .right_part .icon_menu .list .input_box#headersearch").focus();

    $(document).on("click", ".search_input_overlay", function () {
      $(".search_input_overlay").remove();
    });

  }
  onPopupActionReceived(obj: any) {
    // console.log(obj);
    if (obj.mode == 'confirm') {

      if (obj.type == 0) {

        this.popup.onReceivePopupData({ 'type': '' });

      }
      else if (obj.type == 1) {

        this.popup.onReceivePopupData({ 'type': '' });
        this.AddToDirectOrder();
        //     if (this.state.vendor_id == this.respdata.business_delivery.user_id) {

        //       this.state.vendor_id = 0;
        //       $('#directenquirybtn').text('Add to Direct Order');
        //       this.global.saveAppState(this.state);

        //     }
        //     else {

        //  //     console.log('100');




        //  //     console.log(this.state);
        //       // alert('2');
        //       $('#directenquirybtn').text('Remove From Direct Order');


        //       if (this.is_clear_cart) {

        //         this.removeItem();
        //           // this.state.vendor_id = this.respdata.business_delivery.user_id;
        //       // this.global.saveAppState(this.state);
        //       }

        //     }
        //     this.state.vendor_id = this.respdata.business_delivery.user_id;
        //     this.state.cartdata.direct_order={'vendor_shop_name':this.respdata.user_data.vendor_shopname,'msg':'*This order will be sent directly to the selected chemist. APC discounts and cashback are not eligible on such orders'},
        //     this.global.saveAppState(this.state);


        //     this.status.is_confirm_popup = false;
        //     //   this.status.is_process=true;
        //     this.status.is_sent = true;
        //     $("header .mainHeader .insideDesign .right_part .icon_menu .list .input_box#headersearch").after("<span class='search_input_overlay'></span>");
        //     $(".search_input_overlay").show();
        //     $("header .mainHeader .insideDesign .right_part .icon_menu .list .input_box#headersearch").focus();

        //     $(document).on("click", ".search_input_overlay", function () {
        //       $(".search_input_overlay").remove();
        //     });

        //  this.status.is_order_confirmed=1;
        // this.onSubmitEnquiry();
        //on primary btn clicked...

      }

    }
    else if (obj.mode == 'success') {

      if (obj.type == 0) {

        //Go To Order
        //  this.onRedirect('home')

      }
      else if (obj.type == 1) {

        this.popup.onReceivePopupData({ 'type': '' });
        // this.onRedirect('my-enquiries');
        //on primary btn clicked...

      }
    }


    //console.log(event);
  }

  /*  Dynamic Popup Function */

  calcCrow(lat1, lon1, lat2, lon2) {

    var p = 0.017453292519943295;    // Math.PI / 180
    var c = Math.cos;
    var a = 0.5 - c((lat2 - lat1) * p) / 2 +
      c(lat1 * p) * c(lat2 * p) *
      (1 - c((lon2 - lon1) * p)) / 2;


    return 12742 * Math.asin(Math.sqrt(a)); // 2 * R; R = 6371 km
    // const nyc = new google.maps.LatLng(lat1,lon1);
    // const london = new google.maps.LatLng(lat2, lon2);
    // const distance = google.maps.geometry.spherical.computeDistanceBetween(nyc, london);
    // console.log(distance)
  }


  incrementReviewCounter() {

    this.respdata.review_page_no = parseInt(this.respdata.review_page_no) + 1;

    this.onLoadMoreReviews();
  }
  onLoadMoreReviews() {

    this.loadingBar.start();
    let data: any;

    data = "?user_id=" + this.respdata.user_data.vendor_id + "&page=" + this.respdata.review_page_no;
 
    this.api.getReviewList(data).subscribe(
      (response) => {
        // alert('444');



        var dt: any = response;
 
        if (dt.status == 200) {

          if (this.respdata.review_page_no == 1) {

            this.respdata.review_data = dt.data;
          }
          else {

            dt.data.forEach(elem => {
              this.respdata.review_data.push(elem);
            });
            setTimeout(() => {
            
              //$('.reviews_wrapper').fadeIn(500);
            }, 200);
          }

        }
        else if (dt.status == 201) {

          $('#viewmorebtn').hide();
          // this.is_result_get=false;
          // this.searchresp=[];
        }

        this.loadingBar.stop();


      },
      (error) => {


        console.log('RESPONSE FAILED'); console.log(error)
      }
    );
  }

}