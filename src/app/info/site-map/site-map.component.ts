import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LoadingBarService } from '@ngx-loading-bar/core';
import {Api} from '../../api.service';
import {AppGlobals} from '../../app.global';
import { Meta, Title } from '@angular/platform-browser';

declare var $:any

@Component({
  selector: 'app-site-map',
  templateUrl: './site-map.component.html',
  styleUrls: ['./site-map.component.css']
})
export class SiteMapComponent implements OnInit {
  
  state:any;
  categories:any=[];

  constructor(private aroute:ActivatedRoute,private router:Router,private global:AppGlobals,
    private api:Api,private loadingBar:LoadingBarService,private title: Title, private meta: Meta) {

      this.state=this.global.getAppState();
     }

  ngOnInit() {
    setTimeout(() => {
      $("html, body").animate({ scrollTop: 0 }, "slow");
    }, 20);
   setTimeout(() => {
    $(".navigation_wrapper .menus").owlCarousel({
      items: 7,
      navigation: true,
      trueslideSpeed: 300,
      paginationSpeed: 500,
      responsiveRefreshRate: 200,
      margin:10,
      responsiveBaseWidth: window,
      responsive: {
        0: {
          items: 4
        },
        600: {
          items: 8
        },
        1100: {
          items: 10
        }
      }
    });
   }, 200);
    this.getSiteMap();
  }

  
  getSiteMap(){

    
    this.api.getSiteMap('').subscribe(
      (response) => {
      


        var dt: any = response;

     console.log(dt);
        if (dt.status == 200) {

          this.categories=dt.retdata;
          this.state.footer=dt.retdata;
        
          this.global.saveAppState(this.state);
        }
        else if (dt.status == 201) {
         
          //  this.global.setToast('error','Sorry, no result found');
          this.loadingBar.stop();

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
