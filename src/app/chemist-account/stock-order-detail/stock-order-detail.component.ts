import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { Api } from '../../api.service';
import { AppGlobals } from '../../app.global';
import { PopupComponent } from '../../popup/popup.component';

declare var classie: any;
declare var $: any;
@Component({
  selector: 'app-stock-order-detail',
  templateUrl: './stock-order-detail.component.html',
  styleUrls: ['./stock-order-detail.component.css']
})
export class StockOrderDetailComponent implements OnInit {

  state: any;
  respdata: any = {

    'order_data': {
      'app_confirm_flag': '', 'delivery_charge': '', 'delivery_date': '', 'delivery_time': '', 'vendor_id': '',
      'grand_total': '', 'order_date': '', 'order_id': '', 'order_no': '', 'order_status': '', 'sub_total': '', 'vendor_billing_amount': '',
      'total_discount': '', 'total_tax': '', 'vendor_name': '', 'vendor_mobile_number': '', 'vendor_address': '', 'vendor_area': '', 'net_payble_amount': '',
      'total_apc_discount_amount': '', 'delivery_type': '', 'apc_cash_used': '', 'delivery_pin': '', 'modify_access': '', 'enquiry_id': '','customer_id':'','direct_enquiry':''
    },
    'product_data': [],
    'address_data': { 'address': '', 'area': '', 'city': '', 'full_name': '', 'state': '', 'pincode': '', 'mobile': '', 'landmark': '', 'user_relation_name': '' },
    'ordertype': ''
  }
  @ViewChild('popupchild') popup: PopupComponent;

  constructor(private api: Api, private loadingBar: LoadingBarService, public global: AppGlobals, private router: Router, private aroute: ActivatedRoute) { this.state = this.global.getAppState(); }

  ngOnInit() {


    let orderid = this.aroute.snapshot.queryParams["id"];
    this.respdata.ordertype = this.aroute.snapshot.queryParams["type"];
    setTimeout(() => {
      $('.list a').removeClass('active');
      $('#stockorders').addClass('active');
    }, 20);
    this.getOrderDetailById(orderid);

  }

  getOrderDetailById(orderid) {


    this.loadingBar.start();
    let data = "user_id=" + this.state.user.id + "&order_id=" + orderid + "&entry_type=" + this.respdata.ordertype;

    this.api.getOrderOrEnquiryDetail(data).subscribe(
      (response) => {


        var dt: any = response;
        console.log(dt);
        if (dt.status == "200") {

          this.setParams(dt);
        }


        else if (dt.status == "201") {

          //   history.go(-1);
          //  this.global.setToast('error',this.global.toastmsg.login_invalid);

        }
        //  console.log(dt);

        this.loadingBar.stop();



      },
      (error) => {

        //   $('.preloader').fadeOut();
        //   this.spinnerService.hide();
        console.log('RESPONSE FAILED'); console.log(error)
      }
    );

  }

  setParams(dt) {

    this.respdata.order_data.app_confirm_flag = dt.order_data.app_confirm_flag;
    this.respdata.order_data.delivery_charge = dt.order_data.delivery_charge;
    this.respdata.order_data.delivery_date = dt.order_data.delivery_date;
    this.respdata.order_data.delivery_time = dt.order_data.delivery_time;
    this.respdata.order_data.grand_total = dt.order_data.grand_total;
    this.respdata.order_data.order_date = dt.order_data.order_date;
    this.respdata.order_data.order_id = dt.order_data.order_id;
    this.respdata.order_data.order_no = dt.order_data.order_no;
    this.respdata.order_data.order_status = dt.order_data.order_status;
    this.respdata.order_data.sub_total = dt.order_data.sub_total;
    this.respdata.order_data.total_discount = dt.order_data.total_discount;
    this.respdata.order_data.total_tax = dt.order_data.total_tax;
    this.respdata.order_data.vendor_name = dt.order_data.vendor_name;
    this.respdata.order_data.vendor_mobile_number = dt.order_data.vendor_mobile_number;
    this.respdata.order_data.vendor_address = dt.order_data.vendor_address;
    this.respdata.order_data.vendor_area = dt.order_data.vendor_area;
    this.respdata.order_data.net_payble_amount = dt.order_data.net_payble_amount;
    this.respdata.order_data.total_apc_discount_amount = dt.order_data.total_apc_discount_amount;
    this.respdata.order_data.delivery_type = dt.order_data.delivery_type;
    this.respdata.order_data.apc_cash_used = dt.order_data.apc_cash_used;
    this.respdata.order_data.vendor_billing_amount = dt.order_data.vendor_billing_amount;
    this.respdata.order_data.delivery_pin = dt.order_data.delivery_pin;
    this.respdata.order_data.customer_id = dt.order_data.customer_id;
    this.respdata.order_data.direct_enquiry = dt.order_data.direct_enquiry;
    
    this.respdata.order_data.modify_access = dt.order_data.modify_access;
    this.respdata.order_data.enquiry_id = dt.order_data.enquiry_id;
    console.log(this.respdata.order_data.enquiry_id);
    this.respdata.order_data.vendor_id = dt.order_data.vendor_id;


    this.respdata.product_data = dt.product_data;

    this.respdata.address_data.address = dt.address_data.address;
    this.respdata.address_data.area = dt.address_data.area;
    this.respdata.address_data.city = dt.address_data.city;
    this.respdata.address_data.full_name = dt.address_data.full_name;
    this.respdata.address_data.state = dt.address_data.state;
    this.respdata.address_data.pincode = dt.address_data.pincode;
    this.respdata.address_data.mobile = dt.address_data.mobile;
    this.respdata.address_data.landmark = dt.address_data.landmark;
    this.respdata.address_data.user_relation_name = dt.address_data.user_relation_name;


    $("html, body").animate({ scrollTop: 0 }, "slow");


  }

