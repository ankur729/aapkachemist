import { Component, OnInit,ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { Api } from '../../api.service';
import { AppGlobals } from '../../app.global';
import { PopupComponent } from '../../popup/popup.component';

declare var classie: any;
declare var $: any;


@Component({
  selector: 'app-retailer-enquiry-detail',
  templateUrl: './retailer-enquiry-detail.component.html',
  styleUrls: ['./retailer-enquiry-detail.component.css']
})
export class RetailerEnquiryDetailComponent implements OnInit {

  state: any;
  //enquiry:any={'enquiryid':undefined,'reply_status':undefined};
  enquiry: any = {

    'enquiry_detail': { 'enquiryid': undefined, 'vendor_id': '', 'order_no': '', 'order_date': '', 'payment_method': '', 'delivery_type': '', 'delivery_time': '', 'delivery_date': '', 'grand_total': '', 'reply_status': undefined, 'subtotal': 0.0, 'discount_amt': 0, 'delivery_charge': 0, 'final_amount': 0, 'temptotal': 0, 'enquiry_order_type': 0, 'entered_enquiry_amount': 0, 'entered_enquiry_amount_fixed': 0, 'sub_total': 0, 'discount_percent': 0, 'bid_made': '', 'enquiry_bid_amount': '', 'area': '', 'total_discount': '', 'customer_discount': '', 'enquiry_original_grand_total': '', 'vendor_cashback_amount': '', 'apc_contribution_to_discount': '','net_payble_amount':'','apc_cash_used':'','vendor_billing_amount':'' ,'vendor_distance':''},
    'enquiry_item_detail': [],
    'shipping_detail': { 'name': '', 'address': '' },
    'lead_display_flag': '',
    'total_item_discounted_amount': 0,
    'discount_display_flag': '',
  };

  status: any = {
    'is_process': false, 'is_sent': false, 'process_txt': 'Please wait..we are sending your quotation.!', 'sent_txt': 'Your quotation sent successfully.!',
    'is_confirm_popup': false, 'confirm_txt': 'Are you sure to submit your quotation ?'
  };
  @ViewChild('popupchild') popup: PopupComponent;
  constructor(private api: Api, private loadingBar: LoadingBarService, public global: AppGlobals, private router: Router, private aroute: ActivatedRoute) { this.state = this.global.getAppState(); }

  ngOnInit() {

    this.aroute.queryParams.subscribe(params => {


      this.enquiry.enquiry_detail.enquiryid = this.aroute.snapshot.queryParams["enquiryid"];
      this.enquiry.enquiry_detail.reply_status = this.aroute.snapshot.queryParams["replystatus"];
      this.enquiry.enquiry_detail.enquiry_order_type = this.aroute.snapshot.queryParams["enquirytype"];
      $('.right_pannel').hide();
      this.getVendorEnquiryDetail();
    });



    $("html, body").animate({ scrollTop: 0 }, "slow");
    setTimeout(() => {
      $('.list a').removeClass('active');
      $('#retailerenquiry').addClass('active');
    }, 20);

  }

  getVendorEnquiryDetail() {

    let data = "enquiry_id=" + this.enquiry.enquiry_detail.enquiryid + "&reply_status=" + this.enquiry.enquiry_detail.reply_status + "&enquiry_order_type=" + this.enquiry.enquiry_detail.enquiry_order_type;

    this.loadingBar.start();
    this.api.getVendorEnquiryDetail(data).subscribe(
      (response) => {

        let dt: any = response;
        console.log(dt);
        this.loadingBar.stop();


        if (dt.status == 200) {

          this.setParmas(dt);
          $('.right_pannel').fadeIn(500);
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

  setParmas(dt) {

    this.enquiry.enquiry_detail.order_no = dt.data.enquiry_detail.order_no;
    this.enquiry.enquiry_detail.order_date = dt.data.enquiry_detail.order_date;
    this.enquiry.enquiry_detail.delivery_date = dt.data.enquiry_detail.delivery_date;
    this.enquiry.enquiry_detail.delivery_time = dt.data.enquiry_detail.delivery_time;
    this.enquiry.enquiry_detail.delivery_type = dt.data.enquiry_detail.delivery_type;
    this.enquiry.enquiry_detail.enquiry_id = dt.data.enquiry_detail.enquiry_id;
    this.enquiry.enquiry_detail.grand_total = dt.data.enquiry_detail.grand_total;
    this.enquiry.enquiry_detail.payment_method = dt.data.enquiry_detail.payment_method;
    this.enquiry.enquiry_detail.delivery_charge = dt.data.enquiry_detail.delivery_charge;
    this.enquiry.enquiry_detail.final_amount = dt.data.enquiry_detail.grand_total;
    this.enquiry.enquiry_detail.bid_made = dt.data.enquiry_detail.bid_made;
    this.enquiry.enquiry_detail.enquiry_bid_amount = dt.data.enquiry_detail.enquiry_bid_amount;
    this.enquiry.enquiry_detail.vendor_id = dt.data.enquiry_detail.vendor_id;
    this.enquiry.enquiry_detail.area = dt.data.enquiry_detail.area;
    this.enquiry.enquiry_detail.order_id = dt.data.enquiry_detail.order_id;
    this.enquiry.enquiry_detail.enquiry_original_grand_total = dt.data.enquiry_detail.enquiry_original_grand_total;
    this.enquiry.enquiry_detail.vendor_cashback_amount = parseFloat(dt.data.enquiry_detail.vendor_cashback_amount);
    this.enquiry.enquiry_detail.net_payble_amount = dt.data.enquiry_detail.net_payble_amount;
    this.enquiry.enquiry_detail.apc_cash_used = parseFloat(dt.data.enquiry_detail.apc_cash_used);
    this.enquiry.enquiry_detail.vendor_billing_amount = dt.data.enquiry_detail.vendor_billing_amount;
    this.enquiry.enquiry_detail.vendor_distance=dt.data.enquiry_detail.vendor_distance;
      
    // this.enquiry.enquiry_detail.total_apc_discount_amount=dt.data.enquiry_detail.total_apc_discount_amount;
    this.enquiry.enquiry_detail.total_apc_discount_amount = this.getAPCContributionDiscount(dt.data.enquiry_item_detail);
    console.log(this.enquiry.enquiry_detail.total_apc_discount_amount);
    this.enquiry.enquiry_detail.total_discount = dt.data.enquiry_detail.total_discount;
    this.enquiry.shipping_detail.name = dt.data.shipping_detail.name;
    this.enquiry.shipping_detail.address = dt.data.shipping_detail.address;

    this.enquiry.lead_display_flag = dt.lead_display_flag;
    this.enquiry.discount_display_flag = dt.discount_display_flag;

    this.enquiry.total_item_discounted_amount = dt.total_item_discounted_amount;

    this.enquiry.enquiry_detail.discount_amt = this.enquiry.total_item_discounted_amount;

    let items: any = dt.data.enquiry_item_detail;
    items = this.mapEnquiryItems(items);
    this.enquiry.enquiry_detail.sub_total = this.getSubTotalOfItems(items);

    this.enquiry.enquiry_detail.temptotal = this.getGrandTotalOfItems(items);

    this.enquiry.enquiry_item_detail = dt.data.enquiry_item_detail;

    this.enquiry.enquiry_detail.customer_discount = this.getCustomerDiscount(this.enquiry.enquiry_item_detail);
  }

  onChangeEnquiryAmount(val, enquiry_child_id) {


    this.enquiry.enquiry_detail.entered_enquiry_amount = val;
    this.enquiry.enquiry_detail.entered_enquiry_amount_fixed = val;
    this.enquiry.enquiry_item_detail.map(elem => {

      if (elem.enquiry_child_id == enquiry_child_id) {
        elem['temptotal'] = val;
      }


    });
    this.enquiry.enquiry_detail.sub_total = (parseFloat(val) * parseInt(this.enquiry.enquiry_item_detail[0].quantity)).toFixed(2);

  }



  mapEnquiryItems(items) {

    items.map(elem => {

      elem['temptotal'] = elem.net_amount;
      elem['discounted_value'] = 0;
      elem['product_availability'] = '1';

    })

    return items;

  }
  getSubTotalOfItems(items) {

    let subtot = 0.0;
    if (this.enquiry.enquiry_detail.enquiry_order_type == 0) {

      items.forEach(elem => {

        subtot = subtot + parseFloat(elem.net_amount);
      });

      return subtot;
    }
    else if (this.enquiry.enquiry_detail.enquiry_order_type == 1) {
      items.forEach(elem => {

        subtot = subtot + parseFloat(elem.net_amount);
      });
      return subtot;

    }


  }

  // getSubTotalForB2C(items){

  //   let subtot=0.0;
  //   let totdiscount=0.0;

  //   items.forEach(elem => {

  //     totdiscount = totdiscount + parseFloat(elem.discounted_amount);
  //   });

  //   subtot=parseFloat(this.enquiry.enquiry_detail.sub_total)-totdiscount;
  //   return subtot;
  // }
  getGrandTotalOfItems(items) {

    // console.log(this.enquiry.enquiry_detail.sub_total);
    // console.log(this.enquiry.enquiry_detail.discount_amt);
    let grandtot = 0.0;
    //  let discountperc=(parseFloat(this.enquiry.enquiry_detail.discount_amt)/100).toFixed(2);
    // let deductamt:any= (parseFloat(this.enquiry.enquiry_detail.sub_total)*parseFloat(discountperc)).toFixed(2);
    // // items.forEach(elem => {

    // //   grandtot = grandtot + parseFloat(elem.temptotal);
    // // });
    grandtot = parseFloat(this.enquiry.enquiry_detail.sub_total) - parseFloat(this.enquiry.enquiry_detail.discount_amt);

    return grandtot;

  }

  getGrandTotalOfItemsB2C(items) {

    let grandtot = 0.0;

    items.forEach(elem => {

      if (elem.product_availability == '1') {
        grandtot = grandtot + parseFloat(elem.net_amount);
      }

    });
    grandtot = grandtot - parseFloat(this.enquiry.enquiry_detail.discount_amt);

    return grandtot;
  }

  getTotalDiscountedAmount(items) {

    let discount_amt = 0.0;
    // items.forEach(elem => {

    //   discount_amt = discount_amt + parseFloat(elem.discounted_amount);
    // });
    // let discountperc=(parseFloat(this.enquiry.enquiry_detail.discount_percent)/100).toFixed(2);
    let deductamt: any = (parseFloat(this.enquiry.enquiry_detail.sub_total) * parseFloat(this.enquiry.enquiry_detail.discount_percent)).toFixed(2);


    // discount_amt=parseFloat(deductamt.toFixed(2));
    return deductamt;

  }

  getTotalDiscountForB2C(items) {

    let discount_amt = 0.0;
    items.forEach(elem => {

      if (elem.product_availability == 1) {
        discount_amt = discount_amt + parseFloat(elem.discounted_amount);
      }

    });
    // let discountperc=(parseFloat(this.enquiry.enquiry_detail.discount_percent)/100).toFixed(2);

    // discount_amt=parseFloat(deductamt.toFixed(2));
    return discount_amt;
  }

  onChangeDeliveryAmount(val) {


    let deliveryamount = val;
    let current_total_amount = this.enquiry.enquiry_detail.final_amount;

    if (parseInt(deliveryamount) != NaN && deliveryamount.length != 0) {

      this.enquiry.enquiry_detail.delivery_charge = deliveryamount;
      //    alert(this.enquiry.enquiry_detail.delivery_charge);
      //      this.enquiry.enquiry_detail.temptotal=(parseFloat(current_total_amount)+parseInt(this.enquiry.enquiry_detail.delivery_charge)).toFixed(2);
      this.enquiry.enquiry_detail.temptotal = this.getGrandTotalOfItemsB2C(this.enquiry.enquiry_item_detail) + parseInt(this.enquiry.enquiry_detail.delivery_charge);
      //this.enquiry.enquiry_detail.grand_total=this.enquiry.enquiry_detail.temptotal;

    }
    else if (deliveryamount.length == 0) {

      this.enquiry.enquiry_detail.temptotal = (parseFloat(this.enquiry.enquiry_detail.temptotal) - parseInt(this.enquiry.enquiry_detail.delivery_charge)).toFixed(2);
    }
    else {

    }

    // let deliveryamount = val;
    // let current_total_amount= this.enquiry.enquiry_detail.final_amount;
    // if (parseInt(deliveryamount) != NaN && deliveryamount.length != 0) {

    //   this.enquiry.enquiry_detail.delivery_charge=deliveryamount;
    //   this.enquiry.enquiry_detail.temptotal=parseFloat(current_total_amount)+parseInt(this.enquiry.enquiry_detail.delivery_charge);


    // }
    // else if (deliveryamount.length == 0) {

    //   this.enquiry.enquiry_detail.temptotal=parseFloat(this.enquiry.enquiry_detail.temptotal)-parseInt(this.enquiry.enquiry_detail.delivery_charge);
    // }
    // else{

    // }

  }

  onSelectItem(val) {


    this.enquiry.enquiry_item_detail.map(elem => {

      if (elem.enquiry_child_id == val) {

        if (elem.product_availability == '1') {

          elem.product_availability = '0';

          this.enquiry.enquiry_detail.discount_amt = (this.getTotalDiscountForB2C(this.enquiry.enquiry_item_detail)).toFixed(2);
          this.enquiry.enquiry_detail.temptotal = this.getGrandTotalOfItemsB2C(this.enquiry.enquiry_item_detail);
          //  this.enquiry.enquiry_detail.sub_total=this.enquiry.enquiry_detail.temptotal;
          this.enquiry.enquiry_detail.final_amount = this.enquiry.enquiry_detail.temptotal + this.enquiry.enquiry_detail.delivery_charge;


          this.enquiry.enquiry_detail.temptotal = (this.getGrandTotalOfItemsB2C(this.enquiry.enquiry_item_detail) + parseInt(this.enquiry.enquiry_detail.delivery_charge)).toFixed(2);
        }
        else if (elem.product_availability == '0') {

          elem.product_availability = '1';
          this.enquiry.enquiry_detail.discount_amt = (this.getTotalDiscountForB2C(this.enquiry.enquiry_item_detail)).toFixed(2);
          this.enquiry.enquiry_detail.temptotal = this.getGrandTotalOfItemsB2C(this.enquiry.enquiry_item_detail);
          //this.enquiry.enquiry_detail.sub_total=this.enquiry.enquiry_detail.temptotal;
          this.enquiry.enquiry_detail.final_amount = this.enquiry.enquiry_detail.temptotal + this.enquiry.enquiry_detail.delivery_charge;;


          this.enquiry.enquiry_detail.temptotal = (this.getGrandTotalOfItemsB2C(this.enquiry.enquiry_item_detail) + parseInt(this.enquiry.enquiry_detail.delivery_charge)).toFixed(2);
        }
        return elem;

      }

    });

  }
  onChangeDiscountAmount(val, item) {


    let discount_percent = val;
    let enquiry_child_id = item.enquiry_child_id;

    if (isNaN(parseInt(discount_percent)) && discount_percent.length != 0) {

      this.global.setToast('error', 'Please enter only numeric values');
      setTimeout(() => {
        $('#input_' + item.enquiry_child_id).val(0);
      }, 20);

    }
    else if (parseInt(discount_percent) != NaN && discount_percent.length != 0 && this.enquiry.enquiry_detail.enquiry_order_type == 0) {


      let items = this.enquiry.enquiry_item_detail;
      let childitem = items.filter(elem => {

        if (elem.enquiry_child_id == enquiry_child_id) {
          return elem;
        }
      });

      let prodamount = childitem[0].temptotal;
      discount_percent = (parseFloat(discount_percent) / 100).toFixed(2);
      let deduct_amount = (parseFloat(prodamount) * parseFloat(discount_percent)).toFixed(2);
      let deduct_amount_value = parseFloat(prodamount) - parseFloat(deduct_amount);
      this.enquiry.enquiry_item_detail.map(elem => {

        if (elem.enquiry_child_id == enquiry_child_id) {
          elem.discounted_precent = val;
          elem.discounted_amount = deduct_amount;
        }

      })
      // this.enquiry.enquiry_item_detail.map(elem => {
      //   if (elem.enquiry_child_id == enquiry_child_id) {
      //     elem.temptotal = deduct_amount_value;
      //     elem.discounted_amount = deduct_amount;
      //   }
      // });

      this.enquiry.enquiry_detail.discount_amt = (this.getTotalDiscountForB2C(this.enquiry.enquiry_item_detail)).toFixed(2);
      // this.enquiry.enquiry_detail.sub_total= (this.getSubTotalForB2C(this.enquiry.enquiry_item_detail)).toFixed(2);
      this.enquiry.enquiry_detail.temptotal = (this.getGrandTotalOfItemsB2C(this.enquiry.enquiry_item_detail) + parseInt(this.enquiry.enquiry_detail.delivery_charge)).toFixed(2);

      this.enquiry.enquiry_detail.final_amount = this.enquiry.enquiry_detail.temptotal;
      this.enquiry.enquiry_detail.total_apc_discount_amount = this.getAPCContributionDiscount(this.enquiry.enquiry_item_detail);
      console.log(this.enquiry);

    }
    else if (parseInt(discount_percent) != NaN && discount_percent.length != 0 && this.enquiry.enquiry_detail.enquiry_order_type == 1) {

      if (this.enquiry.enquiry_detail.entered_enquiry_amount == 0) {

        this.global.setToast('error', 'Please set amount first');
        $('#input_' + enquiry_child_id).val(0);
        $('#inputamount_' + enquiry_child_id).focus();

      }
      else {

        let items = this.enquiry.enquiry_item_detail;
        let childitem = items.filter(elem => {

          if (elem.enquiry_child_id == enquiry_child_id) {
            return elem;
          }
        });
        let prodamount = childitem[0].temptotal;
        discount_percent = (parseFloat(discount_percent) / 100).toFixed(2);
        let deduct_amount = (parseFloat(prodamount) * parseFloat(discount_percent)).toFixed(2);
        let deduct_amount_value = parseFloat(prodamount) - parseFloat(deduct_amount);

        this.enquiry.enquiry_item_detail.map(elem => {
          if (elem.enquiry_child_id == enquiry_child_id) {
            // elem.temptotal = deduct_amount_value;
            elem.discounted_precent = val;
            elem.discounted_amount = deduct_amount;
          }
        });

        this.enquiry.enquiry_detail.entered_enquiry_amount = deduct_amount_value;
        this.enquiry.enquiry_detail.discount_percent = discount_percent;

        this.enquiry.enquiry_detail.discount_amt = this.getTotalDiscountedAmount(this.enquiry.enquiry_item_detail);
        this.enquiry.enquiry_detail.temptotal = this.getGrandTotalOfItems(this.enquiry.enquiry_item_detail);
        this.enquiry.enquiry_detail.final_amount = this.enquiry.enquiry_detail.temptotal;


      }

    }
    else if (discount_percent.length == 0 && this.enquiry.enquiry_detail.enquiry_order_type == 0) {


      this.enquiry.enquiry_item_detail.map(elem => {
        if (elem.enquiry_child_id == enquiry_child_id) {
          elem.temptotal = elem.net_amount;
          elem.discounted_amount = 0;
        }
      });
      this.enquiry.enquiry_detail.discount_amt = this.getTotalDiscountedAmount(this.enquiry.enquiry_item_detail);
      this.enquiry.enquiry_detail.temptotal = this.getGrandTotalOfItems(this.enquiry.enquiry_item_detail);
      this.enquiry.enquiry_detail.final_amount = this.enquiry.enquiry_detail.temptotal;
    }
    else if (discount_percent.length == 0 && this.enquiry.enquiry_detail.enquiry_order_type == 1) {


      this.enquiry.enquiry_item_detail.map(elem => {
        if (elem.enquiry_child_id == enquiry_child_id) {
          //    elem.temptotal = elem.net_amount;
          elem.discounted_precent = "0";
          elem.discounted_amount = 0;
        }
      });
      this.enquiry.enquiry_detail.discount_percent = 0;
      this.enquiry.enquiry_detail.entered_enquiry_amount = this.enquiry.enquiry_item_detail[0].temptotal;
      this.enquiry.enquiry_detail.discount_amt = this.getTotalDiscountedAmount(this.enquiry.enquiry_item_detail);
      this.enquiry.enquiry_detail.temptotal = this.getGrandTotalOfItems(this.enquiry.enquiry_item_detail);
      this.enquiry.enquiry_detail.final_amount = this.enquiry.enquiry_detail.temptotal;
    }

    else {

    }

  }

  onSubmitQuotation() {

    if (this.enquiry.enquiry_detail.enquiry_order_type == 1) {

      if (this.enquiry.enquiry_detail.entered_enquiry_amount == 0) {

        this.global.setToast('error', 'Please set amount');
      }
      else if (this.enquiry.enquiry_item_detail[0].discounted_precent == '0') {

        this.global.setToast('error', 'Please set discount %');
      }
      // else if( this.enquiry.enquiry_detail.delivery_charge==0){

      //   this.global.setToast('error','Please set delivery amount');
      // }

      else {

        if (!this.status.is_confirm_popup) {
 
          this.status.is_confirm_popup = !this.status.is_confirm_popup;
        }
        else {
          this.status.is_confirm_popup = false;
          this.status.is_process = true;
          let item_obj: any
          let json_arr = [];
          this.enquiry.enquiry_item_detail.map(elem => {

            item_obj = { 'product_id': '', 'product_discount': '', 'product_availability': '', 'enquiry_child_id': '', 'product_price': '' };

            item_obj.product_id = elem.product_id;
            item_obj.product_discount = elem.discounted_precent;
            item_obj.product_availability = elem.product_availability;
            item_obj.enquiry_child_id = elem.enquiry_child_id;
            item_obj.product_price = elem.temptotal;
            json_arr.push(item_obj);

          });
          let update_data: any = {
            'delivery_amount': this.enquiry.enquiry_detail.delivery_charge, 'enquiry_id': this.enquiry.enquiry_detail.enquiry_id,
            'data': json_arr
          };
          let postdata: any = '';
          // let data="delivery_amount="+this.enquiry.enquiry_detail.delivery_charge+"&enquiry_id="+this.enquiry.enquiry_detail.enquiry_id+
          // "&data="+JSON.stringify(json_arr);

          postdata = "update_data=" + JSON.stringify(update_data) + "&enquiry_order_type=" + this.enquiry.enquiry_detail.enquiry_order_type + "&order_id=" + this.enquiry.enquiry_detail.enquiry_id + "&enquiry_id=" + this.enquiry.enquiry_detail.enquiryid;

          console.log(postdata);
          // this.loadingBar.start();
          // this.api.sendQuotation(postdata).subscribe(
          //   (response) => {


          //     let dt: any = response;

          //     this.loadingBar.stop();


          //     if (dt.status == 200) {


          //       this.status.is_sent=true;
          //       // this.setParmas(dt);
          //       // $('.right_pannel').fadeIn(500);
          //       //    this.respdata.mapping_type_list=dt.data.mapping_type_list;
          //       // this.global.setToast('info','Quotation sent successfully');
          //       // this.router.navigate(['/chemist-account/retailer-enquiry']);



          //     }
          //     else if (dt.status == 201) {
          //       this.global.setToast('info',dt.message);
          //     }

          //   },
          //   (error) => {

          //     this.loadingBar.stop();
          //     //   this.spinnerService.hide();
          //     console.log('RESPONSE FAILED'); console.log(error)
          //   }
          // );


        }

      }
    }

    else if (this.enquiry.enquiry_detail.enquiry_order_type == 0) {

      if (!this.validateDiscountAndAvalailabilityB2C()) {

        this.global.setToast('error', 'Please set amount');
      }


      else {

        if (!this.status.is_confirm_popup) {
          this.status.is_confirm_popup = !this.status.is_confirm_popup;
          this.popup.onReceivePopupData({'type':'confirm','confirm_txt':this.status.confirm_txt,'primary_btn_txt':'Confirm','secondary_btn_txt':'Close'});
        }
        else {
          
          this.popup.onReceivePopupData({'type':'process','confirm_txt':'Please wait..we are processing your request','primary_btn_txt':' ','secondary_btn_txt':''});
          
          this.status.is_confirm_popup = false;
          this.status.is_process = true;

          let item_obj: any
          let json_arr = [];
          this.enquiry.enquiry_item_detail.map(elem => {
            if (elem.product_availability == '1') {
              item_obj = { 'product_id': '', 'product_discount': '', 'product_availability': '', 'enquiry_child_id': '', 'product_price': '' };

              item_obj.product_id = elem.product_id;
              item_obj.product_discount = elem.discounted_precent;
              item_obj.product_availability = elem.product_availability;
              item_obj.enquiry_child_id = elem.enquiry_child_id;
              item_obj.product_price = elem.temptotal;
              json_arr.push(item_obj);

            }


          });
          let update_data: any = {
            'delivery_amount': this.enquiry.enquiry_detail.delivery_charge, 'enquiry_id': this.enquiry.enquiry_detail.enquiry_id,
            'data': json_arr
          };
          let postdata: any = '';
          // let data="delivery_amount="+this.enquiry.enquiry_detail.delivery_charge+"&enquiry_id="+this.enquiry.enquiry_detail.enquiry_id+
          // "&data="+JSON.stringify(json_arr);

          postdata = "update_data=" + JSON.stringify(update_data) + "&enquiry_order_type=" + this.enquiry.enquiry_detail.enquiry_order_type + "&order_id=" + this.enquiry.enquiry_detail.order_id + "&enquiry_id=" + this.enquiry.enquiry_detail.enquiryid;

          console.log(postdata);
         // this.loadingBar.start();
          this.preSubmitQuotation(postdata);
           setTimeout(() => {
            this.status.is_sent = true;
            this.popup.onReceivePopupData({'type':'success','sent_txt':'Quotation sent successfully','primary_btn_txt':'','secondary_btn_txt':'Close'});
           }, 200);
         


        }

      }

    }
    // let data = "enquiry_id=" + this.enquiry.enquiry_detail.enquiryid + "&delivery_amount=" + this.enquiry.enquiry_detail.delivery_amount+
    //           "&"
    // console.log(data);
    // this.loadingBar.start();
    // this.api.getVendorEnquiryDetail(data).subscribe(
    //   (response) => {
    //     console.log('5');
    //     console.log(response);


    //     let dt: any = response;

    //     this.loadingBar.stop();


    //     if (dt.status == 200) {

    //       this.setParmas(dt);

    //       //    this.respdata.mapping_type_list=dt.data.mapping_type_list;





    //     }
    //     else if (dt.status == 201) {

    //     }

    //   },
    //   (error) => {

    //     this.loadingBar.stop();
    //     //   this.spinnerService.hide();
    //     console.log('RESPONSE FAILED'); console.log(error)
    //   }
    // );


  }

  preSubmitQuotation(postdata:any){
    this.api.sendQuotation(postdata).subscribe(
      (response) => {

        this.popup.onReceivePopupData({ 'type': '' });
        let dt: any = response;
  
        this.loadingBar.stop();


        if (dt.status == 200) {

          //this.status.is_sent = true;
          //this.popup.onReceivePopupData({'type':'success','sent_txt':'Quotation sent successfully','primary_btn_txt':'','secondary_btn_txt':'Close'});
          // this.setParmas(dt);
          // $('.right_pannel').fadeIn(500);
          //    this.respdata.mapping_type_list=dt.data.mapping_type_list;
          // this.global.setToast('info','Quotation sent successfully');
          // this.router.navigate(['/chemist-account/retailer-enquiry']);

        }
        else if (dt.status == 201) {
          this.global.setToast('info', dt.message);
        }

      },
      (error) => {

        this.loadingBar.stop();
        //   this.spinnerService.hide();
        console.log('RESPONSE FAILED'); console.log(error)
      }
    );

  }

  validateDiscountAndAvalailabilityB2C() {



    let avail_items: any = this.enquiry.enquiry_item_detail.filter(elem => {

      if (elem.product_availability == '1') {
        return elem;

      }
    });
    if (avail_items.length == 0 && this.enquiry.enquiry_item_detail.length > 1) {

      this.global.setToast('error', 'Please checkbox for available product');
      return false;
    }
    // else if(parseFloat(this.enquiry.enquiry_detail.delivery_charge)==0){
    //   this.global.setToast('error','Please set delivery amount');
    //   return false;
    // }
    else {

      if (this.enquiry.enquiry_item_detail.length == 1) {

        this.enquiry.enquiry_item_detail.map(elem => { elem.product_availability = '1' });

      }
      return true;
    }


  }


  onFocusInputbox(enquiry_child_id, type) {

    if ($('#inputamount_' + enquiry_child_id).val() == '') {
      if (type == 'discountinput') {

        $('#input_' + enquiry_child_id).val('11');
      }
      else if (type == 'amountinput') {

        $('#inputamount_' + enquiry_child_id).val('');
      }

    }

  }
  onBuyEnquiry() {


    this.loadingBar.start();
    this.popup.onReceivePopupData({'type':'process','confirm_txt':'Please wait..we are processing your request','primary_btn_txt':'Yes, Confirm It','secondary_btn_txt':'Close It'});
    let data = "enquiry_id=" + this.enquiry.enquiry_detail.enquiryid + "&vendor_id=" + this.enquiry.enquiry_detail.vendor_id + "&enquiry_amount=" + this.enquiry.enquiry_detail.enquiry_bid_amount;
    console.log(data);
    this.api.buyInquiryByVendor(data).subscribe(
      (response) => {



        var dt: any = response;
        console.log(dt);
        if (dt.status == "200") {

          //     this.setParams(dt.data);
          this.popup.onReceivePopupData({ 'type': '' });
          this.popup.onReceivePopupData({'type':'success2','sent_txt':dt.message,'primary_btn_txt':'Send Quotation','secondary_btn_txt':''});
          this.enquiry.enquiry_detail.bid_made = '1';
          this.global.setToast('info', dt.message);
          //   this.router.navigate(['/my-account/enquires']);

        }


        else if (dt.status == "201") {

          this.popup.onReceivePopupData({ 'type': '' });
          this.popup.onReceivePopupData({'type':'error','sent_txt':dt.message,'primary_btn_txt':'','secondary_btn_txt':'Close'});
  //        this.global.setToast('error', dt.message);
        }


        this.loadingBar.stop();



      },
      (error) => {


        console.log('RESPONSE FAILED'); console.log(error)
      }
    );
  }

  onClose(type, mode) {

    if (type == 'enquiryprocess') {
      this.router.navigate(['/chemist-account/retailer-enquiry'], { queryParams: { 'type': 'active' } });
      this.status.is_process = false;

    }
    else if (type == 'confirmprocess' && mode == 'cancel') {

      // this.router.navigate(['/my-account/enquires']);
      this.status.is_confirm_popup = false;

    }
    // else if(type=='confirmprocess' && mode=='cancel'){

    //   this.router.navigate(['/my-account/enquires']);
    //   this.status.is_confirm_popup=false;

    // }
  }

  onUpdateDiscount(enquirydata, type) {

    let val: any = $('#input_' + enquirydata.enquiry_child_id).val();

    if (type == '+') {

      let increaseval: any = $('#input_' + enquirydata.enquiry_child_id).val();
      increaseval = parseInt(increaseval) + 1

      if (increaseval >= parseInt(enquirydata.max_discounted_precent) + 1) {
        this.global.setToast('error', 'Max Limit Reached');
      } else {

        setTimeout(() => {
          $('#input_' + enquirydata.enquiry_child_id).val(increaseval)
        }, 20);


        this.onChangeDiscountAmount(increaseval, enquirydata);

      }



    }
    else if (type == '-') {


      let decreaseval: any = $('#input_' + enquirydata.enquiry_child_id).val();
      decreaseval = parseInt(decreaseval) - 1;



      if (decreaseval >= parseInt(enquirydata.min_discounted_precent)) {

        setTimeout(() => {
          $('#input_' + enquirydata.enquiry_child_id).val(decreaseval)
        }, 20);


        this.onChangeDiscountAmount(decreaseval, enquirydata);


      } else {

        this.global.setToast('error', 'Minimum limit is-' + enquirydata.min_discounted_precent + "%");

      }
    }
  }

  getCustomerDiscount(items: any) {

    let discount = 0;
    let val = 0;
    items.map(elem => {

      val = 0;
      val = ((elem.customer_discounted_precent / 100) * (elem.mrp * elem.quantity));
      discount = discount + val;


    })

    return discount;
  }

  getAPCContributionDiscount(items: any) {
    console.log(items);
    let cust_discount = 0;
    let apc_discount = 0;
    let final_discount = 0;

    let val = 0;
    items.map(elem => {

      val = 0;
      val = ((elem.customer_discounted_precent / 100) * (elem.mrp * elem.quantity));
      cust_discount = cust_discount + val;
    })

    items.map(elem => {

      val = 0;
      val = ((elem.discounted_precent / 100) * (elem.mrp * elem.quantity));
      apc_discount = apc_discount + val;
    })

    final_discount = cust_discount - apc_discount;

    console.log(cust_discount);
    console.log(apc_discount);
    console.log(final_discount);
    return final_discount;

  }

    
  onPopupActionReceived(obj:any) {
      console.log(obj);
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
          this.status.is_confirm_popup=false;
        }
        else if (obj.type == 1) {
  
          this.popup.onReceivePopupData({ 'type': '' });
         this.onSubmitQuotation();
         // this.status.is_order_confirmed=1;
          //this.onSubmitEnquiry();
          //on primary btn clicked...
    
        }
   
      }
      if(obj.mode=='confirm2'){
 
        if (obj.type == 0) {
  
          this.popup.onReceivePopupData({ 'type': '' });
          this.status.is_confirm_popup=false;
        }
        else if (obj.type == 1) {
  
          this.popup.onReceivePopupData({ 'type': '' });
          this.onBuyEnquiry();
          //this.onSubmitEnquiry();
          //on primary btn clicked...
    
        }
   
      }
      else if(obj.mode=='success'){
      
        if (obj.type == 0) {
  
          //Go To Order
 
          this.popup.onReceivePopupData({ 'type': '' });
          this.router.navigate(['/chemist-account/retailer-enquiry'],{queryParams:{'type':'awarded'}});
        //  this.onRedirect('my-enquiries');
        }
        else if (obj.type == 1) {

        

        //  this.onRedirect('home')
          //on primary btn clicked...
    
        }
      }
      else if(obj.mode=='success2'){
      
        if (obj.type == 0) {
  
          //Go To Order
 
          this.popup.onReceivePopupData({ 'type': '' });
 
        //  this.onRedirect('my-enquiries');
        }
        else if (obj.type == 1) {

          this.popup.onReceivePopupData({ 'type': '' });
          this.getVendorEnquiryDetail();
                    
        //  this.onRedirect('home')
          //on primary btn clicked...
    
        }
      }
  
      //console.log(event);
    }

    onBuyNow(enquiry) {

      this.popup.onReceivePopupData({'type':'confirm2','confirm_txt':'Are you sure to buy Enquiry- #' + this.enquiry.enquiry_detail.order_no + " for Rs." + this.enquiry.enquiry_detail.enquiry_bid_amount,'primary_btn_txt':'Confirm','secondary_btn_txt':'Close'});
      // this.status.confirm_txt = 'Are you sure to buy Enquiry-' + enquiry.order_no + " for Rs." + enquiry.enquiry_bid_amount;
  
     //  this.enquiry.confirm_enquiry_id = enquiry.order_no;
      // this.status.is_confirm_popup = true;
  
    }
    
}
