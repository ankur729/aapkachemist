import { Component, OnInit, Output } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { Api } from '../../api.service';
import { AppGlobals } from '../../app.global';
declare var classie: any;
declare var $: any;


@Component({
  selector: 'app-retailer-orders',
  templateUrl: './retailer-orders.component.html',
  styleUrls: ['./retailer-orders.component.css']
})
export class RetailerOrdersComponent implements OnInit {

  state: any;
  respdata: any = {
    'allorders': [],
    'type':'',
    'total_cancelled':'0',
    'total_delivered':'0',
    'total_on_the_way':'0',
    'total_open_order':'0',
    'total_ready_to_deliver':'0',
    'total_returned':'0',
    'is_confirm_delivery':false,
    'selected_order_id':''
  };

  status: any = { 'is_process': false, 'is_sent': false, 'process_txt': 'Please wait..we are processing your request.!', 'sent_txt': 'Status updated successfully.!','error_txt':'',
  'is_confirm_popup':false, 'confirm_txt':'','is_error':false,'selected_order_no':'','updateorderto':'',
  'order_status':{'confirm':'OS01','ready_to_del':'OS02','on_the_way':'OS03','delivered':'OS04'}};

  confirm_pin:any={
    'is_process': false, 'is_sent': false, 'process_txt': 'Please wait..we are verifying PIN!', 'sent_txt': 'PIN confirmed successfully','error_txt':'Invalid PIN.!',
    'is_confirm_popup':false, 'confirm_txt':'','is_error':false,'selected_order_no':'','updateorderto':'',
  }


  ordertxt:any={

    'ready_to_del':'Are you sure to change status [Ready to delivery] for order no: #',
    'on_the_way':'Are you sure to change status [On the Way] for order no: #',
    'delivered':'Are you sure to change status [Delivered] for order no: #',
 
    
  }
  isnodatafound: boolean = false;

  @Output() nodataobj: any = { 'page': '', 'txt': '' };

  constructor(private api: Api, private loadingBar: LoadingBarService, public global: AppGlobals, private router: Router, private aroute: ActivatedRoute) { this.state = this.global.getAppState(); }

  ngOnInit() {

    $('.page_name').hide();
    $('.mainPage').hide();
   
 

    $("html, body").animate({ scrollTop: 0 }, "slow");
    setTimeout(() => {
      $('.list a').removeClass('active');
      $('#retailerorders').addClass('active');
    }, 20);

    this.aroute.queryParams.subscribe(params => {
      
      this.respdata.type = this.aroute.snapshot.queryParams["type"];
  
      this.onSwitchTab(this.respdata.type);
      this.getOrders();
    });

  }

