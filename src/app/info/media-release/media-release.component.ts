import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { Api } from '../../api.service';
import { AppGlobals } from '../../app.global';
import { DomSanitizer } from '@angular/platform-browser';
import { Meta, Title } from '@angular/platform-browser';

declare var $: any;


@Component({
  selector: 'app-media-release',
  templateUrl: './media-release.component.html',
  styleUrls: ['./media-release.component.css']
})
export class MediaReleaseComponent implements OnInit {


  data:any=[];
  constructor(private router: Router, private aroute: ActivatedRoute,
     private loadingBar: LoadingBarService, private api: Api, public global: AppGlobals,public sanitizer: DomSanitizer,
     private title: Title, private meta: Meta) {

  }


  ngOnInit() {

    this.title.setTitle('Latest News about Aapka Chemist');    
    this.meta.updateTag({
      name: 'description', content: "Take a look at our Story so far."
    });

    
    $("html, body").animate({ scrollTop: 0 }, "slow");

    this.getData();
  }

  getData(){

    this.loadingBar.start();

 

    this.api.getPressrelease('').subscribe(
      (response) => {

        
        var dt: any = response;

        console.log(dt);
        this.loadingBar.stop();

        if (dt.status == 200) {
          
           this.data=dt.data;

        }
        else if (dt.status == 201) {
      //    this.router.navigate(['unauth-access']);
          //  this.global.setToast('error','Sorry, no result found');
          this.loadingBar.stop();

        }

      },
      (error) => {
       // this.router.navigate(['unauth-access']);
        this.loadingBar.stop();
        //   this.spinnerService.hide();
        console.log('RESPONSE FAILED'); console.log(error)
      }
    );


  }

}
