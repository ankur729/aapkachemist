import { Component, OnInit,Output,ViewChild } from '@angular/core';
import { AppGlobals } from '../../app.global';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { Router } from '@angular/router';
import {Api} from '../../api.service';
import { PopupComponent } from '../../popup/popup.component';

declare var $:any;


@Component({
  selector: 'app-my-chemist',
  templateUrl: './my-chemist.component.html',
  styleUrls: ['./my-chemist.component.css']
})
export class MyChemistComponent implements OnInit {

  state:any;
  lists:any=[];
  isnodatafound: boolean = false;

  @Output() nodataobj: any = { 'page': '', 'txt': '' };
  @ViewChild('popupchild') popup: PopupComponent;
  remove_id:'';
  constructor(public global: AppGlobals,private loadingBar:LoadingBarService,private router:Router,private api:Api) { this.state=this.global.getAppState();}

  ngOnInit() {
    $('.page_name').hide();
    $('.mainPage').hide();
    this.getEnquires();
    setTimeout(() => {
      
    $('.list a').removeClass('active');
    $('#mychemist').addClass('active');
    $("html, body").animate({ scrollTop: 0 }, "slow");
  }, 20);

  }

  getEnquires(){

    this.loadingBar.start();
    let data="user_id="+this.state.user.id+"&user_type_id="+this.state.user.user_type_id;

   /// console.log(this.address);
    this.api.getFavourites(data).subscribe(
        (response)=>
            { 
         
               var dt:any=response;
              console.log(dt);
           //   this.global.setToast('info',dt.message);

                if(dt.status==200){
                  this.lists=dt.data;

                  if(this.lists.length==0){
                    this.isnodatafound = true;
                    this.nodataobj.page = 'enquiry';
                    this.nodataobj.txt = "No favourite chemists found";
                    this.nodataobj.img_url = this.global.noimgfound.no_chemist_found;
                  }


                  $('.page_name').show();
                  $('.mainPage').fadeIn(500);
            //    // this.addresses=dt.data;
              
            //     // this.is_result_get=true;
            //     // this.searchresp=dt.user_data;
            // //    this.address=this.addressinit;
                
            //      this.global.setToast('info',dt.message);
    
                }
                else if(dt.status==201){
                  this.isnodatafound = true;
                  this.nodataobj.page = 'enquiry';
                  this.nodataobj.txt = "No favourite chemist found";
                  this.nodataobj.img_url = this.global.noimgfound.no_chemist_found;
            //     // this.is_result_get=false;
            //     // this.searchresp=[];
                }
     
           this.loadingBar.stop();
              
        
            
            },
        (error)=>{
    
          this.loadingBar.stop();
             console.log('RESPONSE FAILED');console.log(error)}
    );

        }

        onRemoveFromFavHander(data:any) {
          console.log(data);
          this.popup.onReceivePopupData({'type':'confirm','confirm_txt':'Are you sure to remove [ '+data.vendor_shopname+' ] from favourite','primary_btn_txt':'Yes, Remove It','secondary_btn_txt':'No, Close It'});
          // this.status.confirm_txt="Are you sure to remove "+data.vendor_shopname+" from favourite";
           this.remove_id=data.vendor_id;
      
          // this.status.is_process=true;
      
        }

        removeFromFavourites() {

          let data:any;
      
           
              data = "from_user_id=" + this.state.user.id + "&from_user_type_id=" + this.state.user.user_type_id + "&to_user_id=" +this.remove_id + "&to_user_type_id=2&type=0";
          
      
          console.log(data);
      
            this.loadingBar.start();
            this.api.addRemoveToFavourites(data).subscribe(
              (response) => {
      
               // this.lists=[];
               this.popup.onReceivePopupData({'type':''});
                var dt: any = response;
                console.log(dt);
                if (dt.status == 200) {
                  
                  this.popup.onReceivePopupData({'type':'success','sent_txt':'Removed successfully.','primary_btn_txt':'','secondary_btn_txt':'Close'});
                //   this.status.is_sent=true;
                  
                // this.status = {
                //     'is_process': false, 'is_sent': false, 'process_txt': 'Please wait..we are sending your quotation.!', 'sent_txt': 'Removed successfully.',
                //     'is_confirm_popup': false, 'confirm_txt': ''
                //   };
                  this.getEnquires();
                  //this.status.sent_txt=true;
                  
                  // this.global.setToast('info', dt.message);
                  // if (this.respdata.user_data.is_favourite == '0') {
      
                  //   this.respdata.user_data.is_favourite = '1';
                  //   $('#hearticon').removeClass('fa-heart-o');
                  //   $('#hearticon').addClass('fa-heart');
      
                  // }
                  // else {
      
                  //   this.respdata.user_data.is_favourite = '0';
                  //   $('#hearticon').removeClass('fa-heart');
                  //   $('#hearticon').addClass('fa-heart-o');
                  // }
                }
                else if (dt.status == 201) {
                  this.global.setToast('error', dt.message);
                }
                this.loadingBar.stop();
              },
              (error) => {
      
                this.loadingBar.stop();
                //   this.spinnerService.hide();
                console.log('RESPONSE FAILED'); console.log(error)
              }
            );
      
           
        }

        onPopupActionReceived(obj:any) {
          console.log(obj);
          if(obj.mode=='confirm'){
      
            if (obj.type == 0) {
      
              this.popup.onReceivePopupData({ 'type': '' });
        
            }
            else if (obj.type == 1) {
      
              this.removeFromFavourites();
              //on primary btn clicked...
        
            }
       
          }
          else if(obj.mode=='success'){
          
            if (obj.type == 0) {
              
              this.popup.onReceivePopupData({ 'type': '' });
              //Go To Order
            //  this.onRedirect('home')
              
            }
            else if (obj.type == 1) {
      
           //   this.popup.onReceivePopupData({ 'type': '' });
            //  this.onRedirect('my-enquiries');
              //on primary btn clicked...
        
            }
          }
       
      
          //console.log(event);
        }

        
}
