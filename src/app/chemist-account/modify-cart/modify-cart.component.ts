import { Component, OnInit, ViewChild } from '@angular/core';
import { HeaderComponent } from '../../incl/header/header.component';
import { Api } from '../../api.service';
import { AppGlobals } from '../../app.global';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { Router,ActivatedRoute } from '@angular/router';
import { PopupComponent } from '../../popup/popup.component';

declare var $: any;
 
@Component({
  selector: 'app-modify-cart',
  templateUrl: './modify-cart.component.html',
  styleUrls: ['./modify-cart.component.css']
})
export class ModifyCartComponent implements OnInit {

  state: any;
  cartdata: any = [];
  @ViewChild('child')
  private child: HeaderComponent;
  @ViewChild('popupchild') popup: PopupComponent;

  cart: any = { 'cart_amount': '', 'delivery_amount': '', 'cart_count': '', 'gross_amount': '', 'items': [], 'customer_discount_wallet': '', 'lead_plan_detail_id': '', 'lead_plan_id': '', 'customer_discount_wallet_amount': '', 'net_payble_amount': '','is_modify_cart_popup':false };
  respdata: any = { 'categories_list': [],'order_id':'','customer_id':'','enquiry_id':'','redirect_enquiry_id':'','direct_enquiry':'' }
  modify:any={'product_name':'','product_qty':'','old_mrp':'','new_mrp':'','product_id':'','product_mrp':'','price':''}
  // errtxt:any='';
  // iserr:boolean=false;
  err: any = { 'iserr': false, errtxt: '' };
  constructor(private api: Api, public global: AppGlobals, private loadingBar: LoadingBarService, private router: Router,private aroute:ActivatedRoute) { }

  ngOnInit() {

    this.state = this.global.getAppState();
  //  console.log(this.state);
    
    
    this.respdata.order_id=   this.aroute.snapshot.queryParams["oid"];
    this.respdata.customer_id=   this.aroute.snapshot.queryParams["uid"];
    this.respdata.enquiry_id=   this.aroute.snapshot.queryParams["eid"];
    this.respdata.direct_enquiry=   this.aroute.snapshot.queryParams["deq"];
    
    this.loadCartData();
    $("html, body").animate({ scrollTop: 0 }, "slow");
   
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

    this.loadingBar.start();
    let data:any;
  
      data = "order_id=" + this.respdata.order_id + "&user_id="+this.respdata.customer_id + "&vendor_id=" + this.state.user.id+"&direct_enquiry="+this.respdata.direct_enquiry;
  
   console.log(data);
    //  let data = "session_id=" + this.state.cartdata.session_id + "&user_id="+(this.state.is_logged_in)?this.state.user.id:'';
    this.api.getOrderModifyData(data).subscribe(
      (response) => {

        this.loadingBar.stop();

        var dt: any = response;
        console.log(dt);
        //    this.global.setToast('info',dt.message);

        if (dt.status == 200) {

          //  this.global.setToast('info', dt.message);
          let cdta = dt.data;


          cdta.map(elem => {
            if (parseInt(elem.quantity) < 1) {
              
              let qty = parseInt(elem.quantity);
              qty = qty + 1;

              elem.quantity = qty.toString();
            }
          });

          this.cartdata = cdta;
          this.cart.cart_amount = dt.cart_amount;


          this.cart.delivery_amount = dt.delivery_amount;
          this.cart.gross_amount = dt.gross_amount;
          this.cart.items = this.cartdata;
          this.cart.net_payble_amount = dt.net_payble_amount;
          let state = this.global.getAppState();
          state.cartdata.cart_amount = this.cart.cart_amount;
          state.cartdata.cartcount = dt.cart_count;

      //    this.child.cartCountEvent();

          state.cartdata.delivery_amount = this.cart.delivery_amount;
          state.cartdata.gross_amount = this.cart.gross_amount;
          state.cartdata.customer_discount_wallet = dt.customer_discount_wallet;
          state.cartdata.customer_discount_wallet_amount = dt.customer_discount_wallet_amount;
          state.cartdata.lead_plan_detail_id = dt.lead_plan_detail_id;
          state.cartdata.lead_plan_id = dt.lead_plan_id;
          state.cartdata.total_product_discount_amount = dt.total_product_discount_amount;
          state.cartdata.net_payble_amount = dt.net_payble_amount;
          
          state.cartdata.apc_cash_used = dt.apc_cash_used;
          state.minimum_order_amount = dt.minimum_order_amount;

          state.cartdata.items = dt.data;
          
          state.minimum_order_amount=dt.minimum_order_amount;
          this.state.minimum_order_amount=dt.minimum_order_amount;
         

          state.cartdata.session_id = dt.session_id;

  

          this.state.cartdata = state.cartdata;
        
          // setTimeout(() => {
          //   this.child.onUpdateCartCountFromParent({'cartcount':dt.data.length});
          // }, 20);
          
          //this.child.cartcount = this.state.cartdata.items.length;
          console.log(dt.data.length);
      //    this.child.cartcount=dt.data.length;

      //    this.global.saveAppState(state);



          //this.state.cartdata.itemst=this.cart;


        }
        else if (dt.status == 201) {

          if (dt.data.length == 0) {
            this.getCategoriesById();
          }
        }





      },
      (error) => {


        console.log('RESPONSE FAILED'); console.log(error)
      }
    );


    // }

  }

