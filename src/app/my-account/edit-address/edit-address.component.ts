import { Component, OnInit ,ViewChild, ElementRef, NgZone} from '@angular/core';
import { Router, ActivatedRoute  } from '@angular/router';
import { LoadingBarService } from '@ngx-loading-bar/core';
import {Api} from '../../api.service';
import {AppGlobals} from '../../app.global';
import { MapsAPILoader } from '@agm/core';

declare var classie:any;
declare var $:any;

@Component({
  selector: 'app-edit-address',
  templateUrl: './edit-address.component.html',
  styleUrls: ['./edit-address.component.css']
})
export class EditAddressComponent implements OnInit {

  state:any;
  ismapview: boolean = false;
  address: any = { 'user_id': '','address_id':'', 'user_type': '', 'full_name': '', 'mobile': '', 'address': '', 'landmark': '', 'state': '', 'city': '', 'pincode': '', 'makeitdefault': '0', 'address_type': '','relation_id':'','is_other_option':false,'gender':'0','date_of_birth':'','area':'','other_address_type':'','latitude':'28.6389931','longitude':',77.2834889' };
  addr: any = { 'formatted_addr': '', 'pincode': '', 'area': '', 'city': '', 'lat': '', 'long': '' };
  lat: number = 28.6422632;
  lng: number = 77.17726360000006;

  relations:any=[];
  redirecturl:any='';

  constructor(private api:Api,private loadingBar: LoadingBarService,public global:AppGlobals,
    private router:Router,private aroute:ActivatedRoute,private ngZone: NgZone,private mapsAPILoader: MapsAPILoader) { this.state=this.global.getAppState();}
  @ViewChild('search') public searchElement: ElementRef;
  ngOnInit() {

    setTimeout(() => {
      $('.nameDesigns').removeClass('active');
      $('#familytree').addClass('active');
    }, 20);
    let addressid=this.aroute.snapshot.queryParams["addressid"];
    this.redirecturl=this.aroute.snapshot.queryParams["redirecturl"];
    this.getAddressById(addressid);
    $('#otherFieldOpen').hide();
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
               this.address.latitude= this.addr.lat;
               this.address.longitude= this.addr.long;
              
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
                setTimeout(() => {
                  if ($(".form_list .input").val() == '') {
                  $(".form_list .style").removeClass("inpActive");
                  }
                  else {
                  $(".form_list .style").addClass("inpActive");
                  }
                  }, 200);
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
        (function () {
            // trim polyfill : https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/Trim
            if (!String.prototype.trim) {
                (function () {
                    // Make sure we trim BOM and NBSP
                    var rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
                    String.prototype.trim = function () {
                        return this.replace(rtrim, '');
                    };
                })();
            }

            [].slice.call(document.querySelectorAll('input.input__field')).forEach(function (inputEl) {
                // in case the input is already filled..
                if (inputEl.value.trim() !== '') {
                    classie.add(inputEl.parentNode, 'input--filled');
                }

                // events:
                inputEl.addEventListener('focus', onInputFocus);
                inputEl.addEventListener('blur', onInputBlur);
            });

            function onInputFocus(ev) {
                classie.add(ev.target.parentNode, 'input--filled');
            }

            function onInputBlur(ev) {
                if (ev.target.value.trim() === '') {
                    classie.remove(ev.target.parentNode, 'input--filled');
                }
            }
        })();

        $('.input--nao').addClass('input--filled');


        $('#datepicker').fdatepicker();
        $('#datepicker').fdatepicker().on('hide',()=> {
           
         //   this.callJS();
            // do something
          })

    }, 20);


  }

  getAddressById(addressid){


    
    this.loadingBar.start();
    let data="user_id="+this.state.user.id+"&address_id="+addressid;

    
    this.api.getAddressById(data).subscribe(
      (response)=>
          { 
           
        
            
            this.getUserRelations();
            
             var dt:any=response;
             if(dt.status=="200"){


                setTimeout(() => {
                    
                    let addr=dt.data[0];
                    this.address.address_id=addr.address_id;
                    this.address.full_name=addr.full_name;
                    this.address.mobile=addr.mobile;
                    this.address.address=addr.address;
                    this.address.landmark=addr.landmark;
                    this.address.state=addr.state;
                    this.address.city=addr.city;
                    this.address.pincode=addr.pincode;
                    this.address.address_type=addr.address_type;
                    this.address.relation_id=addr.ralation_id;
                    this.address.gender=addr.gender;
                    this.address.area=addr.area;
                    this.address.date_of_birth=addr.date_of_birth;
                  
                    this.address.latitude=addr.latitude;
                    this.address.longitude=addr.longitude;

                    if(this.address.gender==0){
                      this.onSetGender('m');
                    }
                    else  if(this.address.gender==1){
                      this.onSetGender('f');
                    }
                }, 20);
            

              //  this.order=dt.order_data;
              // this.isvalid=true;
              }
             
 
             else if (dt.status=="201"){
              
                history.go(-1);
                //  this.global.setToast('error',this.global.toastmsg.login_invalid);

             }
            //  console.log(dt);
       
             this.loadingBar.stop();
             
      
          
          },
      (error)=>{

     //   $('.preloader').fadeOut();
        //   this.spinnerService.hide();
           console.log('RESPONSE FAILED');console.log(error)}
  );


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

        let data="user_id="+this.address.user_id+"&address_id="+this.address.address_id+"&user_type_id="+this.address.user_type+"&full_name="+this.address.full_name+"&mobile="+this.address.mobile+"&landmark="+this.address.landmark+"&address="+this.address.address+"&state="+this.address.state+"&city="+this.address.city+"&pincode="+this.address.pincode+"&address_type="+this.address.address_type+"&makeitdefault="+this.address.makeitdefault
                +"&ralation_id="+this.address.relation_id+"&gender="+this.address.gender+"&date_of_birth="+this.address.date_of_birth+"&area="+this.address.area+"&other_address_type="+this.address.other_address_type
                +"&latitude="+this.address.latitude+"&longitude="+this.address.longitude;

                
        this.loadingBar.start();
        this.api.addAddress(data).subscribe(
            (response)=>
                { 
        
                  
                   var dt:any=response;
        
                   if(dt.status==200){
         
                     this.global.setToast('info','Address updated successfully');
                     if(this.redirecturl!=undefined){
                      this.router.navigate([this.redirecturl]);
                   }else{
                      this.router.navigate(['/my-account/family-tree']);
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

      this.address.latitude= this.addr.lat;
      this.address.longitude= this.addr.long;

      $('.insideDesign').show();
      //  this.router.navigate(['/home'], { queryParams: {city:this.addr.city} })
      this.loadingBar.stop();
  
  
  
  
  
  
    }, (errStatus)=> {
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
           //   console.log(status);
          }
  
        });
  
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
        //  console.log(status);
      }
  
    });
  
  
  
   // console.log($event.coords.lng);
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
    else if (this.address.address_type == '') {

        this.global.setToast('error', this.global.toastmsg.select_address_type);
        return false;
    }
    else if (this.address.latitude == '') {

      this.toggleMapView();
      this.global.setToast('error','Please set your location on map');
  }
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
onClose(){

  history.go(-1);
}

}
