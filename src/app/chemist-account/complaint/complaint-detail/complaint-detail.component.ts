import { Component, OnInit,ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LoadingBarService } from '@ngx-loading-bar/core';
import {Api} from '../../../api.service';
import {AppGlobals} from '../../../app.global';
import { PopupComponent } from '../../../popup/popup.component';
declare var $:any;

@Component({
  selector: 'app-complaint-detail',
  templateUrl: './complaint-detail.component.html',
  styleUrls: ['./complaint-detail.component.css']
})
export class ComplaintDetailComponent implements OnInit {


  state: any;
  complaint: any = { 'complaint_id': '', 'subject': '', 'complaint_date': '', 'complaint_status': '', 'message': '', 'ticket_id': '', 'ticket_no': '', 'messagelist': [], 'send_message': '' }
  @ViewChild('popupchild') popup: PopupComponent;

  constructor(private api: Api, public global: AppGlobals, private loadingBar: LoadingBarService
    , private router: Router, private aroute: ActivatedRoute) { this.state = this.global.getAppState(); }
  galleryinit: any;
  ngOnInit() {

    let complaint_id = this.aroute.snapshot.queryParams["id"];
    this.complaint.complaint_id = complaint_id;
    setTimeout(() => {
      $(".style .input").on('click keypress', function () {
        $(this).parent(".style").addClass("inpActive");

        $(this).blur(function () {
          var getitemval = $(this).val();
          if (getitemval == '') {
            $(this).parent(".style").removeClass("inpActive");
          }

        });

      });




    }, 200);

    // setTimeout(() => {
    //   this.galleryinit = new FgGallery('.fg-gallery', {
    //     cols: 1,
    //     style: {
    //       'width': '110px',
    //       'height': '110px',
    //       'border':'3px solid rgb(230, 225, 225)',
    //       'border-radius':'5px'
    //     }
    //   })

    //   this.galleryinit = new FgGallery('.fg-gallery2', {
    //     cols: 1,
    //     style: {
    //       'width': '110px',
    //       'height': '110px',
    //       'border':'3px solid rgb(230, 225, 225)',
    //       'border-radius':'5px'
    //     }
    //   }) 

    //     $("html, body").animate({ scrollTop: 0 }, "slow");

    // }, 200);
    setTimeout(() => {
      $('.list a').removeClass('active');
      $('#complaint').addClass('active');
      $("html, body").animate({ scrollTop: 0 }, "slow");
      
    }, 20);
    this.getComplaintDetail();
  }


  getComplaintDetail() {


    let data = "user_id=" + this.state.user.id + "&complaint_id=" + this.complaint.complaint_id;

    console.log(data);

    this.api.getComplaintDetails(data).subscribe(
      (response) => {



        var dt: any = response;

        console.log(dt);

        if (dt.status == 200) {

         
          this.setParams(dt);
          //  this.list=dt.data;

          // setTimeout(() => {
          //   $('.input input--nao input--filled').removeClass('input--filled');
          // }, 200);

          this.loadingBar.stop();


        }
        else if (dt.status == 201) {

          this.global.setToast('error', dt.message);

        }

      },
      (error) => {

        this.loadingBar.stop();
        //   this.spinnerService.hide();
        console.log('RESPONSE FAILED'); console.log(error)
      }
    );

  }

  setParams(dt) {

    //complaint:any={'complaint_id':'','subject':'','complaint_date':'','complaint_status':'','message':'','messagelist':[]}
    this.complaint.subject = dt.data.subject;
    this.complaint.complaint_date = dt.data.complaint_date;
    this.complaint.complaint_status = dt.data.complaint_status;
    this.complaint.ticket_no = dt.data.ticket_no;
    this.complaint.ticket_id = dt.data.ticket_id;
    this.complaint.message = dt.data.message;
    this.complaint.messagelist = dt.data.messagelist;
    console.log(this.complaint.messagelist);
  }

  onSubmitReview() {

    $('.review_popup').fadeOut();
    if (this.complaint.send_message == '') {
      this.global.setToast('error', 'Please write your message');
    }
    else {

      let data = "user_id=" + this.state.user.id + "&ticket_id=" + this.complaint.ticket_id + "&message=" + this.complaint.send_message;
      this.loadingBar.start();
      console.log(data);

      this.api.replyComplaintMessage(data).subscribe(
        (response) => {



          var dt: any = response;

          console.log(dt);

          if (dt.status == 200) {

            this.complaint.send_message='';
            //  this.list=dt.data;
            this.popup.onReceivePopupData({'type':'success','sent_txt':dt.message,'primary_btn_txt':'','secondary_btn_txt':'Close'});
            // setTimeout(() => {
            //   $('.input input--nao input--filled').removeClass('input--filled');
            // }, 200);

            this.loadingBar.stop();


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



  }

  onPopupActionReceived(obj:any) {
    console.log(obj);
    if(obj.mode=='error'){

      if (obj.type == 0) {

        this.popup.onReceivePopupData({ 'type': '' });
        
  
      }
      else if (obj.type == 1) {

     
        //on primary btn clicked...
  
      }
 
    }
    else if(obj.mode=='success'){
    
      if (obj.type == 0) {
        
        this.popup.onReceivePopupData({ 'type': '' });
        this.getComplaintDetail();
      //  this.router.navigate(['/my-account/complaint'])
        
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

  togglePopup() {

    if ($('.review_popup').css('display') == 'none') {
      $('.review_popup').fadeIn();
    }
    else if ($('.review_popup').css('display') == 'block') {
      $('.review_popup').fadeOut();
    }
    console.log($('.review_popup').css('display'))
  }

}
