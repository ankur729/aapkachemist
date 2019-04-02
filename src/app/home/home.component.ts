import { Component, OnInit, ViewChild } from '@angular/core';
import { AppGlobals } from '../app.global';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { HeaderComponent } from '../incl/header/header.component';
import { Api } from '../api.service';
import { Meta, Title } from '@angular/platform-browser';
import { PopupComponent } from '../popup/popup.component';

// import { MessagingService } from "../shared/messaging.service";
// import { trigger, state, animate, transition, style } from '@angular/animations';
import { Router,ActivatedRoute } from '@angular/router';

declare var $: any;
 

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  // animations: [
  //   trigger('fadeInAnimation', [

  //     // route 'enter' transition
  //     transition(':enter', [

  //         // css styles at start of transition
  //         style({ opacity: 0 }),

  //         // animation and styles at end of transition
  //         animate('.53s', style({ opacity: 1 }))
  //     ]),
  // ])
  //   // animation triggers go here
  // ]
})
export class HomeComponent implements OnInit {


  state: any;
  addr: any = { 'formatted_addr': '', 'pincode': '', 'area': '', 'city': '', 'lat': '', 'long': '' };
  data: any = {

    'login_type_list': [],
    'ad_data': [],

    'slider_data': [],
    'top_categories_list': [],
    'user_data': [],
    'brands': [],
    'applink_no': '',
    'is_slider_valid':false,
    'homediscount_banner':'',
    'map_arr':[],
    'center_lat':'',
    'center_lng':'',
    'testimonial_lists':[],
    'map_view':false
  };
  // popup:any={'downloadapp':{'status':false,'sent_txt':'','error_txt':'','is_success':false},'is_launched':0};
  launchdata:any={'maintenance_status_heading':'','maintenance_status_message':'','maintenance_status':'0'}
  is_user_type_popup: boolean = false;
  isgooglesdkready: boolean = false;
  timer: any;
  downloadlink:any=undefined
  is_cat_slider_valid:boolean=false;
  @ViewChild('child')
  public child: HeaderComponent;
  @ViewChild('popupchild') popup: PopupComponent;

  
  constructor(public global: AppGlobals, private router: Router, private loadingBar: LoadingBarService,
     private api: Api,private aroute:ActivatedRoute,private title: Title, private meta: Meta) {
    this.state = this.global.getAppState();
 
    if (this.state.is_logged_in && this.state.user.user_type_id!=1) {
      
        this.router.navigate(['/chemist-account/dashboard']);
    }
 
    this.downloadlink = this.aroute.snapshot.queryParams["appdownloadlink"];
   // $('.navigation_wrapper').hide();
  }

  ngOnInit() {
    this.title.setTitle("Aapka Chemist: Connecting You To Your Nearby Pharmacy");    
    this.meta.updateTag({
      name: 'description', content: "Get Your Meds delivered today from your Nearby Chemist.Order now at Aapka Chemist to Get High Discounts From Your Local Chemists."
    });
   //console.log(this.state);
    $(".navigation_wrapper .menus").hide();
    $('.menus').hide();
   
    
    $('#mainsection').hide();

    // setTimeout(() => {
    //   $('#mainsection').fadeIn(500);
    // }, 900);

    this.addr.area = "Delhi";
    if (this.state.is_location_set == false) {
    //  alert('2');
    //  this.loadingBar.start();
   //   alert(4);
      this.state.userloc.lat="28.7041";
      this.state.userloc.long="77.1025";
      this.state.userloc.area="New Delhi";
     // this.state.is_location_set= true;
      this.global.saveAppState(this.state);
      this.loadHomeData();
      this.timer = setInterval(() => {
        this.validateGoogleSDK();


      }, 500);
      // setTimeout(() => {
      //   this.autoDetectLocation();
      // }, 800);

    }
    else if (this.state.is_location_set == true) {

      this.loadHomeData();


    }
   
  }


