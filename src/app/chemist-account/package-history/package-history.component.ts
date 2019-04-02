import { Component, OnInit,Output,ViewChild } from '@angular/core';
import { AppGlobals } from '../../app.global';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { Router,ActivatedRoute } from '@angular/router';
import { Api } from '../../api.service';
import { PopupComponent } from '../../popup/popup.component';
declare var $:any;


@Component({
  selector: 'app-package-history',
  templateUrl: './package-history.component.html',
  styleUrls: ['./package-history.component.css']
})
export class PackageHistoryComponent implements OnInit {

  state: any;
  plan_history:any=[];

  isnodatafound: boolean = false;
  
  payment:any={'status':undefined}
  @Output() nodataobj: any = { 'page': '', 'txt': '' };

  @ViewChild('popupchild') popup: PopupComponent;

  constructor(public global: AppGlobals, private loadingBar: LoadingBarService,
     private router: Router, private api: Api,private aroute:ActivatedRoute) { this.state = this.global.getAppState(); }

  ngOnInit() {

    this.getPackageHistory();
    setTimeout(() => {
      $('.list a').removeClass('active');
      $('#packagehistory').addClass('active');
    }, 20);
    $("html, body").animate({ scrollTop: 0 }, "slow");

    this.payment.status=this.aroute.snapshot.queryParams["txn_status"];

    if(this.payment.status!=undefined){

      this.callPopup();
    }

   // alert(this.payment.status);

  }
  callPopup(){

    if(this.payment.status!=undefined && this.payment.status=='success'){

      this.popup.onReceivePopupData({'type':'success','sent_txt':'Transaction successfull','primary_btn_txt':'','secondary_btn_txt':'Close'});
    }
    else if(this.payment.status!=undefined && this.payment.status=='failure'){
      
      this.popup.onReceivePopupData({'type':'error','sent_txt':'Transaction Failed','primary_btn_txt':'','secondary_btn_txt':'Close'});

    }

  }
  getPackageHistory() {

    this.loadingBar.start();
    let data = "user_id=" + this.state.user.id;
 
    /// console.log(this.address);
    this.api.getPackageHistory(data).subscribe(
      (response) => {
     

        var dt: any = response;
        console.log(dt);
        
            if(dt.status==200){
              
              this.plan_history=dt.data.plan_history;
              if(this.plan_history.length==0){
                this.isnodatafound = true;
                this.nodataobj.page = 'enquiry';
                this.nodataobj.txt = "No package history found";
              }
              else{
                this.isnodatafound = false;
              }
        //    // this.addresses=dt.data;

        //     // this.is_result_get=true;
        //     // this.searchresp=dt.user_data;
        // //    this.address=this.addressinit;

        //      this.global.setToast('info',dt.message);

           }
            else if(dt.status==201){
              this.isnodatafound = true;
              this.nodataobj.page = 'enquiry';
              this.nodataobj.txt = "No package history found";
        //     // this.is_result_get=false;
        //     // this.searchresp=[];
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
 //   this.router.navigate(['/chemist-account/my-wallet']);
  }
  onPopupActionReceived(obj:any) {
    //  console.log(obj);
      if(obj.mode=='error'){
  
        if (obj.type == 0) {
  
          this.popup.onReceivePopupData({ 'type': '' });
      
          this.router.navigate(['/chemist-account/buy-plan'],{queryParams:{'type':'monthly'}})
        }
        else if (obj.type == 1) {
  
          this.popup.onReceivePopupData({ 'type': '' });
        //  this.router.navigate(['/chemist-account/buy-plan'],{queryParams:{'type':'monthly'}});
         // this.status.is_order_confirmed=1;
          //this.onSubmitEnquiry();
          //on primary btn clicked...
    
        }
   
      }
      else if(obj.mode=='success'){
      
        if (obj.type == 0) {
  
          //Go To Order
         
          this.popup.onReceivePopupData({ 'type': '' });
      //    this.router.navigate(['/chemist-account/buy-plan'],{queryParams:{'type':'monthly'}});
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
