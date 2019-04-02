import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { LoadingBarService } from '@ngx-loading-bar/core';
import {Api} from '../../api.service';
import {AppGlobals} from '../../app.global';
declare var $:any;
 

@Component({
  selector: 'app-terms-conditions',
  templateUrl: './terms-conditions.component.html',
  styleUrls: ['./terms-conditions.component.css']
})
export class TermsConditionsComponent implements OnInit {
  
  info:any={'seourl':'terms-conditions','data':{'page_title':'','page_content':''}};
 
  constructor(private aroute:ActivatedRoute,private router:Router,
              private global:AppGlobals,private api:Api,private loadingBar:LoadingBarService,private title: Title, private meta: Meta) { }

  ngOnInit() {

    this.title.setTitle('Terms and Conditions of Aapka Chemist');    
    this.meta.updateTag({
      name: 'description', content: "Welcome to Aapka Chemist. These terms and conditions outline the rules and regulations for the use of Aapka Chemist's Website and App"
    });

    $('.section_1').hide();
    setTimeout(() => {
      $("html, body").animate({ scrollTop: 0 }, "slow");
    }, 20);

    this.loadInfoData();


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


  ngAfterViewInit() {

    setTimeout(() => {
      $('.section_1').fadeIn(500);
    }, 200);
  }

}