  loadHomeData() {
  //  alert('2');
    // alert(this.state.is_user_type_set);

    // if (this.state.is_user_type_set == false) {

    //   this.loadUserTypePopup();
    // }
    // else {
     this.is_cat_slider_valid=false;
this.data.top_categories_list=[];
    this.data.slider_data = [];
    this.data.login_type_list = [];
    this.data.brands = [];
    let userid:any='';
    if(this.state.user != ''){
      userid=this.state.user.id;
    }
    $('#topcontainer').hide();
    let data:any;
    if (this.state.is_logged_in) {

      data = "user_type_id="+this.state.user.user_type_id+"&user_entity_type=" + this.state.user_type+"&session_id="+this.state.cartdata.session_id+"&session_id="+this.state.cartdata.session_id+"&user_id="+userid+"&lat="+this.state.userloc.lat+"&long="+this.state.userloc.long;
    }
    else if (this.state.is_logged_in == false) {

      data = "user_type_id=2" + "&user_entity_type=" + this.state.user_type+"&session_id="+this.state.cartdata.session_id+"&session_id="+this.state.cartdata.session_id+"&user_id="+userid+"&lat="+this.state.userloc.lat+"&long="+this.state.userloc.long;
    }

   
    
  //  this.loadingBar.start();
    this.api.fetchHomeData(data).subscribe(
      (response) => {

        
        let dt: any = response;
 
        if (dt.status == 200) {

          this.data.top_categories_list = dt.data.top_categories_list;

          this.data.login_type_list = dt.data.login_type_list;
          this.data.user_data = dt.data.user_data;
          if ($(window).width() < 768) {
           // alert('asdf');
            this.data.slider_data = dt.data.app_slider_data;
         }
         else {
          this.data.slider_data = dt.data.web_slider_data;
         }
        //this.data.slider_data = dt.data.web_slider_data;
        
          this.data.ad_data = dt.data.ad_data;
          this.data.brands = dt.data.brand_list;
          this.data.testimonial_lists=dt.data.testimonial_lists;
          
          this.data.homediscount_banner=dt.homediscount_banner_web
          this.is_cat_slider_valid=true;

          this.state.top_categories=dt.data.top_categories_list;
          this.global.saveAppState(this.state);

         // this.setMapArray();
       //   console.log(this.global.getAppState());
          if(dt.maintenance_status =='1'){
            this.setMaintenanceParams(dt);
          }
       //   $('.menus.owl-carousel.owl-theme').hide();
         setTimeout(() => {

     //     $('.navigation_wrapper').fadeIn(500);
        //  this.child.onReceiveCategories(dt.data.top_categories_list);
          this.callJs();
          
          $(".navigation_wrapper .menus").owlCarousel({
            items: 7,
            navigation: true,
            trueslideSpeed: 300,
            paginationSpeed: 500,
            responsiveRefreshRate: 200,
            margin:10,
            responsiveBaseWidth: window,
            responsive: {
              0: {
                items: 4
              },
              600: {
                items: 8
              },
              1100: {
                items: 10
              }
            }
          });
        
          $(".main_slider").owlCarousel({
            items: 1,
            navigation: true,
            autoPlay:true,
            trueslideSpeed: 300,
            paginationSpeed: 500,
            // responsiveRefreshRate: 200,
            // responsiveBaseWidth: window,
            responsive:true
          
          
          });
    
          $('.loader').hide();
        // $('.menus.owl-carousel.owl-theme').fadeIn(250);
         }, 20);
         setTimeout(() => {
  
          $(".testimonial_listing").owlCarousel({
            items: 3,
            navigation: true,
            trueslideSpeed: 300,
            paginationSpeed: 500,
            responsiveRefreshRate: 200,
            margin:50,
            responsiveBaseWidth: window,
            responsive: {
            0: {
            items: 1
            },
            600: {
            items: 3
            },
            1100: {
            items: 3
            }
            }
            });
         }, 200);
          // setTimeout(() => {
            $('#topcontainer').fadeIn(500);
          // }, 200);
          

         

          if (this.state.device_token == '') {
            //  this.message.requestPermission();
          }

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


    // setTimeout(() => {
      
    //   $(".notification-arrow").click(function(){
    //     $(".brodcast-popupblock").toggleClass("brodcast-popupblock-close");
    //   });

    // }, 200);
    // setTimeout(() => {
    //   $(".main_slider").owlCarousel({
    //     items : 1,
    //     navigation : true,
    //     trueslideSpeed : 300,
    //   paginationSpeed : 500,
    //   autoPlay : 5000,
    //   autoplayTimeout:500,    
    //   responsive: true,
    //   responsiveRefreshRate : 200,
    //   responsiveBaseWidth: window,
    //   });

    //   $(".OurBrands").owlCarousel({
    //     items : 6,
    //     navigation : true,
    //     trueslideSpeed : 300,
    //   paginationSpeed : 500,
    //   autoPlay : 5000,
    //   autoplayTimeout:500,    
    //   responsive: true,
    //   responsiveRefreshRate : 200,
    //   responsiveBaseWidth: window,
    //   });
    //   $(".BusinessTypeTabs").owlCarousel({
    //     items : 6,
    //     navigation : true,
    //     trueslideSpeed : 300,
    //   paginationSpeed : 500,
    //   autoPlay : 5000,
    //   autoplayTimeout:500,    
    //   responsive: true,
    //   responsiveRefreshRate : 200,
    //   responsiveBaseWidth: window,
    //   });

    // }, 200);
    setTimeout(() => {
      if(this.downloadlink!=undefined){
       
         
        $('html, body').animate({
          scrollTop: $("#download_section").offset().top
        }, 1000);
       }
    }, 1500);
  }

  callJs() {


   // setTimeout(() => {

    //   $(".menuMobileToggle").click(function () {
    //     $(".home_Page .section_1 .leftstructure").fadeIn(100);
    //     $(".home_Page .section_1 .leftstructure").append("<div class='overlay'></div>");
    //   });
    //  $(document).on("click", ".overlay", function () {
     
    //   $(".home_Page .section_1 .leftstructure").fadeOut(200);
    //     $(".home_Page .section_1 .leftstructure .overlay").remove();
        
    //   });
    // $(".menuMobileToggle").click(function () {
    //     $(".home_Page .section_1 .leftstructure").fadeIn(100);
    //     $(".home_Page .section_1 .leftstructure").append("<div class='overlay'></div>");
    //   });

      $(document).on("click", ".home_Page .section_1 .leftstructure .overlay", function () {
        $(".home_Page .section_1 .leftstructure").fadeOut(200);
        $(".home_Page .section_1 .leftstructure .overlay").remove();
      });

      $(document).on("click", ".mainHeader .overlay", function () {
       $(".menu_Popup .slide_right").fadeOut(200);
        $(".home_Page .section_1 .leftstructure .overlay").remove();
      });

      // $('.enquiry_btn').click(function(){
      //     $('.enquiry_btn').hide();
      //     $('.ready_for_enquiry_btn').show();
      //     $('.ready_for_enquiry_btn').css('display','block');
      // });



      $(".style .input").on('click keypress',function(){
        $(this).parent(".style").addClass("inpActive");
                
        $(this).blur(function(){
          var getitemval=$(this).val();						
            if(getitemval==''){
              $(this).parent(".style").removeClass("inpActive");
            }
        
        });
        
      });
     
 
        $('.numbe_input.form_list').click(function(){
          $('.numbe_input.form_list').addClass("focus_input");
          // $(this).addClass("focus_input");
          $('.form_wrapper .form_listing .form_list .style .input').on('keypress',function(){
            if($(this).val().length >= 0){
               $('.numbe_input.form_list').removeClass('focus_input');
            }
         });
      });
      $(document).click(function (e) {
        if (!$(e.target).is(".numbe_input.form_list, .numbe_input.form_list *,.form_wrapper .form_listing .form_list .style .input, .form_wrapper .form_listing .form_list .style .input *")) {
          $(".numbe_input.form_list").removeClass("focus_input");
        }
      });
    
   
      $(".OurBrands").owlCarousel({
        items: 6,
        navigation: true,
        margin:10,
        trueslideSpeed: 300,
        paginationSpeed: 500,
        itemsMobile : [500, 2],
        autoPlay: 5000,
        autoplayTimeout: 500,
        responsive: true,
        responsiveRefreshRate: 200,
        responsiveBaseWidth: window,
        });
      // $(".OurBrands").owlCarousel({
      //   items: 6,
      //   navigation: true,
      //   trueslideSpeed: 300,
      //   paginationSpeed: 500,
      //   itemsMobile : [479, 3],
      //   autoPlay: 5000,
      //   autoplayTimeout: 500,
      //   responsive: true,
      //   responsiveRefreshRate: 200,
      //   responsiveBaseWidth: window,
      // });
      // $(".BusinessTypeTabs").owlCarousel({
      //   items: 6,
      //   navigation: true,
      //   trueslideSpeed: 300,
      //   paginationSpeed: 500,
      //   autoPlay: 5000,
      //   autoplayTimeout: 500,
      //   responsive: true,
      //   responsiveRefreshRate: 200,
      //   responsiveBaseWidth: window,
      // });

   // }, 20);
  }



  validateGoogleSDK() {


    
    if (typeof google === 'object' && typeof google.maps === 'object' && this.isgooglesdkready == false) {

    //  alert(3);
      this.autoDetectLocation();
      this.isgooglesdkready = true;
      clearInterval(this.timer);
    }

  }


  autoDetectLocation() {
 
    this.getCustomerCurrentPosition().then((results) => {

      

      

      this.addr.formatted_addr = results[0].formatted_address;
      //   this.searchElement.nativeElement.value = this.addr.formatted_addr

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

      
      this.addr.lat = results[0].geometry.location.lat();
      this.addr.long = results[0].geometry.location.lng();
      
      setTimeout(() => {

        this.child.updateLocationFromParent(this.addr);
  //      this.loadHomeData();
      
        //this.loadingBar.stop();
      }, 20);

      // this.state.userloc = this.addr;
      // this.state.is_location_set = true;

      // this.global.saveAppState(this.state);
      // setTimeout(() => {
      //   let redirecturl = this.aroute.snapshot.queryParams["redirect"];
      //   if (redirecturl == undefined) {

      //     this.router.navigate(['/home'], { queryParams: { city: this.addr.city } })
      //   }
      //   else {

      //     this.redirectToUrl(redirecturl);
      //   }

      //   // 
      // }, 20);
      //  this.router.navigate(['/home'], { queryParams: {city:this.addr.city} })
      //    this.loadingBar.stop();

      // $(".locationPopup .slide_right").animate({
      //   top: "-50px"
      // });
      // $(".locationPopup").fadeOut(500);




    }, function (errStatus) {
      this.loadingBar.stop();


      // $.toast({title:'Please try again.!'});
    });




  }
  navigateCategory(category) {

    

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

      }, () => {
        //  this.loadingBar.stop();
      //  alert(this.router.url );
        
        if(this.router.url !='/home'){

          this.state.is_location_set = true;
        
          this.global.saveAppState(this.state);
          this.child.updateLocationFromParent(this.state.userloc);
          
        }
       
      
        
      
      //  this.loadHomeData();
      });

    });



  }

  onLocationUpdate(location: any) {

   //  $('.menus.owl-carousel.owl-theme').hide();
    
    this.state.userloc = location;
    this.is_cat_slider_valid=false;
    this.data.testimonial_lists=[];
    this.loadHomeData();
  
    


  }

  getUserListByType(user) {

  
    
    let data;
    // if(this.state.is_logged_in){

    //   data = "user_type_id=" + this.state.user.user_type_id;
    // }
    // else if(this.state.is_logged_in==false){

    //   data = "user_type_id=2";
    // }
    $('.link').removeClass('active');
    $('#type_' + user.id).addClass('active');
    $('.chemist_listing').fadeOut(500);
    data = "user_type_id=" + user.id;
    this.loadingBar.start();
    this.api.getUserListByType(data).subscribe(
      (response) => {

        

        let dt: any = response;
        if (dt.status == 200) {


          this.data.user_data = dt.data.user_data;
          $('.chemist_listing').fadeIn(500);
          $('#topcontainer').fadeIn(500);

        }
        else if (dt.status == 201) {

          this.data.user_data = [];
          this.global.setToast('error', 'No result found');
        }

        this.loadingBar.stop();
      },
      (error) => {

        console.log('RESPONSE FAILED'); console.log(error)
      }
    );
  }

  loadUserTypePopup() {

    this.is_user_type_popup = true;

  }

  setUserType(type) {

    if (type == 'user') {

      this.state.is_user_type_set = true;
      this.state.user_type = 0;
      this.global.saveAppState(this.state);
      $('.prelaunchPopup').fadeOut("slow");
      this.loadHomeData();
      setTimeout(() => {
        this.is_user_type_popup = false;
      }, 500);

    }
    else if (type == 'business') {


      this.state.is_user_type_set = true;
      this.state.user_type = 1;
      this.global.saveAppState(this.state);
      this.loadHomeData();
      setTimeout(() => {
        this.is_user_type_popup = false;
      }, 500);
      $('.prelaunchPopup').fadeOut("slow");
    
      
    }


  }

  getAppLink() {
 
    this.data.applink_no =this.data.applink_no.toString();

    if (this.data.applink_no.length == 0) {

      this.global.setToast('error', 'Mobile number is required');
    }
    else if (this.data.applink_no.length != '10' ) {
      this.global.setToast('error', 'Mobile number not valid');
    }
    else {

      let data;
      data = "mobile=" + this.data.applink_no;
    
      
      this.loadingBar.start();
      this.api.sendAppThroughSMS(data).subscribe(
        (response) => {
     
          

          let dt: any = response;
          if (dt.status == 200) {

            this.data.applink_no='';
            this.popup.onReceivePopupData({'type':'success','sent_txt':dt.message,'primary_btn_txt':'','secondary_btn_txt':'Close'});
            // this.popup.downloadapp.status=true;
            // this.popup.downloadapp.is_success=true;
            // this.popup.downloadapp.sent_txt=dt.message;

          //  this.global.setToast('info', dt.message);

          }
          else if (dt.status == 201) {
            

            this.popup.onReceivePopupData({'type':'error','sent_txt':dt.message,'primary_btn_txt':'','secondary_btn_txt':'Close'});
            // this.popup.downloadapp.status=true;
            // this.popup.downloadapp.is_success=false;
            // this.popup.downloadapp.sent_txt=dt.message;

          }

          this.loadingBar.stop();
        },
        (error) => {

          console.log('RESPONSE FAILED'); console.log(error)
        }
      );
    }

  }
  onClosePopup(){

 //   this.popup.downloadapp.status=false;
  }

  onPopupActionReceived(obj:any) {
   // console.log(obj);
    if(obj.mode=='error'){

      if (obj.type == 0) {

        this.popup.onReceivePopupData({ 'type': '' });
  
      }
      // else if (obj.type == 1) {

      //   this.popup.onReceivePopupData({ 'type': '' });
      //   this.status.is_order_confirmed=1;
      //   this.onSubmitEnquiry();
      //   //on primary btn clicked...
  
      // }
 
    }
    else if(obj.mode=='success'){
    
      if (obj.type == 0) {

        //Go To Order
        this.popup.onReceivePopupData({ 'type': '' });
        
      }
      else if (obj.type == 1) {
 
        //on primary btn clicked...
  
      }
    }
 

    //console.log(event);
  }


  setMaintenanceParams(data){

    this.state.maintenance.maintenance_status=data.maintenance_status;
    this.state.maintenance.maintenance_status_heading=data.maintenance_status_heading;
    this.state.maintenance.maintenance_status_message=data.maintenance_status_message;

    this.global.saveAppState(this.state);

  }

  onCloseLaunchPopup(){

    this.state.maintenance.is_closed_on_home='1';
    this.global.saveAppState(this.state);
   // console.log('Close popup request');
  }

  onMobileSearchFocus(){

    // $("header .mainHeader .insideDesign .right_part .icon_menu .list .input_box#headersearch").after("<span class='search_input_overlay'></span>");
    // $(".search_input_overlay").show();
    // $("header .mainHeader .insideDesign .right_part .icon_menu .list .input_box#headersearch").focus();

    //  $(document).on("click" , ".search_input_overlay" , function(){
    //    $(".search_input_overlay").remove();
    //  });
    $("header .mainHeader .insideDesign .right_part .icon_menu .list .input_box#headersearch").after("<span class='search_input_overlay'></span>");
    $(".search_input_overlay").show();
    $("header .mainHeader .insideDesign .right_part .icon_menu .list .input_box#headersearch").focus();

     $(document).on("click" , ".search_input_overlay" , function(){
       $(".search_input_overlay").remove();
     });
     setTimeout(() => {
      $("html, body").animate({ scrollTop: 100 });
     }, 200);

  }

  setMapArray(){
    
    this.data.center_lat= parseFloat(this.state.userloc.lat);
    this.data.center_lng=parseFloat(this.state.userloc.long);

    let maparr:any=this.data.map_arr;

    maparr.map(elem=>{

      elem.latitude=parseFloat(elem.latitude);
      elem.longitude=parseFloat(elem.longitude);
      
    });
    this.data.map_arr=maparr;
   // console.log(maparr);
  }

  onToggleMapView(type){

    if(type=='open'){
      this.data.map_view=true;
      this.getUserListMapView();
      $('.mapLocationSet').show();
    
    }
    else if(type=='close'){
      this.data.map_view=false;
      $('.mapLocationSet').hide();

    }
    
  }

  getUserListMapView(){

    this.loadingBar.start();
    
  
    
    let data:any;

    data = "?from_user_type_id=1&to_user_type_id=2&lat=" + this.state.userloc.lat + "&long=" + this.state.userloc.long + "&page=1";
    //console.log(data);
    this.api.getUserListMapView(data).subscribe(
      (response) => {
      
        


        var dt: any = response;

    //    console.log(dt);

        if (dt.status == 200) {
          this.data.map_arr=dt.data.user_list;
          this.setMapArray();
       //   this.global.setToast('info', dt.message);
       //   this.router.navigate(['/thank-you'],{queryParams:{'page':'enquiry'}});
         

        }
        else if (dt.status == 201) {

          this.global.setToast('error', dt.message);
          
        }
        this.loadingBar.stop();

      },
      (error) => {

        this.loadingBar.stop();
        //   this.spinnerService.hide();
        console.log('RESPONSE FAILED'); console.log(error)
      }
    );



  }

  onMouseOver(infoWindow, gm) {

    if (gm.lastOpen != null) {
    gm.lastOpen.close();
 }

    gm.lastOpen = infoWindow;

    infoWindow.open();
}

onClickMarker(marker){
  this.router.navigate(['/chemist-detail/'+marker.seo_url])
}
}