  onCancelOrder(enquiry) {

    this.popup.onReceivePopupData({ 'type': 'confirm', 'confirm_txt': 'Are you sure to cancel ORDER ID:- #' + this.respdata.order_data.order_no, 'primary_btn_txt': 'Yes, Cancel It', 'secondary_btn_txt': 'No, Close It' });
  }
  onConfirmCancelOrder() {
    let data = "user_id=" + this.state.user.id + "&order_id=" + this.respdata.order_data.order_id + "&entry_type=" + this.respdata.ordertype; // enquiry order type 0 for b2c and 1 for b to b
    console.log(data);
    this.loadingBar.start();
    this.api.onCancelOrder(data).subscribe(
      (response) => {

        let dt: any = response;
        console.log(dt);

        this.loadingBar.stop();


        if (dt.status == 200) {

          this.popup.onReceivePopupData({ 'type': '' });
          this.popup.onReceivePopupData({ 'type': 'success', 'sent_txt': 'Order cancelled successfully.!', 'primary_btn_txt': '', 'secondary_btn_txt': 'Close' });


          //   this.getEnquires();
          //  this.itemdetail=dt.data;


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

  onPopupActionReceived(obj: any) {
    console.log(obj);
    if (obj.mode == 'confirm') {

      if (obj.type == 0) {

        this.popup.onReceivePopupData({ 'type': '' });

      }
      else if (obj.type == 1) {

        this.onConfirmCancelOrder();
        this.popup.onReceivePopupData({ 'type': '' });
        this.popup.onReceivePopupData({ 'type': 'process', 'confirm_txt': 'Please wait.. We are cancelling your order.!', 'primary_btn_txt': 'Yes, Confirm It', 'secondary_btn_txt': 'Close It' });
        //this.removeFromFavourites();
        //on primary btn clicked...

      }

    }
    else  if (obj.mode == 'confirm2') {

      if (obj.type == 0) {

        this.popup.onReceivePopupData({ 'type': '' });

      }
      else if (obj.type == 1) {

        
        this.popup.onReceivePopupData({ 'type': '' });
        this.popup.onReceivePopupData({ 'type': 'process', 'confirm_txt': 'Please wait.. We are processing your request.!', 'primary_btn_txt': '', 'secondary_btn_txt': '' });
        this.onUpdateOrderModifyAcess();
        //this.removeFromFavourites();
        //on primary btn clicked...

      }

    }
    else if (obj.mode == 'success') {

      if (obj.type == 0) {


        this.router.navigate(['/my-account/orders']);
        //  this.popup.onReceivePopupData({ 'type': '' });
        //Go To Order
        //  this.onRedirect('home')

      }
      else if (obj.type == 1) {

        //   this.popup.onReceivePopupData({ 'type': '' });
        //  this.onRedirect('my-enquiries');
        //on primary btn clicked...

      }
    }
    else if (obj.mode == 'success2') {

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

  onAllowOrderModification() {

    this.popup.onReceivePopupData({ 'type': 'confirm2', 'confirm_txt': 'Are you sure to allow modifcation access for Order: #' + this.respdata.order_data.order_no, 'primary_btn_txt': 'Confirm', 'secondary_btn_txt': 'Close' });


   
  }

  onUpdateOrderModifyAcess() {

    //user_id=5&order_id=1353&enquiry_id=undefined&vendor_id=undefined&modify_access=1


    let data = "user_id=" + this.state.user.id + "&order_id=" + this.respdata.order_data.order_id + "&enquiry_id=" + this.respdata.order_data.enquiry_id
      + "&vendor_id=" + this.respdata.order_data.vendor_id + "&modify_access=1";
    console.log(data);
    this.loadingBar.start();

    this.api.updateOrderModifyAcess(data).subscribe(
      (response) => {

        let dt: any = response;
        console.log(dt);

        this.loadingBar.stop();


        if (dt.status == 200) {

          this.popup.onReceivePopupData({ 'type': '' });
          this.popup.onReceivePopupData({ 'type': 'success2', 'sent_txt': 'Access granted successfully.!', 'primary_btn_txt': '', 'secondary_btn_txt': 'Close' });
          this.respdata.order_data.modify_access='1';

          //   this.getEnquires();
          //  this.itemdetail=dt.data;


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

  viewModifiedOrder(){
   // view-modify-order
    this.router.navigate(['/my-account/view-modify-order'],{queryParams:{oid:this.respdata.order_data.order_id,vid:this.respdata.order_data.vendor_id,deq:this.respdata.order_data.direct_enquiry}});
  }
}
