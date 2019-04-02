import { Component, OnInit,ViewChild ,Output} from '@angular/core';
import { AppGlobals } from '../../app.global';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { Router,ActivatedRoute } from '@angular/router';
import { Api } from '../../api.service';
import { PopupComponent } from '../../popup/popup.component';

declare var $: any;

@Component({
  selector: 'app-my-wallet',
  templateUrl: './my-wallet.component.html',
  styleUrls: ['./my-wallet.component.css']
})
export class MyWalletComponent implements OnInit {

  state: any;
  wallet: any = { 'added_amt': '','lists':[],'balance':'0.0','is_pay_model_set':false }
  pay_model:any={'CHANNEL_ID':'','CUST_ID':'','MOBILE_NO':'','INDUSTRY_TYPE_ID':'','MID':'','ORDER_ID':'',
  'TXN_AMOUNT':'','WEBSITE':'','CALLBACK_URL':'','CHECKSUMHASH':''}
  payu_model:any={
    'CHECKSUMHASH':'',
    'ORDER_ID':'',
    'merchant_id':'',
    'payt_STATUS':'',
    'paramlist':{

      
      'amount':'','email':'','firstname':'','furl':'','key':'','phone':'','productinfo':'',
      'service_provider':'','surl':'','txnid':''


    }
  }
// payu_model:any={'CUST_ID':'','FIRSTNAME':'','MOBILE_NO':'','EMAIL':'','type_id':'','app_type':'','TXN_AMOUNT':''}

  ispopup: boolean = false;
  payment:any={'status':undefined}
  isnodatafound: boolean = false;

  @ViewChild('popupchild') popup: PopupComponent;
  @Output() nodataobj: any = { 'page': '', 'txt': '' };
  constructor(public global: AppGlobals, private loadingBar: LoadingBarService, 
    private router: Router, private api: Api,private aroute:ActivatedRoute) { this.state = this.global.getAppState(); }

  ngOnInit() {
    setTimeout(() => {
      $('.list a').removeClass('active');
      $('#mywallet').addClass('active');
      $("html, body").animate({ scrollTop: 0 }, "slow");
    }, 20);
    this.payment.status=this.aroute.snapshot.queryParams["txn_status"];
    if(this.payment.status!=undefined){

      this.callPopup();
    }

    this.getWalletList();
  }

  callPopup(){

    if(this.payment.status!=undefined && this.payment.status=='success'){

      this.popup.onReceivePopupData({'type':'success','sent_txt':'Transaction successfull','primary_btn_txt':'','secondary_btn_txt':'Close'});
    }
    else if(this.payment.status!=undefined && this.payment.status=='failure'){
      
      this.popup.onReceivePopupData({'type':'error','sent_txt':'Transaction Failed','primary_btn_txt':'','secondary_btn_txt':'Close'});

    }

  }
  getWalletList() {


    this.loadingBar.start();

    let data = "user_id=" + this.state.user.id ;
    
    /// console.log(this.address);
    this.api.getWalletNormalListByUserid(data).subscribe(
      (response) => {
      
        var dt: any = response;
        console.log(dt);
        //  this.enquires=enquiries;
        this.global.setToast('info', dt.message);

        if (dt.status == 200) {

          this.wallet.lists=dt.data;
          this.wallet.balance=dt.balance;
          this.global.setToast('info', dt.message);
          if(this.wallet.lists.length==0){
            this.isnodatafound = true;
            this.nodataobj.page = 'enquiry';
            this.nodataobj.txt = "No Transction Found in your Wallet";
             this.nodataobj.img_url = this.global.noimgfound.no_wallet_found;
            
          }


        }
        else if (dt.status == 201) {

          // this.is_result_get=false;
          // this.searchresp=[];
        }

        this.loadingBar.stop();



      },
      (error) => {

        this.loadingBar.stop();
        console.log('RESPONSE FAILED'); console.log(error)
      }
    );

  }
  togglePopup() {

    if (this.ispopup) {

      $(".my_accountPages .AddMoneyPopup").fadeOut();
    }
    else if (!this.ispopup) {

      $(".style .input").on('click keypress',function(){
        $(this).parent(".style").addClass("inpActive");
                
        $(this).blur(function(){
          var getitemval=$(this).val();						
            if(getitemval==''){
              $(this).parent(".style").removeClass("inpActive");
            }
        
        });
        
      });

      $(".my_accountPages .AddMoneyPopup").fadeIn();

    }

    this.ispopup = !this.ispopup;


  }

