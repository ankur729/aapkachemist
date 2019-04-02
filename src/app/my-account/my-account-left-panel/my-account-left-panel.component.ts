import { Component, OnInit } from '@angular/core';
import { Router, } from '@angular/router';
import {AppGlobals} from '../../app.global';

declare var $:any;

@Component({
  selector: 'app-my-account-left-panel',
  templateUrl: './my-account-left-panel.component.html',
  styleUrls: ['./my-account-left-panel.component.css']
})
export class MyAccountLeftPanelComponent implements OnInit {

  state:any;
  is_reffer_popup:boolean=false;

  constructor(private router:Router,private global:AppGlobals) { this.state=this.global.getAppState(); }

  ngOnInit() {
    
    console.log(this.state);
    $('.nameDesigns').removeClass('active');
    if(this.state.is_logged_in ==false){

      this.router.navigate(['/home']);
    }
    if(this.state.user.user_type_id !='1'){
      this.router.navigate(['/unauth-access']);
    }

    //$('.invite_friends_popup').hide();
  }


  navigate(field){

    $('.nameDesigns').removeClass('active');
    if(field=='family-tree'){

      this.router.navigate(['my-account/family-tree']);

      setTimeout(() => {
        $('#familytree').addClass('active');
      }, 20);
    
 
    }
    else if(field=='change-password'){
      
      this.router.navigate(['my-account/change-password']);

      setTimeout(() => {
        $('#changepass').addClass('active');
      }, 20);
      

    }
    else if(field=='update-profile'){

      this.router.navigate(['my-account/update-profile']);

      setTimeout(() => {
        $('#updateprofile').addClass('active');
      }, 20);
 
    }
    else if(field=='my-wallet'){

      this.router.navigate(['my-account/wallet']);

      setTimeout(() => {
        $('#mywallet').addClass('active');
      }, 20);
 
    }
    else if(field=='my-notification'){

      this.router.navigate(['my-account/notification']);

      setTimeout(() => {
        $('#mynotification').addClass('active');
      }, 20);
 
    }
    else if(field=='my-orders'){

      this.router.navigate(['my-account/orders']);

      setTimeout(() => {
        $('#myorders').addClass('active');
      }, 20);
 
    }
    else if(field=='my-chemist'){

      this.router.navigate(['my-account/chemist']);

      setTimeout(() => {
        $('#mychemist').addClass('active');
      }, 20);
 
    }
    else if(field=='my-address'){

      this.router.navigate(['my-account/address']);

      setTimeout(() => {
        $('#myaddress').addClass('active');
      }, 20);
 
    }
    else if(field=='my-enquires'){

      this.router.navigate(['my-account/enquires']);

      setTimeout(() => {
        $('#myenquires').addClass('active');
      }, 20);
 
    }

    
  }

  onReceiveCloseRefferPopupRequest($event){

    console.log($event);
  }
  toggleRefferPopup(mode){
    console.log(mode);
      if(mode=='show'){
        $('.invite_friends_popup').fadeIn();
      }
      else if(mode=='hide'){
        $('.invite_friends_popup').fadeOut();
      }
    
  }

  onUpdateProfileImage(imgdata){

    console.log(imgdata);
    let a:any=this.state.user.profile_image_path.split('/');
    a[a.length-1]=imgdata.filename;
 
    this.state.user.profile_image_path=a.join('/');
    this.global.saveAppState(this.state);
    
  }

  onUpdateApcCashFromParent(apcdata){

    this.state.user.total_wallet_amount=apcdata.apc_balance;
    console.log(apcdata);
  }
  onUpdateNotificationCountFromParent(apcdata){

    this.state.user.total_notification=apcdata.total_notification;
    console.log(apcdata);
  }

}
