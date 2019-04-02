import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { Api } from '../api.service';
import { AppGlobals } from '../app.global';


declare var $: any;

@Component({
  selector: 'app-chemist-listing',
  templateUrl: './chemist-listing.component.html',
  styleUrls: ['./chemist-listing.component.css']
})
export class ChemistListingComponent implements OnInit {


  filter: any = {

    'discount': { 'min_default': 0, 'max_default': 100, 'min_value': 0, 'max_value': 100, },
    'location_range': { 'min_default': 0, 'max_default': 10, 'min_value': 0, 'max_value': 10, },
    'rating': 0,
    'sort_by': '',
    'apc_trusted': 0,
    'open_close_status': 0

  };

  state: any;
  userloc: any = { 'lat': '', 'long': '' };
  listing: any = [];
  is_scrolled: boolean = false;
  isfilter: boolean = false;
  iscalledjs: boolean = false;
  current_page = 1;
  handler: any;
  keywords: any = { 'keywordid': undefined, 'keywordname': undefined, 'keywordtype': undefined };
  isenquiry: boolean = false;
  enquiry: any = {
    'vendor_id': '', 'keyword_id': '', 'mapping_type': '', 'latitude': '', 'longitude': '',
    'product_id': '', 'product_name': '', 'product_quantity': '', 'product_unit': '',
    'product_description': '', 'user_id': '', 'user_type_id': '', 'name': '',
    'mobile_no': '', 'email_id': '', 'device_type': 'web', 'device_id': 'xxxx', 'device_token': 'xxxx',
    'otpval': '', 'otpenter': '', 'isotpset': 0, 'selecteddata': '', 'sendtype': 1, 'is_show_otp': false
  };
  usertypes: any = []
  unitlist: any = [];
  is_show_footer: boolean = false;

  constructor(private aroute: ActivatedRoute, private router: Router, private loadingBar: LoadingBarService, private api: Api, public global: AppGlobals,
  ) {

    this.state = this.global.getAppState()

  }

  ngOnInit() {

    $('.Chemistlisting_Page').hide();
    $('.stickyFooter').hide();
    //.stickyFooter{display: none;}
    if (this.aroute.snapshot.queryParams["lat"] == undefined) {

      this.router.navigate(['unauth-access']);

    }
    else {
      this.aroute.queryParams.subscribe(params => {

        this.userloc.lat = this.aroute.snapshot.queryParams["lat"];
        this.userloc.long = this.aroute.snapshot.queryParams["long"];

        this.keywords.keywordid = this.aroute.snapshot.queryParams["keywordid"];
        this.keywords.keywordname = this.aroute.snapshot.queryParams["keywordname"];
        this.keywords.keywordtype = this.aroute.snapshot.queryParams["keywordtype"];

        $('.searchResultdiv').css('display', 'none');
        $('.input_box').val('');
        this.listing = [];
        this.usertypes = [];
        this.iscalledjs = false;
        this.getListing();

      });
      $("html, body").animate({ scrollTop: 0 }, "slow");

      $('.filterPannel').css('display', 'none');



    }


    // this.aroute.queryParams.subscribe(params => {
    //   // Defaults to 0 if no query param provided.
    //   console.log(params);
    //     if(params.filter!=undefined){
    //       //alert('1');
    //       console.log('asdfasd');
    //       this.isfilter=true;
    //       this.current_page=1;
    //    this.listing=[];
    //    //   this.router.navigate(['chemist-listing'], 

    //       // { queryParams: 

    //       //   {
    //       //   filter:true,
    //       //   lat:this.state.userloc.lat,
    //       //   long:this.state.userloc.long,

    //       //   discount_min:this.filter.discount.min_value,
    //       //   discount_max:this.filter.discount.max_value,
    //       //   }
    //       //   })
    //         this.getListing();
    //     }
    //     else{
    //       //alert('2');
    //       this.listing=[];
    //        this.getListing();
    //     }
    //   //  this.navigateByQueryString();
    //     console.log(params);
    // });


  }

