import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LoadingBarService } from '@ngx-loading-bar/core';
import {Api} from '../../../api.service';
import {AppGlobals} from '../../../app.global';
 
declare var $:any;
@Component({
  selector: 'app-business-timings',
  templateUrl: './business-timings.component.html',
  styleUrls: ['./business-timings.component.css']
})
export class BusinessTimingsComponent implements OnInit {

  timingslots:any;
  business_delivery:any={'open_time':'','close_time':''};
  state:any;
  constructor(private aroute:ActivatedRoute,private router:Router,public global:AppGlobals,
              private loadingBar:LoadingBarService,private api:Api) { this.state=this.global.getAppState();}

  ngOnInit() {
    setTimeout(() => {
      $('.list a').removeClass('active');
      $('#profilesetup').addClass('active');
    }, 20);
    $('.timeList').hide();
    this.initDetails();
    this.getBusinessTiming();
    $("html, body").animate({ scrollTop: 0 }, "slow");

  }

  getBusinessTiming(){

    let data="user_id="+this.state.user.id+"&data_for=3"+"&user_type_id="+this.state.user.user_type_id;
    console.log(data);
    this.loadingBar.start();
    this.api.getProfileDetails(data).subscribe(
      (response) => {
 

        var dt: any = response;

        console.log(dt);
     

        if (dt.status == 200) {

        //  this.businesstypes=dt.data;
          // this.getBusinessTypes();
          this.timingslots=dt.data.business_timing;
          this.business_delivery.open_time=dt.open_time;
          this.business_delivery.close_time=dt.close_time;
          
          setTimeout(() => {
            $('input').lc_switch();
            $('.timeList').fadeIn(800);
          }, 20);
          // this.setInitialParams(dt.data.business_data);
        //  this.business_details=
          this.loadingBar.stop();
         

        }
        else if (dt.status == 201) {

        }

      },
      (error) => {

        this.loadingBar.stop();
        //   this.spinnerService.hide();
        console.log('RESPONSE FAILED'); console.log(error)
      }
    );

  }

  initDetails(){

    this.timingslots=[

    {
      day:'Sunday',
      open_close_status:"1"
    },
    {
      day:'Sunday',
      open_close_status:"1"
    },
    {
      day:'Sunday',
      open_close_status:"1"
    },
    {
      day:'Sunday',
      open_close_status:"1"
    },
    {
      day:'Sunday',
      open_close_status:"1"
    },
    {
      id:'6',
      name:'Friday',
      key:'fri',
      is_checked:true
    },
    {
      id:'7',
      name:'Saturday',
      key:'sat',
      is_checked:true
    },
    
  

    ]

  }

  ngAfterViewInit(){

  
    $('#openingstartTime').mdtimepicker({timeFormat: 'hh:mm'});   
    $('#openingendTime').mdtimepicker({timeFormat: 'hh:mm'});
    $("#openingstartTime").click(function(){
      $(".mdtp__am").click();
 })
 $("#openingendTime").click(function(){
  $(".mdtp__pm").click();
})
// // triggered each time a field changes status
// $('body').delegate('.lcs_check', 'lcs-statuschange', function() {
//   var status = ($(this).is(':checked')) ? 'checked' : 'unchecked';
//   console.log('field changed status: '+ status );
// });

// // triggered each time a field is checked
// $('body').delegate('.lcs_check', 'lcs-on', function() {
//   console.log('field is checked');
// });

// // triggered each time a is unchecked
// $('body').delegate('.lcs_check', 'lcs-off', function() {
//   console.log('field is unchecked');
// });


  }

  onToggle(slot){
    
    console.log(slot);
    this.timingslots.filter(elem=>{if(elem.id==slot.id){

      if(elem.open_close_status == '0'){
        elem.open_close_status='1';
      }
      else{
        elem.open_close_status='0';
      }
    
     }})


     let data="user_id="+this.state.user.id+"&user_type_id="+this.state.user.user_type_id+"&time_id="+slot.id+"&open_close_status="+slot.open_close_status+"&open_time="+this.business_delivery.open_time+"&close_time="+this.business_delivery.close_time;
      console.log(data);
     this.loadingBar.start();
     
     this.api.updateBusinessTiming(data).subscribe(
       (response) => {
      
         var dt: any = response;
         
      
 
         if (dt.status == 200) {
 
         //  this.businesstypes=dt.data;
           // this.getBusinessTypes();
         
           // this.setInitialParams(dt.data.business_data);
         //  this.business_details=
           this.loadingBar.stop();
          
 
         }
         else if (dt.status == 201) {
 
         }
 
       },
       (error) => {
 
         this.loadingBar.stop();
         //   this.spinnerService.hide();
         console.log('RESPONSE FAILED'); console.log(error)
       }
     );


    // this.timingslots.filter(elem=>{if(elem.id==slot.id){
    //   elem.open_close_status=!slot.is_checked;
    // }})
    // if(slot.key =='sun'){
   
    //   if(slot.is_checked){
        
    //     setTimeout(() => {
    //       $('#slot_'+slot.id).lcs_on();
    //     }, 20);
        
    //   }
    //   else{
        
    //     setTimeout(() => {
    //       $('#slot_'+slot.id).lcs_off();
    //     }, 20);
       

    //   }
   

    // }
    // else  if(slot.key =='mon'){
   
    //   if(slot.is_checked){
        
    //     setTimeout(() => {
    //       $('#slot_'+slot.id).lcs_on();
    //     }, 20);
        
    //   }
    //   else{
        
    //     setTimeout(() => {
    //       $('#slot_'+slot.id).lcs_off();
    //     }, 20);
       

    //   }
   

   // }

  }

  onNext(){
    // this.step=
    this.business_delivery.open_time=($('#openingstartTime').attr('data-time')==undefined )?this.business_delivery.open_time:$('#openingstartTime').attr('data-time');

    this.business_delivery.close_time= ($('#openingendTime').attr('data-time')==undefined)?this.business_delivery.close_time:$('#openingendTime').attr('data-time'); 

     this.onUpdateBusinessTimings();
    this.router.navigate(['/chemist-account/profile-setup'], { queryParams: { step:'4' } });
   }

   onUpdateBusinessTimings(){

         let data="user_id="+this.state.user.id+"&open_time="+this.business_delivery.open_time+"&close_time="+this.business_delivery.close_time;
      console.log(data);
     this.loadingBar.start();
     
     this.api.updateBusinessTime(data).subscribe(
       (response) => {
      
         var dt: any = response;
         
      
 
         if (dt.status == 200) {
 
         //  this.businesstypes=dt.data;
           // this.getBusinessTypes();
         
           // this.setInitialParams(dt.data.business_data);
         //  this.business_details=
           this.loadingBar.stop();
          
 
         }
         else if (dt.status == 201) {
 
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
