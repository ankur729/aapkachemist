import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LoadingBarService } from '@ngx-loading-bar/core';
import {Api} from '../../api.service';
import {AppGlobals} from '../../app.global';
 

declare var $:any;
@Component({
  selector: 'app-testimonial-detail',
  templateUrl: './testimonial-detail.component.html',
  styleUrls: ['./testimonial-detail.component.css']
})
export class TestimonialDetailComponent implements OnInit {

  testimonial:any={'id':'','auther_city':'','auther_img':'','auther_name':'','description':'','image_url':'','img_file':'','title':''};
  medialist:any=[];
  constructor(private aroute:ActivatedRoute,private router:Router,private global:AppGlobals,
    private api:Api,private loadingBar:LoadingBarService) { }

  ngOnInit() {
 
    setTimeout(() => {
      $("html, body").animate({ scrollTop: 0 }, "slow");
    }, 20);
    this.testimonial.id = this.aroute.snapshot.queryParams["id"];
    this.getTestimonialDeatil();
  }

  getTestimonialDeatil(){
 
    this.loadingBar.start();
    let data="testimonial_id="+this.testimonial.id;
    this.api.getTestimonialDeatil(data).subscribe(
      (response) => {
           console.log(response);

        let dt: any = response;
        if (dt.status == 200) {
        //  testimonial:any={'id':'','auther_city':'','auther_img':'','auther_name':'','description':'','image_url':'','img_file':'','title':''};

             this.setParams(dt.data)

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

  setParams(dt){

 
    this.testimonial.auther_city=dt.auther_city;
    this.testimonial.auther_img=dt.auther_img;
    this.testimonial.auther_name=dt.auther_name;
    this.testimonial.description=dt.description;
    this.testimonial.image_url=dt.image_url;
    this.testimonial.img_file=dt.img_file;
    this.testimonial.title=dt.title;
    

  }

}