  udpateCart(cart, type) {
    console.log(cart);
 
  //  modify:any={'product_name':'','product_qty':'','old_mrp':'','new_mrp':''}
    this.modify.product_id=cart.product_id;
    this.modify.price=cart.price;
    this.modify.product_name=cart.product_name;
    this.modify.product_qty=cart.product_qty;
    this.modify.old_mrp=cart.price;
    this.modify.new_mrp=cart.price;
    console.log(this.modify);
    this.onToggleModifyPopup();

    // if (type == '+') {


    //   this.cartdata.map(elem => {

    //     if (elem.product_id == cart.product_id) {

    //       let qty = parseInt(elem.product_qty);
    //       qty = qty + 1;
    //       elem.product_qty = qty.toString();
    //       return elem;
    //     }

    //   });

    //   let prod = this.cartdata.filter(elem => {
    //     return elem.product_id == cart.product_id;
    //   })

    //   if (prod.length > 0) {

    //     this.addToCartFn(prod[0]);
    //   }
    //   else {

    //     this.global.setToast('error', 'Some error occured');
    //   }


    //   this.state.cartdata.items = this.cartdata;
    //   this.global.saveAppState(this.state);
    //   //this.api.addToCartFn()

    // }
    // else if (type == '-') {

    //   this.cartdata.map(elem => {

    //     if (elem.product_id == cart.product_id) {

    //       let qty = parseInt(elem.product_qty);
    //       qty = qty - 1;
    //       if (qty > 0) {

    //         elem.product_qty = qty.toString();
    //       }

    //     }

    //   });

    //   let prod = this.cartdata.filter(elem => {
    //     return elem.product_id == cart.product_id;
    //   })

    //   if (prod.length > 0) {

    //     this.addToCartFn(prod[0]);
    //   }
    //   else {

    //     this.global.setToast('error', 'Some error occured');
    //   }



    // }

    // // this.state.cartdata=this.cart;
    // this.state.cartdata.items = this.cartdata;
    // // this.state.cartdata.customer_discount_wallet=dt.customer_discount_wallet;
    // // this.state.cartdata.lead_plan_detail_id=dt.lead_plan_detail_id;
    // // this.state.cartdata.lead_plan_id=dt.lead_plan_id;
    // let s: any = this.global.getAppState();



    // //   s.cartdata.customer_discount_wallet_amount=s.cartdata.customer_discount_wallet_amount;
    // //   this.state.cartdata.customer_discount_wallet_amount=s.cartdata.customer_discount_wallet_amount;

    // this.cart.cart_amount = this.calculateTotalMRP(this.state.cartdata.items);
    // this.cart.gross_amount = this.calculateGrandTotal(this.state.cartdata.items);

    // this.global.saveAppState(this.state);


  }

