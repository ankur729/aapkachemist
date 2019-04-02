import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { Api } from '../../api.service';
import { AppGlobals } from '../../app.global';

declare var $: any;

@Component({
  selector: 'app-refferal',
  templateUrl: './refferal.component.html',
  styleUrls: ['./refferal.component.css']
})
export class RefferalComponent implements OnInit {

  data: any = { 'button': { 'mode': 'code', 'msg': 'Get Refferal Link',},
   'own_refcode': '', 'referral_link': '','referral_description':'','referral_amount':'','code_link':'','referral_message':'',
  'referral_heading':'','referral_body':''
 };
  userAgent: string;
  baseurl: string;
  encodeURIText: any;
  share_url: string;
  sharecontent:string;
  state: any;
  smskey:string;
 
  constructor(private api: Api, private loadingBar: LoadingBarService, public global: AppGlobals, private router: Router, private aroute: ActivatedRoute) { this.state = this.global.getAppState(); }

  ngOnInit() {
    console.log(this.state);
    $("html, body").animate({ scrollTop: 0 }, "slow");
    setTimeout(() => {
      $('.nameDesigns').removeClass('active');
      $('#refferearn').addClass('active');
    }, 20);
  
    
    this.getRefferalDetail();
  }

  ngAfterViewInit(){
    
    setTimeout(() => {
      $('.invite_friends_popup .heading .icon_wrapper').click(function(){
        $('.media_sharing').toggle(10);
        }); 
    }, 20);
  }

  getRefferalDetail() {

    let data="user_id="+this.state.user.id;

    this.loadingBar.start();
    this.api.getUserRefferal(data).subscribe(
      (response) => {

        let dt: any = response;
        console.log(dt);
        this.loadingBar.stop();


        if (dt.status == 200) {

            this.setParams(dt);
            this.initShareContent();
      //    this.respdata.mapping_type_list=dt.data.mapping_type_list;


        }
        else if (dt.status == 201) {
      //     $('.page_name').hide();
      //  $('.mainPage').hide();
        
        }

      },
      (error) => {

        this.loadingBar.stop();
        //   this.spinnerService.hide();
        console.log('RESPONSE FAILED'); console.log(error)
      }
    );

  }

  initShareContent(){

    this.userAgent = navigator.userAgent || navigator.vendor;

    this.baseurl = this.global.baseAppUrl;

    this.share_url = this.data.referral_link;
    var returndata = ''

    // Windows Phone must come first because its UA also contains "Android"

    if (/windows phone/i.test(this.userAgent)) {

      returndata = "windows phone";

    }

    if (/android/i.test(this.userAgent)) {

      //  alert('Its Android phone');
      returndata = "android";

    }

    // iOS detection from: http://stackoverflow.com/a/9039885/177710

    if (/iPad|iPhone|iPod/.test(this.userAgent)) {

      returndata = "ios";

    }

  //  this.sharecontent = "Register on aapkachemist.com using my refferal code " + this.data.own_refcode + " click on " + this.share_url;
  this.sharecontent =this.data.referral_msg;
  
    this.encodeURIText = encodeURI(this.sharecontent);
    switch (returndata) {

      case "android":
        this.smskey = "sms:?body=" + this.sharecontent;
        break;
      case "ios":
        this.smskey = "sms:&body=" + this.sharecontent;
        break;

    }

  }

  setParams(dt){

    this.data.own_refcode=dt.data.own_refcode;
    this.data.referral_amount=dt.data.referral_amount;
    this.data.referral_description=dt.data.referral_description;
    this.data.referral_link=dt.data.referral_link;
    this.data.referral_msg=dt.data.referral_message;
    this.data.referral_heading=dt.data.referral_heading;
    this.data.referral_body=dt.data.referral_body;
 
    this.data.code_link=this.data.own_refcode

  }
  switchRefferButton() {

    
    if (this.data.button.mode == 'link') {
      console.log(this.data.button.mode);
     // alert('1');
      this.data.button.msg = 'Get Refferal Code';
      this.data.button.mode = 'code';
      this.data.code_link=this.data.own_refcode;

    }
    else if (this.data.button.mode == 'code') {
    //  alert('2');
      this.data.button.msg = 'Get Refferal Link';
      this.data.button.mode = 'link';
      this.data.code_link=this.data.referral_link;

    }

  }

  toggleRefferPopup(mode){
    console.log(mode);
    if(mode=='show'){
      $('.invite_friends_popup').fadeIn();
    }
    else if(mode=='hide'){

      history.go(-1);
     // $('.invite_friends_popup').fadeOut();
    }
  
}


}
