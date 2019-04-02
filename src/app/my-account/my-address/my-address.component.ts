import { Component, OnInit } from '@angular/core';
import { AppGlobals } from '../../app.global';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { Router } from '@angular/router';
import {Api} from '../../api.service';

@Component({
  selector: 'app-my-address',
  templateUrl: './my-address.component.html',
  styleUrls: ['./my-address.component.css']
})
export class MyAddressComponent implements OnInit {

  state:any;
  addresses:any=[];

  constructor(public global: AppGlobals,private loadingBar:LoadingBarService,private router:Router,private api:Api) { this.state=this.global.getAppState();}

  ngOnInit() {

    this.getUserAddressList();
  }

  getUserAddressList(){

    this.loadingBar.start();
    let data="user_id="+this.state.user.id+"&address_id=";

   /// console.log(this.address);
    this.api.getUserAddressList(data).subscribe(
        (response)=>
            { 
           
               var dt:any=response;
    
              this.global.setToast('info',dt.message);

               if(dt.status==200){
                
                this.addresses=dt.data;
              
                // this.is_result_get=true;
                // this.searchresp=dt.user_data;
            //    this.address=this.addressinit;
                
                 this.global.setToast('info',dt.message);
    
               }
               else if(dt.status==201){
    
                // this.is_result_get=false;
                // this.searchresp=[];
               }
     
           this.loadingBar.stop();
              
        
            
            },
        (error)=>{
    
         
             console.log('RESPONSE FAILED');console.log(error)}
    );

  }

  navigate(field){

    if(field=='add-address'){

      this.router.navigate(['my-account/add-address']);
      //routerLink="/my-account/add-address" 
    }
  }

  removeAddressById(addressid){

    let data="user_id="+this.state.user.id+"&address_id="+addressid;

   /// console.log(this.address);
    this.api.removeAddressById(data).subscribe(
        (response)=>
            { 
               
              
               var dt:any=response;
    
              this.global.setToast('info',dt.message);

               if(dt.status==200){
                
                this.addresses=dt.data;
              
                // this.is_result_get=true;
                // this.searchresp=dt.user_data;
            //    this.address=this.addressinit;
                
                 this.global.setToast('info','Record deleted successfully');
    
               }
               else if(dt.status==201){
    
                // this.is_result_get=false;
                // this.searchresp=[];
               }
     
           this.loadingBar.stop();
              
        
            
            },
        (error)=>{
    
         
             console.log('RESPONSE FAILED');console.log(error)}
    );



  }

}
