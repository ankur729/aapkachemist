import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {AppGlobals} from '../app.global';
import { ConnectionService } from 'ng-connection-service';
@Component({
  selector: 'app-no-page-found',
  templateUrl: './no-page-found.component.html',
  styleUrls: ['./no-page-found.component.css']
})
export class NoPageFoundComponent implements OnInit {

  
  no_internet_connection:boolean=false;
  noconnection:any=undefined;
  private sub: any;
  isConnected:boolean;
  status:any;
  constructor(private aroute:ActivatedRoute,private global:AppGlobals,
     private router:Router) { }

  ngOnInit() {


    //this.global.setToast('error','Dont try to oversmart.');

    this.aroute.queryParams.subscribe(params => {

      this.noconnection = this.aroute.snapshot.queryParams["availability"];
 
    });
    if(this.noconnection!=undefined){

      this.no_internet_connection=true;

    }
    //alert(this.noconnection);
    if(this.noconnection==true){
     
      this.global.setToast('error','Dont try to oversmart.');
    }

  }

  checkInternetConnection(){

  
    if(window.navigator.onLine){
      this.router.navigate(['/']);
    }
    else{
     
      this.global.setToast('error','We are trying to reconnect..');
    }
    
  }
 

}
