import { Component, OnInit } from '@angular/core';
import { Router, } from '@angular/router';
import { AppGlobals } from '../../app.global';

declare var $: any;


@Component({
  selector: 'app-chemist-account-left-panel',
  templateUrl: './chemist-account-left-panel.component.html',
  styleUrls: ['./chemist-account-left-panel.component.css']
})
export class ChemistAccountLeftPanelComponent implements OnInit {

  state: any;
  
  constructor(private router: Router, private global: AppGlobals) { this.state = this.global.getAppState(); }

  ngOnInit() {

    //  $('.nameDesigns').removeClass('active');
  
    if (this.state.is_logged_in == false ) {

      this.router.navigate(['/home']);
    }
    if(this.state.user.user_type_id =='1'){
      this.router.navigate(['/unauth-access']);
    }
    else{
      
       this.state.user.total_wallet_amount=this.state.user.total_wallet_amount;
    }
    console.log(this.state.user);
  }


  navigate(field) {

    $('.nameDesigns').removeClass('active');
    if (field == 'retailer-orders') {

      this.router.navigate(['chemist-account/retailer-orders']);

      setTimeout(() => {
        $('#retailerorders').addClass('active');
      }, 20);


    }

    else if (field == 'retailer-enquiry') {

      this.router.navigate(['chemist-account/retailer-enquiry']);

      setTimeout(() => {
        $('#retailerenquiry').addClass('active');
      }, 20);


    }
    else if (field == 'stock-orders') {

      this.router.navigate(['chemist-account/stock-orders']);

      setTimeout(() => {
        $('#stockorders').addClass('active');
      }, 20);


    }

    else if (field == 'stock-enquiry') {

      this.router.navigate(['chemist-account/stock-enquiry']);

      setTimeout(() => {
        $('#stockenquiry').addClass('active');
      }, 20);


    }

    else if (field == 'notifications') {

      this.router.navigate(['chemist-account/notifications']);

      setTimeout(() => {
        $('#notifications').addClass('active');
      }, 20);

    }
    else if (field == 'profile-setup') {

      // this.router.navigate(['chemist-account/profile-setup']);
      this.router.navigate(['chemist-account/profile-setup'], { queryParams: { step: '1' } });
      setTimeout(() => {
        $('#profilesetup').addClass('active');
      }, 20);

    }
    else if (field == 'change-password') {

      this.router.navigate(['chemist-account/change-password']);

      setTimeout(() => {
        $('#changepass').addClass('active');
      }, 20);

    }
    else if (field == 'update-profile') {

      this.router.navigate(['chemist-account/update-profile']);

      setTimeout(() => {
        $('#updateprofile').addClass('active');
      }, 20);

    }
    else if (field == 'my-address') {

      this.router.navigate(['chemist-account/my-address']);

      setTimeout(() => {
        $('#myaddress').addClass('active');
      }, 20);

    }
  }

  onUpdateWalletBalance(bal:any){
 
    this.state.user.total_wallet_amount=bal;
  
    this.global.saveAppState(this.state);
  }

  onUpdateNotificationCount(notifydata:any){

    console.log(notifydata);
    this.state.user.total_notification=notifydata.notifycount;
    this.global.saveAppState(this.state);
  }

  onUpdateProfileImage(imgdata){

   
    let a:any=this.state.user.profile_image_path.split('/');
    a[a.length-1]=imgdata.filename;
 
    this.state.user.profile_image_path=a.join('/');
    this.global.saveAppState(this.state);
    
  }



}