  getListing() {

    let data;
    if (!this.isfilter && this.keywords.keywordid != undefined) {

      data = "?from_user_type_id=1&to_user_type_id=2&lat=" + this.userloc.lat + "&long=" + this.userloc.long + "&page=" + this.current_page + "&keyword_id=" + this.keywords.keywordid + "&mapping_type=" + this.keywords.keywordtype;

    }
    else if (!this.isfilter && this.keywords.keywordid == undefined) {

      data = "?from_user_type_id=1&to_user_type_id=2&lat=" + this.userloc.lat + "&long=" + this.userloc.long + "&page=" + this.current_page;

    }
    else {
      //Set default filter parmas

      data = "?from_user_type_id=1&to_user_type_id=2&lat=" + this.userloc.lat + "&long=" + this.userloc.long
        + "&min_discount=" + this.filter.discount.min_value + "&max_discount=" + this.filter.discount.max_value +
        "&page=" + this.current_page + "&sort_by=" + this.filter.sort_by + "&apc_trusted=" + this.filter.apc_trusted + "&shop_open_status=" + this.filter.open_close_status;
      // +"&min_range="+this.filter.location_range.min_value+"&max_range="+this.filter.location_range.max_value;

    }
    // data="?from_user_type_id=1&to_user_type_id=2&lat="+this.userloc.lat+"&long="+this.userloc.long
    //  +"&min_discount="+this.filter.discount.min_value+"&max_discount="+this.filter.discount.max_value;
    // +"&min_range="+this.filter.location_range.min_value+"&max_range="+this.filter.location_range.max_value;

    console.log(data);

    this.loadingBar.start();

    if (this.listing.length == 0) {
      $('.chemist_listing').hide();
    }

    this.api.getUserListing(data).subscribe(

      (response) => {


        var dt: any = response;

        console.log(dt);

        if (dt.status == 200) {

          //  this.businesstypes=dt.data;
          // if(this.isfilter){
          //   //alert('3');
          //   this.listing=[];
          // }
          let listing = dt.data.user_list;
          this.usertypes = dt.data.login_type_list;
          this.unitlist = dt.data.unit_list;
          this.enquiry.product_unit = this.unitlist[0].id;
          $('.chemist_listing').fadeIn(500);
          for (let i = 0; i < listing.length; i++) {
            this.listing.push(listing[i]);
          }
          if (!this.iscalledjs) {
            this.callJs();
          }

          $('.Chemistlisting_Page').fadeIn(500);
          // if(listing.length==0){
          // //  alert('3')

          // }
          //  this.business_details=
          this.loadingBar.stop();

          if (this.state.redirectdata != '') {
            this.state.redirectdata = '';
            this.global.saveAppState(this.state);
            if (this.aroute.snapshot.queryParams["enquirytype"] != undefined) {
              this.toggleEnquiryPopup('', this.aroute.snapshot.queryParams["enquirytype"]);
              this.enquiry.vendor_id = this.aroute.snapshot.queryParams["vendorid"];
              this.enquiry.sendtype = this.aroute.snapshot.queryParams["enquirytype"];
            }
          }

        }
        else if (dt.status == 201) {
          //    this.router.navigate(['unauth-access']);
          //  this.global.setToast('error','Sorry, no result found');
          this.is_show_footer = true;
          document.removeEventListener('scroll', this.handler, false);
          this.loadingBar.stop();

        }

      },
      (error) => {
        // this.router.navigate(['unauth-access']);
        this.loadingBar.stop();
        //   this.spinnerService.hide();
        console.log('RESPONSE FAILED'); console.log(error)
      }
    );

  }

  ngAfterViewInit() {


    this.handler = function () {


      if ($(window).scrollTop() + $(window).height() > $(document).height() - 100) {

        if (this.listing.length > 1) {
          //  this.global.setToast('info','Bottom reached');
          this.current_page = this.current_page + 1;
          this.getListing();


        }


        // ajax call get data from server and append to the div
      }
    }.bind(this);
    $(window).on("scroll", this.handler);

    setTimeout(() => {

     $('.filter').css('display','inline-block');
      $('.filter').click(function () {
        $('.Chemistlisting_Page .main_design .leftPanel').addClass('mobileView_filter');
      });
      $('.filter_part .panel_heading button').click(function () {
        $('.Chemistlisting_Page .main_design .leftPanel').removeClass('mobileView_filter');
      });
      // $('.Search_filterList').hide();
    }, 20);

  }
  ngOnDestroy() {

    // document.removeEventListener('scroll',this.handler,false);
    $(window).off("scroll", this.handler);
  }
  callJs() {
    setTimeout(() => {
      $("#discount_ranger").flatslider({
        min: this.filter.discount.min_default, max: this.filter.discount.max_default,
        step: 1,
        values: [this.filter.discount.min_value, this.filter.discount.max_value],
        range: true,
        einheit: '%'
      });
      $("#location_ranger").flatslider({
        min: this.filter.location_range.min_default, max: this.filter.location_range.max_default,
        step: 1,
        values: [this.filter.location_range.min_value, this.filter.location_range.max_value],
        range: true,
        einheit: 'Km'
      });

      $(".BusinessTypeTabs").owlCarousel({
        items: 4,
        navigation: true,
        trueslideSpeed: 300,
        paginationSpeed: 500,
        autoPlay: 5000,
        autoplayTimeout: 500,
        responsive: true,
        responsiveRefreshRate: 200,
        responsiveBaseWidth: window,
      });

      //   $('.rating').addRating();
      this.iscalledjs = true;
      //$('#'+obj.settings.fieldId).val(numRating);
    }, 20);

  }

