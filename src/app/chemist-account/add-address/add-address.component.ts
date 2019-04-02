import { Component, OnInit,NgZone ,ViewChild,ElementRef} from '@angular/core';
import { AppGlobals } from '../../app.global';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { Router,ActivatedRoute } from '@angular/router';
import {Api} from '../../api.service';
import { MapsAPILoader } from '@agm/core';
declare var $: any;
declare var classie: any;


@Component({
  selector: 'app-add-address',
  templateUrl: './add-address.component.html',
  styleUrls: ['./add-address.component.css']
})
export class AddAddressComponent implements OnInit {
  ismapview: boolean = false;
  addressinit: any = { 'user_id': '', 'user_type': '', 'full_name': '', 'mobile': '', 'address': '', 'landmark': '', 'state': '', 'city': '', 'pincode': '', 'makeitdefault': '0', 'address_type': '' };
  address: any = { 'user_id': '', 'user_type': '', 'full_name': '', 'mobile': '', 'address': '', 'landmark': '', 'state': '', 'city': '', 'pincode': '', 'makeitdefault': '0', 'address_type': '','relation_id':'','is_other_option':false,'gender':'0','date_of_birth':'','area':'','other_address_type':'','latitude':'28.6389931','longitude':',77.2834889' };
  state:any;
  relations:any=[];
  lat: number = 28.6422632;
  lng: number = 77.17726360000006;
  addr: any = { 'formatted_addr': '', 'pincode': '', 'area': '', 'city': '', 'lat': '', 'long': '' };
  redirecturl:any=undefined;
  @ViewChild('search') public searchElement: ElementRef;
  constructor(public global: AppGlobals,private loadingBar:LoadingBarService,private router:Router,
                private api:Api,private aroute:ActivatedRoute,private mapsAPILoader:MapsAPILoader,
                private ngZone:NgZone) { this.state=this.global.getAppState();}

