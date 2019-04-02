import { Component, OnInit ,ViewChild} from '@angular/core';
import { HeaderComponent } from '../../incl/header/header.component';
import { Api } from '../../api.service';
import { AppGlobals } from '../../app.global';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { Router } from '@angular/router';
import { PopupComponent } from '../../popup/popup.component';
declare var $: any;


@Component({
  selector: 'app-prescription-upload',
  templateUrl: './prescription-upload.component.html',
  styleUrls: ['./prescription-upload.component.css']
})
export class PrescriptionUploadComponent implements OnInit {
  
  state:any;


  prescription_arr=[];
  @ViewChild('child')
  private child: HeaderComponent;
  constructor(private api: Api, public global: AppGlobals, private loadingBar: LoadingBarService, private router: Router) { this.state = this.global.getAppState(); }

  ngOnInit() {

    if (this.state.cartdata.cartcount == 0) {
      this.router.navigate(['/home']);
    }
    else {

    this.prescription_arr=this.state.cartdata.prescription_arr;
    this.loadCartData();
    }

    setTimeout(() => {
      $("html, body").animate({ scrollTop: 0 }, "slow");
    }, 20);
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
    let data;
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
            this.child.cartcount = dt.data.length;


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
  onChangeImage(fileInput: any) {

  
 
   

      if (fileInput.target.files && fileInput.target.files[0]) {
        var reader = new FileReader();
  
        reader.onload = function (e: any) {
        //  $('#docimg').attr('src', e.target.result);
        }
        
     //   this.detail.img_file = fileInput.target.files[0];
    //    this.detail.filename=fileInput.target.files[0].name;
        
         this.uploadImage(fileInput.target.files[0]);
        reader.readAsDataURL(fileInput.target.files[0]);
      }

  

    

  }


  uploadImage(file){
    // this.step=
     
    let url=this.global.baseAppUrl+this.global.apiUrl;
 
    var  formData= new FormData();
    // formData.set('prescription_file', this.state.user.id);
    // formData.set('user_type_id', this.state.user.user_type_id);
    formData.set('prescription_file', file);
 
    
    //formData.append('document_file',  this.details.document_file);
   

     //let data="user_id="+this.state.user.id+"&user_type_id="+this.state.user.user_type_id+"&document_id="+this.details.document_id+
        //     "&document_number="+this.details.document_number+"&expiry_date="+expirydate+"&document_file="+this.details.document_file;
    this.loadingBar.start();
 
    $.ajax({
      type:'POST',
      url: url+'orders/saveprescriptionimg',
      data:formData,
      cache:false,
      contentType: false,
      processData: false,
      success:(data)=>{
        
     
         let prescription_obj:any={'prescription_file':'','file_Path':''};
         prescription_obj.prescription_file=data.prescription_file;
         prescription_obj.file_Path=data.file_Path;
         
     
        if(this.prescription_arr.length<3){
         
          this.prescription_arr.push(prescription_obj);
        }
        else{
          this.global.setToast('error','Maximum 3 images can be uploaded');
        }
       //   this.detail.gallery_img=data.data.gallery_img;
          
        //   console.log(this.details);
        //   this.global.setToast('info',data.message);
        //  this.dlistarr=data.data.document_data;
        //  let details:any={'user_id':'','user_type_id':'','document_id':'0','document_number':'','expiry_month':'','expiry_year':'','document_file':'','filename':''}
        //  this.details=details;
         this.loadingBar.stop();
      },
      error: function(data){
          console.log("error");
          console.log(data);
      }
  });

 
   }

   onRemoveImage(image){
     
 
    let data="prescription_file="+image.prescription_file;
  
    this.loadingBar.start();
    this.api.removePrescriptionImg(data).subscribe(
      (response) => {
    

        var dt: any = response;
        
  

        if (dt.status == 200) {

      let idx=    this.prescription_arr.findIndex(elem=>{return elem.prescription_file==image.prescription_file})
  
      this.prescription_arr.splice(idx, 1);
     
          // console.log(dt.data.social_data.facebook_url);
          
      //    this.detail.gallery_img=dt.data.gallery_img;



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

   onNext(){

    this.state.cartdata.prescription_arr=this.prescription_arr;
    this.global.saveAppState(this.state);
    this.router.navigate(['/cart-step-two']);
   }
}