  removeCartItem(cart) {



    this.removeItem(cart);
    // if( this.cartdata)
    this.cartdata.map((elem, idx) => {

      if (elem.rowid == cart.rowid) {

        this.cartdata.splice(idx, 1);
        return;

      }
    })

    if (this.cartdata.length == 0) {
      this.getCategoriesById();
    }
  }

  removeItem(productdata) {


    let state = this.global.getAppState();
    this.state = state;
    let direct_enquiry: any = 0;
    if (this.state.vendor_id != 0) {
      direct_enquiry = 1;

    }
    let cdata = { 'removecart': '1', 'rowid': '', 'session_id': '', 'user_id': '' };

    cdata.user_id = state.user.id;
    cdata.rowid = productdata.rowid;
    cdata.session_id = state.cartdata.session_id;


    //let data = "session_id=" + cdata.session_id + "&user_id=&rowid=" + cdata.rowid + "&removecart=" + cdata.removecart;

    let data;
    

      data = "user_id="+this.respdata.customer_id+"&vendor_id="+this.state.user.id+"&order_id="+this.respdata.order_id+"&rowid=" + cdata.rowid + "&direct_enquiry=" + direct_enquiry + "&removecart=" + cdata.removecart;
    console.log(data);
  

    this.api.removeMoidifiedCart(data).subscribe(
      (response) => {
        // alert('444');



        var dt: any = response;

        console.log(dt);
      //  this.child.cartCountEvent();

        if (dt.status == 200) {

          this.global.setToast('info', dt.message);



          this.cart.delivery_amount = dt.delivery_amount;
          this.cart.gross_amount = dt.cart_amount;
          this.cart.items = dt.data;

          this.state = this.global.getAppState();
          this.state.cartdata.cart_amount = dt.cart_amount;
          this.cart.cart_amount = dt.cart_amount;
          this.state.cartdata.cartcount = dt.cart_count;
          this.state.cartdata.delivery_amount = this.cart.delivery_amount;
          this.state.cartdata.gross_amount = this.cart.gross_amount;
          this.state.cartdata.items = this.cart.items;


          this.state.cartdata.total_product_discount_amount = dt.total_product_discount_amount;
          this.state.cartdata.net_payble_amount = dt.net_payble_amount;
          this.cart.net_payble_amount = dt.net_payble_amount;
        
        //  this.state.cartdata.apc_cash_used=dt.customer_discount_wallet_amount;
        this.state.cartdata.apc_cash_used=dt.apc_cash_used;
        
          //  this.state.cartdata.session_id=dt.session_id;
        //  this.child.cartcount = dt.cart_count;
       //   this.global.saveAppState(this.state);
          this.cart.gross_amount = dt.cart_amount;


      //    this.child.onUpdateCartCountFromParent({'cartcount':dt.cart_count});
          // this.cart.cart_amount= this.calculateTotalMRP(this.state.cartdata.items);
          // this.cart.gross_amount =this.calculateGrandTotal(this.state.cartdata.items);


        }
        else if (dt.status == 201) {
     //     this.child.onUpdateCartCountFromParent({'cartcount':dt.cart_count});
          // this.is_result_get=false;
          // this.searchresp=[];
        }




      },
      (error) => {


        console.log('RESPONSE FAILED'); console.log(error)
      }
    );


  }

