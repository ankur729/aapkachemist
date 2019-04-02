import { Component, OnInit, Output } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { Api } from '../../api.service';
import { AppGlobals } from '../../app.global';
declare var classie: any;
declare var $: any;


@Component({
  selector: 'app-stock-orders',
  templateUrl: './stock-orders.component.html',
  styleUrls: ['./stock-orders.component.css']
})
export class StockOrdersComponent implements OnInit {
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

  };
  isnodatafound: boolean = false;
  status: any = {
    'is_process': false, 'is_sent': false, 'process_txt': 'Please wait..we are processing your request.!', 'sent_txt': 'Status updated successfully.!', 'error_txt': '',
    'is_confirm_popup': false, 'confirm_txt': '', 'is_error': false, 'selected_order_no': '', 'updateorderto': '',
    'order_status': { 'confirm': 'OS01', 'ready_to_del': 'OS02', 'on_the_way': 'OS03', 'delivered': 'OS04' }
  };
  handler: any;
  current_page = 1;


  @Output() nodataobj: any = { 'page': '', 'txt': '' };

  constructor(public global: AppGlobals, private loadingBar: LoadingBarService, private router: Router, private api: Api, private aroute: ActivatedRoute) { this.state = this.global.getAppState(); }

  ngOnInit() {

    
    $('.page_name').hide();
    $('.mainPage').hide();

    setTimeout(() => {
      $("html, body").animate({ scrollTop: 0 }, "slow");

      $('.list a').removeClass('active');
      $('#stockorders').addClass('active');

   
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


    //     // ajax call get data from server and append to the div
    //   }
    // }.bind(this);
    // $(window).on("scroll", this.handler);

  }

  getOrderList() {

    this.loadingBar.start();
    let data = "user_id=" + this.state.user.id + "&entry_type=ALL" + "&list_type=0" + "&history_status=1"+"&page="+this.current_page;
    console.log(data);
    /// console.log(this.address);
    this.api.getOrdersOrEnquires(data).subscribe(
      (response) => {

        var dt: any = response;
        console.log(dt);
        //      this.global.setToast('info',dt.message);

        if (dt.status == 200) {

          
          let orders = this.splitdaymonthyearFromTimeStamp(dt.data);
              
          //  for (let i = 0; i < orders.length; i++) {
          //   this.respdata.orders.push(orders[i]);
          //  }
          this.respdata.orders = orders;

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
          //    // this.addresses=dt.data;

          //     // this.is_result_get=true;
          //     // this.searchresp=dt.user_data;
          // //    this.address=this.addressinit;

          //      this.global.setToast('info',dt.message);

        }
        else if (dt.status == 201) {
          this.isnodatafound = true;
          this.nodataobj.page = 'enquiry';
          this.nodataobj.txt = "No Orders found";
          this.nodataobj.img_url = this.global.noimgfound.no_order_found;
          //     // this.is_result_get=false;
          //     // this.searchresp=[];
        }

        this.loadingBar.stop();



      },
      (error) => {


        console.log('RESPONSE FAILED'); console.log(error)
      }
    );

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

}
