import { Component, OnInit } from '@angular/core';
declare var $:any;

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    $('.section_1').hide();
    setTimeout(() => {
      $("html, body").animate({ scrollTop: 0 }, "slow");
    }, 20);
  }

  ngAfterViewInit(){
    setTimeout(() => {
      $('.section_1').fadeIn(500);


      $(".our_facility").owlCarousel({
        items: 1,
        navigation: true,
        trueslideSpeed: 300,
        paginationSpeed: 500,
        responsiveRefreshRate: 200,
        margin:10,
        responsiveBaseWidth: window,
        responsive: {
          0: {
            items: 1
          },
          600: {
            items: 1
          },
          1100: {
            items: 1
          }
        }
      });
      $(".scroll-section").niceScroll({ cursorborder: "", cursorcolor: "#facba1", boxzoom: false });
    
    }, 200);
  }

}
