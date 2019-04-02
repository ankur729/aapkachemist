import { Component, OnInit,ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { Api } from '../../api.service';
import { AppGlobals } from '../../app.global';
import { PopupComponent } from '../../popup/popup.component';
declare var $: any;


@Component({
  selector: 'app-buy-plan',
  templateUrl: './buy-plan.component.html',
  styleUrls: ['./buy-plan.component.css']
})
export class BuyPlanComponent implements OnInit {

  data: any = {
    'plans': { 'halfyearly_plan': [], 'monthly_plan': [], 'quaterly_plan': [], 'yearly_plan': [], 'selected_plan': [] }

    , 'type': ''
  };

  state: any;
  payu_model: any = {
    'CHECKSUMHASH': '',
    'ORDER_ID': '',
    'merchant_id': '',
    'payt_STATUS': '',
    'paramlist': {


      'amount': '', 'email': '', 'firstname': '', 'furl': '', 'key': '', 'phone': '', 'productinfo': '',
      'service_provider': '', 'surl': '', 'txnid': ''


    },
    'CHANNEL_ID': '',
    'CUST_ID': '',
    'INDUSTRY_TYPE_ID': '',
    'MID': '',
    'TXN_AMOUNT': '',
    'CALLBACK_URL': '',


  }

  payment: any = { 'status': undefined }
  is_pay_model_set: boolean = false;
  @ViewChild('popupchild') popup: PopupComponent;

  constructor(private api: Api, public global: AppGlobals, private loadingBar: LoadingBarService
    , private router: Router, private aroute: ActivatedRoute) { this.state = this.global.getAppState(); }

  ngOnInit() {
    this.payment.status = this.aroute.snapshot.queryParams["txn_status"];
    this.aroute.queryParams.subscribe(params => {

      this.data.type = this.aroute.snapshot.queryParams["type"];


      this.loadPlans();
      this.switchPlan(this.data.type);
    });

    setTimeout(() => {
      $('.list a').removeClass('active');
      $('#buyplan').addClass('active');
    }, 20);

    $("html, body").animate({ scrollTop: 0 }, "slow");

    if(this.payment.status!=undefined){

      this.callPopup();
    }

  }

  callPopup(){

    if(this.payment.status!=undefined && this.payment.status=='success'){

      this.popup.onReceivePopupData({'type':'success','sent_txt':'Transaction successfull','primary_btn_txt':'','secondary_btn_txt':'Close'});
    }
    else if(this.payment.status!=undefined && this.payment.status=='failure'){
      
      this.popup.onReceivePopupData({'type':'error','sent_txt':'Transaction Failed','primary_btn_txt':'','secondary_btn_txt':'Close'});

    }

  }

  loadPlans() {

    let data = "";

    this.api.getPlanListByTime(data).subscribe(
      (response) => {

        var dt: any = response;

        console.log(dt);

        if (dt.status == 200) {

          this.data.plans.yearly_plan = dt.plans.yearly_plan;
          this.data.plans.halfyearly_plan = dt.plans.halfyearly_plan;
          this.data.plans.quaterly_plan = dt.plans.quaterly_plan;
          this.data.plans.monthly_plan = dt.plans.monthly_plan;
          this.setAccordingToType(this.data.type);
          this.loadingBar.stop();


        }
        else if (dt.status == 201) {

          this.global.setToast('error', dt.message);

        }

      },
      (error) => {

        this.loadingBar.stop();
        //   this.spinnerService.hide();
        console.log('RESPONSE FAILED'); console.log(error)
      }
    );


  }

  setAccordingToType(type) {

    if (type == 'monthly') {

      this.data.plans.selected_plan = this.data.plans.monthly_plan;
      console.log('11');
      console.log(this.data.plans.selected_plan );
      $('.planWrapper-body').fadeIn(500);

    }
    else if (type == 'quaterly') {

      this.data.plans.selected_plan = this.data.plans.quaterly_plan;
      $('.planWrapper-body').fadeIn(500);

    }
    else if (type == 'halfyearly') {

      this.data.plans.selected_plan = this.data.plans.halfyearly_plan;
      $('.planWrapper-body').fadeIn(500);

    }
    else if (type == 'yearly') {

      this.data.plans.selected_plan = this.data.plans.yearly_plan;
      $('.planWrapper-body').fadeIn(500);

    }

  }

  switchPlan(type) {

    $('li').removeClass('active');
    $('.planWrapper-body').fadeOut(500);
    if (type == 'monthly') {
      $('#monthly').addClass('active');
      this.router.navigate(['/chemist-account/buy-plan'], { queryParams: { 'type': 'monthly' } });
    }
    else if (type == 'quaterly') {
      $('#quaterly').addClass('active');
      this.router.navigate(['/chemist-account/buy-plan'], { queryParams: { 'type': 'quaterly' } });
    }
    else if (type == 'halfyearly') {
      $('#halfyearly').addClass('active');
      this.router.navigate(['/chemist-account/buy-plan'], { queryParams: { 'type': 'halfyearly' } });
    }
    else if (type == 'yearly') {
      $('#yearly').addClass('active');
      this.router.navigate(['/chemist-account/buy-plan'], { queryParams: { 'type': 'yearly' } });
    }
  }

  onBuyNow(plan) {



    // let merchant_id = 'bqGooU97099444643138';
    // let callbackurl = this.global.paytmcallbackurl;

    // let data = "CUST_ID=" + this.state.user.id + "&INDUSTRY_TYPE_ID=Retail" + "&type_id=1" +
    //   "&CHANNEL_ID=WEB" + "&TXN_AMOUNT=" + plan.plan_amount + "&WEBSITE=WEBSTAGING" + "&CALLBACK_URL=" + callbackurl +

      

    let merchant_id = this.global.paytm.merchant_id;
    let callbackurl = this.global.paytm.CALLBACK_URL;



    let data = "CUST_ID=" + this.state.user.id +
      "&INDUSTRY_TYPE_ID=" + this.global.paytm.INDUSTRY_TYPE_ID +
      "&type_id=1" +
      "&CHANNEL_ID=" + this.global.paytm.CHANNEL_ID +
      "&TXN_AMOUNT=" + plan.plan_amount+
      "&WEBSITE=" + this.global.paytm.WEBSITE +
      "&CALLBACK_URL=" + this.global.paytm.CALLBACK_URL +
      "&wallet_type=" + this.global.paytm.wallet_type+
      "&app_type=&plan_id=" + plan.plan_id + "&buy_plan=1" + "&time_id=" + plan.plan_type;

    console.log(data);
    // let data ="CUST_ID="+this.state.user.id+"&FIRSTNAME="+this.state.user.first_name+"&type_id="+this.state.user.user_type_id+
    //           "&MOBILE_NO="+this.state.user.mobile_number+"&EMAIL="+this.state.user.email+"&app_type=&TXN_AMOUNT="+plan.plan_amount+
    //           "&plan_id="+plan.plan_id+"&buy_plan=1"+"&time_id="+plan.plan_type;

    this.api.generateChecksum(data).subscribe(
      (response) => {


        var dt: any = response;
        console.log(dt);
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


          this.payu_model.CHANNEL_ID = dt.data.paramlist.CHANNEL_ID;
          this.payu_model.CUST_ID = dt.data.paramlist.CUST_ID;
          //   this.payu_model.MOBILE_NO=dt.data.paramlist.amount;
          this.payu_model.INDUSTRY_TYPE_ID = dt.data.paramlist.INDUSTRY_TYPE_ID;
          this.payu_model.MID = dt.data.paramlist.MID;
          this.payu_model.ORDER_ID = dt.data.ORDER_ID;
          this.payu_model.TXN_AMOUNT = dt.data.paramlist.TXN_AMOUNT;
          this.payu_model.WEBSITE = dt.data.paramlist.WEBSITE;
          this.payu_model.CALLBACK_URL = dt.data.paramlist.CALLBACK_URL;
          this.payu_model.CHECKSUMHASH = dt.data.CHECKSUMHASH;
          console.log(this.payu_model);
          this.is_pay_model_set = true;

          //  this.payu_model.CHECKSUMHASH=dt.data.CHECKSUMHASH;
          //   this.payu_model.ORDER_ID=dt.data.ORDER_ID;
          //   this.payu_model.merchant_id=dt.data.ORDER_ID;
          //   this.payu_model.payt_STATUS=dt.data.ORDER_ID;
          //   this.payu_model.paramlist.CUST_ID=dt.data.paramlist.CUST_ID;
          //   this.payu_model.paramlist.EMAIL=dt.data.paramlist.EMAIL;
          //   this.payu_model.paramlist.FIRSTNAME=dt.data.paramlist.FIRSTNAME;
          //   this.payu_model.paramlist.MOBILE_NO=dt.data.paramlist.MOBILE_NO;
          //   this.payu_model.paramlist.ORDER_ID=dt.data.paramlist.ORDER_ID;
          //   this.payu_model.paramlist.TXN_AMOUNT=dt.data.paramlist.TXN_AMOUNT;
          //   this.payu_model.ORDER_ID=dt.data.ORDER_ID;
          //   this.payu_model.merchant_id=dt.data.merchant_id;
          //   this.payu_model.paramlist.amount=dt.data.paramlist.amount;
          //   this.payu_model.paramlist.email=dt.data.paramlist.email;
          //   this.payu_model.paramlist.firstname=dt.data.paramlist.firstname;
          //   this.payu_model.paramlist.furl=dt.data.paramlist.furl;
          //   this.payu_model.paramlist.key=dt.data.paramlist.key;
          //   this.payu_model.paramlist.phone=dt.data.paramlist.phone;
          //   this.payu_model.paramlist.productinfo=dt.data.paramlist.productinfo;
          //   this.payu_model.paramlist.service_provider=dt.data.paramlist.service_provider;
          //   this.payu_model.paramlist.surl=dt.data.paramlist.surl;
          //   this.payu_model.paramlist.txnid=dt.data.paramlist.txnid;
          //   this.payu_model.payt_STATUS=dt.data.payt_STATUS;
          //   this.is_pay_model_set=true;

          // console.log(this.payu_model);

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


    /// console.log(this.address);
    // this.api.generateChecksumPayu(data).subscribe(
    //   (response) => {


    //     var dt: any = response;

    //     // payu_model:any={
    //     //   'CHECKSUMHASH':'',
    //     //   'ORDER_ID':'',
    //     //   'merchant_id':'',
    //     //   'payt_STATUS':'',
    //     //   'paramlist':{

    //     //     'CUST_ID':'','EMAIL':'','FIRSTNAME':'','MOBILE_NO':'','ORDER_ID':'','TXN_AMOUNT':'',
    //     //     'amount':'','email':'','firstname':'','furl':'','key':'','phone':'','productinfo':'',
    //     //     'service_provider':'','surl':'','txnid':''


    //     //   }
    //     // }


    //    // payu_model:any={'CUST_ID':'','FIRSTNAME':'','MOBILE_NO':'','EMAIL':'','type_id':'','app_type':'','TXN_AMOUNT':''}

    //     //  this.enquires=enquiries;
    //    // this.global.setToast('info', dt.message);

    //     if (dt.status == 200) {


    //      this.payu_model.CHECKSUMHASH=dt.data.CHECKSUMHASH;
    //       this.payu_model.ORDER_ID=dt.data.ORDER_ID;
    //       this.payu_model.merchant_id=dt.data.ORDER_ID;
    //       this.payu_model.payt_STATUS=dt.data.ORDER_ID;
    //       this.payu_model.paramlist.CUST_ID=dt.data.paramlist.CUST_ID;
    //       this.payu_model.paramlist.EMAIL=dt.data.paramlist.EMAIL;
    //       this.payu_model.paramlist.FIRSTNAME=dt.data.paramlist.FIRSTNAME;
    //       this.payu_model.paramlist.MOBILE_NO=dt.data.paramlist.MOBILE_NO;
    //       this.payu_model.paramlist.ORDER_ID=dt.data.paramlist.ORDER_ID;
    //       this.payu_model.paramlist.TXN_AMOUNT=dt.data.paramlist.TXN_AMOUNT;
    //       this.payu_model.ORDER_ID=dt.data.ORDER_ID;
    //       this.payu_model.merchant_id=dt.data.merchant_id;
    //       this.payu_model.paramlist.amount=dt.data.paramlist.amount;
    //       this.payu_model.paramlist.email=dt.data.paramlist.email;
    //       this.payu_model.paramlist.firstname=dt.data.paramlist.firstname;
    //       this.payu_model.paramlist.furl=dt.data.paramlist.furl;
    //       this.payu_model.paramlist.key=dt.data.paramlist.key;
    //       this.payu_model.paramlist.phone=dt.data.paramlist.phone;
    //       this.payu_model.paramlist.productinfo=dt.data.paramlist.productinfo;
    //       this.payu_model.paramlist.service_provider=dt.data.paramlist.service_provider;
    //       this.payu_model.paramlist.surl=dt.data.paramlist.surl;
    //       this.payu_model.paramlist.txnid=dt.data.paramlist.txnid;
    //       this.payu_model.payt_STATUS=dt.data.payt_STATUS;
    //       this.is_pay_model_set=true;

    //       // console.log(this.payu_model);

    //   //     this.pay_model.FIRSTNAME=this.state.user.id;
    //   //    this.pay_model.CALLBACK_URL='https://www.aapkachemist.com/demo/'
    //   //     this.pay_model.MID=dt.data.merchant_id;
    //   //     this.pay_model.CHANNEL_ID='WEB';
    //   //     this.pay_model.INDUSTRY_TYPE_ID='Retail';
    //   //  //   this.pay_model.MOBILE_NO='9911881560';
    //   //     this.pay_model.ORDER_ID=dt.data.ORDER_ID;
    //   //     this.pay_model.TXN_AMOUNT=this.wallet.added_amt;
    //   //     this.pay_model.WEBSITE='WEBSTAGING';
    //   //     this.wallet.is_pay_model_set=true;

    //     }
    //     else if (dt.status == 201) {

    //       // this.is_result_get=false;
    //       // this.searchresp=[];
    //     }

    //     this.loadingBar.stop();



    //   },
    //   (error) => {

    //     this.loadingBar.stop();
    //     console.log('RESPONSE FAILED'); console.log(error)
    //   }
    // );
  }

  onClosePaymentPopup() {

    this.payment.status = undefined;
    // this.router.navigate(['/chemist-account/my-wallet']);
  }
  onPopupActionReceived(obj:any) {
    //  console.log(obj);
      if(obj.mode=='error'){
  
        if (obj.type == 0) {
  
          this.popup.onReceivePopupData({ 'type': '' });
      
    
        }
        else if (obj.type == 1) {
  
          this.popup.onReceivePopupData({ 'type': '' });
          this.router.navigate(['/chemist-account/buy-plan'],{queryParams:{'type':'monthly'}});
         // this.status.is_order_confirmed=1;
          //this.onSubmitEnquiry();
          //on primary btn clicked...
    
        }
   
      }
      else if(obj.mode=='success'){
      
        if (obj.type == 0) {
  
          //Go To Order
         
          this.popup.onReceivePopupData({ 'type': '' });
          this.router.navigate(['/chemist-account/buy-plan'],{queryParams:{'type':'monthly'}});
        //  this.onRedirect('my-enquiries');
        }
        else if (obj.type == 1) {
  
        //  this.onRedirect('home')
          //on primary btn clicked...
    
        }
      }
   
  
      //console.log(event);
    }


}
