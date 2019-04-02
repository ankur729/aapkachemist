import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { Api } from '../../api.service';
import { AppGlobals } from '../../app.global';
import { DomSanitizer } from '@angular/platform-browser';
import { Meta, Title } from '@angular/platform-browser';

declare var $: any;
declare var FgGallery:any;

@Component({
  selector: 'app-media-release-detail',
  templateUrl: './media-release-detail.component.html',
  styleUrls: ['./media-release-detail.component.css']
})
export class MediaReleaseDetailComponent implements OnInit {

  event_id:any='';
  galleryinit:any;
  data:any={'event_title':'','event_description':'','image_url':'','image_banner':'','created_date':'','image_gallery':[]}
  constructor(private router: Router, private aroute: ActivatedRoute,
    private loadingBar: LoadingBarService, private api: Api, public global: AppGlobals,public sanitizer: DomSanitizer,
    private title: Title, private meta: Meta) {

 }

  ngOnInit() {

    $("html, body").animate({ scrollTop: 0 }, "slow");

    this.aroute.queryParams.subscribe(params => {


      this.event_id = this.aroute.snapshot.queryParams["id"];
 
    });



    

    this.getEventDetail();

  }

  getEventDetail(){

    this.loadingBar.start();

 
    let data="event_id="+this.event_id;
    console.log(data);
    this.api.getEventDetail(data).subscribe(
      (response) => {

        
        var dt: any = response;

        console.log(dt);
        this.loadingBar.stop();

        if (dt.status == 200) {
       
           this.data.event_title=dt.data.title;
           this.data.event_description=dt.data.description;
           this.data.image_url=dt.data.image_url;
           this.data.image_gallery=dt.data.image_gallery;
           this.data.image_banner=dt.data.image_banner;
           this.data.created_date=dt.data.created_date;
           setTimeout(() => {
            this.galleryinit= new FgGallery('.fg-gallery', {
              cols: 1,
              style: {
                width: '150px',
                border: '5px solid #fff',
                height: '130px',
              
              }
          })
          }, 200);
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

  ngOnDestroy(){
    $('.gallery-data').hide();
  }

}