  onAddingMoneyHandler() {

    //this.gernerateCheckSumPayu();

    if (this.wallet.added_amt.length == 0) {

      this.global.setToast('error', 'Amount is required');
    }
    else {
      this.gernerateCheckSum();
  }
  
    // if (this.wallet.added_amt.length == 0) {

    //   this.global.setToast('error', 'Amount is required');
    // }
    // else {
    //   this.loadingBar.start();
    //   console.log(this.wallet);
    //   let data = "user_id=" + this.state.user.id + "&amount=" + this.wallet.added_amt;
    //   console.log(data);
    //   /// console.log(this.address);
    //   this.api.addMoneyToWallet(data).subscribe(
    //     (response) => {
    //       console.log('IN SEO');
    //       console.log(response);


    //       var dt: any = response;

    //       //  this.enquires=enquiries;
    //       this.global.setToast('info', dt.message);

    //       if (dt.status == 200) {


    //         this.wallet.added_amt='';
    //         this.togglePopup();
    //         this.getWalletList();
    //         this.global.setToast('info', dt.message);

    //       }
    //       else if (dt.status == 201) {

    //         // this.is_result_get=false;
    //         // this.searchresp=[];
    //       }

    //       this.loadingBar.stop();



    //     },
    //     (error) => {

    //       this.loadingBar.stop();
    //       console.log('RESPONSE FAILED'); console.log(error)
    //     }
    //   );
    // }

  }

