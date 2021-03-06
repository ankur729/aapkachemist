import { Component, OnInit, Output ,ViewChild} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { Api } from '../../api.service';
import { AppGlobals } from '../../app.global';
import { PopupComponent } from '../../popup/popup.component';

declare var classie: any;
declare var $: any;



@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {

  state: any;
  respdata: any = {
    'orders': [],
    'type': '',
    'total_cancelled': '0',
    'total_delivered': '0',
    'total_on_the_way': '0',
    'total_open_order': '0',
    'total_ready_to_deliver': '0',
    'total_returned': '0',
    'last_order_review':{'reviews':0,'data':{'customer_id':'','order_id':'','review_status':'','vendor_id':'','feedback':'','shopname':'','order_no':''}},
    'api_status':0
  };
  isnodatafound: boolean = false;
  status: any = {
    'is_process': false, 'is_sent': false, 'process_txt': 'Please wait..we are processing your request.!', 'sent_txt': 'Status updated successfully.!', 'error_txt': '',
    'is_confirm_popup': false, 'confirm_txt': '', 'is_error': false, 'selected_order_no': '', 'updateorderto': '',
    'order_status': { 'confirm': 'OS01', 'ready_to_del': 'OS02', 'on_the_way': 'OS03', 'delivered': 'OS04' }
  };
  handler: any;
  current_page = 1;
  is_show_footer:boolean=false;

  @ViewChild('popupchild') popup: PopupComponent;

  @Output() nodataobj: any = { 'page': '', 'txt': '' };

  constructor(public global: AppGlobals, private loadingBar: LoadingBarService, private router: Router, private api: Api, private aroute: ActivatedRoute) { this.state = this.global.getAppState(); }

  ngOnInit() {

    
    $('.page_name').hide();
    $('.mainPage').hide();

    setTimeout(() => {
      $("html, body").animate({ scrollTop: 0 }, "slow");

      $('.list a').removeClass('active');
      $('#myorders').addClass('active');
      $("html, body").animate({ scrollTop: 0 }, "slow");
   
    }, 20);
    this.aroute.queryParams.subscribe(params => {

      //   this.respdata.type = this.aroute.snapshot.queryParams["type"];

      this.onSwitchTab(this.respdata.type);
      this.getOrderList();
    });

  }

  ngAfterViewInit() {

    // this.handler = function () {


    //   if ($(window).scrollTop() + $(window).height() > $(document).height() - 200) {
    //  //   alert('asdf');
    //     if (this.respdata.orders.length > 7) {
    //       //  this.global.setToast('info','Bottom reached');
    //       this.current_page = this.current_page + 1;
    //       this.getOrderList();


    //     }
    this.handler = function () {
 
      if ($(window).scrollTop() + $(window).height() > $(document).height() - 400) {
  
        if (this.respdata.orders.length > 1 && this.is_show_footer==false) {
          //  this.global.setToast('info','Bottom reached');
          this.current_page = this.current_page + 1;
         // alert(this.enquiry.type);
        
          this.getOrderList();
  
  
        }
  
  
        // ajax call get data from server and append to the div
      }
    }.bind(this);
    $(window).on("scroll", this.handler);
  

    //     // ajax call get data from server and append to the div
    //   }
    // }.bind(this);
    // $(window).on("scroll", this.handler);

  }

  getOrderList() {

    if(!this.respdata.api_status){

      this.respdata.api_status=1;
      this.loadingBar.start();
      let data = "user_id=" + this.state.user.id + "&entry_type=ALL" + "&list_type=0" + "&history_status=1"+"&page="+this.current_page+"&per_page=1";
      console.log(data);
      /// console.log(this.address);
      this.api.getOrdersOrEnquires(data).subscribe(
        (response) => {
  
          var dt: any = response;
  
          console.log(dt);
  
          this.respdata.api_status=0;
          //      this.global.setToast('info',dt.message);
       
       
          if (dt.status == 200) {
            this.respdata.last_order_review.reviews = dt.last_order_review.reviews;
            this.respdata.last_order_review.data = dt.last_order_review.data;
            
           // let orders = this.splitdaymonthyearFromTimeStamp(dt.data);
           let orders = dt.data;
           
            for (let i = 0; i < orders.length; i++) {
              this.respdata.orders.push(orders[i]);
            }
            console.log( this.respdata.orders);
               // this.respdata.orders=dt.data;
            //  for (let i = 0; i < orders.length; i++) {
            //   this.respdata.orders.push(orders[i]);
            //  }
           // this.respdata.orders = orders;
  
            if (this.respdata.orders.length == 0) {
              this.isnodatafound = true;
              this.nodataobj.page = 'enquiry';
              this.nodataobj.txt = "No Orders found";
              this.nodataobj.img_url = this.global.noimgfound.no_order_found;
            }
            else {
              this.isnodatafound = false;
            }
            this.respdata.total_cancelled = dt.total_cancelled;
            this.respdata.total_delivered = dt.total_delivered;
            this.respdata.total_on_the_way = dt.total_on_the_way;
            this.respdata.total_open_order = dt.total_open_order;
            this.respdata.total_ready_to_deliver = dt.total_ready_to_deliver;
            this.respdata.total_returned = dt.total_returned;
  
            $('.page_name').show();
            $('.mainPage').fadeIn(500);
            $('.orderListing').fadeIn();
            if($('.review_popup').css('display') == 'none') {
  
              $('.rating').addRating();
  
             }
  
          
  
      
            //    // this.addresses=dt.data;
  
            //     // this.is_result_get=true;
            //     // this.searchresp=dt.user_data;
            // //    this.address=this.addressinit;
  
            //      this.global.setToast('info',dt.message);
  
          }
          else if (dt.status == 201 && this.current_page==1) {
            this.isnodatafound = true;
            this.nodataobj.page = 'enquiry';
            this.nodataobj.txt = "No Orders found";
            this.nodataobj.img_url = this.global.noimgfound.no_order_found;
            //     // this.is_result_get=false;
            //     // this.searchresp=[];
          }
          else if (dt.status == 201 && this.current_page>1) {
            //     $('.page_name').hide();
            //  $('.mainPage').hide();
          //  alert(2);
            document.removeEventListener('scroll', this.handler, false);
            this.is_show_footer=true;
           //  this.enquiry.total_enquiries = dt.total_enquiries;
           //  this.enquiry.total_pending_enquiries = dt.total_pending_enquiries;
           //  this.enquiry.total_replied_enquiries = dt.total_replied_enquiries;
           //  this.enquiry.total_closed_enquiries = dt.total_closed_enquiries;
            }
          if(this.respdata.last_order_review.reviews==1){
  
   
            this.respdata.last_order_review.data.customer_id=dt.last_order_review.data.customer_id;
            this.respdata.last_order_review.data.order_id=dt.last_order_review.data.order_id;
            this.respdata.last_order_review.data.review_status=dt.last_order_review.data.review_status;
            this.respdata.last_order_review.data.vendor_id=dt.last_order_review.data.vendor_id;
            this.respdata.last_order_review.data.order_no=dt.last_order_review.data.order_no;
            this.respdata.last_order_review.data.shopname=dt.last_order_review.data.shopname;
  
            this.respdata.last_order_review.data.feedback='';
              $('.review_popup').fadeIn();
              $(".style .input").on('click keypress',function(){
                $(this).parent(".style").addClass("inpActive");
                        
                $(this).blur(function(){
                  var getitemval=$(this).val();						
                    if(getitemval==''){
                      $(this).parent(".style").removeClass("inpActive");
                    }
                
                });
                
              });
          }
          this.loadingBar.stop();
  
  
  
        },
        (error) => {
  
  
          console.log('RESPONSE FAILED'); console.log(error)
        }
      );
  
    }
    
  }

  splitdaymonthyearFromTimeStamp(items: any) {

    let arr: any;

    let day: string = '';
    let month: string = '';
    let year: string = '';
    let date: string = '';

    items.map(elem => {

      date = elem.order_date.split(' ');
      date = date[0];
      elem.day = date.split('-')[2];
      elem.month = date.split('-')[1];
      elem.monthname = this.getMonthNameFromNumber(elem.month);
      elem.year = date.split('-')[0];


    });

    return items;
    console.log(items);

  }


  onSwitchTab(mode) {


    $('.list').removeClass('active');
    if (mode == this.status.order_status.confirm) {

      $('#order_open').addClass('active');
      this.router.navigate(['/my-account/orders'], { queryParams: { 'type': this.status.order_status.confirm } })
      $('.orderListing').fadeOut();
    }
    else if (mode == this.status.order_status.ready_to_del) {

      $('#order_readytodel').addClass('active');
      this.router.navigate(['/my-account/orders'], { queryParams: { 'type': this.status.order_status.ready_to_del } });
      $('.orderListing').fadeOut();
    }
    else if (mode == this.status.order_status.on_the_way) {

      $('#order_ontheway').addClass('active');
      this.router.navigate(['/my-account/orders'], { queryParams: { 'type': this.status.order_status.on_the_way } });
      $('.orderListing').fadeOut();
    }
    else if (mode == this.status.order_status.delivered) {
      $('#order_delivered').addClass('active');
      this.router.navigate(['/my-account/orders'], { queryParams: { 'type': this.status.order_status.delivered } });
      $('.orderListing').fadeOut();

    }
  }

  getMonthNameFromNumber(number: any) {

    switch (number) {

      case "01": return "Jan"; break;
      case "02": return "Feb"; break;
      case "03": return "March"; break;
      case "04": return "April"; break;
      case "05": return "May"; break;
      case "06": return "Jun"; break;
      case "07": return "Jul"; break;
      case "08": return "Aug"; break;
      case "09": return "Sept"; break;
      case "10": return "Oct"; break;
      case "11": return "Nov"; break;
      case "12": return "Dec"; break;

    }
  }

  onSetReview(status){

    
   // this.popup.onReceivePopupData({'type':'process','confirm_txt':'we are sending your review','primary_btn_txt':'','secondary_btn_txt':''});
    if(status==1){
      $('.review_popup').fadeOut();
      this.onUpdateOrderReviewStatus(status);
    }
    else  if(status==2){
      $('.review_popup').fadeOut();
      this.onUpdateOrderReviewStatus(status);
    }
    else  if(status==3){
      $('.review_popup').fadeOut();
      this.onSubmitOrderReview();
    }
  }
  onSubmitOrderReview(){

    let rating = $('.material-icons.selected').length;
    console.log(this.respdata.last_order_review.data.feedback);

    console.log(rating);
    if(rating==0){
        this.global.setToast('error','please give your rating');
        $('.review_popup').fadeIn();
    }
    else{
      
    // this.loadingBar.start();
     let data = "user_id=" + this.state.user.id + "&order_id="+this.respdata.last_order_review.data.order_id + "&rating="+rating+"&review="+this.respdata.last_order_review.data.feedback+"&vendor_id="+this.respdata.last_order_review.data.vendor_id;

     console.log(data);
      // /// console.log(this.address);
  
      this.api.onSubmitOrderReview(data).subscribe(
        (response) => {
  
          var dt: any = response;
          console.log(dt);
   
          this.popup.onReceivePopupData({ 'type': '' });
          if (dt.status == 200) {
  
       
              this.popup.onReceivePopupData({'type':'success','sent_txt':dt.message,'primary_btn_txt':'','secondary_btn_txt':'Close'});
         
            //      this.global.setToast('info',dt.message);
  
          }
          else if (dt.status == 201) {
            
          
              this.popup.onReceivePopupData({'type':'error','sent_txt':dt.message,'primary_btn_txt':'','secondary_btn_txt':'Close'});
         
  
           
            //     // this.is_result_get=false;
            //     // this.searchresp=[];
          }
          // if(this.respdata.last_order_review.reviews==1){
  
          //     $('.review_popup').fadeIn();
          // }
          this.loadingBar.stop();
  
  
  
        },
        (error) => {
  
  
          console.log('RESPONSE FAILED'); console.log(error)
        }
      );
    } 



  }

  onUpdateOrderReviewStatus(reviewstatus) {

    this.loadingBar.start();
    let data = "user_id=" + this.state.user.id + "&order_id="+this.respdata.last_order_review.data.order_id + "&review_status="+reviewstatus;

    console.log(data);
    /// console.log(this.address);

    this.api.updateOrderReviewStatus(data).subscribe(
      (response) => {

        var dt: any = response;
        console.log(dt);
 
        this.popup.onReceivePopupData({ 'type': '' });
        if (dt.status == 200) {

         
          if(reviewstatus==1 || reviewstatus==2){
            
          }
          else{
            this.popup.onReceivePopupData({'type':'success','sent_txt':dt.message,'primary_btn_txt':'','secondary_btn_txt':'Close'});
          }
          //      this.global.setToast('info',dt.message);

        }
        else if (dt.status == 201 ) {
          
          if(reviewstatus!=1){
            this.popup.onReceivePopupData({'type':'error','sent_txt':dt.message,'primary_btn_txt':'','secondary_btn_txt':'Close'});
          }

         
          //     // this.is_result_get=false;
          //     // this.searchresp=[];
        }
        // if(this.respdata.last_order_review.reviews==1){

        //     $('.review_popup').fadeIn();
        // }
        this.loadingBar.stop();



      },
      (error) => {


        console.log('RESPONSE FAILED'); console.log(error)
      }
    );

  }

  onPopupActionReceived(obj:any) {
    console.log(obj);
    if(obj.mode=='error'){

      if (obj.type == 0) {

        this.popup.onReceivePopupData({ 'type': '' });
      //  this.router.navigate(['/my-account/wallet']);
  
      }
      else if (obj.type == 1) {

     
        //on primary btn clicked...
  
      }
 
    }
    else if(obj.mode=='success'){
    
      if (obj.type == 0) {
        
        this.popup.onReceivePopupData({ 'type': '' });
      //  this.router.navigate(['/my-account/update-profile']);
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
