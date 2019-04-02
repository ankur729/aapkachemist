import { Component, OnInit,Output,ViewChild } from '@angular/core';
import { AppGlobals } from '../../app.global';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { Router,ActivatedRoute } from '@angular/router';
import { Api } from '../../api.service';
 
import {DomSanitizer,SafeResourceUrl,} from '@angular/platform-browser';
declare var $:any;

@Component({
  selector: 'app-broadcast-detail',
  templateUrl: './broadcast-detail.component.html',
  styleUrls: ['./broadcast-detail.component.css']
})
export class BroadcastDetailComponent implements OnInit {

  state: any;
  enquires: any = [];
  isnodatafound: boolean = false;
  url: SafeResourceUrl;
  broadcast:any={'id':'','date_time':'','description':'','status':'','title':'','blogtype':'','url':'','image_file':''}

  @Output() nodataobj: any = { 'page': '', 'txt': '' };
 

  constructor(public global: AppGlobals, private loadingBar: LoadingBarService,
     private router: Router, private api: Api,private aroute:ActivatedRoute,public sanitizer:DomSanitizer) { this.state = this.global.getAppState(); }

  ngOnInit() {
    $('.page_name').hide();
    $('.mainPage').hide();
//    this.getBroadcastList();

  this.broadcast.id=this.aroute.snapshot.queryParams["id"];
  this.getBroadcastDetail();
    setTimeout(() => {
      $('.list a').removeClass('active');
      $('#broadcast').addClass('active');
      
      $("html, body").animate({ scrollTop: 0 }, "slow");
    }, 20);

  }

  getBroadcastDetail() {

    this.loadingBar.start();
    let data = "user_id=" + this.state.user.id+"&broadcast_id="+this.broadcast.id;
  console.log(data);
    /// console.log(this.address);
    this.api.broadcastDetail(data).subscribe(
      (response) => {
     
        var dt: any = response;
        console.log(dt);
        
            if(dt.status==200){
              $('.page_name').show();
              $('.mainPage').fadeIn(500);
  
              this.broadcast.date_time=dt.data.date_time;
              this.broadcast.description=dt.data.description;
              this.broadcast.status=dt.data.status;
              this.broadcast.title=dt.data.title;
              this.broadcast.blogtype=dt.data.blogtype;
              this.broadcast.image_file=dt.data.image_file;
              if(this.broadcast.blogtype==2){
                this.broadcast.url=this.sanitizer.bypassSecurityTrustResourceUrl(dt.data.url);
              }
              else{
                this.broadcast.url=dt.data.url;
              }
              this.broadcast.url=this.sanitizer.bypassSecurityTrustResourceUrl(dt.data.url);
              
            //  let enquiries = dt.data;
        
              // enquiries.map(elem=>{
              //   elem.additional_data=JSON.parse(elem.additional_data)
              // })
             // this.enquires=enquiries;

            //  this.leftpanel.onUpdateNotificationCount({'notifycount':this.enquires.length});
        //    // this.addresses=dt.data;

        //     // this.is_result_get=true;
        //     // this.searchresp=dt.user_data;
        // //    this.address=this.addressinit;

        //      this.global.setToast('info',dt.message);

           }
            else if(dt.status==201){
              $('.page_name').hide();
              $('.mainPage').hide();
                 this.isnodatafound = true;
                 this.nodataobj.page = 'enquiry';
                 this.nodataobj.txt = "No broadcast received";
        //     // this.is_result_get=false;
        //     // this.searchresp=[];
            }

        this.loadingBar.stop();



      },
      (error) => {

        this.loadingBar.stop();
        console.log('RESPONSE FAILED'); console.log(error)
      }
    );

  }

}
