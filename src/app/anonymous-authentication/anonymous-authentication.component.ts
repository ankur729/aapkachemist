import { Component, OnInit ,ViewChild} from '@angular/core';
import { Router, ActivatedRoute  } from '@angular/router';
import { LoadingBarService } from '@ngx-loading-bar/core';
import {Api} from '../api.service';
import {AppGlobals} from '../app.global';
import { PopupComponent } from '../popup/popup.component';
declare var $:any;
@Component({
  selector: 'app-anonymous-authentication',
  templateUrl: './anonymous-authentication.component.html',
  styleUrls: ['./anonymous-authentication.component.css']
})
export class AnonymousAuthenticationComponent implements OnInit {

  state:any;
  unique_key:any="";
  respdata:any={'order_id':'','vendor_id':'','direct_enquiry':'','user_type_id':'','customer_id':'','depend_id':''};
  @ViewChild('popupchild') popup: PopupComponent;
  constructor(private api:Api,private loadingBar: LoadingBarService,public global:AppGlobals,private router:Router,private aroute:ActivatedRoute) { this.state=this.global.getAppState();
  }
  ngOnInit() {

    this.aroute.queryParams.subscribe(params => {


      this.unique_key = this.aroute.snapshot.queryParams["unique_key"];
      console.log(this.unique_key);
      this.popup.onReceivePopupData({'type':'process','confirm_txt':'Please wait.. we are validating your request','primary_btn_txt':'','secondary_btn_txt':''});
      this.anonymousAuthenticate();
    });

  //     this.aroute.queryParams.subscribe((param: any) => {
  //  //   this.step=param.step; 
  //     //alert(param);
 
  //   });
  }

  anonymousAuthenticate(){

    let session_id = '';
    if (this.state.cartdata.session_id != undefined) {
      session_id = this.state.cartdata.session_id;
    }

    let data="unique_key="+this.unique_key+"&session_id="+session_id;
    console.log(data);
    this.loadingBar.start();

    this.api.modifyUserLogin(data).subscribe(
      (response) => {
    
        var dt: any = response;
        
     
        console.log(dt);
        if (dt.status == 200) {

          let user: any = { 'user_id': this.state.user.id, 'device_id': this.state.device_id };


    localStorage.removeItem('user');
    let sessionid = Math.floor(Date.now() / 1000);
    this.state.user = '';

    this.state.is_logged_in = false;
    this.state.is_logged_out = true;
    this.state.cartdata.session_id = sessionid;
    this.state.cartdata.cartcount = 0;
    this.state.cartdata.cart_amount = 0;
    this.state.cartdata.delivery_amount = 0;
    this.state.cartdata.gross_amount = 0;
    this.state.cartdata.items = [];
    this.state.prescription_arr=[];
 

 

    this.global.saveAppState(this.state);
 
 

       //   this.global.setToast('info',dt.message);
      
       this.respdata.order_id=dt.data.order_id;
       this.respdata.vendor_id=dt.data.vendor_id;
       this.respdata.direct_enquiry=dt.data.direct_enquiry;
       this.respdata.user_type_id=dt.data.user_type_id;
       this.respdata.customer_id=dt.data.customer_id;
       this.respdata.depend_id=dt.data.depend_id;

       this.state.user = dt.data;
       this.state.is_logged_in = true;
       this.state.cartdata.cartcount = parseInt(dt.cart_count);
       this.state.cartdata.session_id=dt.session_id;
       this.global.saveAppState(this.state);
      let str='Logged in as [ '+dt.data.shopname+' ]';
        this.popup.onReceivePopupData({'type':'success4','sent_txt':str,'primary_btn_txt':'Modify Order','secondary_btn_txt':'Dashboard'});
      //  this.global.saveAppState(this.state);
          this.loadingBar.stop();
         

        }
        else if (dt.status == 201) {

          this.global.setToast('error',dt.message);

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
      if(obj.mode=='confirm'){
  
        if (obj.type == 0) {
  
          this.popup.onReceivePopupData({ 'type': '' });
    
        }
        else if (obj.type == 1) {
  
          this.popup.onReceivePopupData({ 'type': '' });
          
    
        }
   
      }
      else if(obj.mode=='success'){
      
        if (obj.type == 0) {
   
          
        }
        else if (obj.type == 1) {
  
           
        }
        
      }
      else if(obj.mode=='success4'){
      
        if (obj.type == 0) {
          
          this.router.navigate(['/chemist-account/dashboard']);
          
        }
        else if (obj.type == 1) {
          // "order_id=" + this.respdata.order_id + "&user_id="+this.respdata.customer_id + "&vendor_id=" + this.state.user.id+"&direct_enquiry="+this.respdata.direct_enquiry;
     

          this.router.navigate(['/chemist-account/modify-order'],
          
          {queryParams:{'oid':this.respdata.order_id,'uid':this.respdata.customer_id,'eid':this.respdata.depend_id,'deq':this.respdata.direct_enquiry}})
           
        }
        
      }
      else if(obj.mode=='error'){
      
        if (obj.type == 0) {
        
          this.popup.onReceivePopupData({ 'type': '' });
          
        }
        else if (obj.type == 1) {
  
           
        }
  
      //console.log(event);
    }
  
  }


}
