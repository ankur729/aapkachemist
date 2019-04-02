import { Component, OnInit, ViewChild, Output } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { Api } from '../api.service';
import { AppGlobals } from '../app.global';
import { HeaderComponent } from '../incl/header/header.component';

declare var $: any;


@Component({
  selector: 'app-medicine-list',
  templateUrl: './medicine-list.component.html',
  styleUrls: ['./medicine-list.component.css']
})
export class MedicineListComponent implements OnInit {
  current_page = 1;
  cartcount: any;


  is_show_footer: boolean = false;
  isnodatafound: boolean = false;

  @Output() nodataobj: any = { 'page': '', 'txt': '' };
  @ViewChild('child')
  private child: HeaderComponent;
  filter: any = {
    'discount': { 'min_default': 0, 'max_default': 100, 'min_value': 0, 'max_value': 100, },
    'price': { 'min_default': 0, 'max_default': 2000, 'min_value': 0, 'max_value': 2000 },
    'rating': 0,
    'sort_by': ''

  };

  state: any;
  userloc: any = { 'lat': '', 'long': '' };
  category_id = '';
  listing: any = [];
  is_scrolled: boolean = false;
  isfilter: boolean = false;
  iscalledjs: boolean = false;
  handler: any;
  categories_list: any = [];
  seourl: any = '';
  constructor(private aroute: ActivatedRoute, private router: Router, private loadingBar: LoadingBarService, private api: Api, public global: AppGlobals,
  ) {
  this.state = this.global.getAppState()


  }

  ngOnInit() {

    $('.pageSetting').hide();
    $('.main_design').hide();
    this.aroute.params.subscribe(params => {

      //   this.category_id= this.aroute.snapshot.queryParams["categoryid"];
      this.seourl = this.aroute.snapshot.paramMap.get('seourl');

      $('.searchResultdiv').css('display', 'none');
      $('.input_box').val('');
      this.getListing();
    });


  }

  ngAfterViewInit() {

    //  this.handler= $(window).scroll(()=> {
    //     if($(window).scrollTop() == $(document).height() - $(window).height()) {

    //       if(this.listing.length>8){
    //       //  this.global.setToast('info','Bottom reached');
    //         this.current_page=this.current_page+1;
    //         this.getListing();
    //         console.log('reached');
    //       }


    //            // ajax call get data from server and append to the div
    //     }
    // });


    this.handler = function () {
      if ($(window).scrollTop() == $(document).height() - $(window).height()) {

        if (this.listing.length > 8) {
          //  this.global.setToast('info','Bottom reached');
          this.current_page = this.current_page + 1;
          this.getListing();
       //   console.log('reached');
        }
        else{
          
          // this.isnodatafound=false;
          this.is_show_footer=true;

        }


        // ajax call get data from server and append to the div
      }
    }.bind(this);
    $(window).on("scroll", this.handler);


  }

  ngOnDestroy() {

    // document.removeEventListener('scroll',this.handler,false);
    $(window).off("scroll", this.handler);
  }

