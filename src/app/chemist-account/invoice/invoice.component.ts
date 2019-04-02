import { Component, OnInit,Output ,ViewChild} from '@angular/core';
import { AppGlobals } from '../../app.global';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { Router,ActivatedRoute } from '@angular/router';
import {ChemistAccountLeftPanelComponent} from '../chemist-account-left-panel/chemist-account-left-panel.component';
import { Api } from '../../api.service';
import { PopupComponent } from '../../popup/popup.component';

declare var $: any;

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {

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
  @ViewChild('child')
  private child: ChemistAccountLeftPanelComponent;
  @ViewChild('popupchild') popup: PopupComponent;
  @Output() nodataobj: any = { 'page': '', 'txt': '' };
  isnodatafound:boolean=false;
  invoicelist:any=[]
  constructor(public global: AppGlobals, private loadingBar: LoadingBarService, 
    private router: Router, private api: Api,private aroute:ActivatedRoute) { this.state = this.global.getAppState(); }

  ngOnInit() {
    setTimeout(() => {

      $('.list a').removeClass('active');
      $('#invoice').addClass('active');
      $("html, body").animate({ scrollTop: 0 }, "slow");
    }, 20);
 
   
    this.getInvoiceList();
  }

 

  getInvoiceList() {


    this.loadingBar.start();

   let data = "user_id=" + this.state.user.id ;
   // let data = "user_id=276" ;

    console.log(data);
    /// console.log(this.address);
    this.api.getInvoiceList(data).subscribe(
      (response) => {
     
        var dt: any = response;
        console.log(dt);
        //  this.enquires=enquiries;
        //this.global.setToast('info', dt.message);

        if (dt.status == 200) {

        this.invoicelist=dt.data;
        //  this.child.onUpdateWalletBalance(this.wallet.balance);
       //   this.global.setToast('info', dt.message);

        }
        else if (dt.status == 201) {
          this.isnodatafound = true;
          this.nodataobj.page = 'enquiry';
          this.nodataobj.txt = "No invoice found";
          this.nodataobj.img_url = this.global.noimgfound.no_order_found;
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

}