  onApplyFilter() {

    console.log(this.filter);

    // let discount = ($("#discount_ranger").val() == '') ? this.filter.discount.min_value + ';' + this.filter.discount.max_value : $("#discount_ranger").val();
    // //let discount_max=$( "#discount_ranger" ).val();
    // let distance = ($("#location_ranger").val() == '') ? this.filter.location_range.min_value + ';' + this.filter.location_range.max_value : $("#location_ranger").val();
    // let flag: boolean = false;

    // if (discount.length > 0) {


    //   let dmin = discount.split(';')[0];
    //   let dmax = discount.split(';')[1];

    //   this.filter.discount.min_value = dmin;
    //   this.filter.discount.max_value = dmax;
    //   flag = true;
    // }
    // if (distance.length > 0) {



    //   let dmin = distance.split(';')[0];
    //   let dmax = distance.split(';')[1];

    //   this.filter.location_range.min_value = dmin;
    //   this.filter.location_range.max_value = dmax;
    //   flag = true;
    // }

    this.isfilter = true;
    this.current_page = 1;
    this.listing = [];


    this.getListing();
    //  this.router.navigate(['/chemist-listing'], { queryParams: {lat:this.userloc.lat,long:this.userloc.long,filter:true} })
    //   if(flag){
    //     //this.current_page=1;
    //     //this.listing=[];
    //  //   this.navigateByQueryString();
    //   }

    // console.log(this.filter);
    // console.log(this.aroute.queryParams);
    // this.router.navigate(['chemist-listing'], { queryParams: {discount_min:4,discount_max:14,} })
    //let distance_max=$( "#discount_ranger" ).val();

    //this.filter.discount.min_value=
  }

  navigateByQueryString() {


    this.router.navigate(['chemist-listing'],

      {
        queryParams:

        {
          filter: true,
          lat: this.state.userloc.lat,
          long: this.state.userloc.long,

          discount_min: this.filter.discount.min_value,
          discount_max: this.filter.discount.max_value,
          rating: this.filter.rating

        }
      })

    // let query:any=this.aroute.queryParams;
    // query=query._value;

    // if(query.filter==undefined){

    //   //set Default Filter
    // }
    // console.log(query.filter);

  }
  setRating() {

    //   $('.rating').showRating();
    let rating = $('.material-icons.selected').length;
    this.filter.rating = rating;


  }

  onResetFilter() {

    $('.openclose').removeClass('active');
    $('.discfilter').removeClass('active');
    this.filter = {
      'discount': { 'min_default': 0, 'max_default': 100, 'min_value': 0, 'max_value': 100, },
      'location_range': { 'min_default': 0, 'max_default': 10, 'min_value': 0, 'max_value': 10, },
      'rating': 0,
      'sort_by': '',
      'apc_trusted': 0,
      'open_close_status': 0

    };
    this.isfilter = false;
    this.listing = [];
    this.getListing();
    // console.log('Reset Filter');
    // $( "#discount_ranger" ).flatslider({
    //   min: this.filter.discount.min_default, max: 100,
    //   step: 1,
    //   values: [this.filter.discount.min_value, this.filter.discount.max_value],
    //   range: true,
    //   einheit: '%'
    // });
    // $( "#location_ranger" ).flatslider({
    //   min:this.filter.location_range.min_default, max: this.filter.location_range.max_default,
    //   step: 1,
    //   values:  [this.filter.location_range.min_value, this.filter.location_range.max_value],
    //   range: true,
    //   einheit: 'Km'
    // });

  }



  // handleScroll(event: ScrollEvent) {

  //   // event.preventdefault();
  //   console.log(event);

