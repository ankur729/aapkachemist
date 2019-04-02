import { Component, OnInit ,Input} from '@angular/core';
declare var $:any;

@Component({
  selector: 'app-payumoney-gateway',
  templateUrl: './payumoney-gateway.component.html',
  styleUrls: ['./payumoney-gateway.component.css']
})
export class PayumoneyGatewayComponent implements OnInit {
  
  @Input() pay_model:any={
    'CHECKSUMHASH':'',
    'ORDER_ID':'',
    'merchant_id':'',
    'payt_STATUS':'',
    'paramlist':{

     
      'amount':'','email':'','firstname':'','furl':'','key':'','phone':'','productinfo':'',
      'service_provider':'','surl':'','txnid':''


    }
  }
  constructor() { }

  ngOnInit() {

 
    
    $('#mkey1').val(this.pay_model.merchant_id);
    $('#hash').val(this.pay_model.CHECKSUMHASH);
    $('#txnid').val(this.pay_model.paramlist.txnid);
    $('#amount').val(this.pay_model.paramlist.amount);
    $('#firstname').val(this.pay_model.paramlist.firstname);
    $('#email').val(this.pay_model.paramlist.email);
    $('#phone').val(this.pay_model.paramlist.phone);
    $('#productinfo').val(this.pay_model.paramlist.productinfo);
    $('#surl').val(this.pay_model.paramlist.surl);
    $('#furl').val(this.pay_model.paramlist.furl);
    $('#service_provider').val(this.pay_model.paramlist.service_provider);
  //   $('#payuForm').attr('action', "https://securegw-stage.paytm.in/theia/processTransaction");
  //   // $('#payuForm').attr('action', "https://securegw-stage.paytm.in/theia/processTransaction");
     
 //$('#payuForm').attr('action', "https://www.anitbrain.in/demo/admin/paytm/checkissue");
      $('#payuForm').submit();
  //    console.log($('#CHECKSUMHASH').val())
  }

}
