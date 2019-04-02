import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LoadingBarService } from '@ngx-loading-bar/core';
import {Api} from '../../../api.service';
import {AppGlobals} from '../../../app.global';
 
declare var $:any;
@Component({
  selector: 'app-delivery-details',
  templateUrl: './delivery-details.component.html',
  styleUrls: ['./delivery-details.component.css']
})
export class DeliveryDetailsComponent implements OnInit {


  state:any;
  detail:any={'user_id':'','user_type_id':'','free_delivery_range':'','min_amt_free_delivery':'','per_km_delivery_charge':'',
              'maximum_delivery_charge':'','discount_percent':'','open_time':'','close_time':'','break_start_time':'','break_close_time':'','payment_mode':'','paymodes':[],'is_any_paymode_checked':0}

  constructor(private aroute:ActivatedRoute,private router:Router,private api:Api,public global:AppGlobals,
				private loadingBar:LoadingBarService) { this.state=this.global.getAppState();}

  ngOnInit() {
    setTimeout(() => {
      $('.nameDesigns').removeClass('active');
      $('#profilesetup').addClass('active');
      let step=this.aroute.snapshot.queryParams["step"];
      var currindex = step;
   
      if(currindex >= 4){
          $('.profileStepsMeter .owl-wrapper').trigger('owl.goTo', 6); 
      }else{
          $('.profileStepsMeter .owl-wrapper').trigger('owl.goTo', 0); 

      }
    }, 20);
    $('.fromGroup').hide();
   
	this.getDeliveryDetails();
  $("html, body").animate({ scrollTop: 0 }, "slow");
  }