  //  //  console.log('scroll occurred', event.originalEvent);
  //    if (event.isReachingBottom && this.is_scrolled===false) {
  //     // alert('reached');
  //     //  this.is_scrolled=true;
  //     //  this.loadMoreHandler();
  //    // alert(event.isReachingBottom);
  //      console.log(`the user is reaching the bottom`);
  //    }
  //    if (event.isReachingTop) {
  //     // alert('top');
  //    //  console.log(`the user is reaching the top`);
  //    }
  //    if (event.isWindowEvent) {
  //    //  console.log(`This event is fired on Window not on an element.`);
  //    }

  //  }


  toggleEnquiryPopup(list = '', sendtype) {



    let lst: any = list;
    if (!this.state.is_logged_in) {

      let redirecturl = '';
      // redirecturl=redirecturl+"&enquirytype=single&vendorid="+lst.vendor_id;
      let tempobj: any = {
        lat: this.userloc.lat, long: this.userloc.long, keywordid: this.keywords.keywordid, keywordname: this.keywords.keywordname,
        keywordtype: this.keywords.keywordtype, enquirytype: sendtype, vendorid: lst.vendor_id
      };
      this.state.redirectdata = tempobj;
      this.global.saveAppState(this.state);
      this.router.navigate(['/login'], { queryParams: { redirecturl: 'chemist-listing' } });


    }
    else {
      this.enquiry.sendtype = sendtype;

      if (this.isenquiry) {

        this.isenquiry = false;

      }
      else {

        this.enquiry.product_id = this.keywords.keywordid;
        this.enquiry.product_name = this.keywords.keywordname;
        this.enquiry.otpval = '';
        this.enquiry.selecteddata = list;
        this.isenquiry = true;



      }
    }

  }
  onStartEnquiry() {
    //console.l

  }

  onTabsClick(type) {


    $('.link').removeClass('active');

    $('#tab_' + type.id).addClass('active');

  }

