import { Component, OnInit ,ViewChild} from '@angular/core';
import { Router, ActivatedRoute  } from '@angular/router';
import { LoadingBarService } from '@ngx-loading-bar/core';
import {Api} from '../../api.service';
import {AppGlobals} from '../../app.global';
import { PopupComponent } from '../../popup/popup.component';

declare var classie:any;
declare var $:any;
declare var FgGallery:any;

@Component({
  selector: 'app-retailer-order-tracking',
  templateUrl: './retailer-order-tracking.component.html',
  styleUrls: ['./retailer-order-tracking.component.css']
})
export class RetailerOrderTrackingComponent implements OnInit {
  state:any;
  respdata:any={

    'order_data':{'app_confirm_flag':'','delivery_charge':'','delivery_date':'','delivery_time':'','delivery_confirmation':'',
                  'grand_total':'','order_date':'','order_id':'','order_no':'','order_status':'','sub_total':'','apc_cash_used':'',
                  'total_discount':'','total_tax':'','vendor_name':'','enquiry_original_grand_total':'','difference_amount':'','total_vendor_cashback_recieved':'',
                'customer_name':'','customer_mobile_number':'','customer_address':'','customer_area':'','net_payble_amount':'','total_vendor_discount':'','vendor_grand_total':'','vendor_cashback_amount':'','total_apc_discount_amount':'',
                'prescription_status':'0','customer_id':'','vendor_billing_amount':'','invoice_file':'','modify_access':'','enquiry_id':'','direct_enquiry':'',
                'prescription_arr':[]},
    'product_data':[],
    'address':{'address':'','address_id':'','address_type':'','city':'','default_address':'','flat_no':'',
              'full_name':'','landmark':'','mobile':'','pincode':'','state':''},
    'is_confirm_delivery':false

  }
  ordertxt:any={

    
    'delivered':'Are you sure to change status [Dispatch] for order no: #',
 
    
  }

  @ViewChild('popupchild') popup: PopupComponent;

  constructor(private api:Api,private loadingBar: LoadingBarService,public global:AppGlobals,private router:Router,private aroute:ActivatedRoute) { this.state=this.global.getAppState();}

