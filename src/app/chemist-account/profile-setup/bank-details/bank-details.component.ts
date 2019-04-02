import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LoadingBarService } from '@ngx-loading-bar/core';
import {Api} from '../../../api.service';
import {AppGlobals} from '../../../app.global';
 
declare var $:any;

@Component({
  selector: 'app-bank-details',
  templateUrl: './bank-details.component.html',
  styleUrls: ['./bank-details.component.css']
})
export class BankDetailsComponent implements OnInit {

  state:any;
  constructor(private aroute:ActivatedRoute,private router:Router,public global:AppGlobals,
              private loadingBar:LoadingBarService,private api:Api) { this.state=this.global.getAppState();}

  ngOnInit() {
    setTimeout(() => {
      $('.list a').removeClass('active');
      $('#profilesetup').addClass('active');
    }, 20);
    $("html, body").animate({ scrollTop: 0 }, "slow");
  }

}