  onSubmitEnquiry() {



    this.enquiry.product_quantity = $('#eqty').val();

    if (this.enquiry.product_description == '') {

      this.global.setToast('error', 'Product description is required');
    }
    else if (this.enquiry.product_quantity == '') {

      this.global.setToast('error', 'Product qty is required');
    }

    else {

      let data;



      if (this.enquiry.sendtype == 1) {

        data = "vendor_id =" + this.enquiry.vendor_id + "&keyword_id=" + this.keywords.keywordid + "&mapping_type=" + this.keywords.keywordtype +
          "&latitude=" + this.state.userloc.lat + "&longitude=" + this.state.userloc.long + "&product_id=" + this.keywords.keywordid +
          "&product_name=" + this.keywords.keywordname + "&product_quantity=" + this.enquiry.product_quantity + "&product_unit=" + this.enquiry.product_unit +
          "&product_description=" + this.enquiry.product_description + "&session_id=1323232" + "&user_id=" + this.state.user.id + "&user_type_id=" + this.state.user.user_type_id + "&name=" + this.state.user.first_name +
          "&mobile_no=" + this.state.user.mobile_number + "&email_id=" + this.state.user.email + "&device_type=" + this.enquiry.device_type +
          "&device_id=" + this.enquiry.device_id + "&device_token=" + this.state.device_token;

      }
      else if (this.enquiry.sendtype == 0) {

        data = "vendor_id =" + this.enquiry.vendor_id + "&keyword_id=" + this.keywords.keywordid + "&mapping_type=" + this.keywords.keywordtype +
          "&latitude=" + this.state.userloc.lat + "&longitude=" + this.state.userloc.long + "&product_id=" + this.keywords.keywordid +
          "&product_name=" + this.keywords.keywordname + "&product_quantity=" + this.enquiry.product_quantity + "&product_unit=" + this.enquiry.product_unit +
          "&product_description=" + this.enquiry.product_description + "&session_id=1323232" + "&user_id=" + this.state.user.id + "&user_type_id=" + this.state.user.user_type_id + "&name=" + this.state.user.first_name +
          "&mobile_no=" + this.state.user.mobile_number + "&email_id=" + this.state.user.email + "&device_type=" + this.enquiry.device_type +
          "&device_id=" + this.enquiry.device_id + "&device_token=" + this.state.device_token;

      }



      this.api.enquiryNow(data).subscribe(
        (response) => {


          this.loadingBar.stop();

          var dt: any = response;
          this.enquiry = {
            'vendor_id': '', 'keyword_id': '', 'mapping_type': '', 'latitude': '', 'longitude': '',
            'product_id': '', 'product_name': '', 'product_quantity': '', 'product_unit': '',
            'product_description': '', 'user_id': '', 'user_type_id': '', 'name': '',
            'mobile_no': '', 'email_id': '', 'device_type': 'web', 'device_id': 'xxxx', 'device_token': 'xxxx',
            'otpval': '', 'otpenter': '', 'isotpset': 0, 'selecteddata': '', 'sendtype': 1
          };
          if (dt.status == 200) {

            this.global.setToast('info', dt.message);
            this.isenquiry = false;
            // this.enquiry.otpval = dt.data.otp;
            //   $("#eotpenter").focus();

          }
          else if (dt.status == 201) {
            this.global.setToast('error', dt.message);
            $('#ename').prop('readonly', false);
            $('#emobile').prop('readonly', false);
            $('#eemail').prop('readonly', false);
            $('#eqty').prop('readonly', false);
            $('#edesc').prop('readonly', false);
          }



        },
        (error) => {

          this.loadingBar.stop();
          //   this.spinnerService.hide();
          console.log('RESPONSE FAILED'); console.log(error)
        }
      );



    }
    //  this.enquiry.mobile_no=$('#emobile').val();


    // if (this.enquiry.isotpset == 0) {

    //   if (this.enquiry.product_description == '') {

    //     this.global.setToast('error', 'Product description is required');
    //   }
    //   else if (this.enquiry.product_quantity == '') {

    //     this.global.setToast('error', 'Product qty is required');
    //   }
    //   else if (this.enquiry.name == '') {

    //     this.global.setToast('error', 'Your name is required');
    //   }
    //   else if (this.enquiry.mobile_no == '') {

    //     this.global.setToast('error', 'Your mobile is required');
    //   }

    //   else if (this.enquiry.email_id == '') {

    //     this.global.setToast('error', 'Your email is required');
    //   }

    //   else {

    //     this.enquiry.is_show_otp=true;
    //     // $('.user_enquiry_details_wrapper').hide();
    //     // $('.enquiry_otp_wrapper').show();
    //    this.generateEnquiryOtp();


    //     // if(this.state.is_logged_in){

    //     //   this.onFinalSubmitEnquiry();

    //     // }
    //     // else  if(!this.state.is_logged_in){

    //     //   $('#ename').prop('readonly', true);
    //     //   $('#emobile').prop('readonly', true);
    //     //   $('#eemail').prop('readonly', true);
    //     //   $('#eqty').prop('readonly', true);
    //     //   $('#edesc').prop('readonly', true);
    //     //   $('.user_dtls_wrapper').css('opacity', '.3');
    //     //   this.enquiry.isotpset = true;
    //     //   this.generateEnquiryOtp();

    //     // }




    //   }

    // } else {

    //   this.onFinalSubmitEnquiry();
    // }


  }