  gernerateCheckSumPayu(){

    
    let data ="CUST_ID="+this.state.user.id+"&FIRSTNAME="+this.state.user.first_name+"&type_id="+this.state.user.user_type_id+
              "&MOBILE_NO="+this.state.user.mobile_number+"&EMAIL="+this.state.user.email+"&app_type=&TXN_AMOUNT="+this.wallet.added_amt+"&wallet_type=1";

    /// console.log(this.address);
    this.api.generateChecksumPayu(data).subscribe(
      (response) => {
        
        var dt: any = response;

        // payu_model:any={
        //   'CHECKSUMHASH':'',
        //   'ORDER_ID':'',
        //   'merchant_id':'',
        //   'payt_STATUS':'',
        //   'paramlist':{
      
        //     'CUST_ID':'','EMAIL':'','FIRSTNAME':'','MOBILE_NO':'','ORDER_ID':'','TXN_AMOUNT':'',
        //     'amount':'','email':'','firstname':'','furl':'','key':'','phone':'','productinfo':'',
        //     'service_provider':'','surl':'','txnid':''
      
      
        //   }
        // }


       // payu_model:any={'CUST_ID':'','FIRSTNAME':'','MOBILE_NO':'','EMAIL':'','type_id':'','app_type':'','TXN_AMOUNT':''}

        //  this.enquires=enquiries;
       // this.global.setToast('info', dt.message);

        if (dt.status == 200) {

         
          this.payu_model.CHECKSUMHASH=dt.data.CHECKSUMHASH;
          // this.payu_model.ORDER_ID=dt.data.ORDER_ID;
          // this.payu_model.merchant_id=dt.data.ORDER_ID;
          // this.payu_model.payt_STATUS=dt.data.ORDER_ID;
          // this.payu_model.paramlist.CUST_ID=dt.data.paramlist.CUST_ID;
          // this.payu_model.paramlist.EMAIL=dt.data.paramlist.EMAIL;
          // this.payu_model.paramlist.FIRSTNAME=dt.data.paramlist.FIRSTNAME;
          // this.payu_model.paramlist.MOBILE_NO=dt.data.paramlist.MOBILE_NO;
          // this.payu_model.paramlist.ORDER_ID=dt.data.paramlist.ORDER_ID;
          // this.payu_model.paramlist.TXN_AMOUNT=dt.data.paramlist.TXN_AMOUNT;
          this.payu_model.ORDER_ID=dt.data.ORDER_ID;
          this.payu_model.merchant_id=dt.data.merchant_id;
          this.payu_model.paramlist.amount=dt.data.paramlist.amount;
          this.payu_model.paramlist.email=dt.data.paramlist.email;
          this.payu_model.paramlist.firstname=dt.data.paramlist.firstname;
          this.payu_model.paramlist.furl=dt.data.paramlist.furl;
          this.payu_model.paramlist.key=dt.data.paramlist.key;
          this.payu_model.paramlist.phone=dt.data.paramlist.phone;
          this.payu_model.paramlist.productinfo=dt.data.paramlist.productinfo;
          this.payu_model.paramlist.service_provider=dt.data.paramlist.service_provider;
          this.payu_model.paramlist.surl=dt.data.paramlist.surl;
          this.payu_model.paramlist.txnid=dt.data.paramlist.txnid;
          this.payu_model.payt_STATUS=dt.data.payt_STATUS;
          this.wallet.is_pay_model_set=true;

        
      //     this.pay_model.FIRSTNAME=this.state.user.id;
      //    this.pay_model.CALLBACK_URL='https://www.aapkachemist.com/demo/'
      //     this.pay_model.MID=dt.data.merchant_id;
      //     this.pay_model.CHANNEL_ID='WEB';
      //     this.pay_model.INDUSTRY_TYPE_ID='Retail';
      //  //   this.pay_model.MOBILE_NO='9911881560';
      //     this.pay_model.ORDER_ID=dt.data.ORDER_ID;
      //     this.pay_model.TXN_AMOUNT=this.wallet.added_amt;
      //     this.pay_model.WEBSITE='WEBSTAGING';
      //     this.wallet.is_pay_model_set=true;

        }
        else if (dt.status == 201) {

          // this.is_result_get=false;
          // this.searchresp=[];
        }

        this.loadingBar.stop();



      },
      (error) => {

        this.loadingBar.stop();
        console.log('RESPONSE FAILED'); console.log(error)
      }
    );
  }
  gernerateCheckSum(){
  //   readonly paytm:any={
  //     'INDUSTRY_TYPE_ID':'Retail ',
  //     'CHANNEL_ID':'WEB',
  //     'WEBSITE':'DEFAULT',
  //     'CALLBACK_URL':this.paytmcallbackurl,
  //     'wallet_type':'1',
  
  // }
    let merchant_id=this.global.paytm.merchant_id;
    let callbackurl=this.global.paytm.CALLBACK_URL;
    
    let data ="CUST_ID="+this.state.user.id+
            "&INDUSTRY_TYPE_ID="+this.global.paytm.INDUSTRY_TYPE_ID+
            "&type_id=1"+
            "&CHANNEL_ID="+this.global.paytm.CHANNEL_ID+
            "&TXN_AMOUNT="+this.wallet.added_amt+
            "&WEBSITE="+this.global.paytm.WEBSITE+
            "&CALLBACK_URL="+this.global.paytm.CALLBACK_URL+
            "&wallet_type="+this.global.paytm.wallet_type;


    console.log(data);
    /// console.log(this.address);
    this.api.generateChecksum(data).subscribe(
      (response) => {
        console.log('IN SEO');
        console.log(response);


        var dt: any = response;
        console.log(dt);
        //  this.enquires=enquiries;
       // this.global.setToast('info', dt.message);

        if (dt.status == 200) {
    
          this.payu_model.CHANNEL_ID=dt.data.paramlist.CHANNEL_ID;
          this.payu_model.CUST_ID=dt.data.paramlist.CUST_ID;
       //   this.payu_model.MOBILE_NO=dt.data.paramlist.amount;
          this.payu_model.INDUSTRY_TYPE_ID=dt.data.paramlist.INDUSTRY_TYPE_ID;
          this.payu_model.MID=dt.data.paramlist.MID;
          this.payu_model.ORDER_ID=dt.data.ORDER_ID;
          this.payu_model.TXN_AMOUNT=dt.data.paramlist.TXN_AMOUNT;
          this.payu_model.WEBSITE=dt.data.paramlist.WEBSITE;
          this.payu_model.CALLBACK_URL=dt.data.paramlist.CALLBACK_URL;
          this.payu_model.CHECKSUMHASH=dt.data.CHECKSUMHASH;
         this.wallet.is_pay_model_set=true;
      //     this.payu_model.CHECKSUMHASH=dt.data.CHECKSUMHASH;
      //    this.payu_model.CALLBACK_URL=callbackurl;
      //     this.payu_model.CUST_ID=this.state.user.id;
      // //    this.pay_model.CALLBACK_URL='https://www.aapkachemist.com/demo/'
      //     this.payu_model.MID=dt.data.merchant_id;
      //     this.payu_model.CHANNEL_ID='WEB';
      //     this.payu_model.INDUSTRY_TYPE_ID='Retail';
      //  //   this.pay_model.MOBILE_NO='9911881560';
      //     this.payu_model.ORDER_ID=dt.data.ORDER_ID;
      //     this.payu_model.TXN_AMOUNT=this.wallet.added_amt;
      //     this.payu_model.WEBSITE='WEBSTAGING';
      //    this.wallet.is_pay_model_set=true;

        }
        else if (dt.status == 201) {

          // this.is_result_get=false;
          // this.searchresp=[];
        }

        this.loadingBar.stop();



      },
      (error) => {

        this.loadingBar.stop();
        console.log('RESPONSE FAILED'); console.log(error)
      }
    );
  }
  onClosePaymentPopup(){

    this.payment.status=undefined;
    this.router.navigate(['/my-account/wallet']);
  }

