import { Component, OnInit, Output,ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { Api } from '../../api.service';
import { AppGlobals } from '../../app.global';
import { PopupComponent } from '../../popup/popup.component';
 
declare var classie: any;
declare var $: any;

@Component({
  selector: 'app-retailer-enquiry',
  templateUrl: './retailer-enquiry.component.html',
  styleUrls: ['./retailer-enquiry.component.css']
})
export class RetailerEnquiryComponent implements OnInit {

  state: any;
  enquiry: any = { 'enquiries': [], 'total_enquiries': 0, 'total_pending_enquiries': 0, 'total_replied_enquiries': 0, 'confirm_enquiry_id': '', 'type': '', 'query': '','status':'','order_status':'' };
  isnodatafound: boolean = false;
  status: any = {
    'is_process': false, 'is_sent': false, 'process_txt': 'Please wait..we are processing your request.!', 'sent_txt': 'Enquiry purchased successfully.!', 'error_txt': '',

    'is_confirm_popup': false, 'confirm_txt': '', 'is_error': false
  };
  confirm_pin:any={
    'is_process': false, 'is_sent': false, 'process_txt': 'Please wait..we are verifying PIN!', 'sent_txt': 'PIN confirmed successfully','error_txt':'Invalid PIN.!',
    'is_confirm_popup':false, 'confirm_txt':'','is_error':false,'selected_order_no':'','updateorderto':'',
  };
  respdata: any = { 'is_confirm_delivery':false,'selected_order_id':''};


  itemdetail: any = [];
  showdetail: boolean = false;
  handler: any;
  current_page = 1;
  is_show_footer:boolean=false;
  @Output() nodataobj: any = { 'page': '', 'txt': '' };

  @ViewChild('popupchild') popup: PopupComponent;
  
  constructor(private api: Api, private loadingBar: LoadingBarService, public global: AppGlobals, private router: Router, private aroute: ActivatedRoute) { this.state = this.global.getAppState(); }

  ngOnInit() {

    // $('.page_name').hide();
    // $('.mainPage').hide();


    $("html, body").animate({ scrollTop: 0 }, "slow");
    setTimeout(() => {
      $('.list a').removeClass('active');
      $('#retailerenquiry').addClass('active');

      
    }, 20);
    this.aroute.queryParams.subscribe(params => {

      this.enquiry.type = this.aroute.snapshot.queryParams["type"];
      this.enquiry.status = this.aroute.snapshot.queryParams["status"];
      this.is_show_footer=false;
    //  alert(this.enquiry.status);
      if(this.enquiry.type=='new' || this.enquiry.type =='active'){
     //   alert('3');
     if(this.enquiry.type=='new'){
      this.enquiry.status='0';
    }
    else if(this.enquiry.type=='active'){
      this.enquiry.status='1';
    }
          this.onSwitchTab(this.enquiry.type);
          this.getNewEnquiryList();
     
          //this.getEnquiries(this.enquiry.type);
      }
      else  if(this.enquiry.type=='awarded' || this.enquiry.type =='delivered'){

        if(this.enquiry.type=='awarded'){
          this.enquiry.order_status='OS01';
        }
        else if(this.enquiry.type=='delivered'){
          this.enquiry.order_status='OS04';
        }
        this.onSwitchTab(this.enquiry.type);
        this.getOrders();
      }
     
    });

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

      if (this.enquiry.enquiries.length > 1 && this.is_show_footer==false) {
        //  this.global.setToast('info','Bottom reached');
        this.current_page = this.current_page + 1;
       // alert(this.enquiry.type);
        if(this.enquiry.type=='new' || this.enquiry.type =='active'){
          //   alert('3');
          if(this.enquiry.type=='new'){
           this.enquiry.status='0';
         }
         else if(this.enquiry.type=='active'){
           this.enquiry.status='1';
         } 
               this.getNewEnquiryList();
          
               //this.getEnquiries(this.enquiry.type);
           }
           else  if(this.enquiry.type=='awarded' || this.enquiry.type =='delivered'){
     
             if(this.enquiry.type=='awarded'){
               this.enquiry.order_status='OS01';
             }
             else if(this.enquiry.type=='delivered'){
               this.enquiry.order_status='OS04';
             }
          
             this.getOrders();
           }
      //  this.getNewEnquiryList();
 
      }


      // ajax call get data from server and append to the div
    }
  }.bind(this);
  $(window).on("scroll", this.handler);


  }

   
  
  getNewEnquiryList(){


    let data = "vendor_id=" + this.state.user.id + "&reply_status=" + this.enquiry.status+"&page="+this.current_page+"&per_page=1";
    console.log(data);
     this.loadingBar.start();
     this.api.getNewEnquiryList(data).subscribe(
       (response) => {
 
         let dt: any = response;
     console.log(dt);
         this.loadingBar.stop();
 
 
         if (dt.status == 200) {
 
        //    $('.page_name').show();
        //    $('.mainPage').fadeIn(500);
        let listing = dt.data;
       
        for (let i = 0; i < listing.length; i++) {
          this.enquiry.enquiries.push(listing[i]);
        }
        // let enquiries:any=dt.data;
        //    for (let i = 0; i < enquiries.length; i++) {
        //      this.enquiry.enquiries.push(enquiries[i]);
        //    }
        //    //  alert('3');
           if (this.enquiry.enquiries.length == 0) {
             this.isnodatafound = true;
             this.nodataobj.page = 'enquiry';
             this.nodataobj.txt = "No enquiry received";
           }
           else {
             this.isnodatafound = false;
           }
          //  this.enquiry.total_enquiries = dt.total_enquiries;
          //  this.enquiry.total_pending_enquiries = dt.total_pending_enquiries;
          //  this.enquiry.total_replied_enquiries = dt.total_replied_enquiries;
          //  this.enquiry.total_closed_enquiries = dt.total_closed_enquiries;
           //    this.respdata.mapping_type_list=dt.data.mapping_type_list;
 
 
          }
         else if (dt.status == 201   && this.current_page==1) {
           //     $('.page_name').hide();
           //  $('.mainPage').hide();
           this.isnodatafound = true;
           this.nodataobj.page = 'enquiry';
           this.nodataobj.txt = "No enquiry received";

          //  this.enquiry.total_enquiries = dt.total_enquiries;
          //  this.enquiry.total_pending_enquiries = dt.total_pending_enquiries;
          //  this.enquiry.total_replied_enquiries = dt.total_replied_enquiries;
          //  this.enquiry.total_closed_enquiries = dt.total_closed_enquiries;
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
    
       },
       (error) => {
 
         this.loadingBar.stop();
         //   this.spinnerService.hide();
         console.log('RESPONSE FAILED'); console.log(error)
       }
     );
  }

  getEnquiries(status) {

    let data = "?vendor_id=" + this.state.user.id + "&entry_type=Enquiry" + "&reply_status=" + status + "&enquiry_order_type=0"+ "&page=" + this.current_page+"&per_page=1"; // enquiry order type 0 for b2c and 1 for b to b
     console.log(data);
    this.loadingBar.start();
    this.api.getVendorEnquiryList(data).subscribe(
      (response) => {

        let dt: any = response;
   //   console.log(dt);
        this.loadingBar.stop();


        if (dt.status == 200) {

          $('.page_name').show();
          $('.mainPage').fadeIn(500);
       //   this.enquiry.enquiries = dt.data;
       let enquiries:any=dt.data;
          for (let i = 0; i < enquiries.length; i++) {
            this.enquiry.enquiries.push(enquiries[i]);
          }
          //  alert('3');
          if (this.enquiry.enquiries.length == 0) {
            this.isnodatafound = true;
            this.nodataobj.page = 'enquiry';
            this.nodataobj.txt = "No enquiry received";
          }
          else {
            this.isnodatafound = false;
          }
          this.enquiry.total_enquiries = dt.total_enquiries;
          this.enquiry.total_pending_enquiries = dt.total_pending_enquiries;
          this.enquiry.total_replied_enquiries = dt.total_replied_enquiries;
          this.enquiry.total_closed_enquiries = dt.total_closed_enquiries;
          //    this.respdata.mapping_type_list=dt.data.mapping_type_list;


        }
        else if (dt.status == 201   && this.current_page==1) {
          //     $('.page_name').hide();
          //  $('.mainPage').hide();
          this.isnodatafound = true;
          this.nodataobj.page = 'enquiry';
          this.nodataobj.txt = "No enquiry received";
          this.enquiry.total_enquiries = dt.total_enquiries;
          this.enquiry.total_pending_enquiries = dt.total_pending_enquiries;
          this.enquiry.total_replied_enquiries = dt.total_replied_enquiries;
          this.enquiry.total_closed_enquiries = dt.total_closed_enquiries;
        }

      },
      (error) => {

        this.loadingBar.stop();
        //   this.spinnerService.hide();
        console.log('RESPONSE FAILED'); console.log(error)
      }
    );

  }

  

  getOrders() {

    // /list_type=0 for sent and 1 for receive
    let data = "user_id=" + this.state.user.id + "&entry_type=Order" + "&list_type=1"+"&order_status="+this.enquiry.order_status+"&per_page=1";;

    this.loadingBar.start();
    this.api.getOrdersOrEnquires(data).subscribe(
      (response) => {
   

        let dt: any = response;

        console.log(dt);
          this.loadingBar.stop();


        if (dt.status == 200) {

          //    this.respdata.mapping_type_list=dt.data.mapping_type_list;

          $('.page_name').show();
          $('.mainPage').fadeIn(500);
          $('.orderListing').fadeIn();
          this.enquiry.enquiries = dt.data;

          if(this.enquiry.enquiries.length==0){
            this.isnodatafound = true;
            this.nodataobj.page = 'enquiry';
            this.nodataobj.txt = "No order received";
          }
          else{
            this.isnodatafound = false;
          }
          // this.respdata.total_cancelled=dt.total_cancelled;
          // this.respdata.total_delivered=dt.total_delivered;
          // this.respdata.total_on_the_way=dt.total_on_the_way;
          // this.respdata.total_open_order=dt.total_open_order;
          // this.respdata.total_ready_to_deliver=dt.total_ready_to_deliver;
          // this.respdata.total_returned=dt.total_returned;
          

        }
        else if (dt.status == 201) {
          this.isnodatafound = true;
          this.nodataobj.page = 'enquiry';
          this.nodataobj.txt = "No order received";
        }

      },
      (error) => {

        this.loadingBar.stop();
        //   this.spinnerService.hide();
        console.log('RESPONSE FAILED'); console.log(error)
      }
    );

  }

  onSwitchTab(type) {
    
    this.current_page = 1;
    this.enquiry.enquiries = [];
    //  this.getEnquiries(type);
    $('.orderTabs .list').removeClass('active');
    if (type == 'new') {
    
      this.router.navigate(['/chemist-account/retailer-enquiry'], { queryParams: { 'type': 'new'} });
      $('#type1').addClass('active');

    }
    else if (type == 'active' ) {
     // alert(this.aroute. url);
      this.router.navigate(['/chemist-account/retailer-enquiry'], { queryParams: { 'type': 'active' } });

      $('#type2').addClass('active');

    }
    else if (type == 'awarded') {

      this.router.navigate(['/chemist-account/retailer-enquiry'], { queryParams: { 'type': 'awarded' } });
      $('#type3').addClass('active');

    }
    else if (type == 'delivered') {

      this.router.navigate(['/chemist-account/retailer-enquiry'], { queryParams: { 'type': 'delivered' } });
      $('#type0').addClass('active');

    }
  }
  // onSwitchTab(type) {

  //   this.current_page = 1;
  //   this.enquiry.enquiries = [];
  //   //  this.getEnquiries(type);
  //   $('.orderTabs .list').removeClass('active');
  //   if (type == '0') {

  //     this.router.navigate(['/chemist-account/retailer-enquiry'], { queryParams: { 'type': '0' } });
  //     $('#type1').addClass('active');

  //   }
  //   else if (type == '') {

  //     this.router.navigate(['/chemist-account/retailer-enquiry'], { queryParams: { 'type': '' } });

  //     $('#type0').addClass('active');

  //   }
  //   else if (type == '1') {

  //     this.router.navigate(['/chemist-account/retailer-enquiry'], { queryParams: { 'type': '1' } });
  //     $('#type2').addClass('active');

  //   }
  //   else if (type == '2') {

  //     this.router.navigate(['/chemist-account/retailer-enquiry'], { queryParams: { 'type': '2' } });
  //     $('#type3').addClass('active');

  //   }
  // }

  onBuyEnquiry(enquiry) {

    // this.status.is_confirm_popup = false;
    // this.status.is_process = true;
    this.popup.onReceivePopupData({'type':'process','confirm_txt':'Please wait..we are processing your request','primary_btn_txt':'Yes, Confirm It','secondary_btn_txt':'Close It'});

    this.loadingBar.start();

    let data = "enquiry_id=" + enquiry.enquiry_id + "&vendor_id=" + this.state.user.id + "&enquiry_amount=" + enquiry.enquiry_bid_amount;

    this.api.buyInquiryByVendor(data).subscribe(
      (response) => {


        var dt: any = response;
        if (dt.status == "200") {

          //this.status.is_sent = true;
          this.popup.onReceivePopupData({ 'type': '' });
          this.popup.onReceivePopupData({'type':'success','sent_txt':dt.message,'primary_btn_txt':'Send Quotation','secondary_btn_txt':'Close'});
         
          setTimeout(() => {
            $('.btn').removeClass('full_w');
          }, 20);
           
          //     this.setParams(dt.data);
          // this.enquiry.enquiry_detail.bid_made='1';
          // this.global.setToast('info', dt.message);
          //   this.router.navigate(['/my-account/enquires']);

        }


        else if (dt.status == "201") {

          // this.status.is_sent = false;
          // this.status.is_error = true;
          // this.status.error_txt = dt.message;
          this.popup.onReceivePopupData({'type':'error','sent_txt':dt.message,'primary_btn_txt':'','secondary_btn_txt':'Close'});
          // this.global.setToast('error', dt.message);
        }


        this.loadingBar.stop();



      },
      (error) => {


        console.log('RESPONSE FAILED'); console.log(error)
      }
    );
  }


  onBuyNow(enquiry) {

    this.popup.onReceivePopupData({'type':'confirm','confirm_txt':'Are you sure to buy Enquiry- #' + enquiry.order_no + " for Rs." + enquiry.enquiry_bid_amount,'primary_btn_txt':'Confirm','secondary_btn_txt':'Close'});
    // this.status.confirm_txt = 'Are you sure to buy Enquiry-' + enquiry.order_no + " for Rs." + enquiry.enquiry_bid_amount;

     //this.enquiry.confirm_enquiry_id = enquiry.order_no;
    // this.status.is_confirm_popup = true;

  }
  onConfirmDelivery(order){

    console.log(order);
    console.log(this.respdata.is_confirm_delivery);
    if(this.respdata.is_confirm_delivery){

      this.respdata.is_confirm_delivery=!this.respdata.is_confirm_delivery;

    }
    else{
      this.respdata.selected_order_id=order.order_id;
      this.respdata.is_confirm_delivery=true;
      this.loadInputJS();
    }
    
  }
  handlePinPopupButtons(type){

    if(type=='retry'){

      this.confirm_pin.is_sent=false;
      this.confirm_pin.is_error=false;
      this.confirm_pin.is_process=false;
      this.respdata.is_confirm_delivery=true;
      
    }
    else  if(type=='close'){

      this.confirm_pin.is_process=false;
      this.respdata.is_confirm_delivery=false;
      this.getOrders();
    }
  }
  onConfirmOTP(){
 
    this.respdata.is_confirm_delivery=false;
     this.confirm_pin.is_process=true;
     this.popup.onReceivePopupData({'type':'process','confirm_txt':'Please wait..we are validating Delivery PIN','primary_btn_txt':'','secondary_btn_txt':''});
  //  this.confirm_pin.is_sent=true;
   // this.confirm_pin.is_process=false;
 //   this.confirm_pin.is_error=true;
    let selectedorder=this.enquiry.enquiries.filter(elem=>{return elem.order_id == this.respdata.selected_order_id});
    let orderid=selectedorder[0].order_id;
      let customer_id=selectedorder[0].customer_id;
    let delivery_pin=$('#confirm_otp').val();
     let data = "order_id=" + orderid + "&delivery_pin="+delivery_pin + "&vendor_id="+this.state.user.id+"&customer_id="+customer_id;
    //console.log(data);
    // this.loadingBar.start();
    this.api.onConfirmDelivery(data).subscribe(
      (response) => {
       
        this.popup.onReceivePopupData({'type':''});
        let dt: any = response;

        this.loadingBar.stop();


        if (dt.status == 200) {

          this.popup.onReceivePopupData({'type':'success2','sent_txt':'PIN Verified successfully','primary_btn_txt':'','secondary_btn_txt':'Close'});
          this.confirm_pin.is_sent=true;
          this.confirm_pin.is_error=false;

        }
        else if (dt.status == 201) {

          
          
           this.confirm_pin.is_sent=true;
           this.confirm_pin.is_error=true;
           this.popup.onReceivePopupData({'type':'error','sent_txt':dt.message,'primary_btn_txt':'','secondary_btn_txt':'Close'});          
        }
     
      },
      (error) => {

        this.loadingBar.stop();
        //   this.spinnerService.hide();
        console.log('RESPONSE FAILED'); console.log(error)
      }
    );


  }

  onClose(type, mode) {

    if (type == 'confirmprocess' && mode == 'cancel') {
      this.status.is_confirm_popup = false;
    }
    else if (type == 'confirmprocess' && mode == 'confirm') {

      let myenqiury: any = this.enquiry.enquiries.filter(elem => { return this.enquiry.confirm_enquiry_id == elem.order_no });
      if (myenqiury.length > 0) {
        this.onBuyEnquiry(myenqiury[0]);
      }
      else {
        this.global.setToast('error', 'Some error occurred , please try after some time');
      }


      //this.onBuyEnquiry(enquiry);
    }
    else if (type == 'enquiryprocess' && mode == 'close') {

      this.status.is_process = false;
      this.status.is_confirm_popup = false;
      this.getEnquiries('');
      //this.onBuyEnquiry(enquiry);
    }
    else if (type == 'enquiryprocess' && mode == 'sendquotation') {

      let myenqiury: any = this.enquiry.enquiries.filter(elem => { return this.enquiry.confirm_enquiry_id == elem.order_no });
      this.router.navigate(['/chemist-account/retailer-enquiry-detail'], { queryParams: { 'enquiryid': myenqiury[0].enquiry_id, 'replystatus': myenqiury[0].reply_status, 'enquirytype': myenqiury[0].enquiry_order_type } })

      //this.onBuyEnquiry(enquiry);
    }
    else if (type == 'errorprocess' && mode == 'close') {

      this.status.is_process = false;
      this.status.is_confirm_popup = false;
      this.getEnquiries('');

      //this.onBuyEnquiry(enquiry);
    }
    else if (type == 'errorprocess' && mode == 'addmoneytowallet') {


      this.router.navigate(['/chemist-account/my-wallet'])

      //this.onBuyEnquiry(enquiry);
    }
  }

  toggleViewDetail() {

    this.showdetail = !this.showdetail;

  }

  onSearchQueryHandler() {

    if (this.enquiry.query == '') {

    }
    else {
      //console.log(this.enquiry.query);
      let data = "?vendor_id=" + this.state.user.id + "&entry_type=Enquiry" + "&reply_status=&enquiry_order_type=0" + "&key=" + this.enquiry.query; // enquiry order type 0 for b2c and 1 for b to b
     // console.log(data);
      this.loadingBar.start();
      this.api.getVendorEnquiryList(data).subscribe(
        (response) => {

          let dt: any = response;
       //   console.log(dt);
          this.loadingBar.stop();


          if (dt.status == 200) {

            $('.page_name').show();
            $('.mainPage').fadeIn(500);
            this.enquiry.enquiries = dt.data;

            //  alert('3');
            if (this.enquiry.enquiries.length == 0) {
              this.isnodatafound = true;
              this.nodataobj.page = 'enquiry';
              this.nodataobj.txt = "No record found";
            }
            else {
              this.isnodatafound = false;
            }
            this.enquiry.total_enquiries = dt.total_enquiries;
            this.enquiry.total_pending_enquiries = dt.total_pending_enquiries;
            this.enquiry.total_replied_enquiries = dt.total_replied_enquiries;
            this.enquiry.total_closed_enquiries = dt.total_closed_enquiries;
            //    this.respdata.mapping_type_list=dt.data.mapping_type_list;
            this.router.navigate(['/chemist-account/retailer-enquiry'],{queryParams:{'type':''}});

          }
          else if (dt.status == 201) {
            //     $('.page_name').hide();
            //  $('.mainPage').hide();
            this.isnodatafound = true;
            this.nodataobj.page = 'enquiry';
            this.nodataobj.txt = "No record found";
            this.enquiry.total_enquiries = dt.total_enquiries;
            this.enquiry.total_pending_enquiries = dt.total_pending_enquiries;
            this.enquiry.total_replied_enquiries = dt.total_replied_enquiries;
            this.enquiry.total_closed_enquiries = dt.total_closed_enquiries;
          }

        },
        (error) => {

          this.loadingBar.stop();
          //   this.spinnerService.hide();
          console.log('RESPONSE FAILED'); console.log(error)
        }
      );


    }


  }

  viewItemDetail(item:any){

   // console.log(item);
    
    if(!this.showdetail){
      this.showdetail=true;
            //console.log(this.enquiry.query);
            let data = "vendor_id=" + this.state.user.id + "&order_id=" + item.order_no; // enquiry order type 0 for b2c and 1 for b to b
        //    console.log(data);
            this.loadingBar.start();
            this.api.showProductDetail(data).subscribe(
              (response) => {
      
                let dt: any = response;
             //   console.log(dt);
                this.loadingBar.stop();
      
      
                if (dt.status == 200) {
      
                  this.itemdetail=dt.data;

      
                }
                else if (dt.status == 201) {
                  //     $('.page_name').hide();
                  //  $('.mainPage').hide();
              
                }
      
              },
              (error) => {
      
                this.loadingBar.stop();
                //   this.spinnerService.hide();
                console.log('RESPONSE FAILED'); console.log(error)
              }
            );
      
    }
    else{

      this.showdetail=false;
    }

       
  
  
      }
  
      ngOnDestroy(){

        $(window).off("scroll", this.handler);
      }
  
      onPopupActionReceived(obj:any) {
        //  console.log(obj);
          if(obj.mode=='error'){
      
            if (obj.type == 0) {
      
              this.popup.onReceivePopupData({ 'type': '' });
             
            }
            else if (obj.type == 1) {
      
              this.popup.onReceivePopupData({ 'type': '' });
             // this.status.is_order_confirmed=1;
              //this.onSubmitEnquiry();
              //on primary btn clicked...
        
            }
       
          }
          if(obj.mode=='confirm'){
      
            if (obj.type == 0) {
      
              this.popup.onReceivePopupData({ 'type': '' });
             
            }
            else if (obj.type == 1) {
      
              this.popup.onReceivePopupData({ 'type': '' });
              let myenqiury: any = this.enquiry.enquiries.filter(elem => { return this.enquiry.confirm_enquiry_id == elem.order_no });
              console.log(this.enquiry.enquiries);
              if (myenqiury.length > 0) {
                this.onBuyEnquiry(myenqiury[0]);
              }
              else {
                this.global.setToast('error', 'Some error occurred , please try after some time');
              }
             // this.status.is_order_confirmed=1;
              //this.onSubmitEnquiry();
              //on primary btn clicked...
        
            }
       
          }
          else if(obj.mode=='success'){
          
            if (obj.type == 0) {
      
              //Go To Order
             this.getNewEnquiryList();
              this.popup.onReceivePopupData({ 'type': '' });
              
            //  this.onRedirect('my-enquiries');
            }
            else if (obj.type == 1) {

              let myenqiury: any = this.enquiry.enquiries.filter(elem => { return this.enquiry.confirm_enquiry_id == elem.order_no });
              this.router.navigate(['/chemist-account/retailer-enquiry-detail'], { queryParams: { 'enquiryid': myenqiury[0].enquiry_id, 'replystatus': myenqiury[0].reply_status, 'enquirytype': myenqiury[0].enquiry_order_type } })
            //  this.onRedirect('home')
              //on primary btn clicked...
        
            }
          }
          else if(obj.mode=='success2'){
          
            if (obj.type == 0) {
      
              //Go To Order
              this.getNewEnquiryList();
              this.popup.onReceivePopupData({ 'type': '' });
              
            //  this.onRedirect('my-enquiries');
            }
            else if (obj.type == 1) {

              
              this.popup.onReceivePopupData({ 'type': '' });
            //  this.onRedirect('home')
              //on primary btn clicked...
        
            }
          }
      
          //console.log(event);
        }

        loadInputJS(){

          $(".style .input").on('click keypress',function(){
            $(this).parent(".style").addClass("inpActive");
                    
            $(this).blur(function(){
              var getitemval=$(this).val();						
                if(getitemval==''){
                  $(this).parent(".style").removeClass("inpActive");
                }
            
            });
                if ($(".form_list  .input").val() == '') {
                  $(".form_list  .style").removeClass("inpActive");
                }
                else {
                  $(".form_list  .style").addClass("inpActive");
                }
            
          });

        }
}