  ngOnInit() {

    setTimeout(() => {
      $('.list a').removeClass('active');
        $('#myaddress').addClass('active');

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
 
      this.redirecturl=this.aroute.snapshot.queryParams["redirecturl"];

      this.getUserRelations();
      this.loadMapApi();
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
 
                   if (place.address_components[i].types[j] == "sublocality_level_2") {
 
 
 
                     this.addr.area = place.address_components[i].long_name;
 
 
                   }
                   if (place.address_components[i].types[j] == "administrative_area_level_1") {
 
 
 
                    this.addr.state = place.address_components[i].long_name;


                  }
                   if (place.address_components[i].types[j] == "locality") {
 
 
                     this.addr.city = this.global.seoUrl(place.address_components[i].long_name);
 
 
                   }
                 }
               }
               $('#search').val(place.formatted_address);
               this.addr.lat = place.geometry.location.lat();
               this.addr.long = place.geometry.location.lng();
               this.lat= this.addr.lat;
               this.lng= this.addr.long;
            
              
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
 


  getUserRelations(){
      let data="";
     
      
      
      this.api.getUserRealtions(data).subscribe(
          (response)=>
              { 
              
                
                
                 var dt:any=response;
      
                 if(dt.status==200){
                  
                  this.relations=dt.data;

                  this.address.gender='0';
                  if(this.address.gender==0){
                    this.onSetGender('m');
                  }
                  else  if(this.address.gender==1){
                    this.onSetGender('f');
                  }
                  // this.is_result_get=true;
                  // this.searchresp=dt.user_data;
                  // this.address=this.addressinit;

                  //  this.global.setToast('info',dt.message);
                  //  this.router.navigate(['/my-account/address']);
      
                 }
                 else if(dt.status==201){
                  
                    //   this.global.setToast('error',dt.message);
                   // this.is_result_get=false;
                  // this.searchresp=[];
                 }
             //    console.log(dt.d);
             this.loadingBar.stop();
                
          
              
              },
          (error)=>{
      
          //  $('.preloader').fadeOut();
            //   this.spinnerService.hide();
               console.log('RESPONSE FAILED');console.log(error)}
      );


  }
  ngAfterViewInit() {


      setTimeout(() => {
          (function() {
              // trim polyfill : https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/Trim
              if (!String.prototype.trim) {
                  (function() {
                      // Make sure we trim BOM and NBSP
                      var rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
                      String.prototype.trim = function() {
                          return this.replace(rtrim, '');
                      };
                  })();
              }
    
              [].slice.call( document.querySelectorAll( '.input__field' ) ).forEach( function( inputEl ) {
                  // in case the input is already filled..
                  if( inputEl.value.trim() !== '' ) {
                      classie.add( inputEl.parentNode, 'input--filled' );
                  }
    
                  // events:
                  inputEl.addEventListener( 'focus', onInputFocus );
                  inputEl.addEventListener( 'blur', onInputBlur );
              } );
    
              function onInputFocus( ev ) {
                  classie.add( ev.target.parentNode, 'input--filled' );
              }
    
              function onInputBlur( ev ) {
                  if( ev.target.value.trim() === '' ) {
                      classie.remove( ev.target.parentNode, 'input--filled' );
                  }
              }
          })();
      }, 20);

  }

  toggleMapView() {

    
    
    if (this.ismapview) {

        $(".mapLocationSet").fadeOut();

    }
    if (!this.ismapview) {
      
     //   this.autoDetectLocation();
        $(".mapLocationSet").fadeIn();
        $('.insideDesign').hide();
        this.autoDetectLocation();
       // $('.insideDesign').hide();

    }

    this.ismapview = !this.ismapview;



}
  onSubmit() {

      if (this.fieldsValidate()) {

          let data="user_id="+this.address.user_id+"&user_type_id="+this.address.user_type+"&full_name="+this.address.full_name+"&mobile="+this.address.mobile+"&landmark="+this.address.landmark+"&address="+this.address.address+"&state="+this.address.state+"&city="+this.address.city+"&pincode="+this.address.pincode+"&address_type="+this.address.address_type+"&makeitdefault="+this.address.makeitdefault
                   +"&ralation_id="+this.address.relation_id+"&gender="+this.address.gender+"&date_of_birth=12/09/1991&area="+this.address.area+"&other_address_type="+this.address.other_address_type
                   +"&latitude="+this.address.lat+"&longitude="+this.address.long;

          console.log(data);
                   
          this.loadingBar.start();
          this.api.addAddress(data).subscribe(
              (response)=>
                  { 
                
                    
                     var dt:any=response;
          
                     if(dt.status==200){
          
                      // this.is_result_get=true;
                      // this.searchresp=dt.user_data;
                      this.address=this.addressinit;

                       this.global.setToast('info',dt.message);
                       if(this.redirecturl!=undefined){
                          this.router.navigate([this.redirecturl]);
                       }else{
                        this.router.navigate(['/chemist-account/my-address']);
                       }
                      
          
                     }
                     else if(dt.status==201){
                      
                      this.global.setToast('error',dt.message);
                      // this.is_result_get=false;
                      // this.searchresp=[];
                     }
                 //    console.log(dt.d);
                 this.loadingBar.stop();
                    
              
                  
                  },
              (error)=>{
          
              //  $('.preloader').fadeOut();
                //   this.spinnerService.hide();
                   console.log('RESPONSE FAILED');console.log(error)}
          );

          

      }

  }

  fieldsValidate() {

      if (this.address.full_name == '') {

          this.global.setToast('error', this.global.toastmsg.name_is_required);
          return false;
      }
      else if (this.address.mobile == '') {

          this.global.setToast('error', this.global.toastmsg.mobile_is_required);
          return false;
      }
      else if (this.address.address == '') {

          this.global.setToast('error', this.global.toastmsg.address_is_required);
          return false;
      }
      // else if (this.address.landmark == '') {

      //     this.global.setToast('error', this.global.toastmsg.landmark_is_required);
      //     return false;
      // }
      else if (this.address.state == '') {

          this.global.setToast('error', this.global.toastmsg.state_is_required);
          return false;
      }
      else if (this.address.city == '') {

          this.global.setToast('error', this.global.toastmsg.city_is_required);
          return false;
      }
      else if (this.address.pincode == '') {

          this.global.setToast('error', this.global.toastmsg.pincode_is_required);
          return false;
      }
    //   else if (this.address.address_type == '') {

    //       this.global.setToast('error', this.global.toastmsg.select_address_type);
    //       return false;
    //   }
      else{

          this.address.user_id=this.state.user.id;
          this.address.user_type=this.state.user.user_type;
          
          return true;
      }
  }

  addressTypeCheck(type){

      if(type=='2'){
         this.address.is_other_option=true;
      }
      else{
          this.address.is_other_option=false;
      }
  }

 
    autoDetectLocation() {

        this.loadingBar.start();
        // this.global.startLoader();
        //$.toast({title:'Please wait, fetching your location.!'});
        this.getCustomerCurrentPosition().then((results) => {
      
          
          
          this.addr.formatted_addr = results[0].formatted_address;
      //     this.searchElement.nativeElement.value = this.addr.formatted_addr
      
          for (var i = 0; i < results[0].address_components.length; i++) {
      
            for (var j = 0; j < results[0].address_components[i].types.length; j++) {
      
              if (results[0].address_components[i].types[j] == "postal_code") {
      
                this.addr.pincode = results[0].address_components[i].long_name;
              }
      
              if (results[0].address_components[i].types[j] == "sublocality_level_2") {
      
                this.addr.area = results[0].address_components[i].long_name;
      
              }
              if (results[0].address_components[i].types[j] == "administrative_area_level_1") {
      
      
                this.addr.state = this.global.seoUrl(results[0].address_components[i].long_name);
      
              }
              if (results[0].address_components[i].types[j] == "locality") {
      
      
                this.addr.city = this.global.seoUrl(results[0].address_components[i].long_name);
      
              }
            }
          }
 
          
          this.addr.lat = results[0].geometry.location.lat();
          this.addr.long = results[0].geometry.location.lng();
      

          this.lat= this.addr.lat;
          this.lng= this.addr.long;
        
          
          $('.insideDesign').show();
          //  this.router.navigate(['/home'], { queryParams: {city:this.addr.city} })
          this.loadingBar.stop();
      
      
      
      
      
      
        },  (errStatus)=> {
          this.loadingBar.stop();
           
          this.lat= this.state.userloc.lat;
          this.lng= this.state.userloc.long;
          this.address.latitude= this.addr.lat;
          this.address.longitude= this.addr.long;
          $('.insideDesign').show();
          console.log(errStatus);
          // $.toast({title:'Please try again.!'});
        });
      
      }
      
      
      getCustomerCurrentPosition() {
      
        var geocoder = new google.maps.Geocoder();
      
        return new Promise(function (resolve, reject) {
      
          let geocoder = new google.maps.Geocoder();
        
          
          navigator.geolocation.getCurrentPosition(function (p) {
      
      
            let LatLng = new google.maps.LatLng(p.coords.latitude, p.coords.longitude);
      
     
            
            var geocoder = geocoder = new google.maps.Geocoder();
            geocoder.geocode({ 'latLng': LatLng }, function (results, status) {
                
            
              
              if (status == google.maps.GeocoderStatus.OK) {
      
                if (results.length > 0) {
      
                  resolve(results);
      
                } else {
      
                  alert('GOOGLE AUTODETECTION WORK ONLY ON HTTPS SERVER..')
                }
      
              }else{
              //    console.log(status);
              }
      
            });
      
          },(err:any) => {

            console.log(err);
            
            reject(err);
             //this.global.setToast('error',err.message);
          //   this.global.setToast('error','We are unable to fetch your location currently.');
          //  // alert('3');
          //   this.loadingBar.stop();
          //   this.state.userloc.area = 'delhi';
          //   this.state.userloc.city = 'delhi';
          //   this.state.userloc.formatted_addr = 'Delhi';
          //   this.state.userloc.lat = '28.704060';
          //   this.state.userloc.long = '77.102493';
          //   this.state.is_location_set = true;
          //   this.global.saveAppState(this.state);
    
    
            // $(".locationPopup .slide_right").animate({
            //   top: "-50px"
            // });
            // $(".locationPopup").fadeOut(500);
          });
      
        });
      
      
      }
      
      placeMarker($event){
       
        this.lat=$event.coords.lat;
        this.lng=$event.coords.lng;
        let LatLng = new google.maps.LatLng(this.lat, this.lng);
      

        var geocoder = geocoder = new google.maps.Geocoder();
        geocoder.geocode({ 'latLng': LatLng },  (results, status)=> {
            
        
          if (status == google.maps.GeocoderStatus.OK) {
      
            if (results.length > 0) {
      
                this.addr.formatted_addr = results[0].formatted_address;
                //     this.searchElement.nativeElement.value = this.addr.formatted_addr
                
                    for (var i = 0; i < results[0].address_components.length; i++) {
                
                      for (var j = 0; j < results[0].address_components[i].types.length; j++) {
                
                        if (results[0].address_components[i].types[j] == "postal_code") {
                
                          this.addr.pincode = results[0].address_components[i].long_name;
                        }
                
                        if (results[0].address_components[i].types[j] == "sublocality_level_2") {
                
                          this.addr.area = results[0].address_components[i].long_name;
                
                        }
                        if (results[0].address_components[i].types[j] == "administrative_area_level_1") {
                
                
                          this.addr.state = this.global.seoUrl(results[0].address_components[i].long_name);
                
                        }
                        if (results[0].address_components[i].types[j] == "locality") {
                
                
                          this.addr.city = this.global.seoUrl(results[0].address_components[i].long_name);
                
                        }
                      }
                    }
                 
                    this.addr.lat = results[0].geometry.location.lat();
                    this.addr.long = results[0].geometry.location.lng();
      
            } else {
      
              alert('GOOGLE AUTODETECTION WORK ONLY ON HTTPS SERVER..')
            }
      
          }else{
             // console.log(status);
          }
      
        });
      
      
      
      
      }
      
      setLocation(){
      
       // this.address.latitude=this.lat.toString();
       // this.address.longitude=this.lng.toString();
       this.address.address=this.addr.formatted_addr;
       this.address.area=this.addr.area;
       this.address.state=this.addr.state;
       this.address.city=this.addr.city;
       this.address.pincode=this.addr.pincode;
       this.address.lat=this.addr.lat;
       this.address.long=this.addr.long;
       setTimeout(() => {
       
        $(".form_list .style").addClass("inpActive");
        
     }, 200);
      setTimeout(() => {
       
      //  (function() {
      //   // trim polyfill : https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/Trim
      //   if (!String.prototype.trim) {
      //       (function() {
      //           // Make sure we trim BOM and NBSP
      //           var rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
      //           String.prototype.trim = function() {
      //               return this.replace(rtrim, '');
      //           };
      //       })();
      //   }
      
      //   [].slice.call( document.querySelectorAll( '.input__field' ) ).forEach( function( inputEl ) {
      //       // in case the input is already filled..
      //       if( inputEl.value.trim() !== '' ) {
      //           classie.add( inputEl.parentNode, 'input--filled' );
      //       }
      
      //       // events:
      //       inputEl.addEventListener( 'focus', onInputFocus );
      //       inputEl.addEventListener( 'blur', onInputBlur );
      //   } );
      
      //   function onInputFocus( ev ) {
      //       classie.add( ev.target.parentNode, 'input--filled' );
      //   }
      
      //   function onInputBlur( ev ) {
      //       if( ev.target.value.trim() === '' ) {
      //           classie.remove( ev.target.parentNode, 'input--filled' );
      //       }
      //   }
      // })();
      }, 20);
        this.toggleMapView();
      
      }
      onSetGender(type){

        $('.checkmark').removeClass('active');

        if(type =='m'){
          this.address.gender='0';
          
          $('#addrmale').addClass('active');
        }
        else if(type =='f'){
          this.address.gender='1';
          
          $('#addrfemale').addClass('active');
        }
      }
}
