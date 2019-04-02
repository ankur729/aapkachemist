import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LoadingBarService } from '@ngx-loading-bar/core';
import {Api} from '../../api.service';
import {AppGlobals} from '../../app.global';
 

declare var $:any;
 

@Component({
  selector: 'app-media-center',
  templateUrl: './media-center.component.html',
  styleUrls: ['./media-center.component.css']
})
export class MediaCenterComponent implements OnInit {

  media:any={'user':[],'chemist':[]};
  medialist:any=[];
  constructor(private aroute:ActivatedRoute,private router:Router,private global:AppGlobals,
    private api:Api,private loadingBar:LoadingBarService) { }

  ngOnInit() {

    $("html, body").animate({ scrollTop: 0 }, "slow");

    this.getMediaList();
  }

  getMediaList(){
 
    this.loadingBar.start();

    this.api.howToWork('').subscribe(
      (response) => {
        console.log('GETTING CMS DATA');
        console.log(response);

        let dt: any = response;
        if (dt.status == 200) {
 
          this.media.user=dt.data.user;
          this.media.chemist=dt.data.chemist;
          this.onSwitchUserType('user');
         
          

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

  onSwitchUserType(type:any){

    $('.tab_list').removeClass('active');

    if(type=='user'){
      this.medialist=this.media.user;
       
      setTimeout(() => {
        $('#usertype').addClass('active');
      }, 20);
     
    }
    else if(type=='chemist'){
      this.medialist=this.media.chemist;
      setTimeout(() => {
        $('#chemisttype').addClass('active');
      }, 20);
      
    }
  }
}
