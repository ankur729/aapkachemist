import { Component, OnInit,Input } from '@angular/core';
declare var $:any;

@Component({
  selector: 'app-paytm-gateway',
  templateUrl: './paytm-gateway.component.html',
  styleUrls: ['./paytm-gateway.component.css']
})
export class PaytmGatewayComponent implements OnInit {

  @Input() pay_model:any={'CHANNEL_ID':'','CUST_ID':'','MOBILE_NO':'','INDUSTRY_TYPE_ID':'','MID':'','ORDER_ID':'',
                'TXN_AMOUNT':'','WEBSITE':'','CALLBACK_URL':'','CHECKSUMHASH':''}
  test:any={'ss':''}
  constructor() { }

  ngOnInit() {


   // alert(this.pay_model.CHECKSUMHASH);
    setTimeout(() => {

      
      $('#CHANNEL_ID').val(this.pay_model.CHANNEL_ID);
      $('#CUST_ID').val(this.pay_model.CUST_ID);
      $('#INDUSTRY_TYPE_ID').val(this.pay_model.INDUSTRY_TYPE_ID);
      $('#MID').val(this.pay_model.MID);
      $('#ORDER_ID').val(this.pay_model.ORDER_ID);
      $('#TXN_AMOUNT').val(this.pay_model.TXN_AMOUNT);
      $('#WEBSITE').val(this.pay_model.WEBSITE);
      $('#CALLBACK_URL').val(this.pay_model.CALLBACK_URL);
      $('#CHECKSUMHASH').val(this.pay_model.CHECKSUMHASH);
      
      $('#payuForm').attr('action', "https://securegw.paytm.in/theia/processTransaction");
    //  $('#payuForm').attr('action', "https://securegw-stage.paytm.in/theia/processTransaction");
      console.log(this.pay_model);
  //    $('#payuForm').attr('action', "https://www.aapkachemist.com/paytm/checkissue");
      $('#payuForm').submit();
    
     //  alert($('#CHECKSUMHASH').val())
    //  //alert($('#CHANNEL_ID').val());
    }, 200);
    
  }

}
