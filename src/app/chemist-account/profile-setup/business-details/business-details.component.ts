import { Component, OnInit ,ViewChild, ElementRef, NgZone, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LoadingBarService } from '@ngx-loading-bar/core';
import {Api} from '../../../api.service';
import {AppGlobals} from '../../../app.global';
import { MapsAPILoader } from '@agm/core';
// import { } from '@types/googlemaps';


declare var $:any;
declare var classie:any;

@Component({
  selector: 'app-business-details',
  templateUrl: './business-details.component.html',
  styleUrls: ['./business-details.component.css']
})
export class BusinessDetailsComponent implements OnInit {
  
  ismapview:boolean=false;
  business_details:any={
    'business_name':'',
    'business_type':'27',
    'address':'',
    'area':'',
    'landmark':'',
    'pincode':'',
    'whatsapp_no':'',
    'contact_person':'',
    'landline':'',
    'summary':'',
    'lat':'28.6389931',
    'long':'77.2834889',
    'country':'',
    'state':'',
    'city':''
  }
  businesstypes:any=[];
 
  addr: any = { 'formatted_addr': '', 'pincode': '', 'area': '', 'city': '','state':'', 'lat': '', 'long': '' };
  state:any;
  lat: number = 28.6422632;
  lng: number = 77.17726360000006;
  constructor(private aroute:ActivatedRoute,private router:Router,private loadingBar:LoadingBarService,private api:Api,public global:AppGlobals,
    private ngZone: NgZone,private mapsAPILoader: MapsAPILoader) { this.state=this.global.getAppState()}
  @ViewChild('search') public searchElement: ElementRef;
  ngOnInit() {
    setTimeout(() => {
      $('.list a').removeClass('active');
      $('#profilesetup').addClass('active');
    }, 20);
    this.getBusinessDetail();

    this.loadMapApi();
    console.log(this.state);
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
            console.log(place);
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
               
               setTimeout(() => {
                this.business_details.latitude=this.addr.lat;
                this.business_details.long=this.addr.long;
                this.business_details.area=this.addr.area;
                this.business_details.state=this.addr.state;
                this.business_details.city=this.addr.city;
                this.business_details.pincode=this.addr.pincode;
               }, 200);
           
               console.log(this.business_details);


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
 
  getBusinessDetail(){

    let data="user_id="+this.state.user.id+"&data_for=1"+"&user_type_id="+this.state.user.user_type_id;
 
    this.loadingBar.start();
    this.api.getProfileDetails(data).subscribe(
      (response) => {
     
        var dt: any = response;
        
          console.log(dt);
        if (dt.status == 200) {

        //  this.businesstypes=dt.data;
          this.getBusinessTypes();

          this.setInitialParams(dt.data.business_data);
        //  this.business_details=
          this.loadingBar.stop();
         

        }
        else if (dt.status == 201) {

          this.global.setToast('error',dt.message);
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

  setInitialParams(details){

    if(details.business_type!=0){
      this.business_details.business_type=details.business_type;
    }
 
    this.business_details.business_name=details.business_name;
    this.business_details.address=details.address;
    this.business_details.area=details.area;
    this.business_details.landmark=details.landmark;
    this.business_details.pincode=details.pincode;
    this.business_details.whatsapp_no=details.whatsapp_no;
    this.business_details.contact_person=details.contact_person;
    this.business_details.landline=details.landline;
    this.business_details.summary=details.summary;
    this.business_details.lat=details.lat;
    this.business_details.long=details.long;
    this.business_details.country=details.country;
    this.business_details.state=details.state;
    this.business_details.city=details.city;

 
    setTimeout(() => {

      
      $(document).ready(function(){
        if ($(".form_list  .input").val() == '') {
          $(".form_list  .style").removeClass("inpActive");
        }
        else {
          $(".form_list  .style").addClass("inpActive");
        }
  });

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

  getBusinessTypes(){

    let data="";

    this.loadingBar.start();
    this.api.getBusinessTypes(data).subscribe(
      (response) => {
      
        var dt: any = response;
        
        console.log(dt);

        if (dt.status == 200) {

          this.businesstypes=dt.data;
          this.loadingBar.stop();
         

        }
        else if (dt.status == 201) {

          this.global.setToast('error',dt.message);
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

  onSubmit(){
   // this.step=
  
   if(this.business_details.lat==''){
     this.business_details.lat='28.6389931';
     this.business_details.long='77.2834889';
     
   }
 
   let data="user_id="+this.state.user.id+"&business_name="+this.business_details.business_name+"&business_type="+this.business_details.business_type+
            "&address="+this.business_details.address+"&area="+this.business_details.area+
            "&landmark="+this.business_details.landmark+"&pincode="+this.business_details.pincode+
            "&whatsapp_no="+this.business_details.whatsapp_no+"&contact_person="+this.business_details.contact_person+
            "&landline="+this.business_details.landline+"&summary="+this.business_details.summary+
            "&lat="+this.business_details.lat+"&long="+this.business_details.long;
 
   this.loadingBar.start();
   this.api.updateBusinessDetails(data).subscribe(
     (response) => {
     
       var dt: any = response;
       
    

       if (dt.status == 200) {

       //  this.businesstypes=dt.data;
         this.loadingBar.stop();
         this.router.navigate(['/chemist-account/profile-setup'], { queryParams: { step:'2' } });
         //this.global.setToast('info',dt.message);

       }
       else if (dt.status == 201) {
        this.global.setToast('error',dt.message);
        this.loadingBar.stop();

       }

     },
     (error) => {

       this.loadingBar.stop();
       //   this.spinnerService.hide();
       console.log('RESPONSE FAILED'); console.log(error)
     }
   );
    //this.router.navigate(['/chemist-account/profile-setup'], { queryParams: { step:'2' } });
  }

  ngAfterViewInit(){
 

 
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






  }, function (errStatus) {
    this.loadingBar.stop();


    // $.toast({title:'Please try again.!'});
  });

}


getCustomerCurrentPosition() {

  var geocoder = new google.maps.Geocoder();

  return new Promise( (resolve, reject)=> {

    let geocoder = new google.maps.Geocoder();

    navigator.geolocation.getCurrentPosition( (p)=> {


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
           // console.log(status);
        }

      });

    }, () => {
      this.loadingBar.stop();
      /// alert('3');
      $('.sending_enquiry_popup').css('z-index','15');
      $('.sending_enquiry_popup').fadeIn(500);
   
      // this.state.userloc.area = 'delhi';
      // this.state.userloc.city = 'delhi';
      // this.state.userloc.formatted_addr = 'Delhi';
      // this.state.userloc.lat = '28.704060';
      // this.state.userloc.long = '77.102493';
      // this.state.is_location_set = true;
      // this.global.saveAppState(this.state);


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
        //console.log(status);
    }

  });



 // console.log($event.coords.lng);
}

setLocation(){

 // this.address.latitude=this.lat.toString();
 // this.address.longitude=this.lng.toString();
 this.business_details.address=this.addr.formatted_addr;
 this.business_details.area=this.addr.area;
 this.business_details.state=this.addr.state;
 this.business_details.city=this.addr.city;
 this.business_details.pincode=this.addr.pincode;
 this.business_details.lat=this.addr.lat;
 this.business_details.long=this.addr.long;
 
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
  this.toggleMapView();

}


}
