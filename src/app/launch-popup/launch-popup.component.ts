import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
declare var $: any;
import { AppGlobals } from '../app.global';
@Component({
  selector: 'app-launch-popup',
  templateUrl: './launch-popup.component.html',
  styleUrls: ['./launch-popup.component.css']
})
export class LaunchPopupComponent implements OnInit {

  @Output() onCloseLaunchPopup = new EventEmitter<any>();
  @Input() launchdata;
  state: any;
  time: any = { 'hour': '', 'minute': '', 'seconds': '' };
  istimer:boolean=false;

  constructor(private router: Router, private global: AppGlobals) { this.state = this.global.getAppState(); }

  ngOnInit() {

    console.log('Inside launch popup');
   // console.log(this.launchdata);
    setTimeout(() => {

      var d = new Date(); // for now
    this.time.hour=24-d.getHours(); // => 9
    this.time.minute= 60-d.getMinutes(); // =>  30
    this.time.seconds=  d.getSeconds(); // => 51
      this.istimer=true;
      setTimeout(() => {
        $('time').countDown({
          with_separators: false,
  
        });
        $('.alt-1').countDown({
          css_class: 'countdown-alt-1',
        });
        $('.alt-2').countDown({
          css_class: 'countdown-alt-2'
        });
      }, 200);
     

     

    }, 200);
  }

  onClose() {



    this.onCloseLaunchPopup.emit();
    //this.state.maintenance_status==''
  }

}