  getOrders() {

    // /list_type=0 for sent and 1 for receive
    let data = "user_id=" + this.state.user.id + "&entry_type=Order" + "&list_type=1"+"&order_status="+this.respdata.type;

    this.loadingBar.start();
    this.api.getOrdersOrEnquires(data).subscribe(
      (response) => {
   

        let dt: any = response;

        this.loadingBar.stop();


        if (dt.status == 200) {

          //    this.respdata.mapping_type_list=dt.data.mapping_type_list;

          $('.page_name').show();
          $('.mainPage').fadeIn(500);
          $('.orderListing').fadeIn();
          this.respdata.allorders = dt.data;

          if(this.respdata.allorders.length==0){
            this.isnodatafound = true;
            this.nodataobj.page = 'enquiry';
            this.nodataobj.txt = "No order received";
          }
          else{
            this.isnodatafound = false;
          }
          this.respdata.total_cancelled=dt.total_cancelled;
          this.respdata.total_delivered=dt.total_delivered;
          this.respdata.total_on_the_way=dt.total_on_the_way;
          this.respdata.total_open_order=dt.total_open_order;
          this.respdata.total_ready_to_deliver=dt.total_ready_to_deliver;
          this.respdata.total_returned=dt.total_returned;
          

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

  onUpdateOrderStatus(order){

    let status:any=order.order_status;

    if(status == 'OS01'){

      this.status.is_confirm_popup=true;
      this.status.confirm_txt=this.ordertxt.ready_to_del+" "+order.order_no;
      this.status.selected_order_no=order.order_no;
      this.status.updateorderto=this.status.order_status.ready_to_del;
   //   this.updateOrderStatus(order,'OS02');
    }
    else  if(status == 'OS02'){
      
      this.status.is_confirm_popup=true;
      this.status.confirm_txt=this.ordertxt.on_the_way+" "+order.order_no;
      this.status.selected_order_no=order.order_no;
      this.status.updateorderto=this.status.order_status.on_the_way;
   //   this.updateOrderStatus(order,'OS03');
    }
    else  if(status == 'OS03'){
      this.status.is_confirm_popup=true;
      this.status.confirm_txt=this.ordertxt.delivered+" "+order.order_no;
      this.status.selected_order_no=order.order_no;
      this.status.updateorderto=this.status.order_status.delivered;
     // this.updateOrderStatus(order,'OS04');

    }
    // else  if(status == 'OS03'){
      
    // }
    // else  if(status == 'OS04'){
      
    // }

  }

  updateOrderStatus(order,status) {

    // /list_type=0 for sent and 1 for receive
    let data = "order_id=" + order.order_id + "&order_status="+status;

    this.status.is_confirm_popup=false;
    this.status.is_process=true;
    this.loadingBar.start();
    this.api.updateOrderStatus(data).subscribe(
      (response) => {
        

        let dt: any = response;

        this.loadingBar.stop();

       

        if (dt.status == 200) {
         
          this.status.is_sent=true;

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

  onSwitchTab(mode){

   
    $('.list').removeClass('active');
    if(mode == this.status.order_status.confirm){

      $('#order_open').addClass('active');
      this.router.navigate(['/chemist-account/retailer-orders'],{queryParams:{'type':this.status.order_status.confirm}})
      $('.orderListing').fadeOut();
    }
    else  if(mode ==this.status.order_status.ready_to_del){

      $('#order_readytodel').addClass('active');
      this.router.navigate(['/chemist-account/retailer-orders'],{queryParams:{'type':this.status.order_status.ready_to_del}});
      $('.orderListing').fadeOut();
    }
    else  if(mode ==this.status.order_status.on_the_way){

      $('#order_ontheway').addClass('active');
      this.router.navigate(['/chemist-account/retailer-orders'],{queryParams:{'type':this.status.order_status.on_the_way}});
      $('.orderListing').fadeOut();
    }
    else  if(mode == this.status.order_status.delivered){
      $('#order_delivered').addClass('active');
      this.router.navigate(['/chemist-account/retailer-orders'],{queryParams:{'type':this.status.order_status.delivered}});
      $('.orderListing').fadeOut();
      
    }
  }
  onClose(type,mode){

    if(type=='confirmprocess' && mode=='cancel'){
     
      this.status.is_confirm_popup=false;

    }
    else if(type=='confirmprocess' && mode=='confirm'){
      
      
      let myorder:any=this.respdata.allorders.filter(elem=>{return this.status.selected_order_no==elem.order_no});
   
      
      if(myorder.length>0){
        this.updateOrderStatus(myorder[0],this.status.updateorderto);
      }
      else{
        this.global.setToast('error','Some error occurred , please try after some time');
      }
      //this.onBuyEnquiry(enquiry);
    }
    else if(type=='enquiryprocess' && mode=='close'){

      this.status.is_process=false;
      this.getOrders();
      //this.onBuyEnquiry(enquiry);
    }
    else if(type=='enquiryprocess' && mode=='sendquotation'){

      //this.onBuyEnquiry(enquiry);
    }
    else if(type=='errorprocess' && mode=='close'){


      //this.onBuyEnquiry(enquiry);
    }
    else if(type=='errorprocess' && mode=='addmoneytowallet'){

      
      this.router.navigate(['/chemist-account/my-wallet'])

      //this.onBuyEnquiry(enquiry);
    }
  }

  onConfirmDelivery(order){

    if(this.respdata.is_confirm_delivery){

      this.respdata.is_confirm_delivery=!this.respdata.is_confirm_delivery;

    }
    else{
      this.respdata.selected_order_id=order.order_id;
      this.respdata.is_confirm_delivery=true;
    }
    
  }

  onConfirmOTP(){

    this.respdata.is_confirm_delivery=false;
     this.confirm_pin.is_process=true;

  //  this.confirm_pin.is_sent=true;
   // this.confirm_pin.is_process=false;
 //   this.confirm_pin.is_error=true;
    let selectedorder=this.respdata.allorders.filter(elem=>{return elem.order_id == this.respdata.selected_order_id});
    let orderid=selectedorder[0].order_id;
      let customer_id=selectedorder[0].customer_id;
    let delivery_pin=$('#confirm_otp').val();
     let data = "order_id=" + orderid + "&delivery_pin="+delivery_pin + "&vendor_id="+this.state.user.id+"&customer_id="+customer_id;

    // this.loadingBar.start();
    this.api.onConfirmDelivery(data).subscribe(
      (response) => {
       

        let dt: any = response;

        this.loadingBar.stop();


        if (dt.status == 200) {

          this.confirm_pin.is_sent=true;
          this.confirm_pin.is_error=false;

        }
        else if (dt.status == 201) {

          
          
           this.confirm_pin.is_sent=true;
           this.confirm_pin.is_error=true;
        }

      },
      (error) => {

        this.loadingBar.stop();
        //   this.spinnerService.hide();
        console.log('RESPONSE FAILED'); console.log(error)
      }
    );


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
}
