import { Component, OnInit,Output,ViewChild } from '@angular/core';
import { AppGlobals } from '../../app.global';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { Router } from '@angular/router';
import { Api } from '../../api.service';
import {ChemistAccountLeftPanelComponent} from '../chemist-account-left-panel/chemist-account-left-panel.component';
declare var $:any;

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {

  state: any;
  enquires: any = [];
  isnodatafound: boolean = false;
  is_show_footer:boolean=false;
  handler: any;
  current_page = 1;
  notification_count:0;
  @Output() nodataobj: any = { 'page': '', 'txt': '' };
  @ViewChild('leftpanel') leftpanel:ChemistAccountLeftPanelComponent;

  constructor(public global: AppGlobals, private loadingBar: LoadingBarService, private router: Router, private api: Api) { this.state = this.global.getAppState(); }

  ngOnInit() {
    $('.page_name').hide();
    $('.mainPage').hide();
    this.getNotificationList();
    setTimeout(() => {
      $('.list a').removeClass('active');
      $('#notifications').addClass('active');

      $("html, body").animate({ scrollTop: 0 }, "slow");
    }, 20);

  }

  ngAfterViewInit(){

    //   this.handler = function () {
  
        
    //     if($(window).scrollTop() + $(window).height() > $(document).height() - 200) {
  
    //      if (this.enquiry.enquiries.length > 1) {
    //        //  this.global.setToast('info','Bottom reached');
    //        this.current_page = this.current_page + 1;
    //        this.getEnquiries(this.enquiry.type);
         
           
    //      }
  
  
    //      // ajax call get data from server and append to the div
    //    }
    //  }.bind(this);
    //  $(window).on("scroll", this.handler);
  
  
    
    this.handler = function () {
  
  
      if ($(window).scrollTop() + $(window).height() > $(document).height() - 400) {
  
        if (this.enquires.length > 1 && this.is_show_footer==false) {
          //  this.global.setToast('info','Bottom reached');
          this.current_page = this.current_page + 1;
         // alert(this.enquiry.type);
         
            
               this.getNotificationList();
           
        //  this.getNewEnquiryList();
   
        }
  
  
        // ajax call get data from server and append to the div
      }
    }.bind(this);
    $(window).on("scroll", this.handler);
  
  
    }

  getNotificationList() {

    this.loadingBar.start();
    let data = "user_id=" + this.state.user.id+"&page="+this.current_page;
  
    /// console.log(this.address);
    this.api.getNotificationList(data).subscribe(
      (response) => {
     
        var dt: any = response;
        console.log(dt);
          
            if(dt.status==200){
              $('.page_name').show();
              $('.mainPage').fadeIn(500);
              let enquiries = dt.data;
        
              enquiries.map(elem=>{
                elem.additional_data=JSON.parse(elem.additional_data)
              })

              
              for (let i = 0; i < enquiries.length; i++) {
                this.enquires.push(enquiries[i]);
              }
             // this.enquires=enquiries;
              this.notification_count=dt.notification_count;
              this.leftpanel.onUpdateNotificationCount({'notifycount':this.notification_count});
        //    // this.addresses=dt.data;

        //     // this.is_result_get=true;
        //     // this.searchresp=dt.user_data;
        // //    this.address=this.addressinit;

        //      this.global.setToast('info',dt.message);

           }
            else if(dt.status==201 && this.current_page==1){
              $('.page_name').hide();
              $('.mainPage').hide();

                if(this.enquires.length==0){

                  this.isnodatafound = true;
                  this.nodataobj.page = 'enquiry';
                  this.nodataobj.txt = "No notification received";
                  this.is_show_footer=true;
                }
              

        //     // this.is_result_get=false;
        //     // this.searchresp=[];
            }
            else if (dt.status == 201   && this.current_page>1) {
              //     $('.page_name').hide();
              //  $('.mainPage').hide();
              document.removeEventListener('scroll', this.handler, false);
              this.is_show_footer=true;
             //  this.enquiry.total_enquiries = dt.total_enquiries;
             //  this.enquiry.total_pending_enquiries = dt.total_pending_enquiries;
             //  this.enquiry.total_replied_enquiries = dt.total_replied_enquiries;
             //  this.enquiry.total_closed_enquiries = dt.total_closed_enquiries;
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
