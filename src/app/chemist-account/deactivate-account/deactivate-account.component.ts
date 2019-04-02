import { Component, OnInit,ViewChild } from '@angular/core';
import { Router  } from '@angular/router';
import { LoadingBarService } from '@ngx-loading-bar/core';
import {Api} from '../../api.service';
import {AppGlobals} from '../../app.global';
 
declare var $:any;
@Component({
  selector: 'app-deactivate-account',
  templateUrl: './deactivate-account.component.html',
  styleUrls: ['./deactivate-account.component.css']
})
export class DeactivateAccountComponent implements OnInit {
 

  state:any;
  status: any = { 'is_process': false, 'is_sent': false, 'process_txt': 'Please wait..we are processing your request.!', 'sent_txt': 'Enquiry purchased successfully.!','error_txt':'',
  'is_confirm_popup':false, 'confirm_txt':'Are you sure to deactivate account','is_error':false};
 
  constructor(private api:Api,private loadingBar: LoadingBarService,public global:AppGlobals,private router:Router) { this.state=this.global.getAppState(); }
  
  ngOnInit() {
  }
  
  deactivateAccount(){
    
    let data="user_id="+this.state.user.id;

    this.loadingBar.start();
    this.api.deactivateAccount(data).subscribe(
      (response) => {
     

        let dt: any = response;
        
        this.loadingBar.stop();
         

        if (dt.status == 200) {
         
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
      
           
      
          this.global.setToast('error', dt.message);
      
          this.global.saveAppState(this.state);
          this.router.navigate(['home']);
          
      //    this.respdata.mapping_type_list=dt.data.mapping_type_list;
           

        }
        else if (dt.status == 201) {
 
        }

      },
      (error) => {

        this.loadingBar.stop();
        //   this.spinnerService.hide();
        console.log('RESPONSE FAILED'); console.log(error)
      }
    );

  }

  onClose(type,mode){

    if(type=='confirmprocess' && mode=='cancel'){

      history.go(-1);
    }
    if(type=='confirmprocess' && mode=='confirm'){

      this.deactivateAccount();
    // history.go(-1);
    }

  }
}
