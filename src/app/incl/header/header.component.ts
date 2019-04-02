import { Component, OnInit, ViewChild, ElementRef, NgZone, Input, Output, EventEmitter } from '@angular/core';
import { AppGlobals } from '../../app.global';
import { MapsAPILoader } from '@agm/core';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Api } from '../../api.service';


declare var $: any;
declare const google: any;
declare var jQuery: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  state: any;
  @Input() addr: any = { 'formatted_addr': '', 'pincode': '', 'area': '', 'city': '', 'lat': '', 'long': '' };
  is_search_listing: boolean = false;
  is_result_get: boolean;

  productresp: any = [];
  searchresp: any = [];
  company_data: any = [];
  generic_data: any = [];
  @Output() locupdateevent = new EventEmitter<any>();
  @Input() cartcount: any = 0;
  issearchloader: boolean = false;
  vendor_confirm_popup: boolean = false;

  constructor(public global: AppGlobals, private mapsAPILoader: MapsAPILoader, private loadingBar: LoadingBarService,
    private ngZone: NgZone, private router: Router, private api: Api, private aroute: ActivatedRoute) {





  }

  @ViewChild('search') public searchElement: ElementRef;

  ngOnInit() {



    // if (this.global.getAppState() == null) {

    //   this.global.initState();
    //   this.state = this.global.getAppState();
    //   this.cartcount = this.state.cartdata.cartcount;


    // }
    // else {

    //   this.state = this.global.getAppState();
    //   this.cartcount = this.state.cartdata.cartcount;

    // }

  //   setTimeout(() => {
    
  //     $(".account-dropdown").click(function(){
  //       $(".dropdown-option-list").toggle();

  //     });
  // }, 200);
    

  setTimeout(() => {
    $(".btn-dropdown-toggle").click(function () {
    $(".menulink-cover").niceScroll({ cursorborder: "", cursorcolor: "#rgb(130, 202, 194)", boxzoom: false });
    $(".dropdown-option-list").toggleClass("showDropdown");
    });
    $(document).click(function (e) {
    if (!$(e.target).is(".account-dropdown, .account-dropdown *,.dropdown-option-list, .dropdown-option-list *")) {
    $(".dropdown-option-list").removeClass("showDropdown");
    }
    });

    
    }, 200);

  
    this.loadMapApi();
    this.state = this.global.getAppState();
  
    this.cartcount = this.state.cartdata.cartcount;

    // if(this.state.top_categories.length==0 && $(window).width() < 768){
    //   this.loadTopCategories();
    // }
    //  this.cartcount=this.state.cartdata.cartcount;

    //    this.cartCountEvent();
    // this.cartcount.subscribe(event => {

    //   // called when the notifyChildren method is
    //   // called in the parent component
    // });


  }

  loadTopCategories() {
    
 
    let userid:any='';
    if(this.state.user != ''){
      userid=this.state.user.id;
    }
    //$('#topcontainer').hide();
    let data;
    if (this.state.is_logged_in) {

      data = "user_type_id=2&user_entity_type=" + this.state.user_type+"&session_id="+this.state.cartdata.session_id+"&session_id="+this.state.cartdata.session_id+"&user_id="+userid+"&lat="+this.state.userloc.lat+"&long="+this.state.userloc.long;
    }
    else if (this.state.is_logged_in == false) {

      data = "user_type_id=2" + "&user_entity_type=" + this.state.user_type+"&session_id="+this.state.cartdata.session_id+"&session_id="+this.state.cartdata.session_id+"&user_id="+userid+"&lat="+this.state.userloc.lat+"&long="+this.state.userloc.long;;
    }

  
    
   // this.loadingBar.start();
    this.api.fetchHomeData(data).subscribe(
      (response) => {

        
        let dt: any = response;
      //   console.log('GETTING FROM HEADER');
      //  console.log(dt);
        if (dt.status == 200) {

        //   this.data.top_categories_list = dt.data.top_categories_list;

        //   this.data.login_type_list = dt.data.login_type_list;
        //   this.data.user_data = dt.data.user_data;
        //   if ($(window).width() < 768) {
        //    // alert('asdf');
        //     this.data.slider_data = dt.data.app_slider_data;
        //  }
        //  else {
        //   this.data.slider_data = dt.data.web_slider_data;
        //  }
        //this.data.slider_data = dt.data.web_slider_data;
   

          this.state.top_categories=dt.data.top_categories_list;
          this.global.saveAppState(this.state);
       //   console.log(this.global.getAppState());
       //   }
       

        }
        else if (dt.status == 201) {
          this.global.setToast('error', dt.message);
        }

        this.loadingBar.stop();
      },
      (error) => {

        console.log('RESPONSE FAILED'); console.log(error)
      }
    );
    //   }


  }
  ngAfterViewInit() {
   

    $('location_search_wrapper .input_box').focus(function(){
      alert('fghfhgf');
      // $('location_search_wrapper').css('box-shadow','0px 1px 10px rgba(0, 151, 136, 0.58)')
    });

    $("header .locationToggle").click(() => {

      $(".locationPopup .slide_right").animate({
        top: "0px"
      });
      $(".locationPopup").fadeIn(100);

      $('#locsearch').val('');

    });


    $(".locationPopup .slide_right .close_popup , .overlay").click(function () {
      $(".locationPopup .slide_right").animate({
        top: "-50px"
      });
      $(".locationPopup").fadeOut(500);
    });


    $(".prelaunchPopup .designBox .insideBox .headPart .skipBtn").click(function () {
      $(".prelaunchPopup .designBox").animate({
        top: "-50px",
        opacity: "0"
      });
      $(".prelaunchPopup").fadeOut(500);
    });

    $(".menu_Popup .slide_right .menuAcconuntPanel .MainTitle").click(function () {
      $(".menu_Popup .slide_right .menuAcconuntPanel").removeClass("active");
      $(this).parent(".menuAcconuntPanel").addClass("active");
      $(".menu_list").hide(300);
      $(this).next(".menu_list").show(300);


    });

    $(document).on("click", ".search_input_overlay", function () {
      $(".searchResultdiv, .header .searchResultdiv").hide();

    });

    $(".menuMobileToggle").click(function () {
      //  alert('3');
      $('.mobile_leftstructure .design_part').animate({
        left:'0px'
      })
        $(".mobile_leftstructure").fadeIn();
        $(".mobile_leftstructure").append("<div class='overlay'></div>");
      });
  
     
      $(document).on("click", ".mobile_leftstructure .overlay", function(){
        $('.mobile_leftstructure .design_part').animate({
          left:'-265px'
        })
        $(".mobile_leftstructure").fadeOut();
        $(".mobile_leftstructure .overlay").remove();
    });

    
      $('.MviewLocation_wrapper .left_part').click(function(){
          $('.searchLocation_wrapper').addClass('search_loc');
      })
      $('.searchLocation_wrapper .close').click(function(){
          $('.searchLocation_wrapper').removeClass('search_loc')
      })

    // $("header .locationToggle").click(function () {
    //   $(".locationPopup .slide_right").animate({
    //     left: "0px"
    //   });
    //   $(".locationPopup").fadeIn(100);
    // });


    // $(".locationPopup .slide_right .close_popup , .overlay").click(function () {
    //   $(".locationPopup .slide_right").animate({
    //     left: "-400px"
    //   });
    //   $(".locationPopup").fadeOut(500);
    // });

    $(window).scroll(function () {
      var megamenu = $('header'),
        scroll = $(window).scrollTop();

      if (scroll >= 85) megamenu.addClass('fixedHeader');
      else megamenu.removeClass('fixedHeader');
    });

    $(document).on("click", "header .topHeader .SearchToggleBtn", function () {
      $(this).parents(".topHeader").next(".search_design").addClass("fixed");
    });

    $("header  .menuBtn").click(function () {
      $(".menu_Popup").find(".slide_right").animate({
        right: "0px"
      });
      $('.aside-bar').animate({
        right:'0'
      });
      $(".menu_Popup").fadeIn(100);
    });


    $(".menu_Popup .slide_right .close_popup , .menu_Popup .overlay").click(function () {
      $(".menu_Popup .slide_right").animate({
        right: "-300px"
      });
      $('.aside-bar').animate({
        right:'-300px'
      });
      $(".menu_Popup").fadeOut(500);
    });





    $(document).on("click", "header .search_design.fixed .close_sreach", function () {
      $("header .search_design.fixed").removeClass("fixed");
      $('.searchResultdiv').css('display', 'none');
      $('#searchval').val('');
    });
    // $("header .topHeader .right_part .icon_menu .list .menuBtn").click(function(){
    //   $(".menu_Popup").find(".slide_right").animate({
    //     right: "0px"
    //   });
    //   $(".menu_Popup").fadeIn(100);
    // });


    // $(".menu_Popup .slide_right .close_popup , .menu_Popup .overlay").click(function(){

    //   $(".menu_Popup .slide_right").animate({
    //     right: "-300px"
    //   });
    //   $(".menu_Popup").fadeOut(500);

    // });


    // $(document).on("click" , "header.fixedHeader .topHeader .SearchToggleBtn" , function(){
    //   $(this).parents(".topHeader").next(".search_design").addClass("fixed");
    // });

    // $(document).on("click" , "header.fixedHeader .search_design.fixed .close_sreach" , function(){
    //   $("header.fixedHeader .search_design.fixed").removeClass("fixed");
    // });


    $(".login_btn").click(function () {
      $(".loginPopups .designBox .innerDesign .right_data .login_steps").hide();
      $(".loginPopups .designBox .innerDesign .right_data .login_steps#login_form").show();
      $(".registerBTN ").removeClass("active");
      $(".login_btn").addClass("active");
    });


    $(".loginPopups .designBox .innerDesign .right_data .forms_div .input_div .nextBTN").click(function () {
      $(this).parents(".login_steps").hide();
      $(this).parents(".login_steps").next(".login_steps").show();
    });


    $(".loginPopups .designBox .innerDesign .left_data .buttons .btns.registerBTN").click(function () {
      $(".loginPopups .designBox .innerDesign .right_data .login_steps").hide();
      $(this).addClass("active");
      $(".login_btn").removeClass("active");
      $(".loginPopups .designBox .innerDesign .right_data .login_steps#register_form").show();
    });


    $(".overlay , .close_popup").click(function () {
      $(".loginPopups").fadeOut();
    });

    $("header .topHeader .right_part .icon_menu .list .loginBtn").click(function () {
      $(".loginPopups").show();
    });

    // $('header.searchResultdiv:after').click(()=>{
    //   alert('asdf');
    //     $('.searchResultdiv').css('display','none');
    // })
  }



  loadMapApi() {

    // this.loadingBar.start();
    this.mapsAPILoader.load().then(
      () => {



        let autocomplete = new google.maps.places.Autocomplete(this.searchElement.nativeElement, { types: ['geocode'], componentRestrictions: { country: "in" } });
        //  this.loadingBar.stop();
        autocomplete.addListener("place_changed", () => {

          //    $('div').preloader();
        
          this.ngZone.run(() => {

            let place: google.maps.places.PlaceResult = autocomplete.getPlace();
            

            if (place.geometry === undefined || place.geometry === null) {
              return;
            }
            else {

              this.addr.formatted_addr = place.formatted_address;
              for (var i = 0; i < place.address_components.length; i++) {
                for (var j = 0; j < place.address_components[i].types.length; j++) {
                  if (place.address_components[i].types[j] == "postal_code") {

                    this.addr.pincode = place.address_components[i].long_name;
                  }

                  if (place.address_components[i].types[j] == "sublocality_level_1") {


                    this.addr.area = place.address_components[i].long_name;


                  }
                  if (place.address_components[i].types[j] == "administrative_area_level_1") {


                    this.addr.city = this.global.seoUrl(place.address_components[i].long_name);


                  }
                }
              }

              this.addr.lat = place.geometry.location.lat();
              this.addr.long = place.geometry.location.lng();

              this.state.userloc = this.addr;
              this.state.is_location_set = true;
              $('#locsearch').val(this.addr.area);
              this.global.saveAppState(this.state);
              setTimeout(() => {
                let redirecturl = this.aroute.snapshot.queryParams["redirect"];
                if (redirecturl == undefined) {
                  //   alert('2');
                  this.locupdateevent.emit(this.addr);
                  this.router.navigate(['/home'], { queryParams: { city: this.addr.city } })
                }
                else {

                  this.redirectToUrl(redirecturl);


                }
               
                // 
              }, 20);

            //  console.log(this.aroute.snapshot.url);

              // if(this.router.url =='/'){

              //   setTimeout(() => {
              //     $("html, body").animate({ scrollTop: $('.nearest_chemistList').offset().top- 100 }, 1000);
                 
              //   }, 3000);

              // }


              // $(".locationPopup .slide_right").animate({
              //   top: "-50px"
              // });
              // $(".locationPopup").fadeOut(500);
            }


            //   setTimeout(() =>{ 


            //       this.callLocationService();
            //     //  $('div').preloader('remove');

            // }
            //         , 1000);




          });
        });
      }
    );

  }

  autoDetectLocation() {
    
    this.loadingBar.start();
    console.log(this.router.url);
    // this.global.startLoader();
    //$.toast({title:'Please wait, fetching your location.!'});
    this.getCustomerCurrentPosition().then((results) => {

      console.log(results);

      this.addr.formatted_addr = results[0].formatted_address;
      this.searchElement.nativeElement.value = this.addr.formatted_addr

      for (var i = 0; i < results[0].address_components.length; i++) {

        for (var j = 0; j < results[0].address_components[i].types.length; j++) {

          if (results[0].address_components[i].types[j] == "postal_code") {

            this.addr.pincode = results[0].address_components[i].long_name;
          }

          if (results[0].address_components[i].types[j] == "sublocality_level_1") {

            this.addr.area = results[0].address_components[i].long_name;

          }
          if (results[0].address_components[i].types[j] == "administrative_area_level_1") {


            this.addr.city = this.global.seoUrl(results[0].address_components[i].long_name);

          }
        }
      }
      //this.addr.area
      if(this.addr.area==''){
        this.goToHigherLevelForArea(results);


      }
  
      this.addr.lat = results[0].geometry.location.lat();
      this.addr.long = results[0].geometry.location.lng();
      //    console.log(this.state);
      if(this.addr.area==''){

        this.global.setToast('error','Unable to get your current location, please type your location');

      }
      this.state.userloc = this.addr;
      this.state.is_location_set = true;
      //$('locsearch').val(this.addr.area);
      this.global.saveAppState(this.state);
      setTimeout(() => {


        let redirecturl = this.aroute.snapshot.queryParams["redirect"];
        if (redirecturl == undefined) {
          // alert('3');
          this.locupdateevent.emit(this.addr);
          $('#locsearch').val(this.addr.area);
          //  this.router.navigate(['/home'], { queryParams: { city: this.addr.city } })
        }
        else {

          this.redirectToUrl(redirecturl);

        }

  

      }, 20);
      //  this.router.navigate(['/home'], { queryParams: {city:this.addr.city} })
      this.loadingBar.stop();

      // $(".locationPopup .slide_right").animate({
      //   top: "-50px"
      // });
      // $(".locationPopup").fadeOut(500);




    }, function (errStatus) {
      this.loadingBar.stop();


      // $.toast({title:'Please try again.!'});
    });

  }

  goToHigherLevelForArea(results: any) {

    let isfound:string='0';

    for (var i = 0; i < results[1].address_components.length; i++) {

      for (var j = 0; j < results[1].address_components[i].types.length; j++) {



        if (results[1].address_components[i].types[j] == "sublocality_level_1") {

          this.addr.area = results[1].address_components[i].long_name;
        
          isfound='1';
          break;
        }

      }
      // if(i>=results[0].address_components.length){
      //   isfound='2';
      // }
    }
    return isfound;

  }

  getCustomerCurrentPosition() {

    var geocoder = new google.maps.Geocoder();

    return new Promise((resolve, reject) => {

      let geocoder = new google.maps.Geocoder();


      navigator.geolocation.getCurrentPosition((p) => {


        let LatLng = new google.maps.LatLng(p.coords.latitude, p.coords.longitude);



        var geocoder = geocoder = new google.maps.Geocoder();
        geocoder.geocode({ 'latLng': LatLng }, (results, status) => {

          if (status == google.maps.GeocoderStatus.OK) {

            if (results.length > 0) {

              resolve(results);

            } else {

              alert('GOOGLE AUTODETECTION WORK ONLY ON HTTPS SERVER..')
            }

          }

        });

      }, (err:any) => {

         
        //this.global.setToast('error',err.message);
        this.global.setToast('error','We are unable to fetch your location currently.');
       // alert('3');
        this.loadingBar.stop();
        this.state.userloc.area = 'delhi';
        this.state.userloc.city = 'delhi';
        this.state.userloc.formatted_addr = 'Delhi';
        this.state.userloc.lat = '28.704060';
        this.state.userloc.long = '77.102493';
        this.state.is_location_set = true;
        this.global.saveAppState(this.state);


        // $(".locationPopup .slide_right").animate({
        //   top: "-50px"
        // });
        // $(".locationPopup").fadeOut(500);
      });

    });


  }


  navigate(field) {

    if (field == 'my-account') {

      this.router.navigate(['/my-account']);
    }
    else if (field == 'login') {

      this.router.navigate(['/login']);
    }
    else if (field == 'sign-up') {

      this.router.navigate(['/sign-up']);
    }
    else if (field == 'home') {

      this.router.navigate(['/home']);
    }
    else if (field == 'cart') {

      this.router.navigate(['/cart-step-one']);
    }
    else if (field == 'chemist-account') {

      //this.router.navigate(['/chemist-account']);
      window.location.href="https://www.aapkachemist.com/vendor/";
     // this.vendor_confirm_popup = true;
      //   this.router.navigate(['/sign-up'], { queryParams: { usertype: 'retailer' } });
    }
    else if (field == 'categories') {

      //this.router.navigate(['/chemist-account']);
      this.router.navigate(['/categories']);
    }
    else if (field == 'help-center') {

      //this.router.navigate(['/chemist-account']);
      this.router.navigate(['/help-center']);
    }


  }

  // ngOnChanges(){


  //  // alert(this.cartcount);
  // }

  
  onReceiveCloseRefferPopupRequest($event){

    console.log($event);
  }
  toggleRefferPopup(mode){

      if(mode=='show'){
        $('.invite_friends_popup').fadeIn();
      }
      else if(mode=='hide'){
        $('.invite_friends_popup').fadeOut();
      }
    
  }

  
  onSearchChangeHandler(val: any, event: any) {



    if (val.trim().length == 0) {

      $('.searchResultdiv').css('display', 'none');
      this.is_result_get = false;
    }

    else if (val.trim().length > 0) {
 

      this.issearchloader = true;
      this.loadingBar.start();
      let data = "keyword=" + val + "&user_entity_type=" + this.state.user_type;


      this.api.getSearchData(data).subscribe(
        (response) => {


          var dt: any = response;
         console.log(dt);
          if ((dt.user_data.length > 0 || dt.product_data.length > 0 || dt.generic_data.length > 0 || dt.company_data.length > 0) && val.length > 0) {

            this.is_result_get = true;
            $('.search_input_overlay').show();
            setTimeout(() => {
              $('.searchResultdiv').css('display', 'block');
            }, 20);


            let dta = [];
            if (dt.product_data.length > 0) {

              // dta.push(dt.product_data)
            }
            this.productresp = dt.product_data;
            this.searchresp = dt.user_data;
            this.company_data = dt.company_data;
            this.generic_data = dt.generic_data;
            this.issearchloader = false;
            //            $('.main_container').click(function(){
            //   alert('2');

            // })

          }
          else if (dt.user_data.length < 1) {

            this.is_result_get = false;
            setTimeout(() => {
              $('.search_input_overlay').css('display', 'none');
              $('.searchResultdiv').css('display', 'none');
            }, 20);
            this.searchresp = [];
          }
          //    console.log(dt.d);
          this.loadingBar.stop();



        },
        (error) => {

          //  $('.preloader').fadeOut();
          //   this.spinnerService.hide();
          console.log('RESPONSE FAILED'); console.log(error)
        }
      );

    } else {


      $('.search_input_overlay').css('display', 'none');
      this.is_result_get = false;
      this.productresp = [];
      this.searchresp = [];
      this.company_data = [];
      this.generic_data = [];
      //$('.search_input_overlay').css('display', 'none');
      //$('.searchResultdiv').css('display', 'none');
      console.log('e');
    }




  }

  onSearchQueryHandler() {


    let val = $('#srch').val();


    if (val == '') {

      this.global.setToast('info', this.global.toastmsg.empty_search)
    }



  }


  toggleSearch() {


  }

  onLogout() {

    let user: any = { 'user_id': this.state.user.id, 'device_id': this.state.device_id };


    localStorage.removeItem('user');
    let sessionid = Math.floor(Date.now() / 1000);
    this.state.user = '';

    this.state.is_logged_in = false;
    this.state.is_logged_out = true;
    this.state.cartdata.session_id = sessionid;
    this.state.cartdata.cartcount = 0;
    this.state.cartdata.cart_amount = 0;
    this.state.cartdata.delivery_amount = 0;
    this.state.cartdata.gross_amount = 0;
    this.state.cartdata.items = [];
    this.state.prescription_arr=[];
    this.cartcount = 0;

    this.global.setToast('info', 'Logout successfully');

    this.global.saveAppState(this.state);
    this.router.navigate(['home']);
    $(".menu_Popup .slide_right").animate({
      right: "-300px"
    });
    $(".menu_Popup").fadeOut(500);
    // console.log(this.global.getAppState());
    //  this.clearDeviceData(user);
  }

  clearDeviceData(user) {

    let data = "user_id=" + user.user_id + "&device_id=" + user.device_id + "&device_type=0";
    //this.loadingBar.start();
    this.api.clearUserDeviceData(data).subscribe(
      (response) => {



      },
      (error) => {

        console.log('RESPONSE FAILED'); console.log(error)
      }
    );
  }

  navigateSearch(type, data) {


   // console.log(data);
    if (type == 'product') {
    //  this.router.navigate(['/medicine-detail'], { queryParams: { productid: data.product_id } })
    this.router.navigate(['/medicine-detail/'+data.seo_url]);
    
    }
    else if (type == 'chemist') {
      this.router.navigate(['/chemist-detail/'+data.seo_url])
    }
    else if (type == 'chemistlist') {

     
      this.router.navigate(['/chemist-listing'], { queryParams: { lat: this.state.userloc.lat, long: this.state.userloc.long, keywordid: data.keyword_id, keywordname: data.keyword_name, keywordtype: data.return_maping_type } })
    }
    $('.searchResultdiv').css('display', 'none');
    $('#headersearch').val('');
  }


  cartCountEvent() {


    //this.cartcount=this.state.
    let state = this.global.getAppState();
    this.state=state;
    if (state.cartdata.session_id != '') {

      let data = "session_id=" + state.cartdata.session_id + "&user_id=";
      //this.loadingBar.start();
      this.api.fetchCartData(data).subscribe(
        (response) => {


          var dt: any = response;
          let qty = parseInt(dt.cart_count);

          this.state.cartdata.cartcount = qty;
          this.state.cartdata.items = dt.data;
          this.cartcount = qty;
          this.global.saveAppState(this.state);

        },
        (error) => {

          console.log('RESPONSE FAILED'); console.log(error)
        }
      );
    }



  }

  navigateLeftMenu(field) {



    if (field == 'family-tree') {

      this.router.navigate(['/my-account/family-tree']);

    }
    else if (field == 'change-password') {

      this.router.navigate(['my-account/change-password']);

    }
    else if (field == 'update-profile') {

      this.router.navigate(['my-account/update-profile']);


    }
    else if (field == 'my-wallet') {

      this.router.navigate(['my-account/wallet']);

    }
    else if (field == 'my-notification') {

      this.router.navigate(['my-account/notification']);

    }
    else if (field == 'my-orders') {

      this.router.navigate(['my-account/orders']);

    }
    else if (field == 'my-chemist') {

      this.router.navigate(['my-account/chemist']);

    }
    else if (field == 'my-enquiries') {

      this.router.navigate(['my-account/enquires']);

    }
    else if (field == 'my-address') {

      this.router.navigate(['my-account/address']);


    }
    else if (field == 'retailer-orders') {

      this.router.navigate(['chemist-account/retailer-orders']);

    }
    else if (field == 'chemist-notification') {

      this.router.navigate(['chemist-account/notifications']);

    }
    else if (field == 'retailer-enquiry') {

      this.router.navigate(['chemist-account/retailer-enquiry']);

    }
    else if (field == 'stock-orders') {

      this.router.navigate(['chemist-account/stock-orders']);

    }

    else if (field == 'stock-enquiry') {

      this.router.navigate(['chemist-account/stock-enquiry']);

    }

    else if (field == 'notifications') {

      this.router.navigate(['chemist-account/notifications']);

    }
    else if (field == 'profile-setup') {

      // this.router.navigate(['chemist-account/profile-setup']);
      this.router.navigate(['chemist-account/profile-setup'], { queryParams: { step: '1' } });

    }
    else if (field == 'chemist-change-password') {

      this.router.navigate(['chemist-account/change-password']);


    }
    else if (field == 'chemist-update-profile') {

      this.router.navigate(['chemist-account/update-profile']);


    }

    else if (field == 'chemist-my-address') {


      this.router.navigate(['chemist-account/my-address']);


    }
    else if (field == 'chemist-account/dashboard') {

      this.router.navigate(['chemist-account/dashboard']);


    }

  }

  onScrollToDownloadApp() {

    let currurl: any = this.aroute.snapshot.url;

    if (currurl != 'home') {

      this.router.navigate(['/home'], { queryParams: { 'appdownloadlink': '' } });
      $('html, body').animate({
        scrollTop: $("#download_section").offset().top
      }, 1000);


    }
    else {
      $('html, body').animate({
        scrollTop: $("#download_section").offset().top
      }, 1000);
    }


  }

  redirectToUrl(redirecturl) {

    let addr: any = this.state.userloc;

    if (redirecturl == 'chemist-listing') {

      this.router.navigate(['/' + redirecturl], { queryParams: { lat: this.addr.lat, long: this.addr.long } })
    }
  }

  updateLocationFromParent(addr) {

  //  console.log(addr);
   // console.log(this.state);
   // alert('1');

    this.state.is_location_set = true;
    
    this.state.userloc = addr;
    this.global.saveAppState(this.state);

    // alert('2');
  }

  onReceiveProfileUpdateData(user) {


    this.state.user.first_name = user.user_name;
    this.state.user.mobile = user.mobile;
    this.state.user.profile_image_path = user.user_image_path;
    this.global.saveAppState(this.state);

  }

  // onReceiveCategories(categories){

  //   this.state.categories=categories;
  //   this.global.saveAppState(this.state);

  // }

  navigateCategory(category) {


    if (parseInt(category.total_count) > 0) {
      this.router.navigate(['/categories'], { queryParams: { id: category.category_id } });
    }
    else {
      this.router.navigate(['/medicine-listing'], { queryParams: { categoryid: category.category_id } })
    }

  }

  navigateMobileCategory(category:any) {

    

    if(category.no_link=='1'){
     // alert('3');



     $("header .mainHeader .insideDesign .right_part .icon_menu .list .input_box#headersearch").after("<span class='search_input_overlay'></span>");
     $(".search_input_overlay").show();
     $("header .mainHeader .insideDesign .right_part .icon_menu .list .input_box#headersearch").focus();

      $(document).on("click" , ".search_input_overlay" , function(){
        $(".search_input_overlay").remove();
      });
 

    }
    else if(category.total_count>0){
     
      //this.router.navigate(['/categories'], { queryParams: { id: category.category_id } });

      this.router.navigate(['/category/'+category.seo_url]);

    }
    else if(category.total_count==0){
     
      this.router.navigate(['/medicine-listing'], { queryParams: { categoryid: category.category_id } })

    }
    else{
      this.router.navigate(['/categories'], { queryParams: { id: category.category_id } });
    }
    // if (parseInt(category.total_count) > 0) {
    //   this.router.navigate(['/categories'], { queryParams: { id: category.category_id } });
    // }
    // else {
    //   this.router.navigate(['/medicine-listing'], { queryParams: { categoryid: category.category_id } })
    // }
  //  $(document).on("click", ".mobile_leftstructure .overlay", function(){
      $(".mobile_leftstructure").fadeOut(200);
      $(".mobile_leftstructure .overlay").remove();
  //});
  }

  onSearchFocus() {



  }
  onMobileSearchFocus() {

    $("header .mainHeader .insideDesign .right_part").after("<span class='search_input_overlay'></span>");
    $(".search_input_overlay").show();
    $("header .mainHeader .insideDesign .right_part").addClass("searchinput_focus");

    $(document).on("click", ".search_input_overlay", function () {
      $(".search_input_overlay").remove();
      $("header .mainHeader .insideDesign .right_part").removeClass("searchinput_focus");
    });
    setTimeout(() => {
      $("html, body").animate({ scrollTop: 60 });
    }, 200);

  }
  toggleVendorConfirmPopup() {

    this.vendor_confirm_popup = false;
  }

  onSearchInputFocus(){

    //alert(1);
    $('.location_search_wrapper').addClass('onFocus');
  }
  onBlurSearchInputFocus(){
    $('.location_search_wrapper').removeClass('onFocus');
  }
  // getNeareshChemist(){
  //   this.state=this.global.getAppState();
  //   this.router.navigate(['chemist-listing'], { queryParams: {lat:  this.state.userloc.lat,long:this.state.userloc.long} })

  //   // if(this.state.is_location_set==false){
  //   //   console.log('open');
  //   // //  $("header .locationToggle").click(function(){
  //   //     $(".locationPopup .slide_right").animate({
  //   //       left: "0px"
  //   //     });
  //   //     $(".locationPopup").fadeIn(100);
  //   //     this.router.navigate(['/home'], { queryParams: { redirect:'chemist-listing' } });
  //   //     this.global.setToast('error','We need your location to show results');
  //   //  // });
  //   // }else{


  //   //   this.router.navigate(['chemist-listing'], { queryParams: {lat:  this.state.userloc.lat,long:this.state.userloc.long} })


  //   // }
  //   console.log('Getting nearest chemist');

  // }

  // onClickOverlay(){

  //   console.log('overlay clicked');
  // }
onUpdateCartCountFromParent(cartdata)
{
  this.state.cartdata.cartcount=cartdata.cartcount;
  console.log(cartdata);
}


}