  getDeliveryDetails(){

    let data="user_id="+this.state.user.id+"&data_for=5"+"&user_type_id="+this.state.user.user_type_id;
   
    this.loadingBar.start();
    this.api.getProfileDetails(data).subscribe(
      (response) => {
        

        let dt: any = response;
        
     

        if (dt.status == 200) {
        
        
           this.loadPlugins(dt.data.business_delivery);
           this.detail.free_delivery_range=dt.data.business_delivery.free_delivery_range;
           this.detail.per_km_delivery_charge=dt.data.business_delivery.per_km_delivery_charge;
           this.detail.maximum_delivery_charge=dt.data.business_delivery.maximum_delivery_charge;
           this.detail.min_amt_free_delivery=dt.data.business_delivery.min_amt_free_delivery;
           this.detail.open_time=dt.data.business_delivery.open_time;
           this.detail.close_time=dt.data.business_delivery.close_time;
           this.detail.break_start_time=dt.data.business_delivery.break_start_time;
           this.detail.break_close_time=dt.data.business_delivery.break_close_time;
           
           this.detail.paymodes=dt.data.payment_mode;
           this.detail.paymodes.map(elem=>{
             return elem['is_checked']=false;
           })
           if(dt.data.business_delivery.payment_mode.length !=0){

            let pmodes=dt.data.business_delivery.payment_mode.split(',');
           
            this.detail.paymodes.map(elem=>{

              if(pmodes.indexOf(elem.id)> -1){
                elem['is_checked']=true;
              }
               
            })


           }
          //  $('#openingstartTime').val(dt.data.business_delivery.open_time)
          //  $('#openingendTime').val(dt.data.business_delivery.close_time);
          //  $('#breakstartTime').val(dt.data.business_delivery.break_start_time);
          //  $('#breakendTime').val(dt.data.business_delivery.break_close_time);
           $('.fromGroup').fadeIn(800);

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

  getSliderValue(val){
    //console.log(val);
    let value=val.split(' ');
    return value[0];
  }

  onNext(){
    // this.step=
    let open_time=($('#openingstartTime').attr('data-time')==undefined )?this.detail.open_time:$('#openingstartTime').attr('data-time');

    let close_time= ($('#openingendTime').attr('data-time')==undefined)?this.detail.close_time:$('#openingendTime').attr('data-time'); 
    let break_start_time=($('#breakstartTime').attr('data-time')==undefined)?this.detail.break_start_time:$('#breakstartTime').attr('data-time');
    let break_close_time=($('#breakendTime').attr('data-time')==undefined)?this.detail.break_close_time:$('#breakendTime').attr('data-time');  
    let free_delivery_range=this.getSliderValue(($('#delivery_range').val()==undefined)?this.detail.free_delivery_range:$('#delivery_range').val());
    let min_amt_free_delivery=this.getSliderValue(($('#free_delivery').val()==undefined)?this.detail.min_amt_free_delivery:$('#free_delivery').val());
    let per_km_delivery_charge=this.getSliderValue(($('#per_km_delivery_charge').val()==undefined)?this.detail.per_km_delivery_charge:$('#per_km_delivery_charge').val());
    let maximum_delivery_charge=this.getSliderValue(($('#max_delivery_charge').val()==undefined)?this.detail.max_delivery_charge:$('#max_delivery_charge').val());
    this.detail.payment_mode='';
    this.detail.paymodes.map(elem=> {
      
      if(elem.is_checked==true){
        this.detail.payment_mode=this.detail.payment_mode.concat(elem.id)+","
      }
      
    });
    if(this.detail.payment_mode.length !=0){
      let str:any=this.detail.payment_mode.split(',');
      str=str.slice(0, -1);
      str=str.join();
      this.detail.payment_mode=str;

      this.detail.is_any_paymode_checked=1;

    }
    else{
      this.detail.is_any_paymode_checked=0;
    }
    // this.detail.payment_mode=(this.detail.payment_mode.length !=0)?
    // console.log( this.detail.payment_mode);
    
    
   
    if(open_time.length==0){

      this.global.setToast('error','Please select opening start time');

   }
    else  if(close_time.length==0){

      this.global.setToast('error','Please select opening end time');
    }
    // else  if(break_start_time.length==0){

    //   this.global.setToast('error','Please select Break start time');
    // }
    // else  if(break_close_time.length==0){

    //   this.global.setToast('error','Please select Break end time');
    // }
    else  if(this.detail.is_any_paymode_checked==0){

      this.global.setToast('error','Please select atleast one payment mode');
    }
    else{


      if(break_start_time.length==0){

        break_start_time='';
        break_close_time='';
      }
      let data="user_id="+this.state.user.id+"&user_type_id="+this.state.user.user_type_id+"&free_delivery_range="+free_delivery_range
                +"&min_amt_free_delivery="+min_amt_free_delivery+"&per_km_delivery_charge="+per_km_delivery_charge
                +"&maximum_delivery_charge="+maximum_delivery_charge+"&discount_percent="+this.detail.discount_percent
                +"&open_time="+open_time+"&close_time="+close_time+"&break_start_time="+break_start_time+"&break_close_time="+break_close_time
                +"&payment_mode="+this.detail.payment_mode;

            
                this.loadingBar.start();

       this.api.updateBusinessDelivery(data).subscribe(
                  (response) => {
                 
               
                    let dt: any = response;
                    
                 
            
                    if (dt.status == 200) {
                    
                    
                      this.global.setToast('info',dt.message);
                       
                     
                      this.router.navigate(['/chemist-account/profile-setup'], { queryParams: { step:'6' } });
                    }
                    else if (dt.status == 201) {
            
                    }
                    this.loadingBar.stop();
            
                  },
                  (error) => {
            
                   
                    //   this.spinnerService.hide();
                    console.log('RESPONSE FAILED'); console.log(error)
                  }
                );

    }
    //
   }

   ngAfterViewInit(){

   

   }

   loadPlugins(data){

    $( "#delivery_range" ).flatslider({
			min: 0.5, max: 5,
			step: 0.5,
			value:data.free_delivery_range,
			range: "min",
			einheit: 'KM'
		});
    

		$( "#free_delivery" ).flatslider({
			min: 0, max: 150,
			step: 5,
			value: data.min_amt_free_delivery,
			range: "min",
			einheit: 'Rs.'
		});

		$( "#per_km_delivery_charge" ).flatslider({
			min: 10, max: 20,
			step: 1,
			value: data.per_km_delivery_charge,
			range: "min",
			einheit: 'Rs.'
		});

		$( "#max_delivery_charge" ).flatslider({
			min: 100, max: 250,
			step: 5,
			value: data.maximum_delivery_charge,
			range: "min",
			einheit: 'Rs.'
		});

 
    
    $('#openingstartTime').mdtimepicker({timeFormat: 'hh:mm'});   
    $('#openingendTime').mdtimepicker({timeFormat: 'hh:mm'});
    $('#breakstartTime').mdtimepicker({timeFormat: 'hh:mm'});
    $('#breakendTime').mdtimepicker({timeFormat: 'hh:mm'});
    $("#openingstartTime").click(function(){
      $(".mdtp__am").click();
 })

   }

   onSelectPaymentMode(mode){
    
 
    if( $("#mode_"+mode.parameter_code).hasClass('active')){

      $("#mode_"+mode.parameter_code).removeClass('active');
      this.detail.paymodes.map(elem=>{

        if(elem.id==mode.id){
         
          elem.is_checked=false;
        }

      })

    }
    else{


      $("#mode_"+mode.parameter_code).addClass('active');
      this.detail.paymodes.map(elem=>{

        if(elem.id==mode.id){
         
          elem.is_checked=true;
        }

      })
    } 
   


   }
}
