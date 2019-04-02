import { Component } from '@angular/core';
import { MessagingService, } from "./shared/messaging.service";
import { AppGlobals } from './app.global';
import * as firebase from 'firebase';
import { Router } from '@angular/router';
import { ConnectionService } from 'ng-connection-service';
declare var $: any;
declare var toastr8: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'my-app';
  message: any;
  state: any;
  isConnected: boolean;
  payload: any = { 'title': '', 'body': '','banner':'' };
  constructor(private messagingService: MessagingService, public global: AppGlobals,
    private connectionService: ConnectionService, private router: Router) {
    this.state = this.global.getAppState();


    this.connectionService.monitor().subscribe(isConnected => {
      this.isConnected = isConnected;
      if (this.isConnected) {
        //      this.status = "ONLINE";
        this.global.setToast('info', 'Back Online');
      }
      else {
        // alert('2');
        this.global.setToast('error', 'Internet Connectivity Lost');
        this.router.navigate(['/no-connection'], { queryParams: { 'availability': 'false' } })
        //  this.status = "OFFLINE";
      }
    });

  }

  ngOnInit() {
    //  const userId = 'user001';
    //console.log(this.state);
    if (!window.navigator.onLine) {
      this.router.navigate(['/no-connection'], { queryParams: { 'availability': 'false' } })
    }

    if (this.state == null) {

      this.global.initState();
      this.state = this.global.getAppState();

      if (this.state.device_token == '') {

        this.messagingService.requestPermission();

      }

    }
    else {

      if (this.state.is_reset_cache7 == undefined || this.state.is_reset_cache7 == null) {

        this.global.initState();
        this.state = this.global.getAppState();

        // alert(this.state.is_reset_cache);
      }
      if (this.state.device_token == '') {

        this.messagingService.requestPermission();
      }

    }



    this.message = this.messagingService.currentMessage;

    this.messagingService.receiveMessage().subscribe(
      (payload: any) => {
        console.log(payload);

        if (payload.data.readdata == undefined) {
          this.launch_toast(payload.data, 1);
        }
        else {
          console.log(JSON.parse(payload.data.readdata));
          this.launch_toast(JSON.parse(payload.data.readdata), 2);
        }

        //this.launch_toast(JSON.parse(payload.data.readdata));

      },
      (error) => {

        console.log('RESPONSE FAILED'); console.log(error)
      }
    );


    // setTimeout(() => {
    //   let payload:any={'data':{'title':'test','body':'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla at leo placerat, congue lacus suscipit, eleifend metus. Nulla facilisi. Aenean orci leo, lacinia nec arcu nec, commodo rhoncus dui. Nunc dapibus sagittis ipsum a eleifend. Praesent mattis odio sit amet dolor rhoncus ultrices. Nam congue ornare ex, quis porta sapien tempus ut.'}}
    //     this.launch_toast(payload);

    // }, 2000);

  }

  launch_toast(payload, type) {

    console.log('Inside payload');

    $('.brodcast-popupblock').removeClass('brodcast-popupblock-close');

    if (type == 1) {
      this.payload.title = payload.title;
      this.payload.body = payload.body;
      this.payload.icon = 'https://www.aapkachemist.com/assets/images/logo/.png';

    } else if (type == 2) {
 
      this.payload.title = payload.title;
      this.payload.body = payload.message;
      this.payload.icon = payload.banner;
      this.payload.icon = 'https://www.aapkachemist.com/assets/images/logo/.png';

    }

    setTimeout(() => {
      this.onCloseNotification();
    }, 120000);
    // toastr8.linkedin({
    //   message: payload.data.body,
    //   title: payload.data.title,
    //   imgURI: payload.data.icon,
    //   timeOut: 5000000,

    // });
    // $('.toast8-bottom-right').click(() => {


    // })

    // var x = document.getElementById("toast")
    // x.className = "show";
    // setTimeout(function(){ x.className = x.className.replace("show", ""); }, 5000);
  }
  onCloseNotification() {
    $('.brodcast-popupblock').addClass('brodcast-popupblock-close');

  }
  ngAfterViewInit() {

  }

  onClickNotification() {


  }


}