  onFinalSubmitEnquiry() {


    //   this.loadingBar.start();
    if (parseInt(this.enquiry.otpval) != parseInt($('#eotpenter').val())) {
      this.global.setToast('error', 'OTP not valid');
    }
    else {

      this.loadingBar.start();
      let enquiry = this.enquiry.selecteddata;

      let userid = '';
      let user_type_id = '';
      if (this.state.is_logged_in == true) {

        userid = this.state.user.id;
        user_type_id = user_type_id;
      }


      let data;
      if (this.enquiry.sendtype == 1) {

        data = "vendor_id =" + enquiry.vendor_id + "&keyword_id=" + this.keywords.keywordid + "&mapping_type=" + this.keywords.keywordtype +
          "&latitude=" + this.state.userloc.lat + "&longitude=" + this.state.userloc.long + "&product_id=" + this.keywords.keywordid +
          "&product_name=" + this.keywords.keywordname + "&product_quantity=" + this.enquiry.product_quantity + "&product_unit=" + this.enquiry.product_unit +
          "&product_description=" + this.enquiry.product_description + "&session_id=1323232" + "&user_id=" + userid + "&user_type_id=" + user_type_id + "&name=" + this.enquiry.name +
          "&mobile_no=" + this.enquiry.mobile_no + "&email_id=" + this.enquiry.email_id + "&device_type=" + this.enquiry.device_type +
          "&device_id=" + this.enquiry.device_id + "&device_token=" + this.enquiry.device_token;

      }
      else if (this.enquiry.sendtype == 0) {

        data = "vendor_id =&keyword_id=" + this.keywords.keywordid + "&mapping_type=" + this.keywords.keywordtype +
          "&latitude=" + this.state.userloc.lat + "&longitude=" + this.state.userloc.long + "&product_id=" + this.keywords.keywordid +
          "&product_name=" + this.keywords.keywordname + "&product_quantity=" + this.enquiry.product_quantity + "&product_unit=" + this.enquiry.product_unit +
          "&product_description=" + this.enquiry.product_description + "&session_id=1323232" + "&user_id=" + userid + "&user_type_id=" + user_type_id + "&name=" + this.enquiry.name +
          "&mobile_no=" + this.enquiry.mobile_no + "&email_id=" + this.enquiry.email_id + "&device_type=" + this.enquiry.device_type +
          "&device_id=" + this.enquiry.device_id + "&device_token=" + this.enquiry.device_token;

      }



      this.api.enquiryNow(data).subscribe(
        (response) => {


          this.loadingBar.stop();

          var dt: any = response;
          this.enquiry = {
            'vendor_id': '', 'keyword_id': '', 'mapping_type': '', 'latitude': '', 'longitude': '',
            'product_id': '', 'product_name': '', 'product_quantity': '', 'product_unit': '',
            'product_description': '', 'user_id': '', 'user_type_id': '', 'name': '',
            'mobile_no': '', 'email_id': '', 'device_type': 'web', 'device_id': 'xxxx', 'device_token': 'xxxx',
            'otpval': '', 'otpenter': '', 'isotpset': 0, 'selecteddata': '', 'sendtype': 1
          };
          if (dt.status == 200) {

            this.global.setToast('info', dt.message);
            this.isenquiry = false;
            // this.enquiry.otpval = dt.data.otp;
            //   $("#eotpenter").focus();

          }
          else if (dt.status == 201) {
            this.global.setToast('error', dt.message);
            $('#ename').prop('readonly', false);
            $('#emobile').prop('readonly', false);
            $('#eemail').prop('readonly', false);
            $('#eqty').prop('readonly', false);
            $('#edesc').prop('readonly', false);
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

  generateEnquiryOtp() {


    this.loadingBar.start();

    let data = "mobile_number=" + this.enquiry.mobile_no + "&email_id=" + this.enquiry.email_id;



    this.api.enquiryOTP(data).subscribe(
      (response) => {


        this.loadingBar.stop();

        var dt: any = response;

        if (dt.status == 200) {

          this.enquiry.otpval = dt.data.otp;
          this.global.setToast('info', dt.message);
          $("#eotpenter").focus();

        }
        else if (dt.status == 201) {
          this.global.setToast('error', dt.message);
        }



      },
      (error) => {

        this.loadingBar.stop();
        //   this.spinnerService.hide();
        console.log('RESPONSE FAILED'); console.log(error)
      }
    );



  }

  onEditEnquiryDetails() {


    this.enquiry.is_show_otp = false;

    // $('.user_enquiry_details_wrapper').show();
    // $('.enquiry_otp_wrapper').hide();
    $('#ename').val(this.enquiry.name);
    setTimeout(() => {
      $('#eqty').val(this.enquiry.product_quantity);
    }, 20);

  }

  onResendOTP() {

    this.generateEnquiryOtp();
  }

  onChangeDiscount() {

    if (this.filter.sort_by != '') {

      this.isfilter = true;


      this.listing = [];
      this.getListing();

    }



  }

  onSetDiscountFilter(min: any, max: any) {

    $('.discfilter').removeClass('active');

    if (min == '0') {

      $('#disc0to5').addClass('active');

    }
    else if (min == '11') {

      $('#disc10to15').addClass('active');

    }
    else if (min == '16') {

      $('#disc15to20').addClass('active');

    }
    else if (min == '20') {

      $('#disc20toinfinity').addClass('active');

    }

    this.filter.discount.min_value = min;
    this.filter.discount.max_value = max;
    // console.log(this.filter);


  }

  onSetShopStatus(status) {

    $('.openclose').removeClass('active');
    if (status == '0') {

      $('#closenow').addClass('active');
      this.filter.open_close_status = 2;
    }
    else if (status == '1') {
      $('#opennow').addClass('active');
      this.filter.open_close_status = 1;
    }
  }

  onChangeApcTrustedStatus() {

    if (this.filter.apc_trusted == 0) {
      this.filter.apc_trusted = 1;
    }
    else {
      this.filter.apc_trusted = 0;
    }
    // this.filter.apc_status= !this.filter.apc_status;

  }

}