  getListing() {

    let data;
    if (!this.isfilter) {

      // data="?category_id="+this.category_id+"&min_discount=&max_discount=&min_price=&max_price=&rating=&page="+this.current_page;
      data = "?category_seo_url=" + this.seourl + "&min_discount=&max_discount=&min_price=&max_price=&rating=&page=" + this.current_page;
    }
    else {
      //Set default filter parmas
      data = "?category_seo_url=" + this.seourl + "&from_user_type_id=1&to_user_type_id=2&lat=" + this.userloc.lat + "&long=" + this.userloc.long
        + "&min_discount=" + this.filter.discount.min_value + "&max_discount=" + this.filter.discount.max_value
        + "&page=" + this.current_page + "&sort_by=" + this.filter.sort_by;
      //  data="?category_id="+this.category_id+"&from_user_type_id=1&to_user_type_id=2&lat="+this.userloc.lat+"&long="+this.userloc.long
      //       +"&min_discount="+this.filter.discount.min_value+"&max_discount="+this.filter.discount.max_value
      //       +"&page="+this.current_page+"&sort_by="+this.filter.sort_by;
      // +"&min_range="+this.filter.location_range.min_value+"&max_range="+this.filter.location_range.max_value;

    }
    // data="?from_user_type_id=1&to_user_type_id=2&lat="+this.userloc.lat+"&long="+this.userloc.long
    //  +"&min_discount="+this.filter.discount.min_value+"&max_discount="+this.filter.discount.max_value;
    // +"&min_range="+this.filter.location_range.min_value+"&max_range="+this.filter.location_range.max_value;


    //console.log(data);
    this.loadingBar.start();

    if (this.listing.length == 0) {
      $('.cartListing').hide();
    }

    this.api.getProductListing(data).subscribe(
      (response) => {
       


        var dt: any = response;


       
        if (dt.status == 200) {

          $('.main_design').show();
          $('.pageSetting').show();
          //  this.businesstypes=dt.data;
          // if(this.isfilter){
          //   //alert('3');
          //   this.listing=[];
          // }
          let listing = dt.data.product_list;

          // $('.chemist_listing').fadeIn(500);
          for (let i = 0; i < listing.length; i++) {
            this.listing.push(listing[i]);
          }


          if (!this.iscalledjs) {
            this.callJs();
          }

          $('.cartListing').fadeIn(500);
          //  this.business_details=
          this.loadingBar.stop();


        }
        else if (dt.status == 201) {

          this.getCategoriesById();
         
          this.nodataobj.page = 'enquiry';
          this.nodataobj.txt = "We are Updating Inventory, Products will be available soon.";
          //   this.global.setToast('error','Sorry, no result found');
          this.loadingBar.stop();

        }

        if(this.listing.length==0 && dt.status==201){
          this.isnodatafound = true;
        }
        if(this.listing.length>0 && dt.status==201){
          this.isnodatafound = false;
          this.is_show_footer=true;
        }

      },
      (error) => {

        this.loadingBar.stop();
        //   this.spinnerService.hide();
        console.log('RESPONSE FAILED'); console.log(error)
      }
    );

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
      $("#price_ranger").flatslider({
        min: this.filter.price.min_default, max: this.filter.price.max_default,
        step: 1,
        values: [this.filter.price.min_value, this.filter.price.max_value],
        range: true,
        einheit: 'Rs'
      });


      //      $('.rating').addRating();
      this.iscalledjs = true;
      //$('#'+obj.settings.fieldId).val(numRating);
    }, 20);

  }

  onApplyFilter() {

 //   console.log($("#discount_ranger").val())
    let discount = ($("#discount_ranger").val() == '') ? this.filter.discount.min_value + ';' + this.filter.discount.max_value : $("#discount_ranger").val();
    //let discount_max=$( "#discount_ranger" ).val();
    let price = ($("#price_ranger").val() == '') ? this.filter.price.min_value + ';' + this.filter.price.max_value : $("#location_ranger").val();
    let flag: boolean = false;

    if (discount.length > 0) {
  //    console.log('1');
  //    console.log(discount);
      let dmin = discount.split(';')[0];
      let dmax = discount.split(';')[1];

      this.filter.discount.min_value = dmin;
      this.filter.discount.max_value = dmax;
      flag = true;
    }
    if (price.length > 0) {

  //    console.log('2');
      let dmin = price.split(';')[0];
      let dmax = price.split(';')[1];

      this.filter.price.min_value = dmin;
      this.filter.price.max_value = dmax;

      flag = true;
    }

    this.isfilter = true;
    this.current_page = 1;
    this.listing = [];

    //  $('.ui-slider-handleui-state-default ui-corner-all').css('left','100%')

    this.getListing();
    //this.router.navigate(['/chemist-listing'], { queryParams: {lat:this.userloc.lat,long:this.userloc.long,filter:true} })
    if (flag) {
      //this.current_page=1;
      //this.listing=[];
      //   this.navigateByQueryString();
    }

    // console.log(this.filter);
    // console.log(this.aroute.queryParams);
    // this.router.navigate(['chemist-listing'], { queryParams: {discount_min:4,discount_max:14,} })
    //let distance_max=$( "#discount_ranger" ).val();

    //this.filter.discount.min_value=
  }



  setRating() {

    //   $('.rating').showRating();
    let rating = $('.material-icons.selected').length;
    this.filter.rating = rating;


  }

  onResetFilter() {
    this.filter = {
      'discount': { 'min_default': 0, 'max_default': 100, 'min_value': 0, 'max_value': 100, },
      'price': { 'min_default': 0, 'max_default': 2000, 'min_value': 0, 'max_value': 2000, },
      'rating': 0

    };
    this.isfilter = false;

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

  addToCart(productdata) {


  //  console.log(productdata);

    if (this.api.validateOrCreateSession()) {

   //   console.log('11');
      productdata['product_qty'] = '1';
      this.addToCartFn(productdata)

      if ($('#list_' + productdata.product_id).text() == 'Go To List') {

        this.router.navigate(['/cart-step-one']);
      }
      else {
        $('#list_' + productdata.product_id).text('Go To List');
      }



      //      $('#list_'+productdata.product_id).text('Added to List');
      //$('#prod_'+productdata.product_id).text('Go To cart');
      //   if(this.api.addToCartFn(this.productdata)){

      //  //   this.child.cartCountEvent();

      //   }
      //   setTimeout(() => {

      //   }, 20);


    }
    else if (!this.api.validateOrCreateSession()) {

    //  console.log('12');
      this.global.setToast('error', 'Please login or register to continue');

    }



  }


  addToCartFn(productdata) {


    let state = this.global.getAppState();
    this.state=state;
   // console.log('Current state');
 //   console.log(state);
    let cdata = { 'sessionid': '', 'user_id': '', 'product_id': '', 'product_qty': '' };

    let direct_enquiry:any=0;
    if(this.state.vendor_id!=0){
      direct_enquiry=1;
      
    }
    cdata.sessionid = state.cartdata.session_id;
    cdata.user_id = state.user.id;
    cdata.product_id = productdata.product_id;
    cdata.product_qty = productdata.product_qty;

    if (cdata.sessionid == 'undefined' || cdata.sessionid == undefined) {
      cdata.sessionid = '';
    }
    // this.global.updateCart(cdata);
  //  console.log(cdata);
    let data:any;
    if (this.state.is_logged_in) {
      data = "session_id=" + cdata.sessionid + "&user_id=" + this.state.user.id + "&product_id=" + cdata.product_id + "&product_qty=" + cdata.product_qty+"&direct_enquiry="+direct_enquiry+"&vendor_id="+this.state.vendor_id;
    }
    else if (!this.state.is_logged_in) {
      data = "session_id=" + cdata.sessionid + "&user_id=&product_id=" + cdata.product_id + "&product_qty=" + cdata.product_qty+"&direct_enquiry="+direct_enquiry+"&vendor_id="+this.state.vendor_id;
    }

  //  console.log(data);

    this.api.updateCart(data).subscribe(
      (response) => {
     ///   console.log('IN SEO');
    //    console.log(response);


        var dt: any = response;

        //    this.global.setToast('info',dt.message);

        if (dt.status == 200) {

          this.global.setToast('info', 'Item Added to your list');

          //this.child.c
          // this.child.cartcount=2;
          this.child.cartCountEvent();
          //     this.addresses=dt.data;
          //   this.router.navigate(['/cart-step-one']);


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

  onChangeDiscount() {

    this.isfilter = true;
   // console.log(this.filter.sort_by);
    this.listing = [];
    this.getListing();

  }

  getCategoriesById() {


    let data;
    // if (!this.state.is_logged_in) {
    //   data = "from_user_id=&from_user_type_id=&to_user_id=" + this.todata.to_user_id + "&to_user_type_id=" + this.todata.to_user_type_id;
    // }
    // else {
    //   data = "from_user_id=" + this.state.user.id + "&from_user_type_id=" + this.state.user.user_type_id + "&to_user_id=" + this.todata.to_user_id + "&to_user_type_id=" + this.todata.to_user_type_id;
    // }
    data = "parent_id=0&user_entity_type=" + this.state.user_type + "&lat=" + this.state.userloc.lat + "&long=" + this.state.userloc.long;

   // console.log(data);
    //this.loadingBar.start();
    this.api.getCategoriesById(data).subscribe(
      (response) => {
       // console.log('category list');
     //   console.log(response);


        var dt: any = response;

        if (dt.status == 200) {

          this.categories_list = dt.data.categories_list;

          // let timingarr = [];
          // let timings = dt.data.business_timing;
          // timings.map(elem => { elem.istoday = '0' });

          // this.respdata.business_timing = timings;

          // if (dt.data.business_timing.length > 0) {

          //   timingarr = dt.data.business_delivery.payment_mode.split(',');
          //   dt.data.payment_mode.map(elem => {
          //     elem['ischecked'] = '0';
          //   });
          //   console.log(timingarr);
          //   for (let i = 0; i < timingarr.length; i++) {
          //     dt.data.payment_mode.map(elem => {

          //       if (elem.id == timingarr[i]) {

          //         elem['ischecked'] = '1';
          //       }

          //     })

          //   }


          // }
          // this.respdata.payment_mode = dt.data.payment_mode;

          // this.respdata.gallery_img = dt.data.gallery_img;

          // this.respdata.business_delivery.min_amt_free_delivery = dt.data.business_delivery.min_amt_free_delivery;
          // this.respdata.business_delivery.open_time = dt.data.business_delivery.open_time;
          // this.respdata.business_delivery.close_time = dt.data.business_delivery.close_time;
          // this.respdata.business_delivery.discount_percent = dt.data.business_delivery.discount_percent;
          // this.respdata.business_delivery.open_close_status = dt.data.business_delivery.open_close_status;



          // this.respdata.social_data.facebook_url = dt.data.social_data.facebook_url;
          // this.respdata.social_data.google_plus_url = dt.data.social_data.google_plus_url;
          // this.respdata.social_data.instagram_url = dt.data.social_data.instagram_url;
          // this.respdata.social_data.linkedin_url = dt.data.social_data.linkedin_url;
          // this.respdata.social_data.pinterest_url = dt.data.social_data.pinterest_url;
          // this.respdata.social_data.twitter_url = dt.data.social_data.twitter_url;

          // this.respdata.user_data.vendor_shopname = dt.data.user_data.vendor_shopname;
          // this.respdata.user_data.address = dt.data.user_data.address;
          // this.respdata.user_data.area = dt.data.user_data.area;
          // this.respdata.user_data.vendor_mobile = dt.data.user_data.vendor_mobile;
          // this.respdata.user_data.whatsapp_no = dt.data.user_data.whatsapp_no;
          // this.respdata.user_data.landline = dt.data.user_data.landline;
          // this.respdata.user_data.vendor_summary = dt.data.user_data.vendor_summary;
          // this.respdata.user_data.vendor_rating = dt.data.user_data.vendor_rating;
          // this.respdata.user_data.is_favourite = dt.data.user_data.is_favourite;
          // this.respdata.user_data.total_favourite = dt.data.user_data.total_favourite;
          //   $('.chemistDetail_page').fadeIn(800);

          //this.callJS();
          // this.loadingBar.stop();


          // if(this.respdata.business_timing.length>0){
          //   this.checkIfDateIsTodaysDate();
          // }

        }
        else if (dt.status == 201) {

          this.global.setToast('error', dt.message);
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
}
