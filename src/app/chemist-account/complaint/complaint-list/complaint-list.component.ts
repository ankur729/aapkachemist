import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LoadingBarService } from '@ngx-loading-bar/core';
import {Api} from '../../../api.service';
import {AppGlobals} from '../../../app.global';
declare var $:any;
 

@Component({
  selector: 'app-complaint-list',
  templateUrl: './complaint-list.component.html',
  styleUrls: ['./complaint-list.component.css']
})
export class ComplaintListComponent implements OnInit {


  list:any=[];
  
  state:any;
  constructor(private api:Api,public global:AppGlobals,private loadingBar:LoadingBarService
            ,private router:Router) {this.state=this.global.getAppState(); }

  ngOnInit() {

    setTimeout(() => {
      $('.list a').removeClass('active');
      $('#complaint').addClass('active');
      $("html, body").animate({ scrollTop: 0 }, "slow");
      
    }, 20);
    this.getComplaintList();
  }

  getComplaintList(){

   
    
    let data="user_id="+this.state.user.id;

    console.log(data);

    this.api.getComplaintList(data).subscribe(
      (response) => {
      
        

        var dt: any = response;
        
        console.log(dt);

        if (dt.status == 200) {

          this.list=dt.data;
          
          // setTimeout(() => {
          //   $('.input input--nao input--filled').removeClass('input--filled');
          // }, 200);
          
          this.loadingBar.stop();
         

        }
        else if (dt.status == 201) {

          this.global.setToast('error',dt.message);

        }

      },
      (error) => {

        this.loadingBar.stop();
        //   this.spinnerService.hide();
        console.log('RESPONSE FAILED'); console.log(error)
      }
    );


  }


  onSortBy(sortby){
   
    console.log(sortby);
    let data="user_id="+this.state.user.id+"&sort_by=";

    console.log(data);

    this.api.getComplaintList(data).subscribe(
      (response) => {
      
        

        var dt: any = response;
        
        console.log(dt);

        if (dt.status == 200) {

          this.list=dt.data;
          
          // setTimeout(() => {
          //   $('.input input--nao input--filled').removeClass('input--filled');
          // }, 200);
          
          this.loadingBar.stop();
         

        }
        else if (dt.status == 201) {

          this.global.setToast('error',dt.message);

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
