import { Component, OnInit,ViewChild } from '@angular/core';
import { Router, ActivatedRoute  } from '@angular/router';
import { PopupComponent } from '../popup/popup.component'; 
import {AppGlobals} from '../app.global';

@Component({
  selector: 'app-thank-you',
  templateUrl: './thank-you.component.html',
  styleUrls: ['./thank-you.component.css']
})
export class ThankYouComponent implements OnInit {

  // popup:any={'is_show':false,'page':'',

  //           'enquiry_page':{'msg':''}

  //           }
  page:any={'type':undefined};
  state:any;
 @ViewChild('popupchild') popup: PopupComponent;
  constructor(private aroute:ActivatedRoute,private router:Router,private global:AppGlobals) {

    
    this.page.type=this.aroute.snapshot.queryParams["page"];
    this.state=this.global.getAppState();
    console.log(this.state);

   }

  ngOnInit() {

    if(this.state.is_show_thankyou !=undefined && this.state.is_show_thankyou ==1){

    }
    else{
      this.router.navigate(['/home']);
    }
    // if(this.page.type!=undefined){

    //   this.popup.onReceivePopupData({'type':'success','sent_txt':'Thank you for placing order with us, we are sharing the details with your nearby chemist, you shall receive confirmation soon.','primary_btn_txt':'Go to Order','secondary_btn_txt':'Go to Home'});
    //   //this.popup.onReceivePopupData({'type':'success','sent_txt':'Thank you for contacting us.!','primary_btn_txt':'','secondary_btn_txt':'Close'});
    //   // this.popup.is_show=true;
    //   // this.setMsg(this.popup.page);
    // }
  }

  onPopupActionReceived(obj:any) {
    console.log(obj);
    if(obj.mode=='error'){

      if (obj.type == 0) {

        this.popup.onReceivePopupData({ 'type': '' });
  
      }
      // else if (obj.type == 1) {

      //   this.popup.onReceivePopupData({ 'type': '' });
      //   this.status.is_order_confirmed=1;
      //   this.onSubmitEnquiry();
      //   //on primary btn clicked...
  
      // }
 
    }
    else if(obj.mode=='success'){
    
      if (obj.type == 0) {

        this.router.navigate(['/']);
        this.popup.onReceivePopupData({ 'type': '' });
        
      }
      else if (obj.type == 1) {
        
        this.router.navigate(['home']); 
  
      }
    }
 

    //console.log(event);
  }



  setMsg(page){


    if(page == 'enquiry'){

       // this.popup.enquiry_page.msg='Thank you contacting us.'
    }
  }

  onClosePopup(){

    this.router.navigate(['/home']);

  }

  onRedirect(){

    if(this.state.user.user_type_id =='1'){

      this.router.navigate(['/my-account/orders']);
    }
    else{
      this.router.navigate(['/chemist-account/stock-orders']);
      //this.
    }
  }
  

  ngOnDestroy(){

    this.state.is_show_thankyou=0;
    this.global.saveAppState(this.state);
  }
}
