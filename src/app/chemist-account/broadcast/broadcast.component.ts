import { Component, OnInit,Output,ViewChild } from '@angular/core';
import { AppGlobals } from '../../app.global';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { Router } from '@angular/router';
import { Api } from '../../api.service';
import {ChemistAccountLeftPanelComponent} from '../chemist-account-left-panel/chemist-account-left-panel.component';
declare var $:any;

@Component({
  selector: 'app-broadcast',
  templateUrl: './broadcast.component.html',
  styleUrls: ['./broadcast.component.css']
})
export class BroadcastComponent implements OnInit {


  state: any;
  enquires: any = [];
  isnodatafound: boolean = false;

  @Output() nodataobj: any = { 'page': '', 'txt': '' };
  @ViewChild('leftpanel') leftpanel:ChemistAccountLeftPanelComponent;

  constructor(public global: AppGlobals, private loadingBar: LoadingBarService, private router: Router, private api: Api) { this.state = this.global.getAppState(); }

  ngOnInit() {
    $('.page_name').hide();
    $('.mainPage').hide();
    this.getBroadcastList();
    setTimeout(() => {
      $('.list a').removeClass('active');
      $('#broadcast').addClass('active');

      $("html, body").animate({ scrollTop: 0 }, "slow");
    }, 20);

  }

  getBroadcastList() {

    this.loadingBar.start();
    let data = "user_id=" + this.state.user.id;
  console.log(data);
    /// console.log(this.address);
    this.api.broadcastList(data).subscribe(
      (response) => {
     
        var dt: any = response;
        console.log(dt);
        
            if(dt.status==200){
              $('.page_name').show();
              $('.mainPage').fadeIn(500);
              let enquiries = dt.data;
        
              // enquiries.map(elem=>{
              //   elem.additional_data=JSON.parse(elem.additional_data)
              // })
              this.enquires=enquiries;

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

  onNavigate(list){

    //routerLink="/chemist-account/broadcast-detail" [queryParams]="{'id':list.id}"
    if(list.blogtype==2){
      window.open(list.url_link, '_blank'); 
    }

    else{

      this.router.navigate(['/chemist-account/broadcast-detail'],{queryParams:{'id':list.id}})
    }
    console.log(list);
  }

}
