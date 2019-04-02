import { Component, OnInit,Output } from '@angular/core';
import { AppGlobals } from '../../app.global';
import { LoadingBarService } from '@ngx-loading-bar/core';

import { Router } from '@angular/router';
import {Api} from '../../api.service';
declare var $:any;

@Component({
  selector: 'app-stock-enquiry',
  templateUrl: './stock-enquiry.component.html',
  styleUrls: ['./stock-enquiry.component.css']
})
export class StockEnquiryComponent implements OnInit {
 
  state:any;
  enquires:any=[];
  isnodatafound: boolean = false;

  @Output() nodataobj: any = { 'page': '', 'txt': '' };
  constructor(public global: AppGlobals,private loadingBar:LoadingBarService,private router:Router,private api:Api) { this.state=this.global.getAppState();}

  ngOnInit() {
    $('.page_name').hide();
    $('.mainPage').hide();
    setTimeout(() => {
      $('.list a').removeClass('active');
      $('#stockenquiry').addClass('active');
    }, 20);
    this.getEnquires();
  }

  getEnquires(){

    this.loadingBar.start();
    let data="user_id="+this.state.user.id+"&entry_type=Enquiry";

   /// console.log(this.address);
    this.api.getOrdersOrEnquires(data).subscribe(
        (response)=>
            { 
  
              
               var dt:any=response;
              console.log(dt);

                if(dt.status==200){
                
                  $('.page_name').show();
                  $('.mainPage').fadeIn(500);
                  this.enquires=dt.data;
                  if(this.enquires.length==0){
                    this.isnodatafound = true;
                    this.nodataobj.page = 'enquiry';
                    this.nodataobj.txt = "No enquires found";
                  }
                  //this.global.setToast('info',dt.message);
            //    // this.addresses=dt.data;
              
            //     // this.is_result_get=true;
            //     // this.searchresp=dt.user_data;
            // //    this.address=this.addressinit;
                
            //      this.global.setToast('info',dt.message);
    
                }
                else if(dt.status==201){
                  
                  this.isnodatafound = true;
                  this.nodataobj.page = 'enquiry';
                  this.nodataobj.txt = "No enquires found";
            //     // this.is_result_get=false;
            //     // this.searchresp=[];
                }
     
           this.loadingBar.stop();
              
        
            
            },
        (error)=>{
    
         
             console.log('RESPONSE FAILED');console.log(error)}
    );

        }

}