  ngOnInit() {

    setTimeout(() => {
      $('.list a').removeClass('active');
        $('#retailerorders').addClass('active');
      }, 20);
    let orderid=this.aroute.snapshot.queryParams["id"];
    this.getOrderDetailById(orderid);
  }
  getOrderDetailById(orderid){

   
    this.loadingBar.start();
    let data="user_id="+this.state.user.id+"&order_id="+orderid+"&entry_type=Order"+"&list_type=1";
  console.log(data);

    this.api.getOrderOrEnquiryDetail(data).subscribe(
      (response)=>
          { 
           
           
            
            
             var dt:any=response;
             console.log(dt);
             if(dt.status=="200"){
              
              this.setParams(dt);
              this.callJS();
              }
             
 
             else if (dt.status=="201"){
              
             //   history.go(-1);
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

      setParams(dt){

        this.respdata.order_data.app_confirm_flag=dt.order_data.app_confirm_flag;
        this.respdata.order_data.delivery_charge=dt.order_data.delivery_charge;
        this.respdata.order_data.delivery_date=dt.order_data.delivery_date;
        this.respdata.order_data.delivery_time=dt.order_data.delivery_time;
        this.respdata.order_data.grand_total=dt.order_data.grand_total;
        this.respdata.order_data.order_date=dt.order_data.order_date;
        this.respdata.order_data.order_id=dt.order_data.order_id;
        this.respdata.order_data.order_no=dt.order_data.order_no;
        this.respdata.order_data.order_status=dt.order_data.order_status;
        this.respdata.order_data.sub_total=dt.order_data.sub_total;
        this.respdata.order_data.total_discount=dt.order_data.total_discount;
        this.respdata.order_data.total_tax=dt.order_data.total_tax;
        this.respdata.order_data.vendor_name=dt.order_data.vendor_name;
        this.respdata.order_data.enquiry_original_grand_total=dt.order_data.enquiry_original_grand_total;
        this.respdata.order_data.customer_name=dt.order_data.customer_name;
        this.respdata.order_data.customer_mobile_number=dt.order_data.customer_mobile_number;
        this.respdata.order_data.customer_address=dt.order_data.customer_address;
        this.respdata.order_data.customer_area=dt.order_data.customer_area;
        this.respdata.order_data.net_payble_amount=dt.order_data.net_payble_amount;
        this.respdata.order_data.total_vendor_discount=dt.order_data.total_vendor_discount;
        this.respdata.order_data.vendor_grand_total=dt.order_data.vendor_grand_total;
        this.respdata.order_data.total_apc_discount_amount=dt.order_data.total_apc_discount_amount;
        this.respdata.order_data.vendor_cashback_amount=dt.order_data.vendor_cashback_amount;
        this.respdata.order_data.difference_amount=dt.order_data.difference_amount;
        this.respdata.order_data.total_vendor_cashback_recieved=dt.order_data.total_vendor_cashback_recieved;
        this.respdata.order_data.apc_cash_used=dt.order_data.apc_cash_used;
        this.respdata.order_data.delivery_confirmation=dt.order_data.delivery_confirmation;
        this.respdata.order_data.prescription_status=dt.order_data.prescription_status;
        this.respdata.order_data.customer_id=dt.order_data.customer_id;
        this.respdata.order_data.vendor_billing_amount=dt.order_data.vendor_billing_amount;
        this.respdata.order_data.invoice_file=dt.order_data.invoice_file;
        this.respdata.order_data.modify_access=dt.order_data.modify_access;
        this.respdata.order_data.enquiry_id=dt.order_data.enquiry_id;
        this.respdata.order_data.direct_enquiry=dt.order_data.direct_enquiry;

        
      
      
        this.respdata.order_data.direct_enquiry=dt.order_data.direct_enquiry;
        
        
        this.respdata.product_data=dt.product_data;
        
        this.respdata.address.address=dt.address_data.address;
        this.respdata.address.address_id=dt.address_data.address_id;
        this.respdata.address.address_type=dt.address_data.address_type;
        this.respdata.address.city=dt.address_data.city;
        this.respdata.address.default_address=dt.address_data.default_address;
        this.respdata.address.full_name=dt.address_data.full_name;
        this.respdata.address.landmark=dt.address_data.landmark;
        this.respdata.address.mobile=dt.address_data.mobile;
        this.respdata.address.pincode=dt.address_data.pincode;
        this.respdata.address.state=dt.address_data.state;
      
         
      }

      callJS(){

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
      onConfirmDelivery(order){

        console.log(order);
        console.log(this.respdata.is_confirm_delivery);
        if(this.respdata.is_confirm_delivery){
    
          this.respdata.is_confirm_delivery=!this.respdata.is_confirm_delivery;
    
        }
        else{
          this.respdata.selected_order_id= this.respdata.order_data.order_id;
          this.respdata.is_confirm_delivery=true;
         // this.loadInputJS();
        }
        
      }

      onConfirmOTP(){
 
        this.respdata.is_confirm_delivery=false;
        
         this.popup.onReceivePopupData({'type':'process','confirm_txt':'Please wait..we are validating Delivery PIN','primary_btn_txt':'','secondary_btn_txt':''});
      //  this.confirm_pin.is_sent=true;
       // this.confirm_pin.is_process=false;
     //   this.confirm_pin.is_error=true;
        let selectedorder=this.respdata.product_data.filter(elem=>{return elem.order_id ==  this.respdata.order_data.order_id});
        let orderid=selectedorder[0].order_id;
          let customer_id=this.respdata.order_data.customer_id;
        let delivery_pin=$('#confirm_otp').val();
         let data = "order_id=" + orderid + "&delivery_pin="+delivery_pin + "&vendor_id="+this.state.user.id+"&customer_id="+customer_id;
        console.log(data);
        this.loadingBar.start();
        this.api.onConfirmDelivery(data).subscribe(
          (response) => {
           
            this.popup.onReceivePopupData({'type':''});
            let dt: any = response;
    
            this.loadingBar.stop();
    
    
            if (dt.status == 200) {
    
              this.popup.onReceivePopupData({'type':'success','sent_txt':'PIN Verified successfully','primary_btn_txt':'','secondary_btn_txt':'Close'});
             
    
            }
            else if (dt.status == 201) {
     
               this.popup.onReceivePopupData({'type':'error','sent_txt':dt.message,'primary_btn_txt':'','secondary_btn_txt':'Close'});          
            }
         
          },
          (error) => {
    
            this.loadingBar.stop();
            //   this.spinnerService.hide();
            console.log('RESPONSE FAILED'); console.log(error)
          }
        );
    
    
      }


      onPopupActionReceived(obj:any) {
        //  console.log(obj);
          if(obj.mode=='error'){
      
            if (obj.type == 0) {
      
              this.popup.onReceivePopupData({ 'type': '' });
             
            }
            else if (obj.type == 1) {
      
              this.popup.onReceivePopupData({ 'type': '' });
             // this.status.is_order_confirmed=1;
              //this.onSubmitEnquiry();
              //on primary btn clicked...
        
            }
       
          }
          else if(obj.mode=='confirm'){
          
            if (obj.type == 0) {
      
              //Go To Order
              this.popup.onReceivePopupData({ 'type': '' });
            //  this.onRedirect('my-enquiries');
            }
            else if (obj.type == 1) {

              this.updateOrderStatus('OS04');
            //  this.onRedirect('home')
              //on primary btn clicked...
        
            }
          }

          
          else if(obj.mode=='success'){
          
            if (obj.type == 0) {
      
              //Go To Order
              this.router.navigate(['/chemist-account/retailer-enquiry'],{queryParams:{'type':'delivered'}})
            //  this.onRedirect('my-enquiries');
            }
            else if (obj.type == 1) {

             this.router.navigate(['/chemist-account/retailer-enquiry'],{queryParams:{'type':'delivered'}})
            //  this.onRedirect('home')
              //on primary btn clicked...
        
            }
          }
         
          else if(obj.mode=='success2'){
          
            if (obj.type == 0) {
      
              //Go To Order
              this.router.navigate(['/chemist-account/retailer-enquiry'],{queryParams:{'type':'delivered'}})
            //  this.onRedirect('my-enquiries');
            }
            else if (obj.type == 1) {

            
            //  this.onRedirect('home')
              //on primary btn clicked...
        
            }
          }
      
          //console.log(event);
        }
      
        onUpdateOrderStatus(status){
          console.log(status);
         // let status:any=order.order_status;
      
        //   if(status == 'OS01'){
  
        //  //   this.updateOrderStatus(order,'OS02');
        //   }
        //   else  if(status == 'OS02'){
 
        //  //   this.updateOrderStatus(order,'OS03');
        //   }
        //   else  if(status == 'OS03'){
       
        //    // this.updateOrderStatus(order,'OS04');
      
        //   }
          // else  if(status == 'OS03'){
            
          // }
          if(status == 'OS04'){
            this.popup.onReceivePopupData({'type':'confirm','confirm_txt':this.ordertxt.delivered+" "+ this.respdata.order_data.order_no,'primary_btn_txt':'Confirm','secondary_btn_txt':'Close'});
          
            
          }
      
        }
      
        updateOrderStatus(status) {
      
          // /list_type=0 for sent and 1 for receive
          let data = "order_id=" + this.respdata.order_data.order_id + "&order_status="+status;
      
          console.log(data);
          this.loadingBar.start();
          this.api.updateOrderStatus(data).subscribe(
            (response) => {
              
      
              let dt: any = response;
      
              this.loadingBar.stop();
              this.popup.onReceivePopupData({ 'type': '' });
             
      
              if (dt.status == 200) {
                this.popup.onReceivePopupData({'type':'success2','sent_txt':'Status successfully updated','primary_btn_txt':'','secondary_btn_txt':'Close'});
                //    this.respdata.mapping_type_list=dt.data.mapping_type_list;
      
                
                
      
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

        onModifyOrder(){

         this.router.navigate(['/chemist-account/modify-order'],{queryParams:{'oid':this.respdata.order_data.order_id,'uid':this.respdata.order_data.customer_id,'eid':this.respdata.order_data.enquiry_id,'deq':this.respdata.order_data.direct_enquiry}})
        }

        getOrderPrescription(){

          let data = "order_id=" + this.respdata.order_data.order_id;
      
          console.log(data);
          this.loadingBar.start();
          this.api.getOrderPrescription(data).subscribe(
            (response) => {
              
      
              let dt: any = response;
              console.log(dt);
              this.loadingBar.stop();
           //   this.popup.onReceivePopupData({ 'type': '' });
             
      
              if (dt.status == 200) {
          //      this.popup.onReceivePopupData({'type':'success2','sent_txt':'Status successfully updated','primary_btn_txt':'','secondary_btn_txt':'Close'});
                //    this.respdata.mapping_type_list=dt.data.mapping_type_list;
                if(dt.data.prescription_file!=''){

                  let prescription_obj:any={'file':'','file_path':''};
                  prescription_obj.file=  dt.data.prescription_file;
                  prescription_obj.file_path=  dt.data.prescription_file_path;
                  
                    this.respdata.order_data.prescription_arr.push(prescription_obj);
                }
                if(dt.data.prescription_file2!=''){

                  let prescription_obj:any={'file':'','file_path':''};
                  prescription_obj.file=  dt.data.prescription_file2;
                  prescription_obj.file_path=  dt.data.prescription_file2_path;
                  
                    this.respdata.order_data.prescription_arr.push(prescription_obj);
                }
                if(dt.data.prescription_file3!=''){

                  let prescription_obj:any={'file':'','file_path':''};
                  prescription_obj.file=  dt.data.prescription_file3;
                  prescription_obj.file_path=  dt.data.prescription_file3_path;
                  
                    this.respdata.order_data.prescription_arr.push(prescription_obj);
                }
                
                if(this.respdata.order_data.prescription_arr.length<1){
                  this.popup.onReceivePopupData({'type':'error','sent_txt':'Unable to get prescription images','primary_btn_txt':'','secondary_btn_txt':'Close'});
                }
                else{
                  setTimeout(() => {
                    new FgGallery('.fg-gallery', {
                      cols: 1,
                      style: {
                      'width': '130px',
                      'border': '3px solid #e4e4e4',
                      'height': '120px',
                      'border-radius':'3px',
                      }
                      })
   
                   $('.gallery-items').trigger('click');
                    
                  }, 200);

                }
            
          
                console.log(this.respdata.order_data.prescription_arr);
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