  addToCartFn(productdata) {
 
    let state = this.global.getAppState();
    this.state = state;
    let cdata = { 'sessionid': '', 'user_id': '', 'product_id': '', 'product_qty': '' };


    cdata.sessionid = state.cartdata.session_id;
    cdata.user_id = state.user.id;
    cdata.product_id = productdata.product_id;
    cdata.product_qty = productdata.product_qty;


    // this.global.updateCart(cdata);

    let direct_enquiry: any = 0;
    if (this.state.vendor_id != 0) {
      direct_enquiry = 1;

    }

    //let data = "session_id=" + cdata.sessionid + "&user_id=" + cdata.user_id + "&product_id=" + cdata.product_id + "&product_qty=" + cdata.product_qty;

    let data: any;
    // if (this.state.is_logged_in) {

    //   data = "session_id=" + cdata.sessionid + "&user_id=" + this.state.user.id + "&direct_enquiry=" + direct_enquiry + "&vendor_id=" + this.state.vendor_id + "&product_id=" + cdata.product_id + "&product_qty=" + cdata.product_qty;
    // }
    // else if (!this.state.is_logged_in) {
    //   data = "session_id=" + cdata.sessionid + "&user_id=" + "&direct_enquiry=" + direct_enquiry + "&vendor_id=" + this.state.vendor_id + "&product_id=" + cdata.product_id + "&product_qty=" + cdata.product_qty;
    // }
    data = "user_id="+this.respdata.customer_id+"&order_id="+this.respdata.order_id + "&vendor_id="+this.state.user.id+"&direct_enquiry="+
    this.respdata.direct_enquiry+"&product_id=" + cdata.product_id + "&product_qty="+cdata.product_qty +"&product_mrp="+productdata.price;
     console.log(data);

     this.cartdata.is_modified_order=false;


    this.api.updateModifiedCart(data).subscribe(
      (response) => {



        var dt: any = response;
     //   console.log(dt);
        //    this.global.setToast('info',dt.message);

        if (dt.status == 200) {

          this.global.setToast('info', dt.message);
          this.state.cartdata.customer_discount_wallet_amount = dt.customer_discount_wallet_amount;
          this.state.cartdata.total_product_discount_amount = dt.total_product_discount_amount;
          this.state.cartdata.net_payble_amount = dt.net_payble_amount;
          this.cart.net_payble_amount = this.state.cartdata.net_payble_amount;
          this.state.minimum_order_amount=this.state.minimum_order_amount;
          this.state.cartdata.apc_cash_used=dt.customer_discount_wallet_amount;

          this.loadCartData();
          // let state:any=this._global.getAppState();
          // state.cartdata.customer_discount_wallet_amount=dt.customer_discount_wallet_amount;
      //    this.global.saveAppState(this.state);
       //   console.log(this.global.getAppState());
          //this.state.cartdata.
          //     this.addresses=dt.data;
          //this.router.navigate(['/cart-step-one']);

        }
        else if (dt.status == 201) {

          console.log('This is status--'+dt.status)
          // this.is_result_get=false;
          // this.searchresp=[];
        }




      },
      (error) => {


        console.log('RESPONSE FAILED'); console.log(error);

      }
    );

  }

  calculateTotalMRP(items) {

    let tot: any = 0.0;

    items.map(elem => {

      elem.totamt = (parseFloat(elem.product_qty) * parseFloat(elem.price)).toFixed(2);
    })
    items.map(elem => {

      tot = (parseFloat(tot) + parseFloat(elem.totamt)).toFixed(2);
    });

    this.state.cartdata.cart_amount = parseFloat(tot).toFixed(2);
    this.global.saveAppState(this.state);
    return tot;
  }

  calculateGrandTotal(items) {
    let tot: any = 0.0;
    items.map(elem => {

      tot = (parseFloat(tot) + parseFloat(elem.totamt)).toFixed(2);
    });
    this.state.cartdata.gross_amount = parseFloat(tot).toFixed(2);
    this.global.saveAppState(this.state);
    return tot;
  }

