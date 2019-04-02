import { Component, OnInit } from '@angular/core';
import {Api} from '../../api.service';
import {AppGlobals} from '../../app.global';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { Router } from '@angular/router';
 


declare var $:any;


@Component({
  selector: 'app-cart3',
  templateUrl: './cart3.component.html',
  styleUrls: ['./cart3.component.css']
})
export class Cart3Component implements OnInit {

  preferences:any=[];
  state:any;
  addresses:any=[];
  isaddresspopup:boolean=false;

  constructor(private api:Api,public global:AppGlobals,private loadingBar:LoadingBarService,private router:Router) {this.state=this.global.getAppState(); }

  ngOnInit() {

//    this.getPreferencesData();
      this.getUserAddressList();
  }

  getUserAddressList(){


    this.loadingBar.start();
    let data="user_id="+this.state.user.id+"&address_id=";
 
    
   /// console.log(this.address);
    this.api.getUserAddressList(data).subscribe(
        (response)=>
            { 
              
               var dt:any=response;
              console.log(dt);
              this.global.setToast('info',dt.message);
  
               if(dt.status==200){
                
                this.addresses=dt.data;
                setTimeout(() => {
                  $('.manage_address_wrapper').click(function(){
                   
                   $('.address_options').toggle();
                  });
                }, 200);
                // this.is_result_get=true;
                // this.searchresp=dt.user_data;
            //    this.address=this.addressinit;
                
                 this.global.setToast('info',dt.message);
    
               }
               else if(dt.status==201){
    
                // this.is_result_get=false;
                // this.searchresp=[];
               }
     
           this.loadingBar.stop();
              
        
            
            },
        (error)=>{
    
         
             console.log('RESPONSE FAILED');console.log(error)}
    );
  
  }


  // getPreferencesData(){

  //   this.loadingBar.start();

  //    let data="";
  //       this.api.getPreferences(data).subscribe(
  //     (response)=>
  //         { 
  //           console.log('IN SEO');
  //           console.log(response);
  //           let dt:any=response;

  //           this.preferences=dt.data;
  //           this.loadingBar.stop();

   
  //         },
  //     (error)=>{
  
       
  //          console.log('RESPONSE FAILED');console.log(error)}
  // );
  // }

  setPreference(preference){

  
    
    $('.style').removeClass('active');

    setTimeout(() => {
        $('#pref_'+preference.id).addClass('active');
    }, 20);

  }

  onGenerateEnquiry(){

    
    this.loadingBar.start();
    let orderdata={'user_id':'','session_id':'','user_type_id':'','entry_type':'','address_id':'','latitude':'','longitude':'','preference_id':''};

      orderdata.user_id=this.state.user.id;
      orderdata.session_id=this.state.cartdata.session_id;
      orderdata.user_type_id=this.state.user.user_type;
      orderdata.entry_type='Enquiry';
      orderdata.address_id='18';
      orderdata.latitude='28.637011';
      orderdata.longitude='77.293411';
      orderdata.preference_id='18';
      
    
      
      let data="user_id="+orderdata.user_id+"&session_id="+orderdata.session_id+"&user_type_id="+orderdata.user_type_id+"&entry_type="+orderdata.entry_type+"&address_id="+orderdata.address_id+"&latitude="+orderdata.latitude+"&longitude="+orderdata.longitude+"&preference_id="+orderdata.preference_id;
    
      
        this.api.generateEnquiry(data).subscribe(
      (response)=>
          { 
    
            
            let dt:any=response;
            this.state.cartdata.session_id='';
            this.state.cartdata.cartcount=0;
            this.global.saveAppState(this.state);
            this.router.navigate(['/home']);
            this.global.setToast('info',dt.message);

   
          },
      (error)=>{
  
       
           console.log('RESPONSE FAILED');console.log(error)}
  );



  }

  toggleAddressPopup(){

    if(this.isaddresspopup){

      this.isaddresspopup=false;
      $('.add_addressPopup').css('display','none');

    }
    else if(!this.isaddresspopup){

      this.isaddresspopup=true;
      $('.add_addressPopup').css('display','block');
    }
    

  }