  paymentgateway(){

    // this.payu.key=this.global.payu_key;
    // this.payu.salt = this.global.payu_salt;
    // this.payu.txnid = Math.floor(Date.now() / 1000).toString();
    // this.payu.amount = this.state.cartdata.payble_amt;
    // this.payu.productinfo = 'test';
    // this.payu.firstname = 'textbox';
    // this.payu.email =this.state.user.email;
  
    // this.payu.surl =  this.global.payu_surl_monthly;
    // this.payu.furl = this.global.payu_furl_monthly;
  
    // this.payu.phone = this.state.user.mobile;
    // this.payu.service_provider = this.global.payu_service_provider;
  
    // var h_string = this.payu.key + '|' + this.payu.txnid + '|' +this.payu.amount + '|' + this.payu.productinfo + '|' + this.payu.firstname + '|' + this.payu.email + '|||||||||||' + this.payu.salt;
    // var has_final_string =SHA512.hash(h_string); 
    // this.payu.hash = has_final_string;
    
    // this.state.cartdata.payu=this.payu;
  }

  onPopupActionReceived(obj:any) {
    console.log(obj);
    if(obj.mode=='error'){

      if (obj.type == 0) {

        this.popup.onReceivePopupData({ 'type': '' });
        this.router.navigate(['/my-account/wallet']);
  
      }
      else if (obj.type == 1) {

     
        //on primary btn clicked...
  
      }
 
    }
    else if(obj.mode=='success'){
    
      if (obj.type == 0) {
        
        this.popup.onReceivePopupData({ 'type': '' });
        this.router.navigate(['/my-account/wallet']);
        //Go To Order
      //  this.onRedirect('home')
        
      }
      else if (obj.type == 1) {

     //   this.popup.onReceivePopupData({ 'type': '' });
      //  this.onRedirect('my-enquiries');
        //on primary btn clicked...
  
      }
    }
 

    //console.log(event);
  }


}