  onNext() {

    if (!this.state.is_logged_in) {

      // this.global.setToast('error','Please login or register to continue');
      this.router.navigate(['/login'], { queryParams: { redirecturl: '/prescription-upload' } });
    }
    else {

      let state: any = this.global.getAppState();

      //    this.state.cartdata=this.state.cartdata;
      //  this.global.saveAppState(this.state);
      if (state.minimum_order_amount != undefined && this.cart.net_payble_amount >= state.minimum_order_amount) {

       // this.router.navigate(['/cart-step-two']);
       this.router.navigate(['/prescription-upload']);

      }
      else if(state.minimum_order_amount == undefined){
        
        this.loadCartData();
        this.popup.onReceivePopupData({'type':'process','confirm_txt':'Please wait.. we are validating minimum order amount','primary_btn_txt':'','secondary_btn_txt':''});

        setTimeout(() => {
          this.popup.onReceivePopupData({ 'type': '' });
          this.onNext();
        }, 5000);
       

   //     this.onNext();
      }
      else {

         
        // this.err.iserr = true;
        // this.err.errtxt = 'Minimum order value should be Rs.' + this.state.minimum_order_amount;
        let errtxt:string='Minimum order value should be Rs.' + this.state.minimum_order_amount;
        this.popup.onReceivePopupData({'type':'error','sent_txt':errtxt,'primary_btn_txt':'','secondary_btn_txt':'Close'});

      }
    }
    //routerLink="/cart-step-two"
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



    //this.loadingBar.start();
    this.api.getCategoriesById(data).subscribe(
      (response) => {



        var dt: any = response;

        if (dt.status == 200) {

          this.respdata.categories_list = dt.data.categories_list;

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

  onClose() {

    this.err.iserr = false;

  }
  onPopupActionReceived(obj:any) {
  //  console.log(obj);
    if(obj.mode=='confirm'){

      if (obj.type == 0) {

        this.popup.onReceivePopupData({ 'type': '' });
       
      }
      else if (obj.type == 1) {

        this.popup.onReceivePopupData({ 'type': '' });
        this.popup.onReceivePopupData({'type':'process','confirm_txt':'We are processing your request','primary_btn_txt':'','secondary_btn_txt':''});
        this.onSubmitModifiedOrder();
      }
 
    }
    else if(obj.mode=='success'){
    
      if (obj.type == 0) {
        
       // /chemist-account/retailer-enquiry-detail?enquiryid=56332&replystatus=0&enquirytype=0
        
      }
      else if (obj.type == 1) {


        this.router.navigate(['/chemist-account/send-modified-quotation'],{queryParams:{enquiryid:this.respdata.redirect_enquiry_id,replystatus:0,enquirytype:0}})
        
      }
      
    }
    else if(obj.mode=='error'){
    
      if (obj.type == 0) {
      this.popup.onReceivePopupData({ 'type': '' }); 
       this.router.navigate(['/chemist-account/send-modified-quotation'],{queryParams:{enquiryid:this.respdata.redirect_enquiry_id,replystatus:0,enquirytype:0}})
      }
      else if (obj.type == 1) {

         
      }

    //console.log(event);
  }

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

// ngOnDestroy(){

//   this.state.cartdata.is_modified_order=0;
//   this.global.saveAppState(this.state);
// }
onModifyCart(event){

  this.loadCartData();
  console.log('arrived');
}

onToggleModifyPopup(){

  if(!this.cartdata.is_modified_order){
  
   

    this.cartdata.is_modified_order=true;
    setTimeout(() => {
      $(".style .input").on('click keypress',function(){
        $(this).parent(".style").addClass("inpActive");
                
        $(this).blur(function(){
          var getitemval=$(this).val();						
            if(getitemval==''){
              $(this).parent(".style").removeClass("inpActive");
            }
        
        });
        
      });

      
        if ($(".form_list .input").val() == '') {
        $(".form_list .style").removeClass("inpActive");
        }
        else {
        $(".form_list .style").addClass("inpActive");
        }
        

    }, 20);

  }
  else{

    this.cartdata.is_modified_order = false;
    
  }
}

updateModifyCart(type,cart){

  //this.modify.product_qty=qty;
  
  if (type == '+') {

    let qty = parseInt(this.modify.product_qty);
    qty = qty + 1;
    this.modify.product_qty=qty;
      // this.cartdata.map(elem => {

      //   if (elem.product_id == cart.product_id) {

      //     let qty = parseInt(elem.pro  duct_qty);
      //     qty = qty + 1;
      //     elem.product_qty = qty.toString();
      //     return elem;
      //   }

      // });

      // let prod = this.cartdata.filter(elem => {
      //   return elem.product_id == cart.product_id;
      // })

      // if (prod.length > 0) {

      //   this.addToCartFn(prod[0]);
      // }
      // else {

      //   this.global.setToast('error', 'Some error occured');
      // }


      // this.state.cartdata.items = this.cartdata;
      // this.global.saveAppState(this.state);
      //this.api.addToCartFn()

    }
    else if (type == '-') {

      let qty = parseInt(this.modify.product_qty);
      qty = qty -1;

      if(qty > 0){

        this.modify.product_qty=qty;

      }
      
      // this.cartdata.map(elem => {

      //   if (elem.product_id == cart.product_id) {

      //     let qty = parseInt(elem.product_qty);
      //     qty = qty - 1;
      //     if (qty > 0) {

      //       elem.product_qty = qty.toString();
      //     }

      //   }

      // });

      // let prod = this.cartdata.filter(elem => {
      //   return elem.product_id == cart.product_id;
      // })

      // if (prod.length > 0) {

      //   this.addToCartFn(prod[0]);
      // }
      // else {

      //   this.global.setToast('error', 'Some error occured');
      // }



    }

    // this.state.cartdata=this.cart;
    // this.state.cartdata.items = this.cartdata;
    // // this.state.cartdata.customer_discount_wallet=dt.customer_discount_wallet;
    // // this.state.cartdata.lead_plan_detail_id=dt.lead_plan_detail_id;
    // // this.state.cartdata.lead_plan_id=dt.lead_plan_id;
    // let s: any = this.global.getAppState();



    // //   s.cartdata.customer_discount_wallet_amount=s.cartdata.customer_discount_wallet_amount;
    // //   this.state.cartdata.customer_discount_wallet_amount=s.cartdata.customer_discount_wallet_amount;

    // this.cart.cart_amount = this.calculateTotalMRP(this.state.cartdata.items);
    // this.cart.gross_amount = this.calculateGrandTotal(this.state.cartdata.items);

    // this.global.saveAppState(this.state);

}

onConfirmModifyOrder(){
  
  console.log(this.modify);
  this.modify.session_id='';
  this.modify.price=this.modify.new_mrp;
  this.addToCartFn(this.modify);

}

onCheckIfConfirmModifyOrder(){
  this.popup.onReceivePopupData({'type':'confirm','confirm_txt':'Are you sure to modify this order','primary_btn_txt':'Confirm','secondary_btn_txt':'Close'});

}

onSubmitModifiedOrder(){

 
  let data;
    

  data = "user_id="+this.respdata.customer_id+"&vendor_id="+this.state.user.id+"&order_id="+this.respdata.order_id+"&lead_plan_detail_id="+this.state.cartdata.lead_plan_detail_id;
console.log(data);


this.api.modifyOrder(data).subscribe(
  (response) => {
    // alert('444');


    this.loadingBar.start();

    var dt: any = response;

    console.log(dt);
  //  this.child.cartCountEvent();

    if (dt.status == 200) {

      this.respdata.redirect_enquiry_id=dt.enquiryid;
      this.global.setToast('info', dt.message);

      this.popup.onReceivePopupData({ 'type': '' });
 
     // this.popup.onReceivePopupData({'type':'success','sent_txt':dt.message,'primary_btn_txt':'Send Quotation','secondary_btn_txt':''});
      this.popup.onReceivePopupData({'type':'success','sent_txt':dt.message,'primary_btn_txt':'Send Quotation','secondary_btn_txt':''});
  //    this.child.onUpdateCartCountFromParent({'cartcount':dt.cart_count});
      // this.cart.cart_amount= this.calculateTotalMRP(this.state.cartdata.items);
      // this.cart.gross_amount =this.calculateGrandTotal(this.state.cartdata.items);


    }
    else if (dt.status == 201) {
      this.respdata.redirect_enquiry_id=dt.enquiryid;
    //  this.popup.onReceivePopupData({'type':'error','sent_txt':dt.message,'primary_btn_txt':'','secondary_btn_txt':'Close'});
      this.popup.onReceivePopupData({'type':'error','sent_txt':dt.message,'primary_btn_txt':'','secondary_btn_txt':'Close'});
 //     this.child.onUpdateCartCountFromParent({'cartcount':dt.cart_count});
      // this.is_result_get=false;
      // this.searchresp=[];
    }
  this.loadingBar.stop();



  },
  (error) => {


    console.log('RESPONSE FAILED'); console.log(error)
  }
);

}
}
