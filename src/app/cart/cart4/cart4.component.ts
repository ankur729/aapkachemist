import { Component, OnInit } from '@angular/core';
import {Api} from '../../api.service';
import {AppGlobals} from '../../app.global';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { Router } from '@angular/router';
declare var $:any;


@Component({
  selector: 'app-cart4',
  templateUrl: './cart4.component.html',
  styleUrls: ['./cart4.component.css']
})
export class Cart4Component implements OnInit {

  state:any;

  constructor(private api:Api,public global:AppGlobals,private loadingBar:LoadingBarService,private router:Router) {this.state=this.global.getAppState(); }

  ngOnInit() {
  }

}