  navigate(field) {


    if (field == 'add-address') {

      if(this.state.user.user_type_id!='1' && this.state.user.user_type_id!='0'){

        
        this.router.navigate(['/chemist-account/add-address'],{ queryParams: { redirecturl:'cart-step-two'}})


      }
      else  if(this.state.user.user_type_id=='1' ){
       
        
        this.router.navigate(['/my-account/add-member'],{ queryParams: { redirecturl:'cart-step-two'}})
      }
     

    }

    else if(field=='select-address'){

      this.router.navigate(['/cart-step-three'])
    }
}

setAddress(address){

//  console.log(address);
  $('.checkmark').removeClass('active');
  let str="#addrset_"+address.address_id;
 
  //  console.log(str);
    $(str).addClass('active');
    
  this.global.setToast('info','Address set to default address successfully.!');
 
  this.setDefaultAddress(address);

 // this.router.navigate(['/cart-step-two']);
  
}

onEditAddress(address){


  if(this.state.user.user_type_id!=1){

    this.router.navigate(['/chemist-account/edit-address'],{queryParams:{'addressid':address.address_id,'redirecturl':'/cart-step-three'}})
  } 
  else{
    this.router.navigate(['/my-account/edit-member'],{queryParams:{'addressid':address.address_id,'redirecturl':'/cart-step-three'}})
  }

}

setDefaultAddress(address){

  this.loadingBar.start();

  let data = "user_id=" + this.state.user.id+"&address_id="+address.address_id;

  
  this.api.makeDefaultAddress(data).subscribe(
    (response) => {

      
      this.loadingBar.stop();

      var dt: any = response;

     
      //    this.global.setToast('info',dt.message);

      if (dt.status == 200) {

        this.router.navigate(['/cart-step-two']);
       // this.global.setToast('info',dt.message);
       

      }
      else if (dt.status == 201) {


      }





    },
    (error) => {


      console.log('RESPONSE FAILED'); console.log(error)
    }
  );



}


loadCartData() {

  // if (this.state.is_logged_in == false ) {

  //   this.global.setToast('error','Please login or register');

  // }

  // else {
  let direct_enquiry: any = 0;
  if (this.state.vendor_id != 0) {
    direct_enquiry = 1;

  }


  //    this.loadingBar.start();
  let data:any;
  if (this.state.is_logged_in) {

    data = "session_id=" + this.state.cartdata.session_id + "&user_id=" + this.state.user.id + "&direct_enquiry=" + direct_enquiry + "&vendor_id=" + this.state.vendor_id;;
  }
  else if (!this.state.is_logged_in) {
    data = "session_id=" + this.state.cartdata.session_id + "&user_id=" + "&direct_enquiry=" + direct_enquiry + "&vendor_id=" + this.state.vendor_id;;
  }



  //  let data = "session_id=" + this.state.cartdata.session_id + "&user_id="+(this.state.is_logged_in)?this.state.user.id:'';
  this.api.fetchCartData(data).subscribe(
    (response) => {

      let state = this.global.getAppState();
      this.loadingBar.stop();

      var dt: any = response;

      //    this.global.setToast('info',dt.message);


      if (dt.status == 200) {


        if (dt.net_payble_amount < dt.minimum_order_amount) {

          state.minimum_order_amount = dt.minimum_order_amount;
          this.global.saveAppState(state);
          this.router.navigate(['/cart-step-one']);

        }
        else {
          //      this.global.setToast('info', dt.message);
          let cdta = dt.data;

          cdta.map(elem => {
            if (parseInt(elem.product_qty) < 1) {

              let qty = parseInt(elem.product_qty);
              qty = qty + 1;

              elem.product_qty = qty.toString();
            }
          });

          // this.cartdata = cdta;
          // this.cart.cart_amount = dt.cart_amount;
          // console.log('CART AMT');
          // console.log(this.cart.cart_amount);
          // this.cart.delivery_amount = dt.delivery_amount;
          // this.cart.gross_amount = dt.gross_amount;
          // this.cart.items = this.cartdata;




          state.cartdata.cart_amount = dt.cart_amount;
          state.cartdata.cartcount = dt.cart_count;
          state.cartdata.delivery_amount = dt.delivery_amount;
          state.cartdata.gross_amount = dt.cart_amount;
          state.cartdata.customer_discount_wallet = dt.customer_discount_wallet;
          state.cartdata.customer_discount_wallet_amount = dt.customer_discount_wallet_amount;
          state.cartdata.lead_plan_detail_id = dt.lead_plan_detail_id;
          state.cartdata.lead_plan_id = dt.lead_plan_id;
          state.cartdata.net_payble_amount = dt.net_payble_amount;
          state.minimum_order_amount = dt.minimum_order_amount;
          state.cartdata.apc_cash_used = dt.apc_cash_used;
          state.cartdata.items = dt.data;


          state.cartdata.session_id = dt.session_id;

          this.state.cartdata = state.cartdata;
        //  this.child.cartcount = dt.data.length;


          //   this.global.saveAppState(state);

          // else if(state.cartdata.minimum_order_amount == undefined){

          //   this.router.navigate(['/cart-step-one']);
          // }


          //this.state.cartdata.itemst=this.cart;
       
        }




      }
      else if (dt.status == 201) {


      }





    },
    (error) => {


      console.log('RESPONSE FAILED'); console.log(error)
    }
  );


  // }

}



}
