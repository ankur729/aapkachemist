import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LoadingBarService } from '@ngx-loading-bar/core';
import {Api} from '../../api.service';
import {AppGlobals} from '../../app.global';
declare var $:any;

@Component({
  selector: 'app-info-page',
  templateUrl: './info-page.component.html',
  styleUrls: ['./info-page.component.css']
})
export class InfoPageComponent implements OnInit {

  info:any={'seourl':'','data':{'page_title':'','page_content':''}};

  constructor(private aroute:ActivatedRoute,private router:Router,private global:AppGlobals,private api:Api,private loadingBar:LoadingBarService) { }

  ngOnInit() { 
    console.log(this.router.url.substring(1));
    this.info.seourl=this.router.url.substring(1);
    this.loadInfoData();
    $("html, body").animate({ scrollTop: 0 }, "slow");
  }


  loadInfoData(){

     
    
    console.log(this.info.seourl);
    this.loadingBar.start();
    this.api.getCmsData(this.info.seourl).subscribe(
      (response) => {
        console.log('GETTING CMS DATA');
        console.log(response);

        let dt: any = response;
        if (dt.status == 200) {
 

          this.info.data.page_title=dt.data.page_title;
          this.info.data.page_content=dt.data.page_content;
          

        }
        else if (dt.status == 201) {
          this.global.setToast('error', dt.message);
        }

        this.loadingBar.stop();
      },
      (error) => {

        console.log('RESPONSE FAILED'); console.log(error)
      }
    );

  }

}
