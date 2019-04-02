import { Component, OnInit } from '@angular/core';
import { LoadingBarService } from '@ngx-loading-bar/core';
import {Api} from '../../api.service';
import {AppGlobals} from '../../app.global';
import { Router } from '@angular/router';


declare var $:any;
declare var google:any;
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
 
  state:any;
  data:any={'new_lead':'','ongoinglead':'','order_delivered':'','order_fordelivery':'','order_forpacking':'','get_offer_data':[],
            'active_lead_date':'','delivered_lead_date':'','new_lead_date':'','awarded_lead_date':'','vendor_webslider_data':[],
            'vendor_app_slider_data':[],
            }
  constructor(private api:Api,public global:AppGlobals,private loadingBar:LoadingBarService
    ,private router:Router) {this.state=this.global.getAppState(); }

  ngOnInit() {
 
    $('.sliding_banner_wrapper').hide();

    this.getDashboardData();
    setTimeout(() => {
      $('.nameDesigns').removeClass('active');
      $('#dashboard').addClass('active');
    }, 20);
    $("html, body").animate({ scrollTop: 0 }, "slow");
    setTimeout(() => {
      // window.onload = function () {
 
    //     google.charts.load('current', {packages: ['corechart']});
    //     google.charts.setOnLoadCallback(drawChart);
    
    // function drawChart() {
    //       // Define the chart to be drawn.
    //       var data = new google.visualization.DataTable();
    //       data.addColumn('string', 'Element');
    //       data.addColumn('number', 'Sale');
    //       data.addRows([
    //         ['Sun', 66000],
    //         ['Mon', 41000],
    //         ['Tues', 40000],
    //         ['Wed', 33000],
    //         ['Thur', 28000],
    //         ['Fri', 13000],
    //         ['Sat', 17000]
    //       ]);
    
    //       // Instantiate and draw the chart.
    //       var chart = new google.visualization.ColumnChart(document.getElementById('barChart'));
    //       chart.draw(data, null);
    //     }
     //    }
     }, 200);
     
  }

  getDashboardData(){

    let data="vendor_id="+this.state.user.id;
  
    this.api.getVendorDashboard(data).subscribe(
      (response) => {
   
        var dt: any = response;
        
        console.log(dt);

        if (dt.status == 200) {

         
          this.setParmas(dt);
          this.loadingBar.stop();
         

        }
        else if (dt.status == 201) {

          this.global.setToast('error',dt.message);

        }

      },
      (error) => {

        this.loadingBar.stop();
        //   this.spinnerService.hide();
        console.log('RESPONSE FAILED'); console.log(error)
      }
    );
  }

  setParmas(dt){

    this.data.new_lead=dt.data.new_lead;
    this.data.ongoinglead=dt.data.ongoinglead;
    this.data.order_delivered=dt.data.order_delivered;
    this.data.order_fordelivery=dt.data.order_fordelivery;
    this.data.order_forpacking=dt.data.order_forpacking;
    this.data.order_onway=dt.data.order_onway;
    this.data.order_total=dt.data.order_total;
    this.data.get_offer_data=dt.get_offer_data;

    this.data.active_lead_date=dt.data.active_lead_date;
    this.data.delivered_lead_date=dt.data.delivered_lead_date;
    this.data.new_lead_date=dt.data.new_lead_date;
    this.data.awarded_lead_date=dt.data.awarded_lead_date;
    
    if ($(window).width() < 768) {
      this.data.vendor_webslider_data=dt.vendor_app_slider_data;
    
    }else{
      this.data.vendor_webslider_data=dt.vendor_webslider_data;
      this.data.vendor_app_slider_data=dt.vendor_app_slider_data;
    }
    
    setTimeout(() => {
      $(".main_slider").owlCarousel({
        items: 1,
        navigation: true,
        autoPlay:true,
        trueslideSpeed: 300,
        paginationSpeed: 500,
        // responsiveRefreshRate: 200,
        // responsiveBaseWidth: window,
        responsive:true
      
      
      });
      $('.sliding_banner_wrapper').fadeIn(500);
    
    }, 20);
  
  }

}
